// Class definition
var KTFormControls = function () {
	// Private functions
    var _showToast = function(type,message) {
        const Toast = Swal.mixin({toast: true,position: 'top-end',showConfirmButton: false,timer: 3000,timerProgressBar: true,onOpen: (toast) => {toast.addEventListener('mouseenter', Swal.stopTimer),toast.addEventListener('mouseleave', Swal.resumeTimer)}});Toast.fire({icon: type,title: message});
    }
    var _showSwal  = function(type,message) {
        swal.fire({
          text: message,
          icon: type,
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn font-weight-bold btn-light-primary"
          }
          })
    }
	var _initDemo1 = function () {
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
                //     icon: new FormValidation.plugins.Icon({
                //     valid: 'fa fa-check',
                //     invalid: 'fa fa-times',
                //     validating: 'fa fa-refresh'
                // }),
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
		                    $.ajax({
		                       		url: "controller/controller.php",
		                            type: "POST",
		                            data: formData,
		                            contentType: false,
		                            processData: false,
		                            dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage();
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
		                              	if(response.status=="success"){
		                              		let res=JSON.parse(window.atob(response.payload));
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
var _initDemo2 = function () {
		 var validation;
		 var form = KTUtil.getById('contact_info_form');
       validation = FormValidation.formValidation(
			form,
			{
				fields: {
					 // mobile: {
      //                   validators: {
      //                       notEmpty: {
      //                           message: 'Mobile number is  required'
      //                       },
      //                       digits: {
      //                           message: 'Mobile number can contain digits only'
      //                       },
      //                       stringLength: {
      //                           min: 10,
      //                           max: 10,
      //                           message: 'Mobile number is not valid'
      //                       }
      //                   }
      //               },
                    // email: {
                    //     validators: {
                    //         notEmpty: {
                    //             message: 'Email address is required'
                    //         },
                    //         emailAddress: {
                    //             message: 'The value is not a valid email address'
                    //         }
                    //     }
                    // },
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
                //     icon: new FormValidation.plugins.Icon({
                //     valid: 'fa fa-check',
                //     invalid: 'fa fa-times',
                //     validating: 'fa fa-refresh'
                // }),
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
                        formData.append("new_mobile", $('input[name="mobile"]').val());
                            $.ajax({
                                    url: "controller/controller.php",
                                    type: "POST",
                                    data: formData,
                                    contentType: false,
                                    processData: false,
                                    dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage();
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



    var _initDemo4 = function () {
         var validation;
         var form = KTUtil.getById('account_info_form');
       validation = FormValidation.formValidation(
            form,
            {
                fields: {
                     bday: {
                        validators: {
                            notEmpty: {
                                message: 'Birthday is  required'
                            },
                        }
                    },
                },

                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap(),
                //     icon: new FormValidation.plugins.Icon({
                //     valid: 'fa fa-check',
                //     invalid: 'fa fa-times',
                //     validating: 'fa fa-refresh'
                // }),
                }
            }
        );
 $('#account_info_form').on('submit', function (e) {
            e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                   	let formData = new FormData(element);
                        formData.append("action", btoa("save_user_profile"));
                        formData.append("type", "save_account_info");
		                    $.ajax({
		                       		url: "controller/controller.php",
		                            type: "POST",
		                            data: formData,
		                            contentType: false,
		                            processData: false,
		                            dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage();
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

    const strongPassword = function () {
            return {
                validate: function (input) {
                    const value = input.value;
                    if (value === '') {
                        return {
                            valid: true,
                        };
                    }

                    // Check the password strength
                    if (value.length < 8) {
                        return {
                            valid: false,
                            message: 'The password must be more than 8 characters long',
                        };
                    }

                    // The password does not contain any uppercase character
                    if (value === value.toLowerCase()) {
                        return {
                            valid: false,
                            message: 'The password must contain at least one upper case character',
                        };
                    }

                    // The password does not contain any uppercase character
                    if (value === value.toUpperCase()) {
                        return {
                            valid: false,
                            message: 'The password must contain at least one lower case character',
                        };
                    }

                    // The password does not contain any digit
                    if (value.search(/[0-9]/) < 0) {
                        return {
                            valid: false,
                            message: 'The password must contain at least one digit',
                        };
                    }

                    return {
                        valid: true,
                    };
                },
            };
        };



	var _initDemo3 = function () {
		 var validation;
		 var form = KTUtil.getById('change_pass_form');
         FormValidation.validators.checkPassword = strongPassword;
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
                            notEmpty: {
                                message: 'The password is required'
                            },
                            checkPassword: {
                                
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
                //     icon: new FormValidation.plugins.Icon({
                //     valid: 'fa fa-check',
                //     invalid: 'fa fa-times',
                //     validating: 'fa fa-refresh'
                // }),
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
                                      KTApp.blockPage();
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
                                      KTApp.blockPage();
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

var _initDemo5 = function () {
         var validation;
         var form = KTUtil.getById('bank_info_form');
       validation = FormValidation.formValidation(
            form,
            {
                fields: {
                    mop: {
                        validators: {
                            notEmpty: {
                                message: 'MOP is required'
                            },
                        }
                    },
                    acc_name: {
                        validators: {
                            notEmpty: {
                                message: 'Account name is required'
                            },
                            regexp: {
                                regexp: /^[a-zA-ZÀ-ž-.\s]+$/,
                                message: 'The account name can only consist of alphabetical characters'
                            },
                            stringLength: {
                                max: 45,
                                message: 'You have reached your maximum limit of characters allowed'
                            },
                            
                        }
                    },
                    acc_number: {
                        validators: {
                            notEmpty: {
                                message: 'Account number is required'
                            },
                            digits: {
                                message: 'Account number can contain digits only',
                            },
                            stringLength: {
                                min: 4,
                                max: 17,
                                message: 'The value is not a valid account number'
                            },
                        }
                    },
                     bank_mobile: {
                        validators: {
                            notEmpty: {
                                message: 'Mobile number is  required'
                            },
                            digits: {
                                message: 'Mobile number can contain digits only',
                            },
                            stringLength: {
                                min: 11,
                                max: 11,
                                message: 'The value is not a valid mobile number'
                            },
                        }
                    },
                },

                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap(),
                //     icon: new FormValidation.plugins.Icon({
                //     valid: 'fa fa-check',
                //     invalid: 'fa fa-times',
                //     validating: 'fa fa-refresh'
                // }),
                }
            }
        );
 $('#bank_info_form').on('submit', function (e) {
            e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let formData = new FormData(element);
                        formData.append("action", btoa("save_user_profile"));
                        formData.append("type", "save_bank_info");
                            $.ajax({
                                    url: "controller/controller.php",
                                    type: "POST",
                                    data: formData,
                                    contentType: false,
                                    processData: false,
                                    dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage();
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
var _initDemo_addr = function () {
         var validation;
         var form = KTUtil.getById('shipping_address_form');
       validation = FormValidation.formValidation(
            form,
            {
                fields: {
                    addr_name: {
                        validators: {
                            notEmpty: {
                                message: 'Full name is required'
                            },
                            regexp: {
                                regexp: /^[a-zA-ZÀ-ž-.\s]+$/,
                                message: 'The full name can only consist of alphabetical characters'
                            },
                            stringLength: {
                                max: 45,
                                message: 'You have reached your maximum limit of characters allowed'
                            },
                            
                        }
                    },
                    addr_email: {
                        validators: {
                            // notEmpty: {
                            //     message: 'Email address is required'
                            // },
                            emailAddress: {
                                message: 'The value is not a valid email address'
                            }
                        }
                    },
                     addr_mobile: {
                        validators: {
                            notEmpty: {
                                message: 'Mobile number is  required'
                            },
                            digits: {
                                message: 'Mobile number can contain digits only',
                            },
                            stringLength: {
                                min: 11,
                                max: 11,
                                message: 'The value is not a valid mobile number'
                            },
                        }
                    },
                    addr_street: {
                        validators: {
                            notEmpty: {
                                message: 'Street is required'
                            },
                            stringLength: {
                                max: 100,
                                message: 'You have reached your maximum limit of characters allowed'
                            },
                        }
                    },
                    addr_region: {
                        validators: {
                            notEmpty: {
                                message: 'Region is required'
                            },
                        }
                    },
                    addr_type: {
                        validators: {
                            notEmpty: {
                                message: 'Label is required'
                            },
                        }
                    },
                    addr_province: {
                        validators: {
                            notEmpty: {
                                message: 'Province is required'
                            },
                        }
                    },
                    addr_city: {
                        validators: {
                            notEmpty: {
                                message: 'City is required'
                            },
                        }
                    },
                    addr_barangay: {
                        validators: {
                            notEmpty: {
                                message: 'Barangay is required'
                            },
                        }
                    },
                    postal: {
                        validators: {
                            notEmpty: {
                                message: 'Postal code is required'
                            },
                            digits: {
                                message: 'Postal code can contain digits only',
                            },
                            stringLength: {
                                min: 4,
                                max: 4,
                                message: 'The value is not a valid postal code'
                            },
                        }
                    },
                },

                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap(),
                }
            }
        );
 $('#shipping_address_form').on('submit', function (e) {
            e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let formData = new FormData(element);
                        formData.append("action", btoa("submit_shipping_address"));
                        formData.append("type", address);
                        if(shipping_addr!=""){
                            formData.append("id", shipping_addr);
                        }
                            $.ajax({
                                    url: "controller/controller.php",
                                    type: "POST",
                                    data: formData,
                                    contentType: false,
                                    processData: false,
                                    dataType:"json",
                                    beforeSend: function(){
                                      // KTApp.blockPage();
                                    },
                                    complete: function(){
                                      // KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
                                        if(response.status=="success"){
                                            res=JSON.parse(window.atob(response.payload));
                                            if (res==true){
                                                if(address=='new_address' || address=='new_customer_address'){
                                                // swal.fire({
                                                //     text: "You have successfully added new address.",
                                                //     icon: "success",
                                                //     buttonsStyling: false,
                                                //     confirmButtonText: "Ok, got it!",
                                                //     customClass: {
                                                //     confirmButton: "btn font-weight-bold btn-light-primary"
                                                //     }
                                                //     }).then(function() {
                                                //         KTUtil.scrollTop();
                                                //     });
                                                    _showToast('success','New shipping address added');
                                                    element.reset();
                                                    $('#add_address').modal('hide');
                                                }else{
                                                    const Toast = Swal.mixin({toast: true,position: 'top-end',showConfirmButton: false,timer: 3000,timerProgressBar: true,onOpen: (toast) => {toast.addEventListener('mouseenter', Swal.stopTimer),toast.addEventListener('mouseleave', Swal.resumeTimer)}});Toast.fire({icon: 'success',title: 'Save Changes'});
                                                    $(".dis").prop("disabled", true);
                                                    $('#edit-addr').show();
                                                    $('#submit-addr').hide();
                                                }
                                                if(address=='new_customer_address'  || address=='update_customer_address'){
                                                    APPHANDLER.callFunction('reload_customers_list');
                                                    // _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Customers...'), _constructForm(['user_customers', 'customers_list']));
                                                    
                                                    // _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Package...'), _constructForm(['user_package', 'addr_package']));
                                                }else{
                                                    APPHANDLER.callFunction('reload_address');
                                                    // _ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Profile...'), _constructForm(['user_address', 'address']));
                                                }
                                            }else{
                                                const Toast = Swal.mixin({toast: true,position: 'top-end',showConfirmButton: false,timer: 3000,timerProgressBar: true,onOpen: (toast) => {toast.addEventListener('mouseenter', Swal.stopTimer),toast.addEventListener('mouseleave', Swal.resumeTimer)}});Toast.fire({icon: 'info',title: res});
                                                $(".dis").prop("disabled", true);
                                                $('#edit-addr').show();
                                                $('#submit-addr').hide();
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

    }
var _initDemo_topup = function () {
         var validation;
         var form = KTUtil.getById('topup_form');
       	validation = FormValidation.formValidation(
            form,
            {
                fields: {
                     topup_mop: {
                        validators: {
                            notEmpty: {
                                message: 'MOP is required'
                            },
                        }
                    },
                     topup_number: {
                        validators: {
                            notEmpty: {
                                message: 'Transaction number is required'
                            },
                            digits: {
                                message: 'Transaction number can contain digits only'
                            },
                            stringLength: {
                                max: 20,
                                message: 'You have reached your maximum limit of digits allowed'
                            }
                        }
                    },
                     topup_amount: {
                        validators: {
                            notEmpty: {
                                message: 'Amount is required'
                            },
                            digits: {
                                message: 'Amount can contain digits only'
                            },
                         //    greaterThan: {
	                        //     message: 'The value must be greater than or equal to PHP 1,000',
	                        //     min: 1000,
	                        // }
                        }
                    },
                },

                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap(),
                //     icon: new FormValidation.plugins.Icon({
                //     valid: 'fa fa-check',
                //     invalid: 'fa fa-times',
                //     validating: 'fa fa-refresh'
                // }),
                }
            }
        );
 $('#topup_form').on('submit', function (e) {
            e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
					let item = $('.uppy-Dashboard-Item').length;
					if(item>0 && item <4){
                   	let formData = new FormData(element);
                        formData.append("action", btoa("submit_topup"));
                        formData.append("type", "submit_topup");
		                    $.ajax({
		                       		url: "controller/controller.php",
		                            type: "POST",
		                            data: formData,
		                            contentType: false,
		                            processData: false,
		                            dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage();
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
		                              	if(response.status=="success"){
		                              		res=JSON.parse(window.atob(response.payload));
		                              		if(res=="has_pending"){
		                              			Swal.fire({
												text: "Sorry, you have a pending top-up. You cannot request any transactions right now.",
												icon: "info",
												showCancelButton: false,
		                                        confirmButtonText: "Ok, Got it",
		                                            reverseButtons: true
		                                        }).then(function(result) {
		                                        	element.reset();
		                                        	$('.uppy-Dashboard-Item-action--remove').trigger('click');
		                                        	 $('#encashment-status').empty().append('\
							                             <div class="error error-5  bgi-size-contain bgi-position-x-right bgi-no-repeat bgimg" style="background-image: url(assets/media/svg/humans/custom-12.svg);">\
							                              <div class="container d-flex flex-row-fluid flex-column justify-content-md-center py-5 px-12">\
							                                <p class="font-weight-boldest font-size-h3">Your have a pending top-up.</p>\
							                                <p class="font-size-h3">We&apos;re doing our best to process your request as soon possible.</br>You can check back later.</p>\
							                              </div>\
							                            </div>').removeClass('bg-light-success bg-light-danger').addClass('bg-light-dark').show();
		                                        	KTUtil.scrollTop();
		                                       	});
		                              		}else if(res=="minimum"){
                                                Swal.fire({
                                                text: "Sorry, your amount didn't reach the minimum amount of top-up.",
                                                icon: "info",
                                                showCancelButton: false,
                                                confirmButtonText: "Ok, Got it",
                                                    reverseButtons: true
                                                }).then(function(result) {
                                                    KTUtil.scrollTop();
                                                });
                                            }else if(res==true){
												$('.uppy-StatusBar-actionBtn--upload').trigger('click');
												// $('.uppy-StatusBar-actionBtn--done').trigger('click');
			                                    Swal.fire({
		                                        text: "All is good! You have successfuly uploaded your top-up.",
		                                        icon: "success",
		                                        showCancelButton: false,
		                                        confirmButtonText: "Ok, Got it",
		                                            reverseButtons: true
		                                        }).then(function(result) {
		                                            element.reset();
                                                    KTDatatablesDataSourceAjaxServer.init('tbl_topup_details','reload');
		                                            $('#encashment-status').empty().append('\
		                                                <div class="error error-5  bgi-size-contain bgi-position-x-right bgi-no-repeat bgimg" style="background-image: url(assets/media/svg/illustrations/features.svg);">\
		                                                    <div class="container d-flex flex-row-fluid flex-column justify-content-md-center py-5 px-12">\
		                                                        <p class="font-weight-boldest font-size-h3 d-flex align-items-center"><i class="far fa-check-circle text-dark icon-3x mr-3"></i>You have successfully uploaded your top up.</p>\
		                                                        <p class="font-size-h3">We will process your request as soon as possible.</br>You can check back later.</p>\
		                                                    </div>\
		                                                </div>').removeClass('bg-light-dark bg-light-danger').addClass('bg-light-success').show();
		                                            KTUtil.scrollTop();
		                                        });
		                                    }else{
		                                    	element.reset();
		                                       	$('.uppy-Dashboard-Item-action--remove').trigger('click');
		                              			Swal.fire({
												text: "Oopps! Something went wrong, Please try again later",
												icon: "error",
												showCancelButton: false,
		                                        confirmButtonText: "Ok, Got it",
		                                            reverseButtons: true
		                                        }).then(function(result) {
		                                        	KTUtil.scrollTop();
		                                       	});
		                              		}
		                              		// if (res!=false){
		                              		// 	const Toast = Swal.mixin({toast: true,position: 'top-end',showConfirmButton: false,timer: 3000,timerProgressBar: true,onOpen: (toast) => {toast.addEventListener('mouseenter', Swal.stopTimer),toast.addEventListener('mouseleave', Swal.resumeTimer)}});Toast.fire({icon: 'success',title: 'Save changes'});
		                              		// }else{
		                              		// 	const Toast = Swal.mixin({toast: true,position: 'top-end',showConfirmButton: false,timer: 3000,timerProgressBar: true,onOpen: (toast) => {toast.addEventListener('mouseenter', Swal.stopTimer),toast.addEventListener('mouseleave', Swal.resumeTimer)}});Toast.fire({icon: 'info',title: "Nothing changes"});
		                              		// }
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
                      		const Toast = Swal.mixin({toast: true,position: 'top-end',showConfirmButton: false,timer: 3000,timerProgressBar: true,onOpen: (toast) => {toast.addEventListener('mouseenter', Swal.stopTimer),toast.addEventListener('mouseleave', Swal.resumeTimer)}});Toast.fire({icon: 'info',title: 'Please upload your transaction slip first!'});
                 		}
                } else {
                 }
            });
        });

    }

var  animateValueDecimal=function(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          obj.innerHTML = parseFloat(progress * (end - start) + start).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      }
var _initDemo_encashment = function () {
         var validation;
         var form = KTUtil.getById('encashment_form');
        validation = FormValidation.formValidation(
            form,
            {
                fields: {
                    encashment_mop: {
                        validators: {
                            notEmpty: {
                                message: 'MOP is required'
                            },
                        }
                    },
                    acc_name: {
                        validators: {
                            notEmpty: {
                                message: 'Account name is required'
                            },
                            regexp: {
                                regexp: /^[a-zA-ZÀ-ž-.\s]+$/,
                                message: 'The account name can only consist of alphabetical characters'
                            },
                            stringLength: {
                                max: 45,
                                message: 'You have reached your maximum limit of characters allowed'
                            },
                            
                        }
                    },
                    acc_number: {
                        validators: {
                            notEmpty: {
                                message: 'Account number is required'
                            },
                            digits: {
                                message: 'Account number can contain digits only',
                            },
                            stringLength: {
                                min: 4,
                                max: 17,
                                message: 'The value is not a valid account number'
                            },
                        }
                    },
                     mobile: {
                        validators: {
                            notEmpty: {
                                message: 'Mobile number is  required'
                            },
                            digits: {
                                message: 'Mobile number can contain digits only',
                            },
                            stringLength: {
                                min: 11,
                                max: 11,
                                message: 'The value is not a valid mobile number'
                            },
                        }
                    },
                },

                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap(),
                }
            }
        );
 $('#encashment_form').on('submit', function (e) {
            e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let formData = new FormData(element);
                        formData.append("action", btoa("submit_encashment"));
                        formData.append("type", "request_payout");
                            $.ajax({
                                    url: "controller/controller.php",
                                    type: "POST",
                                    data: formData,
                                    contentType: false,
                                    processData: false,
                                    dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage();
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
                                        if(response.status=="success"){
                                            res=JSON.parse(window.atob(response.payload));
                                            if(res=="has_pending_payout"){
                                                Swal.fire({
                                                text: "Sorry, you have a pending payout. You cannot request any transactions right now.",
                                                icon: "info",
                                                showCancelButton: false,
                                                confirmButtonText: "Ok, Got it",
                                                    reverseButtons: true
                                                }).then(function(result) {
                                                    element.reset();
                                                    $('.uppy-Dashboard-Item-action--remove').trigger('click');
                                                     $('#encashment-status').empty().append('\
                                                         <div class="error error-5  bgi-size-contain bgi-position-x-right bgi-no-repeat bgimg" style="background-image: url(assets/media/svg/humans/custom-12.svg);">\
                                                          <div class="container d-flex flex-row-fluid flex-column justify-content-md-center py-5 px-12">\
                                                            <p class="font-weight-boldest font-size-h3">Your have a pending payout.</p>\
                                                            <p class="font-size-h3">We&apos;re doing our best to process your request as soon possible.</br>You can check back later.</p>\
                                                          </div>\
                                                        </div>').removeClass('bg-light-success bg-light-danger').addClass('bg-light-dark').show();
                                                    KTUtil.scrollTop();
                                                });
                                            }else if(res=="minimum_payout"){
                                                Swal.fire({
                                                text: "Sorry, your wallet balance didn't reach the minimum amount of payout.",
                                                icon: "info",
                                                showCancelButton: false,
                                                confirmButtonText: "Ok, Got it",
                                                    reverseButtons: true
                                                }).then(function(result) {
                                                    KTUtil.scrollTop();
                                                });
                                            }else if(res!=false){
                                                Swal.fire({
                                                text: "All is good! You have successfuly requested your payout.",
                                                icon: "success",
                                                showCancelButton: false,
                                                confirmButtonText: "Ok, Got it",
                                                    reverseButtons: true
                                                }).then(function(result) {
                                                    element.reset();
                                                    KTDatatablesDataSourceAjaxServer.init('tbl_encashment_details','reload');
                                                    // $('#encashment-status').empty().append('\
                                                    //     <div class="error error-5  bgi-size-contain bgi-position-x-right bgi-no-repeat bgimg" style="background-image: url(assets/media/svg/illustrations/features.svg);">\
                                                    //         <div class="container d-flex flex-row-fluid flex-column justify-content-md-center py-5 px-12">\
                                                    //             <p class="font-weight-boldest font-size-h3 d-flex align-items-center"><i class="far fa-check-circle text-dark icon-3x mr-3"></i>You have successfully requested your payout.</p>\
                                                    //             <p class="font-size-h3">We will process your request as soon as possible.</br>You can check back later.</p>\
                                                    //         </div>\
                                                    //     </div>').removeClass('bg-light-dark bg-light-danger').addClass('bg-light-success').show();
                                                    KTUtil.scrollTop();
                                                     const obj1=document.getElementById("total-comm");animateValueDecimal(obj1, 0, res.comm.total_comm, 1000);
                                                     const obj2=document.getElementById("wallet");animateValueDecimal(obj2, 0, res.comm.total_wallet, 1000);
                                                     const obj3=document.getElementById("total-income");animateValueDecimal(obj3, 0, res.comm.total_income, 1000);
                                                    // const obj1=document.getElementById("total-income");animateValueDecimal(obj1, 0, res.dashboard.total_income, 1000);
                                                    // const obj2=document.getElementById("indirect-income");animateValueDecimal(obj2, 0, res.dashboard.indirect_income, 1000);
                                                    // const obj3=document.getElementById("direct-income");animateValueDecimal(obj3, 0, res.dashboard.direct_income, 1000);
                                                    // const obj4=document.getElementById("total-payout");animateValueDecimal(obj4, 0, res.dashboard.total_payout, 1000);
                                                    // const obj5=document.getElementById("wallet");animateValueDecimal(obj5, 0, res.dashboard.total_wallet, 1000);
                                                });
                                            }else{
                                                element.reset();
                                                Swal.fire({
                                                text: "Oopps! Something went wrong, Please try again later",
                                                icon: "error",
                                                showCancelButton: false,
                                                confirmButtonText: "Ok, Got it",
                                                    reverseButtons: true
                                                }).then(function(result) {
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
                } else {
                 }
            });
        });

    }

var _blockPage = function(message) {
     KTApp.blockPage({
      overlayColor: '#000000',
      state: 'primary',
      message: message
     });
}
var _initDemo_agreement = function () {
         var validation;
         var form = KTUtil.getById('agreement_form');
        validation = FormValidation.formValidation(
            form,
            {
                fields: {
                    agree: {
                        validators: {
                            notEmpty: {
                                message: 'You must agree in terms and condition'
                            },
                        }
                    },
                    agreement_name: {
                        validators: {
                            notEmpty: {
                                message: 'Full name is required'
                            },
                            regexp: {
                                regexp: /^[a-zA-ZÀ-ž-.\s]+$/,
                                message: 'The full name can only consist of alphabetical characters'
                            },
                            stringLength: {
                                max: 45,
                                message: 'You have reached your maximum limit of characters allowed'
                            },
                            
                        }
                    },
                },

                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap(),
                }
            }
        );
 $('#proceed').on('click', function (e) {
            e.preventDefault();
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let element = document.getElementById('agreement_form');
                    let formData = new FormData(element);
                        formData.append("action", btoa("submit-agreement"));
                            $.ajax({
                                    url: "controller/controller.php",
                                    type: "POST",
                                    data: formData,
                                    contentType: false,
                                    processData: false,
                                    dataType:"json",
                                    beforeSend: function(){
                                      _blockPage('Processing...')
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
                                        if(response.status=="success"){
                                            res=JSON.parse(window.atob(response.payload));
                                            if(res==true){
                                                const Toast = Swal.mixin({
                                                toast: true,
                                                position: 'top-end',
                                                showConfirmButton: false,
                                                timer: 3000,
                                                timerProgressBar: true,
                                                onOpen: (toast) => {
                                                  toast.addEventListener('mouseenter', Swal.stopTimer)
                                                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                                                }
                                                })
                                                Toast.fire({
                                                  icon: 'success',
                                                  title: 'Signing in please wait..'
                                                })
                                                window.location.replace("dashboard");
                                            }else{
                                                element.reset();
                                                Swal.fire({
                                                text: "Oopps! Something went wrong, Please try again later",
                                                icon: "error",
                                                showCancelButton: false,
                                                confirmButtonText: "Ok, Got it",
                                                    reverseButtons: true
                                                }).then(function(result) {
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
                } else {
                 }
            });
        });

    }
var _initDemo_kyc = function () {
         var validation;
         var form = KTUtil.getById('kyc_form');
        validation = FormValidation.formValidation(
            form,
            {
                fields: {
                    full_name: {
                        validators: {
                            notEmpty: {
                                message: 'Full name is required'
                            },
                            regexp: {
                                regexp: /^[a-zA-ZÀ-ž-.\s]+$/,
                                message: 'The full name can only consist of alphabetical characters'
                            },
                            stringLength: {
                                max: 45,
                                message: 'You have reached your maximum limit of characters allowed'
                            },
                        }
                    },
                    email: {
                        validators: {
                            notEmpty: {
                                message: 'Email address is required'
                            },
                            emailAddress: {
                                message: 'The value is not a valid email address'
                            }
                        }
                    },
                    tin: {
                        validators: {
                            notEmpty: {
                                message: 'TIN number is required'
                            },
                            digits: {
                                message: 'TIN number can contain digits only'
                            },
                            stringLength: {
                                min: 9,
                                max: 12,
                                message: 'The tin number must have at least 9 to 12 digits'
                            }
                        }
                    },
                    gender: {
                        validators: {
                            notEmpty: {
                                message: 'Gender is required'
                            },
                        }
                    },
                    nationality: {
                        validators: {
                            notEmpty: {
                                message: 'Nationality is required'
                            },
                            regexp: {
                                regexp: /^[a-zA-ZÀ-ž-.\s]+$/,
                                message: 'The nationality can only consist of alphabetical characters'
                            },
                            stringLength: {
                                max: 45,
                                message: 'You have reached your maximum limit of characters allowed'
                            },
                        }
                    },
                    civil_status: {
                        validators: {
                            notEmpty: {
                                message: 'Civil status is required'
                            },
                        }
                    },
                    address: {
                        validators: {
                            notEmpty: {
                                message: 'Address is required'
                            },
                            regexp: {
                                regexp: /^[a-z0-9A-ZÀ-ž-.,-\s]+$/,
                                message: 'The address can only consist of alphabetical characters, comma, period and numbers'
                            },
                            stringLength: {
                                max: 100,
                                message: 'You have reached your maximum limit of characters allowed'
                            },
                        }
                    },
                    mobile: {
                        validators: {
                            notEmpty: {
                                message: 'Mobile number is required'
                            },
                            digits: {
                                message: 'Mobile number can contain digits only'
                            },
                            stringLength: {
                                min: 10,
                                max: 10,
                                message: 'Mobile number is not valid'
                            }
                        }
                    },
                    emergency_person: {
                        validators: {
                            notEmpty: {
                                message: 'Full name is required'
                            },
                            regexp: {
                                regexp: /^[a-zA-ZÀ-ž-.\s]+$/,
                                message: 'The full name can only consist of alphabetical characters'
                            },
                            stringLength: {
                                max: 45,
                                message: 'You have reached your maximum limit of characters allowed'
                            },
                        }
                    },
                    emergency_number: {
                        // validators: {
                        //     notEmpty: {
                        //         message: 'Contact number is  required'
                        //     },
                        //     digits: {
                        //         message: 'Contact number can contain digits only'
                        //     },
                        //     stringLength: {
                        //         max: 15,
                        //         message: 'You have reached your maximum limit of digits allowed'
                        //     }
                        // }
                        validators: {
                            notEmpty: {
                                message: 'Mobile number is required'
                            },
                            digits: {
                                message: 'Mobile number can contain digits only'
                            },
                            stringLength: {
                                min: 10,
                                max: 10,
                                message: 'Mobile number is not valid'
                            }
                        }
                    },
                    id_type1: {
                        validators: {
                            notEmpty: {
                                message: 'ID type is required'
                            },
                        }
                    },
                    id_type2: {
                        validators: {
                            notEmpty: {
                                message: 'ID type is required'
                            },
                        }
                    },
                    id_number1: {
                        validators: {
                            notEmpty: {
                                message: 'ID number is  required'
                            },
                            digits: {
                                message: 'ID number can contain digits only'
                            },
                            stringLength: {
                                max: 25,
                                message: 'You have reached your maximum limit of digits allowed'
                            }
                        }
                    },
                    id_number2: {
                        validators: {
                            notEmpty: {
                                message: 'ID number is  required'
                            },
                            digits: {
                                message: 'ID number can contain digits only'
                            },
                            stringLength: {
                                max: 25,
                                message: 'You have reached your maximum limit of digits allowed'
                            }
                        }
                    },
                    
                },

                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap(),
                }
            }
        );
        $("input[name='mobile']").inputmask("mask", {
           "mask": "+63 (999) 999-9999",
           autoUnmask: true
        });
        $("input[name='emergency_number']").inputmask("mask", {
           "mask": "+63 (999) 999-9999",
           autoUnmask: true
        });
 $('#kyc_form').on('submit', function (e) {
            e.preventDefault();
            let element=this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let item = $('.uppy-Dashboard-Item').length;
                    if(item==2){
                    let formData = new FormData(element);
                        formData.append("action", btoa("submit-kyc"));
                        formData.append("type", "submit_kyc");
                        formData.append("new_mobile", $('input[name="mobile"]').val());
                        formData.append("new_emergency_number", $('input[name="emergency_number"]').val());
                            $.ajax({
                                    url: "controller/controller.php",
                                    type: "POST",
                                    data: formData,
                                    contentType: false,
                                    processData: false,
                                    dataType:"json",
                                    beforeSend: function(){
                                      _blockPage('Processing...')
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
                                        if(response.status=="success"){
                                            res=JSON.parse(window.atob(response.payload));
                                            if(res==true){
                                                $('.uppy-StatusBar-actionBtn--upload').trigger('click');
                                                Swal.fire({
                                                text: 'KYC application successfully submmitted!',
                                                icon: "success",
                                                showCancelButton: false,
                                                confirmButtonText: "Ok, Got it",
                                                    reverseButtons: true
                                                }).then(function(result) {
                                                    $("#kyc_form :input").prop("disabled", true);
                                                    $('#alert-kyc').empty().append('<div class="alert alert-custom alert-notice alert-light-success fade show" role="alert">\
                                                        <div class="alert-icon"><i class="flaticon-interface-5"></i></div>\
                                                        <div class="alert-text">Your KYC application is successfully <b>submitted</b>!. We&apos;re doing our best to process your request as soon possible.</br>You can check back later.</div>\
                                                        <div class="alert-close">\
                                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                                                                <span aria-hidden="true"><i class="ki ki-close"></i></span>\
                                                            </button>\
                                                        </div>\
                                                    </div>');
                                                    KTUtil.scrollTop();
                                                });
                                            }else if(res=='pending'){
                                                Swal.fire({
                                                text: 'Your last KYC form is not yet approved by the admins',
                                                icon: "info",
                                                showCancelButton: false,
                                                confirmButtonText: "Ok, Got it",
                                                    reverseButtons: true
                                                }).then(function(result) {
                                                    $("#kyc_form :input").prop("disabled", true);
                                                    $('#alert-kyc').empty().append('<div class="alert alert-custom alert-notice alert-light-warning fade show" role="alert">\
                                                        <div class="alert-icon"><i class="flaticon-exclamation-1"></i></div>\
                                                        <div class="alert-text">Your application is currently <b>PENDING</b>. We&apos;re doing are best to process your KYC application as soon as possible.</br>You can check back later.</div>\
                                                        <div class="alert-close">\
                                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                                                                <span aria-hidden="true"><i class="ki ki-close"></i></span>\
                                                            </button>\
                                                        </div>\
                                                    </div>');
                                                    KTUtil.scrollTop();
                                                });
                                            }else{
                                                $('.uppy-Dashboard-Item-action--remove').trigger('click');
                                                Swal.fire({
                                                text: res,
                                                icon: "error",
                                                showCancelButton: false,
                                                confirmButtonText: "Ok, Got it",
                                                    reverseButtons: true
                                                }).then(function(result) {
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
                        }else{
                            const Toast = Swal.mixin({toast: true,position: 'top-end',showConfirmButton: false,timer: 3000,timerProgressBar: true,onOpen: (toast) => {toast.addEventListener('mouseenter', Swal.stopTimer),toast.addEventListener('mouseleave', Swal.resumeTimer)}});Toast.fire({icon: 'info',title: 'Please upload your ID picture!'});
                        }
                } else {
                 }
            });
        });

    }

var _initDemo_create_order = function () {
         var validation;
         var form = KTUtil.getById('customer_form');
       validation = FormValidation.formValidation(
            form,
            {
                fields: {
                    addr_name: {
                        validators: {
                            notEmpty: {
                                message: 'Full name is required'
                            },
                            regexp: {
                                regexp: /^[a-zA-ZÀ-ž-.\s]+$/,
                                message: 'The full name can only consist of alphabetical characters'
                            },
                            stringLength: {
                                max: 45,
                                message: 'You have reached your maximum limit of characters allowed'
                            },
                            
                        }
                    },
                     addr_mobile: {
                        validators: {
                            notEmpty: {
                                message: 'Mobile number is  required'
                            },
                            digits: {
                                message: 'Mobile number can contain digits only',
                            },
                            stringLength: {
                                min: 11,
                                max: 11,
                                message: 'The value is not a valid mobile number'
                            },
                        }
                    },
                    addr_street: {
                        validators: {
                            notEmpty: {
                                message: 'Street is required'
                            },
                            stringLength: {
                                max: 100,
                                message: 'You have reached your maximum limit of characters allowed'
                            },
                        }
                    },
                    addr_region: {
                        validators: {
                            notEmpty: {
                                message: 'Region is required'
                            },
                        }
                    },
                    addr_type: {
                        validators: {
                            notEmpty: {
                                message: 'Label is required'
                            },
                        }
                    },
                    addr_province: {
                        validators: {
                            notEmpty: {
                                message: 'Province is required'
                            },
                        }
                    },
                    addr_city: {
                        validators: {
                            notEmpty: {
                                message: 'City is required'
                            },
                        }
                    },
                    addr_barangay: {
                        validators: {
                            notEmpty: {
                                message: 'Barangay is required'
                            },
                        }
                    },
                    postal: {
                        validators: {
                            notEmpty: {
                                message: 'Postal code is required'
                            },
                            digits: {
                                message: 'Postal code can contain digits only',
                            },
                            stringLength: {
                                min: 4,
                                max: 4,
                                message: 'The value is not a valid postal code'
                            },
                        }
                    },
                },

                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap(),
                }
            }
        );
 $('#customer_form').on('submit', function (e) {
            e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let formData = new FormData(element);
                        formData.append("action", btoa("submit_shipping_address"));
                        formData.append("type", address);
                        if(shipping_addr!=""){
                            formData.append("id", shipping_addr);
                        }
                            $.ajax({
                                    url: "controller/controller.php",
                                    type: "POST",
                                    data: formData,
                                    contentType: false,
                                    processData: false,
                                    dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage();
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
                                        if(response.status=="success"){
                                            res=JSON.parse(window.atob(response.payload));
                                            if (res==true){
                                                if(address=='new_address'){
                                                swal.fire({
                                                    text: "You have successfully added new address.",
                                                    icon: "success",
                                                    buttonsStyling: false,
                                                    confirmButtonText: "Ok, got it!",
                                                    customClass: {
                                                    confirmButton: "btn font-weight-bold btn-light-primary"
                                                    }
                                                    }).then(function() {
                                                        KTUtil.scrollTop();
                                                        element.reset();
                                                    });
                                                }else{
                                                    const Toast = Swal.mixin({toast: true,position: 'top-end',showConfirmButton: false,timer: 3000,timerProgressBar: true,onOpen: (toast) => {toast.addEventListener('mouseenter', Swal.stopTimer),toast.addEventListener('mouseleave', Swal.resumeTimer)}});Toast.fire({icon: 'success',title: 'Save Changes'});
                                                }
                                                 APPHANDLER.callFunction('reload_address');
                                            }else{
                                                const Toast = Swal.mixin({toast: true,position: 'top-end',showConfirmButton: false,timer: 3000,timerProgressBar: true,onOpen: (toast) => {toast.addEventListener('mouseenter', Swal.stopTimer),toast.addEventListener('mouseleave', Swal.resumeTimer)}});Toast.fire({icon: 'info',title: res});
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

    }


var _initDemo_package = function () {
         var validation;
         var form = KTUtil.getById('package_form');
       validation = FormValidation.formValidation(
            form,
            {
                fields: {
                    code: {
                        validators: {
                            notEmpty: {
                                message: 'Code is required'
                            },
                            regexp: {
                                regexp: /^[a-zA-ZÀà-ž0-9]+$/,
                                message: 'The code can only consist of alphabetical characters and numbers'
                            },
                            stringLength: {
                                min: 13,
                                max: 17,
                                message: 'The code must have atleast 10 to 14 characters long'
                            },
                        }
                    },
                    addr_name: {
                        validators: {
                            notEmpty: {
                                message: 'Full name is required'
                            },
                            regexp: {
                                regexp: /^[a-zA-ZÀ-ž-.\s]+$/,
                                message: 'The full name can only consist of alphabetical characters'
                            },
                            stringLength: {
                                max: 45,
                                message: 'You have reached your maximum limit of characters allowed'
                            },
                            
                        }
                    },
                     addr_mobile: {
                        validators: {
                            notEmpty: {
                                message: 'Mobile number is  required'
                            },
                            digits: {
                                message: 'Mobile number can contain digits only',
                            },
                            stringLength: {
                                min: 11,
                                max: 11,
                                message: 'The value is not a valid mobile number'
                            },
                        }
                    },
                    addr_street: {
                        validators: {
                            notEmpty: {
                                message: 'Street is required'
                            },
                            stringLength: {
                                max: 100,
                                message: 'You have reached your maximum limit of characters allowed'
                            },
                        }
                    },
                    addr_region: {
                        validators: {
                            notEmpty: {
                                message: 'Region is required'
                            },
                        }
                    },
                    addr_type: {
                        validators: {
                            notEmpty: {
                                message: 'Label is required'
                            },
                        }
                    },
                    addr_province: {
                        validators: {
                            notEmpty: {
                                message: 'Province is required'
                            },
                        }
                    },
                    addr_city: {
                        validators: {
                            notEmpty: {
                                message: 'City is required'
                            },
                        }
                    },
                    addr_barangay: {
                        validators: {
                            notEmpty: {
                                message: 'Barangay is required'
                            },
                        }
                    },
                    postal: {
                        validators: {
                            notEmpty: {
                                message: 'Postal code is required'
                            },
                            digits: {
                                message: 'Postal code can contain digits only',
                            },
                            stringLength: {
                                min: 4,
                                max: 4,
                                message: 'The value is not a valid postal code'
                            },
                        }
                    },
                },

                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap(),
                }
            }
        );
 $('#package_form').on('submit', function (e) {
            e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let formData = new FormData(element);
                        formData.append("action", btoa("submit_package_form"));
                        formData.append("type", address);
                            $.ajax({
                                    url: "controller/controller.php",
                                    type: "POST",
                                    data: formData,
                                    contentType: false,
                                    processData: false,
                                    dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage();
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
                                        if(response.status=="success"){
                                            res=JSON.parse(window.atob(response.payload));
                                            if (res==true){
                                                if(address=='new_address'){
                                                swal.fire({
                                                    text: "You have successfully added new address.",
                                                    icon: "success",
                                                    buttonsStyling: false,
                                                    confirmButtonText: "Ok, got it!",
                                                    customClass: {
                                                    confirmButton: "btn font-weight-bold btn-light-primary"
                                                    }
                                                    }).then(function() {
                                                        KTUtil.scrollTop();
                                                        element.reset();
                                                    });
                                                }else{
                                                    const Toast = Swal.mixin({toast: true,position: 'top-end',showConfirmButton: false,timer: 3000,timerProgressBar: true,onOpen: (toast) => {toast.addEventListener('mouseenter', Swal.stopTimer),toast.addEventListener('mouseleave', Swal.resumeTimer)}});Toast.fire({icon: 'success',title: 'Save Changes'});
                                                }
                                                APPHANDLER.callFunction('reload_address');
                                            }else{
                                                const Toast = Swal.mixin({toast: true,position: 'top-end',showConfirmButton: false,timer: 3000,timerProgressBar: true,onOpen: (toast) => {toast.addEventListener('mouseenter', Swal.stopTimer),toast.addEventListener('mouseleave', Swal.resumeTimer)}});Toast.fire({icon: 'info',title: res});
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

    }
    var _initDemo_setup_groupsales = function () {
         var validation;
         var form = KTUtil.getById('setup_groupsales_form');
       validation = FormValidation.formValidation(
            form,
            {
                fields: {
                    position: {
                        validators: {
                            notEmpty: {
                                message: 'Label is required'
                            },
                        }
                    },
                },

                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap(),
                }
            }
        );
     $('#setup_groupsales_form').on('submit', function (e) {
            e.preventDefault();
            var position_status = $('select[name="position"]').val();
            if(position_status == 'L' || position_status == 'R'){
                    $("select option[value*='NULL']").prop('disabled', true);
             }else{
                    $("select option[value*='NULL'").prop('disabled', false);
             }

            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let formData = new FormData(element);
                        formData.append("action", btoa("submit_groupsales_form"));
                        formData.append("type", "submit_setup");
                            $.ajax({
                                    url: "controller/controller.php",
                                    type: "POST",
                                    data: formData,
                                    contentType: false,
                                    processData: false,
                                    dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage();
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
                                        if(response.status=="success"){
                                            res=JSON.parse(window.atob(response.payload));
                                            if (res==true){
                                                $('input[name=dpos_lastupdate]').val(response.dateUpdate);
                                                const Toast = Swal.mixin({toast: true,position: 'top-end',showConfirmButton: false,timer: 3000,timerProgressBar: true,onOpen: (toast) => {toast.addEventListener('mouseenter', Swal.stopTimer),toast.addEventListener('mouseleave', Swal.resumeTimer)}});Toast.fire({icon: 'success',title: 'Save Changes'});
                                              
                                                APPHANDLER.callFunction('reload_setup_sales');
                                            }else{
                                                const Toast = Swal.mixin({toast: true,position: 'top-end',showConfirmButton: false,timer: 3000,timerProgressBar: true,onOpen: (toast) => {toast.addEventListener('mouseenter', Swal.stopTimer),toast.addEventListener('mouseleave', Swal.resumeTimer)}});Toast.fire({icon: 'info',title: res});
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

    }

    var _initDemo_upgrade_rank = function () {
         var validation;
         var form = KTUtil.getById('upgrade_form');
       validation = FormValidation.formValidation(
            form,
            {
                fields: {
                    code: {
                        validators: {
                            notEmpty: {
                                message: 'Code is required'
                            },
                            regexp: {
                                regexp: /^[a-zA-ZÀà-ž0-9]+$/,
                                message: 'The code can only consist of alphabetical characters and numbers'
                            },
                            stringLength: {
                                min: 13,
                                max: 17,
                                message: 'The code must have atleast 13 to 17 characters long'
                            },
                        }
                    },
                },

                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap(),
                }
            }
        );
     $('#upgrade_form').on('submit', function (e) {
            e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let formData = new FormData(element);
                        formData.append("action", btoa("submit_upgrade"));
                        formData.append("type", "upgrade_rank");
                            $.ajax({
                                    url: "controller/controller.php",
                                    type: "POST",
                                    data: formData,
                                    contentType: false,
                                    processData: false,
                                    dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage();
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                    },
                                    success: function(response)
                                    {
                                        if(response.status=="success"){
                                            res=JSON.parse(window.atob(response.payload));
                                            // alert(res);
                                            if (res==true){
                                                _showSwal('success','Your rank was succesfully upgraded!');
                                                APPHANDLER.callFunction('upgrade');
                                            }else{
                                                _showSwal('info',res);
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
         $('input[name="code"]').on('input', function(){
            let code = this.value;
            if(code.length>=3){
                let type = code.substring(0,3);
                if(type=='GDP' || type=='GDF'){
                    if(code.length==13 || code.length==17){
                        $('#code_type').empty().append('<button class="btn btn-GOLD" type="button">GOLD</button>');
                    }else{
                        $('#code_type').empty();
                    }
                }else if(type=='BRP' || type=='BRF'){
                    if(code.length==17){
                        $('#code_type').empty().append('<button class="btn btn-BRONZE" type="button">BRONZE</button>');
                    }else{
                        $('#code_type').empty();
                    }
                }else if(type=='SLP' || type=='SLF'){
                    if(code.length==15 || code.length==17){
                        $('#code_type').empty().append('<button class="btn btn-SILVER" type="button">SILVER</button>');
                    }else{
                        $('#code_type').empty();
                    }
                }else{
                    $('#code_type').empty();
                }
            }else{
                $('#code_type').empty();
            }
        })
    }
	return {
		// public functions
		init: function() {
            _blockPage();
            if(document.getElementById('topup_form') !== null){
                _initDemo_topup();
            }
            if(document.getElementById('encashment_form') !== null){
                _initDemo_encashment();
            }
            if(document.getElementById('agreement_form') !== null){
                _initDemo_agreement();
            }
            if(document.getElementById('kyc_form') !== null){
                _initDemo_kyc();
            }
            if(document.getElementById('personal_info_form') !== null){
				_initDemo1();
	            _initDemo2();
	            _initDemo3();
	            _initDemo4();
                _initDemo5();
            }
            if(document.getElementById('customer_form') !== null){
                _initDemo_create_order();
            }
            if(document.getElementById('package_form') !== null){
                _initDemo_package();
            }
            if(document.getElementById('shipping_address_form') !== null){
                _initDemo_addr();
            }
            if(document.getElementById('setup_groupsales_form') !== null){
                console.log('ok')
                _initDemo_setup_groupsales();
            } 
            if(document.getElementById('upgrade_form') !== null){
                _initDemo_upgrade_rank();
            }
              
		}
	};
}();

	var Maxlength_profile = function () {
    var demo = function () {
        $("input[name='bday']").inputmask("99/99/9999", {
            "placeholder": "mm/dd/yyyy",
            // autoUnmask: true
        });
        // $("input[name='mobile']").inputmask("+63 (999) 999-9999", {
        //     // "placeholder": "(965) 999-9XXX",
        //     // autoUnmask: true
        // });
        $("#mobile").inputmask("mask", {
           "mask": "+63 (999) 999-9999",
           autoUnmask: true
          });
    }
    return {
        init: function() {
            if(document.getElementById('contact_info_form') !== null ||document.getElementById('account_info_form') !== null || document.getElementById('kyc_form') !== null){
                demo();
            }
        }
    };
}();

// jQuery(document).ready(function() {
// 	KTFormControls.init();
// 	Maxlength_profile.init();
// });
