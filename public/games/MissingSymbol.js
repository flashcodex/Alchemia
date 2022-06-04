var selectedElement = document.getElementById('selectedElement');

var elementName =["Hydrogen","Helium","Lithium","Beryllium","Boron","Carbon","Nitrogen","Oxygen","Fluorine","Neon","Sodium","Magnesium","Aluminum","Silicon","Phosphorus","Sulfur","Chlorine","Argon","Potassium","Calcium","Scandium","Titanium","Vanadium","Chromium","Manganese","Iron","Cobalt","Nickel","Copper","Zinc","Gallium","Germanium","Arsenic","Selenium","Bromine","Krypton","Rubidium","Strontium","Yttrium","Zirconium","Niobium","Molybdenum","Technetium","Ruthenium","Rhodium","Palladium","Silver","Cadmium","Indium","Tin","Antimony","Tellurium","Iodine","Xenon","Cesium","Barium","Lanthanum","Cerium","Praseodymium","Neodymium","Promethium","Samarium","Europium","Gadolinium","Terbium","Dysprosium","Holmium","Erbium","Thulium","Ytterbium","Lutetium","Hafnium","Tantalum","Tungsten","Rhenium","Osmium","Iridium","Platinum","Gold","Mercury","Thallium","Lead","Bismuth","Polonium","Astatine","Radon","Francium","Radium","Actinium","Thorium","Protactinium","Uranium","Neptunium","Plutonium","Americium","Curium","Berkelium","Californium","Einsteinium","Fermium","Mendelevium","Nobelium","Lawrencium","Rutherfordium","Dubnium","Seaborgium","Bohrium","Hassium","Meitnerium","Darmstadtium", "Roentgenium", "Copernicium", "Nihonium","Flerovium","Moscovium","Livermorium", "Tennessine","Oganesson"]; 
var elementSymbol = ["H","He","Li","Be","B","C","N","O","F","Ne","Na","Mg","Al","Si","P","S","Cl","Ar","K","Ca","Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn","Ga","Ge","As","Se","Br","Kr","Rb","Sr","Y","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd","In","Sn","Sb","Te","I","Xe","Cs","Ba","La","Ce","Pr","Nd","Pm","Sm","Eu","Gd","Tb","Dy","Ho","Er","Tm","Yb","Lu","Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg","Tl","Pb","Bi","Po","At","Rn","Fr","Ra","Ac","Th","Pa","U","Np","Pu","Am","Cm","Bk","Cf","Es","Fm","Md","No","Lr","Rf","Db","Sg","Bh","Hs","Mt","Ds","Rg","Cn","Nh","Fl","Mc","Lv","Ts","Og"];
var correct = new Audio("correct.wav");
		correct.load();
var incorrect = new Audio("incorrect.wav");
		incorrect.load();
var win = new Audio("win.wav");
		win.load();
var lose = new Audio("lose.wav");
		lose.load();
			var selected;
			var pointsDisplay = document.getElementById('pointsDisplay');
			var points = 0;
			var answers = [];
			var lives = 3;
			var textAnswer;
			var elements = [];

			
				var startModal = new bootstrap.Modal(document.getElementById("largeModal"));
				startModal.show();


			for (var j = 0; j < lives; j++) {
	             var img = document.createElement('img');
	            img.src = 'heart.gif';
	            img.setAttribute("class", "heart-image");
	            img.style.width = 18 + "%";
	            document.getElementById('life').appendChild(img);
        	}

        	for(let i = 1; i < 119; i++){

        		let div = document.getElementsByTagName('div')[i];
				let text = document.getElementsByTagName('div')[i].innerText;
				elements.push(text);

				for(let m = 0; m <118; m++){

					if (text == elementSymbol[m]) {
						let p = document.createElement('p');
						let textP = document.createTextNode(m+1);
						p.appendChild(textP);
						div.appendChild(p);

						div.insertBefore(p, div.firstChild);
					}
					else{
						continue;
					}
				}
        	}

        	generate();
			function generate(){

					
				
				   let checks;

                    do{

                    selected = Math.floor(Math.random() *118);

                    checks = checkAnswers(selected);

                    }while(checks == 1);
                    
                    answers.push(selected);
                    
					let div = document.getElementsByTagName('div')[selected];
					let check = div.innerText;
					let removeSpaces = check.replace(/[0-9]/g, '');
					textAnswer= removeSpaces.replace(/\s+/g, '');
				

					console.log(textAnswer);
                            
                    div.removeChild(div.lastChild);
               			
                     var input = document.createElement('input');
                     input.style.width = 30 + "PX";
                      input.style.height = 30 + "PX";

                     input.setAttribute("id", "answer");

                            
                     div.appendChild(input);

			
			}


				$(".easy").click(function(){

					var answer = document.getElementById('answer').value;
					console.log(answer);

					if (answer == textAnswer) {

						correct.play();
    					points+=1;
    					pointsDisplay.innerText ="Points: " + points;


    					let div = document.getElementsByTagName('div')[selected];
    					
                    			div.removeChild(div.lastChild);
               				 
               			
               				
               				let font = document.createElement('font');
               				font.style.fontSize = 6 +"px";
               				font = document.createTextNode(answer);
               				div.appendChild(font);

               				

    					if (points == 118) {
    						win.play();
    						lives = 3;
							points = 0;
							answers = [];
							 pointsDisplay.innerText ="Points: "+ points;
    						document.getElementById("modalbuton").innerText="Play Again";

							document.getElementById("modal_content").innerHTML ="You win, Congratulations!";
							var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
							myModal.show();

							
							for (var j = 0; j < lives; j++) {
	             			var img = document.createElement('img');
	           				img.src = 'heart.gif';
	            			img.setAttribute("class", "heart-image");
	            			img.style.width = 18 + "%";
	            			document.getElementById('life').appendChild(img);
        					}

					}
				}

				else{
    			
    					incorrect.play();
    					lives--;
    					life.removeChild(life.lastChild);
    					incorrectAns();

    					let div = document.getElementsByTagName('div')[selected];
    					 
                    			div.removeChild(div.lastChild);
               				 
               			
               				
               				let p = document.createElement('p');
               				p.setAttribute("id", "btn");
               				p = document.createTextNode(textAnswer);
               				div.appendChild(p);




    					if (lives == 0) {
    						lose.play();
    						lives = 3;
							points = 0;
							answers = [];
							 pointsDisplay.innerText ="Points: " + points;
    						document.getElementById("modalbuton").innerText="Play Again";

							document.getElementById("modal_content").innerHTML ="<h3>You Lose!</h3>";
							var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
							myModal.show();

							
							for (var j = 0; j < lives; j++) {
	          			   var img = document.createElement('img');
	          			  	img.src = 'heart.gif';
	            			img.setAttribute("class", "heart-image");
	            			img.style.width = 18 + "%";
	            			document.getElementById('life').appendChild(img);
        						}

    					}
    			}

    			generate();


			});



    function incorrectAns(){
		
				document.getElementById("modalbuton").innerText="Okay";

				document.getElementById("modal_content").innerHTML ="<p>The correct symbol is :</p></br>" + textAnswer;
				var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
				myModal.show();
	}

 function checkAnswers(num){

     let ans = 0;

      for(var s = 0; s < answers.length; s ++){

            if (answers[s] == num) {
                ans = 1;
            }
      }

      return ans;

 }