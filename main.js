const { app, BrowserWindow } = require('electron/main')
const path = require('node:path');

let watching = app.commandLine.hasSwitch("watch");

const createWindow = (path = 'dist/bounty-board/browser/index.html') => { // Default Location for build output of angular apps
	let notprod = process.env.NODE_ENV !== 'production';

	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			// preload: path.join(__dirname, 'preload.js'),
			devTools: notprod
		}
	});

	// win.loadFile(path);
	win.loadURL(path);
	win.removeMenu();
	notprod && win.webContents.openDevTools({mode: 'undocked'});
	return win;
}

app.whenReady().then(() => {
	if (watching)
	{
		createWindow("http://localhost:4200");
	} else {
		createWindow();
	}

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('browser-window-created', (e, win) => {
	win.removeMenu();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
