const { app, BrowserWindow, Menu, shell } = require('electron')
const path = require('path')

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, 'public/pwa-512x512.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true
    },
    titleBarStyle: 'default',
    show: false
  })

  // Menu simple
  const template = [
    {
      label: 'Fichier',
      submenu: [
        {
          label: 'Actualiser',
          accelerator: 'F5',
          click: () => mainWindow.reload()
        },
        {
          label: 'Outils de développement',
          accelerator: 'F12',
          click: () => mainWindow.webContents.toggleDevTools()
        },
        { type: 'separator' },
        {
          label: 'Quitter',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => app.quit()
        }
      ]
    },
    {
      label: 'Affichage',
      submenu: [
        {
          label: 'Plein écran',
          accelerator: 'F11',
          click: () => mainWindow.setFullScreen(!mainWindow.isFullScreen())
        },
        {
          label: 'Zoom +',
          accelerator: 'Ctrl+=',
          click: () => {
            const currentZoom = mainWindow.webContents.getZoomFactor()
            mainWindow.webContents.setZoomFactor(currentZoom + 0.1)
          }
        },
        {
          label: 'Zoom -',
          accelerator: 'Ctrl+-',
          click: () => {
            const currentZoom = mainWindow.webContents.getZoomFactor()
            mainWindow.webContents.setZoomFactor(currentZoom - 0.1)
          }
        },
        {
          label: 'Zoom normal',
          accelerator: 'Ctrl+0',
          click: () => mainWindow.webContents.setZoomFactor(1.0)
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  // Charger l'app
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist/index.html'))
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // Empêcher la navigation externe
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})