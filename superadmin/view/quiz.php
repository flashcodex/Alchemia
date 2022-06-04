<div class="subheader py-2 py-lg-4  subheader-solid " id="kt_subheader">
    <div class=" container-fluid  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <div class="d-flex align-items-center flex-wrap mr-2">
            <h5 class="text-dark font-weight-bold mt-2 mb-2 mr-5">Quiz</h5>
            <div class="subheader-separator subheader-separator-ver mt-2 mb-2 mr-4 bg-gray-200"></div>
            <span class="text-muted font-weight-bold mr-4">List of</span>
        </div>
        <div class="d-flex align-items-center flex-wrap">
            <a class="btn btn-info btn-sm " data-toggle="modal" data-target="#quiz" ><i class="flaticon-plus"></i>Add New</a>         
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
                            <span class="nav-text font-weight-bold">Quizzes</span>
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
                                    <table class="table table-head-custom table-head-bg table-vertical-center table-bordered table-hover" id="tbl_quiz" >
                                        <thead>
                                            <tr>
                                                <th>LEARNING MATERIAL</th>
                                                <th>PAGE</th>
                                                <th>TYPE</th>
                                                <th>QUESTION</th>
                                                <th>CHOICES</th>
                                                <th>ANSWER</th>
                                                <th>DATE CREATED</th>
                                                <th>ACTION</th>
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

<div class="modal" id="quiz" data_id="" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true" >
        <div class="modal-dialog modal-dialog-centered " role="document">
            <div class="modal-content">
                <div class="modal-header  text-center">
                    <h5 class="modal-title" id="exampleModalLabel">Type</h5>
                    
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <i aria-hidden="true" class="ki ki-close"></i>
                    </button>
                </div>
                <form id="quiz_form">
                <div class="modal-body ">
                     <div class="form-group">
                         <label>Learning Material</label>
                         <select type="text" name="material_id" class="form-control form-control-lg retrieve_pages" value="" >
                            <option></option>
                         </select>
                    </div>
                    <div class="form-group">
                         <label> Page</label>
                         <select type="text" name="material_page" class="form-control form-control-lg page_quiz" >
                            <option></option>
                         </select>
                    </div>
                    <div class="form-group">
                         <label>Question Type</label>
                         <select type="text" name="quiz_type" class="form-control form-control-lg" >
                            <option></option>
                            <option value="tof">True or False</option>
                            <option value="idnf">Identification</option>
                            <option value="mc">Multiple Choice</option>
                            <option value="mci">Multiple Choice Image</option>
                         </select>
                    </div>
                </div>
                <div class="modal-footer text-center">
                    <button type="submit" class="btn btn-primary font-weight-bold">Add</button>
                </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal" id="tof" data_id="" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true" >
        <div class="modal-dialog modal-dialog-centered " role="document">
            <div class="modal-content">
                <div class="modal-header  text-center">
                    <h5 class="modal-title">True or False</h5>
                    
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <i aria-hidden="true" class="ki ki-close"></i>
                    </button>
                </div>
                <form id="tof_quiz_update">
                <div class="modal-body ">
                    <div class="form-group">
                         <label> Page</label>
                         <select type="text" name="material_page" class="form-control form-control-lg page_quiz" >
                            <option></option>
                         </select>
                    </div>
                    <div class="form-group">
                         <label>Question</label>
                         <input type="text" name="question" class="form-control form-control-lg"  placeholder="Enter a question">
                    </div>
                    <div class="form-group">
                         <label>Answer</label>
                         <select type="text" name="ans" class="form-control form-control-lg" >
                            <option value="true">True</option>
                            <option value="false">False</option>
                         </select>
                    </div>
                    
                </div>
                <div class="modal-footer text-center">
                    <button type="submit" class="btn btn-primary font-weight-bold">Save</button>
                </div>
                </form>
            </div>
        </div>
    </div>
    <div class="modal" id="idnf" data_id="" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true" >
        <div class="modal-dialog modal-dialog-centered " role="document">
            <div class="modal-content">
                <div class="modal-header  text-center">
                    <h5 class="modal-title">Identification</h5>
                    
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <i aria-hidden="true" class="ki ki-close"></i>
                    </button>
                </div>
                <form id="idnf_quiz_update">
                <div class="modal-body ">
                    <div class="form-group">
                         <label> Page</label>
                         <select type="text" name="material_page" class="form-control form-control-lg page_quiz" >
                            <option></option>
                         </select>
                    </div>
                    <div class="form-group">
                         <label>Question</label>
                         <input type="text" name="question" class="form-control form-control-lg"  placeholder="Enter a question">
                    </div>
                    <div class="form-group">
                         <label>Answer</label>
                         <input type="text" name="ans" class="form-control form-control-lg" >
                    </div>
                </div>
                <div class="modal-footer text-center">
                    <button type="submit" class="btn btn-primary font-weight-bold">Save</button>
                </div>
                </form>
            </div>
        </div>
    </div>
    <div class="modal" id="mc" data_id="" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true" >
        <div class="modal-dialog modal-dialog-centered " role="document">
            <div class="modal-content">
                <div class="modal-header  text-center">
                    <h5 class="modal-title">Multiple Choices</h5>
                    
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <i aria-hidden="true" class="ki ki-close"></i>
                    </button>
                </div>
                <form id="mc_quiz_update">
                <div class="modal-body ">
                    <div class="form-group">
                         <label> Page</label>
                         <select type="text" name="material_page" class="form-control form-control-lg page_quiz" >
                            <option></option>
                         </select>
                    </div>
                    <div class="form-group">
                         <label>Question</label>
                         <input type="text" name="question" class="form-control form-control-lg"  placeholder="Enter a question">
                    </div>
                    <div class="form-group row">
                         <label class="col-1 col-form-label">a.)</label>
                         <div class="col-11">
                            <input type="text" name="qa" class="form-control form-control-lg"  placeholder="Enter a Answer">
                         </div>
                         <label class="col-1 col-form-label">b.)</label>
                         <div class="col-11">
                            <input type="text" name="qb" class="form-control form-control-lg"  placeholder="Enter b Answer">
                         </div>
                         <label class="col-1 col-form-label">c.)</label>
                         <div class="col-11">
                            <input type="text" name="qc" class="form-control form-control-lg"  placeholder="Enter c Answer">
                         </div>
                         <label class="col-1 col-form-label">d.)</label>
                         <div class="col-11">
                            <input type="text" name="qd" class="form-control form-control-lg"  placeholder="Enter d Answer">
                         </div>
                    </div>
                    <div class="form-group">
                         <label>Select Answer</label>
                         <select type="text" name="ans" class="form-control form-control-lg" >
                            <option></option>
                            <option value="a">a</option>
                            <option value="b">b</option>
                            <option value="c">c</option>
                            <option value="d">d</option>
                         </select>
                    </div>
                    
                </div>
                <div class="modal-footer text-center">
                    <button type="submit" class="btn btn-primary font-weight-bold">Save</button>
                </div>
                </form>
            </div>
        </div>
    </div>
     <div class="modal" id="mci" data_id="" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true" >
        <div class="modal-dialog modal-dialog-centered " role="document">
            <div class="modal-content">
                <div class="modal-header  text-center">
                    <h5 class="modal-title">Multiple Choices Image</h5>
                    
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <i aria-hidden="true" class="ki ki-close"></i>
                    </button>
                </div>
                <form id="mci_quiz_update" data_name="">
                <div class="modal-body ">
                    <div class="form-group">
                         <label> Page</label>
                         <select type="text" name="material_page" class="form-control form-control-lg page_quiz" >
                            <option></option>
                         </select>
                    </div>
                    <div class="form-group">
                         <label>Question</label>
                         <input type="text" name="question" class="form-control form-control-lg"  placeholder="Enter a question">
                         <img src="" >
                    </div>
                    <div class="form-group row">
                         <label class="col-1 col-form-label">a.)</label>
                         <div class="col-11">
                            <input type="text" name="qa" class="form-control form-control-lg select_input_img"  placeholder="Click to select" >
                         </div>
                         <label class="col-1 col-form-label">b.)</label>
                         <div class="col-11">
                            <input type="text" name="qb" class="form-control form-control-lg select_input_img"  placeholder="Click to select">
                         </div>
                         <label class="col-1 col-form-label">c.)</label>
                         <div class="col-11">
                            <input type="text" name="qc" class="form-control form-control-lg select_input_img"  placeholder="Click to select">
                         </div>
                         <label class="col-1 col-form-label">d.)</label>
                         <div class="col-11">
                            <input type="text" name="qd" class="form-control form-control-lg select_input_img"  placeholder="Click to select">
                         </div>
                    </div>
                    <div class="form-group">
                         <label>Select Answer</label>
                         <select type="text" name="ans" class="form-control form-control-lg" >
                            <option></option>
                            <option value="a">a</option>
                            <option value="b">b</option>
                            <option value="c">c</option>
                            <option value="d">d</option>
                         </select>
                    </div>
                    
                </div>
                <div class="modal-footer text-center"> <button type="submit" class="btn btn-primary font-weight-bold">Save</button>
                </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal fade" id="input_img" data_id="" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true" >
        <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header  text-center">
                    <h5 class="modal-title">Select Image</h5>
                    
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <i aria-hidden="true" class="ki ki-close"></i>
                    </button>
                </div>
                <div class="modal-body " data-height="400">
                    <ul class="nav nav-tabs nav-tabs-line">
                        <li class="nav-item">
                            <a class="nav-link active" data-toggle="tab" href="#kt_tab_pane_1">Images</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#kt_tab_pane_2">Upload</a>
                        </li>
                    </ul>
                    <div class="tab-content mt-5" id="myTabContent">
                        <div class="tab-pane fade show active " id="kt_tab_pane_1" role="tabpanel" aria-labelledby="kt_tab_pane_2">
                          <div  class="page_img row">Please upload image</div>
                        </div>
                        <div class="tab-pane fade" id="kt_tab_pane_2" role="tabpanel" aria-labelledby="kt_tab_pane_2">
                            <div class="form-group row">
                                <label class="col-form-label col-lg-3 col-sm-12 text-lg-right">Upload Image</label>
                                <div class="col-lg-8 col-md-9 col-sm-12">
                                    <div class="dropzone dropzone-default dropzone-success" id="kt_dropzone_4" >
                                        <div class="dropzone-msg dz-message needsclick">
                                            <h3 class="dropzone-msg-title">Drop files here or click to upload.</h3>
                                            <span class="dropzone-msg-desc">Only jpg, png and image files are allowed for upload</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="modal-footer text-center">
                </div> -->
            </div>
        </div>
    </div>
