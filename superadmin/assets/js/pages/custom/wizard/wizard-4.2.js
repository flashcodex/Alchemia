"use strict";

// Class definition
var KTWizard4 = function () {
	// Base elements
	var _wizardEl;
	var _formEl;
	var _wizardObj;
	var _validations = [];

	// Private functions
	var _initWizard = function () {
		// Initialize form wizard
		_wizardObj = new KTWizard(_wizardEl, {
			startStep: 1, // initial active step number
			clickableSteps: true  // allow step clicking
		});

		// Validation before going to next page
		_wizardObj.on('change', function (wizard) {
			if (wizard.getStep() > wizard.getNewStep()) {
				return; // Skip if stepped back
			}

			// Validate form before change wizard step
			var validator = _validations[wizard.getStep() - 1]; // get validator for currnt step

			if (validator) {
				validator.validate().then(function (status) {
					if (status == 'Valid') {
						if(wizard.getStep()==2){
							$.ajax({
					            url: "controller/controller.php",
					            type: "post",
					            data:{
					                  data1: "moderator",
					                  data2 : 'validate_email',
					                  data3 : $('input[name=email]').val(),
					                  data4 : $('input[name=username]').val()
					                  },
					            dataType: "json",
					            beforeSend: function(){
					            },
					            complete: function(){
					            },
					            success:function(response){
					              if(response.status=="success"){
		                              		let res=JSON.parse(window.atob(response.payload));
		                              		if(res==true){
		                              			wizard.goTo(wizard.getNewStep());
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
					          }); 
						}else if(wizard.getStep()==3){
							let send='NO';
							if($('input[name="Checkboxes1"]').val()=='on'){
								send='YES';
							}
											$('#moderator-details').empty().append('\
																	<h6 class="font-weight-bolder mb-3">Account Info:</h6>\
																	<div class="text-dark-50 line-height-lg">\
																		<div>Role: <span class="font-weight-bold">'+$('select[name="role"]').val()+'</span></div>\
																		<div class="text-capitalize">Name: <span class="font-weight-bold">'+$('input[name="fname"]').val()+" "+$('input[name="mname"]').val()+" "+$('input[name="lname"]').val()+'</span></div>\
																	</div>\
																	<div class="separator separator-dashed my-5"></div>\
																	<h6 class="font-weight-bolder mb-3">Account Credentials:</h6>\
																	<div class="text-dark-50 line-height-lg">\
																		<div>Username: <span class="font-weight-bold">'+$('input[name="username"]').val()+'</span></div>\
																		<div>Temporary Password: <span class="font-weight-bold">'+$('input[name="password"]').val()+'</span></div>\
																		<div>Mobile: <span class="font-weight-bold">+63'+$('input[name="mobile"]').val()+'</span></div>\
																		<div>Email: <span class="font-weight-bold">'+$('input[name="email"]').val()+'</span></div>\
																		<div>Send login credentials: <span class="font-weight-bold">'+send+'</span></div>\
																	</div>\
																	<div class="separator separator-dashed my-5"></div>\
																	<h6 class="font-weight-bolder mb-3">Profile:</h6>\
																	<div class="text-dark-50 line-height-lg">\
																		<div>Country: <span class="font-weight-bold">'+$('select[name="country"] option:selected').text()+'</span></div>\
																		<div>City: <span class="font-weight-bold">'+$('input[name="city"]').val()+'</span></div>\
																	</div>');
											wizard.goTo(wizard.getNewStep());
						}else{
							wizard.goTo(wizard.getNewStep());
						}

						KTUtil.scrollTop();
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
		_wizardObj.on('changed', function (wizard) {
			KTUtil.scrollTop();
		});

		// Submit event
		_wizardObj.on('submit', function (wizard) {
					let element = this;
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
					let myForm = document.getElementById('kt_form');
					let formData = new FormData(myForm);
                    	formData.append("action", btoa("setup_moderator"));
                    	formData.append("type", "add_moderator");
                    	formData.append("phonecode", $('select[name="country"] option:selected').attr('phonecode'));
                    	if($('#profile_avatar')[0].files[0]){
	                    	formData.append("image", $('#profile_avatar')[0].files[0]);
	                    }
                        $.ajax({
                              url:  "controller/controller.php",
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
                                  if(response.status == "success"){
                                  	let res=JSON.parse(window.atob(response.payload));
                                     if(res == true){
                                         Swal.fire({
											text: "New "+$('select[name="role"]').val()+" was created!",
											icon: "success",
											showCancelButton: false,
											buttonsStyling: false,
											confirmButtonText: "Yes, submit!",
											cancelButtonText: "No, cancel",
											customClass: {
												confirmButton: "btn font-weight-bold btn-primary",
												cancelButton: "btn font-weight-bold btn-default"
											}
										}).then(function (result) {
                                              myForm.reset();
                                              $('#kt_wizard > div.wizard-nav > div > div:nth-child(1) > div').click();
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
	 
	var _initValidation = function () {
		// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
		// Step 1
		_validations.push(FormValidation.formValidation(
			_formEl,
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
                    role: {
						validators: {
							notEmpty: {
								message: 'Role is required'
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

		// Step 2
		_validations.push(FormValidation.formValidation(
			_formEl,
			{
				fields: {
					username: {
                        validators: {
                            stringLength: {
                                min: 3,
                                max: 12,
                                message: 'The username must have at least 8 to 15 characters'
                            },
                            regexp: {
                                regexp: /^[a-zA-Z0-9_.]+$/,
                                message: 'The username can only consist of alphabetical, number, dot and underscore'
                            },
                            stringCase: {
                                message: 'The username must be in lowercase',
                                case: 'lower'
                            }
                        }
                    },
                    password: {
                        validators: {
                            stringLength: {
                                min: 8,
                                message: 'The temporary password must have at least 8 characters'
                            },
                            notEmpty: {
                                message: 'The temporary password is required'
                            }
                        }
                    },
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

		// Step 3
		_validations.push(FormValidation.formValidation(
			_formEl,
			{
				fields: {
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
                    country: {
						validators: {
							notEmpty: {
								message: 'Country is required'
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
	}

	return {
		// public functions
		init: function () {
			_wizardEl = KTUtil.getById('kt_wizard');
			_formEl = KTUtil.getById('kt_form');

			_initWizard();
			_initValidation();
		}
	};
}();

jQuery(document).ready(function () {
	KTWizard4.init();
});
