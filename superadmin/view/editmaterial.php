<style type="text/css">
* { box-sizing: border-box }
.box {
	display: -webkit-flex;
	display: flex;
	-webkit-flex-wrap: wrap;
	flex-wrap: wrap;
	width: 720px;
	padding: 40px;
	background-color: #fff;
}
.item {
	display: inline-block;
	margin: 6px;
	width: 120px;
	height: 120px;
	border: 1px solid #c4c4c4;
	box-shadow: 0 0 9px rgba(0, 0, 0, 0.13);
	line-height: 120px;
	text-align: center;
	font-size: 44px;
}
</style>

<div class="subheader py-2 py-lg-6 subheader-transparent" id="kt_subheader">
    <div class="container d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <div class="d-flex align-items-center flex-wrap mr-1">
            <button class="burger-icon burger-icon-left mr-4 d-inline-block d-lg-none" id="kt_subheader_mobile_toggle">
                <span></span>
            </button>
            <div class="d-flex align-items-baseline flex-wrap mr-5">
                <h5 class="text-dark font-weight-bold my-1 mr-5 page_header">Material > Coverpage</h5>
            </div>
        </div>
        <div class="d-flex align-items-center flex-wrap">
            <a class="btn btn-info btn-sm btn_add_page"><i class="fa fa-plus"></i>Add Page</a>
            <!-- <a class="btn btn-info btn-sm "  ><i class="fa fa-edit"></i>Activity</a> -->
            <div class="subheader-separator subheader-separator-ver mt-2 mb-2 mr-4 bg-gray-200"></div>
            <a class="btn btn-sm publish_material text-white" style="background-color: seagreen;"><i class="fa fa-check text-white"></i>Publish</a>
        </div>
    </div>
</div>

<div class="d-flex flex-column-fluid">
    <div class="container px-0">
        <div class="d-flex flex-row">
            <!--begin::Aside-->
            <div class="flex-row-auto offcanvas-mobile w-300px w-xl-350px" id="kt_profile_aside">
                <div class="card card-custom card-stretch gutter-b">
                    <div class="card-body">
                        <div class="mb-10">
                            <div class="form-group row">
                                <label class="col-sm-5 col-form-label">Module Number</label>
                                <div class="col-sm-4">
                                    <input id="module_no" type="number" class="form-control"  placeholder="Enter module number">
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Main</label>
                                <div class="input-group">
                                    <input type="text" class="form-control material_name" placeholder="Learning material" />
                                    <div class="input-group-append">
                                        <a href="#pages" id="show_pages" class="btn btn-info font-weight-bold" data-toggle="collapse"><i class="fa fa-file"></i></a>
                                        <a href="#setting" class="btn btn-primary font-weight-bold" data-toggle="collapse"><i class="fa fa-cog"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mb-10">
                            <button id="btn-update-topic-order" style="display:none" class="btn btn-info btn-block">Update Topic Order</button>
                        </div>
                        
                        <div class="nav nav-tabs collapse grabbable-parent" id="pages" style="border: none;"></div>
                        <div class="nav nav-tabs collapse" id="setting" style="border: none;">
                            <a data-toggle="tab" href="#bgimage" class="btn_hide btn_all_image btn btn-hover-light-primary font-weight-bold py-3 px-6 mb-2 btn-block">Images</a>
                            <a data-toggle="tab" href="#bgcolor" class="btn_hide btn btn-hover-light-primary font-weight-bold py-3 px-6 mb-2 btn-block">Color Scheme</a>
                            <a data-toggle="tab" href="#bgrequisite" class="btn_hide btn btn-hover-light-primary font-weight-bold py-3 px-6 mb-2 btn-block">Pre-Requisite & Quiz item</a>
                        </div>
                        <style type="text/css">
                            .p-b-10 {
                                padding-bottom: 10px;
                            }
                        </style>
                        <div class="nav nav-tabs" style="border: none;">
                            <div class="draggable-zone dropitem" style="width: 100%;"></div>
                            <p id="demo"></p>
                        </div>
                    </div>
                </div>
            </div>
            <!--end::Aside-->
            <div class="flex-row-fluid ml-lg-8 card-stretch" id="tab_personal_info">
                <div class="tab-content">
                    <div class="tab-pane active" id="cover_page" role="tabpanel" aria-labelledby="info-tab">
                        <div class="card card-custom draggable-zone cover_page p-5" data_page="main_page"></div>
                    </div>
                    <div class="tab-pane" id="bgimage" role="tabpanel" aria-labelledby="info-tab">
                        <form class="form drag_material_item" data_form="">
                            <div class="card card-custom card-stretch">
                                <div class="card-header py-3">
                                    <div class="card-title align-items-start flex-column">
                                        <h3 class="card-label font-weight-bolder text-dark">Image</h3>
                                        <span class="text-muted font-weight-bold font-size-sm mt-1">It will be default background instead of color</span>
                                    </div>
                                    <!-- <div class="card-toolbar">
                                        <button type="submit" class="btn btn-warning mr-2" id="submit_personal_info">Save Changes</button>
                                    </div>
 -->
                                </div>
                                <div class="card-body">
                                    <div class="form-group row">
                                        <label class="col-form-label col-lg-3 col-sm-12 text-lg-right">Upload Image</label>
                                        <div class="col-lg-8 col-md-9 col-sm-12">
                                            <div class="dropzone dropzone-default dropzone-success" id="kt_dropzone_3">
                                                <div class="dropzone-msg dz-message needsclick">
                                                    <h3 class="dropzone-msg-title">Drop files here or click to upload.</h3>
                                                    <span class="dropzone-msg-desc">Only jpg, png and image files are allowed for upload</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-form-label col-lg-3 col-sm-12 text-lg-right">Select font color </label>
                                        <div class="col-lg-8 col-md-9 col-sm-12">
                                            <input class="form-control form-control-lg form-control-solid font_set_color" id="bg_image_color" type="color" />
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <div class="row page_img">
                                        <div class="col-md-3 col-6 p-5">
                                            <img src="../images/packages/default.jpg" class="img-thumbnail tba_image" width="100%" alt="Cinque Terre" />
                                        </div>
                                        <div class="col-md-3 col-6 p-5">
                                            <img src="../images/packages/default.jpg" class="img-thumbnail tba_image" width="100%" alt="Cinque Terre" />
                                        </div>
                                        <div class="col-md-3 col-6 p-5">
                                            <img src="../images/packages/default.jpg" class="img-thumbnail tba_image" width="100%" alt="Cinque Terre" />
                                        </div>
                                        <div class="col-md-3 col-6 p-5">
                                            <img src="../images/packages/default.jpg" class="img-thumbnail tba_image" width="100%" alt="Cinque Terre" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="tab-pane" id="bgcolor" role="tabpanel" aria-labelledby="info-tab">
                        <div class="card card-custom h-xl-500px">
                            <div class="card-header py-3">
                                <div class="card-title align-items-start flex-column">
                                    <h3 class="card-label font-weight-bolder text-dark">Color Scheme</h3>
                                    <span class="text-muted font-weight-bold font-size-sm mt-1">It will be default color instead of Image</span>
                                </div>
                                <div class="card-toolbar">
                                    <button class="btn btn-info mr-2 save_scheme">Save Scheme</button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-4 col-12"></div>
                                    <div class="col-md-4 col-12 colorpreset img-thumbnail align-items-center" style="width: 100%; height: 200px;"></div>
                                </div>
                                <br />
                                <div class="form-group row">
                                    <label class="col-xl-3 col-lg-3 col-form-label">Select Background Color</label>
                                    <div class="col-lg-9 col-xl-6">
                                        <input class="form-control form-control-lg form-control-solid bg_set_color" type="color" />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-xl-3 col-lg-3 col-form-label">Select Font Color</label>
                                    <div class="col-lg-9 col-xl-6">
                                        <input class="form-control form-control-lg form-control-solid font_set_color" type="color" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane" id="bgrequisite" role="tabpanel" aria-labelledby="info-tab">
                        <form class="form" id="requisite_quiz_form">
                            <div class="card card-custom h-xl-600px">
                                <div class="card-header py-3">
                                    <div class="card-title align-items-start flex-column">
                                        <h3 class="card-label font-weight-bolder text-dark">Pre-Requsite</h3>
                                        <span class="text-muted font-weight-bold font-size-sm mt-1">Required before take the learning material</span>
                                    </div>
                                    <div class="card-toolbar">
                                        <button type="button" class="btn btn-info mr-2 save_setting">Save Setting</button>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="form-group row">
                                        <label class="col-lg-3 col-form-label text-lg-right">Learning Material</label>
                                        <div class="col-lg-7">
                                            <select type="text" class="form-control material_header_id_selector" placeholder="" name="material_id">
                                                <option>1</option>
                                            </select>
                                            <span class="form-text text-muted">Select learning material</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <div class="form-group row">
                                        <label class="col-lg-3 col-form-label text-lg-right">Quiz item:</label>
                                        <div class="col-lg-3">
                                            <input type="text" class="form-control" placeholder="" name="quiz_item" />
                                            <span class="form-text text-muted">Number of items</span>
                                        </div>
                                        <!-- <div class="col-lg-1 text-center p-3">
                                            Percentage
                                        </div>
                                        <div class="col-lg-3">
                                                <div class="input-icon input-icon-right">
                                                 <input type="text" class="form-control" placeholder="" name="p_minor">
                                                <span>%</span>
                                                </div>
                                                <span class="form-text text-muted"></span>
                                        </div> -->
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-3 col-form-label text-lg-right">Passing average:</label>
                                        <div class="col-lg-3">
                                            <div class="input-icon input-icon-right">
                                                <input type="text" class="form-control" placeholder="Enter number" name="passing_grade" />
                                                <span>%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-3 col-form-label text-lg-right">Computation:</label>
                                        <div class="col-lg-7">
                                            <span class="form-text text-muted">(Score minor/number of item)*100</span>
                                            <span class="form-text text-muted"> + </span>
                                            <span class="form-text text-muted">Total average student</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--end::Container-->
</div>
<!--end::Entry-->
<div id="TopupModal" class="modal modal-2">
    <span class="close close-2">&times;</span>
    <img class="modal-content modal-content-2" id="img01" />
    <div id="caption"></div>
</div>
<!-- Modal-->
<div class="modal fade" id="heading" data_id="" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header text-center">
                <h5 class="modal-title">Heading</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <i aria-hidden="true" class="ki ki-close"></i>
                </button>
            </div>
            <form id="heading_form">
                <div class="modal-body">
                    <div class="form-group">
                        <label>Content</label>
                        <input type="text" name="content" class="form-control form-control-lg" placeholder="Enter heading" />
                    </div>
                    <div class="form-group">
                        <label for="exampleSelectl">Size</label>
                        <select class="form-control form-control-lg" name="size">
                            <option value="h1">H1</option>
                            <option value="h2">H2</option>
                            <option value="h3">H3</option>
                            <option value="h4">H4</option>
                            <option value="h5">H5</option>
                            <option value="h6">H5</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="exampleSelectl">Text indent</label>
                        <select class="form-control form-control-lg" name="indent">
                            <option value="text-left">Left</option>
                            <option value="text-center">Center</option>
                            <option value="text-right">Right</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer text-center">
                    <button type="button" class="btn btn-light-danger font-weight-bold btn_remove_material" data_type="heading">Remove</button>
                    <button type="submit" class="btn btn-primary font-weight-bold">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>
<div class="modal fade" id="spacer" data_id="" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header text-center">
                <h5 class="modal-title">Spacer</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <i aria-hidden="true" class="ki ki-close"></i>
                </button>
            </div>
            <form id="spacer_form">
                <div class="modal-body">
                    <div class="form-group">
                        <label for="exampleSelectl">Size</label>
                        <select class="form-control form-control-lg" name="size">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer text-center">
                    <button type="button" class="btn btn-light-danger font-weight-bold btn_remove_material" data_type="spacer">Remove</button>
                    <button type="submit" class="btn btn-primary font-weight-bold">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>
<div class="modal fade" id="phrase" data_id="" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header text-center">
                <h5 class="modal-title" id="exampleModalLabel">Text and Images</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <i aria-hidden="true" class="ki ki-close"></i>
                </button>
            </div>
            <form id="phrase_form">
                <div class="modal-body">
                    <div class="form-group">
                        <textarea type="text" name="content" class="form-control form-control-lg summernote" style="height: 300px;" placeholder="Enter phrase"></textarea>
                    </div>
                </div>
                <div class="modal-footer text-center">
                    <button type="button" class="btn btn-light-danger font-weight-bold btn_remove_material" data_type="phrase">Remove</button>
                    <button type="submit" class="btn btn-primary font-weight-bold">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>
<div class="modal fade" id="image" data_id="" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header text-center">
                <h5 class="modal-title">Images</h5>

                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <i aria-hidden="true" class="ki ki-close"></i>
                </button>
            </div>
            <form id="image_form">
                <div class="modal-body" data-height="400">
                    <div class="row img_selection"></div>
                    <div class="form-group">
                        <input type="text" name="content" class="form-control form-control-lg" placeholder="Select image maximum of 4" />
                    </div>
                </div>
                <div class="modal-footer text-center">
                    <button type="button" class="btn btn-light-danger font-weight-bold btn_remove_material" data_type="image">Remove</button>
                    <button type="submit" class="btn btn-primary font-weight-bold">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>
<div class="modal fade" id="video" data_id="" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header text-center">
                <h5 class="modal-title">Video link</h5>

                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <i aria-hidden="true" class="ki ki-close"></i>
                </button>
            </div>
            <form id="video_form">
                <div class="modal-body">
                    <div class="form-group">
                        <label>Link</label>
                        <input type="text" name="content" class="form-control form-control-lg" placeholder="Enter a valid link" />
                    </div>
                </div>
                <div class="modal-footer text-center">
                    <button type="button" class="btn btn-light-danger font-weight-bold btn_remove_material" data_type="video">Remove</button>
                    <button type="submit" class="btn btn-primary font-weight-bold">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>
<div class="modal fade" id="identify" data_id="" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header text-center">
                <h5 class="modal-title">Identification</h5>

                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <i aria-hidden="true" class="ki ki-close"></i>
                </button>
            </div>
            <form id="identify_form">
                <div class="modal-body">
                    <div class="form-group">
                        <label>Question</label>
                        <input type="text" name="content" class="form-control form-control-lg" placeholder="Enter a question" />
                    </div>
                    <div class="form-group">
                        <label>Answer</label>
                        <input type="text" name="ans" class="form-control form-control-lg" placeholder="Enter a correct answer" />
                    </div>
                </div>
                <div class="modal-footer text-center">
                    <button type="button" class="btn btn-light-danger font-weight-bold btn_remove_material" data_type="identify">Remove</button>
                    <button type="submit" class="btn btn-primary font-weight-bold">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>
<div class="modal fade" id="tof" data_id="" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header text-center">
                <h5 class="modal-title">True or False</h5>

                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <i aria-hidden="true" class="ki ki-close"></i>
                </button>
            </div>
            <form id="tof_form">
                <div class="modal-body">
                    <div class="form-group">
                        <label>Question</label>
                        <input type="text" name="content" class="form-control form-control-lg" placeholder="Enter a question" />
                    </div>
                    <div class="form-group">
                        <label>Answer</label>
                        <select type="text" name="ans" class="form-control form-control-lg">
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer text-center">
                    <button type="button" class="btn btn-light-danger font-weight-bold btn_remove_material" data_type="tof">Remove</button>
                    <button type="submit" class="btn btn-primary font-weight-bold">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>
<div class="modal fade" id="mc" data_id="" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header text-center">
                <h5 class="modal-title">Multiple Choices</h5>

                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <i aria-hidden="true" class="ki ki-close"></i>
                </button>
            </div>
            <form id="mc_form">
                <div class="modal-body">
                    <div class="form-group">
                        <label>Question</label>
                        <input type="text" name="content" class="form-control form-control-lg" placeholder="Enter a question" />
                    </div>
                    <div class="form-group row">
                        <label class="col-1 col-form-label">A.)</label>
                        <div class="col-11">
                            <input type="text" name="qa" class="form-control form-control-lg" placeholder="Enter a Answer" />
                        </div>
                        <label class="col-1 col-form-label">B.)</label>
                        <div class="col-11">
                            <input type="text" name="qb" class="form-control form-control-lg" placeholder="Enter b Answer" />
                        </div>
                        <label class="col-1 col-form-label">C.)</label>
                        <div class="col-11">
                            <input type="text" name="qc" class="form-control form-control-lg" placeholder="Enter c Answer" />
                        </div>
                        <label class="col-1 col-form-label">D.)</label>
                        <div class="col-11">
                            <input type="text" name="qd" class="form-control form-control-lg" placeholder="Enter d Answer" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Select Answer</label>
                        <select type="text" name="ans" class="form-control form-control-lg">
                            <option></option>
                            <option value="a">a</option>
                            <option value="b">b</option>
                            <option value="c">c</option>
                            <option value="d">d</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer text-center">
                    <button type="button" class="btn btn-light-danger font-weight-bold btn_remove_material" data_type="mc">Remove</button>
                    <button type="submit" class="btn btn-primary font-weight-bold">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>
<div class="modal fade" id="audio" data_id="" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header text-center">
                <h5 class="modal-title" id="exampleModalLabel">Audio</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <i aria-hidden="true" class="ki ki-close"></i>
                </button>
            </div>
            <form id="audio_form">
                <div class="modal-body">
                    <div class="form-group">
                        <textarea type="text" name="content" class="form-control form-control-lg audio_text" style="height: 300px;" placeholder="Enter audio to speech"></textarea>
                    </div>
                </div>
                <div class="modal-footer text-center">
                    <button type="button" class="btn btn-light-danger font-weight-bold btn_remove_material" data_type="audio">Remove</button>
                    <button type="submit" class="btn btn-primary font-weight-bold">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal fade" id="topic_quiz_question_modal" style="z-index: 10000;;width:100%;" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header text-center">
                <h5 id="question_title" class="modal-title">Question Title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <i aria-hidden="true" class="ki ki-close"></i>
                </button>
            </div>

            <form id="topic_quiz_form">
                <div class="modal-body">
                    <div class="form-group">
                         <label>Question Type</label>
                         <select id="quiz_type" type="text" name="quiz_type" class="form-control form-control-lg" >
                            <option></option>
                            <option value="tof">True or False</option>
                            <option value="idnf">Identification</option>
                            <option value="mc">Multiple Choice</option>
                            <!-- <option value="mci">Multiple Choice Image</option> -->
                         </select>
                    </div>

                    <div class="form-group">
                         <label>Question</label>
                         <input id="question" type="text" name="question" class="form-control form-control-lg"  placeholder="Enter a question">
                    </div>
                    
                    <div class="tof" style="display:none">
                        <div class="form-group">
                            <label>Answer</label>
                            <select id="tof-ans" type="text" name="ans" class="form-control form-control-lg" >
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                    </div>

                    <div class="idnf form-group" style="display:none">
                         <label>Answer</label>
                         <input id="idnf-ans" type="text" name="ans" placeholder="Enter answer" class="form-control form-control-lg" >
                    </div>                    
                    
                    <div class="mc" style="display:none">
                        <div class="form-group row">
                            <label class="col-1 col-form-label">a.)</label>
                            <div class="col-11">
                                <input id="qa" type="text" name="qa" class="form-control form-control-lg"  placeholder="Enter a Answer">
                            </div>
                            <label class="col-1 col-form-label">b.)</label>
                            <div class="col-11">
                                <input id="qb" type="text" name="qb" class="form-control form-control-lg"  placeholder="Enter b Answer">
                            </div>
                            <label class="col-1 col-form-label">c.)</label>
                            <div class="col-11">
                                <input id="qc" type="text" name="qc" class="form-control form-control-lg"  placeholder="Enter c Answer">
                            </div>
                            <label class="col-1 col-form-label">d.)</label>
                            <div class="col-11">
                                <input id="qd" type="text" name="qd" class="form-control form-control-lg"  placeholder="Enter d Answer">
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Select Answer</label>
                            <select id="mc-ans" type="text" name="ans" class="form-control form-control-lg" >
                                <option></option>
                                <option value="a">a</option>
                                <option value="b">b</option>
                                <option value="c">c</option>
                                <option value="d">d</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- <div class="mci" style="display:none">
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
                    </div> -->
                </div>

                <div class="modal-footer text-center">
                    <button type='button' id="save-topic-btn" class="btn btn-primary font-weight-bold">Add</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal fade" id="topic_quiz_modal" style="z-index: 9999;" data-keyboard="false" data-backdrop="static" data_id="" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl"  role="document">
        <div class="modal-content">
            <div class="modal-header text-center">
                <h5 id="topic_title" class="modal-title" id="exampleModalLabel">Topic Title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <i aria-hidden="true" class="ki ki-close"></i>
                </button>
            </div>

            <div class="card-header card-header-tabs-line">
                <div class="row">
                    <div class="form-group col-12 col-md-3 col-lg-3">
                        <label>Question item</label>
                        <input id="quiz_item" type="text" class="form-control" placeholder="" name="quiz_item" />
                        <span class="form-text text-muted">Number of items</span>
                    </div>
                    
                    <div class="form-group col-12 col-md-3 col-lg-3">
                            <label>Passing average</label>
                        <div class="input-icon input-icon-right">
                            <input id="passing_grade" type="text" class="form-control" placeholder="Enter number" name="passing_grade" />
                            <span>%</span>
                        </div>
                    </div>
                </div>

                <div class="card-toolbar">
                    <ul class="nav nav-tabs nav-tabs-space-lg nav-tabs-line nav-tabs-bold nav-tabs-line-3x" style="border:none !important;" role="tablist">
                        <li class="nav-item mr-3" name="tbl_kyc_request">
                            <a id="add_topic_question_btn" class="btn btn-info btn-sm " ><i class="flaticon-plus"></i>Add New</a>
                        </li>

                        <li class="nav-item mr-3">
                            <a id="quiz_publish_btn" style="display:none; background-color:seagreen" class="btn text-white btn-sm font-weight-bold"><i class="fa fa-check text-white"></i>Publish</a>
                            <a id="quiz_unpublish_btn" style="display:none" class="btn btn-success btn-sm font-weight-bold" ><i class="fa fas fa-arrow-up"></i>Unpublish</a>
                        </li>

                        <li class="nav-item mr-3">
                            <a id="update_topic_setting" class="btn btn-warning btn-sm " ><i class="fa fa-cog"></i>Update Setting</a>
                        </li>                        
                    </ul>           
                </div>
            </div>

            <form>                
                <a href="javascript:;" download="ID.png" class="non-printable btn btn-light-danger font-weight-bold d-none"></a>
                <div class="tab-pane active" role="tabpanel">
                    <div class="card-body">
                        <table class="table table-head-custom table-head-bg table-vertical-center table-bordered table-hover table-responsive" id="tbl_topic_quiz">
                            <thead>
                                <tr>
                                    <th>TYPE</th>
                                    <th>QUESTION</th>
                                    <th>CHOICES</th>
                                    <th>ANSWER</th>
                                    <th>DATE CREATED</th>
                                    <th>ACTION</th>                                   
                                    <!-- <th>LEARNING MATERIAL</th> -->
                                    <!-- <th>PAGE</th>
                                    <th>TYPE</th>
                                    <th>QUESTION</th>
                                    <th>CHOICES</th>
                                    <th>ANSWER</th>
                                    <th>DATE CREATED</th>
                                    <th>ACTION</th> -->
                                </tr>
                            </thead> 
                            <!-- <tbody>
                            </tbody> -->
                        </table>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<input id="module_id" type="hidden" />
<input id="topic_id" type="hidden" />
<input id="module_name" type="hidden" />
<!-- <script src="assets/js/pages/custom/profile/profile.js"></script> -->
<!-- <script src="assets/js/pages/crud/forms/widgets/clipboard.js"></script> -->
