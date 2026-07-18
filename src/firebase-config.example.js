/* ═══════════════════════════════════════════════════════════════════
   Configuration Firebase — à renseigner avant utilisation

   Copier ce fichier en `firebase-config.js` (ignoré par git) et
   renseigner les valeurs propres à votre projet Firebase :

   1. apiKey / authDomain / projectId :
      Firebase Console → ⚙️ Paramètres du projet → Général → « Vos
      applications » → ajouter une application Web → copier la config.

   2. Activer Google comme fournisseur :
      Firebase Console → Authentication → Sign-in method → Google.

   3. oauthClientId :
      Google Cloud Console → APIs & Services → Identifiants → Créer des
      identifiants → ID client OAuth → type « Application Web ».
      Créer un NOUVEAU client dédié à cette extension (ne pas réutiliser
      celui d'une autre appli du même projet — le redirect URI est
      spécifique à chaque extension). Ajouter comme URI de redirection
      autorisé :
        https://<ID_EXTENSION>.chromiumapp.org/
      (l'ID d'extension s'obtient sur chrome://extensions une fois
      l'extension chargée en mode développeur).
   ═══════════════════════════════════════════════════════════════════ */
export const FIREBASE_CONFIG = {
  apiKey: 'REPLACE_ME',
  authDomain: 'REPLACE_ME.firebaseapp.com',
  projectId: 'REPLACE_ME',
};

export const OAUTH_CLIENT_ID = 'REPLACE_ME.apps.googleusercontent.com';
