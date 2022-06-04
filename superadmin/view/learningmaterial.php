<div class="subheader py-2 py-lg-4  subheader-solid " id="kt_subheader">
    <div class=" container-fluid  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <div class="d-flex align-items-center flex-wrap mr-2">
            <h5 class="text-dark font-weight-bold mt-2 mb-2 mr-5">Search</h5>
            <!-- <div class="subheader-separator subheader-separator-ver mt-2 mb-2 mr-4 bg-gray-200"></div> -->
            <div class="row"><div class="dataTables_filter"><label><input type="search" class="form-control form-control-sm search_material mt-2" placeholder="Search here" aria-controls="tbl_report"></label></div></div>
        </div>
        <div class="d-flex align-items-center flex-wrap">
            <a class="btn btn-info btn-sm " data-toggle="modal" data-target="#learningmaterial" ><i class="flaticon-plus"></i>Add New</a>         
        </div>
    </div>
</div>


<div class="d-flex flex-column-fluid">
    <div class="container-fluid">

        <div class="row learningmaterial_not_publish">
            <div class="col-xl-2" style="height:300px;">
                <div class="card card-custom bg-primary card-stretch gutter-b">
                    <div class="card-body">
                        <span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block text-hover-warning" id="total-adminprofile">Start</span>
                        <span class="font-weight-bold text-white font-size-sm">Click add new button</span><hr>
                        <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                            <button type="button" class="btn btn-success font-weight-bold" data-toggle="modal" data-target="#learningmaterial"><i class="fa fa-plus"></i> Add new</button>
                            <!-- <button type="button" class="btn btn-info font-weight-bold"><i class="fa fa-edit"></i> Edit</button> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
       <div class="row learningmaterial_published">
            
        </div>
       <!--  <hr> -->
    </div>
</div>
<div class="modal fade" id="learningmaterial" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Learning Material</h5>
                <button type="button" class="close close_modal" data-dismiss="modal" aria-label="Close">
                    <i aria-hidden="true" class="ki ki-close"></i>
                </button>
            </div>
            <form id="learningmaterial_form">
            <div class="modal-body">
                <div class="form-group">
                    <label>Module <span class="text-danger">*</span></label>
                    <select type="text" class="form-control" name="module"  placeholder="Enter Title">
                        <option value="1">Chemistry 1</option>
                        <option value="2">Chemistry 2</option>
                    </select>
                    <span class="form-text text-muted"></span>
                </div>

                <div class="form-group">
                    <label>Title Name <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" name="title_name"  placeholder="Enter Title"/>
                    <span class="form-text text-muted"></span>
                </div>

                <div class="form-group">
                    <label>Number <span class="text-danger">*</span></label>
                    <input type="number" class="form-control" name="number"  placeholder="Enter Number"/>
                    <span class="form-text text-muted"></span>
                </div>
            </div>
            <div class="modal-footer">
                <!-- <button type="button" class="btn btn-light-primary font-weight-bold" data-dismiss="modal">Close</button> -->
                <input type="submit" class="btn btn-primary font-weight-bold" value="Save">
            </div>
             </form>
        </div>
    </div>
</div>