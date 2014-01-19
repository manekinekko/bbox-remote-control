'use strict';

var config = {
	url: 'http://localhost',
	port: 1337,
	controlUrl: 'RenderingControl/Control'
};
var bbox = new Bbox(config);
bbox.action('GetVolume');
bbox.action('SetVolume', 10);