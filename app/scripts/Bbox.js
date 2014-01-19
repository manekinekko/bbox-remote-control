'use strict';

(function(win) {

	win.Bbox = function Bbox(config) {
		var upnp = new Upnp(config);

		this.action = function(action){
			var args = Array.prototype.slice.call(arguments);
			upnp.action.apply(upnp, args);
		};
		
	};

})(window);