require.config({
        paths: {
                //"jsaSound": "http://localhost:8001"
                "jsaSound": "http://animatedsoundworks.com:8001"
            }
});

define(
    ["jsaSound/jsaModels/dongs", "jsaSound/jsaModels/SonicSGChirps"],
    function (dongFactory, chirpFactory) {
    	console.log("cell factory function created");

    	return function(idx, wpct, hpct, countChange){

    		var m_idx=idx;

			var cdiv = document.createElement("div");
			cdiv.className="cdiv";
			cdiv.style.width = wpct + "%";;
			cdiv.style.height = hpct + "%";

			cdiv.count=0;

			var sounds = [];
			var numPlaying=0;


			var countDisplay = document.createElement("input");
			countDisplay.className="countDisplay"
			countDisplay.type = "text" ;
			countDisplay.value="0";
			countDisplay.disabled=true;

			cdiv.appendChild(countDisplay);


			var plusButton=document.createElement("input");
			plusButton.className="plusButton";
			plusButton.type = "button" ;
			plusButton.value = "+" ;


        	plusButton.onclick=function(){
        			cdiv.addMember();
			}

			cdiv.appendChild(plusButton);

			var minusButton=document.createElement("input");
			minusButton.className="minusButton";
			minusButton.type = "button" ;
			minusButton.value = "-" ;


        	minusButton.onclick=function(){
        		if (cdiv.count > 0){
        			cdiv.remMember();
        		}
  			}

			cdiv.appendChild(minusButton);

			cdiv.addMember = function(){
    			cdiv.count++;
    			countChange(1);
				countDisplay.value=cdiv.count;

				// start a new sound playing
				if (numPlaying===sounds.length){
					if (m_idx < 18){
						sounds[numPlaying]=dongFactory();
						sounds[numPlaying].setParam("Note Number", m_idx);
						sounds[numPlaying].setParam("Gain", .2+.4*Math.random());
						console.log("dong notenum " + m_idx);
					} else {
						sounds[numPlaying]=chirpFactory();
						sounds[numPlaying].setParam("Note Number", m_idx-18+3);						
						sounds[numPlaying].setParam("Gain", .1+.1*Math.random());
						console.log("chirp notenum " + (m_idx-18+3));
					}
				} 
				sounds[numPlaying].play();
				numPlaying++;

				for (var i=0;i<numPlaying;i++){
					sounds[i].setParam("Rate",.2+numPlaying/10);
					//console.log("setting dongs in cell " + m_idx + " to rate " + (.2+numPlaying/10));
				}
			}

			cdiv.remMember = function(){
       			cdiv.count--;
        		countChange(-1);
				countDisplay.value=cdiv.count;

				// stop the newest sound from playing
				if (numPlaying > 0 ){
					numPlaying--;
					sounds[numPlaying].release();
				}
 			}


			cdiv.zero = function(){
				cdiv.count=0;
				countDisplay.value=cdiv.count;

				for (var i=0;i<numPlaying;i++){
					sounds[i].release();
				}
				numPlaying=0;

			}

    		return cdiv;
    	}
    }
)