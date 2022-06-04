<!-- <div class=" light"  >
    <iframe src="https://ptable.com/?lang=en#Compounds" style="height:100%;width:100%" title="Iframe Example"  ></iframe>
</div> -->

<style>
.grid-item.box2:hover {
  background-color: rgb(171 192 196) !important;
  border: 2px solid black;
  color: black;
}

.grid-container > .grid-item
{
    align-content: center;
    display: grid;
    padding-top: 0px;
}
 
/* .formula-container
{
    grid-template-columns: repeat(4, 4vw);
    grid-template-rows: repeat(4, 4vw);
    gap: 0.4em;
    margin: auto;
} */

.formula-container
{    
    grid-template-columns: repeat(6, 4vw);
    display: grid;
    margin: auto;
    gap: 1em;
}

.formula-container > .grid-item {
    align-content: center;
    display: grid;
    padding-top: 0px;
}

.formula-container > .grid-item {
    transition: 0.5s;
    border: 2px solid transparent;
    text-align: center;
    padding: 20px;
}

.box2 {
    grid-column-start: 3;
    grid-column-end: 13;
    grid-row-start: 1;
    grid-row-end: 4;
    background-color: rgb(171 192 196);
}
</style>

 <div class="light">
    <!-- <div class="outcome-container">
        <div class="row">
            <div id="outcomes" style="" class="col-12 text-center">
                Outcomes
            </div>
        </div>
    </div> -->

    <div class="card text-center container" style="margin-top: 20px;margin-bottom:10px; max-height: 400px;overflow-y: auto;">
        <div id="outcomes" class="row">

        </div>
    </div>


    <div class="main-container">
        <div class="grid-container" >            
            <div class="element-1 grid-item item1" id="1" >H</div>
            <div class="grid-item box2" style="overflow: auto;">                                    
                <div id="formula" class="formula-container">
                    <div style="grid-column-start: 1;grid-column-end: 10;text-align: center;"><span>Drag elements to combine</span></div>
                </div>
            </div>
            <div class="element-2 grid-item item2" draggable="true" >He</div>
            <div class="element-3 grid-item item3" draggable="true" >Li</div>
            <div class="element-4 grid-item item4" draggable="true" >Be</div>
            <div class="element-5 grid-item item5" draggable="true" >B</div>
            <div class="element-6 grid-item item6" draggable="true" >C</div>
            <div class="element-7 grid-item item7" draggable="true" >N</div>
            <div class="element-8 grid-item item8" draggable="true" >O</div>
            <div class="element-9 grid-item item9" draggable="true" >F</div>
            <div class="element-10 grid-item item10" draggable="true" >Ne</div>
            <div class="element-11 grid-item item11" draggable="true" >Na</div>
            <div class="element-12 grid-item item12" draggable="true" >Mg</div>
            <div class="element-13 grid-item item13" draggable="true" >Al</div>
            <div class="element-14 grid-item item14" draggable="true" >Si</div>
            <div class="element-15 grid-item item15" draggable="true" >P</div>
            <div class="element-16 grid-item item16" draggable="true" >S</div>
            <div class="element-17 grid-item item17" draggable="true" >Cl</div>
            <div class="element-18 grid-item item18" draggable="true" >Ar</div>
            <div class="element-19 grid-item item19" draggable="true" >K</div>
            <div class="element-20 grid-item item20" draggable="true" >Ca</div>
            <div class="element-21 grid-item item21" draggable="true" >Sc</div>
            <div class="element-22 grid-item item22" draggable="true" >Ti</div>
            <div class="element-23 grid-item item23" draggable="true" >V</div>
            <div class="element-24 grid-item item24" draggable="true" >Cr</div>
            <div class="element-25 grid-item item25" draggable="true" >Mn</div>
            <div class="element-26 grid-item item26" draggable="true" >Fe</div>
            <div class="element-27 grid-item item27" draggable="true" >Co</div>
            <div class="element-28 grid-item item28" draggable="true" >Ni</div>
            <div class="element-29 grid-item item29" draggable="true" >Cu</div>
            <div class="element-30 grid-item item30" draggable="true" >Zn</div>
            <div class="element-31 grid-item item31" draggable="true" >Ga</div>
            <div class="element-32 grid-item item32" draggable="true" >Ge</div>
            <div class="element-33 grid-item item33" draggable="true" >As</div>
            <div class="element-34 grid-item item34" draggable="true" >Se</div>
            <div class="element-35 grid-item item35" draggable="true" >Br</div>
            <div class="element-36 grid-item item36" draggable="true" >Kr</div>
            <div class="element-37 grid-item item37" draggable="true" >Rb</div>
            <div class="element-38 grid-item item38" draggable="true" >Sr</div>
            <div class="element-39 grid-item item39" draggable="true" >Y</div>
            <div class="element-40 grid-item item40" draggable="true" >Zr</div>
            <div class="element-41 grid-item item41" draggable="true" >Nb</div>
            <div class="element-42 grid-item item42" draggable="true" >Mo</div>
            <div class="element-43 grid-item item43" draggable="true" >Tc</div>
            <div class="element-44 grid-item item44" draggable="true" >Ru</div>
            <div class="element-45 grid-item item45" draggable="true" >Rh</div>
            <div class="element-46 grid-item item46" draggable="true" >Pd</div>
            <div class="element-47 grid-item item47" draggable="true" >Ag</div>
            <div class="element-48 grid-item item48" draggable="true" >Cd</div>
            <div class="element-49 grid-item item49" draggable="true" >In</div>
            <div class="element-50 grid-item item50" draggable="true" >Sn</div>
            <div class="element-51 grid-item item51" draggable="true" >Sb</div>
            <div class="element-52 grid-item item52" draggable="true" >Te</div>
            <div class="element-53 grid-item item53" draggable="true" >I</div>
            <div class="element-54 grid-item item54" draggable="true" >Xe</div>
            <div class="element-55 grid-item item55" draggable="true" >Cs</div>
            <div class="element-56 grid-item item56" draggable="true" >Ba</div>

            <div class="element-72 grid-item item72" draggable="true" >Hf</div>
            <div class="element-73 grid-item item73" draggable="true" >Ta</div>
            <div class="element-74 grid-item item74" draggable="true" >W</div>
            <div class="element-75 grid-item item75" draggable="true" >Re</div>
            <div class="element-76 grid-item item76" draggable="true" >Os</div>
            <div class="element-77 grid-item item77" draggable="true" >Ir</div>
            <div class="element-78 grid-item item78" draggable="true" >Pt</div>
            <div class="element-79 grid-item item79" draggable="true" >Au</div>
            <div class="element-80 grid-item item80" draggable="true" >Hg</div>
            <div class="element-81 grid-item item81" draggable="true" >Tl</div>
            <div class="element-82 grid-item item82" draggable="true" >Pb</div>
            <div class="element-83 grid-item item83" draggable="true" >Bi</div>
            <div class="element-84 grid-item item84" draggable="true" >Po</div>
            <div class="element-85 grid-item item85" draggable="true" >At</div>
            <div class="element-86 grid-item item86" draggable="true" >Rn</div>
            <div class="element-87 grid-item item87" draggable="true" >Fr</div>
            <div class="element-88 grid-item item88" draggable="true" >Ra</div>

            <div class="element-104 grid-item item104" draggable="true" >Rf</div>
            <div class="element-105 grid-item item105" draggable="true" >Db</div>
            <div class="element-106 grid-item item106" draggable="true" >Sg</div>
            <div class="element-107 grid-item item107" draggable="true" >Bh</div>
            <div class="element-108 grid-item item108" draggable="true" >Hs</div>
            <div class="element-109 grid-item item109" draggable="true" >Mt</div>
            <div class="element-110 grid-item item110" draggable="true" >Ds</div>
            <div class="element-111 grid-item item111" draggable="true" >Rg</div>
            <div class="element-112 grid-item item112" draggable="true" >Cn</div>
            <div class="element-113 grid-item item113" draggable="true" >Nh</div>
            <div class="element-114 grid-item item114" draggable="true" >Fl</div>
            <div class="element-115 grid-item item115" draggable="true" >Mc</div>
            <div class="element-116 grid-item item116" draggable="true" >Lv</div>
            <div class="element-117 grid-item item117" draggable="true" >Ts</div>
            <div class="element-118 grid-item item118" draggable="true" >Og</div>

            <div class="element-57 grid-item item57" draggable="true" >La</div>
            <div class="element-58 grid-item item58" draggable="true" >Ce</div>
            <div class="element-59 grid-item item59" draggable="true" >Pr</div>
            <div class="element-60 grid-item item60" draggable="true" >Nd</div>
            <div class="element-61 grid-item item61" draggable="true" >Pm</div>
            <div class="element-62 grid-item item62" draggable="true" >Sm</div>
            <div class="element-63 grid-item item63" draggable="true" >Eu</div>
            <div class="element-64 grid-item item64" draggable="true" >Gd</div>
            <div class="element-65 grid-item item65" draggable="true" >Tb</div>
            <div class="element-66 grid-item item66" draggable="true" >Dy</div>
            <div class="element-67 grid-item item67" draggable="true" >Ho</div>
            <div class="element-68 grid-item item68" draggable="true" >Er</div>
            <div class="element-69 grid-item item69" draggable="true" >Tm</div>
            <div class="element-70 grid-item item70" draggable="true" >Yb</div>
            <div class="element-71 grid-item item71" draggable="true" >Lu</div>

            <div class="element-89 grid-item item89" draggable="true" >Ac</div>
            <div class="element-90 grid-item item90" draggable="true" >Th</div>
            <div class="element-91 grid-item item91" draggable="true" >Pa</div>
            <div class="element-92 grid-item item92" draggable="true" >U</div>
            <div class="element-93 grid-item item93" draggable="true" >Np</div>
            <div class="element-94 grid-item item94" draggable="true" >Pu</div>
            <div class="element-95 grid-item item95" draggable="true" >Am</div>
            <div class="element-96 grid-item item96" draggable="true" >Cm</div>
            <div class="element-97 grid-item item97" draggable="true" >Bk</div>
            <div class="element-98 grid-item item98" draggable="true" >Cf</div>
            <div class="element-99 grid-item item99" draggable="true" >Es</div>
            <div class="element-100 grid-item item100" draggable="true" >Fm</div>
            <div class="element-101 grid-item item101" draggable="true" >Md</div>
            <div class="element-102 grid-item item102" draggable="true" >No</div>
            <div class="element-103 grid-item item103" draggable="true" >Lr</div>
        </div>
    </div>
</div>
</div>


<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true"  >
    <div class="modal-dialog" role="document" draggable="true" >
        <div class="modal-content"  >
            <div class="modal-body" >
            	
                <div class="info" >
		            <div id="name"  class="modal-title h1 text-center" ></div>
            	<table class="table table-head-custom table-head-bg table-vertical-center table-bordered table-hover " >
			        <tbody>
			        	<tr>
			        		<td><b>ATOMIC NUMBER</b></td>
			        		<td id="atomicNum" ></td>
			        	</tr>
			        	<tr>
			        		<td><b>ATOMIC WEIGHT</b></td>
			        		<td id="atomicWeight" ></td>
			        	</tr>
			        	<tr>
			        		<td><b>CONFIG</b></td>
			        		<td id="eConfig" ></td>
			        	</tr>
			        	<tr>
			        		<td><b>CATEGORY</b></td>
			        		<td id="category" ></td>
			        	</tr>
			        	<tr>
			        		<td><b>DISCOVER BY</b></td>
			        		<td id="discoveredBy" ></td>
			        	</tr>
			        </tbody>
			    </table>
		        </div>
            </div>
        </div>
    </div>
</div>

<script src="./assets/script.js" ></script>
<script src="/public/js/modules/periodic.js"></script>