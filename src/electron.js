const { app, BrowserWindow } = require("electron");
if (require('electron-squirrel-startup')) {
	app.quit();
}
app.allowRendererProcessReuse = false

function isStandalone() {
	if (module.filename.includes("app.asar")) {
		return true;
	} else {
		return false;
	}
}

let mainWindow;
const createWindow = () => {
	mainWindow = new BrowserWindow({
		minWidth: 1280,
		minHeight: 900,
		allowRendererProcessReuse: false,
		autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			kiosk: true,
			allowRendererProcessReuse: false,
		},
	});
	mainWindow.loadURL(`file://${__dirname}/index.html`);
	//if (!isStandalone()) {
		mainWindow.webContents.openDevTools();
	//}
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
};
app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required") 
app.on('ready', createWindow);
app.getPath('userData');
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});

