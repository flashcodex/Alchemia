<style>
    .canvasjs-chart-credit {
        display:none !important;
    }

    .borderless {
        border: 0;
    }

 #report-graph {
    width: 100%;
    height: 100%;
    }    
</style>

<div class="subheader py-2 py-lg-4 subheader-solid" id="kt_subheader">
    <div class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <div class="d-flex align-items-center flex-wrap mr-2">   
            <h5 class="text-dark font-weight-bold mt-2 mb-2 mx-5">Dashboard</h5>
            <div class="subheader-separator subheader-separator-ver mt-2 mb-2 mr-4 bg-gray-200"></div>
            <span class="text-muted font-weight-bold mr-4">Statistics</span>            
        </div>
    </div>
</div>

<div class="d-flex flex-column-fluid">
    <div class="container-fluid">
        <div class="row">
            <div class="col-xl-12">
                <div class="row">
                    <div class="col">
                        <div class="card card-custom bg-primary card-stretch gutter-b">
                            <div class="card-body">
                                <span class="svg-icon svg-icon-2x svg-icon-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <rect x="0" y="0" width="24" height="24"></rect>
                                            <path
                                                d="M12,3 C16.418278,3 20,6.581722 20,11 L20,21 C20,21.5522847 19.5522847,22 19,22 L5,22 C4.44771525,22 4,21.5522847 4,21 L4,11 C4,6.581722 7.581722,3 12,3 Z M9,10 C7.34314575,10 6,11.3431458 6,13 C6,14.6568542 7.34314575,16 9,16 L15,16 C16.6568542,16 18,14.6568542 18,13 C18,11.3431458 16.6568542,10 15,10 L9,10 Z"
                                                fill="#000000"
                                            ></path>
                                            <path
                                                d="M15,14 C14.4477153,14 14,13.5522847 14,13 C14,12.4477153 14.4477153,12 15,12 C15.5522847,12 16,12.4477153 16,13 C16,13.5522847 15.5522847,14 15,14 Z M9,14 C8.44771525,14 8,13.5522847 8,13 C8,12.4477153 8.44771525,12 9,12 C9.55228475,12 10,12.4477153 10,13 C10,13.5522847 9.55228475,14 9,14 Z"
                                                fill="#000000"
                                                opacity="0.3"
                                            ></path>
                                        </g>
                                    </svg>
                                </span>
                                <span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block text-hover-warning" id="total-admin">7</span>
                                <a href="adminprofile" >
                                    <span class="font-weight-bold text-white font-size-sm">
                                        Admin Profile</a>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="col">
                        <div class="card card-custom bg-danger card-stretch gutter-b">
                            <div class="card-body">
                                <span class="svg-icon svg-icon-2x svg-icon-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <polygon points="0 0 24 0 24 24 0 24"></polygon>
                                            <path
                                                d="M18,14 C16.3431458,14 15,12.6568542 15,11 C15,9.34314575 16.3431458,8 18,8 C19.6568542,8 21,9.34314575 21,11 C21,12.6568542 19.6568542,14 18,14 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z"
                                                fill="#000000"
                                                fill-rule="nonzero"
                                                opacity="0.3"
                                            ></path>
                                            <path
                                                d="M17.6011961,15.0006174 C21.0077043,15.0378534 23.7891749,16.7601418 23.9984937,20.4 C24.0069246,20.5466056 23.9984937,21 23.4559499,21 L19.6,21 C19.6,18.7490654 18.8562935,16.6718327 17.6011961,15.0006174 Z M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z"
                                                fill="#000000"
                                                fill-rule="nonzero"
                                            ></path>
                                        </g>
                                    </svg>
                                </span>
                                <span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 text-hover-primary d-block" id="total-user">32</span>
                                <a href="useraccount" >
                                    <span class="font-weight-bold text-white font-size-sm">User Account</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card card-custom bg-success card-stretch gutter-b">
                            <div class="card-body">
                                <span class="svg-icon svg-icon-2x svg-icon-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <rect x="0" y="0" width="24" height="24"></rect>
                                            <path
                                                d="M3,16 L5,16 C5.55228475,16 6,15.5522847 6,15 C6,14.4477153 5.55228475,14 5,14 L3,14 L3,12 L5,12 C5.55228475,12 6,11.5522847 6,11 C6,10.4477153 5.55228475,10 5,10 L3,10 L3,8 L5,8 C5.55228475,8 6,7.55228475 6,7 C6,6.44771525 5.55228475,6 5,6 L3,6 L3,4 C3,3.44771525 3.44771525,3 4,3 L10,3 C10.5522847,3 11,3.44771525 11,4 L11,19 C11,19.5522847 10.5522847,20 10,20 L4,20 C3.44771525,20 3,19.5522847 3,19 L3,16 Z"
                                                fill="#000000"
                                                opacity="0.3"
                                            ></path>
                                            <path
                                                d="M16,3 L19,3 C20.1045695,3 21,3.8954305 21,5 L21,15.2485298 C21,15.7329761 20.8241635,16.200956 20.5051534,16.565539 L17.8762883,19.5699562 C17.6944473,19.7777745 17.378566,19.7988332 17.1707477,19.6169922 C17.1540423,19.602375 17.1383289,19.5866616 17.1237117,19.5699562 L14.4948466,16.565539 C14.1758365,16.200956 14,15.7329761 14,15.2485298 L14,5 C14,3.8954305 14.8954305,3 16,3 Z"
                                                fill="#000000"
                                            ></path>
                                        </g>
                                    </svg>
                                </span>
                                <span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 text-hover-primary d-block" id="total-quiz">944</span>
                                <span class="font-weight-bold text-white font-size-sm">Question Bank</span>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card card-custom bg-dark card-stretch gutter-b">
                            <div class="card-body">
                                <span class="svg-icon svg-icon-2x svg-icon-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <rect x="0" y="0" width="24" height="24"></rect>
                                            <path
                                                d="M8,3 L8,3.5 C8,4.32842712 8.67157288,5 9.5,5 L14.5,5 C15.3284271,5 16,4.32842712 16,3.5 L16,3 L18,3 C19.1045695,3 20,3.8954305 20,5 L20,21 C20,22.1045695 19.1045695,23 18,23 L6,23 C4.8954305,23 4,22.1045695 4,21 L4,5 C4,3.8954305 4.8954305,3 6,3 L8,3 Z"
                                                fill="#000000"
                                                opacity="0.3"
                                            ></path>
                                            <path
                                                d="M11,2 C11,1.44771525 11.4477153,1 12,1 C12.5522847,1 13,1.44771525 13,2 L14.5,2 C14.7761424,2 15,2.22385763 15,2.5 L15,3.5 C15,3.77614237 14.7761424,4 14.5,4 L9.5,4 C9.22385763,4 9,3.77614237 9,3.5 L9,2.5 C9,2.22385763 9.22385763,2 9.5,2 L11,2 Z"
                                                fill="#000000"
                                            ></path>
                                            <rect fill="#000000" opacity="0.3" x="10" y="9" width="7" height="2" rx="1"></rect>
                                            <rect fill="#000000" opacity="0.3" x="7" y="9" width="2" height="2" rx="1"></rect>
                                            <rect fill="#000000" opacity="0.3" x="7" y="13" width="2" height="2" rx="1"></rect>
                                            <rect fill="#000000" opacity="0.3" x="10" y="13" width="7" height="2" rx="1"></rect>
                                            <rect fill="#000000" opacity="0.3" x="7" y="17" width="2" height="2" rx="1"></rect>
                                            <rect fill="#000000" opacity="0.3" x="10" y="17" width="7" height="2" rx="1"></rect>
                                        </g>
                                    </svg>
                                </span>
                                <span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 text-hover-primary d-block" id="total-record">100</span>
                                
                                <a href="#quiz-summary" id="quiz-summary-btn" class="font-weight-bold" data-toggle="collapse"><i class="fa fa-file"></i>
                                    <span class="font-weight-bold text-white font-size-sm">Report</span>
                                </a>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <div class="card card-custom card-stretch gutter-b">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xs-4 col-lg-4 col-md-4 col-sm-12">
                                <div class="form-group">
                                    <label style="font-size: 1.8rem;font-weight: 600;">Type</label>
                                    <select id="filter-type" type="text" name="type" class="form-control form-control-lg">
                                        <option value="module">Module</option>
                                        <option value="topic">Topic</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-xs-8 col-lg-8 col-md-8 col-sm-12">
                                <div class="form-group">
                                    <label style="font-size: 1.8rem;font-weight: 600;">Content</label>
                                    <select id="filter-content" type="text" name="type" class="form-control form-control-lg">

                                    </select>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div id="per-module-show" class="col-xs-6 col-lg-6 col-md-6 col-sm-12">
                <div class="card card-custom card-stretch gutter-b">
                    <div class="card-body text-center" style="cursor: pointer;">
                        <img alt="Logo" src="/public/assets/book.png" class="max-h-100px ">

                        <span class=" font-weight-bold text-dark" style="font-size: 1.8rem;">
                            Students Report per Module
                        </span>                                    
                    </div>
                </div>
            </div>

            <div id="taking-show" class="col-xs-6 col-lg-6 col-md-6 col-sm-12">
                <div class="card card-custom card-stretch gutter-b">
                    <div class="card-body text-center" style="cursor: pointer;">
                        <img alt="Logo" src="/public/assets/student.png" class="max-h-100px ">    

                        <span class="font-weight-bold text-dark" style="font-size: 1.8rem;">
                            Students Currently Taking
                        </span>                                    
                    </div>
                </div>
            </div>            
        </div>

        <div class="row">
            <div class="col-xs-4 col-lg-4 col-md-4 col-sm-12">
                <div class="card card-custom card-stretch gutter-b">
                    <div class="card-body text-center">
                        <span class="font-weight-bold text-dark" style="font-size: 1.8rem;">
                            Top Ranking Students
                        </span>

                        <div class="text-left">
                            <table class="table table-borderless">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Grade</th>
                                    </tr>
                                </thead>
                                <tbody id="top-students">
 
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xs-4 col-lg-4 col-md-4 col-sm-12">
                <div class="card card-custom card-stretch gutter-b">
                    <div class="card-body text-center">
                        <span class="font-weight-bold text-dark" style="font-size: 1.8rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="42px" height="47px" viewBox="0 0 24 24" version="1.1">
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <rect x="0" y="0" width="24" height="24"></rect>
                                    <circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle>
                                    <path d="M12,16 C12.5522847,16 13,16.4477153 13,17 C13,17.5522847 12.5522847,18 12,18 C11.4477153,18 11,17.5522847 11,17 C11,16.4477153 11.4477153,16 12,16 Z M10.591,14.868 L10.591,13.209 L11.851,13.209 C13.447,13.209 14.602,11.991 14.602,10.395 C14.602,8.799 13.447,7.581 11.851,7.581 C10.234,7.581 9.121,8.799 9.121,10.395 L7.336,10.395 C7.336,7.875 9.31,5.922 11.851,5.922 C14.392,5.922 16.387,7.875 16.387,10.395 C16.387,12.915 14.392,14.868 11.851,14.868 L10.591,14.868 Z" fill="#000000"></path>
                                </g>
                            </svg>
                            Top Difficult Question
                        </span>
                        
                        <div class="text-left">
                            <ul id="top-questions" class="list-group list-group-flush borderless text-dark">
                                <!-- <li class="list-group-item borderless" style="font-size: 1.5rem;">Cras justo odio</li>
                                <li class="list-group-item borderless" style="font-size: 1.5rem;">Dapibus ac facilisis in</li>
                                <li class="list-group-item borderless" style="font-size: 1.5rem;">Morbi leo risus</li>
                                <li class="list-group-item borderless" style="font-size: 1.5rem;">Porta ac consectetur ac</li>
                                <li class="list-group-item borderless" style="font-size: 1.5rem;">Vestibulum at eros</li> -->
                            </ul>
                        </div>                        
                    </div>
                </div>
            </div>

            <div class="col-xs-4 col-lg-4 col-md-4 col-sm-12">
                <div class="card card-custom card-stretch gutter-b">
                    <div class="card-body text-center">
                        <span class=" font-weight-bold text-dark" style="font-size: 1.8rem;">
                            Students Registered this Month
                        </span>
                        <div>
                            <canvas id="registered-graph"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-xl-8">
                <div class="row">
                    <div class="nav nav-tabs collapse grabbable-parent" id="quiz-summary" style="border: none;">
                        <div class="row">
                            <div class="col-12 mb-5">
                                <h1>Lesson Statistics</h1>
                            </div>

                            <div class="col-3">
                                <div class="card card-custom bg-primary card-stretch gutter-b">
                                    <div class="card-body">
                                        <span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block text-hover-warning" id="total-module">7</span>                                    
                                        <span class="font-weight-bold text-white font-size-sm">
                                            Total Quizzes
                                        </span>                                    
                                    </div>
                                </div>
                            </div>

                            <div class="col-3">
                                <div class="card card-custom bg-success card-stretch gutter-b">
                                    <div class="card-body">
                                        <span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block text-hover-warning" id="total-module-passed">7</span>                                    
                                        <span class="font-weight-bold text-white font-size-sm">
                                            Passed
                                        </span>                                    
                                    </div>
                                </div>
                            </div>

                            <div class="col-3">
                                <div class="card card-custom bg-danger card-stretch gutter-b">
                                    <div class="card-body">
                                        <span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block text-hover-warning" id="total-module-failed">7</span>                                    
                                        <span class="font-weight-bold text-white font-size-sm">
                                            Failed
                                        </span>                                    
                                    </div>
                                </div>
                            </div>

                            <div class="col-3">
                                <div class="card card-custom bg-warning card-stretch gutter-b">
                                    <div class="card-body">
                                        <span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block text-hover-warning" id="total-module-taking">7</span>                                    
                                        <span class="font-weight-bold text-white font-size-sm">
                                            Taking
                                        </span>                                    
                                    </div>
                                </div>
                            </div>                               
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal taking-modal" data_id="" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true" >
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content" style="padding:2rem;">
            <div class="modal-header  text-center">
                <!-- <h5 class="modal-title">Identification</h5> -->
                
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <i aria-hidden="true" class="ki ki-close"></i>
                </button>
            </div>        
            <div class="">
                <canvas id="taking-graph"></canvas>
            </div>

            <span class="font-weight-bold text-dark text-center border-top border-dark mt-5 mb-2" style="font-size: 1.8rem;">
                Number of students currently taking per module
            </span>
        </div>
    </div>
</div>

<div class="modal report-modal" id="report-modal" data_id="" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true" >
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content" style="padding:2rem;">
            <div class="modal-header  text-center">            
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <i aria-hidden="true" class="ki ki-close"></i>
                </button>
            </div>        
            <span class="font-weight-bold text-dark text-center mt-2 mb-2" style="font-size: 1.8rem;">
                Select Module
                <select id="filter-report" type="text" name="type" class="form-control form-control-lg">

                </select>
            </span>
            
            <div class="">
                <canvas id="report-graph"></canvas>
            </div>

            <span class="font-weight-bold text-dark text-center border-top border-dark mt-5 mb-2" style="font-size: 1.8rem;">
                STUDENT'S REPORT PER MODULE
            </span>
        </div>
    </div>
</div>