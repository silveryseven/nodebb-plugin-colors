(function() {
	"use strict";
	var Color = {},
		html = '<span style="color: $1">$2</span>';


	Color = {
		onLoad: function (params, callback) {

			callback();
		},
		parsePost: function(data, callback) {
			var match = /%\((#(?:[A-Fa-f0-9]{3}(?:[A-Fa-f0-9]{3})?)|(?:rgb\(\d{1,3},\d{1,3},\d{1,3}\))|(?:[a-z]){3,})\)\[(.+?)\]/g;

			if (data && data.postData && data.postData.content) {
				data.postData.content = data.postData.content.replace(match, html);
				
				
			}

			callback(null, data);	
		},
		parseRaw: function (raw, callback) {

			var match = /%\((#(?:[A-Fa-f0-9]{3}(?:[A-Fa-f0-9]{3})?)|(?:rgb\(\d{1,3},\d{1,3},\d{1,3}\))|(?:[a-z]){3,})\)\[(.+?)\]/g;			

			callback(null, raw ? raw.replace(match, html) : raw);
		}
	};

	module.exports = Color;
}());
