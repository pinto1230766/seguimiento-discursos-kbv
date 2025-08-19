# Instructions de Build - Seguimiento Discursos KBV

## 📱 Build APK Android

### Prérequis
- Node.js installé
- Android Studio installé
- Java JDK 11+ installé

### Étapes
1. **Installation des dépendances**
   ```bash
   npm install
   ```

2. **Build automatique APK**
   ```bash
   # Double-clic sur le fichier ou exécuter:
   build-apk.bat
   ```

3. **Build manuel APK**
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/android
   npm run build
   npx cap init "Seguimiento Discursos KBV" "com.franciscopinto.seguimiento.discursos.kbv"
   npx cap add android
   npx cap copy android
   npx cap sync android
   npx cap open android
   ```

4. **Dans Android Studio**
   - Build > Generate Signed Bundle/APK
   - Choisir APK
   - Créer un keystore si nécessaire
   - Build Release APK
   - L'APK sera dans `android/app/build/outputs/apk/release/`

## 💻 Build Windows (Electron)

### Prérequis
- Node.js installé

### Étapes
1. **Installation des dépendances**
   ```bash
   npm install
   ```

2. **Build automatique Windows**
   ```bash
   # Double-clic sur le fichier ou exécuter:
   build-windows.bat
   ```

3. **Build manuel Windows**
   ```bash
   npm install electron electron-builder --save-dev
   npm run build
   npm run electron:build
   ```

4. **L'exécutable sera dans le dossier `dist-electron/`**
   - `Seguimiento-Discursos-KBV-Setup.exe` (installateur)

## 🌐 Version Web (PWA)

### Développement
```bash
npm run dev
```

### Build production
```bash
npm run build
npm run preview
```

### Installation PWA
- Ouvrir dans Chrome/Edge
- Cliquer sur l'icône d'installation dans la barre d'adresse
- Ou Menu > Installer l'application

## 📦 Sauvegarde

Une sauvegarde complète a été créée:
- `seguimiento-discursos-kbv-backup-YYYYMMDD.tar.gz`

## 🔧 Dépannage

### Erreur Android Studio
- Vérifier que ANDROID_HOME est défini
- Vérifier que Java JDK 11+ est installé
- Redémarrer Android Studio

### Erreur Electron
- Supprimer `node_modules` et `package-lock.json`
- Réinstaller: `npm install`

### Erreur de build
- Vérifier Node.js version 16+
- Nettoyer le cache: `npm cache clean --force`

## 📱 Installation sur Android

1. **Via APK**
   - Transférer l'APK sur le téléphone
   - Autoriser les sources inconnues
   - Installer l'APK

2. **Via PWA**
   - Ouvrir l'URL dans Chrome Android
   - Menu > Ajouter à l'écran d'accueil

## 💻 Installation sur Windows

1. **Via Installateur**
   - Exécuter `Seguimiento-Discursos-KBV-Setup.exe`
   - Suivre l'assistant d'installation

2. **Via PWA**
   - Ouvrir l'URL dans Chrome/Edge
   - Cliquer sur l'icône d'installation

## 🚀 Déploiement

### Serveur local
```bash
npm run preview
```

### Serveur web
- Copier le contenu du dossier `dist/` sur le serveur
- Configurer HTTPS pour PWA

---

**Développé par Francisco Pinto**  
**© 2024 - Seguimiento Discursos KBV**