var http = require('http'),
	httpProxy = require('http-proxy'),
	util = require('util'),
	colors = require('colors');

var LOCAL_PORT = 1337;
var REMOTE_SERVER = '192.168.1.95';
var REMOTE_PORT = 9020;


var proxy = new httpProxy.createProxyServer({
	target: {
		host: REMOTE_SERVER,
		port: REMOTE_PORT
	}
});
var proxyServer = http.createServer(function(req, res) {
	util.debug(req.url +' with method '+ req.method +' and code '+res.statusCode);
	
	res.setHeader('X-PROXY', 'Node.js');
	res.setHeader('Access-Control-Allow-Origin', '*');
	if(req.method.toLowerCase().indexOf('options') >= 0){
		res.setHeader('Access-Control-Allow-Methods', 'POST,');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type,SOAPACTION');
		res.end();
		return;
	}
	proxy.web(req, res);
});

proxyServer.listen(LOCAL_PORT);