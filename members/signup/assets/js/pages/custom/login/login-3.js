"use strict";

// Class Definition
var KTLogin = function() {
	var _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';


	var _handleFormSignup = function() {
		// Base elements
		var wizardEl = KTUtil.getById('kt_login');
		var form = KTUtil.getById('kt_login_signup_form');
		var wizardObj;
		var validations = [];
		var formSubmitButton = KTUtil.getById('kt_login_signup_form_submit_button');

		if (!form) {
			return;
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

		// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
		// Step 1
		
		// $("#code").inputmask({
	 //   "mask": "([A]|[9])([A]|[9])([A]|[9])-([A]|[9])([A]|[9])([A]|[9])-([A]|[9])([A]|[9])([A]|[9])-([A]|[9])([A]|[9])([A]|[9])-([A]|[9])([A]|[9])([A]|[9])([A]|[9])([A]|[9])",
	 //   placeholder: "" 
	 //  });
		// Step 2
		validations.push(FormValidation.formValidation(
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
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					// Bootstrap Framework Integration
					bootstrap: new FormValidation.plugins.Bootstrap({
						//eleInvalidClass: '',
						eleValidClass: '',
					})
				}
			}
		));
		FormValidation.validators.checkPassword = strongPassword;
		// Step 3
		validations.push(FormValidation.formValidation(
			form,
			{
				fields: {
					username: {
                        validators: {
                            notEmpty: {
                                message: 'Username is required'
                            },
                            regexp: {
                                regexp: /^[0-9]+$/,
                                message: 'The username can only consist of numbers'
                            },
                            stringLength: {
                            	min: 10,
                                max: 10,
                                message: 'The user ID must have 10 digits'
                            }
                        }
                    },
					password: {
                        validators: {
                            notEmpty: {
                                message: 'The password is required'
                            },
                            checkPassword: {
	                            message: 'The password is too weak'
	                        },
                        }
                    },
                    cpassword: {
                        validators: {
                            notEmpty: {
                                message: 'The password confirmation is required'
                            },
                            identical: {
                                compare: function() {
                                    return form.querySelector('[name="password"]').value;
                                },
                                message: 'The password and its confirm are not the same'
                            }
                        }
                    },
                    agree: {
                        validators: {
                            notEmpty: {
                                message: 'You must accept the terms and conditions'
                            },
                        }
                    },
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					// Bootstrap Framework Integration
					bootstrap: new FormValidation.plugins.Bootstrap({
						//eleInvalidClass: '',
						eleValidClass: '',
					})
				}
			}
		));

		// Initialize form wizard
		wizardObj = new KTWizard(wizardEl, {
			startStep: 1, // initial active step number
			clickableSteps: true  // allow step clicking
		});

		// Validation before going to next page
		wizardObj.on('change', function (wizard) {
			if (wizard.getStep() > wizard.getNewStep()) {
				return; // Skip if stepped back
			}

			// Validate form before change wizard step
			var validator = validations[wizard.getStep() - 1]; // get validator for currnt step

			if (validator) {
				validator.validate().then(function (status) {
					if (status == 'Valid') {
						
						if (wizard.getStep()==2) {
							// alert($('input[name="code"]').val());
							let pos="Left";
							let agree='Accepted';
							if ($('select[name="position"]').val()=='R') {pos='Right';}
							if ($('input[name="agree"]').val()!='on') {pos='Not accepted';}
							$('#confirm-form').empty().append('\
									<h4 class="font-weight-bolder mb-3">Personal Information:</h4>\
									<div class="text-dark-50 font-weight-bold line-height-lg mb-8">\
										<div>First name: <span class="font-weight-bold">'+$('input[name="fname"]').val()+'</span></div>\
										<div>Last name: <span class="font-weight-bold">'+$('input[name="lname"]').val()+'</span></div>\
										<div>Mobile:  <span class="font-weight-bold">'+$('input[name="mobile"]').val()+'</span></div>\
										<div>Email:  <span class="font-weight-bold">'+$('input[name="email"]').val()+'</span></div>\
									</div>\
								');
							
						}
						wizard.goTo(wizard.getNewStep());
						// KTUtil.scrollTop();
					} else {
						// Swal.fire({
						// 	text: "Sorry, looks like there are some errors detected, please try again.",
						// 	icon: "error",
						// 	buttonsStyling: false,
						// 	confirmButtonText: "Ok, got it!",
						// 	customClass: {
						// 		confirmButton: "btn font-weight-bold btn-light"
						// 	}
						// }).then(function () {
						// 	KTUtil.scrollTop();
						// });
					}
				});
			}

			return false;  // Do not change wizard step, further action will be handled by he validator
		});

		// Change event
		wizardObj.on('changed', function (wizard) {
			// KTUtil.scrollTop();
		});

		// Submit event

		wizardObj.on('submit', function (wizard) {
			Swal.fire({
				text: "All is good! Please confirm the form submission.",
				icon: "question",
				showCancelButton: true,
				buttonsStyling: false,
				confirmButtonText: "Yes, submit!",
				cancelButtonText: "No, cancel",
				customClass: {
					confirmButton: "btn font-weight-bold btn-primary",
					cancelButton: "btn font-weight-bold btn-default"
				}
			}).then(function (result) {
				if (result.value) {

					// KTUtil.btnWait(formSubmitButton, _buttonSpinnerClasses, "Signing Up...");
					let myForm = document.getElementById('kt_login_signup_form');
					let formData = new FormData(myForm);
                    formData.append("action", btoa("sign-up"));
                    formData.append("userid", user_id);
                    formData.append("new_mobile", $('input[name="mobile"]').val());
                    $.ajax({
                                    url: "signup-controller/controller.php",
                                    type: "POST",
                                    data: formData,
                                    contentType: false,
                                    processData: false,
                                    dataType:"json",
                                    beforeSend: function(){
                                      KTApp.blockPage('Signing Up...');
                                    },
                                    complete: function(){
                                      KTApp.unblockPage();
                                      // KTUtil.btnRelease(formSubmitButton);
                                    },
                                    success: function(response)
                                    {
                                        if(response.status=="success"){
                                            let res=JSON.parse(window.atob(response.payload));
		                                       if(res == true){
		                                            $('#pin_code_modal').modal('hide');
		                                            Swal.fire({
									                     html: 'Account created successfully!<br /><br />Your User ID is:<br /><b>'+user_id+'</b>',
									                     icon: "success",
									                     showCancelButton: true,
									                     buttonsStyling: false,
									                     confirmButtonText: "CONTINUE LOGIN",
									                     cancelButtonText: "No, cancel",
									                     customClass: {
									                       confirmButton: "btn font-weight-bold btn-primary",
									                       cancelButton: "btn font-weight-bold btn-default"
									                     }
									                   }).then(function (result) {
									                   		$('#code_type').empty();
									                   	if (result.value) {
									                   		// window.location.replace("../login");
									                   		let myForm = document.getElementById('kt_login_signup_form');
												            let formData = new FormData(myForm);
												              formData.append("action", btoa("sign-in"));
									                   		 $.ajax({
								                              url:  "../login/login-controller/controller.php",
								                              type: "POST",
								                              data: formData,
								                              contentType: false,
								                              processData: false,
								                              dataType:"json",
								                              beforeSend: function(){
								                                  KTApp.blockPage('Signing In...');
								                              },
								                              complete: function(){
								                                  KTApp.unblockPage();
								                              },
								                              success: function(response)
								                              {    
								                                  if(response.status == "success"){
								                                  	myForm.reset();
								                                    let res=JSON.parse(window.atob(response.payload));
								                                    if(res == 'dashboard' || res=='agreement'){
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
								                                                title: 'Signed in successfully! Please wait..'
								                                              })
								                                               window.location.replace("../app/"+res);
								                                     }else if(res == "verify"){
								                                     	window.location.replace("../login");
								                                     }else{
								                                        Swal.fire("Oopps!", JSON.parse(window.atob(response.payload)), "info"); 
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
									                   		location.reload();
									                   		myForm.reset();
									                   		KTUtil.scrollTop();
									                   		$('#kt_login > div.login-aside.d-flex.flex-column.flex-row-auto > div > div > div > div:nth-child(1)').click();
									                   	}
									                   })
		                                       }else{
		                                          Swal.fire("Oopps!", JSON.parse(window.atob(response.payload)), "info"); 
		                                       }
                          //                   if(res==true){
                          //                   	Swal.fire({
							                   //   text: 'Signed-up successfully! You can now sign-in',
							                   //   icon: "error",
							                   //   showCancelButton: true,
							                   //   buttonsStyling: false,
							                   //   confirmButtonText: "Login!",
							                   //   cancelButtonText: "No, cancel",
							                   //   customClass: {
							                   //     confirmButton: "btn font-weight-bold btn-primary",
							                   //     cancelButton: "btn font-weight-bold btn-default"
							                   //   }
							                   // }).then(function (result) {
							                   // 		myForm.reset();
							                   // 	if (result.value) {
							                   // 		window.location.replace("../login");
							                   // 	}else{
							                   // 		KTUtil.scrollTop();
							                   // 		$('#kt_login > div.login-aside.d-flex.flex-column.flex-row-auto > div > div > div > div:nth-child(1)').click();
							                   // 	}
							                   // })
                          //                   }else
                          //                    if(res=='verify'){
                          //                   	$("#pin_code_modal").modal('show');
	                         //                    $('#pincode-input7').pincodeInput({hidedigits:false,inputs:6});
	                         //                    $('#resendPin, #kt_login_signup_form_submit_button').prop('disabled', true);
	                         //                    $("#kt_login_signup_form_submit_button").off('submit');
	                         //                    let countDownDate = new Date(Date.now() + 10000).getTime();
	                         //                    let x = setInterval(function() {
	                         //                    let now = new Date().getTime();
	                         //                    let distance = countDownDate - now;
	                         //                    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
	                         //                    $("#resendPin").text("Resend Verification code? ("+seconds+")");
	                         //                    $("#kt_login_signup_form_submit_button").text("Sign In ("+seconds+")");
	                         //                    if (distance < 0) {
	                         //                    clearInterval(x);
	                         //                    $("#resendPin").text("Resend Verification code?");
	                         //                    $("#kt_login_signup_form_submit_button").text("Sign In");
	                         //                    $('#resendPin, #kt_login_signup_form_submit_button').prop('disabled', false);
	                         //                    }
	                         //                    }, 1000);
                          //                   }else{
                          //                   	Swal.fire({
							                   //   text: res,
							                   //   icon: "error",
							                   //   showCancelButton: false,
							                   //   buttonsStyling: false,
							                   //   confirmButtonText: "Confirm",
							                   //   cancelButtonText: "No, cancel",
							                   //   customClass: {
							                   //     confirmButton: "btn font-weight-bold btn-primary",
							                   //     cancelButton: "btn font-weight-bold btn-default"
							                   //   }
							                   // }).then(function (result) {
							                   // 		KTUtil.scrollTop();
							                   // })
                          //                   }
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
					 
                      
				} else if (result.dismiss === 'cancel') {
					// Swal.fire({
					// 	text: "Your form has not been submitted!.",
					// 	icon: "error",
					// 	buttonsStyling: false,
					// 	confirmButtonText: "Ok, got it!",
					// 	customClass: {
					// 		confirmButton: "btn font-weight-bold btn-primary",
					// 	}
					// });
				}
			});
		});
    }


var _handleVerifyReplacement = function() {

    $("#mobile").inputmask("mask", {
    	// "placeholder": "+63 (999) 999-9999",
       "mask": "+63 (999) 999-9999",
       autoUnmask: true
    });
	$('#kt_login_signup_form > div:nth-child(1) > div.row > div:nth-child(1) > div > div > div > button').on('click', function(){
		$.ajax({
        	url: "signup-controller/controller.php",
        	type: "POST",
        	data: {
        		action: btoa('verify-replacement'),
        		sponsor:  $('input[name="sponsor"]').val(),
        		val:  $('input[name="placement"]').val()
        	},
        	dataType:"json",
           	beforeSend: function(){
           	  KTApp.blockPage('Verifying...');
           	},
            complete: function(){
              KTApp.unblockPage();
            },
            success: function(response)
            {
            if(response.status=="success"){
                let res=JSON.parse(window.atob(response.payload));
                // alert(JSON.stringify(res));
                if(res.result){
                	if(res.result==true){
                		let option='<option value="" selected disabled>Please select position</option>';
                		if(res.L==""){
                			option+='<option value="L">Left</option>';
                		}
                		if(res.R==""){
                			option+='<option value="R">Right</option>';
                		}
                		if(res.L!="" && res.R!=""){
                			option='<option class="text-danger" value="" selected disabled>No position available</option>';
                		}
	                	$('select[name="position"]').empty().append(option);
					}
                }else{
                    Swal.fire({
						text: res,
						icon: "info",
						showCancelButton: false,
						buttonsStyling: false,
						confirmButtonText: "Ok, got it!",
						cancelButtonText: "No, cancel",
						customClass: {
							confirmButton: "btn font-weight-bold btn-primary",
							cancelButton: "btn font-weight-bold btn-default"
						}
					}).then(function (result) {
						KTUtil.scrollTop();
					})
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
	})
	$('input[name="code"]').on('input', function(){
		let code = this.value;
		if(code.length>=3){
			let type = code.substring(0,3);
			if(type=='GDP' || type=='GDF'){
				if(code.length==13 || code.length==17){
					$('#code_type').empty().append('<button class="btn btn-gold" type="button">GOLD</button>');
				}else{
					$('#code_type').empty();
				}
			}else if(type=='BRP' || type=='BRF'){
				if(code.length==17){
					$('#code_type').empty().append('<button class="btn btn-bronze" type="button">BRONZE</button>');
				}else{
					$('#code_type').empty();
				}
			}else if(type=='SLP' || type=='SLF'){
				if(code.length==15 || code.length==17){
					$('#code_type').empty().append('<button class="btn btn-silver" type="button">SILVER</button>');
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
	$('input[name="placement"],input[name="sponsor"]').on('input', function(){
		$('select[name="position"]').empty().append('<option value="" selected disabled>Please verify placement first</option>');
	})
	$('#pin_code_modal').on('hidden.bs.modal',function(){
      $(this).find('input').val('');
    });
    $("#resendPin").on('click',function(e){
       e.preventDefault();
       $('#kt_login_signup_form_submit_button').click();
    });
	 $('#verify').on("click", function(e){
            e.preventDefault();
            let myForm = document.getElementById('kt_login_signup_form');
              let formData = new FormData(myForm);
              formData.append("pin", $('#pincode-input7').val());
              formData.append("action", btoa("sign-up"));
              formData.append("userid", user_id);
                        $.ajax({
                                url:  "signup-controller/controller.php",
                                type: "POST",
                                data: formData,
                                contentType: false,
                                processData: false,
                                dataType:"json",
                                beforeSend: function(){
                                    KTApp.blockPage('Verifying...');
                                },
                                complete: function(){
                                    KTApp.unblockPage();
                                },
                                success: function(response)
                                {
                                    if(response.status == "success"){
                                        let res=JSON.parse(window.atob(response.payload));
                                       if(res == true){
                                            $('#pin_code_modal').modal('hide');
                                            Swal.fire({
							                     html: 'Account created successfully!<br /><br />Your User ID is:<br /><b>'+user_id+'</b>',
							                     icon: "success",
							                     showCancelButton: true,
							                     buttonsStyling: false,
							                     confirmButtonText: "CONTINUE LOGIN",
							                     cancelButtonText: "No, cancel",
							                     customClass: {
							                       confirmButton: "btn font-weight-bold btn-primary",
							                       cancelButton: "btn font-weight-bold btn-default"
							                     }
							                   }).then(function (result) {
							                   		$('#code_type').empty();
							                   	if (result.value) {
							                   		// window.location.replace("../login");
							                   		let myForm = document.getElementById('kt_login_signup_form');
										            let formData = new FormData(myForm);
										              formData.append("action", btoa("sign-in"));
							                   		 $.ajax({
						                              url:  "../login/login-controller/controller.php",
						                              type: "POST",
						                              data: formData,
						                              contentType: false,
						                              processData: false,
						                              dataType:"json",
						                              beforeSend: function(){
						                                  KTApp.blockPage('Signing In...');
						                              },
						                              complete: function(){
						                                  KTApp.unblockPage();
						                              },
						                              success: function(response)
						                              {    
						                                  if(response.status == "success"){
						                                  	myForm.reset();
						                                    let res=JSON.parse(window.atob(response.payload));
						                                    if(res == 'dashboard' || res=='agreement'){
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
						                                                title: 'Signed in successfully! Please wait..'
						                                              })
						                                               window.location.replace("../app/"+res);
						                                     }else if(res == "verify"){
						                                     	window.location.replace("../login");
						                                     }else{
						                                        Swal.fire("Oopps!", JSON.parse(window.atob(response.payload)), "info"); 
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
							                   		myForm.reset();
							                   		KTUtil.scrollTop();
							                   		$('#kt_login > div.login-aside.d-flex.flex-column.flex-row-auto > div > div > div > div:nth-child(1)').click();
							                   	}
							                   })
                                       }else{
                                          Swal.fire("Oopps!", JSON.parse(window.atob(response.payload)), "info"); 
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
        
        });
}
    // Public Functions
    return {
        init: function() {
            // _handleFormSignin();
			// _handleFormForgot();
			_handleFormSignup();
			_handleVerifyReplacement();

        }
    };
}();

// Class Initialization
jQuery(document).ready(function() {
    KTLogin.init();
});
