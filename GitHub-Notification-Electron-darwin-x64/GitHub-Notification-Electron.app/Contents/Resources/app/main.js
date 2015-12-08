'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var Menu = require('menu');
var Tray = require('tray');

var mainWindow = null;
var appIcon = null;
app.on('ready', function(){
	
	Menu.setApplicationMenu(menu);

	mainWindow = new BrowserWindow({show:false});
	//mainWindow = new BrowserWindow({show:true});
	mainWindow.loadUrl('file://' + __dirname + '/index.html');

  appIcon = new Tray(__dirname + '/icon.png');
	app.dock.hide()
  var contextMenu = Menu.buildFromTemplate([
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function() { app.quit(); }
      },
  ]);
  appIcon.setToolTip('GitHub Notification Electron');
  appIcon.setContextMenu(contextMenu);
});

var template = [
  {
    label: 'View',
    submenu: [
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function() { app.quit(); }
      },
      //{
      //  label: 'Reload',
      //  accelerator: 'CmdOrCtrl+R',
      //  click: function(item, focusedWindow) {
      //    if (focusedWindow)
      //      focusedWindow.reload();
      //  }
      //},
      //{
      //  label: 'Toggle Developer Tools',
      //  accelerator: (function() {
      //    if (process.platform == 'darwin')
      //      return 'Alt+Command+I';
      //    else
      //      return 'Ctrl+Shift+I';
      //  })(),
      //  click: function(item, focusedWindow) {
      //    if (focusedWindow)
      //      focusedWindow.toggleDevTools();
      //  }
      //},
    ]
  },
];

var menu = Menu.buildFromTemplate(template);

