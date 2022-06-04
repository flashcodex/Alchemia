"use strict";

// Class Definition
var KTLogin = function() {
    var _login;

    var _showForm = function(form) {
        var cls = 'login-' + form + '-on';
        var form = 'kt_login_' + form + '_form';

        _login.removeClass('login-forgot-on');
        _login.removeClass('login-signin-on');
        _login.removeClass('login-verify-on');

        _login.addClass(cls);

        KTUtil.animateClass(KTUtil.getById(form), 'animate__animated animate__backInUp');
    }
  var _handleSignInForm = function() {
        var validation;
        validation = FormValidation.formValidation(
            KTUtil.getById('kt_login_signin_form'),
            {
                fields: {
                    email: {
                        validators: {
                            notEmpty: {
                                message: 'Email/Username is required'
                            }
                        }
                    },
                    password: {
                        validators: {
                            notEmpty: {
                                message: 'Password is required'
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                    bootstrap: new FormValidation.plugins.Bootstrap()
                }
            }
        );

    $('#kt_login_signin_form').on('submit', function (e) {
            e.preventDefault();
            let element = this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    let formData = new FormData(element);
                    formData.append("action", btoa("sign-in"));
                    $.ajax({
                              url:  "login-controller/controller.php",
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
                                     if(res == "ip_check"){
                                            $("#pin_code_modal").modal('show');
                                            $('#pincode-input7').pincodeInput({hidedigits:false,inputs:6});
                                            $('#resendPin, #kt_login_signin_submit').prop('disabled', true);
                                            $("#kt_login_signin_submit").off('submit');
                                            let countDownDate = new Date(Date.now() + 10000).getTime();
                                            let x = setInterval(function() {
                                            let now = new Date().getTime();
                                            let distance = countDownDate - now;
                                            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
                                            $("#resendPin").text("Resend Verification code? ("+seconds+")");
                                            $("#kt_login_signin_submit").text("Sign In ("+seconds+")");
                                            if (distance < 0) {
                                            clearInterval(x);
                                            $("#resendPin").text("Resend Verification code?");
                                            $("#kt_login_signin_submit").text("Sign In");
                                            $('#resendPin, #kt_login_signin_submit').prop('disabled', false);
                                            }
                                            }, 1000);
                                     }else if(res == 'dashboard' || res=='members' || res=='topup' || res=='encashment' || res=='logs' || res=='profile' || res=='moderator'){
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
                                               window.location.replace("../"+res);
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
                } else {
                }
            });
        });

        // Handle forgot button
        $('#kt_login_forgot').on('click', function (e) {
            e.preventDefault();
            _showForm('forgot');
        });

        $('#verify').on("click", function(e){
            e.preventDefault();
              let formData = new FormData();
              formData.append("pin", $('#pincode-input7').val());
              formData.append("email", $('input[name="email"]').val());
              formData.append("action", btoa("verify-user"));
                        $.ajax({
                                url:  "login-controller/controller.php",
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
                                                 window.location.replace("../dashboard");
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
        
        });
         $("#resendPin").on('click',function(e){
            e.preventDefault();
            $('#kt_login_signin_form').trigger('submit');
         });

         $("#cancel").on('click',function(e) {
            e.preventDefault();
            $("#pin_code_modal").modal('hide');
            $('#pincode-input7').val('');
         });
    }

    var _handleForgotForm = function(e) {
        var validation;

        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validation = FormValidation.formValidation(
            KTUtil.getById('kt_login_forgot_form'),
            {
                fields: {
                    email: {
                        validators: {
                            notEmpty: {
                                message: 'Email address is required'
                            },
                            emailAddress: {
                                message: 'The value is not a valid email address'
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap()
                }
            }
        );

        // Handle submit button
        $('#kt_login_forgot_form').on('submit', function (e) {
            e.preventDefault();
            let element = this;

            validation.validate().then(function(status) {
                if (status == 'Valid') {
                let formData = new FormData(element);
                formData.append("action", btoa("forgot-pass"));
                        $.ajax({
                              url:  "login-controller/controller.php",
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
                                        swal.fire({
                                        text: "We have sent you a link to reset your password, Please check your email!",
                                        icon: "success",
                                        buttonsStyling: false,
                                        confirmButtonText: "Ok, got it!",
                                        customClass: {
                                            confirmButton: "btn font-weight-bold btn-light-primary"
                                        }
                                        }).then(function() {
                                            KTUtil.scrollTop();
                                            element.reset();
                                            _showForm('signin');
                                        });
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
                    
                } else {
                }
            });
        });

        // Handle cancel button
        $('#kt_login_forgot_cancel').on('click', function (e) {
            e.preventDefault();

            _showForm('signin');
        });
    }

       var _handlePassResetForm = function(e) {
        var validation;
        var form = KTUtil.getById('kt_login_passReset_form');

        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validation = FormValidation.formValidation(
            form,
            {
                fields: {
                    password: {
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
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap()
                }
            }
        );


        $('#kt_login_passReset_form').on('submit', function (e) {
            e.preventDefault();
            let element=this;
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                     let formData = new FormData(element);
                formData.append("action", btoa("reset-pass"));
                        $.ajax({
                              url:  "login-controller/controller.php",
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
                                        swal.fire({
                                        text: "Password reset successfully, You can proceed to login.",
                                        icon: "success",
                                        buttonsStyling: false,
                                        confirmButtonText: "Ok, got it!",
                                        customClass: {
                                            confirmButton: "btn font-weight-bold btn-light-primary"
                                        }
                                        }).then(function() {
                                            element.reset();
                                            location.replace("../login"); 
                                        });
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
                } else {
                }
            });
        });
    }

    // Public Functions
    return {
        // public functions
        init: function() {
            _login = $('#kt_login');
            if(document.getElementById('kt_login_passReset_form') !== null){
                _handlePassResetForm();
            }else{
                _handleSignInForm();
                _handleForgotForm();
            }

        }
    };
}();
 

// Class Initialization

jQuery(document).ready(function() {
    KTLogin.init();
});
