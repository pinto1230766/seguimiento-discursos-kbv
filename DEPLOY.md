# 📱 Déploiement Mobile

## Option 1: PWA (Plus simple)
1. `npm run build && npm run preview`
2. Sur Android: Chrome → URL → "Ajouter à l'écran d'accueil"

## Option 2: Serveur local
1. `npm install -g serve`
2. `serve -s dist -p 3000`
3. Partager l'IP locale avec le téléphone

## Option 3: GitHub Pages
1. Push vers GitHub
2. Settings → Pages → Deploy from branch
3. Accéder via l'URL GitHub Pages

## Option 4: APK
1. `npm run build`
2. `npx cap add android`
3. `npx cap sync`
4. `npx cap open android`
5. Build APK dans Android Studio