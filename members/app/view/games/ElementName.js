var selectedElement = document.getElementById('selectedElement');
var viewAns = document.getElementById('viewAns');
var playAgain = document.getElementById('playAgain');
var submit = document.getElementById('submit');
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
			var inputAns =[];
			var elements = [];

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

						

			$("#viewAns").hide();
			$("#playAgain").hide();



		function generate(){

				
			for(let i = 1; i < 119; i++){

				let div = document.getElementsByTagName('div')[i];
				let check = div.innerText;
				let removeSpaces = check.replace(/[0-9]/g, '');
				textAnswer= removeSpaces.replace(/\s+/g, '');

				
					for(let m = 0; m <= 118; m++){

						if (textAnswer == elementSymbol[m]) {

							answers.push(elementName[m]);
							
						}
					}
				
                    			div.removeChild(div.lastChild);
               				 
                     var input = document.createElement('input');
                     input.style.width = 50 + "PX";
                      input.style.height = 30 + "PX";

                     input.setAttribute("id", "answer");

                            
                     div.appendChild(input);

			}

		   
	}



	$("#submit").click(function(){
		correct.play();
			for(let i = 0; i < 118; i++){

				let input = document.getElementsByTagName('input')[i];
				let ans = document.getElementsByTagName('input')[i].value;
				if (ans == "") {
					ans = "no ans";
				}
					let strCap = ans.charAt(0).toUpperCase() + ans.slice(1);
					inputAns.push(strCap);
				
				
			console.log(inputAns[i]);
			}


			for(let check = 0; check <118; check++){

				if (answers[check] == inputAns[check]) {
					points++;

					let input = document.getElementsByTagName('input')[check];
					input.style.borderColor = "lightgreen";
					input.style.borderWidth = 3 + "px";

					pointsDisplay.innerText = "Points: " +points+  " / 118";

				}

				else{
					let input = document.getElementsByTagName('input')[check];
					input.style.borderColor = "red";
					input.style.borderWidth = 3 + "px";
				}

			}

			result();

			$("#viewAns").show();
			$("#playAgain").show();
			$("#submit").hide();

		

	});

	$("#playAgain").click(function(){
		correct.play()
		generate();
		$("#viewAns").hide();
			$("#playAgain").hide();
			$("#submit").show();
			inputAns = [];
			points = 0;
			pointsDisplay.innerText = "Points: " +points+  " / 118";

	});


	$("#viewAns").click(function(){
			correct.play();
			for(let i = 0; i < 118; i++){

				let div = document.getElementsByTagName('div')[i+1];

				 
                    			div.removeChild(div.lastChild);
               				 

				let font = document.createElement('font');
               				font.style.fontSize = 6 +"px";
               				font = document.createTextNode(answers[i]);
               				div.appendChild(font);


			}


			});

	function win(){
		
				document.getElementById("modalbuton").innerText="Play Again";

				document.getElementById("modal_content").innerHTML ="You win!";
				var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
				myModal.show();
	}


	function result(){
				
				win.play();
				document.getElementById("modalbuton").innerText="Okay";

				document.getElementById("modal_content").innerHTML ="<H5>SCORE:</H5> <H2>" + points +"</H2>";
				var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
				myModal.show();
	}

    

 