"use strict";

// Class definition
var KTWizard2 = function () {
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
			clickableSteps: true // to make steps clickable this set value true and add data-wizard-clickable="true" in HTML for class="wizard" element
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
					                  data1: "supplier",
					                  data2 : 'validate_email',
					                  data3 : $('input[name="email"]').val(),
					                  // data4 : $('input[name=username]').val()
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
							$('#review-supplier').empty().append('\
                                                                <div class="text-dark-50 line-height-lg">\
                                                                    <div>Supplier Name: <span class="font-weight-bold">'+$('input[name="supplier"]').val()+'</span></div>\
                                                                    <div>Description: <span class="font-weight-bold">'+$('textarea[name="supplier_desc"]').val()+'</span></div>\
                                                                </div>\
                                                                <div class="separator separator-dashed my-5"></div>\
                                                                <h6 class="font-weight-bolder mb-3">Contacts:</h6>\
                                                                <div class="text-dark-50 line-height-lg">\
                                                                    <div>Email: <span class="font-weight-bold">'+$('input[name="email"]').val()+'</span></div>\
                                                                    <div>Mobile Number: <span class="font-weight-bold">'+$('input[name="mobile"]').val()+'</span></div>\
                                                                </div>\
                                                                <div class="separator separator-dashed my-5"></div>\
                                                                <h6 class="font-weight-bolder mb-3">Address:</h6>\
                                                                <div class="text-dark-50 line-height-lg">\
                                                                    <div><span class="font-weight-bold">'+$('input[name="street"]').val()+'</br>'+$('select[name="brgy"] option:selected').text()+', '+$('select[name="city"] option:selected').text()+' '+$('input[name="postcode"]').val()+ '</br>'+$('select[name="province"] option:selected' ).text()+', '+$('select[name="region"] option:selected').text()+', '+$('select[name="country"] option:selected').text()+'</span></div>\
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
                    	formData.append("action", btoa("setup_supplier"));
                    	formData.append("type", "add_supplier");
                    	if($('#profile_supplier')[0].files[0]){
	                    	formData.append("image", $('#profile_supplier')[0].files[0]);
	                    }
                        $.ajax({
                              url:  "controller/controller.php",
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
                                  if(response.status == "success"){
                                  	let res=JSON.parse(window.atob(response.payload));
                                     if(res == true){
                                     	APPHANDLER.callFunction('reload_supplier');
                                         Swal.fire({
											text: $('input[name="supplier"]').val()+" was added as a new supplier!",
											icon: "success",
											showCancelButton: false,
											buttonsStyling: false,
											confirmButtonText: "OK, got it!",
											cancelButtonText: "No, cancel",
											customClass: {
												confirmButton: "btn font-weight-bold btn-primary",
												cancelButton: "btn font-weight-bold btn-default"
											}
										}).then(function (result) {
                                              myForm.reset();
                                              $('#kt_wizard > div.wizard-nav.border-right.py-8.px-0 > div > div:nth-child(1)').click();
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
					supplier: {
						validators: {
							notEmpty: {
								message: 'Supplier is required'
							},
							stringLength: {
                                min: 3,
                                max: 50,
                                message: 'Supplier name must have at least 3 to 50 characters'
                            },
                            regexp: {
                                regexp: /^[a-zA-Z0-9_. ]+$/,
                                message: 'Supplier name can only consist of alphabetical, number, dot and underscore'
                            },
						}
					},
					supplier_desc: {
						validators: {
							notEmpty: {
								message: 'Description is required'
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
					profile_avatar: {
						validators: {
                            notEmpty: {
                                message: 'Profile image is  required'
                            },
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
                                min: 11,
                                max: 11,
                                message: 'The mobile number must have 11 digits'
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
					}
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
					country: {
						validators: {
							notEmpty: {
								message: 'Country is required'
							}
						}
					},
					region: {
						validators: {
							notEmpty: {
								message: 'Region is required'
							}
						}
					},
					province: {
						validators: {
							notEmpty: {
								message: 'Province is required'
							}
						}
					},
					city: {
						validators: {
							notEmpty: {
								message: 'City is required'
							}
						}
					},
					brgy: {
						validators: {
							notEmpty: {
								message: 'Barangay is required'
							}
						}
					},
					postcode: {
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
					street: {
						validators: {
							notEmpty: {
								message: 'Street is required'
							},
							stringLength: {
                                max: 100,
                                message: 'Street can contain maximum of 100 characters'
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
	KTWizard2.init();
});
