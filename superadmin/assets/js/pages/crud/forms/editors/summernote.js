"use strict";
// Class definition

var KTSummernoteDemo = function () {
    // Private functions
    var demos = function () {
        $('.summernote').summernote({
            height: 400,
            // tabsize: 2,
            toolbar: [
              ['style', ['style']],
              ['font', ['bold', 'underline', 'clear']],
              ['fontname', ['fontname']],
              ['fontsize', ['fontsize']],
              ['height', ['height']],
              ['color', ['color']],
              ['para', ['ul', 'ol', 'paragraph']],
              ['table', ['table']],
              ['insert', ['link', 'picture']], //, 'video'
              ['view', ['fullscreen','help']]
            ],
        });
    }
    var edit_product = function () {
        $('.productnote').summernote({
            height: 150,
            toolbar: [
              ['style', ['style']],
              ['font', ['bold', 'underline', 'clear']],
              ['fontname', ['fontname']],
              ['fontsize', ['fontsize']],
              ['height', ['height']],
              ['color', ['color']],
              ['para', ['ul', 'ol', 'paragraph']],
              ['table', ['table']],
              ['insert', ['link', 'picture', 'video']],
              ['view', ['fullscreen',  'help']]
            ],
        });
    }

    return {
        // public functions
        init: function(type) {
            if(type=='setting'){
                demos();
            }
            if(type=='product'){
                edit_product();
            }
        }
    };
}();

// Initialization
// jQuery(document).ready(function() {
//     KTSummernoteDemo.init();
// });
