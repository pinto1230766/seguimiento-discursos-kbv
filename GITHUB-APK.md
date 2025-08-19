# 📱 Générer APK via GitHub

## Étapes:

1. **Créer repo GitHub:**
   - Aller sur github.com
   - Nouveau repository "seguimiento-discursos-kbv"
   - Public ou privé

2. **Upload votre code:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/VOTRE-USERNAME/seguimiento-discursos-kbv.git
   git push -u origin main
   ```

3. **Déclencher le build:**
   - Aller dans l'onglet "Actions" sur GitHub
   - Cliquer "Build APK"
   - Attendre 5-10 minutes

4. **Télécharger l'APK:**
   - Dans "Actions" → dernier build
   - Télécharger "seguimiento-discursos-kbv-debug.apk"

## L'APK sera généré automatiquement à chaque push!