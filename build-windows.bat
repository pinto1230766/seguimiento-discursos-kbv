@echo off
echo ========================================
echo BUILD WINDOWS - Seguimiento Discursos KBV
echo ========================================

echo 1. Installation des dependances Electron...
npm install electron electron-builder --save-dev

echo 2. Build de l'application web...
npm run build

echo 3. Build de l'executable Windows...
npm run electron:build

echo 4. L'executable sera dans le dossier dist/
echo Fichier: Seguimiento-Discursos-KBV-Setup.exe

pause