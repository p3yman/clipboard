const electron = require('electron')
const path = require('path')

const { app, Tray, Menu, clipboard } = electron

const STACK_SIZE = 5

app.on('ready', () => {

    let stack = []

    // Create tray menu
    const tray = new Tray(path.join('src', 'trayIcon.png'))
    const contextMenu = Menu.buildFromTemplate([
        {
            label: '<Empty>',
            enabled: false
        }
    ])
    tray.setContextMenu(contextMenu)

    // Check clipboard
    checkClipboardChanged(clipboard, text => {
        stack = addToStack(text, stack)
        tray.setContextMenu(Menu.buildFromTemplate(formatMenu(stack)))
    })

})

// Check clipboard change
function checkClipboardChanged(clipboard, onChange){

    let cache = clipboard.readText()
    let latest

    setInterval( () => {

        latest = clipboard.readText()

        if( latest !== cache ){
            cache = latest
            onChange(cache)
        }

    }, 1000) 

}

// Manage stack
function addToStack(item, stack){

    return [item].concat(stack.length >= STACK_SIZE ? stack.slice(0, stack.length - 1) : stack)

}
