"use strict";

// Class definition
var KTWizard4 = function () {
	// Base elements
	var _wizardEl;
	var _formEl;
	var _wizard;
	var _validations = [];

	// Private functions
	var initWizard = function () {
		// Initialize form wizard
		_wizard = new KTWizard(_wizardEl, {
			startStep: 1, // initial active step number
			clickableSteps: true  // allow step clicking
		});

		// // Validation before going to next page
		// _wizard.on('beforeNext', function (wizard) {
		// 	// Don't go to the next step yet
		// 	_wizard.stop();

		// 	// Validate form
		// 	var validator = _validations[wizard.getStep() - 1]; // get validator for currnt step
		// 	validator.validate().then(function (status) {
		// 		if (status == 'Valid') {
		// 			//alert('foe');

		// 			_wizard.goNext();
		// 			KTUtil.scrollTop();
		// 		} else {
		// 			Swal.fire({
		// 				text: "Sorry, looks like there are some errors detected, please try again.",
		// 				icon: "error",
		// 				buttonsStyling: false,
		// 				confirmButtonText: "Ok, got it!",
		// 				customClass: {
		// 					confirmButton: "btn font-weight-bold btn-light"
		// 				}
		// 			}).then(function () {
		// 				KTUtil.scrollTop();
		// 			});
		// 		}
		// 	});
		// });

		// // Change event
		// _wizard.on('change', function (wizard) {
		// 	KTUtil.scrollTop();
		// });

		
	}

	var initValidation = function () {
		// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
		// Step 1
		_validations.push(FormValidation.formValidation(
			_formEl,
			{
				fields: {
					fullname: {
						validators: {
							notEmpty: {
								message: 'Fullname card name is required'
							},
						}
					},
					gcash_mobile: {
						validators: {
							notEmpty: {
								message: 'Gcash card number is required'
							},
						}
					},
					transaction_id: {
						validators: {
							notEmpty: {
								message: 'Transaction I.D. month is required'
							}
						}
					},
					gcash_image: {
						validators: {
							notEmpty: {
								message: 'File image year is required'
							}
						}
					},
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					bootstrap: new FormValidation.plugins.Bootstrap()
				}
			}
		));

		//Submit event
		_wizard.on('submit', function (wizard) {
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
					// let formData = new FormData(myForm);
     //                	formData.append("action", btoa("setup_moderator"));
     //                	formData.append("type", "add_moderator");
     //                	formData.append("phonecode", $('select[name="country"] option:selected').attr('phonecode'));
     //                	if($('#profile_avatar')[0].files[0]){
	    //                 	formData.append("image", $('#profile_avatar')[0].files[0]);
	    //                 }
     //                    $.ajax({
     //                          url:  "controller/controller.php",
     //                          type: "POST",
     //                          data: formData,
     //                          contentType: false,
     //                          processData: false,
     //                          dataType:"json",
     //                          beforeSend: function(){
     //                              KTApp.blockPage('Processing...');
     //                          },
     //                          complete: function(){
     //                              KTApp.unblockPage();
     //                          },
     //                          success: function(response)
     //                          {    
     //                              if(response.status == "success"){
     //                              	let res=JSON.parse(window.atob(response.payload));
     //                                 if(res == true){
     //                                     Swal.fire({
					// 						text: "New "+$('select[name="role"]').val()+" was created!",
					// 						icon: "success",
					// 						showCancelButton: false,
					// 						buttonsStyling: false,
					// 						confirmButtonText: "Yes, submit!",
					// 						cancelButtonText: "No, cancel",
					// 						customClass: {
					// 							confirmButton: "btn font-weight-bold btn-primary",
					// 							cancelButton: "btn font-weight-bold btn-default"
					// 						}
					// 					}).then(function (result) {
     //                                          myForm.reset();
     //                                          $('#kt_wizard > div.wizard-nav > div > div:nth-child(1) > div').click();
					// 					})
     //                                 }else{
     //                                    Swal.fire("Oopps!", JSON.parse(window.atob(response.payload)), "info"); 
     //                                 }
     //                              }else if(response.status == "failed"){
     //                                 Swal.fire("Oopps!", response.message, "info");
     //                              }else if(response.status == "error"){
     //                                 Swal.fire("Oopps!", response.message, "info");
     //                              }else{
     //                                 Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
     //                                 console.log(JSON.parse(window.atob(response.payload)));
     //                              }
     //                          },
     //                          error: function(xhr,status,error){
     //                              console.log(xhr);
     //                              console.log(status);
     //                              console.log(error);
     //                              console.log(xhr.responseText);
     //                              Swal.fire("Oopps!", "Something went wrong, Please try again later", "info");
     //                          } 
     //                     })  
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

	return {
		// public functions
		init: function () {
			_wizardEl = KTUtil.getById('kt_wizard_v4');
			_formEl = KTUtil.getById('kt_form');

			initWizard();
			initValidation();
		}
	};
}();

jQuery(document).ready(function () {
	KTWizard4.init();
});
