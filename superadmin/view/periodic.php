<link href="assets/css/grid.css" rel="stylesheet" type="text/css" />
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

<div class="subheader py-2 py-lg-4  subheader-solid " id="kt_subheader">
    <div class=" container-fluid  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <div class="d-flex align-items-center flex-wrap mr-2">
            <h5 class="text-dark font-weight-bold mt-2 mb-2 mr-5">Periodic Table</h5>
            <div class="subheader-separator subheader-separator-ver mt-2 mb-2 mr-4 bg-gray-200"></div>
            <span class="text-muted font-weight-bold mr-4">List of</span>
        </div>
        <div class="d-flex align-items-center flex-wrap">
            <a id="create_element_btn" class="btn btn-info btn-sm "  ><i class="flaticon-plus"></i>Add New Element</a>         
        </div>
    </div>
</div>
<div class="d-flex flex-column-fluid">
    <div class="container-fluid">
        <div class="card card-custom card-stretch gutter-bs">
            <div class="card-header card-header-tabs-line">
                <div class="card-toolbar">
                    <ul class="nav nav-tabs nav-tabs-space-lg nav-tabs-line nav-tabs-bold nav-tabs-line-3x" role="tablist">
                        <li class="nav-item mr-3" name="tbl_kyc_request">
                            <a class="nav-link active" data-toggle="tab" href="#kt_apps_projects_view_tab_1" tba_view_voucher name="collectible">
                                <span class="nav-icon mr-2">
                                    <span class="svg-icon mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <rect x="0" y="0" width="24" height="24"/>
                                                <circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"/>
                                                <path d="M12,16 C12.5522847,16 13,16.4477153 13,17 C13,17.5522847 12.5522847,18 12,18 C11.4477153,18 11,17.5522847 11,17 C11,16.4477153 11.4477153,16 12,16 Z M10.591,14.868 L10.591,13.209 L11.851,13.209 C13.447,13.209 14.602,11.991 14.602,10.395 C14.602,8.799 13.447,7.581 11.851,7.581 C10.234,7.581 9.121,8.799 9.121,10.395 L7.336,10.395 C7.336,7.875 9.31,5.922 11.851,5.922 C14.392,5.922 16.387,7.875 16.387,10.395 C16.387,12.915 14.392,14.868 11.851,14.868 L10.591,14.868 Z" fill="#000000"/>
                                            </g>
                                        </svg>
                                    </span>
                                </span>
                                <span class="nav-text font-weight-bold">Elements</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="card-body p-0" >
                <div class="tab-content pt-5" id="all_tab">
                    <a href="javascript:;" download="ID.png" class="non-printable btn btn-light-danger font-weight-bold d-none" id="download-kyc"></a>
                    <div class="tab-pane active" id="kt_apps_projects_view_tab_1" role="tabpanel">
                        <div class="card-body">
                            <table class="table table-head-custom table-head-bg table-vertical-center table-bordered table-hover" id="tbl_outcomes" >
                                <thead>
                                    <tr>
                                        <th>ELEMENT</th>
                                        <th>DATE CREATED</th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal " id="periodic_modal" data_id="" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content" style="width: unset;">
            <div class="modal-header text-center">
                <h5 class="modal-title" id="exampleModalLabel" id="modal-title">Create Element</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <i aria-hidden="true" class="ki ki-close"></i>
                </button>
            </div>
            <form id="periodic_form">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-4 form-group">
                            <label>Element Title</label>
                            <input type="text" id="element-title" name="element_title" class="form-control form-control-lg retrieve_pages" value="" />
                        </div>
                        <div class="col-8 form-group row">
                            <label>Element Name</label>
                            <input type="text" id="element-name" name="element_name" class="form-control form-control-lg retrieve_pages" value="" />
                        </div>                    
                    </div>

                    <label>Create New Element</label>
                    <hr>
                    
                    <div class="light">
                        <div class="main-container" >        
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

                <div class="modal-footer text-center">
                    <button id="btn-save-element" type="button" class="btn btn-primary font-weight-bold">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script src="/public/js/modules/admin-periodic.js"></script>
