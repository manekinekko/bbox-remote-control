'use strict';

(function(win) {

	win.Upnp = function Upnp() {

		var xhr = new Transport(config);
		var soapRequestTemplate = '<?xml version="1.0" encoding="utf-8"?>' +
			'<s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">' +
			'<s:Body>{0}</s:Body>' +
			'</s:Envelope>';
		var soapActionTemplate = '<u:{0} xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1">{1}</u:{0}>';
		var API = {
			GetMute: function() {
				return soapActionTemplate
					.replace('{0}', 'GetMute')
					.replace('{1}', '<InstanceID>0</InstanceID><Channel>Master</Channel>');
			},
			SetMute: function(value) {
				return soapActionTemplate
					.replace('{0}', 'SetMute')
					.replace('{1}', '<InstanceID>0</InstanceID><Channel>Master</Channel><DesiredMute>' + (value || 0) + '</DesiredMute>');
			},
			GetVolume: function() {
				return soapActionTemplate
					.replace('{0}', 'GetVolume')
					.replace('{1}', '<InstanceID>0</InstanceID><Channel>Master</Channel>');
			},
			SetVolume: function(value){
				return soapActionTemplate
					.replace('{0}', 'SetVolume')
					.replace('{1}', '<InstanceID>0</InstanceID><Channel>Master</Channel><DesiredVolume>' + (value || 10) + '</DesiredVolume>');
			}
		}

		this.action = function(action) {
			var urn = 'urn:schemas-upnp-org:service:RenderingControl:1#' + action;
			var soapBody = '';
			if (API[action]) {
				var args = Array.prototype.slice.call(arguments);
				soapBody = API[action].apply(this, args.slice(1));
				soapBody = soapRequestTemplate.replace('{0}', soapBody);
				return xhr.send(soapBody, urn);
			}

			return false;

		};

	};

})(window);