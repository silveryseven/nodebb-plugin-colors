(function() {
	"use strict";
	var Color = {},
		Remarkable = require('remarkable'),
		parser,
		html = '<span style="color: $1">$2</span>';


	Color = {
		onLoad: function (params, callback) {
			Color.init();
			callback();
		},
		init: function () {
			parser = new Remarkable();
		},
		parsePost: function(data, callback) {
			var match = /%\((#(?:[A-Fa-f0-9]{3}(?:[A-Fa-f0-9]{3})?)|(?:rgb\(\d{1,3},\d{1,3},\d{1,3}\))|(?:[a-z]){3,})\)\[(.+?)\]/g;

			if (data && data.postData && data.postData.content) {
				data.postData.content = data.postData.content.replace(match, html);
				
				data.postData.content = parser.render(data.postData.content);
			}

			callback(null, data);	
		},
		parseSignature: function (data, callback) {
			if (data && data.userData && data.userData.signature) {
				data.userData.signature = parser.render(data.userData.signature);
			}
			callback(null, data);
		},
		parseRaw: function (raw, callback) {
			callback(null, raw ? parser.render(raw) : raw);
		}
	};

	module.exports = Color;
}());
