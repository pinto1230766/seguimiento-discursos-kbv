@echo off
echo Mise à jour des dépendances...

# Sauvegarder l'ancien package.json
echo Création d'une sauvegarde de package.json...
copy package.json package.json.bak

# Mettre à jour les dépendances principales
echo Mise à jour de React et des dépendances principales...
npm install react@latest react-dom@latest

# Mettre à jour les dépendances de développement
echo Mise à jour des dépendances de développement...
npm install -D @types/react@latest @types/react-dom@latest

# Mettre à jour Vite et ses plugins
echo Mise à jour de Vite...
npm install -D vite@latest @vitejs/plugin-react@latest

# Mettre à jour Electron
echo Mise à jour d'Electron...
npm install -D electron@latest electron-builder@latest

# Mettre à jour les autres dépendances
echo Mise à jour des autres dépendances...
npm install date-fns@latest dexie@latest i18next@latest react-i18next@latest react-router-dom@latest zustand@latest

# Nettoyer le cache npm
echo Nettoyage du cache npm...
npm cache clean --force

# Réinstaller les dépendances
echo Réinstallation des dépendances...
rm -rf node_modules
rm -f package-lock.json
rm -f pnpm-lock.yaml
rm -f yarn.lock

# Réinstaller les dépendances
echo Installation des dépendances...
npm install

echo.
echo Mise à jour terminée !
echo Vérifiez les modifications avant de committer.

pause
