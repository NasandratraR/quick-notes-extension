/* ═══════════════════════════════════════════════════════════════════
   Wrappers REST autour de l'API Firestore

   On n'utilise pas le SDK Firebase JS (incompatible sans bundler dans
   une extension Manifest V3) : de simples appels fetch authentifiés par
   le idToken Firebase suffisent.
   ═══════════════════════════════════════════════════════════════════ */
import { FIREBASE_CONFIG } from './firebase-config.js';
import { getIdToken } from './auth.js';

const BASE_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_CONFIG.projectId}/databases/(default)/documents`;

/* ── Conversion JS ↔ format typé Firestore ── */
function toFirestoreValue(v) {
  if (v === null || v === undefined) return { nullValue: null };
  if (typeof v === 'boolean') return { booleanValue: v };
  if (typeof v === 'number') {
    return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  }
  if (typeof v === 'string') return { stringValue: v };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(toFirestoreValue) } };
  if (typeof v === 'object') return { mapValue: { fields: toFirestoreFields(v) } };
  return { stringValue: String(v) };
}

export function toFirestoreFields(obj) {
  const fields = {};
  for (const [key, value] of Object.entries(obj)) fields[key] = toFirestoreValue(value);
  return fields;
}

function fromFirestoreValue(value) {
  if ('nullValue' in value) return null;
  if ('booleanValue' in value) return value.booleanValue;
  if ('integerValue' in value) return Number(value.integerValue);
  if ('doubleValue' in value) return value.doubleValue;
  if ('stringValue' in value) return value.stringValue;
  if ('arrayValue' in value) return (value.arrayValue.values || []).map(fromFirestoreValue);
  if ('mapValue' in value) return fromFirestoreFields(value.mapValue.fields || {});
  return null;
}

export function fromFirestoreFields(fields) {
  const obj = {};
  for (const [key, value] of Object.entries(fields)) obj[key] = fromFirestoreValue(value);
  return obj;
}

async function authHeaders() {
  const idToken = await getIdToken();
  if (!idToken) throw new Error('Utilisateur non connecté');
  return { Authorization: `Bearer ${idToken}`, 'Content-Type': 'application/json' };
}

/* Renvoie le contenu du document (objet JS) ou null s'il n'existe pas. */
export async function getDoc(path) {
  const res = await fetch(`${BASE_URL}/${path}`, { headers: await authHeaders() });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Firestore getDoc a échoué (${res.status})`);
  const data = await res.json();
  return fromFirestoreFields(data.fields || {});
}

/* Upsert intégral du document (écrase les champs existants). */
export async function setDoc(path, dataObject) {
  const fields = toFirestoreFields(dataObject);
  const mask = Object.keys(fields).map(k => `updateMask.fieldPaths=${encodeURIComponent(k)}`).join('&');
  const res = await fetch(`${BASE_URL}/${path}?${mask}`, {
    method: 'PATCH',
    headers: await authHeaders(),
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) throw new Error(`Firestore setDoc a échoué (${res.status})`);
}

export async function deleteDoc(path) {
  const res = await fetch(`${BASE_URL}/${path}`, { method: 'DELETE', headers: await authHeaders() });
  if (!res.ok && res.status !== 404) throw new Error(`Firestore deleteDoc a échoué (${res.status})`);
}
