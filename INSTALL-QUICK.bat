@echo off
echo ========================================
echo INSTALLATION RAPIDE - Seguimiento Discursos KBV
echo ========================================

echo Que voulez-vous faire ?
echo 1. Build APK Android
echo 2. Build Windows (Electron)
echo 3. Lancer en mode developpement
echo 4. Build PWA pour web
echo 5. Installer toutes les dependances

set /p choice="Votre choix (1-5): "

if "%choice%"=="1" (
    echo Installation des dependances APK...
    call build-apk.bat
) else if "%choice%"=="2" (
    echo Installation des dependances Windows...
    call build-windows.bat
) else if "%choice%"=="3" (
    echo Lancement en mode developpement...
    npm install
    npm run dev
) else if "%choice%"=="4" (
    echo Build PWA...
    npm install
    npm run build
    npm run preview
) else if "%choice%"=="5" (
    echo Installation de toutes les dependances...
    npm install
    npm install @capacitor/core @capacitor/cli @capacitor/android --save-dev
    npm install electron electron-builder concurrently wait-on --save-dev
    echo Toutes les dependances sont installees !
) else (
    echo Choix invalide !
)

pause