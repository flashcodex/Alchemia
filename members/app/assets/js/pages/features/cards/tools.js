"use strict";

var KTCardTools = function () {
    // Toastr
    // Demo 3
    var demo1 = function() {
        var card=[];
        var l=[];
        for(let i=1;i<=10;i++){
            card[i] = new KTCard('level'+i);
            card[i].on('beforeExpand', function(card) {
                (l[i]!='loaded')? APPHANDLER.callFunction('unilevel',i): '';
                l[i]='loaded';
            });
            card[i].on('reload', function(card) {
                // KTApp.block(card.getSelf(), {
                //     type: 'loader',
                //     state: 'success',
                //     message: 'Please wait...'
                // });
                APPHANDLER.callFunction('unilevel',i);
                // KTApp.unblock(card.getSelf());
                l[i]='loaded';
            });
        }
        // card.on('beforeCollapse', function(card) {
        //     setTimeout(function() {
        //         toastr.info('Before collapse event fired!');
        //     }, 100);
        // });

        // card.on('afterCollapse', function(card) {
        //     setTimeout(function() {
        //         toastr.warning('Before collapse event fired!');
        //     }, 2000);
        // });
        // card.on('afterExpand', function(card) {
        //     setTimeout(function() {
        //         toastr.warning('After expand event fired!');
        //     }, 2000);
        // });
    }

    return {
        //main function to initiate the module
        init: function () {
            demo1();
        }
    };
}();

// jQuery(document).ready(function() {
//     KTCardTools.init();
// });
