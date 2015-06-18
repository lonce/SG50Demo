
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
	[ "cells",  "mods/utils", "mods/touch2Mouse",  "soundbank",  "config"],

	function ( cellfactory,  utils, touch2Mouse,  soundbank, config) {

		// Button Handlers ----------------------------------------------------------
		var randomizeButton = window.document.getElementById("randomizeButton");

		var randomize = function (count){
			for(var i=0;i<numYcells;i++){
				for(var j=0;j<numXcells;j++){
					m_cell[i][j].zero();
				}
			}
			totalCount = 0;

			for (i=0;i<count; i++){
				cI=Math.floor(numYcells*Math.random());
				cJ=Math.floor(numXcells*Math.random());
				m_cell[cI][cJ].addMember();
			}
		}


		randomizeButton.onclick=function(){
			randomize(totalCount);
		}

		var playButton = window.document.getElementById("playButton");
		var stopButton = window.document.getElementById("stopButton");
		var totalCountElmt = window.document.getElementById("totalCount");

		playButton.onclick=function(){
			console.log("play");
		}

		stopButton.onclick=function(){
			console.log("stop");
		}

		var totalCount = 0;
		totalCountElmt.value=totalCount;

		totalCountElmt.onchange=function (e){
			console.log(e.srcElement.value);
			totalCount = parseInt(e.srcElement.value);
			randomize(totalCount);
		}

		var countChange=function(val){
			totalCount+=val;
			totalCountElmt.value=totalCount;
		}
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

		var m_cell = new Array(numXcells);

		var foo=document.createElement("input");
		for(var i=0;i<numYcells;i++){
			m_cell[i]=new Array(numYcells);
			for(var j=0;j<numXcells;j++){
				m_cell[i][j]=cellfactory(cellDivWPct, cellDivHPct, countChange);
        		m_cell[i][j].style.top = i*cellDivHPct + "%";
        		m_cell[i][j].style.left = j*cellDivWPct + "%";  
				m_cell[i][j].style.backgroundColor=utils.hslToRgb(Math.random() , .1 +.2*Math.random(), .6+.2* Math.random());

				interfaceDiv.appendChild(m_cell[i][j]);
			}
		}


		window.onbeforeunload = function (e) {
			//comm.sendJSONmsg("stop", []);
		}

	}
);