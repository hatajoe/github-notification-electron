var remote = require('remote');
var app = remote.require('app');
var shell = remote.require('shell');
var path = require('path');
var fs = require('fs');
var github = require('octonode');

if (Notification.permission != 'granted') {
	Notification.requestPermission(function (permission) {
  	if (permission != "granted") {
			app.quit();
		}
	})
}

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

var notifications = []
var timer = setInterval(function() {
	if (ghme != undefined) {
 	  ghme.notifications({}, function(err, data, headers) {
 	 		if (data.length > 0) {
				data.forEach(function(e,i,a) {
					if (notifications.indexOf(e.id) >= 0) {
						return;
					}
					notifications.push(e.id);

					var notification = new Notification(e.subject.type, { tag: e.id,  body: e.subject.title });
					notification.onclick = function () {
						shell.openExternal("https://github.com/notifications")
					};
				})
 	   	}
		});
	}
}, 3000);
