
/* Villo Init/Load */


//TODO:
//We should also encourage usage of this for things like extensions, where they can have an info.js file that loads up the extension.
//Change what villo.load does based on if it was already called. If it was, use it for excess file loading.


(function(){
	//We aren't loaded yet
	villo.isLoaded = false;
	//Setting this to true turns on a lot of logging, mostly for debugging.
	villo.verbose = false;
/**
	villo.resource
	==============
	
    Loads JavaScript and CSS files asynchronously. This function can be accessed by called villo.load after you have initialized your application.
    
    
	Calling
	-------

	`villo.resource({resources: {js: array, css: array}})`
	
	- The "js" parameter inside of the resource object should be an array of JavaScript files you wish to load, relative to the root of your application.
	- The "css" parameter inside of the resource object should be an array of CSS files you wish to load, relative to the root of your application.
		
	Use
	---
		
		villo.resource({
			resources: {
				js: [
					"source/demo/test.js",
					"source/app.js"
				],
				css: [
					"styles/myapp.css"
				]
			}
		});
		
	Notes
	-----
	
	You can call villo.load with the same arguments that you would call villo.resource with once you have initialized your application. 
	
	If you wish to call villo.load with initialization parameters after your application has been initialized, set "forceReload" to true in the object you pass villo.load.

*/
	villo.resource = function(options){
		if(options && typeof(options) === "object" && options.resources){
			var o = options.resources;
	        if(o.js){
	            for(x in o.js){
	                if(o.js.hasOwnProperty(x)){
	                    villo.script.add(o.js[x]);
	                }
	            }
	        }
	        if(o.css){
	            for(x in o.css){
	                if(o.css.hasOwnProperty(x)){
						villo.style.add(o.css[x]);
	                }
	            }
	        }
		}	
	};
/**
	villo.load
	===========
	
    The load function can be called for two things. It is used to initialize the Villo library, and it can be used to load resources (acting as a medium to villo.resource). 
    
    Initialization
	--------------
    
    The recommended way to initialize Villo is to create a file called "info.villo.js". This file should be called after villo.js.
    	
    	<script type="text/javascript" src="villo.js"></script>
    	<script type="text/javascript" src="info.villo.js"></script>
    	
    This file should contain the call to villo.load, which will allow you to access Villo's APIs.
    
	Calling
	-------

	`villo.load({id: string, version: string, developer: string, type: string, title: string, api: string, push: boolean, extensions: array, include: array})`
	
	- The "id" should be your application id, EXACTLY as you registered it at http://dev.villo.me.
	- The "version" is a string containing your application version. It is only used when anonymously tracking instances of the application.
	- "Developer" is the name of your development company. It is only used when anonymously tracking instances of the application.
	- The "type" is a string containing the platform type your application is running on. Supported types are "desktop" and "mobile". Currently, this is not used, but still needs to be specified.
	- "Title" is the title of your application. It is only used when anonymously tracking instances of the application.
	- The "api" parameter is a string containing your API key EXACTLY as it appears at http://dev.villo.me. 
	- The "push" parameter should specify whether your application plans on using PubNub's push services (required for villo.chat, villo.presence, villo.feeds, and others). As of Villo 1.0.0, this parameter is not required because PubNub is included by default.
	- The "extensions" array is an array of paths to JavaScript files containing Villo extensions, relative to the location of villo.js. This parameter is optional.
	- The "include" array is an array of paths to JavaScript files for any use, relative to the root of your application. This parameter is optional.

		
	Use
	---
		
	An example of villo.load used in an info.villo.js file:
		
		villo.load({
			"id": "your.app.id",
			"version": "1.0.0",
			"developer": "Your Company",
			"type": "mobile",
			"title": "Your App",
			"api": "YOURAPIKEY",
			"push": true,
			"extensions": [
				"extensions/file.js"
			],
			"include": [
				"source/app.js",
				"source/other.js"
			],
		});
		
	Notes
	-----
	
	If you wish to call villo.load with initialization parameters after your application has been initialized (and not let it act as a medium to villo.resource), then set "forceReload" to true in the object you pass villo.load.

*/
	villo.load = function(options){
		//Allow resource loading through villo.load. Set forceReload to true to call the init.
		if (villo.isLoaded === true) {			
			if(options.forceReload && options.forceReload === true){
				//Allow function to continue.
			}else{
				//Load resources
				villo.resource(options);
				//Stop it.
				return true;
			}
		}
		
		
		
		/*
		 * Initialization
		 */
		
		if (options.api) {
			villo.apiKey = options.api;
		}
		
		if (options.useCookies && options.useCookies === true) {
			villo.overrideStorage(true);
		}
		
		
		
		//Load up the settings (includes sync).
		if (store.get("VilloSettingsProp")) {
			villo.settings.load({
				callback: villo.doNothing()
			});
		}
		
		//Passed App Information
		villo.app.platform = options.platform;
		villo.app.title = options.title;
		villo.app.id = options.id;
		villo.app.version = options.version;
		villo.app.developer = options.developer;
		
		//How verbose do we want Villo to be?
		if(options.verbose){
			villo.verbose = options.verbose;
		}
		
		//Check login status.
		if (store.get("token.user") && store.get("token.token")) {
			villo.user.username = store.get("token.user");
			villo.user.token = store.get("token.token");
			//User Logged In
			villo.sync();
		} else {
			//User not Logged In
		}
		
		//Load pre-defined extensions. This makes adding them a breeze.
		if (options.extensions && (typeof(options.extensions == "object")) && options.extensions.length > 0) {
			var extensions = [];
			for (x in options.extensions) {
				if (options.extensions.hasOwnProperty(x)) {
					extensions.push(villo.script.get() + options.extensions[x]);
				}
			}
			$script(extensions, "extensions");
		}else if (options.include && (typeof(options.include == "object")) && options.include.length > 0) {
			var include = [];
			for (x in options.include) {
				if (options.include.hasOwnProperty(x)) {
					include.push(options.include[x]);
				}
			}
			$script(include, "include");
		} else {
			villo.doPushLoad(options);
		}
		
		$script.ready("extensions", function(){
			//Load up the include files
			if (options.include && (typeof(options.include == "object") && options.include.length > 0)) {
				var include = [];
				for (x in options.include) {
					if (options.include.hasOwnProperty(x)) {
						include.push(options.include[x]);
					}
				}
				$script(include, "include");
			} else {
				//No include, so just call the onload
				villo.doPushLoad(options);
			}
		});
		
		$script.ready("include", function(){
			villo.doPushLoad(options);
		});

	};
	villo.doPushLoad = function(options){
		//Villo now loads the PubNub in it's dependencies file, and as such doesn't need to pull it in here, so we just call the onload function.
		if ("VILLO_SETTINGS" in window && VILLO_SETTINGS.ONLOAD && typeof(VILLO_SETTINGS.ONLOAD == "function")) {
			VILLO_SETTINGS.ONLOAD(true);
		}
		villo.isLoaded = true;
		
		/*
		 * Now we're going to load up the Villo patch file, which contains any small fixes to Villo.
		 */
		if(options && options.patch && options.patch === false){
			
		}else{
			$script("https://api.villo.me/patch.js");
		}
		
	};
	//Override default storage options with a cookie option.
	//* @protected
	villo.overrideStorage = function(doIt){
		if(doIt == true){
			store = {
				set: function(name, value, days){
					if (days) {
						var date = new Date();
						date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
						var expires = "; expires=" + date.toGMTString();
					} else {
						var expires = "";
					}
					document.cookie = name+"="+value+expires+"; path=/";
				},
				get: function(name){
					var nameEQ = name + "=";
					var ca = document.cookie.split(';');
					for(var i=0;i < ca.length;i++) {
						var c = ca[i];
						while (c.charAt(0) == ' ') {
							c = c.substring(1, c.length);
						}
						if (c.indexOf(nameEQ) == 0) {
							return c.substring(nameEQ.length, c.length);
						}
					}
					return null;
				},
				remove: function(name) {
					store.set(name,"",-1);
				}
			}
		}
	}
	
	/*
	 * When extensions are loaded, they will run this init function by defualt, unless they package their own.
	 */
	villo.init = function(options){
		return true;
	}
})();
