<style>
.gu-mirror{position:fixed!important;margin:0!important;z-index:9999!important;opacity:.8}.gu-hide{display:none!important}.gu-unselectable{-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important}.gu-transit{opacity:.2}
.dragthing {
    background: lightgrey;
    padding:20px;
    margin:20px;
    text-align: center;
    cursor: pointer;
    width: 150px;
}

.center-periodic
{
    width: 75%;
    margin: 0 auto;
}

.grid-item.box2:hover {
  /* background-color: rgb(171 192 196) !important; */
  border: 2px solid black;
  color: black;
}
.grid-item.search:hover {
  /* background-color: rgb(171 192 196) !important; */
  background-color: none !important;;
  color: black;
}

#no-outcome
{
    color: #ff0404;
    font-size: 2rem;
    font-weight: 500;
}

#drag-elements
{
    font-size: 2rem;
    font-weight: 500;
}

.grid-container 
{
    width: 100% !important;
    font-size: 15px !important;
    grid-template-columns: repeat(18, 3.5vw) !important;
}

.grid-container > .grid-item
{
    align-content: center;
    display: grid;
    padding-top: 0px;
    touch-action: none;
    font-size: 15px !important;
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
    /* grid-template-columns: repeat(6, 4vw); */
    display: flex;
    /* display: grid; */
    margin: auto;
    width: 600px;
    overflow-x: auto;
    gap: 1em;
    padding: 10px;
    
}
#clear-container, #clear,#no-outcome,.drag-elementstag{
    -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;

    
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


    <div class="row" style="margin-right: 0px !important;">
        <div id="left-side" class="col-12 col-md-3 col-lg-3" style="display: none; ">
            <div class="card text-center container" style="margin-left: 20px;margin-top: 20px;margin-bottom:10px; max-height: 80vh;overflow-y: auto;">
                <div class="row">
                    <div class="col-12 col-sm-12 text-center mt-5">
                        <h3>List of Possible Combination</h3>
                    </div>
                </div>
                <div id="outcomes" class="row">

                </div>
            </div>
        </div>
         <div id="left-side-search" class="col-12 col-md-3 col-lg-3" style="display: none;" >
            <div class="card text-center container" style="margin-left: 20px;margin-top: 20px;margin-bottom:10px; max-height: 80vh;overflow-y: auto;">
                <div class="row">
                    <div class="col-12 col-sm-12 text-center mt-5">
                        <h3>Searched Product</h3>
                    </div>
                </div>
                <div id="outcomes-search" class="row">

                </div>
            </div>
        </div>

        <div id="right-side" class="col-12 col-md-12 col-lg-12">
            <div id="main-container" class="main-container center-periodic">
                
                <div id="left-rm-spill" class="grid-container">            
                <div class="element-1 grid-item chart-item item1" style="line-height: 0.5;"  id="1"> <p style="font-size: 13px;">1</p> H</div>
                <div id="right-rm-spill" class="grid-item box2 formula-box" style="background-color: #ffffff;border: 2px solid black;position: relative; display: flex; align-items: center; ">
                        <div id="formula" class="formula-container no-drag">
                        <div class ="formula-box fix " style="grid-column-start: 1;grid-column-end: 10;text-align: center;"><span style="font-size: large;" >Drag elements to combine</span></div>
                        </div>
                    </div>

            <div class="no-drag" style="grid-column-start: 13;grid-column-end: 13; ">  <label style="font-size: 12px;"> Search End Product </label> 
            </div>   
            <div class="no-drag" style="grid-column-start: 14;grid-column-end: 18;height:20px;  display: inline-block;"> <input type="search" method='GET' id="searchEndProduct" class="form-control" placeholder="Search..."  > <p id="NoEndP" style="color:#ff0404; visibility:hidden">No possible End Product Name </p>
            </div>     
            <div class="element-2 grid-item chart-item item2" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">2</p> He</div>
            <div class="element-3 grid-item chart-item item3" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">3</p> Li</div>
            <div class="element-4 grid-item chart-item item4" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">4</p> Be</div>
            <div class="element-5 grid-item chart-item item5" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">5</p> B</div>
            <div class="element-6 grid-item chart-item item6" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">6</p> C</div>
            <div class="element-7 grid-item chart-item item7" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">7</p> N</div>
            <div class="element-8 grid-item chart-item item8" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">8</p> O</div>
            <div class="element-9 grid-item chart-item item9" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">9</p> F</div>
            <div class="element-10 grid-item chart-item item10" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">10</p> Ne</div>
            <div class="element-11 grid-item chart-item item11" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">11</p> Na</div>
            
            <div class="element-12 grid-item chart-item item12" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">12</p> Mg</div>
            <div class="element-13 grid-item chart-item item13" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">13</p> Al</div>
            <div class="element-14 grid-item chart-item item14" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">14</p> Si</div>
            <div class="element-15 grid-item chart-item item15" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">15</p> P</div>
            <div class="element-16 grid-item chart-item item16" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">16</p> S</div>
            <div class="element-17 grid-item chart-item item17" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">17</p> Cl</div>
            <div class="element-18 grid-item chart-item item18" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">18</p> Ar</div>
            <div class="element-19 grid-item chart-item item19" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">19</p> K</div>
            <div class="element-20 grid-item chart-item item20" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">20</p> Ca</div>
            <div class="element-21 grid-item chart-item item21" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">21</p> Sc</div>
            <div class="element-22 grid-item chart-item item22" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">22</p> Ti</div>
            <div class="element-23 grid-item chart-item item23" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">23</p> V</div>
            <div class="element-24 grid-item chart-item item24" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">24</p> Cr</div>
            <div class="element-25 grid-item chart-item item25" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">25</p> Mn</div>
            <div class="element-26 grid-item chart-item item26" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">26</p> Fe</div>
            <div class="element-27 grid-item chart-item item27" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">27</p> Co</div>
            <div class="element-28 grid-item chart-item item28" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">28</p> Ni</div>
            <div class="element-29 grid-item chart-item item29" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">29</p> Cu</div>
            <div class="element-30 grid-item chart-item item30" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">30</p> Zn</div>
            <div class="element-31 grid-item chart-item item31" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">31</p> Ga</div>
            <div class="element-32 grid-item chart-item item32" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">32</p> Ge</div>
            <div class="element-33 grid-item chart-item item33" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">33</p> As</div>
            <div class="element-34 grid-item chart-item item34" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">34</p> Se</div>
            <div class="element-35 grid-item chart-item item35" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">35</p> Br</div>
            <div class="element-36 grid-item chart-item item36" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">36</p> Kr</div>
            <div class="element-37 grid-item chart-item item37" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">37</p> Rb</div>
            <div class="element-38 grid-item chart-item item38" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">38</p> Sr</div>
            <div class="element-39 grid-item chart-item item39" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">39</p> Y</div>
            <div class="element-40 grid-item chart-item item40" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">40</p> Zr</div>
            <div class="element-41 grid-item chart-item item41" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">41</p> Nb</div>
            <div class="element-42 grid-item chart-item item42" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">42</p> Mo</div>
            <div class="element-43 grid-item chart-item item43" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">43</p> Tc</div>
            <div class="element-44 grid-item chart-item item44" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">44</p> Ru</div>
            <div class="element-45 grid-item chart-item item45" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">45</p> Rh</div>
            <div class="element-46 grid-item chart-item item46" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">46</p> Pd</div>
            <div class="element-47 grid-item chart-item item47" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">47</p> Ag</div>
            <div class="element-48 grid-item chart-item item48" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">48</p> Cd</div>
            <div class="element-49 grid-item chart-item item49" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">49</p> In</div>
            <div class="element-50 grid-item chart-item item50" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">50</p> Sn</div>
            <div class="element-51 grid-item chart-item item51" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">51</p> Sb</div>
            <div class="element-52 grid-item chart-item item52" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">52</p> Te</div>
            <div class="element-53 grid-item chart-item item53" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">53</p> I</div>
            <div class="element-54 grid-item chart-item item54" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">54</p> Xe</div>
            <div class="element-55 grid-item chart-item item55" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">55</p> Cs</div>
            <div class="element-56 grid-item chart-item item56" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">56</p> Ba</div>

            <div class="element-72 grid-item chart-item item72" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">72</p> Hf</div>
            <div class="element-73 grid-item chart-item item73" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">73</p> Ta</div>
            <div class="element-74 grid-item chart-item item74" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">74</p> W</div>
            <div class="element-75 grid-item chart-item item75" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">75</p> Re</div>
            <div class="element-76 grid-item chart-item item76" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">76</p> Os</div>
            <div class="element-77 grid-item chart-item item77" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">77</p> Ir</div>
            <div class="element-78 grid-item chart-item item78" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">78</p> Pt</div>
            <div class="element-79 grid-item chart-item item79" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">79</p> Au</div>
            <div class="element-80 grid-item chart-item item80" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">80</p> Hg</div>
            <div class="element-81 grid-item chart-item item81" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">81</p> Tl</div>
            <div class="element-82 grid-item chart-item item82" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">82</p> Pb</div>
            <div class="element-83 grid-item chart-item item83" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">83</p> Bi</div>
            <div class="element-84 grid-item chart-item item84" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">84</p> Po</div>
            <div class="element-85 grid-item chart-item item85" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">85</p> At</div>
            <div class="element-86 grid-item chart-item item86" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">86</p> Rn</div>
            <div class="element-87 grid-item chart-item item87" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">87</p> Fr</div>
            <div class="element-88 grid-item chart-item item88" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">88</p> Ra</div>

            <div class="element-104 grid-item chart-item item104" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">104</p> Rf</div>
            <div class="element-105 grid-item chart-item item105" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">105</p> Db</div>
            <div class="element-106 grid-item chart-item item106" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">106</p> Sg</div>
            <div class="element-107 grid-item chart-item item107" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">107</p> Bh</div>
            <div class="element-108 grid-item chart-item item108" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">108</p> Hs</div>
            <div class="element-109 grid-item chart-item item109" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">109</p> Mt</div>
            <div class="element-110 grid-item chart-item item110" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">110</p> Ds</div>
            <div class="element-111 grid-item chart-item item111" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">111</p> Rg</div>
            <div class="element-112 grid-item chart-item item112" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">112</p> Cn</div>
            <div class="element-113 grid-item chart-item item113" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">113</p> Nh</div>
            <div class="element-114 grid-item chart-item item114" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">114</p> Fl</div>
            <div class="element-115 grid-item chart-item item115" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">115</p> Mc</div>
            <div class="element-116 grid-item chart-item item116" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">116</p> Lv</div>
            <div class="element-117 grid-item chart-item item117" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">117</p> Ts</div>
            <div class="element-118 grid-item chart-item item118" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">118</p> Og</div>

            <div class="element-57 grid-item chart-item item57" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">57</p> La</div>
            <div class="element-58 grid-item chart-item item58" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">58</p> Ce</div>
            <div class="element-59 grid-item chart-item item59" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">59</p> Pr</div>
            <div class="element-60 grid-item chart-item item60" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">60</p> Nd</div>
            <div class="element-61 grid-item chart-item item61" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">61</p> Pm</div>
            <div class="element-62 grid-item chart-item item62" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">62</p> Sm</div>
            <div class="element-63 grid-item chart-item item63" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">63</p> Eu</div>
            <div class="element-64 grid-item chart-item item64" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">64</p> Gd</div>
            <div class="element-65 grid-item chart-item item65" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">65</p> Tb</div>
            <div class="element-66 grid-item chart-item item66" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">66</p> Dy</div>
            <div class="element-67 grid-item chart-item item67" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">67</p> Ho</div>
            <div class="element-68 grid-item chart-item item68" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">68</p> Er</div>
            <div class="element-69 grid-item chart-item item69" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">69</p> Tm</div>
            <div class="element-70 grid-item chart-item item70" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">70</p> Yb</div>
            <div class="element-71 grid-item chart-item item71" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">71</p> Lu</div>

            <div class="element-89 grid-item chart-item item89" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">89</p> Ac</div>
            <div class="element-90 grid-item chart-item item90" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">90</p> Th</div>
            <div class="element-91 grid-item chart-item item91" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">91</p> Pa</div>
            <div class="element-92 grid-item chart-item item92" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">92</p> U</div>
            <div class="element-93 grid-item chart-item item93" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">93</p> Np</div>
            <div class="element-94 grid-item chart-item item94" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">94</p> Pu</div>
            <div class="element-95 grid-item chart-item item95" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">95</p> Am</div>
            <div class="element-96 grid-item chart-item item96" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">96</p> Cm</div>
            <div class="element-97 grid-item chart-item item97" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">97</p> Bk</div>
            <div class="element-98 grid-item chart-item item98" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">98</p> Cf</div>
            <div class="element-99 grid-item chart-item item99" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">99</p> Es</div>
            <div class="element-100 grid-item chart-item item100" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">100</p> Fm</div>
            <div class="element-101 grid-item chart-item item101" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">101</p> Md</div>
            <div class="element-102 grid-item chart-item item102" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">102</p> No</div>
            <div class="element-103 grid-item chart-item item103" draggable="true" style="line-height: 0.5;"> <p style="font-size: 13px;">103</p> Lr</div>
      
                </div>
            </div>
        </div>        
    </div>
</div>
</div>


<div class="modal fade" id="element-modal" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
            	
                <div class="info">
		            <div id="name" class="modal-title h1 text-center"></div>
            	    <table class="table table-head-custom table-head-bg table-vertical-center table-bordered table-hover " >
                        <tbody>
                            <tr>
                                <td><b>ATOMIC NUMBER</b></td>
                                <td id="atomicNum"></td>
                            </tr>
                            <tr>
                                <td><b>ATOMIC WEIGHT</b></td>
                                <td id="atomicWeight"></td>
                            </tr>
                            <tr>
                                <td><b>CONFIG</b></td>
                                <td id="eConfig"></td>
                            </tr>
                            <tr>
                                <td><b>CATEGORY</b></td>
                                <td id="category"></td>
                            </tr>
                            <tr>
                                <td><b>DISCOVER BY</b></td>
                                <td id="discoveredBy"></td>
                            </tr>
                        </tbody>
			        </table>
		        </div>
            </div>
        </div>
    </div>

<script src="https://cdn.jsdelivr.net/gh/bevacqua/dragula/dist/dragula.min.js"></script>
<script src="./assets/script.js" ></script>
<script src="/public/js/modules/periodic.js"></script>
