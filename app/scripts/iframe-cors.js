'use strict';

var soapRequestTemplate = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body>{0}</s:Body></s:Envelope>';

var API = {
	remote: 'http://0.0.0.0:1337',
	mute: '/RenderingControl/Control'
};

function sendMute(value){
	var soapAction = 'urn:schemas-upnp-org:service:RenderingControl:1#SetMute';
	var soapBody = '<u:SetMute xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>0</InstanceID><Channel>Master</Channel><DesiredMute>' + value + '</DesiredMute></u:SetMute>';
	var xml = soapRequestTemplate.replace('{0}', soapBody);
	send(API.remote+API.mute, xml, soapAction);
}

function send(url, xml, soapAction) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader("SOAPACTION", soapAction);
	xhr.setRequestHeader('Content-Type', 'text/xml; charset="utf-8"');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log(xhr.responseText);
			} else {
				console.log('There was a problem with the request.');
			}
		}
	};
	xhr.send(xml);
}