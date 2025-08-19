@echo off
echo Nettoyage des dépendances...
rmdir /s /q node_modules
rmdir /s /q dist
rmdir /s /q .vite
rmdir /s /q .capacitor
rmdir /s /q android
del /f package-lock.json

echo Installation des dépendances...
call npm install

echo Construction de l'application...
call npm run build

echo Installation terminée. Vous pouvez maintenant lancer l'application avec 'npm run dev'
