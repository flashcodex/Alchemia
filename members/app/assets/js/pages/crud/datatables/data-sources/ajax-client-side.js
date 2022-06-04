	'use strict';
	var KTDatatablesDataSourceAjaxClient = function() {
		$.fn.dataTable.ext.errMode = 'throw';
	var table;
		var initTable_Customer_List = function(tbl,response) {
			$('#'+tbl).DataTable().clear().destroy();
			table = $('#'+tbl).DataTable({
				responsive: true,
				language: {
			      emptyTable: "No Customers Record"
			    },
				 destroy: true,
				data: response,
				columns: [
					{data: 'name'},
					{data: 'mobile'},
					{data: 'address'},
					{data: 'status'},
					{data: 'action', responsivePriority: -1},
				],
				columnDefs: [
					{
						targets: -1,
						orderable: false,
						render: function(data, type, full, meta) {
							return '\
							<div class="d-flex flex-row">\
								<div class="dropdown dropdown-inline  dropdown-hover">\
									<a href="javascript:;" class="btn btn-sm btn-clean btn-icon" data-toggle="dropdown">\
		                                <i class="la la-cog"></i>\
		                            </a>\
								  	<div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">\
										<ul class="nav nav-hoverable flex-column">\
								    		<li class="nav-item"><a class="nav-link  create-order" href="javascript:;" data-id="'+full.action+'"><i class="nav-icon la la-cart-plus" ></i><span class="nav-text">Create Order</span></a></li>\
								    		<li class="nav-item"><a class="nav-link  view-order" href="javascript:;" ><i class="nav-icon la la-list-alt"></i><span class="nav-text">Orders</span></a></li>\
										</ul>\
								  	</div>\
								</div>\
								<a href="javascript:;" class="btn btn-sm btn-clean btn-icon edit-customer-addr" data-id="'+full.action+'" title="Edit details">\
									<i class="la la-edit"></i>\
								</a>\
								<a href="javascript:;" class="btn btn-sm btn-clean btn-icon remove-customer-addr"  data-id="'+full.action+'" title="Delete">\
									<i class="la la-trash"></i>\
								</a>\
								</div>\
							';
						},
					},
					{
						targets: -2,
						render: function(data, type, full, meta) {
							var status = {
								0: {'title': 'Inactive', 'state': 'danger'},
								1: {'title': 'Active', 'state': 'success'},
							};
							if (typeof status[data] === 'undefined') {
								return data;
							}
							return '<span class="label label-' + status[data].state + ' label-dot mr-2"></span>' +
								'<span class="font-weight-bold text-' + status[data].state + '">' + status[data].title + '</span>';
						},
					},
				],
			});
		};

		var initTable_Commision_Sales = function(tbl,response) {
			$('#'+tbl).DataTable().clear().destroy();
			table = $('#'+tbl).DataTable({
			// dom: 'Bfrtip',
			dom: `<'row'<'col-sm-6 text-left'f><'col-sm-6 text-right'B>>
								<'row'<'col-sm-12'tr>>
								<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
			buttons: [
				{
	                extend: 'print',
	                exportOptions: {
	                    columns: [0,1,2,3]
	                }
            	},
            	{
	                extend: 'copyHtml5',
	                exportOptions: {
	                    columns: [0,1,2,3]
	                }
            	},
            	{
	                extend: 'excelHtml5',
	                exportOptions: {
	                    columns: [0,1,2,3]
	                }
            	},
				{
	                extend: 'csvHtml5',
	                exportOptions: {
	                    columns: [0,1,2,3]
	                }
            	},
				{
	                extend: 'pdfHtml5',
	                exportOptions: {
	                    columns: [0,1,2,3]
	                }
            	},
			],
				searching: true, 
				paging: true,
				language: {
			      emptyTable: "No Commissions"
			    },
				info: false,
				responsive: true,
				destroy: true,
				data: response,
				columns: [
					{data: 'username', responsivePriority: 1},
					{data: 'type', responsivePriority: 2},
					{data: 'amount'},
					{data: 'date_created'}
				],
				columnDefs: [
					{
						targets: 1,
						render: function(data, type, full, meta) {
							var status = {
								'DIRECT_REFERRAL': {'title': 'DIRECT REFERRAL', 'class': 'label-light-primary'},
								'INDIRECT_REFERRAL': {'title': 'INDIRECT REFFERAL', 'class': ' label-light-dark'},
								'DAILY_REWARD': {'title': 'DAILY REWARD', 'class': ' label-light-success'},
								'BINARY_COMM': {'title': 'BINARY COMM', 'class': ' label-light-info'},
							};
							if (typeof status[data] === 'undefined') {
								return data;
							}
							return '<span class="label label-lg font-weight-bold ' + status[data].class + ' label-inline">' + status[data].title + '</span>';
						},
					},
				],
			});

			$("body").delegate('#kt_reset','click', function(e) {
				e.stopImmediatePropagation();
				e.preventDefault();
				$('.datatable-input').each(function() {
					$(this).val('');
					table.column($(this).data('col-index')).search('', false, false);
				});
				table.table().draw();
			});
		};
		var initTable_Generated_Sales = function(tbl,response) {
			$('#'+tbl).DataTable().clear().destroy();
			table = $('#'+tbl).DataTable({
				// dom: 'Bfrtip',
				dom: `<'row'<'col-sm-6 text-left'f><'col-sm-6 text-right'B>>
								<'row'<'col-sm-12'tr>>
								<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
			buttons: [
				{
	                extend: 'print',
	                exportOptions: {
	                    columns: [0,1,2,3]
	                }
            	},
            	{
	                extend: 'copyHtml5',
	                exportOptions: {
	                    columns: [0,1,2,3]
	                }
            	},
            	{
	                extend: 'excelHtml5',
	                exportOptions: {
	                    columns: [0,1,2,3]
	                }
            	},
				{
	                extend: 'csvHtml5',
	                exportOptions: {
	                    columns: [0,1,2,3]
	                }
            	},
				{
	                extend: 'pdfHtml5',
	                exportOptions: {
	                    columns: [0,1,2,3]
	                }
            	},
			],
				searching: true, 
				language: {
			      emptyTable: "No Generated Sales"
			    },
				paging: true,
				info: false,
				responsive: true,
				destroy: true,
				data: response,
				columns: [
					{data: 'username', responsivePriority: 1},
					{data: 'type'},
					{data: 'amount', responsivePriority: 2},
					{data: 'date_created'}
				],
				columnDefs: [
					{
						targets: 1,
						render: function(data, type, full, meta) {
							var status = {
								'GENERATED_SALE': {'title': 'GENERATED SALES', 'class': 'label-light-primary'},
							};
							if (typeof status[data] === 'undefined') {
								return data;
							}
							return '<span class="label label-lg font-weight-bold ' + status[data].class + ' label-inline">' + status[data].title + '</span>';
						},
					},
				],
			});

			$("body").delegate('#kt_reset','click', function(e) {
				e.stopImmediatePropagation();
				e.preventDefault();
				$('.datatable-input').each(function() {
					$(this).val('');
					table.column($(this).data('col-index')).search('', false, false);
				});
				table.table().draw();
			});
		};

  var initTable_Direct_Referral = function(tbl,response) {
			$('#'+tbl).DataTable().clear().destroy();
			table = $('#'+tbl).DataTable({
				// dom: 'Bfrtip',
				dom: `<'row'<'col-sm-6 text-left'f><'col-sm-6 text-right'B>>
								<'row'<'col-sm-12'tr>>
								<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
					buttons: [
						{
			                extend: 'print',
			                exportOptions: {
			                    columns: [0,1,2,3]
			                }
		            	},
		            	{
			                extend: 'copyHtml5',
			                exportOptions: {
			                    columns: [0,1,2,3]
			                }
		            	},
		            	{
			                extend: 'excelHtml5',
			                exportOptions: {
			                    columns: [0,1,2,3]
			                }
		            	},
						{
			                extend: 'csvHtml5',
			                exportOptions: {
			                    columns: [0,1,2,3]
			                }
		            	},
						{
			                extend: 'pdfHtml5',
			                exportOptions: {
			                    columns: [0,1,2,3]
			                }
		            	},
					],
				searching: true, 
				language: {
			      emptyTable: "No Referrals"
			    },
				paging: true,
				info: false,
				responsive: true,
				destroy: true,
				data: response,
				columns: [
					{data: 'username', responsivePriority: 1},
					{data: 'fullname'},
					{data: 'rank', responsivePriority: 2},
					{data: 'date_created'}
				],
				columnDefs: [
					{
						targets: 2,
						render: function(data, type, full, meta) {
							var status = {
								'BRONZE': {'title': 'BRONZE', 'class': 'label-light-bronze'},
								'SILVER': {'title': 'SILVER', 'class': 'label-light-silver'},
								'GOLD': {'title': 'GOLD', 'class': 'label-light-gold'},
							};
							if (typeof status[data] === 'undefined') {
								return data;
							}
							return '<span class="label label-lg font-weight-bold ' + status[data].class + ' label-inline">' + status[data].title + '</span>';
						},
					},
				],
			});

			$("body").delegate('#kt_reset','click', function(e) {
				e.stopImmediatePropagation();
				e.preventDefault();
				$('.datatable-input').each(function() {
					$(this).val('');
					table.column($(this).data('col-index')).search('', false, false);
				});
				table.table().draw();
			});
		};

	 var initTable_Binary_Monitoring = function(tbl,response) {
			$('#'+tbl).DataTable().clear().destroy();
			table = $('#'+tbl).DataTable({
				dom: `<'row'<'col-sm-6 text-left'f><'col-sm-6 text-right'B>>
								<'row'<'col-sm-12'tr>>
								<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
				buttons: [
						{
			                extend: 'print',
			                exportOptions: {
			                    columns: [0,1,2,3,4,5,6,7,8,9]
			                }
		            	},
		            	{
			                extend: 'copyHtml5',
			                exportOptions: {
			                    columns: [0,1,2,3,4,5,6,7,8,9]
			                }
		            	},
		            	{
			                extend: 'excelHtml5',
			                exportOptions: {
			                    columns: [0,1,2,3,4,5,6,7,8,9]
			                }
		            	},
						{
			                extend: 'csvHtml5',
			                exportOptions: {
			                    columns: [0,1,2,3,4,5,6,7,8,9]
			                }
		            	},
						{
			                extend: 'pdfHtml5',
			                exportOptions: {
			                    columns: [0,1,2,3,4,5,6,7,8,9]
			                }
		            	},
					],
				searching: true, 
				language: {
			      emptyTable: "No Records"
			    },
				paging: true,
				info: false,
				responsive: true,
				data: response,
				// columns: [
				// 	{data: 'username', responsivePriority: 1},
				// 	{data: 'date_created', responsivePriority: 2},
				// 	{data: 'left'},
				// 	{data: 'right'},
				// 	{data: 'pair'},
				// 	{data: 'flushout'},
				// 	{data: 'bin_comm'},
				// 	{data: 'flushout_comm'},
				// 	{data: 'bal_left'},
				// 	{data: 'bal_right'}
				// ],
				columns: [
					{data: 'username', responsivePriority: 1},
					{data: 'date_created', responsivePriority: 2},
					{data: 'prev_left'},
					{data: 'today_left'},
					{data: 'total_left'},
					{data: 'prev_right'},
					{data: 'today_right'},
					{data: 'total_right'},
					{data: 'pair'},
					{data: 'flushout'},
					{data: 'bin_comm'},
					{data: 'flushout_comm'},
					{data: 'bal_left'},
					{data: 'bal_right'}
				],
			});
			$("body").delegate('#kt_reset','click', function(e) {
				e.stopImmediatePropagation();
				e.preventDefault();
				$('.datatable-input').each(function() {
					$(this).val('');
					table.column($(this).data('col-index')).search('', false, false);
				});
				table.table().draw();
			});
		};

	 var initTable_Order_List = function(tbl,response) {
			$('#'+tbl).DataTable().clear().destroy();
			table = $('#'+tbl).DataTable({
				// dom: `<'row'<'col-sm-6 text-left'f><'col-sm-6 text-right'B>>
				// 				<'row'<'col-sm-12'tr>>
				// 				<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
				// buttons: [
				// 		{
			 //                extend: 'print',
			 //                exportOptions: {
			 //                    columns: [0,1,2,3,4,5,6,7,8,9]
			 //                }
		  //           	},
		  //           	{
			 //                extend: 'copyHtml5',
			 //                exportOptions: {
			 //                    columns: [0,1,2,3,4,5,6,7,8,9]
			 //                }
		  //           	},
		  //           	{
			 //                extend: 'excelHtml5',
			 //                exportOptions: {
			 //                    columns: [0,1,2,3,4,5,6,7,8,9]
			 //                }
		  //           	},
				// 		{
			 //                extend: 'csvHtml5',
			 //                exportOptions: {
			 //                    columns: [0,1,2,3,4,5,6,7,8,9]
			 //                }
		  //           	},
				// 		{
			 //                extend: 'pdfHtml5',
			 //                exportOptions: {
			 //                    columns: [0,1,2,3,4,5,6,7,8,9]
			 //                }
		  //           	},
				// 	],
				searching: true, 
				language: {
			      emptyTable: "No orders"
			    },
				paging: true,
				info: false,
				responsive: true,
				data: response,
				columns: [
					{data: 'txnid', responsivePriority: 1},
					{data: 'fullname'},
					{data: 'address'},
					{data: 'email'},
					{data: 'mobile'},
					{data: 'status', responsivePriority: 3},
					{data: 'action', responsivePriority: 2}
				],
				columnDefs: [
					{
						targets: -1,
						orderable: false,
						render: function(data, type, full, meta) {
						
						return '<div class="d-flex flex-row">\
									<a href="javascript:;" class="btn btn-sm btn-clean btn-icon view-cart" data-id="'+full.action+'" title="View cart">\
										<i class="la la-shopping-cart icon-xl"></i>\
									</a>\
								</div>';

						},
					},
					{
						targets: 2,
						render: function(data, type, full, meta) {
							var status = {
								'REQUESTED': {'title': 'REQUESTED', 'state': 'label-light-warning'},
								'PROCESSING': {'title': 'PROCESSING', 'state': 'label-light-primary'},
								'IN-TRANSIT': {'title': 'IN-TRANSIT', 'state': 'label-light-info'},
								'DELIVERED': {'title': 'DELIVERED', 'state': 'label-light-success'},
								'RTS': {'title': 'RTS', 'state': 'label-light-danger'},
								'REMITTED': {'title': 'REMITTED', 'state': 'label-light-dark'}
							};
							if (typeof status[data] === 'undefined') {
								return data;
							}
							return '<span class="label label-lg font-weight-bold ' + status[data].class + ' label-inline">' + status[data].title + '</span>';
						},
					},
				],
			});
			$("body").delegate('#kt_reset','click', function(e) {
				e.stopImmediatePropagation();
				e.preventDefault();
				$('.datatable-input').each(function() {
					$(this).val('');
					table.column($(this).data('col-index')).search('', false, false);
				});
				table.table().draw();
			});
		};
	
	var initTable_Applied_Codes = function(tbl,response) {
		$('#'+tbl).DataTable().clear().destroy();
			table = $('#'+tbl).DataTable({
				searching: true, 
				language: {
			      emptyTable: "No applied code"
			    },
				paging: true,
				info: false,
				responsive: true,
				data: response,
				columns: [
					{data: 'code', responsivePriority: 1},
					{data: 'package'},
					{data: 'quantity',width: '5px'},
					{data: 'amount',width: '10px'},
					// {data: 'status'},
					// {data: 'action', responsivePriority: 2}
				],
				columnDefs: [
					{ 
					 	targets: [0,1],
						className: "text-nowrap"
					},
				],
			});
		};
var initTable_Scheduled_Package = function(tbl,response) {
			$('#'+tbl).DataTable().clear().destroy();
			table = $('#'+tbl).DataTable({
				searching: true, 
				language: {
			      emptyTable: "No scheduled package"
			    },
				paging: true,
				info: false,
				responsive: true,
				data: response,
				columns: [
					{data: 'txnid', responsivePriority: 1},
					{data: 'full_name'},
					{data: 'mobile'},
					{data: 'email'},
					{data: 'address'},
					{data: 'package', responsivePriority: 3},
					{data: 'quantity',width: '5px'},
					{data: 'amount',width: '10px'},
					{data: 'status', responsivePriority: 2},
					// {data: 'action', responsivePriority: 2}
				],
				columnDefs: [
					{ 
					 	targets: [0,5],
						className: "text-nowrap"
					},
					{
						targets: -1,
						render: function(data, type, full, meta) {
							var status = {
								'REQUESTED': {'title': 'REQUESTED', 'state': 'label-light-warning'},
								'PROCESSING': {'title': 'PROCESSING', 'state': 'label-light-primary'},
								'IN-TRANSIT': {'title': 'IN-TRANSIT', 'state': 'label-light-info'},
								'DELIVERED': {'title': 'DELIVERED', 'state': 'label-light-success'},
								'RTS': {'title': 'RTS', 'state': 'label-light-danger'},
								'REMITTED': {'title': 'REMITTED', 'state': 'label-light-dark'}
							};
							if (typeof status[data] === 'undefined') {
								return data;
							}
							return '<span class="label label-lg font-weight-bold ' + status[data].state + ' label-inline">' + status[data].title + '</span>';
						},
					},
				],
			});
		};
var initTable_Complete_Package = function(tbl,response) {
			$('#'+tbl).DataTable().clear().destroy();
			table = $('#'+tbl).DataTable({
				searching: true, 
				language: {
			      emptyTable: "No delivered package"
			    },
				paging: true,
				info: false,
				responsive: true,
				data: response,
				columns: [
					{data: 'txnid', responsivePriority: 1},
					{data: 'full_name'},
					{data: 'mobile'},
					{data: 'email'},
					{data: 'address'},
					{data: 'package', responsivePriority: 2},
					{data: 'quantity',width: '5px'},
					{data: 'amount',width: '10px'},
					{data: 'status', responsivePriority: 3},
					{data: 'date_delivered'},
					// {data: 'action', responsivePriority: 2}
				],
				columnDefs: [
					{ 
					 	targets: [0,5],
						className: "text-nowrap"
					},
					{
						targets: -2,
						render: function(data, type, full, meta) {
							var status = {
								'REQUESTED': {'title': 'REQUESTED', 'state': 'label-light-warning'},
								'PROCESSING': {'title': 'PROCESSING', 'state': 'label-light-primary'},
								'IN-TRANSIT': {'title': 'IN-TRANSIT', 'state': 'label-light-info'},
								'DELIVERED': {'title': 'DELIVERED', 'state': 'label-light-success'},
								'RTS': {'title': 'RTS', 'state': 'label-light-danger'},
								'REMITTED': {'title': 'REMITTED', 'state': 'label-light-dark'}
							};
							if (typeof status[data] === 'undefined') {
								return data;
							}
							return '<span class="label label-lg font-weight-bold ' + status[data].state + ' label-inline">' + status[data].title + '</span>';
						},
					},
				],
			});
		};
		var initTable_Report = function(tbl,response) {
		// $('#'+tbl).DataTable().clear().destroy();
		var table = $('#'+tbl);
		// table.DataTable().clear().draw().destroy();
		table.DataTable({
		    dom: `<'row'<'col-sm-6 text-left'f><'col-sm-6 text-right'B>>
								<'row'<'col-sm-12'tr>>
								<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
				buttons: [
						{
			                extend: 'print',
			                exportOptions: {
			                    columns: [0,1,2,3,4,5,6,7,8,9]
			                }
		            	},
		            	{
			                extend: 'copyHtml5',
			                exportOptions: {
			                    columns: [0,1,2,3,4,5,6,7,8,9]
			                }
		            	},
		            	{
			                extend: 'excelHtml5',
			                exportOptions: {
			                    columns: [0,1,2,3,4,5,6,7,8,9]
			                }
		            	},
						{
			                extend: 'csvHtml5',
			                exportOptions: {
			                    columns: [0,1,2,3,4,5,6,7,8,9]
			                }
		            	},
						{
			                extend: 'pdfHtml5',
			                exportOptions: {
			                    columns: [0,1,2,3,4,5,6,7,8,9]
			                }
		            	},
					],
			responsive: true,
			processing: true,
            info: true,
            // stateSave: false,
            destroy: true,
			data: response,
			columns: [
				{data: 'name', responsivePriority: 1},
				{data: 'score'},
				{data: 'grade'},
				{data: 'type'},
				{data: 'date_created'},
				{data: 'id',},
			],

			columnDefs: [
				{
					targets: -3,
					render: function(data, type, full, meta) {
						var status = {
							'passed': {'title': 'PASSED', 'state': 'success'},
							'failed': {'title': 'FAILED', 'state': 'danger'},
							'taking': {'title': 'Taking', 'state': 'info'},
							'failed_complete': {'title': 'FAILED TO COMPLETE', 'state': 'danger'}
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}


						return '<div class="d-flex flex-row align-items-center"><span class="label label-' + status[data].state + ' label-dot mr-2"></span>' +
							'<span class="font-weight-bold text-' + status[data].state + '">' + status[data].title + '</span></div>';
					},
				},
				// {
				// 	targets: -3,
				// 	render: function(data, type, full, meta) {
				// 		var status = {
				// 			'0': {'title': 'Minor', 'state': 'info'},
				// 			'1': {'title': 'Major', 'state': 'info'},
				// 		};
				// 		if (typeof status[data] === 'undefined') {
				// 			return data;
				// 		}
				// 		return '<div class="d-flex flex-row align-items-center"><span class="label label-' + status[data].state + ' label-dot mr-2"></span>' +
				// 			'<span class="font-weight-bold text-' + status[data].state + '">' + status[data].title + '</span></div>';
				// 	},
				// },
				{
					targets: -1,
					render: function(data, type, full, meta) {


						if(full.type=="taking"){
							return'';
						}else{
							var val=data.split("|");
						return '<div class="btn-group" role="group"><a class="btn btn-primary btn-shadow font-weight-bold mr-2" href="./viewresult_'+data+'"><span class="flaticon flaticon-edit"></span> View</a> </div>';
						}
						
					},
				},
			],
			"order": [[ 4, "desc" ]]
		})

	};
		return {

			//main function to initiate the module
			init: function(tbl,response) {
				if(tbl=='tbl_customer_list'){
					initTable_Customer_List(tbl,response);
				}else if(tbl=='tbl_user_commission'){
					initTable_Commision_Sales(tbl,response);
				}else if(tbl=='tbl_user_generated'){
					initTable_Generated_Sales(tbl,response);
				}else if(tbl=='tbl_user_referrals'){
					initTable_Direct_Referral(tbl,response);
				}else if(tbl=='tbl_user_binary'){
					initTable_Binary_Monitoring(tbl,response);
				}else if(tbl=='tbl_order_list'){
					initTable_Order_List(tbl,response);
				}else if(tbl=='tbl_user_applied_codes'){
					initTable_Applied_Codes(tbl,response);
				}else if(tbl=='tbl_user_scheduled'){
					initTable_Scheduled_Package(tbl,response);
				}else if(tbl=='tbl_user_complete'){
					initTable_Complete_Package(tbl,response);
				}else if(tbl=='tbl_report'){
					initTable_Report(tbl,response);
				}


			},

		};

	}();

	// jQuery(document).ready(function() {
	// 	KTDatatablesDataSourceAjaxClient.init();
	// });
