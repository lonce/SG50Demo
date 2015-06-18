
require.config({
	paths: {
		"jsaSound": (function(){
			if (! window.document.location.hostname){
				alert("This page cannot be run as a file, but must be served from a server (e.g. animatedsoundworks.com:8001, or localhost:8001)." );
			}
				// hardcoded to read sounds served from jsaSound listening on port 8001 (on the same server as the AnticipatoryScore server is running)
				//var host = "http://"+window.document.location.hostname + ":8001";
				// get sound models from the cloud
				host = "http://"+"animatedsoundworks.com" + ":8001";
				//alert("Will look for sounds served from " + host);
				return (host );
			})()
	}
});
require(
	[ "cells", "mods/comm", "mods/utils", "mods/touch2Mouse",  "soundbank", "agentPlayer", "config", "leadClientConfig"],

	function ( cellfactory, comm, utils, touch2Mouse,  soundbank, agentPlayer, config, leadClientConfig) {

		var mouse_down=false;
		var m_agent = agentPlayer();

		leadClientConfig.on("submit", function(){
			// unsubscribe to previous room, join new room
			if (myRoom != undefined) comm.sendJSONmsg("unsubscribe", [myRoom]);
    		myRoom  = leadClientConfig.room;
			if (myRoom != undefined) {
				console.log("leadClientConfig.report: joing a room named " + myRoom); 
				comm.sendJSONmsg("subscribe", [myRoom]);
				// Tell everybody in the room to restart their timers.
				comm.sendJSONmsg("startTime", []);
			} 
		});


		// Button Handlers ----------------------------------------------------------
		var ahButton = window.document.getElementById("ahButton");
		ahButton.onclick=function(){
			if (m_agent!=undefined){
				m_agent=undefined;
			} else{
				m_agent=agentPlayer();
			}
		}

		var playButton = window.document.getElementById("playButton");
		var stopButton = window.document.getElementById("stopButton");

		playButton.onclick=function(){
			console.log("play");
			comm.sendJSONmsg("play", []);
		}

		stopButton.onclick=function(){
			console.log("stop");
			comm.sendJSONmsg("stop", []);
		}
//------------------------------------------------------------------------

        var myrequestAnimationFrame = utils.getRequestAnimationFrameFunc();

		var timeOrigin=Date.now();
		var serverTimeOrigin=0;
		var serverTime=0;
		var myID=0;
		var myRoom=undefined;


		var g_selectModeP = false;
		var m_selectedElement = undefined;

		var m_lastDisplayTick=0;
		var m_tickCount=0;
		var k_timeDisplayElm=window.document.getElementById("timeDisplayDiv");

		var last_mousemove_event={
			"x":0,
			"y":0
		}; // holds the last known position of the mouse over the canvas (easier than getting the position of a mouse that hasn't moved even though the score underneath it has....)

		var k_minLineThickness=1;
		var k_maxLineThickness=16; // actually, max will be k_minLineThickness + k_maxLineThickness



		//---------------------------------------------------------------------------
		// init is called just after a client navigates to the web page
		// 	data[0] is the client number we are assigned by the server.
		comm.registerCallback('init', function(data) {
			//pong.call(this, data[1]);
			myID=data[0];
			console.log("Server acknowledged, assigned me this.id = " + myID);


		});

		//---------------------------------------------------------------------------
		comm.registerCallback('metroPulse', function(data, src) {
			serverTime=data;
			// check server elapsed time again client elapsed time
			//console.log("on metropulse, server elapsed time = " + (serverTime-serverTimeOrigin) +  ", and client elapsed = "+ (Date.now() - timeOrigin ));
		});
		//---------------------------------------------------------------------------
		comm.registerCallback('startTime', function(data) {
			console.log("server startTime = " + data[0] );
			m_agent && m_agent.reset();
			
			timeOrigin=Date.now();
			serverTimeOrigin=data[0];
			m_lastDisplayTick=0;
		});
		//---------------------------------------------------------------------------
		comm.registerCallback('newmember', function(data, src) {
			console.log("new member : " + src);
		});
		//---------------------------------------------------------------------------
		// src is meaningless since it is this client
		comm.registerCallback('roommembers', function(data, src) {
			if (data.length > 1) 
					console.log("there are other members in this room!");
		});


		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		// Client activity
		//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		var interfaceDiv = document.getElementById("block1b");
		//interfaceDiv.width = interfaceDiv.clientWidth;
		//interfaceDiv.height = interfaceDiv.clientHeight;

		var mouseX;
		var mouseY;

		numXcells=6;
		numYcells=3;

		cellDivWPct=100/numXcells;
		cellDivHPct=100/numYcells;

		//var cellSizeX=interfaceDiv.width/numXcells
		//var cellSizeY=interfaceDiv.height/numYcells;

		//console.log("divwidth = "+ interfaceDiv.width + ", div.height = "+ interfaceDiv.height);
		//console.log("cellSizeX = "+ cellSizeX + ", cellSizeY = "+ cellSizeY);

		var m_divs = new Array(numXcells);

		var foo=document.createElement("input");
		for(var i=0;i<numYcells;i++){
			m_divs[i]=new Array(numYcells);
			for(var j=0;j<numXcells;j++){
				m_divs[i][j]=cellfactory(cellDivWPct, cellDivHPct);
        		m_divs[i][j].style.top = i*cellDivHPct + "%";
        		m_divs[i][j].style.left = j*cellDivWPct + "%";  
				m_divs[i][j].style.backgroundColor=utils.hslToRgb(Math.random() , .1 +.2*Math.random(), .6+.2* Math.random());
        		      		//console.log("top = "+ m_divs[i][j].style.top + ", left = "+ m_divs[i][j].style.left);
				interfaceDiv.appendChild(m_divs[i][j]);
				
				

				//console.log("cell["+i+"]["+j+"]  x="+m_cell[i][j].x + ", y="+m_cell[i][j].y);
			}
		}

		var lastDrawTime=0;
		var t_sinceOrigin;

/*
		theCanvas.addEventListener("mousedown", onMouseDown, false);
		theCanvas.addEventListener("mouseup", onMouseUp, false);
		theCanvas.addEventListener("mousemove", onMouseMove, false);

		theCanvas.addEventListener("touchstart", touch2Mouse.touchHandler, true);
      	theCanvas.addEventListener("touchmove", touch2Mouse.touchHandler, true);
      	theCanvas.addEventListener("touchend", touch2Mouse.touchHandler, true);
      	theCanvas.addEventListener("touchcancel", touch2Mouse.touchHandler, true);    
*/


		window.onbeforeunload = function (e) {
			comm.sendJSONmsg("stop", []);
		}

	}
);