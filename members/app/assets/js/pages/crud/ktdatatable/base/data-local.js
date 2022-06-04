'use strict';
// Class definition

var KTDatatableDataLocalDemo = function() {
  // Private functions

  // demo initializer
  var demo = function(response) {
    var datatable = $('#kt_datatable').KTDatatable({
      // datasource definition
      data: {
        type: 'local',
        source: response,
        pageSize: 10,
      },

      // layout definition
      layout: {
        scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
        height: 450, // datatable's body's fixed height
        footer: false, // display/hide footer
      },

      // column sorting
      sortable: true,
      pagination: true,
      // columns definition
      columns: [{
          field: 'id',
          title: '#',
          sortable: false,
          width: 20,
          type: 'number',
          selector: true,
          textAlign: 'center',
        }, {
          field: 'code',
          title: 'CODE',
          width: 150,
          textAlign: 'right',
          template: function(row) {
            return '<div class="d-flex align-items-center">\
                                    <div class="symbol symbol-40 flex-shrink-0">\
                                        <img src="../../images/packages/'+row.image+'" alt="photo">\
                                    </div>\
                                    <div class="ml-3">\
                                        <span class="text-dark-75 font-weight-bold line-height-sm d-block pb-2">'+row.code+'</span>\
                                        <a href="#" class="text-muted text-hover-primary">'+row.code_type+'</a>\
                                    </div>\
                                </div>';
          },
        }, {
          field: 'product_name',
          title: 'PACKAGE',
          width: 150,
          template: function(row) {
            let package_col='<a href="javascript:;" class="d-flex align-items-center text-hover-warning text-primary">Select Packages</a>';
                    if(row.product_name){
                      package_col='<div class="d-flex align-items-center">\
                          <div class="symbol symbol-40 flex-shrink-0">\
                              <img src="../../images/product/product-480x480/'+row.thumbnail+'" alt="photo">\
                          </div>\
                          <div class="ml-3">\
                              <a href="javascript:;" class="text-dark-75 font-weight-bold line-height-sm text-hover-primary d-block">'+row.product_name+'</a>\
                              <span class="text-muted d-block">'+row.supplier+'</span>\
                              <a href="javascript:;" class=" text-danger font-weight-bold">remove</a>\
                          </div>\
                      </div>';
                    }
            return package_col;
          },
        }, {
          field: 'quantity',
          title: 'QUANTITY',
        }, {
          field: 'price',
          title: 'PRICE',
        },{
          field: 'status',
          title: 'STATUS',
          // callback function support for column rendering
          template: function(row) {
            return '<span class="label font-weight-bold label-lg label-light-danger label-inline">UNSCHEDULED</span>';
          }
        }],
    });
  };

  return {
    // Public functions
    init: function(response) {
      // init dmeo
      demo(response);
    },
  };
}();

// jQuery(document).ready(function() {
//   KTDatatableDataLocalDemo.init();
// });
