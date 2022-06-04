
<div class="subheader py-2 py-lg-4  subheader-solid " id="kt_subheader">
    <div class=" container-fluid  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <div class="d-flex align-items-center flex-wrap mr-2">
            <h5 class="text-dark font-weight-bold mt-2 mb-2 mr-5">User Account</h5>
            <div class="subheader-separator subheader-separator-ver mt-2 mb-2 mr-4 bg-gray-200"></div>
            <span class="text-muted font-weight-bold mr-4">List of</span>
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
                                            <path d="M4.875,20.75 C4.63541667,20.75 4.39583333,20.6541667 4.20416667,20.4625 L2.2875,18.5458333 C1.90416667,18.1625 1.90416667,17.5875 2.2875,17.2041667 C2.67083333,16.8208333 3.29375,16.8208333 3.62916667,17.2041667 L4.875,18.45 L8.0375,15.2875 C8.42083333,14.9041667 8.99583333,14.9041667 9.37916667,15.2875 C9.7625,15.6708333 9.7625,16.2458333 9.37916667,16.6291667 L5.54583333,20.4625 C5.35416667,20.6541667 5.11458333,20.75 4.875,20.75 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/>
                                            <path d="M2,11.8650466 L2,6 C2,4.34314575 3.34314575,3 5,3 L19,3 C20.6568542,3 22,4.34314575 22,6 L22,15 C22,15.0032706 21.9999948,15.0065399 21.9999843,15.009808 L22.0249378,15 L22.0249378,19.5857864 C22.0249378,20.1380712 21.5772226,20.5857864 21.0249378,20.5857864 C20.7597213,20.5857864 20.5053674,20.4804296 20.317831,20.2928932 L18.0249378,18 L12.9835977,18 C12.7263047,14.0909841 9.47412135,11 5.5,11 C4.23590829,11 3.04485894,11.3127315 2,11.8650466 Z M6,7 C5.44771525,7 5,7.44771525 5,8 C5,8.55228475 5.44771525,9 6,9 L15,9 C15.5522847,9 16,8.55228475 16,8 C16,7.44771525 15.5522847,7 15,7 L6,7 Z" fill="#000000"/>
                                        </g>
                                    </svg>
                                </span>
                            </span>
                            <span class="nav-text font-weight-bold">Users</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="card-body p-0" >
            <div class="tab-content pt-5" id="all_tab">

                    <a href="javascript:;" download="ID.png" class="non-printable btn btn-light-danger font-weight-bold d-none" id="download-kyc"></a>
                    <div class="tab-pane active" id="kt_apps_projects_view_tab_1" role="tabpanel">
                            <!-- <div class="card card-custom card-stretch"> -->
                                <!-- <div class="card-header flex-wrap py-5">
                                    <div class="card-title">
                                        <h3 class="card-label">
                                            List of Pending KYC
                                        </h3>
                                    </div>
                                    
                                </div> -->

                                <div class="card-body">
                                    <!-- <form class="mb-15" id="search_payout_form">
                                            <div class="row mb-6">
                                                <div class="col-lg-3 mb-lg-0 mb-6" >
                                                    <div search-bar="1">
                                                    <label>Username:</label>
                                                    <input type="text" class="form-control datatable-input" placeholder="Username" data-col-index="1" />
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 mb-lg-0 mb-6">
                                                    <div  search-bar="0">
                                                    <label>Email:</label>
                                                    <input type="text" class="form-control datatable-input" placeholder="Email" data-col-index="2" />
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 mb-lg-0 mb-6" >
                                                    <div search-bar="3">
                                                    <label>Date Requested:</label>
                                                    <div class="input-daterange input-group" name="kt_datepicker">
                                                        <input type="text" class="form-control datatable-input" name="start" placeholder="From" data-col-index="14" />
                                                        <div class="input-group-append">
                                                            <span class="input-group-text">
                                                                <i class="la la-ellipsis-h"></i>
                                                            </span>
                                                        </div>
                                                        <input type="text" class="form-control datatable-input" name="end" placeholder="To" data-col-index="14" />
                                                    </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 mb-lg-0 mb-6 d-flex align-self-end justify-content-center" >
                                                    <button class="btn btn-primary btn-primary--icon" id="kt_search"><span><i class="la la-search"></i><span>Search</span></span></button>&#160;&#160;
                                                    <button class="btn btn-secondary btn-secondary--icon" id="kt_reset"><span><i class="la la-close"></i><span>Reset</span></span></button>
                                                </div>
                                                
                                            </div>
                                        </form> -->
                                    <table class="table table-head-custom table-head-bg table-vertical-center table-bordered table-hover" id="tbl_users" >
                                        <thead>
                                            <tr>
                                                <th>IMAGE</th>
                                                <th>USERNAME</th>
                                                <th>FULLNAME</th>
                                                <th>EMAIL</th>
                                                <th>MOBILE</th>
                                                <th>STATUS</th>
                                            </tr>
                                        </thead> 
                                        <tbody>
                                        </tbody>
                                    </table>
                                    <!--end: Datatable-->
                                </div>
                            <!-- </div> -->
                            <!--end::Card-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="TopupModal" class="modal modal-2">
  <span class="close close-2">&times;</span>
  <img class="modal-content modal-content-2" id="img01">
  <div id="caption"></div>
</div>