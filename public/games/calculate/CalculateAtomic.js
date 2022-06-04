var selectedCompound = document.getElementById('selectedCompound');
var viewAns = document.getElementById('viewAns');
var playAgain = document.getElementById('playAgain');
var submit = document.getElementById('submit');
var elementName =["Hydrogen","Helium","Lithium","Beryllium","Boron","Carbon","Nitrogen","Oxygen","Fluorine","Neon","Sodium","Magnesium","Aluminum","Silicon","Phosphorus","Sulfur","Chlorine","Argon","Potassium","Calcium","Scandium","Titanium","Vanadium","Chromium","Manganese","Iron","Cobalt","Nickel","Copper","Zinc","Gallium","Germanium","Arsenic","Selenium","Bromine","Krypton","Rubidium","Strontium","Yttrium","Zirconium","Niobium","Molybdenum","Technetium","Ruthenium","Rhodium","Palladium","Silver","Cadmium","Indium","Tin","Antimony","Tellurium","Iodine","Xenon","Cesium","Barium","Lanthanum","Cerium","Praseodymium","Neodymium","Promethium","Samarium","Europium","Gadolinium","Terbium","Dysprosium","Holmium","Erbium","Thulium","Ytterbium","Lutetium","Hafnium","Tantalum","Tungsten","Rhenium","Osmium","Iridium","Platinum","Gold","Mercury","Thallium","Lead","Bismuth","Polonium","Astatine","Radon","Francium","Radium","Actinium","Thorium","Protactinium","Uranium","Neptunium","Plutonium","Americium","Curium","Berkelium","Californium","Einsteinium","Fermium","Mendelevium","Nobelium","Lawrencium","Rutherfordium","Dubnium","Seaborgium","Bohrium","Hassium","Meitnerium","Darmstadtium", "Roentgenium", "Copernicium", "Nihonium","Flerovium","Moscovium","Livermorium", "Tennessine","Oganesson"]; 
var elementSymbol = ["H","He","Li","Be","B","C","N","O","F","Ne","Na","Mg","Al","Si","P","S","Cl","Ar","K","Ca","Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn","Ga","Ge","As","Se","Br","Kr","Rb","Sr","Y","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd","In","Sn","Sb","Te","I","Xe","Cs","Ba","La","Ce","Pr","Nd","Pm","Sm","Eu","Gd","Tb","Dy","Ho","Er","Tm","Yb","Lu","Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg","Tl","Pb","Bi","Po","At","Rn","Fr","Ra","Ac","Th","Pa","U","Np","Pu","Am","Cm","Bk","Cf","Es","Fm","Md","No","Lr","Rf","Db","Sg","Bh","Hs","Mt","Ds","Rg","Cn","Nh","Fl","Mc","Lv","Ts","Og"];
var chemicalCompound = ["Acetamide","Acetone","Acetylene","Aluminum Chloride","Aluminum oxide", "Aluminum Fluoride","Water","Ammonium Hydroxide","Ammonium Nitrate","Ascorbic Acid","Aspirin", "Barium Acetate","Barium Chloride","Butyric Acid","Caffeine Chemical","Calcium Acetate","Calcium Chloride","Carbon Disulfide","Carbon Monoxide","Carbonous Acid","Chlorine Gas","Chloroform","Chromic Acid","Citric Acid","Copper Sulfate","Dinitrogen Pentoxide","Ethane","Ethanol","Galactose","Fumaric Acid","Sodium bicarbonate","Sodium hydroxide","Sulfuric acid","Nitrous acid","Potassium hydroxide","Silver nitrate","Sodium carbonate", "Sodium chloride", "Methane", "Nitrogen dioxide", "Potassium hydroxide", "Sodium nitrate","Sulfurous acid","Aluminum oxide","Ammonia","Ammonium nitrate","Carbon tetrachloride","Citric acid","Hydrocyanic acid","Salicylic Acid", "Hydroiodic acid","Hypochlorous acid","Iron iii oxide","Sodium acetate","Sodium sulfate","Sucrose","Potassium nitrate","Ammonium bicarbonate","Ammonium chloride","Ammonium hydroxide","Calcium oxide","Carbon monoxide","Chlorine gas","Phenol","Hydrogen peroxide","Magnesium chloride","Potassium chloride","Potassium iodide","Sulfur dioxide","Glycerin","Calcium acetate","Iron oxide","Potassium carbonate","Silver chloride","Sodium iodide","Sodium oxide","Sodium sulfide","Silicon dioxide","Pyridine","Xylene","Titanium dioxide","Salicylic acid","Zinc chloride","Potassium chlorate","Nitrous acid","Lactic acid","Lithium hydroxide","Phosphorus pentachloride"];
var chemicalFormula = ["C2H5NO","C3H6O","C2H2","AlCl3","Al2O3","AlF3","H2O","NH4OH","NH4NO3","C6H8O6","C9H8O4","C4H6BaO4","BaCl2","C4H8O2","C8H10N4O2","C4H6CaO4","CaCl2","CS2","CO","HNO2","Cl2","CHCl3","H2CrO4","C6H8O7","CuSO4","N2O5","C2H6","C2H5OH","C6H12O6","C4H4O4","NaHCO3","NaOH","H2SO4","HNO2","KOH","AgNO3","Na2CO3", "NaCl","CH4", "NO2","KOH","NaNO3", "H2SO3","Al2O3","NH3","NH4NO3","CCl4","C6H8O7","HCN","C7H6O3","HI","HClO","Fe2O3","C2H3NaO2","Na2SO4","C12H22O11","KNO3","NH4HCO3","NH4Cl","NH4OH","CaO","CO","Cl2","C6H6O","H2O2","MgCl2","KCl","KI","SO2","C3H8O3","C4H6O4Ca","Fe2O3","K2CO3","AgCl","NaI","Na2O","Na2S","SiO2","C5H5N","C8H10","TiO2","C7H6O3","ZnCl2","KClO3","HNO2","C3H6O3","LiOH","PCl5"];
var elementWeight = ["1.0079","4.0026","6.941","9.0122","10.811","12.0107","14.0067","15.9994","18.9984","20.1797","22.9897","24.305","26.9815","28.0855","30.9738","32.065","35.453","39.948","39.0983","40.078","44.9559","47.867","50.9415","51.9961","54.938","55.845","58.9332","58.6934","63.546","65.39","69.723","72.64","74.9216","78.96","79.904","83.8","85.4678","87.62","88.9059","91.224","92.9064","95.94","98","101.07","102.9055","106.42","107.8682","112.411","114.818","118.71","121.76","127.6","126.9045","131.293","132.9055","137.327","138.9055","140.116","140.9077","144.24","145","150.36","151.964","157.25","158.9253","162.5","164.9303","167.259","168.9342","173.04","174.967","178.49","180.9479","183.84","186.207","190.23","192.217","195.078","196.9665","200.59","204.3833","207.2","208.9804","209","210","222","223","226","227","232.0381","231.0359","238.0289","237","244","243","247","247","251","252","257","258","259","262","261","262","266","264","277","268","281","282","285","286","289","289","293","294","294"];
var selectedWeight = [];

var correct = new Audio("correct.wav");
		correct.load();

var win = new Audio("win.wav");
		win.load();

			var selected;
			var pointsDisplay = document.getElementById('pointsDisplay');
		
			var answers = [];
			var total = 0;
			var subs =1;
			var elementSelected= [];
			var string = "";
			var elements = [];
			var atoms = [];


		
		
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

        		

        
        $(".clear").click(function(){

        	if(inputAns.firstChild != ""){
        	elementSelected.pop();
        	selectedWeight.pop();
        	atoms.pop();
        	console.log(elementSelected);

        	
        		inputAns.removeChild(inputAns.lastChild);
        		inputAns.removeChild(inputAns.lastChild)+1;
        	}
        	

        });
	

	function removeSpaces(val) {
  	 return val.split(' ').join('');
	}


	$("#submit").click(function(){
		correct.play();
		console.log(selectedWeight);
		let sub =0;
		for(let m = 0; m < selectedWeight.length; m++){
			sub += Number(selectedWeight[m]);
		}
		total = sub.toFixed(2);

		display();

		elementSelected = [];
		selectedWeight =[];
		inputAns.innerText = "";
		atoms = [];
		elements = [];
			

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

		 let elementweight = searchAtomicWeight(firedBtn);
		 selectedWeight.push(elementweight);
		 atoms.push(firedBtn);

		

	});

	function searchAtomicWeight(firedBtn){

		let element = firedBtn;
		let num;
		for(let i = 0; i < 118; i++){
			if (elementSymbol[i] == firedBtn) {

				num = elementWeight[i];
			}

		}
		console.log(num);
		return num;
	}



	function display(){

		let table = document.getElementById("list");
				while (table.firstChild) {
                     			table.removeChild(table.lastChild);
               				 }	
				let str = inputAns.innerText;
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

				document.getElementById("modal_content").innerHTML ="Total Molecular Weight <br>( " + answer+ " )<br> <br> ";
				var tr = document.createElement("tr");
				var th = document.createElement("th");
				th.innerText = "Number";
				var th2 = document.createElement("th");
				th2.innerText = "Element";
				var th3 = document.createElement("th");
				th3.innerText = "Atomic Weight";
				var th4 = document.createElement("th");
				th4.innerText = "Sub Total";
				tr.appendChild(th);
				tr.appendChild(th2);
				tr.appendChild(th3);
				tr.appendChild(th4);
				table.appendChild(tr);



				for(let i = 0; i < elementSelected.length; i ++){
					var tr1 = document.createElement("tr");
					if (isNaN(elementSelected[i])) {
						let count=0;
						for(let r = 0; r < atoms.length ; r++){
							if(atoms[r] == elementSelected[i]){
								count++;
							}
						}
						
						var td = document.createElement("td");
						var number = document.createTextNode(count);
						td.appendChild(number);
						var td2 = document.createElement("td");
						var atom = document.createTextNode(elementSelected[i]);
						td2.appendChild(atom);
						var td3 = document.createElement("td");
						var atomweight = document.createTextNode(searchAtomicWeight(elementSelected[i]));
						td3.appendChild(atomweight);
						var td4 = document.createElement("td");
						var subsub = searchAtomicWeight(elementSelected[i]) * count;
						var subtotal = document.createTextNode(subsub.toFixed(3));
						td4.appendChild(subtotal);
						tr1.appendChild(td);
						tr1.appendChild(td2);
						tr1.appendChild(td3);
						tr1.appendChild(td4);
						table.appendChild(tr1);
					}

										

		}	
				document.getElementById("total").innerHTML ="<br>"  + total;
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


    

 