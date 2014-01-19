'use strict';

(function(win) {

	win.Transport = function Transport(config) {
		var remoteUrl = config.url+':'+config.port+'/'+config.controlUrl;
		var xhr = new XMLHttpRequest();

		this.send = function(soapBody, soapAction) {
			xhr.open('POST', remoteUrl, true);
			xhr.setRequestHeader("SOAPACTION", soapAction);
			xhr.setRequestHeader('Content-Type', 'text/xml; charset="utf-8"');
			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					console.log(xhr.responseText);
				}
			};
			xhr.send(soapBody);
		}

	};

})(window);