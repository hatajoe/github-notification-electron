// ref: http://qiita.com/mottox2/items/7a1373f23ba02245d0e0
var remote = require('remote');
var app = remote.require('app');
var path = require('path');
var fs = require('fs');
var github = require('octonode');

var webview = document.getElementById('mainWebview');

var dataFilePath = path.join(app.getPath('home'), '.github-electron'); 
var data;
if (!fs.existsSync(dataFilePath)) {
	data = {};
}
data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8')); 
var token = null
if ('token' in data) {
	token = data['token'];
} 

var client, ghme;
if (token != null)  {
  client = github.client(token);
  ghme = client.me();
}

var timer = setInterval(function() {
	if (ghme != undefined) {
 	  ghme.notifications({}, function(err, data, headers) {
 	 		if (data.length > 0) {
 	   		app.dock.setBadge(data.length + "");
 	   	} else {
 	   		app.dock.setBadge("");
 	   	}
 	  });
	}
}, 3000);
