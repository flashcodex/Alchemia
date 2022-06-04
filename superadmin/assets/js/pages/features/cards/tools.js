"use strict";

var KTCardTools = function () {
    // Toastr
    var initToastr = function() {
        toastr.options.showDuration = 1000;
    }

    // Demo 1
    var demo1 = function() {
        // This card is lazy initialized using data-card="true" attribute. You can access to the card object as shown below and override its behavior
        var card = new KTCard('kt_card_1');

        // Toggle event handlers
        card.on('beforeCollapse', function(card) {
            setTimeout(function() {
                toastr.info('Before collapse event fired!');
            }, 100);
        });

        card.on('afterCollapse', function(card) {
            setTimeout(function() {
                toastr.warning('Before collapse event fired!');
            }, 2000);
        });

        card.on('beforeExpand', function(card) {
            setTimeout(function() {
                toastr.info('Before expand event fired!');
            }, 100);
        });

        card.on('afterExpand', function(card) {
            setTimeout(function() {
                toastr.warning('After expand event fired!');
            }, 2000);
        });

        // Remove event handlers
        card.on('beforeRemove', function(card) {
            toastr.info('Before remove event fired!');

            return confirm('Are you sure to remove this card ?');  // remove card after user confirmation
        });

        card.on('afterRemove', function(card) {
            setTimeout(function() {
                toastr.warning('After remove event fired!');
            }, 2000);
        });

        // Reload event handlers
        card.on('reload', function(card) {
            toastr.info('Leload event fired!');

            KTApp.block(card.getSelf(), {
                overlayColor: '#ffffff',
                type: 'loader',
                state: 'primary',
                opacity: 0.3,
                size: 'lg'
            });

            // update the content here

            setTimeout(function() {
                KTApp.unblock(card.getSelf());
            }, 2000);
        });
    }

    // Demo 2
    var demo2 = function() {
        // This card is lazy initialized using data-card="true" attribute. You can access to the card object as shown below and override its behavior
        var card = new KTCard('kt_card_2');

        // Toggle event handlers
        card.on('beforeCollapse', function(card) {
            $('#generate_package_code')[0].reset();
            $('#generate_package_code > div.form-group > div.d-flex.align-items-center.flex-column.flex-lg-row > span > span').text("0.00");
            total_cost=0.00;
        });

        card.on('afterCollapse', function(card) {
            $('#generate_package_code')[0].reset();
            $('#generate_package_code > div.form-group > div.d-flex.align-items-center.flex-column.flex-lg-row > span > span').text("0.00");
            total_cost=0.00;
        });

        // card.on('beforeExpand', function(card) {
        //     setTimeout(function() {
        //         toastr.info('Before expand event fired!');
        //     }, 100);
        // });

        // card.on('afterExpand', function(card) {
        //     setTimeout(function() {
        //         toastr.warning('After expand event fired!');
        //     }, 2000);
        // });

        // Remove event handlers
        // card.on('beforeRemove', function(card) {
        //     toastr.info('Before remove event fired!');

        //     return confirm('Are you sure to remove this card ?');  // remove card after user confirmation
        // });

        // card.on('afterRemove', function(card) {
        //     setTimeout(function() {
        //         toastr.warning('After remove event fired!');
        //     }, 2000);
        // });

        // Reload event handlers
        card.on('reload', function(card) {
            KTApp.block(card.getSelf(), {
                overlayColor: '#000000',
                type: 'spinner',
                state: 'primary',
                opacity: 0.05,
                size: 'lg'
            });

            // setTimeout(function() {
            //     KTApp.unblock(card.getSelf());
            // }, 2000);
            // $('input[name="username"],input[name="code_quantity"]').val('').removeClass("is-valid is-invalid").end();
            $('#generate_package_code')[0].reset();
            $('#generate_package_code > div.form-group > div.d-flex.align-items-center.flex-column.flex-lg-row > span > span').text("0.00");
            total_cost=0.00;
            KTApp.unblock(card.getSelf());
        });
    }

    // Demo 3
    var demo3 = function() {
        // This card is lazy initialized using data-card="true" attribute. You can access to the card object as shown below and override its behavior
        var card = new KTCard('kt_card_3');

        // Toggle event handlers
        card.on('beforeCollapse', function(card) {
            setTimeout(function() {
                toastr.info('Before collapse event fired!');
            }, 100);
        });

        card.on('afterCollapse', function(card) {
            setTimeout(function() {
                toastr.warning('Before collapse event fired!');
            }, 2000);
        });

        card.on('beforeExpand', function(card) {
            setTimeout(function() {
                toastr.info('Before expand event fired!');
            }, 100);
        });

        card.on('afterExpand', function(card) {
            setTimeout(function() {
                toastr.warning('After expand event fired!');
            }, 2000);
        });

        // Remove event handlers
        card.on('beforeRemove', function(card) {
            toastr.info('Before remove event fired!');

            return confirm('Are you sure to remove this card ?');  // remove card after user confirmation
        });

        card.on('afterRemove', function(card) {
            setTimeout(function() {
                toastr.warning('After remove event fired!');
            }, 2000);
        });

        // Reload event handlers
        card.on('reload', function(card) {
            toastr.info('Leload event fired!');

            KTApp.block(card.getSelf(), {
                type: 'loader',
                state: 'success',
                message: 'Please wait...'
            });

            // update the content here

            setTimeout(function() {
                KTApp.unblock(card.getSelf());
            }, 2000);
        });
    }
   // Demo 4
    var demo4 = function() {
        // This card is lazy initialized using data-card="true" attribute. You can access to the card object as shown below and override its behavior
        var card = new KTCard('kt_card_4');

        // Toggle event handlers
        card.on('beforeCollapse', function(card) {
            // setTimeout(function() {
            //     toastr.info('Before collapse event fired!');
            // }, 100);
        });

        card.on('afterCollapse', function(card) {
            // setTimeout(function() {
            //     toastr.warning('Before collapse event fired!');
            // }, 2000);
        });

        card.on('beforeExpand', function(card) {
            // setTimeout(function() {
            //     toastr.info('Before expand event fired!');
            // }, 100);
        });

        card.on('afterExpand', function(card) {
            // setTimeout(function() {
            //     toastr.warning('After expand event fired!');
            // }, 2000);
        });

        // Remove event handlers
        // card.on('beforeRemove', function(card) {
            // toastr.info('Before remove event fired!');

            // return confirm('Are you sure to remove this card ?');  // remove card after user confirmation
        // });

        // card.on('afterRemove', function(card) {
            // setTimeout(function() {
            //     toastr.warning('After remove event fired!');
            // }, 2000);
        // });

        // Reload event handlers
        card.on('reload', function(card) {
            // toastr.info('Leload event fired!');

            KTApp.block(card.getSelf(), {
                type: 'loader',
                state: 'primary',
                message: 'Please wait...'
            });
            let myForm = document.getElementById('kt_form');
            myForm.reset();
            $('#kt_wizard > div.wizard-nav > div > div:nth-child(1) > div').click();

            // update the content here
                KTApp.unblock(card.getSelf());

            // setTimeout(function() {
            //     KTApp.unblock(card.getSelf());
            // }, 2000);
        });

        // Reload event handlers
        card.on('afterFullscreenOn', function(card) {
            toastr.warning('After fullscreen on event fired!');
            var scrollable = $(card.getBody()).find('> .kt-scroll');

            if (scrollable) {
                scrollable.data('original-height', scrollable.css('height'));
                scrollable.css('height', '100%');

                KTUtil.scrollUpdate(scrollable[0]);
            }
        });

        card.on('afterFullscreenOff', function(card) {
            toastr.warning('After fullscreen off event fired!');
            var scrollable = $(card.getBody()).find('> .kt-scroll');

            if (scrollable) {
                var scrollable = $(card.getBody()).find('> .kt-scroll');
                scrollable.css('height', scrollable.data('original-height'));

                KTUtil.scrollUpdate(scrollable[0]);
            }
        });
    }


    return {
        //main function to initiate the module
        init: function () {
            initToastr();

            // init demos
            // demo1();
            if(document.getElementById('kt_card_2') !== null){
                demo2();
            }
            if(document.getElementById('kt_card_4') !== null){
                demo4();
            }
        }
    };
}();

// jQuery(document).ready(function() {
//     KTCardTools.init();
// });
