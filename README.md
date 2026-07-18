# Quick Notes

Extension Chrome (Manifest V3) de prise de notes rapides, avec édition Markdown, thèmes personnalisables, groupes de notes, sommaire automatique, export/import et synchronisation Firebase optionnelle.

## Fonctionnalités

- Éditeur Markdown avec aperçu en temps réel (mode édition / aperçu / split)
- Coloration syntaxique des blocs de code
- Organisation des notes par groupes (avec glisser-déposer, ajout et suppression rapides depuis la liste)
- Sommaire (TOC) généré automatiquement à partir des titres
- Recherche dans la liste des notes et dans l'éditeur
- Thèmes, polices, tailles et couleurs de texte personnalisables
- Collage d'images directement dans une note (Ctrl+V)
- Export / import des notes (JSON ou Markdown)
- Connexion Google (Firebase Auth) pour synchroniser notes et groupes entre appareils via Firestore
- Raccourcis clavier (Ctrl+N, Ctrl+F, Ctrl+B/I/E, Ctrl+P, Ctrl+\, Ctrl+T, …)

## Installation (mode développeur)

1. Ouvrir `chrome://extensions` dans Chrome.
2. Activer le « Mode développeur ».
3. Cliquer sur « Charger l'extension non empaquetée » et sélectionner le dossier du projet.
4. Cliquer sur l'icône de l'extension pour ouvrir la page de notes (`notes.html`).

### Activer la synchronisation Firebase (optionnel)

La synchronisation Google/Firestore est optionnelle : sans configuration, l'extension fonctionne entièrement en local.

1. Copier `src/firebase-config.example.js` en `src/firebase-config.js` (ignoré par git).
2. Renseigner `FIREBASE_CONFIG` et `OAUTH_CLIENT_ID` en suivant les instructions en commentaire dans ce fichier.
3. Configurer les règles Firestore pour restreindre l'accès à `quicknotes_users/{uid}` à son propriétaire (`request.auth.uid == uid`).

## Structure du projet

```
.
├── manifest.json               # Déclaration de l'extension (Manifest V3)
├── background.js               # Service worker : ouvre/active l'onglet de notes
├── notes.html                  # Page principale de l'application
├── notes.css                   # Styles
└── src/                        # Code de l'application, en modules ES natifs
    ├── main.js                     # Point d'entrée : init(), wiring DOM, raccourcis clavier
    ├── state.js                    # État global mutable + clés de stockage
    ├── constants.js                # Données statiques (thèmes, polices, couleurs, mots-clés)
    ├── storage.js                  # Persistance chrome.storage.local + synchronisation Firestore
    ├── auth.js                     # Authentification Google via Firebase (chrome.identity)
    ├── firestore.js                # Wrappers REST autour de l'API Firestore
    ├── firebase-config.example.js  # Modèle de configuration Firebase à copier en firebase-config.js
    ├── notes-crud.js               # Création / sélection / édition / suppression des notes
    ├── notes-list.js               # Rendu de la liste des notes
    ├── groups.js                   # Gestion des groupes (CRUD + glisser-déposer)
    ├── drag-drop.js                # Glisser-déposer des notes
    ├── markdown.js                 # Rendu Markdown et coloration syntaxique
    ├── preview.js                  # Aperçu / mode édition / mode split
    ├── editor-format.js            # Mise en forme dans l'éditeur (gras, listes, code…)
    ├── editor-search.js            # Recherche dans l'éditeur et l'aperçu
    ├── toc.js                      # Sommaire (table des matières)
    ├── themes.js                   # Thèmes, polices, couleurs, panneau de réglages
    ├── export-import.js            # Export / import des notes
    └── utils.js                    # Fonctions utilitaires partagées
```

L'application est chargée via `<script type="module" src="src/main.js">` — pas de bundler ni d'outillage de build : ce sont des modules ES natifs supportés directement par Chrome.

## Stockage des données

Les données (notes, groupes, images, préférences) sont toujours mises en cache localement via `chrome.storage.local` (permissions `storage` et `unlimitedStorage`) et l'extension reste pleinement fonctionnelle hors ligne.

Si l'utilisateur se connecte avec Google (permission `identity`, voir [Activer la synchronisation Firebase](#activer-la-synchronisation-firebase-optionnel)), les notes et groupes sont en plus synchronisés avec Firestore : Firestore fait autorité au chargement, et chaque sauvegarde y est répercutée en arrière-plan (les échecs réseau sont silencieusement ignorés pour ne jamais bloquer l'usage hors-ligne).
