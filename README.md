# Seguimiento Discursos KBV

Application PWA pour la gestion des visites d'orateurs capverdiens à Lyon (Témoins de Jéhovah).

## 🚀 Fonctionnalités

- **100% Offline** : Fonctionne sans internet, données stockées localement
- **Optimisé Android** : Interface tactile, notifications, partage natif
- **Multilingue** : Português, Français, Kriol Kabuverdianu
- **Gestion complète** :
  - Orateurs visiteurs (besoins, allergies, planning)
  - Anfitriões locaux (capacités, disponibilités)
  - Attribution automatique avec compatibilité allergies
  - Calendrier des visites
  - Communication WhatsApp/SMS

## 📱 Installation

### Sur Android (recommandé)

1. Ouvrir Chrome/Firefox sur Android
2. Aller sur l'URL de l'application
3. Menu → "Ajouter à l'écran d'accueil"
4. L'app s'installe comme une application native

### Développement local

```bash
# Installation des dépendances
npm install

# Démarrage en mode développement
npm run dev

# Build pour production
npm run build

# Prévisualisation du build
npm run preview
```

## 🛠️ Technologies

- **React 18** + Vite
- **PWA** avec Service Worker offline-first
- **Zustand** pour la gestion d'état
- **IndexedDB** via Dexie pour le stockage local
- **React Router** pour la navigation
- **i18next** pour l'internationalisation

## 📊 Structure des données

### Orateur
```json
{
  "id": "string",
  "nom": "string",
  "congregation": "string",
  "phone": "string?",
  "lastVisitDate": "date?",
  "nextVisitDate": "date?",
  "needs": {
    "hebergement": "boolean",
    "repas": "boolean", 
    "transport": "boolean"
  },
  "allergies": {
    "type": "grave|moderee|null",
    "details": "string?"
  }
}
```

### Anfitrião
```json
{
  "id": "string",
  "nom": "string",
  "phone": "string",
  "capacites": {
    "hebergement": "number",
    "repas": "number",
    "transport": "boolean"
  },
  "contraintes": {
    "allergiesEviter": "string[]",
    "autres": "string?"
  }
}
```

## 🔧 Configuration PWA

L'application est configurée pour :
- Installation sur écran d'accueil Android
- Fonctionnement offline complet
- Cache automatique des ressources
- Thème couleur JW.org (#1f4e79)
- Icônes adaptatives 192px et 512px

## 💾 Sauvegarde et synchronisation

- **Export/Import JSON** : Sauvegarde complète des données
- **Partage Android** : Via intent système natif
- **Stockage local** : IndexedDB avec persistance automatique
- **Export calendrier/contacts** : Formats ICS et vCard pour Android

## 🌐 Langues supportées

- **Português** (pt) - Langue principale
- **Français** (fr) - Interface française
- **Kriol Kabuverdianu** (kbv) - Créole capverdien

## 📋 Roadmap

### ✅ MVP (Semaine 1-2)
- [x] Structure PWA React
- [x] Navigation et routing
- [x] Gestion d'état Zustand
- [x] CRUD Orateurs/Anfitriões
- [x] Dashboard avec métriques
- [x] Multilingue (PT/FR/KBV)
- [x] Export/Import données

### ✅ Terminé (Semaine 3-4)
- [x] Import programmes HTML existants
- [x] Calendrier avec événements
- [x] Attribution automatique
- [x] Vérification compatibilité allergies
- [x] Communication WhatsApp/SMS
- [x] Notifications Android

### ✅ V1 Complète
- [x] Optimisations performance
- [x] Tests offline complets
- [x] Service Worker PWA
- [x] Documentation utilisateur
- [x] Guide d'installation
- [x] Export calendrier/contacts Android

## 🎉 Application Complète

**Fonctionnalités avancées implémentées :**

### 🔗 Attribution automatique
- Algorithme de compatibilité allergies (grave/modérée)
- Attribution automatique basée sur besoins/capacités
- Interface drag & drop pour attribution manuelle
- Badges Compatible/Incompatible en temps réel

### 📱 Communication WhatsApp/SMS
- Templates prédéfinis (confirmation, rappels J-7/J-2/J-0)
- Variables automatiques ({ORATEUR_NOM}, {DATE}, etc.)
- Sélection multi-destinataires
- Preview des messages avant envoi
- Support SMS comme alternative

### 📥 Import programmes HTML
- Parser automatique pour IRMONS-PA-KONVIDI.html
- Import des 4 programmes (Janvier-Avril, Maiu-Setenbru, etc.)
- Détection automatique du type de fichier
- Gestion des formats de dates multiples

### 🔔 Notifications Android
- Notifications locales J-7, J-2, J-0
- Alertes allergies graves automatiques
- Vibration feedback tactile
- Export calendrier Android (.ics)
- Export contacts (.vcf)

### 🛠️ Service Worker PWA
- Cache offline-first complet
- Gestion des notifications push
- Synchronisation background
- Installation native Android

**Installation:** Voir `INSTALL.md` pour le guide complet Android

## 🤝 Contribution

Application développée pour usage personnel, optimisée pour les besoins spécifiques de la gestion des visites d'orateurs capverdiens.

## 📄 Licence

Usage personnel - Basé sur les directives jw.org