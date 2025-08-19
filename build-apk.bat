@echo off
echo Génération APK Seguimiento Discursos KBV
echo.

echo 1. Build de production...
call npm run build

echo 2. Synchronisation Android...
call npx cap sync android

echo 3. Ouverture Android Studio...
call npx cap open android

echo.
echo INSTRUCTIONS:
echo 1. Android Studio va s'ouvrir
echo 2. Cliquez sur "Build" > "Build Bundle(s) / APK(s)" > "Build APK(s)"
echo 3. L'APK sera dans: android/app/build/outputs/apk/debug/
echo.
pause