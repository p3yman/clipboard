const electron = require('electron')
const path = require('path')

const { app, Tray, Menu, clipboard } = electron

app.on('ready', () => {

    const tray = new Tray(path.join('src', 'trayIcon.png'))
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Here'
        }
    ])
    
    tray.setContextMenu(contextMenu)


})
