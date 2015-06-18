define(
    [],
    function () {
    	console.log("cell factory function created");

    	return function(wpct, hpct, countChange){

			var cdiv = document.createElement("div");
			cdiv.className="cdiv";
			cdiv.style.width = wpct + "%";;
			cdiv.style.height = hpct + "%";

			cdiv.count=0;

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
        			cdiv.count++;
        			countChange(1);
					countDisplay.value=cdiv.count;
			}

			cdiv.appendChild(plusButton);

			var minusButton=document.createElement("input");
			minusButton.className="minusButton";
			minusButton.type = "button" ;
			minusButton.value = "-" ;


        	minusButton.onclick=function(){
        		if (cdiv.count > 0){
        			cdiv.count--;
        			countChange(-1);
					countDisplay.value=cdiv.count;
        		}
  			}

			cdiv.appendChild(minusButton);

			cdiv.addMember = function(){
    			cdiv.count++;
    			countChange(1);
				countDisplay.value=cdiv.count;
			}

			cdiv.zero = function(){
				cdiv.count=0;
				countDisplay.value=cdiv.count;
			}

    		return cdiv;
    	}
    }
)