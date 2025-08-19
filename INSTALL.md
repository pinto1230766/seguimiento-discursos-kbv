# Guide d'Installation - Seguimiento Discursos KBV

## 📱 Installation sur Android (Recommandé)

### Méthode 1: Installation PWA (Plus simple)

1. **Ouvrir l'application dans Chrome Android**
   - Aller sur l'URL de l'application
   - Attendre le chargement complet

2. **Installer sur l'écran d'accueil**
   - Appuyer sur le menu Chrome (3 points)
   - Sélectionner "Ajouter à l'écran d'accueil"
   - Confirmer l'installation
   - L'icône apparaît sur l'écran d'accueil

3. **Utilisation**
   - Lancer depuis l'icône (fonctionne comme une app native)
   - Fonctionne 100% offline
   - Notifications Android intégrées

### Méthode 2: APK Capacitor (Optionnel)

```bash
# Générer APK (pour développeurs)
npm install @capacitor/android
npx cap add android
npx cap sync
npx cap open android
# Compiler dans Android Studio
```

## 💻 Installation pour Développement

### Prérequis
- Node.js 16+ 
- npm ou yarn
- Chrome/Firefox (pour tests PWA)

### Installation

```bash
# Cloner le projet
git clone [URL_DU_PROJET]
cd seguimiento-discursos-kbv

# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev

# Ouvrir http://localhost:5173
```

### Build pour Production

```bash
# Créer le build optimisé
npm run build

# Tester le build
npm run preview

# Les fichiers sont dans /dist
```

## 📊 Import des Données Initiales

### 1. Préparer les fichiers HTML

Vous devez avoir ces fichiers:
- `IRMONS-PA-KONVIDI.html` (liste des orateurs)
- `Janvier-Avril-25.html` (programme Jan-Avr 2025)
- `Maiu-Setenbru-25.html` (programme Mai-Sep 2025)
- `Otubru-Dizenbru-25.html` (programme Oct-Déc 2025)
- `Janeru-Marsu-26.html` (programme Jan-Mar 2026)

### 2. Import dans l'application

1. **Aller dans Calendário**
2. **Cliquer sur "Importar Programa"**
3. **Sélectionner tous les fichiers HTML**
4. **Attendre l'import automatique**
5. **Vérifier les données importées**

### 3. Format des fichiers HTML attendu

Les fichiers doivent contenir des tables HTML avec:

**Pour IRMONS-PA-KONVIDI.html:**
```html
<tr>
  <td>Nome do Orador</td>
  <td>Congregação</td>
  <td>Última Visita</td>
  <td>N° Discurso</td>
  <td>Próxima Visita</td>
  <td>N° Discurso</td>
</tr>
```

**Pour les programmes:**
```html
<tr>
  <td>Data</td>
  <td>Orador</td>
  <td>Congregação</td>
  <td>N° Discurso</td>
  <td>Tema</td>
  <td>Presidente</td>
  <td>Sentinela</td>
  <td>Leitor</td>
</tr>
```

## ⚙️ Configuration Initiale

### 1. Première utilisation

1. **Choisir la langue** (PT/FR/KBV)
2. **Configurer les notifications** (Configurações → Configurar Notificações)
3. **Importer les données** (voir section ci-dessus)
4. **Ajouter les anfitriões locaux**

### 2. Sauvegarde automatique

- Les données sont sauvées automatiquement dans IndexedDB
- Sauvegarde quotidienne dans Downloads Android
- Export manuel disponible dans Configurações

### 3. Notifications Android

```javascript
// Les notifications sont programmées automatiquement pour:
- J-7: Lembrete de visita
- J-2: Confirmação final  
- J-0: Dia da visita
- Alertas de alergia grave
```

## 🔧 Dépannage

### Problèmes courants

**L'application ne s'installe pas:**
- Vérifier que Chrome est à jour
- Essayer en navigation privée
- Vider le cache du navigateur

**Import des fichiers ne fonctionne pas:**
- Vérifier le format HTML des fichiers
- S'assurer que les tables sont bien structurées
- Essayer un fichier à la fois

**Notifications ne marchent pas:**
- Aller dans Configurações → Configurar Notificações
- Autoriser les notifications dans les paramètres Android
- Vérifier que l'app n'est pas en mode économie d'énergie

**Données perdues:**
- Les données sont dans IndexedDB (persistantes)
- Utiliser Export/Import dans Configurações
- Éviter de vider les données du navigateur

### Logs de débogage

```javascript
// Ouvrir la console développeur (F12)
// Vérifier les erreurs dans:
console.log('Données oradores:', localStorage.getItem('discursos-kbv-storage'))
```

## 📱 Utilisation Optimale sur Android

### Gestes tactiles
- **Swipe left/right**: Navigation entre pages
- **Pull down**: Actualiser les listes
- **Long press**: Menu contextuel
- **Double tap**: Zoom sur calendrier

### Partage Android
- **Contacts**: Export automatique en vCard
- **Calendrier**: Export en format ICS
- **Backup**: Partage via intent Android

### Mode offline
- Toutes les fonctionnalités disponibles sans internet
- Synchronisation automatique quand la connexion revient
- Cache intelligent des ressources

## 🆘 Support

Pour les problèmes techniques:
1. Vérifier ce guide d'installation
2. Consulter les logs dans la console
3. Faire un export des données avant dépannage
4. Réinstaller l'application si nécessaire

L'application est conçue pour fonctionner de manière autonome sur Android sans support technique constant.