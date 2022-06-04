"use strict";
var APPHANDLER = (function () {
    //apphandlerglobal
    var new_txnid = "";
    var username1, username2, username3, username4, username5, username6, username7;
    var d = new Date();
    var genealogy = [];
    var uniqueChars = [];
    var option = "MONTH";
    var level = 1;
    var subpage = "";
    //apphandlerglobal

    //PACKAGE
    var package_cart = [];
    var package_selected;
    var code_selected;
    var address_used = "HOME";
    var address_status;

    var _init = async function () {
        _check_url(window.location.pathname);
        // _check_url(window.location.href);

        $(window).on("popstate", function (e) {
            e.preventDefault();
            location.reload();
        });

        Array.from($(".menu-link,#kt_header > div.header-top > div > div.topbar > div > a,.profile,.agreement")).forEach(function (element) {
            if (element.getAttribute("href")) {
                element.addEventListener("click", function (e) {
                    e.preventDefault();
                    $(".menu-item").removeClass("menu-item-active");
                    $("." + element.getAttribute("href") + "").addClass("menu-item-active");
                    _loadpage(element.getAttribute("href"));
                    // $('#kt_body').removeAttr('data-offcanvas-header-menu-wrapper');
                    // $(element).parent().addClass('menu-item-active');
                    // $('#kt_header_mobile_toggle').trigger('click');
                    // if($('#kt_header_menu_wrapper').hasClass('header-menu-wrapper-on')){
                    //   $('#kt_header_menu_wrapper').removeClass('header-menu-wrapper-on');
                    //   $('.header-menu-wrapper-overlay').remove();
                    //   $('#kt_body').removeAttr('data-offcanvas-header-menu-wrapper');
                    // }
                });
            }
        });
    };

    var _getParams = async function (url) {
        var params = {};
        var parser = document.createElement("a");
        parser.href = url;
        var query = parser.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
        return params;
    };
    var _check_url = async function (url) {
        let check = await _getParams(url);

        if (url.split("/")[1] == "pamantasanalchemia") {
            // alert('1');

            if (url.split("/")[4] == "agreement") {
                // alert('2');
                _loadpage("dashboard");
                $('.dashboard"]').addClass("menu-item-active");
            }
            else {
                // alert('3');
                _loadpage(url.split("/")[4]);
                $("." + url.split("/")[4] + "").addClass("menu-item-active");
            }
        }
        else {
            if (url.split("/")[2] == "app") {
                // alert('4');
                if (url.split("/")[3] == "agreement") {
                    // alert('5');
                    _loadpage("dashboard");
                    $(".dashboard").addClass("menu-item-active");
                }
                else {
                    // alert('6');
                    _loadpage(url.split("/")[3]);
                    $("." + url.split("/")[3] + "").addClass("menu-item-active");
                }
            }
            else {
                // alert('7');
                _loadpage("dashboard");
                $(".dashboard").addClass("menu-item-active");
            }
        }
    };
    var _removeData = function (arr, val) {
        var i;
        while ((i = arr.indexOf(val)) != -1) {
            arr.splice(i, 1);
        }
    };
    var _showToast = function (type, message) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer), toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
        });
        Toast.fire({ icon: type, title: message });
    };
    var _showSwal = function (type, message) {
        swal.fire({
            text: message,
            icon: type,
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
                confirmButton: "btn font-weight-bold btn-light-primary",
            },
        });
    };

    var _getlastpath = function (url) {
        let lastpath = url.split("/").pop();
        if (lastpath == "shop") {
            return false;
        } else if (lastpath == null || lastpath == "") {
            return false;
        } else {
            return lastpath;
        }
    };

    var _modal_image = function (image) {
        $("body").delegate("" + image + "", "click", function () {
            let modal = document.getElementById("TopupModal");
            let img = document.getElementsByTagName("img");
            let modalImg = document.getElementById("img01");

            modal.style.display = "block";

            if (this.src) {
                modalImg.src = this.src;
            } else {
                modalImg.src = $(this)
                    .css("background-image")
                    .replace(/^url\(['"]?/, "")
                    .replace(/['"]?\)$/, "");
            }
            $("#caption").empty().append($(this).attr("alt"));
        });
        $("body").delegate(".close,#TopupModal", "click", function () {
            let modal = document.getElementById("TopupModal");
            modal.style.display = "none";
        });
    };
    var _modal_description = function (id_modal) {
        $("body").delegate("" + id_modal + "", "click", function () {
            let r_description = $(this).attr("data-description");
            $(".title-header-description").text(r_description);
        });
    };
    var animateValueDecimal = function (obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = parseFloat(progress * (end - start) + start)
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,");
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };
    var animateValueInteger = function (obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = parseFloat(progress * (end - start) + start)
                .toFixed(0)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,");
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };
    var _initPINcode = function (btn, btn_text, type, duration, val) {
        $("#pin_code_modal").modal("show");
        $("#pincode-input7").pincodeInput({ hidedigits: false, inputs: 6 });
        $("#resendPin, " + btn + "").prop("disabled", true);
        $("" + btn + "").off("submit");
        let countDownDate = new Date(Date.now() + duration).getTime();
        let x = setInterval(function () {
            let now = new Date().getTime();
            let distance = countDownDate - now;
            let seconds = Math.floor((distance % (1000 * 300)) / 1000);
            $("#resendPin").text("Resend Verification code? (" + seconds + ")");
            $("" + btn + "").text("" + btn_text + " (" + seconds + ")");
            if (distance < 0) {
                clearInterval(x);
                $("#resendPin").text("Resend Verification code?");
                $("" + btn + "").text(btn_text);
                $("#resendPin, " + btn + "").prop("disabled", false);
            }
        }, 1000);
        $("#pin_code_modal").on("hidden.bs.modal", function () {
            $(this).find("input").val("");
        });
        $("#resendPin").on("click", function (e) {
            e.preventDefault();
            $("" + btn + "").click();
        });
        $("#verify").on("click", function (e) {
            e.preventDefault();
            _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Verifying..."), _constructForm(["user_verify", "verify_code_" + type, val, $("#pincode-input7").val()]));
        });
    };

    var _initAddr = function () {
        $('select[name="addr_region"]').on("change", function (e) {
            e.preventDefault();
            $('select[name="addr_province"]').empty().append('<option value="">Select Province</option>');
            $('select[name="addr_city"]').empty().append('<option value="">Select Province first</option>');
            $('select[name="addr_barangay"]').empty().append('<option value="">Select City first</option>');
            _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Processing..."), _constructForm(["user_address", "fetch_province", this.value]));
        });
        $('select[name="addr_province"]').on("change", function (e) {
            e.preventDefault();
            $('select[name="addr_city"]').empty().append('<option value="">Select City</option>');
            $('select[name="addr_barangay"]').empty().append('<option value="">Select City first</option>');
            _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Processing..."), _constructForm(["user_address", "fetch_city", this.value]));
        });
        $('select[name="addr_city"]').on("change", function (e) {
            e.preventDefault();
            $('select[name="addr_barangay"]').empty().append('<option value="">Select Barangay</option>');
            _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Processing..."), _constructForm(["user_address", "fetch_barangay", this.value]));
        });
    };
    var _initUserAddress = function (region, province, city, brgy) {
        if (region) {
            for (let i = 0; i < region.length; i++) {
                $('select[name="addr_region"]').append('<option value="' + region[i].code + '">' + region[i].region + "</option>");
            }
        }
        if (province) {
            for (let i = 0; i < province.length; i++) {
                $('select[name="addr_province"]').append('<option value="' + province[i].code + '">' + province[i].province + "</option>");
            }
        }
        if (city) {
            for (let i = 0; i < city.length; i++) {
                $('select[name="addr_city"]').append('<option value="' + city[i].code + '">' + city[i].city + "</option>");
            }
        }
        if (brgy) {
            for (let i = 0; i < brgy.length; i++) {
                $('select[name="addr_barangay"]').append('<option value="' + brgy[i].code + '">' + brgy[i].brgy + "</option>");
            }
        }
    };
    var _initGenealogy = function () {
        $("body").delegate(".image1", "click", function (e) {
            e.stopImmediatePropagation();
            if (username1 != "") {
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Processing..."), _constructForm(["user_genealogy", "fetch_genealogy", username1]));
            }
        });
        $("body").delegate(".image2", "click", function (e) {
            e.stopImmediatePropagation();
            if (username2 != "") {
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Processing..."), _constructForm(["user_genealogy", "fetch_genealogy", username2]));
            }
        });
        $("body").delegate(".image3", "click", function (e) {
            e.stopImmediatePropagation();
            if (username3 != "") {
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Processing..."), _constructForm(["user_genealogy", "fetch_genealogy", username3]));
            }
        });
        $("body").delegate(".image4", "click", function (e) {
            e.stopImmediatePropagation();
            if (username4 != "") {
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Processing..."), _constructForm(["user_genealogy", "fetch_genealogy", username4]));
            }
        });
        $("body").delegate(".image5", "click", function (e) {
            e.stopImmediatePropagation();
            if (username5 != "") {
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Processing..."), _constructForm(["user_genealogy", "fetch_genealogy", username5]));
            }
        });
        $("body").delegate(".image6", "click", function (e) {
            e.stopImmediatePropagation();
            if (username6 != "") {
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Processing..."), _constructForm(["user_genealogy", "fetch_genealogy", username6]));
            }
        });
        $("body").delegate(".image7", "click", function (e) {
            e.stopImmediatePropagation();
            if (username7 != "") {
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Processing..."), _constructForm(["user_genealogy", "fetch_genealogy", username7]));
            }
        });
    };
    var _sessionStorage = function (session, val) {
        // Check browser support
        if (typeof Storage !== "undefined") {
            sessionStorage.setItem(session, val);
        } else {
            console.log("Sorry, your browser does not support Web Storage...");
        }
    };
    var _getItem = function (session) {
        return sessionStorage.getItem(session);
    };
    // var setCookie = function(cname, cvalue, exdays) {
    //       return new Promise((resolve, reject) => {
    //         let y = true;
    //         var d = new Date();
    //         d.setTime(d.getTime() + (exdays*24*60*60*1000));
    //         var expires = "expires="+ d.toUTCString();
    //         if(window.location.pathname.split('/')[1] == 'matrix'){
    //           document.cookie = cname + "=" + cvalue + ";" + expires + ";"+"path=/"+";"+"domain=localhost";
    //         }else{
    //           document.cookie = cname + "=" + cvalue + ";" + expires + ";"+"path=/"+";"+"domain=matrix.com";
    //         }
    //           resolve(y)
    //       })
    // };

    // var getCookie = function(name){
    //  var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); return match ? match[1] : null;
    // };

    var _loadpage = function (page) {
        if (page.split("_")[1]) {
            val = page.split("_")[1];
        } else {
            val = false;
        }

        // alert(val);
        // alert(page);
        // val = '1';
        // page = 'material_1';

        $.ajax({
            url: "controller/controller.php",
            type: "POST",
            data: {
                page: page,
            },
            dataType: "html",
            beforeSend: function () {
                window.history.pushState(null, null, page);
                KTApp.blockPage({
                    overlayColor: "#000000",
                    state: "primary",
                });
                // KTApp.blockPage('Loading...');
                // $('.offcanvas-close, .offcanvas-overlay').trigger('click');
            },
            complete: function () {
                $("#kt_content").fadeIn(3000);
                $("html, body").animate({ scrollTop: 0 }, "slow");
                $("head > title")
                    .empty()
                    .append("Alchemia | " + page.split("_")[0].charAt(0).toUpperCase() + page.split("_")[0].slice(1));
                KTApp.unblockPage();
            },
            success: async function (response) {
                if (response) {
                    $("#kt_content").empty();
                    $("#kt_content")
                        .append(response)
                        .promise()
                        .done(function () {
                            _initview(page.split("_")[0], val);
                        });
                } else {
                }
            },
            error: function (xhr, status, error) {
                if (xhr.status == 200) {
                    Swal.fire("Ops!", "Check your internet connection.", "error");
                } else if (xhr.status == 500) {
                    Swal.fire("Ops!", "Internal error: " + xhr.responseText, "error");
                } else if (status == "error") {
                    Swal.fire({
                        title: "Oopps!",
                        text: "Your account was signed-out. See you again inside!",
                        icon: "info",
                        showCancelButton: false,
                        confirmButtonText: "Ok, Got it",
                        reverseButtons: true,
                    }).then(function (result) {
                        window.location.replace("../login");
                    });
                } else {
                    console.log(xhr);
                    console.log(status);
                    Swal.fire("Ops!", "Something went wrong..", "error");
                }
            },
        });
    };

    var _initview = async function (view) {
        // _remove_Unwanted_Elements(["body > div.zoomContainer"]);
        KTFormControls.init();
        //Maxlength_profile.init();
        _modal_image(".tba_image");
        switch (String(view)) {
            case "dashboard": {
                break;
            }
            case "material": {
                
                function all_material() {
                    var search = $(".search_material").val();
                    
                    _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading Profile..."), _constructForm(["dashboard", "fetch_material_header", val, search]));
                }


                all_material();
            
                function debounce(func, wait, immediate) {
                    var timeout;

                    return function executedFunction() {
                        var context = this;
                        var args = arguments;

                        var later = function () {
                            timeout = null;
                            if (!immediate) func.apply(context, args);
                        };

                        var callNow = immediate && !timeout;

                        clearTimeout(timeout);

                        timeout = setTimeout(later, wait);

                        if (callNow) func.apply(context, args);
                    };
                };
                    //etong part na to alam ko na , pag babalik lang sa default yan ihh  
                 var returnedFunction = debounce(function () {
                    all_material()
                }, 500);

                $("body").delegate(".search_material", "keyup", function (e) {
                    e.preventDefault();
                    returnedFunction()
                   
                    
                });

                $('.search_material').on('change textInput input', function (e) {
                    if ($(".search_material").val() == '') { 
                        returnedFunction()
                    }
                });                
            }
            case "profile": {
                if (subpage) {
                    $("." + subpage).click();
                } else {
                    if (_getItem("profile")) {
                        $('a[name="' + _getItem("profile") + '"]').click();
                    } else {
                        $('a[name="info_tab"],#info_tab').click();
                    }
                }
                Maxlength_profile.init();
                $("#kt_profile_aside > div > div > div.nav.nav-tabs > a").on("click", function (e) {
                    let element = $(this).attr("name");
                    _sessionStorage("profile", element);
                });
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading Profile..."), _constructForm(["user_profile", "profile"]));
                //_ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Profile...'), _constructForm(['user_address', 'address']));
                $(".verify-this").on("click", function (e) {
                    e.preventDefault();
                    let element = $(this).attr("data-verify");
                    if (element == "verify_email") {
                        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Verifying Email..."), _constructForm(["user_verify", element, $('input[name="email"').val()]));
                    } else if (element == "verify_mobile") {
                        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Verifying Mobile..."), _constructForm(["user_verify", element, $('input[name="mobile"').val()]));
                    }
                });
                $("#mobile").on("input", function (e) {
                    e.preventDefault();
                    if (($(this).val().length > 0 && $(this).val().substr(0, 3) != "+63") || $(this).val() == "") {
                        $(this).val("+63");
                    }
                });
                break;
            }
            case "module": {
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading Profile..."), _constructForm(["material", "material_name", val]));
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading Profile..."), _constructForm(["material", "material_list", val]));

                $("body").delegate(".view_page", "click", function (e) {
                    let element = $(this);
                    _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading Profile..."), _constructForm(["material", "material_details", element.attr("data-id")]));
                });

                $("body").delegate(".texttospeech", "click", function (e) {
                    let element = $(this);
                    let $synthes = new SpeechSynthesisUtterance(element.attr("data_content"));
                    speechSynthesis.speak($synthes);
                });

                $("body").delegate(".texttospeechstop", "click", function (e) {
                    let element = $(this);
                    speechSynthesis.cancel();
                });

                $("body").delegate(".test_btn", "click", function (e) {
                    let element = $(this);
                    var ans = element.attr("data_ans");
                    var ans_student = $('input[name="' + element.attr("data_id") + '"]').val();

                    if (ans.toLowerCase() == ans_student.toLowerCase()) {
                        _showSwal("success", "Your answer is correct");
                    } else {
                        _showSwal("error", "Sorry wrong answer, please try again");
                    }
                });

                $("body").delegate(".select_ans", "change", function (e) {
                    let element = $(this);
                    var ans = element.attr("data_ans");
                    var ans_student = $('select[name="' + element.attr("data_id") + '"]').val();

                    if (ans.toLowerCase() == ans_student.toLowerCase()) {
                        _showSwal("success", "Your answer is correct");
                    } else {
                        _showSwal("error", "Sorry wrong answer, please try again");
                    }
                });

                break;
            }
            case "quiz": {
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading Profile..."), _constructForm(["quiz", "quiz_fetch", val]));

                $("body").delegate(".btn_submit", "click", function (e) {
                    var score = 0;
                    Swal.fire({
                        text: "Are your sure? you want to submit this quiz? empty field consider as wrong",
                        icon: "question",
                        showCancelButton: true,
                        buttonsStyling: false,
                        confirmButtonText: "Yes, proceed!",
                        cancelButtonText: "No, cancel",
                        customClass: {
                            confirmButton: "btn font-weight-bold btn-warning",
                            cancelButton: "btn font-weight-bold btn-default",
                        },
                    }).then(function (result) {
                        if (result.value) {
                            var last_input = $("#quiz_form input, #quiz_form select").last().attr("data_id");
                            // alert('dsdas');
                            // alert($("#quiz_form input, #quiz_form select").length);
                            var quiz_items = $("#quiz_form input, #quiz_form select").length;
                            $("#quiz_form input, #quiz_form select").each(function (index) {
                                var input = $(this);
                                var key_to_correction = input.attr("data_ans").toString().toLowerCase();
                                var answer = input.val().toString().toLowerCase();

                                // alert(key_to_correction);
                                // alert(answer);
                                console.log(index);

                                if (key_to_correction == answer) {
                                    score = score + 1;
                                    console.log('correct');
                                    _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading Profile..."), _constructForm(["quiz_check", "quiz_checked", val, score, input.attr("data_id")]));
                                } else {
                                    console.log('wrong');

                                    score = score;
                                    _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading Profile..."), _constructForm(["quiz_check", "quiz_failed", val, score, input.attr("data_id")]));
                                }
                                if (last_input == input.attr("data_id")) {
                                    console.log('last');
                                    setTimeout(function () { _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading Profile..."), _constructForm(["quiz_check", "quiz_checking", val, score, quiz_items])); }, 1500);
                                }
                                console.log(score);
                            });
                        }
                    });
                });
                break;
            }
            case "viewresult": {
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["viewresult", "viewresult", val]));
                break;
            }
            case "report": {
                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["report", "report_quiz"]));
                break;
            }
            case "periodic": {
                var _gaq = _gaq || [];
                _gaq.push(["_setAccount", "UA-36251023-1"]);
                _gaq.push(["_setDomainName", "jqueryscript.net"]);
                _gaq.push(["_trackPageview"]);

                (function () {
                    var ga = document.createElement("script");
                    ga.type = "text/javascript";
                    ga.async = true;
                    ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
                    var s = document.getElementsByTagName("script")[0];
                    s.parentNode.insertBefore(ga, s);
                })();

                $("body").delegate(".grid-item", "click", function (e) {
                    $("#exampleModal").modal("show");
                });

                break;
            }
            case "flashcard": {
                if (val != "") {
                    _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["flashcard", "flashcard_view", val]));
                } else {
                    alert("foo");
                }

                break;
            }
            case "logout": {
                location.replace("../login/");
                break;
            }

            default:
                break;
        }
    };

    // start making formdata
    var _constructForm = function (args) {
        let formData = new FormData();
        for (var i = 1; args.length + 1 > i; i++) {
            formData.append("data" + i, args[i - 1]);
        }
        return formData;
    };
    // end making formdata

    var _constructBlockUi = function (type, element, message) {
        let formData = new FormData();
        formData.append("type", type);
        formData.append("element", element);
        formData.append("message", message);
        if (formData) {
            return formData;
        }
    };

    var _construct = async function (response, type, element, customBtn) {
        switch (type) {
            case "dashboard": {
                // if(response!=false){
                //     for (var i = 0; response.length > i; i++){
                //      const obj1=document.getElementById("total-sale");animateValueDecimal(obj1, 0, response[i].generated_sales, 1000);
                //      const obj2=document.getElementById("total-confirmed");animateValueInteger(obj2, 0, response[i].confirmed, 1000);
                //      const obj3=document.getElementById("total-delivered");animateValueInteger(obj3, 0, response[i].delivered, 1000);
                //      const obj4=document.getElementById("total-cancelled");animateValueInteger(obj4, 0, response[i].cancelled, 1000);
                //      const obj5=document.getElementById("total-pending");animateValueInteger(obj5, 0, response[i].pending, 1000);
                //      const obj6=document.getElementById("total-rts");animateValueInteger(obj6, 0, response[i].rts, 1000);
                //     }
                // }
                break;
            }

            case "profile": {
                if (response != false) {
                    if (response.country) {
                        let optgroup = '<optgroup label="Other countries">';
                        for (let i = 0; i < response.country.length; i++) {
                            if (response.country[i].iso == "PH" || response.country[i].iso == "US" || response.country[i].iso == "GB") {
                                $('select[name="country"]').append('<option phonecode="' + response.country[i].phonecode + '" value="' + response.country[i].iso + '">' + response.country[i].country_name + "</option>");
                            } else {
                                optgroup += '<option phonecode="' + response.country[i].phonecode + '" value="' + response.country[i].iso + '">' + response.country[i].country_name + "</option>";
                            }
                        }
                        $('select[name="country"]').append(optgroup + "</optgroup>");
                    }
                    if (response.country) {
                        let optgroup = '<optgroup label="Others">';
                        for (let i = 0; i < response.country.length; i++) {
                            if (response.country[i].iso == "PH") {
                                $('select[name="phonecode"]').append('<option value="' + response.country[i].phonecode + '">+' + response.country[i].phonecode + "</option>");
                            } else {
                                optgroup += '<option value="' + response.country[i].phonecode + '">+' + response.country[i].phonecode + "</option>";
                            }
                        }
                        $('select[name="phonecode"]').append(optgroup + "</optgroup>");
                    }
                    if (response.bank) {
                        for (let i = 0; i < response.bank.length; i++) {
                            $('select[name="mop"]').append('<option value="' + response.bank[i].mop_code + '">' + response.bank[i].description + "</option>");
                        }
                    }
                    $("#kt_profile_avatar").on("change", function (e) {
                        e.preventDefault();
                        if ($("#profile_avatar")[0].files[0]) {
                            _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Saving..."), _constructForm(["user_profile", "save_profile_image", $("#profile_avatar")[0].files[0]]));
                        }
                    });
                    if (response.profile) {
                        $('input[name="fname"]').val(response.profile.fname);
                        $('input[name="mname"]').val(response.profile.mname);
                        $('input[name="lname"]').val(response.profile.lname);
                        $("#kt_profile_avatar").css("background-image", "url(../../images/user_images/" + response.profile.image + ")");
                        $('select[name="country"] option[value="' + response.profile.country + '"]')
                            .prop("selected", true)
                            .change();
                        $('select[name="phonecode"] option[value="' + response.profile.phone_code + '"]')
                            .prop("selected", true)
                            .change();
                        $('input[name="city"]').val(response.profile.city);
                        $('input[name="mobile"]').val(response.profile.mobile);
                        $('input[name="email"]').val(response.profile.email);
                        $('input[name="username"]').val(response.profile.username);
                        $('input[name="bday"]').val(response.profile.birthday);
                        if (response.profile.email_verified == 1) {
                            $("#contact_info_form > div.card.card-custom.h-xl-600px > div.card-body > div:nth-child(6) > div > div.input-group.input-group-lg.input-group-solid > div.input-group-append")
                                .empty()
                                .append(
                                    '\
                                        <span class="input-group-text text-primary">\
                                           Verified<i class="fas fas fa-check text-primary ml-3"></i>\
                                        </span>'
                                );
                            $('input[name="email"]').attr("disabled", true);
                        }
                        if (response.profile.mobile_verified == 1) {
                            $("#contact_info_form > div.card.card-custom.h-xl-600px > div.card-body > div:nth-child(5) > div > div > div.input-group-append")
                                .empty()
                                .append(
                                    '\
                                        <span class="input-group-text text-primary">\
                                           Verified<i class="fas fas fa-check text-primary ml-3"></i>\
                                        </span>'
                                );
                            $('input[name="mobile"]').attr("disabled", true);
                        }
                        // sidebar
                        $(".full_name").text(response.profile.fname + " " + response.profile.lname);
                        $(".user_type").text("#" + response.profile.username);
                        $(".image")
                            .empty()
                            .append(
                                response.profile.image == "default.png"
                                    ? '<span class="font-size-h3 symbol-label font-weight-boldest text-uppercase">' + response.profile.fname[0] + "</span>"
                                    : '<div class="symbol-label"  style="background-image:url(../../images/user_images/' + response.profile.image + ')"><i class="symbol-badge symbol-badge-bottom bg-success"></div>'
                            );

                        //bank
                        $('input[name="acc_name"]').val(response.profile.acc_name);
                        $('input[name="acc_number"]').val(response.profile.acc_number);
                        $('input[name="acc_mobile"]').val(response.profile.acc_mobile);
                        $('select[name="mop"] option[value="' + response.profile.mop + '"]').prop("selected", true);
                    }
                    if (response.avatar) {
                        for (let i = 0; i < response.avatar.length; i++) {
                            $("#avatars").append(
                                '<div class="col-3 mr-5">\
                                            <a href="javascript:void(0)" class="btn btn-block text-dark-50 text-center btn-pill">\
                                            <span class="svg-icon svg-icon-2x svg-icon-primary">\
                                            <div class="overlay">\
                                            <div class="overlay-wrapper rounded bg-light text-center">\
                                            <div class="symbol symbol-80 symbol-sm-120 symbol-circle symbol-success overflow-hidden">\
                                            <span class="symbol-label">\
                                            <img id="this_avatar" src="../../images/avatars/' +
                                response.avatar[i].value +
                                '" alt="" class="mw-100 w-auto">\
                                            </span>\
                                            </div>\
                                            </div>\
                                            <div class="overlay-layer px-18">\
                                            <button class="btn btn-sm btn-light font-weight-boldest btn-pill" this_avatar data-id="' +
                                response.avatar[i].value +
                                '">Select</button>\
                                            </div>\
                                            </div>\
                                            </span>\
                                            </a>\
                                            </div>'
                            );
                        }
                    }
                    $("button[this_avatar]").on("click", function (e) {
                        e.preventDefault();
                        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Saving..."), _constructForm(["user_profile", "save_profile_image", "", $(this).attr("data-id"), "avatar"]));
                    });

                    $("#bank_info_form > div > div.card-header.py-3 > div.card-toolbar > a").on("click", function () {
                        address = "new_address";
                        shipping_addr = "";
                        $(".title-header").text("Add Address");
                        $("#add_address").modal("show");
                    });
                    if (response.region) {
                        for (let i = 0; i < response.region.length; i++) {
                            $('select[name="addr_region"]').append('<option value="' + response.region[i].code + '">' + response.region[i].region + "</option>");
                        }
                        // $('.kt-selectpicker').selectpicker();
                    }
                    _initAddr();
                } else {
                    // _showToast('info','Nothing Changes');
                    _showSwal("error", "Oopps! Something went wrong, please check your internet connection");
                }
                break;
            }
            case "verify_code_email":
            case "verify_email": {
                if (response == true) {
                    $("#pin_code_modal").modal("hide");
                    _showSwal("success", "Your email is now verified!");
                    $("#contact_info_form > div.card.card-custom.h-xl-600px > div.card-body > div:nth-child(6) > div > div.input-group.input-group-lg.input-group-solid > div.input-group-append")
                        .empty()
                        .append(
                            '\
                                        <span class="input-group-text text-primary">\
                                           Verified<i class="fas fas fa-check text-primary ml-3"></i>\
                                        </span>'
                        );
                    $('input[name="email"]').attr("disabled", true);
                    $("#kt_quick_user > div.offcanvas-content.pr-5.mr-n5.scroll.ps > div.d-flex.align-items-center.mt-5 > div.d-flex.flex-column > div > a.navi-item > span > span.navi-text.text-muted.text-hover-primary").text(
                        $('input[name="email"]').val()
                    );
                } else if (response == "verify") {
                    _initPINcode(".verify_email", "Verify", "email", 30000, $('input[name="email"]').val());
                } else {
                    _showSwal("info", response);
                }
                break;
            }
            case "verify_code_mobile":
            case "verify_mobile": {
                if (response == true) {
                    $("#pin_code_modal").modal("hide");
                    _showSwal("success", "Your mobile number is now verified!");
                    $("#contact_info_form > div.card.card-custom.h-xl-600px > div.card-body > div:nth-child(5) > div > div > div.input-group-append")
                        .empty()
                        .append(
                            '\
                                        <span class="input-group-text text-primary">\
                                           Verified<i class="fas fas fa-check text-primary ml-3"></i>\
                                        </span>'
                        );
                    $('input[name="mobile"]').attr("disabled", true);
                } else if (response == "verify") {
                    _initPINcode(".verify_mobile", "Verify", "mobile", 300000, $('input[name="mobile"]').val());
                } else {
                    _showSwal("info", response);
                }
                break;
            }
            case "save_profile_image": {
                _showToast(response.type, response.message);
                if (response.result != false) {
                    $("#kt_profile_avatar > div").css("background-image", "url(../)");
                    $("#kt_header_mobile_topbar_toggle > span > div").css("background-image", "url(../../images/user_images/" + response.image + ")");
                    $("#kt_profile_avatar").css("background-image", "url(../../images/user_images/" + response.image + ")");
                    $("#kt_quick_user > div.offcanvas-content.pr-5.mr-n5.scroll > div.d-flex.align-items-center.mt-5 > div.symbol.symbol-100.mr-5.symbol-light-primary,#kt_quick_user_toggle > span")
                        .empty()
                        .append('<div class="symbol-label" style="background-image:url(../../images/user_images/' + response.image + ')"></div>');
                    $(".image")
                        .empty()
                        .append('<div class="symbol-label" style="background-image:url(../../images/user_images/' + response.image + ')"></div>');
                }
                break;
            }

            case "address": {
                if (response != false) {
                    let container = $("#bank_info_form > div > div.card-body.px-md-30");
                    container.empty();
                    for (let i = 0; i < response.length; i++) {
                        let status = "";
                        if (response[i].addr_status == 1) {
                            status = '<span class="label label-primary label-inline font-weight-bolder ml-2">Default</span>';
                        }
                        let $html = $(
                            '<div class="dash-border py-5 gutter-b">\
                                  <div class="row d-flex justify-content-between px-5">\
                                      <h5 class="font-weight-bold mb-6">' +
                            response[i].addr_type +
                            " Address " +
                            status +
                            '</h5>\
                                      <div class="btn-toolbar" role="toolbar">\
                                          <div class="btn-group mr-2" role="group">\
                                              <button type="button" class="btn btn-outline-secondary btn-icon" title="edit"><i class="la la-pencil-square-o"></i></button>\
                                              <button type="button" class="btn btn-outline-secondary btn-icon" title="delete"><i class="la la-remove"></i></button>\
                                              <button type="button" class="btn btn-outline-secondary btn-icon" title="default"><i class="la la-star-o"></i></button>\
                                          </div>\
                                      </div>\
                                  </div>\
                                  <div class="d-flex justify-content-center align-items-center">\
                                    <label class="col-xl-3 col-lg-3 col-form-label">Full name</label>\
                                    <div class="col-lg-9 col-xl-6">\
                                      <span class="font-weight-bolder">' +
                            response[i].addr_name +
                            '</span>\
                                    </div>\
                                  </div>\
                                  <div class="d-flex justify-content-center align-items-center">\
                                    <label class="col-xl-3 col-lg-3 col-form-label">Contact:</label>\
                                    <div class="col-lg-9 col-xl-6">\
                                        <span class="font-weight-bolder">' +
                            response[i].addr_mobile +
                            " | " +
                            response[i].addr_email +
                            '</span>\
                                    </div>\
                                  </div>\
                                  <div class="d-flex justify-content-center align-items-center">\
                                    <label class="col-xl-3 col-lg-3 col-form-label">Address</label>\
                                    <div class="col-lg-9 col-xl-6">\
                                        <span class="font-weight-bolder">' +
                            response[i].addr_street +
                            '</br></span>\
                                        <span class="font-weight-bolder">' +
                            response[i].addr_barangay +
                            ", " +
                            response[i].addr_city +
                            "  " +
                            response[i].addr_postal +
                            '</br></span>\
                                        <span class="font-weight-bolder">' +
                            response[i].addr_province +
                            ", " +
                            response[i].addr_region +
                            "</span>\
                                    </div>\
                                  </div>\
                                </div>"
                        );
                        container
                            .append($html)
                            .promise()
                            .done(function () {
                                let id = response[i].id;
                                if (response[i].addr_status == 1) {
                                    $("div:nth-child(" + (i + 1) + ") > div.row.d-flex.justify-content-between.px-5 > div > div > button:nth-child(3)").addClass("active");
                                }
                                $("div:nth-child(" + (i + 1) + ") > div.row.d-flex.justify-content-between.px-5 > div > div > button:nth-child(1)").on("click", function (e) {
                                    e.preventDefault();
                                    shipping_addr = id;
                                    address = "update_address";
                                    _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Processing..."), _constructForm(["user_address", "get_shipping_address", id]));
                                });
                                $("div:nth-child(" + (i + 1) + ") > div.row.d-flex.justify-content-between.px-5 > div > div > button:nth-child(3)").on("click", function (e) {
                                    e.preventDefault();
                                    shipping_addr = id;
                                    _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Processing..."), _constructForm(["user_address", "update_default", id]));
                                });
                                $("div:nth-child(" + (i + 1) + ") > div.row.d-flex.justify-content-between.px-5 > div > div > button:nth-child(2)").on("click", function (e) {
                                    e.preventDefault();
                                    shipping_addr = id;
                                    _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Processing..."), _constructForm(["user_address", "delete_address", id]));
                                });
                            });
                    }
                } else {
                    $("#bank_info_form > div > div.card-body.px-md-30").empty().append('<p class="font-weight-boldest display-5 ">No shipping address.</p>');
                }
                break;
            }
            case "fetch_province": {
                if (response != false) {
                    $('select[name="addr_province"]').empty().append('<option value="">Select Province</option>');
                    for (let i = 0; i < response.province.length; i++) {
                        $('select[name="addr_province"]').append('<option value="' + response.province[i].code + '">' + response.province[i].province + "</option>");
                    }
                } else {
                    _showSwal("error", "Oopps! Something went wrong, please check your internet connection");
                }
                break;
            }
            case "fetch_city": {
                if (response != false) {
                    $('select[name="addr_city"]').empty().append('<option value="">Select City</option>');
                    for (let i = 0; i < response.city.length; i++) {
                        $('select[name="addr_city"]').append('<option value="' + response.city[i].code + '">' + response.city[i].city + "</option>");
                    }
                } else {
                    _showSwal("error", "Oopps! Something went wrong, please check your internet connection");
                }
                break;
            }
            case "fetch_barangay": {
                if (response != false) {
                    for (let i = 0; i < response.barangay.length; i++) {
                        $('select[name="addr_barangay"]').append('<option value="' + response.barangay[i].code + '">' + response.barangay[i].barangay + "</option>");
                    }
                } else {
                    _showSwal("error", "Oopps! Something went wrong, please check your internet connection");
                }
                break;
            }
            case "fetch_material_header": {
                //pagkatawag nung sql. dito papasok sa if(reponse.length) ulit
                //pwede ba mag return ng false yung sql pag walang nakita na like nung nasa searchbar ?
                // yun talaga ginagawa nia. nag rereturn ng false. Kaso since tinawag ulit. mawawala yung false
                
                 if (response.length) {
                    $(".modules").empty();
                    $(".modules_lock").empty();
               
                    var module = [];

                    
                    var search = $(".search_material").val();
                   
                    // pwede ba dito tawadin yung funtion tapos pag nag reten ng false gagawin nya din yang nasa condition
                    // lalagyan din dito nung natawag ng sql? oo ttry
                 // AHAHHA DI NA NAKATAPOS. tinawag ng tinawag umiikot lang yun dito
                

                   // yung nag lalabas ng false. pero since natatawag lahat ng module. wala din tong false na to. kasi walang array sa module na result
                    if (search == '' ) {
                        $('#left-side').hide();
                        $("#right-side").attr("class", "col-12 col-md-12 col-lg-12");
                    
                    } 

                    else {
                        $('#left-side').show();
                        $("#right-side").attr("class", "col-12 col-md-8 col-lg-8");
                    }
                    $('#module-lessons div').remove();
                    for (var i = 0; i < response.length; i++) {
                        if (!module.includes(response[i].id)) {
                            var search = $(".search_material").val();
                            if (search ) {
                                elemHtml = ` <div class="col-12">                                                
                                                <span style="font-size:2rem;font-weight:500;">${response[i].name}</span>
                                                <div id="module_lesson-${response[i].id}">
                                                    <div class="col-12">
                                                        <span style="font-size:1.5rem;font-weight: 500;">- ${response[i].topic_name}</span>
                                                    </div>
                                                </div>
                                            </div>`;

                                $('#module-lessons').append(elemHtml)

                                module.push(response[i].id);
                                // console.log(module);
                            }
                           

                            var myArray = ["success", "info", "warning", "danger", "primary", "dark"];
                            var rand = myArray[(Math.random() * myArray.length) | 0];

                            var lesson = `<a href="module_${response[i].id}"><span id="total-sale" class="font-size-h5">Lesson</span></a> |`;
                            var flashcard = `<a href="flashcard_${response[i].id}"><span id="total-sale" class="font-size-h5">Flashcard</span></a>`;
                            var quiz = ` | <a href="quiz_${response[i].id}"><span id="total-sale" class="font-size-h5">Quiz</span></a>`;

                            var result = ((response[i].user_topics / response[i].topics) * 100 || 0);

                            var progress = `<hr><span class="font-weight-bold text-dark-75 font-size-h3">
                                        
                                            Lessons Taken : ${response[i].user_topics} / ${response[i].topics}
                                            
                                        </span>
                                        <div class="progress mt-4" style="height:20px;">
                                            <div style="width:${result}%" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="${response[i].user_topics}" aria-valuemin="0" aria-valuemax="${response[i].topics}"></div>
                                        </div>`;

                            if (response[i].user_status == 2) {

                            }
                            else if (response[i].user_status == 0 || response[i].user_status == 1) {
                                quiz = ``;
                            }
                            else {
                                lesson = '<br><hr><span class="fa fa-lock mr-2"></span> <span class="font-weight-bold text-dark-75 font-size-h3">Module Locked</span>';
                                flashcard = ``;
                                quiz = ``;
                                progress = ``;
                            }

                            var elemHtml = `
                                    ${lesson}
                                    ${flashcard}
                                    ${quiz}
                                    `;

                            if (response[i].status == "1") {
                                // `${response} asd asda s
                                $(".modules").append(
                                    `
                                <div class="col-xl-4 col-md-4 col-sm-6">
                                    <div
                                        class="card card-custom wave wave-animate-slow wave-${rand} bgi-no-repeat card-stretch gutter-b"
                                        style="background-position: right top; background-size: 30% auto; background-image: url(assets/media/svg/shapes/abstract-1.ssvg);"
                                    >
                                        <div class="card-body">
                                            <div class="d-flex align-items-center">
                                                <span class="symbol symbol-50 symbol-light-info mr-2">
                                                    <span class="symbol-label">
                                                        <span class="svg-icon svg-icon-xl svg-icon-info">
                                                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                    <rect x="0" y="0" width="24" height="24" />
                                                                    <path
                                                                        d="M13.6855025,18.7082217 C15.9113859,17.8189707 18.682885,17.2495635 22,17 C22,16.9325178 22,13.1012863 22,5.50630526 L21.9999762,5.50630526 C21.9999762,5.23017604 21.7761292,5.00632908 21.5,5.00632908 C21.4957817,5.00632908 21.4915635,5.00638247 21.4873465,5.00648922 C18.658231,5.07811173 15.8291155,5.74261533 13,7 C13,7.04449645 13,10.79246 13,18.2438906 L12.9999854,18.2438906 C12.9999854,18.520041 13.2238496,18.7439052 13.5,18.7439052 C13.5635398,18.7439052 13.6264972,18.7317946 13.6855025,18.7082217 Z"
                                                                        fill="#000000"
                                                                    />
                                                                    <path
                                                                        d="M10.3144829,18.7082217 C8.08859955,17.8189707 5.31710038,17.2495635 1.99998542,17 C1.99998542,16.9325178 1.99998542,13.1012863 1.99998542,5.50630526 L2.00000925,5.50630526 C2.00000925,5.23017604 2.22385621,5.00632908 2.49998542,5.00632908 C2.50420375,5.00632908 2.5084219,5.00638247 2.51263888,5.00648922 C5.34175439,5.07811173 8.17086991,5.74261533 10.9999854,7 C10.9999854,7.04449645 10.9999854,10.79246 10.9999854,18.2438906 L11,18.2438906 C11,18.520041 10.7761358,18.7439052 10.4999854,18.7439052 C10.4364457,18.7439052 10.3734882,18.7317946 10.3144829,18.7082217 Z"
                                                                        fill="#000000"
                                                                        opacity="0.3"
                                                                    />
                                                                </g>
                                                            </svg>
                                                        </span>
                                                    </span>
                                                </span>
                                                <span class="font-weight-bold text-dark-75 font-size-h2">
                                                     ${response[i].name} <br />
                                                    <span class="font-weight-bold font-size-h6">${response[i].date_created}</span>
                                                </span>
                                            </div>
                                            <span
                                                id="module_actions-${response[i].id}"
                                                class="card-title font-weight-bolder text-dark-75 display5 mb-0 mt-6 text-hover-primary"
                                            >
                                            
                                                ${elemHtml}
                                                
                                            </span>
                                            ${progress}
                                            <br>
                                            <p style="font-size:12px; font-weight: bold">Topics:<br>${response[i].lessons}</p> 
                                        </div>
                                        
                                    </div>
                                </div>
                                `
                                );
                            }
                        }
                        else {
                            var search = $(".search_material").val();
                            if (search) {
                                elemHtml = `<div class="col-12">                                                
                                                <span style="font-size:1.5rem;font-weight: 500;">- ${response[i].topic_name}</span>
                                            </div>`;

                                $(`#module_lesson-${response[i].id}`).append(elemHtml)
                                // console.log('prevent append');
                            }

                            // module.push(response[i].id);

                        }
                    }
                }
                else {
            
                    _showToast(response.type,response.message);
                    //ito yung tmatawag ng sql. 
                    $(".modules").empty();
                    $(".modules_lock").empty();
                    $('#left-side').hide();

                    

                   
                }
            
                
                break;
            
            }
            case "material_name": {
                console.log('material name');
                console.log(response);

                $(".module_name").empty();
                $(".module_name").append(response.name);
                break;
            }
            case "material_list": {
                console.log('material list');
                console.log(response);

                if (response.length) {
                    $(".list_page").empty();

                    var user_topics = await Material.api.get.userTopicTakenQuiz();

                    console.log(user_topics.data);

                    $(".list_page").append(`
                        <li class="navi-item text-center">
                            <h2>Lessons</h2>
                        </li>
                    `);

                    for (var i = 0; i < response.length; i++) {
                        var user_topic = {};

                        var lock = `<span class="fa fa-lock"></span>`;
                        var lock_style = `color: black !important;`;
                        var active = ``;
                        var redirect = ``;

                        if (response[i].name == "main_page") {
                            var name = "Main Page";

                            lock = ``;
                            active = `active`;
                            redirect = `view_page`;
                            lock_style = ``;
                        } else {
                            var name = response[i].name;

                            user_topic = user_topics.data.find(e => e.topic_id == response[i].id);
                            // user_topics.data['topic_id'] =
                            console.log(user_topic);

                            if (response[i].with_quiz && user_topic && user_topic.status == 1) {
                                lock = ``;
                                active = `active`;
                                redirect = `view_page`;
                                lock_style = '';
                            }
                            else if (user_topic && user_topic.status == 1) {
                                redirect = `view_page`;
                                lock_style = '';
                            }
                        }

                        $(".list_page").append(`
                            <li class="navi-item" id="nav-topic-${response[i].id}">
                                <a class="topic-${response[i].id} navi-link ${redirect} ${active}" style="${lock_style}" data-toggle="tab" data-id="${response[i].id}">
                                    <span class="navi-text" style="${lock_style}">
                                    ${name} ${lock}
                                    </span>
                                </a>
                            </li>
                        `);
                    }

                    Material.lookUpDataTopics = response;
                    Material.addEvents();
                    var next_topic = $('#next_topic').val();

                    // alert(next_topic);

                    // box-shadow: 0 0 5px #0c36d7;

                    if (next_topic > 0) {
                        // alert('next click');
                        $('.topic-' + next_topic).click();
                    }
                    else {
                        next_topic = response[0].id;
                        $('.topic-' + next_topic).click();
                    }

                    $(".navi-item").removeClass("using");
                    $('#nav-topic-' + next_topic).addClass("using");

                    _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading Profile..."), _constructForm(["material", "material_details", next_topic]));
                }
                break;
            }
            case "material_details": {
                if (response.length) {
                    $(".cover_page").empty();

                    for (var i = 0; i <= response.length - 1; i++) {
                        var type = response[i].setting;
                        var p_color = response[i].p_setting;

                        if (p_color != null) {
                            var color = p_color.split(";");
                            var color = color[0];
                        } else {
                            var color = "color:black";
                        }

                        // /alert(i);
                        if (response[i].data_type == "heading") {
                            if (response[i].content !== null) {
                                var array = type.split(",");

                                // /alert(type);
                                $(".cover_page").append(
                                    '\
                                <div class=""  data_type="heading" data_action="rearrange" data_content="' +
                                    response[i].content +
                                    '" data_id="' +
                                    response[i].data_id +
                                    '" data_arrange="' +
                                    response[i].data_arrange +
                                    '">\
                                    <div class="-handle ' +
                                    array[1] +
                                    '">\
                                        <' +
                                    array[0] +
                                    ">" +
                                    response[i].content +
                                    "</" +
                                    array[0] +
                                    ">\
                                    </div>\
                                </div>"
                                );
                            } else {
                                $(".cover_page").append(
                                    '\
                                <div class=""  data_type="heading" data_action="rearrange" data_content="" data_id="' +
                                    response[i].data_id +
                                    '" data_arrange="' +
                                    response[i].data_arrange +
                                    '">\
                                    <div class="-handle text-center">\
                                        <i class="fas fa-heading display2 display3-lg" ></i><br>Heading\
                                    </div>\
                                </div>'
                                );
                            }
                        } else if (response[i].data_type == "spacer") {
                            if (response[i].setting !== null) {
                                $(".cover_page").append(
                                    '\
                                <div class=" "  data_type="spacer" data_action="rearrange" data_content="' +
                                    response[i].content +
                                    '" data_id="' +
                                    response[i].data_id +
                                    '" data_arrange="' +
                                    response[i].data_arrange +
                                    '">\
                                    <div class="-handle text-left p-' +
                                    type +
                                    '" style="bor">\
                                    </div>\
                                </div>'
                                );
                            } else {
                                $(".cover_page").append(
                                    '\
                                <div class=""   data_type="spacer" data_action="rearrange" data_content=""  data_id="' +
                                    response[i].data_id +
                                    '" data_arrange="' +
                                    response[i].data_arrange +
                                    '">\
                                    <div class="-handle text-center">\
                                        <i class="fas fa-grip-lines display2 display3-lg" ></i><br>Spacer\
                                    </div>\
                                </div>'
                                );
                            }
                        } else if (response[i].data_type == "audio") {
                            if (response[i].setting !== null) {
                                $(".cover_page").append(
                                    '\
                                <div class="draggable "  data_type="audio" data_action="rearrange" data_content="' +
                                    response[i].content +
                                    '" data_id="' +
                                    response[i].data_id +
                                    '" data_arrange="' +
                                    response[i].data_arrange +
                                    '">\
                                    <div class="draggable-handle text-left p-3"  style="border:1px dashed black;">\
                                    ' +
                                    response[i].content +
                                    '\
                                    </div>\
                                    <button class="texttospeech btn btn-primary" data_content="' +
                                    response[i].content +
                                    '"><i class="fas fa-play"></i> Play Sound</button>\
                                    <button class="texttospeechstop btn btn-danger"><i class="fas fa-stop-circle"></i> Stop</button>\
                                </div>'
                                );
                            } else {
                                $(".cover_page").append(
                                    '\
                                <div class="draggable"   data_type="audio" data_action="rearrange" data_content=""  data_id="' +
                                    response[i].data_id +
                                    '" data_arrange="' +
                                    response[i].data_arrange +
                                    '">\
                                    <div class="draggable-handle text-center">\
                                        <i class="far fa-file-audio display2 display3-lg" ></i><br>Audio\
                                    </div>\
                                </div>'
                                );
                            }
                        } else if (response[i].data_type == "phrase") {
                            if (response[i].content !== null) {
                                var content = response[i].content.replace("'", "");

                                $(".cover_page").append(
                                    '\
                               <div class=""  data_type="phrase" data_action="rearrange" data_content=\'' +
                                    content +
                                    "' data_id=\"" +
                                    response[i].data_id +
                                    '" data_arrange="' +
                                    response[i].data_arrange +
                                    '">\
                                            <div class="-handle ' +
                                    type +
                                    '" >\
                                                ' +
                                    content +
                                    "\
                                            </div>\
                                        </div>"
                                );
                            } else {
                                $(".cover_page").append(
                                    '\
                               <div class=""  data_type="phrase" data_action="rearrange" data_content="" data_id="' +
                                    response[i].data_id +
                                    '" data_arrange="' +
                                    response[i].data_arrange +
                                    '">\
                                            <div class="-handle text-center" >\
                                                <i class="fab fa-stack-exchange display2 display3-lg"></i><br>Text and Image\
                                            </div>\
                                        </div>'
                                );
                            }
                        } else if (response[i].data_type == "identify") {
                            if (response[i].content !== null) {
                                //var array = type.split(",");
                                $(".cover_page").append(
                                    '\
                               <div class=""  data_type="identify" data_action="rearrange" data_content="' +
                                    response[i].content +
                                    '" data_id="' +
                                    response[i].data_id +
                                    '" data_arrange="' +
                                    response[i].data_arrange +
                                    '" data_ans="' +
                                    response[i].data_ans +
                                    '">\
                                            <div class="-handle ' +
                                    type +
                                    '" >\
                                              <div class="form-group row ">\
                            <div class="col-4 col-md-2">\
                             <input class="form-control  form-control-solid" type="text" name="' +
                                    response[i].data_id +
                                    '" id="example-text-input"/>\
                            </div>\
                            <label  class="col-8 col-md-10 col-form-label" style="' +
                                    color +
                                    '">' +
                                    response[i].content +
                                    ' <br><br>\
                                <button class="btn btn-primary test_btn" data_ans="' +
                                    response[i].data_ans +
                                    '" data_id="' +
                                    response[i].data_id +
                                    '">Submit</button>\
                            </label>\
                      </div>\
                                        </div>'
                                );
                            } else {
                                $(".cover_page").append(
                                    '\
                               <div class=""  data_type="identify" data_action="rearrange" data_content="" data_id="' +
                                    response[i].data_id +
                                    '" data_arrange="' +
                                    response[i].data_arrange +
                                    '" data_ans="">\
                                            <div class="-handle text-center" >\
                                                <i class="fas fa-question display2 display3-lg"></i><br>Identification\
                                            </div>\
                                        </div>'
                                );
                            }
                        } else if (response[i].data_type == "tof") {
                            if (response[i].content !== null) {
                                //var array = type.split(",");
                                $(".cover_page").append(
                                    '\
                               <div class=""  data_type="tof" data_action="rearrange" data_content="' +
                                    response[i].content +
                                    '" data_id="' +
                                    response[i].data_id +
                                    '" data_arrange="' +
                                    response[i].data_arrange +
                                    '" data_ans="' +
                                    response[i].data_ans +
                                    '">\
                                            <div class="-handle ' +
                                    type +
                                    '" >\
                                              <div class="form-group row ">\
                            <div class="col-4 col-md-2">\
                             <select class="form-control form-control-solid select_ans" data_id="' +
                                    response[i].data_id +
                                    '" type="text" data_ans="' +
                                    response[i].data_ans +
                                    '" name="' +
                                    response[i].data_id +
                                    '">\
                             <option></option>\
                               <option value="true">True</option>\
                               <option value="false">False</option>\
                             </select>\
                            </div>\
                            <label  class="col-8 col-md-10 col-form-label" style="' +
                                    color +
                                    '">' +
                                    response[i].content +
                                    " <br><br>\
                      </div>\
                                        </div>"
                                );
                            } else {
                                $(".cover_page").append(
                                    '\
                               <div class=""  data_type="tof" data_action="rearrange" data_content="" data_id="' +
                                    response[i].data_id +
                                    '" data_arrange="' +
                                    response[i].data_arrange +
                                    '" data_ans="">\
                                            <div class="-handle text-center" >\
                                                <i class="fas fa-check-circle display2 display3-lg"></i><br>True or False\
                                            </div>\
                                        </div>'
                                );
                            }
                        } else if (response[i].data_type == "mc") {
                            if (response[i].content !== null) {
                                var choices = response[i].setting.split(",");
                                $(".cover_page").append(
                                    '\
                               <div class=""  data_type="mc" data_action="rearrange" data_content="' +
                                    response[i].content +
                                    '" data_id="' +
                                    response[i].data_id +
                                    '" data_arrange="' +
                                    response[i].data_arrange +
                                    '" data_choices="' +
                                    response[i].setting +
                                    '" data_ans="' +
                                    response[i].data_ans +
                                    '">\
                                            <div class="-handle " >\
                        <div class="form-group row ">\
                            <div class="col-4 col-md-2">\
                             <select class="form-control form-control-solid select_ans" data_id="' +
                                    response[i].data_id +
                                    '" type="text" data_ans="' +
                                    response[i].data_ans +
                                    '" name="' +
                                    response[i].data_id +
                                    '">\
                             <option></option>\
                               <option value="a">' +
                                    choices[0] +
                                    '</option>\
                               <option value="b">' +
                                    choices[1] +
                                    '</option>\
                               <option value="c">' +
                                    choices[2] +
                                    '</option>\
                               <option value="d">' +
                                    choices[3] +
                                    '</option>\
                             </select>\
                            </div>\
                            <label  class="col-8 col-md-10 col-form-label" style="' +
                                    color +
                                    '">' +
                                    response[i].content +
                                    '</label>\
                            <label  class="col-12 col-md-6 col-form-label text-center" style="' +
                                    color +
                                    '">a.) ' +
                                    choices[0] +
                                    '</label>\
                            <label  class="col-12 col-md-6 col-form-label text-center" style="' +
                                    color +
                                    '">b.) ' +
                                    choices[1] +
                                    '</label>\
                            <label  class="col-12 col-md-6 col-form-label text-center" style="' +
                                    color +
                                    '">c.) ' +
                                    choices[2] +
                                    '</label>\
                            <label  class="col-12 col-md-6 col-form-label text-center" style="' +
                                    color +
                                    '">d.) ' +
                                    choices[3] +
                                    "</label>\
                        </div>\
                                        </div>"
                                );
                            } else {
                                $(".cover_page").append(
                                    '\
                               <div class=""  data_type="mc" data_action="rearrange" data_content="" data_id="' +
                                    response[i].data_id +
                                    '" data_arrange="' +
                                    response[i].data_arrange +
                                    '" data_choices="" data_ans="">\
                                            <div class="-handle text-center" >\
                                                <i class="far fa-list-alt display2 display3-lg"></i><br>Multiple Choices\
                                            </div>\
                                        </div>'
                                );
                            }
                        } else if (response[i].data_type == "video") {
                            if (response[i].content !== null) {
                                var link = response[i].content;
                                var link = link.split("/");

                                if (link[2] == "www.youtube.com") {
                                    var link = link[3].replace("watch?v=", "");
                                    $(".cover_page").append(
                                        '\
                                 <div class=""  data_type="video" data_action="rearrange" data_content="' +
                                        response[i].content +
                                        '" data_id="' +
                                        response[i].data_id +
                                        '" data_arrange="' +
                                        response[i].data_arrange +
                                        '">\
                                              <div class="-handle ' +
                                        type +
                                        ' bg-white p-3" >\
                                              <div class="embed-responsive embed-responsive-16by9 ">\
                                                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/' +
                                        link +
                                        '?rel=0" allowfullscreen></iframe>\
                        </div>\
                                              </div>\
                                          </div>'
                                    );
                                }
                            } else {
                                $(".cover_page").append(
                                    '\
                                 <div class=""  data_type="video" data_action="rearrange" data_content="" data_id="' +
                                    response[i].data_id +
                                    '" data_arrange="' +
                                    response[i].data_arrange +
                                    '">\
                                              <div class="-handle text-center" >\
                                                  <i class="fa fa-video display2 display3-lg"></i><br>Video\
                                              </div>\
                                          </div>'
                                );
                            }
                        } else if (response[i].data_type == "image") {
                            if (response[i].content !== null) {
                                var array = response[i].content.split(",");

                                if (array.length == 1) {
                                    $(".cover_page").append(
                                        '\
                               <div class=""  data_type="image" data_action="rearrange" data_content="" data_id="' +
                                        response[i].data_id +
                                        '" data_arrange="' +
                                        response[i].data_arrange +
                                        '">\
                                            <div class="-handle " >\
                                                <div class="row"><div class="col-md-12"><img src="../images/packages/' +
                                        array[0] +
                                        '" class="img-thumbnail " width="100%" ></div></div>\
                                            </div>\
                                        </div>'
                                    );
                                } else if (array.length == 2) {
                                    $(".cover_page").append(
                                        '\
                               <div class=""  data_type="image" data_action="rearrange" data_content="" data_id="' +
                                        response[i].data_id +
                                        '" data_arrange="' +
                                        response[i].data_arrange +
                                        '">\
                                            <div class="-handle " >\
                                                <div class="row"><div class="col-md-6 col-6"><img src="../images/packages/' +
                                        array[0] +
                                        '" class="img-thumbnail " width="100%" ></div><div class="col-md-6 col-6"><img src="../images/packages/' +
                                        array[1] +
                                        '" class="img-thumbnail " width="100%" ></div></div>\
                                            </div>\
                                        </div>'
                                    );
                                } else if (array.length == 3) {
                                    $(".cover_page").append(
                                        '\
                               <div class=""  data_type="image" data_action="rearrange" data_content="" data_id="' +
                                        response[i].data_id +
                                        '" data_arrange="' +
                                        response[i].data_arrange +
                                        '">\
                                            <div class="-handle " >\
                                                <div class="row"><div class="col-md-4 col-6"><img src="../images/packages/' +
                                        array[0] +
                                        '" class="img-thumbnail " width="100%" ></div><div class="col-md-4 col-6"><img src="../images/packages/' +
                                        array[1] +
                                        '" class="img-thumbnail " width="100%" ></div><div class="col-md-4 col-6"><img src="../images/packages/' +
                                        array[2] +
                                        '" class="img-thumbnail " width="100%" ></div></div>\
                                            </div>\
                                        </div>'
                                    );
                                } else if (array.length == 4) {
                                    $(".cover_page").append(
                                        '\
                               <div class=""  data_type="image" data_action="rearrange" data_content="" data_id="' +
                                        response[i].data_id +
                                        '" data_arrange="' +
                                        response[i].data_arrange +
                                        '">\
                                            <div class="-handle " >\
                                                <div class="row"><div class="col-md-3 col-6"><img src="../images/packages/' +
                                        array[0] +
                                        '" class="img-thumbnail " width="100%" ></div><div class="col-md-3 col-6"><img src="../images/packages/' +
                                        array[1] +
                                        '" class="img-thumbnail " width="100%" ></div><div class="col-md-3 col-6"><img src="../images/packages/' +
                                        array[2] +
                                        '" class="img-thumbnail " width="100%" ></div><div class="col-md-3 col-6"><img src="../images/packages/' +
                                        array[3] +
                                        '" class="img-thumbnail " width="100%" ></div></div>\
                                            </div>\
                                        </div>'
                                    );
                                }

                                //
                            } else {
                                $(".cover_page").append(
                                    '\
                                 <div class=""  data_type="image" data_action="rearrange" data_content="" data_id="' +
                                    response[i].data_id +
                                    '" data_arrange="' +
                                    response[i].data_arrange +
                                    '">\
                                              <div class="-handle text-center" >\
                                                  <i class="fa fa-image display2 display3-lg"></i><br>Image\
                                              </div>\
                                          </div>'
                                );
                            }
                        }
                    }

                    var topic_id = Material.selectedId;
                    var topic = Material.lookUpDataTopic;

                    if (topic.with_quiz == 1) {
                        $(".cover_page").append(
                            `
                            <div><button class="topic_quiz_btn-${topic_id} btn btn-info btn-block">TAKE QUIZ</button></div>
                        `);
                    }
                    else {
                        $(".cover_page").append(
                            `
                            <div><button class="next_topic_btn-${topic_id} btn btn-info btn-block">NEXT</button></div>
                        `);
                    }

                    Material.addEvents();
                } else {
                    $(".cover_page").empty();

                    var topic_id = Material.selectedId;
                    var topic = Material.lookUpDataTopic;

                    if (topic.with_quiz == 1) {
                        $(".cover_page").append(
                            `
                            <div><button class="topic_quiz_btn-${topic_id} btn btn-info btn-block">TAKE QUIZ</button></div>
                        `);
                    }
                    else {
                        $(".cover_page").append(
                            `
                            <div><button class="next_topic_btn-${topic_id} btn btn-info btn-block">NEXT</button></div>
                        `);
                    }

                    Material.addEvents();
                }
                break;
            }
            case "quiz_fetch": {
                // console.log(response)
                if (response.type == "success") {
                    _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading Profile..."), _constructForm(["quiz", "quiz_fetch_add", val, response.quiz_item]));
                } else {
                    _showToast(response.type, response.message);
                    if (response.message == "Failed to complete,this will be recorded.") {
                        setInterval(function () {
                            location.href = "dashboard";
                        }, 3000);
                        _showSwal("info", "Failed to complete,this will be recorded. You will direct to dashboard");
                    } else {
                        $(".q_material").append(response.header);
                        $(".q_item").append(response.count_qi + " Items");
                        //$('.d_limit').append(days + "d " + hours + "h "+ minutes + "m " + seconds + "s ");
                        var countDownDate = new Date(response.date_limit).getTime();
                        var x = setInterval(function () {
                            // Get today's date and time
                            var now = new Date().getTime();

                            // Find the distance between now and the count down date
                            var distance = countDownDate - now;

                            // Time calculations for days, hours, minutes and seconds
                            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                            // Output the result in an element with id="demo"
                            $(".d_limit").empty();
                            $(".d_limit").append(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");

                            // If the count down is over, write some text
                            if (distance < 0) {
                                clearInterval(x);
                                $(".d_limit").empty();
                                $(".d_limit").append("EXPIRED");
                            }
                        }, 1000);
                        if (response.quiz_item) {
                            var quiz = response.quiz_item.split(",");
                            for (var i = 0; i < quiz.length; i++) {
                                _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading Profile..."), _constructForm(["quiz", "quiz_fetch_data", val, quiz[i]]));
                            }
                        }
                    }
                }
                break;
            }
            case "quiz_fetch_add": {
                _showToast(response.type, response.message);

                if (response.message == "Redirecting to current quiz") {
                    setInterval(function () {
                        location.href = "quiz_" + response.id;
                    }, 2000);
                    _showSwal("info", "Redirecting to the quiz");
                } else {
                    setInterval(function () {
                        location.href = "quiz_" + response.id;
                    }, 2000);
                    // /_ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Profile...'), _constructForm(['quiz', 'quiz_fetch_data',val]));
                }

                break;
            }

            case "quiz_fetch_data": {
                // console.log('items');
                // console.log(response);
                if (response.type == "idnf") {
                    $(".quiz_form_accordion").append(
                        '\
                    <div class="card">\
                      <div id="collapse' +
                        response.id +
                        '" class="collapse show" data-parent="#accordionExample3">\
                          <div class="card-body">\
                            <div class="form-group row ">\
                                  <div class="col-4 col-md-2">\
                                   <input class="form-control  form-control-solid" type="text" data_id="' +
                        response.id +
                        '" name="' +
                        response.id +
                        '" required data_ans="' +
                        response.answer +
                        '" id="example-text-input"/>\
                                  </div>\
                                  <label  class="col-8 col-md-10 col-form-label">' +
                        response.question + ' ANSWER : ' + response.answer +
                        "</label>\
                            </div>\
                          </div>\
                      </div>\
                  </div>"
                    );
                } else if (response.type == "tof") {
                    $(".quiz_form_accordion").append(
                        '\
                    <div class="card">\
                      <div id="collapse' +
                        response.id +
                        '" class="collapse show" data-parent="#accordionExample3">\
                          <div class="card-body">\
                           <div class="form-group row ">\
                            <div class="col-4 col-md-2">\
                             <select class="form-control form-control-solid"  type="text" data_id="' +
                        response.id +
                        '" required data_ans="' +
                        response.answer +
                        '" name="' +
                        response.id +
                        '">\
                             <option></option>\
                               <option value="true">True</option>\
                               <option value="false">False</option>\
                             </select>\
                            </div>\
                            <label  class="col-8 col-md-10 col-form-label">' +
                        response.question + ' ANSWER : ' + response.answer +
                        "</label>\
                           </div>\
                          </div>\
                      </div>\
                  </div>"
                    );
                } else if (response.type == "mc") {
                    var choices = response.choices.split(",");
                    function shuffle(array) {
                        let currentIndex = array.length,
                            randomIndex;
                        // While there remain elements to shuffle...
                        while (currentIndex != 0) {
                            // Pick a remaining element...
                            randomIndex = Math.floor(Math.random() * currentIndex);
                            currentIndex--;
                            // And swap it with the current element.
                            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
                        }
                        return array;
                    }
                    // Used like so
                    var arr = [0, 1, 2, 3];

                    shuffle(arr);
                    var arr2 = ["a", "b", "c", "d"];

                    $(".quiz_form_accordion").append(
                        '\
                    <div class="card">\
                      <div id="collapse' +
                        response.id +
                        '" class="collapse show" data-parent="#accordionExample3">\
                          <div class="card-body">\
                            <div class="form-group row ">\
                                <div class="col-4 col-md-2">\
                                 <select class="form-control form-control-solid " data_id="' +
                        response.id +
                        '" required data_ans="' +
                        response.answer +
                        '" type="text" name="' +
                        response.id +
                        '">\
                                 <option></option>\
                                   <option value="' +
                        arr2[arr[0]] +
                        '">' +
                        choices[arr[0]] +
                        '</option>\
                                   <option value="' +
                        arr2[arr[1]] +
                        '">' +
                        choices[arr[1]] +
                        '</option>\
                                   <option value="' +
                        arr2[arr[2]] +
                        '">' +
                        choices[arr[2]] +
                        '</option>\
                                   <option value="' +
                        arr2[arr[3]] +
                        '">' +
                        choices[arr[3]] +
                        '</option>\
                                 </select>\
                                </div>\
                                <label  class="col-8 col-md-10 col-form-label" >' +
                        response.question + ' ANSWER : ' +
                        (response.answer == arr2[arr[0]] ? choices[arr[0]] : '') +
                        (response.answer == arr2[arr[1]] ? choices[arr[1]] : '') +
                        (response.answer == arr2[arr[2]] ? choices[arr[2]] : '') +
                        (response.answer == arr2[arr[3]] ? choices[arr[3]] : '') +
                        '</label>\
                                <label  class="col-12 col-md-6 col-form-label text-center" > ' +
                        choices[arr[0]] +
                        '</label>\
                                <label  class="col-12 col-md-6 col-form-label text-center" >' +
                        choices[arr[1]] +
                        '</label>\
                                <label  class="col-12 col-md-6 col-form-label text-center" >' +
                        choices[arr[2]] +
                        '</label>\
                                <label  class="col-12 col-md-6 col-form-label text-center" > ' +
                        choices[arr[3]] +
                        "</label>\
                            </div>\
                          </div>\
                      </div>\
                  </div>"
                    );
                }
                break;
            }
            case "quiz_checking": {
                Swal.fire({
                    text: "Checking is finished, automatically redirecting, See for result?",
                    icon: "question",
                    buttonsStyling: false,
                    confirmButtonText: "Yes, proceed!",
                    customClass: {
                        confirmButton: "btn font-weight-bold btn-warning",
                    },
                }).then(function (result) {
                    if (result.value) {
                        location.href = "viewresult_" + response.id;
                    }
                });

                setInterval(function () {
                    location.href = "viewresult_" + response.id;
                }, 3000);
                break;
            }
            case "report_quiz": {
                KTDatatablesDataSourceAjaxClient.init("tbl_report", response);
                break;
            }
            case "viewresult": {
                if (response.type == "passed") {
                    $(".notif_result").append(
                        '<div class="alert alert-custom alert-outline-2x alert-outline-primary fade show mb-5" role="alert">\
                                    <div class="alert-icon"><i class="flaticon-warning"></i></div>\
                                    <div class="alert-text">Good Job you passed the quiz</div>\
                                    <div class="alert-close">\
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                                            <span aria-hidden="true"><i class="ki ki-close"></i></span>\
                                        </button>\
                                    </div>\
                                </div>'
                    );
                    var qi = response.quiz_item.split(",");
                    var qp = response.quiz_item_passed.split(",");
                    var qf = response.quiz_item_failed.split(",");
                    //qi.length

                    for (var i = 0; i < qi.length; i++) {
                        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading Profile..."), _constructForm(["viewresult_append", "viewresult_append", val, qi[i]]));
                    }
                    setTimeout(function () {
                        for (var i = 0; i < qp.length; i++) {
                            _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading Profile..."), _constructForm(["viewresult_append", "viewresult_append_passed", val, qp[i]]));
                        }
                    }, 1000);
                }
                if (response.type == "failed") {
                    $(".notif_result").append(
                        '<div class="alert alert-custom alert-outline-2x alert-outline-danger fade show mb-5" role="alert">\
                                    <div class="alert-icon"><i class="flaticon-warning"></i></div>\
                                    <div class="alert-text">Failed to the quiz, please try again</div>\
                                    <div class="alert-close">\
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                                            <span aria-hidden="true"><i class="ki ki-close"></i></span>\
                                        </button>\
                                    </div>\
                                </div><div class="h2">We Encourage you to read again, where you got a lowest grade</div>\
                                '
                    );
                    var qi = response.quiz_item.split(",");
                    var qp = response.quiz_item_passed.split(",");
                    var qf = response.quiz_item_failed.split(",");
                    //qi.length

                    for (var i = 0; i < qi.length; i++) {
                        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading Profile..."), _constructForm(["viewresult_append", "viewresult_append", val, qi[i]]));
                    }
                    setTimeout(function () {
                        for (var i = 0; i < qp.length; i++) {
                            _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading Profile..."), _constructForm(["viewresult_append", "viewresult_append_passed", val, qp[i]]));
                        }
                    }, 1000);
                }
                if (response.type == "failed_complete") {
                    $(".notif_result").append(
                        '<div class="alert alert-custom alert-outline-2x alert-outline-danger fade show mb-5" role="alert">\
                                    <div class="alert-icon"><i class="flaticon-warning"></i></div>\
                                    <div class="alert-text">Failed to complete at the time.</div>\
                                    <div class="alert-close">\
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                                            <span aria-hidden="true"><i class="ki ki-close"></i></span>\
                                        </button>\
                                    </div>\
                                </div>'
                    );
                }
                break;
            }
            case "viewresult_append": {
                //alert(response.page_name);
                var page = response.page_name;
                var page = page.replace(/ /g, "");

                if ($(".notif_result").find("#" + page).length) {
                    var new_val = Number($(".notif_result #" + page).attr("data_quiz_item")) + 1;
                    $(".notif_result #" + page).attr("data_quiz_item", new_val);
                    // /alert($('.notif_result #'+page).attr('data_quiz_item'));
                } else {
                    //alert('foo');
                    $(".notif_result").append(
                        '<div class="h4 quizes" id="' +
                        page +
                        '" data_quiz_item="1" data_quiz_passed="" data_quiz_failed="" data_average=""><a style="color:#F64E60" href="module_' +
                        response.material_header_id +
                        '">' +
                        response.material_name +
                        ">" +
                        response.page_name +
                        "</a></div>"
                    );
                }

                break;
            }
            case "viewresult_append_passed": {
                //alert(response.page_name);
                var page = response.page_name;
                var page = page.replace(/ /g, "");

                if ($(".notif_result").find("#" + page).length) {
                    $(".notif_result #" + page).empty();
                    var new_val = Number($(".notif_result #" + page).attr("data_quiz_passed")) + 1;
                    $(".notif_result #" + page).attr("data_quiz_passed", new_val);
                    $(".notif_result #" + page).append($(".notif_result #" + page).attr("data_quiz_passed") + "/" + $(".notif_result #" + page).attr("data_quiz_item"));
                    $(".notif_result #" + page).append(' <a style="color:#597859" href="module_' + response.material_header_id + '">' + response.material_name + ">" + response.page_name + "</a>");
                    var average = (Number($(".notif_result #" + page).attr("data_quiz_passed")) / Number($(".notif_result #" + page).attr("data_quiz_item"))) * 100;
                    $(".notif_result #" + page).attr("data_average", Math.round(average));
                } else {
                    //alert('foo');
                    $(".notif_result").append(
                        '<div class="h4" id="' + page + '" data_quiz_item="1" data_quiz_passed="" data_quiz_failed=""><a href="module_' + response.material_header_id + '">' + response.material_name + ">" + response.page_name + "</a></div>"
                    );
                }

                break;
            }
            case "flashcard_view": {
                if (response.length) {
                    $(".flash_card").empty();
                    for (var i = 0; i < response.length; i++) {
                        $(".flash_card").append(
                            '<div class="col-md-3 ">\
                                             <div class="flip-card">\
                                              <div class="card-front">\
                                               ' +
                            response[i].content +
                            '\
                                              </div>\
                                              <div class="card-back">\
                                                ' +
                            response[i].ans +
                            "\
                                              </div>\
                                            </div>\
                                          </div>"
                        );
                    }
                }
            }
            default:
                // code block
                break;
        }
        if (response != false) {
            $("#kt_content > div.d-flex.flex-column-fluid > div").show();
        }
    };

    var _ajaxrequest = async function (thisurl, ajaxtype, blockUi, formData) {
        return new Promise((resolve, reject) => {
            let y = true;
            $.ajax({
                url: thisurl,
                type: ajaxtype,
                data: formData,
                contentType: false,
                processData: false,
                dataType: "json",
                beforeSend: function () {
                    if (blockUi.get("type") == "blockPage") {
                        if (blockUi.get("message") != "false") {
                            KTApp.blockPage({
                                overlayColor: "#000000",
                                state: "primary",
                                message: blockUi.get("message"),
                            });
                        } else {
                            KTApp.blockPage("Loading...");
                        }
                    } else if (blockUi.get("type") == "blockContent") {
                        KTApp.block(blockUi.get("element"), {
                            overlayColor: "#000000",
                            state: "primary",
                            size: "lg",
                        });
                    } else if (blockUi.get("type") == "pre-loader20") {
                        $(blockUi.get("element")).empty().append('<div class="d-flex justify-content-center w-100"><img src="../../images/pre-loader/loader-20.gif" alt="Loading"/></div>');
                    } else {
                    }
                },
                complete: function () {
                    if (blockUi.get("type") == "blockPage") {
                        KTApp.unblockPage();
                    } else if (blockUi.get("type") == "blockContent") {
                        KTApp.unblock(blockUi.get("element"));
                    } else if (blockUi.get("type") == "pre-loader20") {
                        // $(blockUi.get("element")).empty();
                    } else {
                    }
                    resolve(y);
                },
                success: function (res) {
                    // console.log(res);
                    // alert(JSON.stringify(res));
                    if (res.status == "success") {
                        if (window.atob(res.payload) != false) {
                            _construct(JSON.parse(window.atob(res.payload)), formData.get("data2"));
                        } else {
                            _construct(res.message, formData.get("data2"));
                        }
                    } else if (res.status == "not_found") {
                        Swal.fire("Ops!", res.message, "info");
                    } else {
                        Swal.fire("Ops!", res.message, "info");
                    }
                },
                error: function (xhr, status, error) {
                    if (xhr.status == 200) {
                        console.log(xhr)
                        Swal.fire("Ops!", "Server Error: " + xhr.responseText, "error");
                    } else if (xhr.status == 500) {
                        Swal.fire("Ops!", "Internal error: " + xhr.responseText, "error");
                    } else if (status == "error") {
                        Swal.fire({
                            title: "Oopps!",
                            text: "Your account was signed-out. See you again inside!",
                            icon: "info",
                            showCancelButton: false,
                            confirmButtonText: "Ok, Got it",
                            reverseButtons: true,
                        }).then(function (result) {
                            window.location.replace("../login");
                        });
                    } else {
                        console.log(xhr);
                        console.log(status);
                        Swal.fire("Ops!", "Something went wrong..", "error");
                    }
                },
            });
        });
    };
    return {
        callFunction: function (type, id) {
            if (type == "reload_customers_list") {
                //_ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Customers...'), _constructForm(['user_customers', 'customers_list']));
            }
            if (type == "reload_address") {
                //_ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Address...'), _constructForm(['user_address', 'address']));
            }
            if (type == "reload_setup_sales") {
                //_ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Sales...'), _constructForm(['setup_group_sales', 'setup_sales']));
            }
            if (type == "upgrade") {
                //_ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockPage', false, 'Loading Ranks...'), _constructForm(['user_ranks', 'ranks']));
            }
            if (type == "unilevel") {
                level = id;
                //_ajaxrequest("controller/controller.php", "POST", _constructBlockUi('blockContent', '#level'+level, false), _constructForm(['user_unilevel', 'unilevel', level]));
            }
        },
        init: function () {
            _init();
        },
    };
})();
$(document).ready(function () {
    APPHANDLER.init();
});
