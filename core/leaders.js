
/* Villo Leaders */
(function(){
	villo.leaders = {		
/**
	villo.leaders.get
	=================
	
    Get the top scores in your app, based on durations. As of 0.8.5, you can use multiple leader boards per app. You can also specify how many records you want to retrieve, to increase performance.
    
    Calling
	-------

	`villo.leaders.get({duration: string, board: string, callback: function, limit: number})`
    
    - "Duration" is the time frame you want to load the scores from. Possible durations include "all", "year", "month", "day", and "latest".
    - "Board"  is an optional parameter that lets you specify what leaderboard you wish to grab scores from in your application.
    - "Callback" is a function that is called when the retrieval of scores from the server is completed. The scores object is passed to the callback.
    - "Limit" is an optional parameter that lets you limit the number of scores retrieved from the database, for performance reasons. If the parameter is not passed, a value of 30 will be used by default.

	Callback
	--------
	
	An object will be passed to the callback. The object will be formatted like this, where data is the score submitted:
	
		{"leaders":[
			{"username":"kesne","data":"203","date":"2011-06-24"},
			{"username":"kesne","data":"193","date":"2011-06-13"},
			{"username":"admin","data":"110","date":"2011-06-13"},
		]}
	
	Use
	---
	
		villo.leaders.get({
			duration: "all",
			callback: function(leaderboard){
				//Check for errors.
				if(leaderboard && leaderboard.leaders){
					var leaders = leaderboard.leaders;
					//Now you can do something with the leaderboard array, stored in the leaders array.
				}else{
					//Some error occured.
					alert("Error getting leaderboards.")
				}
			},
			limit: 50
		});

*/
		get: function(getObject){
			if (getObject.board && getObject.board !== "") {
				var leaderBoardName = getObject.board;
			} else {
				var leaderBoardName = villo.app.title;
			}
			
			if(getObject.limit && getObject.limit !== "" && typeof(getObject.limit) == "number"){
				var leaderLimiter = getObject.limit;
			}else{
				var leaderLimiter = 30;
			}
			
			villo.ajax("https://api.villo.me/leaders.php", {
				method: 'post',
				parameters: {
					api: villo.apiKey,
					type: getObject.duration,
					username: villo.user.username,
					appName: leaderBoardName,
					appid: villo.app.id,
					limit: leaderLimiter
				},
				onSuccess: function(transport){
					villo.verbose && villo.log("Success!");
					villo.verbose && villo.log(transport);
					if (transport !== "") {
						var tmprsp = JSON.parse(transport)
						if (tmprsp.leaders) {
							getObject.callback(tmprsp);
						} else 
							if (transport == 33 || transport == 66 || transport == 99) {
								getObject.callback(transport);
							} else {
								getObject.callback(33);
							}
					} else {
						getObject.callback(33);
					}
				},
				onFailure: function(failure){
					villo.verbose && villo.log("failure!");
					getObject.callback(33);
				}
			});
		},
/**
	villo.leaders.search
	====================
	
    Search the leaderboard records for a user's scores. The username can be partial, or complete. All username matches will be retrieved. You can also specify how many records you want to retrieve, to increase performance.
    
    Calling
	-------

	`villo.leaders.search({username: string, board: string, callback: function, limit: number})`
    
    - "Username" is the full or partial username you want to get the scores for.
    - "Board"  is an optional parameter that lets you specify what leaderboard you wish to grab scores from in your application.
    - "Callback" is a function that is called when the retrieval of the user's scores from the server is completed. The scores object is passed to the callback.
    - "Limit" is an optional parameter that lets you limit the number of scores retrieved from the database, for performance reasons. If the parameter is not passed, a value of 30 will be used by default.

	Callback
	--------
	
	An object will be passed to the callback. The object will be formatted like this, where data is the score submitted:
	
		{"leaders":[
			{"username":"noah","data":"243","date":"2011-06-24"},
			{"username":"noah","data":"200","date":"2011-06-24"},
			{"username":"noahtest","data":"178","date":"2011-06-13"},
			{"username":"noahtest2","data":"93","date":"2011-06-13"},
		]}
	
	Use
	---
	
		villo.leaders.search({
			username: this.$.scoreSearch.getValue(),
			callback: function(leaderboard){
				//Check for errors.
				if(leaderboard && leaderboard.leaders){
					var leaders = leaderboard.leaders;
					//Now you can do something with the leaderboard array, stored in the leaders array.
				}else{
					//Some error occured.
					alert("Error getting leaderboards.")
				}
			},
			limit: 50
		});

*/
		search: function(getObject){
			if (getObject.board && getObject.board !== "") {
				var leaderBoardName = getObject.board;
			} else {
				var leaderBoardName = villo.app.title;
			}
			
			if(getObject.limit && getObject.limit !== "" && typeof(getObject.limit) == "number"){
				var leaderLimiter = getObject.limit;
			}else{
				var leaderLimiter = 30;
			}
			
			villo.ajax("https://api.villo.me/leaders.php", {
				method: 'post',
				parameters: {
					api: villo.apiKey,
					type: "search",
					username: villo.user.username,
					appName: leaderBoardName,
					appid: villo.app.id,
					usersearch: getObject.username,
					limit: leaderLimiter
				},
				onSuccess: function(transport){
					villo.verbose && villo.log("Success!");
					villo.verbose && villo.log(transport);
					if (transport !== "") {
						var tmprsp = JSON.parse(transport)
						if (tmprsp.leaders) {
							getObject.callback(tmprsp);
						} else 
							if (transport == 33 || transport == 66 || transport == 99) {
								getObject.callback(transport);
							} else {
								getObject.callback(33);
							}
					} else {
						getObject.callback(33);
					}
				},
				onFailure: function(failure){
					villo.verbose && villo.log("failure!");
					getObject.callback(33);
				}
			});
		},
		
		/**
		 * Submit a score to the app's leaderboard. As of 0.8.5, multiple leaderboards are supported, as well as anonymous postings for users not logged in.
		 * @param {object} scoreObject Options for the leaderboard, and the callback.
		 * @param {string} scoreObject.score The score you wish to submit to the leaderboard.
		 * @param {string} scoreObject.board Optional parameter. This is the name of the board that you want to submit to. If none is selected, the applications name will be used.
		 * @param {function} scoreObject.callback Funtion to call once the score is submitted.
		 * @since 0.8.0
		 */
/**
	villo.leaders.submit
	====================
	
    Submit a given (numerical) score to a leaderboard.
    
    Calling
	-------

	`villo.leaders.get({duration: string, board: string, callback: function, limit: number})`
    
    - "Duration" is the time frame you want to load the scores from. Possible durations include "all", "year", "month", "day", and "latest".
    - "Board"  is an optional parameter that lets you specify what leaderboard you wish to grab scores from in your application.
    - "Callback" is a function that is called when the retrieval of scores from the server is completed. The scores object is passed to the callback.
    - "Limit" is an optional parameter that lets you limit the number of scores retrieved from the database, for performance reasons. If the parameter is not passed, a value of 30 will be used by default.

	Callback
	--------
	
	An object will be passed to the callback. The object will be formatted like this, where data is the score submitted:
	
		{"leaders":[
			{"username":"kesne","data":"203","date":"2011-06-24"},
			{"username":"kesne","data":"193","date":"2011-06-13"},
			{"username":"admin","data":"110","date":"2011-06-13"},
		]}
	
	Use
	---
	
		villo.leaders.get({
			duration: "all",
			callback: function(leaderboard){
				//Check for errors.
				if(leaderboard && leaderboard.leaders){
					var leaders = leaderboard.leaders;
					//Now you can do something with the leaderboard array, stored in the leaders array.
				}else{
					//Some error occured.
					alert("Error getting leaderboards.")
				}
			},
			limit: 50
		});

*/
//TODO: Figure out callback
		submit: function(scoreObject){
		
			if (scoreObject.board && scoreObject.board !== "") {
				var leaderBoardName = scoreObject.board;
			} else {
				var leaderBoardName = villo.app.title;
			}
			if (villo.user.username == "" || !villo.user.username || (scoreObject.anon && scoreObject.anon == true)) {
				var leaderBoardUsername = "Guest"
			} else {
				var leaderBoardUsername = villo.user.username;
			}
			
			villo.ajax("https://api.villo.me/leaders.php", {
				method: 'post',
				parameters: {
					api: villo.apiKey,
					type: "submit",
					username: leaderBoardUsername,
					token: villo.user.token,
					appName: leaderBoardName,
					appid: villo.app.id,
					score: scoreObject.score
				},
				onSuccess: function(transport){
					villo.verbose && villo.log(transport);
					if (transport !== "") {
						var tmprsp = JSON.parse(transport)
						if (tmprsp.leaders) {
							scoreObject.callback(tmprsp);
						} else if (transport == 33 || transport == 66 || transport == 99) {
							scoreObject.callback(transport);
						} else {
							scoreObject.callback(33);
						}
					} else {
						scoreObject.callback(33);
					}
				},
				onFailure: function(failure){
					villo.verbose && villo.log("failure!");
					scoreObject.callback(33);
				}
			});
		}
	}
})();
