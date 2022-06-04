var selectedCompound = document.getElementById('selectedCompound');
var viewAns = document.getElementById('viewAns');
var playAgain = document.getElementById('playAgain');
var submit = document.getElementById('submit');
var elementName =["Hydrogen","Helium","Lithium","Beryllium","Boron","Carbon","Nitrogen","Oxygen","Fluorine","Neon","Sodium","Magnesium","Aluminum","Silicon","Phosphorus","Sulfur","Chlorine","Argon","Potassium","Calcium","Scandium","Titanium","Vanadium","Chromium","Manganese","Iron","Cobalt","Nickel","Copper","Zinc","Gallium","Germanium","Arsenic","Selenium","Bromine","Krypton","Rubidium","Strontium","Yttrium","Zirconium","Niobium","Molybdenum","Technetium","Ruthenium","Rhodium","Palladium","Silver","Cadmium","Indium","Tin","Antimony","Tellurium","Iodine","Xenon","Cesium","Barium","Lanthanum","Cerium","Praseodymium","Neodymium","Promethium","Samarium","Europium","Gadolinium","Terbium","Dysprosium","Holmium","Erbium","Thulium","Ytterbium","Lutetium","Hafnium","Tantalum","Tungsten","Rhenium","Osmium","Iridium","Platinum","Gold","Mercury","Thallium","Lead","Bismuth","Polonium","Astatine","Radon","Francium","Radium","Actinium","Thorium","Protactinium","Uranium","Neptunium","Plutonium","Americium","Curium","Berkelium","Californium","Einsteinium","Fermium","Mendelevium","Nobelium","Lawrencium","Rutherfordium","Dubnium","Seaborgium","Bohrium","Hassium","Meitnerium","Darmstadtium", "Roentgenium", "Copernicium", "Nihonium","Flerovium","Moscovium","Livermorium", "Tennessine","Oganesson"]; 
var elementSymbol = ["H","He","Li","Be","B","C","N","O","F","Ne","Na","Mg","Al","Si","P","S","Cl","Ar","K","Ca","Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn","Ga","Ge","As","Se","Br","Kr","Rb","Sr","Y","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd","In","Sn","Sb","Te","I","Xe","Cs","Ba","La","Ce","Pr","Nd","Pm","Sm","Eu","Gd","Tb","Dy","Ho","Er","Tm","Yb","Lu","Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg","Tl","Pb","Bi","Po","At","Rn","Fr","Ra","Ac","Th","Pa","U","Np","Pu","Am","Cm","Bk","Cf","Es","Fm","Md","No","Lr","Rf","Db","Sg","Bh","Hs","Mt","Ds","Rg","Cn","Nh","Fl","Mc","Lv","Ts","Og"];
var chemicalCompound = ["Acetamide","Acetone","Acetylene","Aluminum Chloride","Aluminum oxide", "Aluminum Fluoride","Water","Ammonium Hydroxide","Ammonium Nitrate","Ascorbic Acid","Aspirin", "Barium Acetate","Barium Chloride","Butyric Acid","Caffeine Chemical","Calcium Acetate","Calcium Chloride","Carbon Disulfide","Carbon Monoxide","Carbonous Acid","Chlorine Gas","Chloroform","Chromic Acid","Citric Acid","Copper Sulfate","Dinitrogen Pentoxide","Ethane","Ethanol","Galactose","Fumaric Acid","Sodium bicarbonate","Sodium hydroxide","Sulfuric acid","Nitrous acid","Potassium hydroxide","Silver nitrate","Sodium carbonate", "Sodium chloride", "Methane", "Nitrogen dioxide", "Potassium hydroxide", "Sodium nitrate","Sulfurous acid","Aluminum oxide","Ammonia","Ammonium nitrate","Carbon tetrachloride","Citric acid","Hydrocyanic acid","Salicylic Acid", "Hydroiodic acid","Hypochlorous acid","Iron iii oxide","Sodium acetate","Sodium sulfate","Sucrose","Potassium nitrate","Ammonium bicarbonate","Ammonium chloride","Ammonium hydroxide","Calcium oxide","Carbon monoxide","Chlorine gas","Phenol","Hydrogen peroxide","Magnesium chloride","Potassium chloride","Potassium iodide","Sulfur dioxide","Glycerin","Calcium acetate","Iron oxide","Potassium carbonate","Silver chloride","Sodium iodide","Sodium oxide","Sodium sulfide","Silicon dioxide","Pyridine","Xylene","Titanium dioxide","Salicylic acid","Zinc chloride","Potassium chlorate","Nitrous acid","Lactic acid","Lithium hydroxide","Phosphorus pentachloride"];
var chemicalFormula = ["C2H5NO","C3H6O","C2H2","AlCl3","Al2O3","AlF3","H2O","NH4OH","NH4NO3","C6H8O6","C9H8O4","C4H6BaO4","BaCl2","C4H8O2","C8H10N4O2","C4H6CaO4","CaCl2","CS2","CO","HNO2","Cl2","CHCl3","H2CrO4","C6H8O7","CuSO4","N2O5","C2H6","C2H5OH","C6H12O6","C4H4O4","NaHCO3","NaOH","H2SO4","HNO2","KOH","AgNO3","Na2CO3", "NaCl","CH4", "NO2","KOH","NaNO3", "H2SO3","Al2O3","NH3","NH4NO3","CCl4","C6H8O7","HCN","C7H6O3","HI","HClO","Fe2O3","C2H3NaO2","Na2SO4","C12H22O11","KNO3","NH4HCO3","NH4Cl","NH4OH","CaO","CO","Cl2","C6H6O","H2O2","MgCl2","KCl","KI","SO2","C3H8O3","C4H6O4Ca","Fe2O3","K2CO3","AgCl","NaI","Na2O","Na2S","SiO2","C5H5N","C8H10","TiO2","C7H6O3","ZnCl2","KClO3","HNO2","C3H6O3","LiOH","PCl5"];
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
			var subs =1;
			var elementSelected= [];
			var string = "";
			var elements = [];


		
			for (var j = 0; j < lives; j++) {
	             var img = document.createElement('img');
	            img.src = 'heart.gif';
	            img.setAttribute("class", "heart-image");
	            img.style.width = 20 + "%";
	            document.getElementById('life').appendChild(img);
        	}


			for(let i = 0; i < 118; i++){

        		let div = document.getElementsByClassName('button')[i];
				let text = document.getElementsByClassName('button')[i].innerText;
				elements.push(text);
				console.log(elements[i]);

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

        $(".clear").click(function(){

        	if(inputAns.firstChild != ""){
        	elementSelected.pop();
        	console.log(elementSelected);

        	
        		inputAns.removeChild(inputAns.lastChild);
        		inputAns.removeChild(inputAns.lastChild)+1;
        	}
        	

        });
		function generate(){



			  while (inputAns.firstChild) {
                     			inputAns.removeChild(inputAns.lastChild);
               				 }	
			let checks;

               	do{

               	selected = Math.floor(Math.random() * chemicalCompound.length);

               	checks = checkAnswers(selected);

               	}while(checks == 1);
                    
               	answers.push(selected);
                   
               	console.log(chemicalFormula[selected]);
               	console.log(answers);
				selectedCompound.innerText = "What is the chemical formula of " + chemicalCompound[selected];
		   
	}

	function removeSpaces(val) {
  	 return val.split(' ').join('');
	}


	$("#submit").click(function(){
	
			
		var ans = inputAns.innerText;
		var cnvrt = removeSpaces(ans);
			
		console.log(ans);
		console.log(cnvrt);
		if ( cnvrt == chemicalFormula[selected]) {
			correct.play();
			points+=1;
    					pointsDisplay.innerText ="Points: " + points;
    					if (points == chemicalFormula.length) {
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
    					if (lives == 0) {
    						lose.play();
    						lives = 3;
							points = 0;
							answers = [];
							 pointsDisplay.innerText ="Points:" + points;
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
		elementSelected = [];
			

	});

	$(".button").click(function(){
		let firedBtn;
		
		firedBtn = $(this).text();
		 // if(isNaN(firedBtn))
	
		let removeSpaces = firedBtn.replace(/[0-9]/g, '');
		firedBtn = removeSpaces.replace(/\s+/g, '');
		

		 if (elementSelected[elementSelected.length-1] == firedBtn) {
		 	console.log("yes");
		 	subs++;
		 
		 	let last = elementSelected.length-1;
		 	console.log(last);
		 	let ne = document.getElementsByTagName('sub')[last].innerText= subs;
		 	
		 	
		 }
		 else{
		 	document.getElementById('inputAns').innerHTML += firedBtn;
		 	let sub = document.createElement('sub');
		 	// let subNums=document.createTextNode("");
		 	// sub.appendChild(subNums);
		 	let div = document.getElementById('inputAns');
		 		div.appendChild(sub);

		 		elementSelected.push(firedBtn);
		 		subs=1;
		 	
		 }

		

	});



	function incorrectAns(){
				let str = chemicalFormula[selected];
				let answer = "";
				for(let i = 0; i< str.length; i ++){
					if (isNaN(str[i])) {
						answer+=str[i];
					}
					else{
						answer+= "<sub>" + str[i] + "</sub>";
					}
				}
				document.getElementById("modalbuton").innerText="Okay";

				document.getElementById("modal_content").innerHTML ="The Compound formula of "+ chemicalCompound[selected] + " is: <br><br>" +"<h3>" + answer+ "</h3>";
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


    

 