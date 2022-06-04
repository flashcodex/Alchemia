// Class definition

var KTFormControls = function () {
	// Private functions
    var _showToast = function(type,message) {
        const Toast = Swal.mixin({toast: true,position: 'top-end',showConfirmButton: false,timer: 3000,timerProgressBar: true,onOpen: (toast) => {toast.addEventListener('mouseenter', Swal.stopTimer),toast.addEventListener('mouseleave', Swal.resumeTimer)}});Toast.fire({icon: type,title: message});
    }

 
var _initDemo2 = function () {
     var validation;
     var form = KTUtil.getById('contact_info_form');
       validation = FormValidation.formValidation(
      form,
      {
        fields: {
           mobile: {
                        validators: {
                            notEmpty: {
                                message: 'Mobile number is  required'
                            },
                            digits: {
                                message: 'Mobile number can contain digits only'
                            },
                            stringLength: {
                                min: 6,
                                max: 10,
                                message: 'The mobile number must have at least 6 to 10 digits'
                            }
                        }
                    },
                    city: {
                        validators: {
                            regexp: {
                                regexp: /^[a-zA-ZÀ-ž-.\s]+$/,
                                message: 'The city can only consist of alphabetical characters'
                            },
                            stringLength: {
                                max: 20,
                                message: 'You have reached your maximum limit of characters allowed'
                            }
                        }
                    },
        },

        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
                    icon: new FormValidation.plugins.Icon({
                    valid: 'fa fa-check',
                    invalid: 'fa fa-times',
                    validating: 'fa fa-refresh'
                }),
        }
      }
    );
       $('#contact_info_form').on('submit', function (e) {
            e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let formData = new FormData(element);
                        formData.append("action", btoa("save_user_profile"));
                        formData.append("type", "save_contact_info");
                            $.ajax({
                                    url: "controller/controller.php",
                                    type: "POST",
                                    data: formData,
                                    contentType: false,
                                    processData: false,
                                    dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage('Saving...');
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
                                        if(response.status=="success"){
                                            res=JSON.parse(window.atob(response.payload));
                                            if (res!=false){
                                                const Toast = Swal.mixin({toast: true,position: 'top-end',showConfirmButton: false,timer: 3000,timerProgressBar: true,onOpen: (toast) => {toast.addEventListener('mouseenter', Swal.stopTimer),toast.addEventListener('mouseleave', Swal.resumeTimer)}});Toast.fire({icon: 'success',title: 'Save changes'});
                                            }else{
                                                const Toast = Swal.mixin({toast: true,position: 'top-end',showConfirmButton: false,timer: 3000,timerProgressBar: true,onOpen: (toast) => {toast.addEventListener('mouseenter', Swal.stopTimer),toast.addEventListener('mouseleave', Swal.resumeTimer)}});Toast.fire({icon: 'info',title: "Nothing changes"});
                                            }
                                        }else if(response.status == "failed"){
                                            Swal.fire("Oopps!", response.message, "info");
                                        }else if(response.status == "error"){
                                           Swal.fire("Oopps!", response.message, "info");
                                        }else if(response.status == "info"){
                                           Swal.fire("Warning!", response.message, "info");
                                        }else{
                                           Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                           console.log(JSON.parse(window.atob(response.payload)));
                                        }
                                      },
                                      error: function(xhr,status,error){
                                          console.log(xhr);
                                          console.log(status);
                                          console.log(error);
                                          console.log(xhr.responseText);
                                          Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                      } 
                                })
                      
                } else {
                 }
            });
        });
    }
var _initDemo3 = function () {
     var validation;
     var form = KTUtil.getById('change_pass_form');
       validation = FormValidation.formValidation(
      form,
      {
        fields: {
          c_password: {
                        validators: {
                            notEmpty: {
                                message: 'The password is required'
                            }
                        }
                    },
                    n_password: {
                        validators: {
                            stringLength: {
                                min: 8,
                                message: 'The password must have at least 8 characters'
                            },
                            notEmpty: {
                                message: 'The password is required'
                            }
                        }
                    },
                    
                    v_password: {
                        validators: {
                            notEmpty: {
                                message: 'The password confirmation is required'
                            },
                            identical: {
                                compare: function() {
                                    return form.querySelector('[name="n_password"]').value;
                                },
                                message: 'The password and its confirm are not the same'
                            }
                        }
                    }
        },

        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
                    icon: new FormValidation.plugins.Icon({
                    valid: 'fa fa-check',
                    invalid: 'fa fa-times',
                    validating: 'fa fa-refresh'
                }),
        }
      }
    );
    $('#change_pass_form').on('submit', function (e) {
            e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let formData = new FormData(element);
                        formData.append("action", btoa("save_user_profile"));
                        formData.append("type", "save_change_pass");
                      
                        $.ajax({
                              url: "controller/controller.php",
                                type: "POST",
                                data: formData,
                                contentType: false,
                                processData: false,
                                dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage('Saving...');
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
                                    if(response.status=="success"){
                                      res=JSON.parse(window.atob(response.payload));
                                      if (res==true){
                                        const Toast = Swal.mixin({toast: true,position: 'top-end',showConfirmButton: false,timer: 3000,timerProgressBar: true,onOpen: (toast) => {toast.addEventListener('mouseenter', Swal.stopTimer),toast.addEventListener('mouseleave', Swal.resumeTimer)}});Toast.fire({icon: 'success',title: 'Save changes'});
                                        element.reset();
                                      }else if(res=='incorrect_pass'){
                                        const Toast = Swal.mixin({toast: true,position: 'top-end',showConfirmButton: false,timer: 3000,timerProgressBar: true,onOpen: (toast) => {toast.addEventListener('mouseenter', Swal.stopTimer),toast.addEventListener('mouseleave', Swal.resumeTimer)}});Toast.fire({icon: 'error',title: "Incorrect Password"});
                                      }else{
                                        const Toast = Swal.mixin({toast: true,position: 'top-end',showConfirmButton: false,timer: 3000,timerProgressBar: true,onOpen: (toast) => {toast.addEventListener('mouseenter', Swal.stopTimer),toast.addEventListener('mouseleave', Swal.resumeTimer)}});Toast.fire({icon: 'info',title: "Nothing changes"});
                                      }
                                    }else if(response.status == "failed"){
                                        Swal.fire("Oopps!", response.message, "info");
                                    }else if(response.status == "error"){
                                       Swal.fire("Oopps!", response.message, "info");
                                    }else{
                                       Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                       console.log(JSON.parse(window.atob(response.payload)));
                                    }
                                  },
                                  error: function(xhr,status,error){
                                      console.log(xhr);
                                      console.log(status);
                                      console.log(error);
                                      console.log(xhr.responseText);
                                      Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                  } 
                                })
                      
                } else {
                 }
            });
        });

  $('#f_password').on('click', function (e) {
           e.preventDefault();
          swal.fire({
          text: "We get it, stuff happens. Just click the confirmation button below and we'll send a link to your email to reset your password!",
          icon: "info",
          buttonsStyling: false,
          showCancelButton: true,
          cancelButtonText: "Cancel",
          confirmButtonText: "Confirm",
          customClass: {
                  confirmButton: "btn font-weight-bold btn-light-primary",
                  cancelButton: "btn font-weight-bold btn-light-primary"
              }
          }).then(function(result) {
            // alert(result.value);
        if(result.value == true){
              let formData = new FormData();
                        formData.append("action", btoa("forgot-pass"));
                        formData.append("email", "forgot_pass_in");
                             $.ajax({
                                    url:  "../login/login-controller/controller.php",
                                    type: "POST",
                                    data: formData,
                                    contentType: false,
                                    processData: false,
                                    dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage('Processing...');
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
                                       // alert(JSON.stringify(response));
                                       if(response.status=="success"){
                                      res=JSON.parse(window.atob(response.payload));
                                      if (res==true){
                                         swal.fire({
                                                text: "Request successful! Please check your email to reset your password.",
                                                icon: "success",
                                                buttonsStyling: false,
                                                confirmButtonText: "Ok, got it!",
                                                customClass: {
                                                confirmButton: "btn font-weight-bold btn-light-primary"
                                                }
                                                }).then(function() {
                                                    KTUtil.scrollTop();
                                                });
                                      }else{
                                        swal.fire({
                                                text: res,
                                                icon: "info",
                                                buttonsStyling: false,
                                                confirmButtonText: "Ok, got it!",
                                                customClass: {
                                                confirmButton: "btn font-weight-bold btn-light-primary"
                                                }
                                                }).then(function() {
                                                    KTUtil.scrollTop();
                                                });
                                      }
                                    }else if(response.status == "failed"){
                                        Swal.fire("Oopps!", response.message, "info");
                                    }else if(response.status == "error"){
                                       Swal.fire("Oopps!", response.message, "info");
                                    }else{
                                       Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                       console.log(JSON.parse(window.atob(response.payload)));
                                    }
                                  },
                                error: function(xhr,status,error){
                                      console.log(xhr);
                                      console.log(status);
                                      console.log(error);
                                      console.log(xhr.responseText);
                                      Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                } 
                                })
                         }
                         else{
                         swal.close();
                  }
              })
                      
            
        });
  }

var _initDemo_personal_info = function () {
     var validation;
     var form = KTUtil.getById('personal_info_form');
       validation = FormValidation.formValidation(
      form,
      {
        fields: {
           fname: {
                        validators: {
                            notEmpty: {
                                message: 'First name is required'
                            },
                            regexp: {
                                regexp: /^[a-zA-ZÀ-ž-.\s]+$/,
                                message: 'The first name can only consist of alphabetical characters'
                            },
                            stringLength: {
                                max: 20,
                                message: 'You have reached your maximum limit of characters allowed'
                            },
                            
                        }
                    },
                    lname: {
                        validators: {
                            notEmpty: {
                                message: 'Last name is required'
                            },
                            regexp: {
                                regexp: /^[a-zA-ZÀ-ž-.\s]+$/,
                                message: 'The last name can only consist of alphabetical characters'
                            },
                            stringLength: {
                                max: 20,
                                message: 'You have reached your maximum limit of characters allowed'
                            }
                        }
                    },
                    mname: {
                        validators: {
                            regexp: {
                                regexp: /^[a-zA-ZÀ-ž-.\s]+$/,
                                message: 'The middle name can only consist of alphabetical characters'
                            },
                            stringLength: {
                                max: 20,
                                message: 'You have reached your maximum limit of characters allowed'
                            }
                        }
                    }
                },

        plugins: { //Learn more: https://formvalidation.io/guide/plugins
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
                    icon: new FormValidation.plugins.Icon({
                    valid: 'fa fa-check',
                    invalid: 'fa fa-times',
                    validating: 'fa fa-refresh'
                }),
        }
      }
    );
$('#personal_info_form').on('submit', function (e) {
             e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let formData = new FormData(element);
                        formData.append("action", btoa("save_user_profile"));
                        formData.append("type", "save_personal_info");
                        // /console.log(formData);
                        $.ajax({
                              url: "controller/controller.php",
                                type: "POST",
                                data: formData,
                                contentType: false,
                                processData: false,
                                dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage('Saving...');
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
                                     if(response.status=="success"){
                                        res=JSON.parse(window.atob(response.payload));
                                        if (res!=false){
                                          const Toast = Swal.mixin({toast: true,position: 'top-end',showConfirmButton: false,timer: 3000,timerProgressBar: true,onOpen: (toast) => {toast.addEventListener('mouseenter', Swal.stopTimer),toast.addEventListener('mouseleave', Swal.resumeTimer)}});Toast.fire({icon: 'success',title: 'Save changes'});
                                          $('.full_name').text($('input[name="fname"]').val()+" "+$('input[name="lname"]').val());
                                          $('.f_name').text($('input[name="fname"]').val());
                                        }else{
                                          const Toast = Swal.mixin({toast: true,position: 'top-end',showConfirmButton: false,timer: 3000,timerProgressBar: true,onOpen: (toast) => {toast.addEventListener('mouseenter', Swal.stopTimer),toast.addEventListener('mouseleave', Swal.resumeTimer)}});Toast.fire({icon: 'info',title: "Nothing changes"});
                                        }
                                      }else if(response.status == "failed"){
                                          Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "error"){
                                         Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "info"){
                                         Swal.fire("Warning", response.message, "info");
                                      }else{
                                         Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                         console.log(JSON.parse(window.atob(response.payload)));
                                      }
                                  },
                                  error: function(xhr,status,error){
                                      console.log(xhr);
                                      console.log(status);
                                      console.log(error);
                                      console.log(xhr.responseText);
                                      Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                  } 
                                })
                      
                } else {
                 }
            });
        });
  }


var _initDemo_admin_profile_save = function () {
     var validation;
     var form = KTUtil.getById('admin_profile_save');
       validation = FormValidation.formValidation(
      form,
      {
        fields: {
                    fname: {
                        validators: {
                            notEmpty: {
                                message: 'First name is required'
                            },
                            regexp: {
                                regexp: /^[a-zA-ZÀ-ž-.\s]+$/,
                                message: 'The first name can only consist of alphabetical characters'
                            },
                            stringLength: {
                                max: 20,
                                message: 'You have reached your maximum limit of characters allowed'
                            },
                            
                        }
                    },
                    lname: {
                        validators: {
                            notEmpty: {
                                message: 'Last name is required'
                            },
                            regexp: {
                                regexp: /^[a-zA-ZÀ-ž-.\s]+$/,
                                message: 'The last name can only consist of alphabetical characters'
                            },
                            stringLength: {
                                max: 20,
                                message: 'You have reached your maximum limit of characters allowed'
                            }
                        }
                    },
                    mname: {
                        validators: {
                            regexp: {
                                regexp: /^[a-zA-ZÀ-ž-.\s]+$/,
                                message: 'The middle name can only consist of alphabetical characters'
                            },
                            stringLength: {
                                max: 20,
                                message: 'You have reached your maximum limit of characters allowed'
                            }
                        }
                    },
                    email: {
                        validators: {
                             notEmpty: {
                              message: 'Email is required'
                             },
                             emailAddress: {
                              message: 'The value is not a valid email address'
                             }
                        }
                    },
                    phone: {
                        validators: {
                             notEmpty: {
                              message: 'Digits is required'
                             },
                             digits: {
                              message: 'The value is not a valid digits'
                             }
                        }
                    },
                    // profile_avatar: {
                    //     validators: {
                    //          notEmpty: {
                    //           message: 'Profile is required'
                    //          }
                    //     }
                    // },
                    username: {
                        validators: {
                             notEmpty: {
                              message: 'Username is required'
                             }
                        }
                    },
                },

        plugins: { //Learn more: https://formvalidation.io/guide/plugins
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
                    icon: new FormValidation.plugins.Icon({
                    valid: '',
                    invalid: '',
                    validating: ''
                }),
        }
      }
    );
    $("body").delegate('.close_modal','click',function(e){
                  e.stopImmediatePropagation(); 
                  let element=$(this);
                    $('.profile_avatar').attr('src','');
                     $('#admin_profile_save')[0].reset();
                     $('#admin_profile_save input[name="profile_status"]').prop("selected", false);
                     $('#admin_profile_save').attr('data-id','');
                     $('#adminmodal').modal('hide');
                     $('input[name="data_id"]').val('');
                     validation.resetForm();
                })
$('#admin_profile_save').on('submit', function (e) {
            e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let formData = new FormData(element);
                        formData.append("action", btoa("save_admin_profile"));
                        formData.append("type", "save_admin_info");
                        formData.append("status", ($('input[name="profile_status"]').is(':checked'))? 1:0);
                        formData.append("id", $('#admin_profile_save').attr('data-id'));
                        // /console.log(formData);
                       
                        $.ajax({
                              url: "controller/controller.php",
                                type: "POST",
                                data: formData,
                                contentType: false,
                                processData: false,
                                dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage('Saving...');
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
                                     if(response.status=="success"){
                                        res=JSON.parse(window.atob(response.payload));
                                        //alert(res.result);
                                        if(res.result==false){
                                            Swal.fire("Warning", res.message, "warning");
                                        }else{
                                             Swal.fire("Success", res.message, "success");
                                             $('.profile_avatar').attr('src','');
                                             $('#admin_profile_save')[0].reset();
                                             $('#admin_profile_save input[name="profile_status"]').prop("selected", false);
                                             $('#admin_profile_save').attr('data-id','');
                                             $('#adminmodal').modal('hide');
                                             $('input[name="data_id"]').val('');
                                             validation.resetForm();
                                        }


                                      }else if(response.status == "failed"){
                                          Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "error"){
                                         Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "info"){
                                         Swal.fire("Warning", response.message, "info");
                                      }else{
                                         Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                         console.log(JSON.parse(window.atob(response.payload)));
                                      }
                                  },
                                  error: function(xhr,status,error){
                                      console.log(xhr);
                                      console.log(status);
                                      console.log(error);
                                      console.log(xhr.responseText);
                                      Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                  } 
                                })
                      
                } else {
                 }
            });
        });
  }

  var _initDemo_learningmaterial_form = function () {
     var validation;
     var form = KTUtil.getById('learningmaterial_form');
       validation = FormValidation.formValidation(
      form,
      {
        fields: {
           title_name: {
                        validators: {
                            notEmpty: {
                                message: 'Title name is required'
                            },
                        }
                    },
             module: {
                        validators: {
                            notEmpty: {
                                message: 'Module name is required'
                            },
                        }
                    },
                },

        plugins: { //Learn more: https://formvalidation.io/guide/plugins
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
                    icon: new FormValidation.plugins.Icon({
                    valid: '',
                    invalid: '',
                    validating: ''
                }),
        }
      }
    );
$('#learningmaterial_form').on('submit', function (e) {
             e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let formData = new FormData(element);
                        formData.append("action", btoa("learning_material_form"));
                        // /console.log(formData);
                        $.ajax({
                              url: "controller/controller.php",
                                type: "POST",
                                data: formData,
                                contentType: false,
                                processData: false,
                                dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage('Saving...');
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
                                     if(response.status=="success"){
                                         res=JSON.parse(window.atob(response.payload));
                                         if(res.result==false){
                                            Swal.fire("Warning", res.message, "warning");
                                         }else{
                                            Swal.fire("Success", res.message, "success");
                                            $('#learningmaterial').modal('hide');
                                            $('#learningmaterial_form')[0].reset();
                                            validation.resetForm();
                                         }
                                      }else if(response.status == "failed"){
                                          Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "error"){
                                         Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "info"){
                                         Swal.fire("Warning", response.message, "info");
                                      }else{
                                         Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                         console.log(JSON.parse(window.atob(response.payload)));
                                      }
                                  },
                                  error: function(xhr,status,error){
                                      console.log(xhr);
                                      console.log(status);
                                      console.log(error);
                                      console.log(xhr.responseText);
                                      Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                  } 
                                })
                      
                } else {
                 }
            });
        });
  }

var _initheading_form = function () {
     var validation;
     var form = KTUtil.getById('heading_form');
       validation = FormValidation.formValidation(
      form,
      {
        fields: {
           content: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
                },

        plugins: { //Learn more: https://formvalidation.io/guide/plugins
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
                    icon: new FormValidation.plugins.Icon({
                    valid: '',
                    invalid: '',
                    validating: ''
                }),
        }
      }
    );
$('#heading_form').on('submit', function (e) {
             e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let formData = new FormData(element);
                        formData.append("action", btoa("update_material"));
                        formData.append("type", "heading");
                        formData.append("data_id", $('#heading').attr('data_id'));

                        // /console.log(formData);
                        $.ajax({
                              url: "controller/controller.php",
                                type: "POST",
                                data: formData,
                                contentType: false,
                                processData: false,
                                dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage('Saving...');
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
                                     if(response.status=="success"){
                                         res=JSON.parse(window.atob(response.payload));
                                         if(res.result==false){
                                            Swal.fire("Warning", res.message, "warning");
                                         }else{
                                            Swal.fire("Success", res.message, "success");
                                            $('#heading').modal('hide');
                                            $('#heading_form')[0].reset();
                                            validation.resetForm();
                                         }
                                      }else if(response.status == "failed"){
                                          Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "error"){
                                         Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "info"){
                                         Swal.fire("Warning", response.message, "info");
                                      }else{
                                         Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                         console.log(JSON.parse(window.atob(response.payload)));
                                      }
                                  },
                                  error: function(xhr,status,error){
                                      console.log(xhr);
                                      console.log(status);
                                      console.log(error);
                                      console.log(xhr.responseText);
                                      Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                  } 
                                })
                      
                } else {
                 }
            });
        });
  }
var _initspacer_form = function () {
     var validation;
     var form = KTUtil.getById('spacer_form');
       validation = FormValidation.formValidation(
      form,
      {
        fields: {
           size: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
                },

        plugins: { //Learn more: https://formvalidation.io/guide/plugins
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
                    icon: new FormValidation.plugins.Icon({
                    valid: '',
                    invalid: '',
                    validating: ''
                }),
        }
      }
    );
$('#spacer_form').on('submit', function (e) {
             e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let formData = new FormData(element);
                        formData.append("action", btoa("update_material"));
                        formData.append("type", "spacer");
                        formData.append("data_id", $('#spacer').attr('data_id'));

                        // /console.log(formData);
                        $.ajax({
                              url: "controller/controller.php",
                                type: "POST",
                                data: formData,
                                contentType: false,
                                processData: false,
                                dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage('Saving...');
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
                                     if(response.status=="success"){
                                         res=JSON.parse(window.atob(response.payload));
                                         if(res.result==false){
                                            Swal.fire("Warning", res.message, "warning");
                                         }else{
                                            Swal.fire("Success", res.message, "success");
                                            $('#spacer').modal('hide');
                                            $('#spacer_form')[0].reset();
                                            validation.resetForm();
                                         }
                                      }else if(response.status == "failed"){
                                          Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "error"){
                                         Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "info"){
                                         Swal.fire("Warning", response.message, "info");
                                      }else{
                                         Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                         console.log(JSON.parse(window.atob(response.payload)));
                                      }
                                  },
                                  error: function(xhr,status,error){
                                      console.log(xhr);
                                      console.log(status);
                                      console.log(error);
                                      console.log(xhr.responseText);
                                      Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                  } 
                                })
                      
                } else {
                 }
            });
        });
  }
var _initphrase_form = function () {
     var validation;
     var form = KTUtil.getById('phrase_form');
       validation = FormValidation.formValidation(
      form,
      {
        fields: {
           content: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
                },

        plugins: { //Learn more: https://formvalidation.io/guide/plugins
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
                    icon: new FormValidation.plugins.Icon({
                    valid: '',
                    invalid: '',
                    validating: ''
                }),
        }
      }
    );
$('#phrase_form').on('submit', function (e) {
             e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let formData = new FormData(element);
                        formData.append("action", btoa("update_material"));
                        formData.append("type", "phrase");
                        formData.append("data_id", $('#phrase').attr('data_id'));
                        formData.append("code", $('.summernote').summernote('code'));

                        // /console.log(formData);
                        $.ajax({
                              url: "controller/controller.php",
                                type: "POST",
                                data: formData,
                                contentType: false,
                                processData: false,
                                dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage('Saving...');
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
                                     if(response.status=="success"){
                                         res=JSON.parse(window.atob(response.payload));
                                         if(res.result==false){
                                            Swal.fire("Warning", res.message, "warning");
                                         }else{
                                            Swal.fire("Success", res.message, "success");
                                            $('#phrase').modal('hide');
                                            $('#phrase_form')[0].reset();
                                            $('.summernote').summernote('code','');
                                            validation.resetForm();
                                         }
                                      }else if(response.status == "failed"){
                                          Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "error"){
                                         Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "info"){
                                         Swal.fire("Warning", response.message, "info");
                                      }else{
                                         Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                         console.log(JSON.parse(window.atob(response.payload)));
                                      }
                                  },
                                  error: function(xhr,status,error){
                                      console.log(xhr);
                                      console.log(status);
                                      console.log(error);
                                      console.log(xhr.responseText);
                                      Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                  } 
                                })
                      
                } else {
                 }
            });
        });
  }
  var _initaudio_form = function () {
     var validation;
     var form = KTUtil.getById('audio_form');
       validation = FormValidation.formValidation(
      form,
      {
        fields: {
           content: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
                },

        plugins: { //Learn more: https://formvalidation.io/guide/plugins
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
                    icon: new FormValidation.plugins.Icon({
                    valid: '',
                    invalid: '',
                    validating: ''
                }),
        }
      }
    );
$('#audio_form').on('submit', function (e) {
             e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let formData = new FormData(element);
                        formData.append("action", btoa("update_material"));
                        formData.append("type", "audio");
                        formData.append("data_id", $('#audio').attr('data_id'));
                        formData.append("code", $('.audio_text').val());

                        // /console.log(formData);
                        $.ajax({
                              url: "controller/controller.php",
                                type: "POST",
                                data: formData,
                                contentType: false,
                                processData: false,
                                dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage('Saving...');
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
                                     if(response.status=="success"){
                                         res=JSON.parse(window.atob(response.payload));
                                         if(res.result==false){
                                            Swal.fire("Warning", res.message, "warning");
                                         }else{
                                            Swal.fire("Success", res.message, "success");
                                            $('#audio').modal('hide');
                                            $('#audio_form')[0].reset();
                                            $('.audio_text').val('');
                                            validation.resetForm();
                                         }
                                      }else if(response.status == "failed"){
                                          Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "error"){
                                         Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "info"){
                                         Swal.fire("Warning", response.message, "info");
                                      }else{
                                         Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                         console.log(JSON.parse(window.atob(response.payload)));
                                      }
                                  },
                                  error: function(xhr,status,error){
                                      console.log(xhr);
                                      console.log(status);
                                      console.log(error);
                                      console.log(xhr.responseText);
                                      Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                  } 
                                })
                      
                } else {
                 }
            });
        });
  }
  var _initimage_form = function () {
     var validation;
     var form = KTUtil.getById('image_form');
       validation = FormValidation.formValidation(
      form,
      {
        fields: {
           content: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
                },

        plugins: { //Learn more: https://formvalidation.io/guide/plugins
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
                    icon: new FormValidation.plugins.Icon({
                    valid: '',
                    invalid: '',
                    validating: ''
                }),
        }
      }
    );
$('#image_form').on('submit', function (e) {
             e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let formData = new FormData(element);
                        formData.append("action", btoa("update_material"));
                        formData.append("type", "image");
                        formData.append("data_id", $('#image').attr('data_id'));

                        // /console.log(formData);
                        $.ajax({
                              url: "controller/controller.php",
                                type: "POST",
                                data: formData,
                                contentType: false,
                                processData: false,
                                dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage('Saving...');
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
                                     if(response.status=="success"){
                                         res=JSON.parse(window.atob(response.payload));
                                         if(res.result==false){
                                            Swal.fire("Warning", res.message, "warning");
                                         }else{
                                            Swal.fire("Success", res.message, "success");
                                            $('#image').modal('hide');
                                            $('#image_form')[0].reset();
                                            validation.resetForm();
                                         }
                                      }else if(response.status == "failed"){
                                          Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "error"){
                                         Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "info"){
                                         Swal.fire("Warning", response.message, "info");
                                      }else{
                                         Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                         console.log(JSON.parse(window.atob(response.payload)));
                                      }
                                  },
                                  error: function(xhr,status,error){
                                      console.log(xhr);
                                      console.log(status);
                                      console.log(error);
                                      console.log(xhr.responseText);
                                      Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                  } 
                                })
                      
                } else {
                 }
            });
        });
  }
  var _initvideo_form = function () {
     var validation;
     var form = KTUtil.getById('video_form');
       validation = FormValidation.formValidation(
      form,
      {
        fields: {
           content: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
                },

        plugins: { //Learn more: https://formvalidation.io/guide/plugins
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
                    icon: new FormValidation.plugins.Icon({
                    valid: '',
                    invalid: '',
                    validating: ''
                }),
        }
      }
    );
$('#video_form').on('submit', function (e) {
             e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let formData = new FormData(element);
                        formData.append("action", btoa("update_material"));
                        formData.append("type", "video");
                        formData.append("data_id", $('#video').attr('data_id'));

                        // /console.log(formData);
                        $.ajax({
                              url: "controller/controller.php",
                                type: "POST",
                                data: formData,
                                contentType: false,
                                processData: false,
                                dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage('Saving...');
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
                                     if(response.status=="success"){
                                         res=JSON.parse(window.atob(response.payload));
                                         if(res.result==false){
                                            Swal.fire("Warning", res.message, "warning");
                                         }else{
                                            Swal.fire("Success", res.message, "success");
                                            $('#video').modal('hide');
                                            $('#video_form')[0].reset();
                                            validation.resetForm();
                                         }
                                      }else if(response.status == "failed"){
                                          Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "error"){
                                         Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "info"){
                                         Swal.fire("Warning", response.message, "info");
                                      }else{
                                         Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                         console.log(JSON.parse(window.atob(response.payload)));
                                      }
                                  },
                                  error: function(xhr,status,error){
                                      console.log(xhr);
                                      console.log(status);
                                      console.log(error);
                                      console.log(xhr.responseText);
                                      Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                  } 
                                })
                      
                } else {
                 }
            });
        });
  }
  var _initidentify_form = function () {
     var validation;
     var form = KTUtil.getById('identify_form');
       validation = FormValidation.formValidation(
      form,
      {
        fields: {
            content: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
            ans: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
                },


        plugins: { //Learn more: https://formvalidation.io/guide/plugins
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
                    icon: new FormValidation.plugins.Icon({
                    valid: '',
                    invalid: '',
                    validating: ''
                }),
        }
      }
    );
$('#identify_form').on('submit', function (e) {
             e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let formData = new FormData(element);
                        formData.append("action", btoa("update_material"));
                        formData.append("type", "identify");
                        formData.append("data_id", $('#identify').attr('data_id'));

                        // /console.log(formData);
                        $.ajax({
                              url: "controller/controller.php",
                                type: "POST",
                                data: formData,
                                contentType: false,
                                processData: false,
                                dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage('Saving...');
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
                                     if(response.status=="success"){
                                         res=JSON.parse(window.atob(response.payload));
                                         if(res.result==false){
                                            Swal.fire("Warning", res.message, "warning");
                                         }else{
                                            Swal.fire("Success", res.message, "success");
                                            $('#identify').modal('hide');
                                            $('#identify_form')[0].reset();
                                            validation.resetForm();
                                         }
                                      }else if(response.status == "failed"){
                                          Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "error"){
                                         Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "info"){
                                         Swal.fire("Warning", response.message, "info");
                                      }else{
                                         Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                         console.log(JSON.parse(window.atob(response.payload)));
                                      }
                                  },
                                  error: function(xhr,status,error){
                                      console.log(xhr);
                                      console.log(status);
                                      console.log(error);
                                      console.log(xhr.responseText);
                                      Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                  } 
                                })
                      
                } else {
                 }
            });
        });
  }
  var _inittof_form = function () {
     var validation;
     var form = KTUtil.getById('tof_form');
       validation = FormValidation.formValidation(
      form,
      {
        fields: {
            content: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
            ans: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
                },


        plugins: { //Learn more: https://formvalidation.io/guide/plugins
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
                    icon: new FormValidation.plugins.Icon({
                    valid: '',
                    invalid: '',
                    validating: ''
                }),
        }
      }
    );
$('#tof_form').on('submit', function (e) {
             e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let formData = new FormData(element);
                        formData.append("action", btoa("update_material"));
                        formData.append("type", "tof");
                        formData.append("data_id", $('#tof').attr('data_id'));

                        // /console.log(formData);
                        $.ajax({
                              url: "controller/controller.php",
                                type: "POST",
                                data: formData,
                                contentType: false,
                                processData: false,
                                dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage('Saving...');
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
                                     if(response.status=="success"){
                                         res=JSON.parse(window.atob(response.payload));
                                         if(res.result==false){
                                            Swal.fire("Warning", res.message, "warning");
                                         }else{
                                            Swal.fire("Success", res.message, "success");
                                            $('#tof').modal('hide');
                                            $('#tof_form')[0].reset();
                                            validation.resetForm();
                                         }
                                      }else if(response.status == "failed"){
                                          Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "error"){
                                         Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "info"){
                                         Swal.fire("Warning", response.message, "info");
                                      }else{
                                         Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                         console.log(JSON.parse(window.atob(response.payload)));
                                      }
                                  },
                                  error: function(xhr,status,error){
                                      console.log(xhr);
                                      console.log(status);
                                      console.log(error);
                                      console.log(xhr.responseText);
                                      Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                  } 
                                })
                      
                } else {
                 }
            });
        });
  }
  var _initmc_form = function () {
     var validation;
     var form = KTUtil.getById('mc_form');
       validation = FormValidation.formValidation(
      form,
      {
        fields: {
            content: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
            qa: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
            qb: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
            qc: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
            qd: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
            ans: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
                },


        plugins: { //Learn more: https://formvalidation.io/guide/plugins
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
                    icon: new FormValidation.plugins.Icon({
                    valid: '',
                    invalid: '',
                    validating: ''
                }),
        }
      }
    );
$('#mc_form').on('submit', function (e) {
             e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let formData = new FormData(element);
                        formData.append("action", btoa("update_material"));
                        formData.append("type", "mc");
                        formData.append("data_id", $('#mc').attr('data_id'));
                        formData.append("size", $('#mc_form input[name="qa"]').val()+','+$('#mc_form input[name="qb"]').val()+','+$('#mc_form input[name="qc"]').val()+','+$('#mc_form input[name="qd"]').val());

                        // /console.log(formData);
                        $.ajax({
                              url: "controller/controller.php",
                                type: "POST",
                                data: formData,
                                contentType: false,
                                processData: false,
                                dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage('Saving...');
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
                                     if(response.status=="success"){
                                         res=JSON.parse(window.atob(response.payload));
                                         if(res.result==false){
                                            Swal.fire("Warning", res.message, "warning");
                                         }else{
                                            Swal.fire("Success", res.message, "success");
                                            $('#mc').modal('hide');
                                            $('#mc_form')[0].reset();
                                            validation.resetForm();
                                         }
                                      }else if(response.status == "failed"){
                                          Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "error"){
                                         Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "info"){
                                         Swal.fire("Warning", response.message, "info");
                                      }else{
                                         Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                         console.log(JSON.parse(window.atob(response.payload)));
                                      }
                                  },
                                  error: function(xhr,status,error){
                                      console.log(xhr);
                                      console.log(status);
                                      console.log(error);
                                      console.log(xhr.responseText);
                                      Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                  } 
                                })
                      
                } else {
                 }
            });
        });
  }
  var _initquiz_form = function () {
     var validation;
     var form = KTUtil.getById('quiz_form');
       validation = FormValidation.formValidation(
      form,
      {
        fields: {
            material_id: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
            material_page: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },        
            quiz_type: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
                },


        plugins: { //Learn more: https://formvalidation.io/guide/plugins
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
                    icon: new FormValidation.plugins.Icon({
                    valid: '',
                    invalid: '',
                    validating: ''
                }),
        }
      }
    );
$('#quiz_form').on('submit', function (e) {
             e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let formData = new FormData(element);
                        formData.append("action", btoa("add_quiz"));
                        formData.append("type", "add_type");
                        // /console.log(formData);
                        $.ajax({
                              url: "controller/controller.php",
                                type: "POST",
                                data: formData,
                                contentType: false,
                                processData: false,
                                dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage('Saving...');
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
                                     if(response.status=="success"){
                                         res=JSON.parse(window.atob(response.payload));
                                         if(res.result==false){
                                            Swal.fire("Warning", res.message, "warning");
                                         }else{
                                            Swal.fire("Success", res.message, "success");
                                            $('#quiz').modal('hide');
                                            $('#quiz_form')[0].reset();
                                            validation.resetForm();
                                         }
                                      }else if(response.status == "failed"){
                                          Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "error"){
                                         Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "info"){
                                         Swal.fire("Warning", response.message, "info");
                                      }else{
                                         Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                         console.log(JSON.parse(window.atob(response.payload)));
                                      }
                                  },
                                  error: function(xhr,status,error){
                                      console.log(xhr);
                                      console.log(status);
                                      console.log(error);
                                      console.log(xhr.responseText);
                                      Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                  } 
                                })
                      
                } else {
                 }
            });
        });
  }
  var _inittof_quiz_update = function () {
     var validation;
     var form = KTUtil.getById('tof_quiz_update');
       validation = FormValidation.formValidation(
      form,
      {
        fields: {
            question: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
            ans: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
            material_page: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
            class_type: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
                },


        plugins: { //Learn more: https://formvalidation.io/guide/plugins
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
                    icon: new FormValidation.plugins.Icon({
                    valid: '',
                    invalid: '',
                    validating: ''
                }),
        }
      }
    );
$('#tof_quiz_update').on('submit', function (e) {
             e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let formData = new FormData(element);
                        formData.append("action", btoa("update_quiz"));
                        formData.append("type", "tof");
                        formData.append("data_id", $("#tof").attr('data_id'));
                        // /console.log(formData);
                        $.ajax({
                              url: "controller/controller.php",
                                type: "POST",
                                data: formData,
                                contentType: false,
                                processData: false,
                                dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage('Saving...');
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
                                     if(response.status=="success"){
                                         res=JSON.parse(window.atob(response.payload));
                                         if(res.result==false){
                                            Swal.fire("Warning", res.message, "warning");
                                         }else{
                                            Swal.fire("Success", res.message, "success");
                                            $('#tof').modal('hide');
                                            $('#tof_quiz_update')[0].reset();
                                            validation.resetForm();
                                         }
                                      }else if(response.status == "failed"){
                                          Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "error"){
                                         Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "info"){
                                         Swal.fire("Warning", response.message, "info");
                                      }else{
                                         Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                         console.log(JSON.parse(window.atob(response.payload)));
                                      }
                                  },
                                  error: function(xhr,status,error){
                                      console.log(xhr);
                                      console.log(status);
                                      console.log(error);
                                      console.log(xhr.responseText);
                                      Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                  } 
                                })
                      
                } else {
                 }
            });
        });
  }
  var _initidnf_quiz_update = function () {
     var validation;
     var form = KTUtil.getById('idnf_quiz_update');
       validation = FormValidation.formValidation(
      form,
      {
        fields: {
            question: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
            ans: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
            material_page: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
            class_type: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
                },


        plugins: { //Learn more: https://formvalidation.io/guide/plugins
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
                    icon: new FormValidation.plugins.Icon({
                    valid: '',
                    invalid: '',
                    validating: ''
                }),
        }
      }
    );
$('#idnf_quiz_update').on('submit', function (e) {
             e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let formData = new FormData(element);
                        formData.append("action", btoa("update_quiz"));
                        formData.append("type", "idnf");
                        formData.append("data_id", $("#idnf").attr('data_id'));
                        // /console.log(formData);
                        $.ajax({
                              url: "controller/controller.php",
                                type: "POST",
                                data: formData,
                                contentType: false,
                                processData: false,
                                dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage('Saving...');
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
                                     if(response.status=="success"){
                                         res=JSON.parse(window.atob(response.payload));
                                         if(res.result==false){
                                            Swal.fire("Warning", res.message, "warning");
                                         }else{
                                            Swal.fire("Success", res.message, "success");
                                            $('#idnf').modal('hide');
                                            $('#idnf_quiz_update')[0].reset();
                                            validation.resetForm();
                                         }
                                      }else if(response.status == "failed"){
                                          Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "error"){
                                         Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "info"){
                                         Swal.fire("Warning", response.message, "info");
                                      }else{
                                         Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                         console.log(JSON.parse(window.atob(response.payload)));
                                      }
                                  },
                                  error: function(xhr,status,error){
                                      console.log(xhr);
                                      console.log(status);
                                      console.log(error);
                                      console.log(xhr.responseText);
                                      Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                  } 
                                })
                      
                } else {
                 }
            });
        });
  }
  var _initmc_quiz_update = function () {
     var validation;
     var form = KTUtil.getById('mc_quiz_update');
       validation = FormValidation.formValidation(
      form,
      {
        fields: {
            question: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
            qa: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
            qb: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
            qc: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
            qd: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
            material_page: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
            ans: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
                },


        plugins: { //Learn more: https://formvalidation.io/guide/plugins
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
                    icon: new FormValidation.plugins.Icon({
                    valid: '',
                    invalid: '',
                    validating: ''
                }),
        }
      }
    );
$('#mc_quiz_update').on('submit', function (e) {
             e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let formData = new FormData(element);
                        formData.append("action", btoa("update_quiz"));
                        formData.append("type", "mc");
                        formData.append("data_id", $('#mc').attr('data_id'));
                        formData.append("choices", $('#mc_quiz_update input[name="qa"]').val()+','+$('#mc_quiz_update input[name="qb"]').val()+','+$('#mc_quiz_update input[name="qc"]').val()+','+$('#mc_quiz_update input[name="qd"]').val());

                        // /console.log(formData);
                        $.ajax({
                              url: "controller/controller.php",
                                type: "POST",
                                data: formData,
                                contentType: false,
                                processData: false,
                                dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage('Saving...');
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
                                     if(response.status=="success"){
                                         res=JSON.parse(window.atob(response.payload));
                                         if(res.result==false){
                                            Swal.fire("Warning", res.message, "warning");
                                         }else{
                                            Swal.fire("Success", res.message, "success");
                                            $('#mc').modal('hide');
                                            $('#mc_quiz_update')[0].reset();
                                            validation.resetForm();
                                         }
                                      }else if(response.status == "failed"){
                                          Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "error"){
                                         Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "info"){
                                         Swal.fire("Warning", response.message, "info");
                                      }else{
                                         Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                         console.log(JSON.parse(window.atob(response.payload)));
                                      }
                                  },
                                  error: function(xhr,status,error){
                                      console.log(xhr);
                                      console.log(status);
                                      console.log(error);
                                      console.log(xhr.responseText);
                                      Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                  } 
                                })
                      
                } else {
                 }
            });
        });
  }
var _initmci_quiz_update = function () {
     var validation;
     var form = KTUtil.getById('mci_quiz_update');
       validation = FormValidation.formValidation(
      form,
      {
        fields: {
            question: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
            qa: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
            qb: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
            qc: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
            qd: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
            material_page: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
            ans: {
                        validators: {
                            notEmpty: {
                                message: 'This is required'
                            },
                        }
                    },
                },


        plugins: { //Learn more: https://formvalidation.io/guide/plugins
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
                    icon: new FormValidation.plugins.Icon({
                    valid: '',
                    invalid: '',
                    validating: ''
                }),
        }
      }
    );
$('#mci_quiz_update').on('submit', function (e) {
             e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let formData = new FormData(element);
                        formData.append("action", btoa("update_quiz"));
                        formData.append("type", "mci");
                        formData.append("data_id", $('#mci').attr('data_id'));
                        formData.append("choices", $('#mci_quiz_update input[name="qa"]').val()+','+$('#mci_quiz_update input[name="qb"]').val()+','+$('#mci_quiz_update input[name="qc"]').val()+','+$('#mci_quiz_update input[name="qd"]').val());

                        // /console.log(formData);
                        $.ajax({
                              url: "controller/controller.php",
                                type: "POST",
                                data: formData,
                                contentType: false,
                                processData: false,
                                dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage('Saving...');
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
                                     if(response.status=="success"){
                                         res=JSON.parse(window.atob(response.payload));
                                         if(res.result==false){
                                            Swal.fire("Warning", res.message, "warning");
                                         }else{
                                            Swal.fire("Success", res.message, "success");
                                            $('#mci').modal('hide');
                                            $('#mci_quiz_update')[0].reset();
                                            validation.resetForm();
                                         }
                                      }else if(response.status == "failed"){
                                          Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "error"){
                                         Swal.fire("Oopps!", response.message, "info");
                                      }else if(response.status == "info"){
                                         Swal.fire("Warning", response.message, "info");
                                      }else{
                                         Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                         console.log(JSON.parse(window.atob(response.payload)));
                                      }
                                  },
                                  error: function(xhr,status,error){
                                      console.log(xhr);
                                      console.log(status);
                                      console.log(error);
                                      console.log(xhr.responseText);
                                      Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
                                  } 
                                })
                      
                } else {
                 }
            });
        });
  }
var bday = function () {
    $("input[name='bday']").inputmask("99/99/9999", {
        "placeholder": "mm/dd/yyyy",
        // autoUnmask: true
    });
}
	return {
		// public functions
		init: function(frm) {
              if(document.getElementById('personal_info_form') !== null){
                        _initDemo_personal_info();
                        _initDemo2();
                        _initDemo3();
              }
              if(document.getElementById('admin_profile_save') !== null){
                        _initDemo_admin_profile_save();
              }

              if(document.getElementById('learningmaterial_form') !== null){
                        _initDemo_learningmaterial_form();
              }

              if(document.getElementById('heading_form') !== null){
                        _initheading_form();
              }
              if(document.getElementById('spacer_form') !== null){
                        _initspacer_form();
              }
              if(document.getElementById('phrase_form') !== null){
                        _initphrase_form();
              }
              if(document.getElementById('audio_form') !== null){
                        _initaudio_form();
              }
              if(document.getElementById('image_form') !== null){
                        _initimage_form();
              }if(document.getElementById('video_form') !== null){
                        _initvideo_form();
              }
              if(document.getElementById('identify_form') !== null){
                        _initidentify_form();
              }
              if(document.getElementById('tof_form') !== null){
                        _inittof_form();
              }
              if(document.getElementById('mc_form') !== null){
                        _initmc_form();
              }
              if(document.getElementById('quiz_form') !== null){
                        _initquiz_form();
              }
              if(document.getElementById('tof_quiz_update') !== null){
                        _inittof_quiz_update();
              }
              // if(document.getElementById('idnf_quiz_update') !== null){
              //           _initidnf_quiz_update();
              // }
              if(document.getElementById('idnf_quiz_update') !== null){
                        _initidnf_quiz_update();
              }
              if(document.getElementById('mc_quiz_update') !== null){
                        _initmc_quiz_update();
              }
              if(document.getElementById('mci_quiz_update') !== null){
                        _initmci_quiz_update();
              }

		}
	};
}();

// jQuery(document).ready(function() {
// 	KTFormControls.init();
// });
