// ref: http://qiita.com/mottox2/items/7a1373f23ba02245d0e0
var remote = require('remote');
var app = remote.require('app');
var github = require('octonode');

var webview = document.getElementById('mainWebview');
var title = "";
var unreadCount = "";
var timer = setInterval(function() {
	var client = github.client(process.env.GITHUB_ELECTON);
  var ghme = client.me();
  ghme.notifications({}, function(err, data, headers) {
		if (data.length > 0) {
  		app.dock.setBadge("1");
		} else {
  		app.dock.setBadge("");
		}
  });
}, 3000);
