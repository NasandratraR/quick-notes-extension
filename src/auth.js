/* ═══════════════════════════════════════════════════════════════════
   Authentification Firebase (Google Sign-In) via chrome.identity

   Flux :
   1. launchWebAuthFlow ouvre l'écran de consentement Google, on récupère
      un id_token Google.
   2. On échange ce id_token contre un token Firebase (Identity Toolkit
      REST API : accounts:signInWithIdp).
   3. On stocke idToken/refreshToken/uid/email dans chrome.storage.local ;
      getIdToken() rafraîchit automatiquement le token expiré.
   ═══════════════════════════════════════════════════════════════════ */
import { STORAGE_KEYS } from './state.js';
import { FIREBASE_CONFIG, OAUTH_CLIENT_ID } from './firebase-config.js';

let cachedAuth = null; // { idToken, refreshToken, uid, email, expiresAt }

function loadAuthFromStorage() {
  return new Promise(resolve => {
    chrome.storage.local.get([STORAGE_KEYS.auth], r => resolve(r[STORAGE_KEYS.auth] || null));
  });
}

function saveAuthToStorage(auth) {
  return new Promise(resolve => {
    chrome.storage.local.set({ [STORAGE_KEYS.auth]: auth }, resolve);
  });
}

async function ensureCacheLoaded() {
  if (cachedAuth === null) cachedAuth = (await loadAuthFromStorage()) || undefined;
  return cachedAuth || null;
}

export function getCurrentUser() {
  if (!cachedAuth) return null;
  return { uid: cachedAuth.uid, email: cachedAuth.email };
}

/* ── Récupère le id_token Google via l'écran de consentement OAuth ── */
function googleSignIn() {
  return new Promise((resolve, reject) => {
    const redirectUri = chrome.identity.getRedirectURL();
    const nonce = crypto.randomUUID();
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.set('client_id', OAUTH_CLIENT_ID);
    authUrl.searchParams.set('response_type', 'id_token');
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('scope', 'openid email profile');
    authUrl.searchParams.set('nonce', nonce);
    authUrl.searchParams.set('prompt', 'select_account');

    chrome.identity.launchWebAuthFlow({ url: authUrl.toString(), interactive: true }, responseUrl => {
      if (chrome.runtime.lastError || !responseUrl) {
        reject(chrome.runtime.lastError || new Error('Connexion annulée'));
        return;
      }
      const fragment = new URL(responseUrl).hash.slice(1);
      const params = new URLSearchParams(fragment);
      const idToken = params.get('id_token');
      if (!idToken) { reject(new Error('id_token manquant dans la réponse Google')); return; }
      resolve({ idToken, redirectUri });
    });
  });
}

/* ── Échange le id_token Google contre une session Firebase ── */
async function exchangeGoogleTokenForFirebase(googleIdToken, redirectUri) {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${FIREBASE_CONFIG.apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        postBody: `id_token=${googleIdToken}&providerId=google.com`,
        requestUri: redirectUri,
        returnSecureToken: true,
      }),
    }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || 'Échec de connexion Firebase');
  return data; // { idToken, refreshToken, localId, email, expiresIn, ... }
}

export async function signIn() {
  const { idToken: googleIdToken, redirectUri } = await googleSignIn();
  const fb = await exchangeGoogleTokenForFirebase(googleIdToken, redirectUri);
  cachedAuth = {
    idToken: fb.idToken,
    refreshToken: fb.refreshToken,
    uid: fb.localId,
    email: fb.email,
    expiresAt: Date.now() + Number(fb.expiresIn) * 1000,
  };
  await saveAuthToStorage(cachedAuth);
  return getCurrentUser();
}

export async function signOut() {
  cachedAuth = null;
  await saveAuthToStorage(null);
}

async function refreshIdToken(auth) {
  const res = await fetch(`https://securetoken.googleapis.com/v1/token?key=${FIREBASE_CONFIG.apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: auth.refreshToken }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || 'Échec du rafraîchissement du token');
  return {
    ...auth,
    idToken: data.id_token,
    refreshToken: data.refresh_token,
    expiresAt: Date.now() + Number(data.expires_in) * 1000,
  };
}

/* Restaure la session au démarrage (si un token/refresh_token est en cache). */
export async function restoreSession() {
  const auth = await ensureCacheLoaded();
  if (!auth) return null;
  if (Date.now() < auth.expiresAt - 60_000) return getCurrentUser();
  try {
    cachedAuth = await refreshIdToken(auth);
    await saveAuthToStorage(cachedAuth);
    return getCurrentUser();
  } catch {
    cachedAuth = null;
    await saveAuthToStorage(null);
    return null;
  }
}

/* Renvoie un idToken valide, en le rafraîchissant si besoin. */
export async function getIdToken() {
  const auth = await ensureCacheLoaded();
  if (!auth) return null;
  if (Date.now() < auth.expiresAt - 60_000) return auth.idToken;
  cachedAuth = await refreshIdToken(auth);
  await saveAuthToStorage(cachedAuth);
  return cachedAuth.idToken;
}
