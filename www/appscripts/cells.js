define(
    [],
    function () {
    	console.log("cell factory function created");
    	var maxCount=10;
    	var minCount=0;
    	return function(wpct, hpct){

			var cdiv = document.createElement("div");
			cdiv.className="cdiv";
			cdiv.style.width = wpct + "%";;
			cdiv.style.height = hpct + "%";

			cdiv.count=0;

			var countDisplay = document.createElement("input");
			countDisplay.className="countDisplay"
			countDisplay.type = "text" ;
			countDisplay.value="0";
			cdiv.appendChild(countDisplay);


			var plusButton=document.createElement("input");
			plusButton.className="plusButton";
			plusButton.type = "button" ;
			plusButton.value = "+" ;


        	plusButton.onclick=function(){
        		cdiv.count=Math.min(cdiv.count+1, maxCount);
        		countDisplay.value=cdiv.count;
			}

			cdiv.appendChild(plusButton);

			var minusButton=document.createElement("input");
			minusButton.className="minusButton";
			minusButton.type = "button" ;
			minusButton.value = "-" ;


        	minusButton.onclick=function(){
        		cdiv.count=Math.max(cdiv.count-1, minCount);
        		countDisplay.value=cdiv.count;
  			}
			cdiv.appendChild(minusButton);

    		return cdiv;
    	}
    }
)