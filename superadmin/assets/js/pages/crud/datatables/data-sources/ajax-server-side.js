"use strict";
var KTDatatablesDataSourceAjaxServer = function() {
	$.fn.dataTable.Api.register('column().title()', function() {
		return $(this.header()).text().trim();
	});
	$.fn.dataTable.ext.errMode = 'throw';
	var table,table1;

// ------------------------------KYC-----------------------------------------
	var initTable_KYCReq = function(tbl) {
		// begin first table
		$('#'+tbl).DataTable().clear().destroy();
		table = $('#'+tbl).DataTable({
			dom: `<'row'<'col-sm-6 text-right d-none'B>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
			language: {
		      emptyTable: "No requested KYC"
		    },
			responsive: true,
			processing: true,
			colReorder: true,
			serverSide: true,
			destroy: true,
			ajax: {
				url: 'controller/server/server-KYC-Request.php',
				type: 'POST',
				data: {
					columnsDef: [
						'user_id','owner','email','full_name', 'tin', 'gender', 'nationality', 'civil_status',
						'birthday', 'address', 'mobile', 'emergency_person','emergency_number','status','date_requested','id1','id2','action'],
				},
				beforeSend: function() {
		        },
		        complete: function() {
		        }
			},
			columns: [
				{data: 'user_id',visible: false},
				{data: 'owner',responsivePriority: 1},
				{data: 'email'},
				{data: 'full_name'},
				{data: 'tin'},
				{data: 'gender'},
				{data: 'nationality'},
				{data: 'civil_status'},
				{data: 'birthday'},
				{data: 'address'},
				{data: 'mobile'},
				{data: 'emergency_person'},
				{data: 'emergency_number'},
				{data: 'status', responsivePriority: 4},
				{data: 'date_requested', responsivePriority: 3},
				{data: 'id1', responsivePriority: 5},
				{data: 'id2', responsivePriority: 6},
				{data: 'action', responsivePriority: 2},
			],

			columnDefs: [
				{
					targets: -1,
					orderable: false,
					render: function(data, type, full, meta) {
					return '\
							<div class="d-flex flex-row">\
								<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm m-1 approved_kyc"  data-id='+full.action+' data-fullname="'+full.full_name+'"  title="Approve KYC">\
									<i class="la la-check"></i>\
								</a>\
								<a href="javascript:;" class="btn btn-icon btn-light btn-hover-danger btn-sm m-1 invalid_kyc"  data-id='+full.action+' data-fullname="'+full.full_name+'"  title="Invalid KYC">\
									<i class="la la-times"></i>\
								</a>\
								<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm m-1 view_account_data"  data-id='+full.action+' data-fullname="'+full.full_name+'" title="View KYC">\
									<i class="la la-eye"></i>\
								</a>\
								<a href="javascript:;" class="btn btn-icon btn-light btn-hover-dark btn-sm m-1 download_kyc"  data-id='+full.action+'   data-fullname="'+full.full_name+'" title="Download ID">\
									<i class="la la-download"></i>\
								</a>\
							</div>';
					},
				},
				{
					targets: -5,
					render: function(data, type, full, meta) {
						var status = {
							'P': {'title': 'Pending', 'state': 'info'},
							'S': {'title': 'Approved', 'state': 'success'},
							'C': {'title': 'Cancelled', 'state': 'danger'}
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<div class="d-flex flex-row align-items-center"><span class="label label-' + status[data].state + ' label-dot mr-2"></span>' +
							'<span class="font-weight-bold text-' + status[data].state + '">' + status[data].title + '</span></div>';
					},
				},
			],
			});
							$("body").delegate('#kt_search','click', function(e) {
								e.stopImmediatePropagation();
								e.preventDefault();
								var params = {};
								$('.datatable-input').each(function() {
									var i = $(this).data('col-index');
									if (params[i]) {
										if($(this).val()!=''){
										params[i] += '|' + $(this).val();
										}
									}
									else {
										params[i] = $(this).val();
									}
								});
								// alert(JSON.stringify(params));
								$.each(params, function(i, val) {
									// apply search params to datatable
									table.column(i).search(val ? val : '', false, false);
									// alert(val);
								});
								 table.table().draw();
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

							$('div[name="kt_datepicker"]').datepicker({
								todayHighlight: true,
								templates: {
									leftArrow: '<i class="la la-angle-left"></i>',
									rightArrow: '<i class="la la-angle-right"></i>',
								},
							});

	};

var initTable_KYC_Invalid = function(tbl) {
	$('#'+tbl).DataTable().clear().destroy();
		table = $('#'+tbl).DataTable({
			responsive: true,
			language: {
		      emptyTable: "No cancelled KYC"
		    },
			processing: true,
			serverSide: true,
			destroy: true,
			ajax: {
				url: 'controller/server/server-KYC-Invalid.php',
				type: 'POST',
				data: {
					columnsDef: [
						'user_id','owner','email','full_name', 'tin', 'gender', 'nationality', 'civil_status',
						'birthday', 'address', 'mobile', 'emergency_person','emergency_number','status','date_requested','id1','id2','by','action'],
				},
				beforeSend: function() {
		        },
		        complete: function() {
		        }
			},
			columns: [
				{data: 'user_id',visible: false},
				{data: 'owner',responsivePriority: 1},
				{data: 'email'},
				{data: 'full_name'},
				{data: 'tin'},
				{data: 'gender'},
				{data: 'nationality'},
				{data: 'civil_status'},
				{data: 'birthday'},
				{data: 'address'},
				{data: 'mobile'},
				{data: 'emergency_person'},
				{data: 'emergency_number'},
				{data: 'status', responsivePriority: 4},
				{data: 'date_requested', responsivePriority: 3},
				{data: 'id1', responsivePriority: 5},
				{data: 'id2', responsivePriority: 6},
				{data: 'by', responsivePriority: 7},
				{data: 'action', responsivePriority: 2},
			],
			columnDefs: [
				{
					targets: -1,
					title: 'Action',
					orderable: false,
					render: function(data, type, full, meta) {
					
						return '\
							<div class="d-flex flex-row">\
								<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm m-1 view_account_data"  data-id='+full.action+' data-fullname='+full.full_name+' title="View KYC">\
									<i class="la la-eye"></i>\
								</a>\
								<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm m-1 view_remarks_kyc"  data-id='+full.action+' data-fullname='+full.full_name+' title="View KYC">\
									<i class="flaticon2 flaticon2-document "></i>\
								</a>\
							</div>';
					},
				},
				{
					targets: -5,
					render: function(data, type, full, meta) {
						var status = {
							'P': {'title': 'Pending', 'state': 'info'},
							'S': {'title': 'Approved', 'state': 'success'},
							'C': {'title': 'Cancelled', 'state': 'danger'}
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<div class="d-flex flex-row align-items-center"><span class="label label-' + status[data].state + ' label-dot mr-2"></span>' +
							'<span class="font-weight-bold text-' + status[data].state + '">' + status[data].title + '</span></div>';
					},
				},
			],
		});
		table.ajax.reload();
	};

	var initTable_KYC_Approved = function(tbl) {
		$('#'+tbl).DataTable().clear().destroy();
		table = $('#'+tbl).DataTable({
			responsive: true,
			language: {
		      emptyTable: "No approved KYC"
		    },
			processing: true,
			serverSide: true,
			destroy: true,
			ajax: {
				url: 'controller/server/server-KYC-Approved.php',
				type: 'POST',
				data: {
					columnsDef: [
						'user_id','owner','email','full_name', 'tin', 'gender', 'nationality', 'civil_status',
						'birthday', 'address', 'mobile', 'emergency_person','emergency_number','status','date_requested','id1','id2','by','action'],
				},
				beforeSend: function() {
		        },
		        complete: function() {
		        }
			},
			columns: [
				{data: 'user_id',visible: false},
				{data: 'owner',responsivePriority: 1},
				{data: 'email'},
				{data: 'full_name'},
				{data: 'tin'},
				{data: 'gender'},
				{data: 'nationality'},
				{data: 'civil_status'},
				{data: 'birthday'},
				{data: 'address'},
				{data: 'mobile'},
				{data: 'emergency_person'},
				{data: 'emergency_number'},
				{data: 'status', responsivePriority: 4},
				{data: 'date_requested', responsivePriority: 3},
				{data: 'id1', responsivePriority: 5},
				{data: 'id2'},
				{data: 'by'},
				{data: 'action', responsivePriority: 2}
			],
			columnDefs: [
				{
					targets: -1,
					orderable: false,
					render: function(data, type, full, meta) {
					return '\
							<div class="d-flex flex-row">\
								<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm m-1 view_account_data"  data-id='+full.action+' data-fullname='+full.full_name+' >\
									<i class="la la-eye"></i>\
								</a>\
							</div>';
					},
				},
				{
					targets: -6,
					render: function(data, type, full, meta) {
						var status = {
							'P': {'title': 'Pending', 'state': 'info'},
							'S': {'title': 'Approved', 'state': 'success'},
							'C': {'title': 'Cancelled', 'state': 'danger'}
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<div class="d-flex flex-row align-items-center"><span class="label label-' + status[data].state + ' label-dot mr-2"></span>' +
							'<span class="font-weight-bold text-' + status[data].state + '">' + status[data].title + '</span></div>';
					},
				},
			],
		});
		table.ajax.reload();
	};
















	// ------------------------------Payout-----------------------------------------
	var initTable_Payout_Req = function(tbl) {
		// begin first table
		$('#'+tbl).DataTable().clear().destroy();
		table = $('#'+tbl).DataTable({
			dom: `<'row'<'col-sm-6 text-right d-none'B>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
			language: {
		      emptyTable: "No requested payout"
		    },
			responsive: true,
			processing: true,
			serverSide: true,
			destroy: true,
			ajax: {
				url: 'controller/server/server-Payout-Request.php',
				type: 'POST',
				data: {
					columnsDef: [
						'count','txnid','name', 'username', 'mop', 'acc_name', 'acc_number',
						'mobile', 'total_payout', 'date_requested', 'status','action'],
				},
				beforeSend: function() {
		        },
		        complete: function(res) {
		        }
			},
			columns: [
				{data: 'count',visible: false},
				{data: 'txnid',responsivePriority: 1},
				{data: 'name'},
				{data: 'username'},
				{data: 'mop'},
				{data: 'acc_name'},
				{data: 'acc_number'},
				{data: 'mobile'},
				{data: 'total_payout'},
				{data: 'date_requested'},
				{data: 'status'},
				{data: 'action', responsivePriority: 2},	
			],

			columnDefs: [
				{
					targets: -1,
					orderable: false,
					render: function(data, type, full, meta) {
					return '\
							<div class="d-flex flex-row">\
								<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm m-1 approved_payout"  data-id='+full.action+' data-txnid='+full.txnid+'  title="Approve Payout">\
									<i class="la la-check"></i>\
								</a>\
								<a href="javascript:;" class="btn btn-icon btn-light btn-hover-danger btn-sm m-1 invalid_payout"  data-id='+full.action+' data-txnid='+full.txnid+'  title="Invalid Payout">\
									<i class="la la-times"></i>\
								</a>\
							</div>';
					},
				},
				{
					targets: -2,
					render: function(data, type, full, meta) {
						var status = {
							'P': {'title': 'Pending', 'state': 'info'},
							'S': {'title': 'Approved', 'state': 'success'},
							'C': {'title': 'Cancelled', 'state': 'danger'}
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<div class="d-flex flex-row align-items-center"><span class="label label-' + status[data].state + ' label-dot mr-2"></span>' +
							'<span class="font-weight-bold text-' + status[data].state + '">' + status[data].title + '</span></div>';
					},
				},
			],
			});
							$("body").delegate('#kt_search_payout','click', function(e) {
								e.stopImmediatePropagation();
								e.preventDefault();
								var params = {};
								$('.datatable-input').each(function() {
									var i = $(this).data('col-index');
									if (params[i]) {
										if($(this).val()!=''){
										params[i] += '|' + $(this).val();
										}
									}
									else {
										params[i] = $(this).val();
									}
								});
								// alert(JSON.stringify(params));
								$.each(params, function(i, val) {
									// apply search params to datatable
									table.column(i).search(val ? val : '', false, false);
									// alert(val);
								});
								 table.table().draw();
							});

							$("body").delegate('#kt_reset_payout','click', function(e) {
								e.stopImmediatePropagation();
								e.preventDefault();
								$('.datatable-input').each(function() {
									$(this).val('');
									table.column($(this).data('col-index')).search('', false, false);
								});
								table.table().draw();
							});

							$('div[name="kt_datepicker"]').datepicker({
								todayHighlight: true,
								templates: {
									leftArrow: '<i class="la la-angle-left"></i>',
									rightArrow: '<i class="la la-angle-right"></i>',
								},
							});
							table.ajax.reload();
	};

	var initTable_Payout_Invalid = function(tbl) {
	$('#'+tbl).DataTable().clear().destroy();
		table = $('#'+tbl).DataTable({
			responsive: true,
			language: {
		      emptyTable: "No cancelled payout"
		    },
			processing: true,
			serverSide: true,
			destroy: true,
			ajax: {
				url: 'controller/server/server-Payout-Invalid.php',
				type: 'POST',
				data: {
					columnsDef: [
						'count','txnid','name', 'username', 'mop', 'acc_name', 'acc_number',
						'mobile', 'total_payout', 'date_cancelled', 'status','update_by','action'],
				},
				beforeSend: function() {
		        },
		        complete: function() {
		        }
			},
			columns: [
				{data: 'count',visible: false},
				{data: 'txnid',responsivePriority: 1},
				{data: 'name'},
				{data: 'username'},
				{data: 'mop'},
				{data: 'acc_name'},
				{data: 'acc_number'},
				{data: 'mobile'},
				{data: 'total_payout'},
				{data: 'date_cancelled'},
				{data: 'status'},
				{data: 'update_by'},
				{data: 'action', responsivePriority: 2},	
			],
			columnDefs: [
				{
					targets: -1,
					title: 'Action',
					orderable: false,
					render: function(data, type, full, meta) {
					
						return '\
								<div class="d-flex flex-row">\
										<button data-id="'+full.action+'" class="btn btn-sm btn-clean view_remarks_payout" title="View remarks">\
				            			Remarks <i class="flaticon2-document ml-3"></i></button>\
								</div>';
					},
				},
				{
					targets: -3,
					render: function(data, type, full, meta) {
						var status = {
							'P': {'title': 'Pending', 'state': 'info'},
							'S': {'title': 'Approved', 'state': 'success'},
							'C': {'title': 'Cancelled', 'state': 'danger'}
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<div class="d-flex flex-row align-items-center"><span class="label label-' + status[data].state + ' label-dot mr-2"></span>' +
							'<span class="font-weight-bold text-' + status[data].state + '">' + status[data].title + '</span></div>';
					},
				},
			],
		});
		table.ajax.reload();
	};

	var initTable_Payout_Approved = function(tbl) {
		$('#'+tbl).DataTable().clear().destroy();
		table = $('#'+tbl).DataTable({
			responsive: true,
			language: {
		      emptyTable: "No approved payout"
		    },
			processing: true,
			serverSide: true,
			destroy: true,
			ajax: {
				url: 'controller/server/server-Payout-Approved.php',
				type: 'POST',
				data: {
					columnsDef: [
						'count','txnid','name', 'username', 'mop', 'acc_name', 'acc_number',
						'mobile', 'total_payout', 'date_confirmed', 'status','update_by'],
				},
				beforeSend: function() {
		        },
		        complete: function() {
		        }
			},
			columns: [
				{data: 'count',visible: false},
				{data: 'txnid',responsivePriority: 1},
				{data: 'name'},
				{data: 'username'},
				{data: 'mop'},
				{data: 'acc_name'},
				{data: 'acc_number'},
				{data: 'mobile'},
				{data: 'total_payout'},
				{data: 'date_confirmed'},
				{data: 'status'},
				{data: 'update_by', responsivePriority: 2},	
			],
			columnDefs: [
				{
					targets: -2,
					render: function(data, type, full, meta) {
						var status = {
							'P': {'title': 'Pending', 'state': 'info'},
							'S': {'title': 'Approved', 'state': 'success'},
							'C': {'title': 'Cancelled', 'state': 'danger'}
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<div class="d-flex flex-row align-items-center"><span class="label label-' + status[data].state + ' label-dot mr-2"></span>' +
							'<span class="font-weight-bold text-' + status[data].state + '">' + status[data].title + '</span></div>';
					},
				},
			],
		});
		table.ajax.reload();
	};
	var initTable_Package_Code = function(tbl,id) {
		if(id=='reload'){
			table1.ajax.reload();
		}else{
			$('#'+tbl).DataTable().clear().destroy();
			table1 = $('#'+tbl).DataTable({
				responsive: true,
				language: {
			      emptyTable: "No approved Package Code"
			    },
				processing: true,
				serverSide: true,
				destroy: true,
				ajax: {
					url: 'controller/server/server-Package-Code.php',
					type: 'POST',
					data: {
						columnsDef: [
							'user_id','txnid','quantity' , 'used_code', 'total_price', 'date_confirmed',
							'payment_method', 'status', 'date_created', 'generated_by','description','action'],
					},
					beforeSend: function() {
			        },
			        complete: function() {
			        }
				},
				columns: [
					{data: 'user_id',visible: false},
					// {data: 'owner_username',responsivePriority: 1},
					{data: 'txnid', responsivePriority: 2},
					{data: 'quantity'},
					{data: 'used_code'},
					{data: 'total_price'},
					{data: 'date_confirmed'},
					{data: 'payment_method', responsivePriority: 7},
					{data: 'status', responsivePriority: 6},
					{data: 'date_created', responsivePriority: 5},
					{data: 'generated_by', responsivePriority: 4},
					{data: 'description', responsivePriority: 3},
					{data: 'action', responsivePriority: 1},	

					
				],
				columnDefs: [
					{
						targets: -1,
						orderable: false,
						render: function(data, type, full, meta) {
						let stat='';
						if(full.status=='AC'){
							stat='checked';
						}
						return '\
								<div class="d-flex flex-row">\
									<div class="dropdown dropdown-inline">\
										<a href="javascript:;" id="dropdownMenuButton" class="btn btn-icon btn-light btn-hover-primary btn-sm m-1" data-toggle="dropdown" aria-expanded="true">\
	        									<i class="la la-cog"></i>\
	        									</a>\
								        <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">\
										    <ul class="nav nav-hoverable flex-column">\
										        <li class="nav-item">\
										            <a class="nav-link" href="javascript:;">\
										                <i class="nav-icon la la-leaf"></i>\
										                <span class="nav-text">Status</span>\
										                <span class="switch switch-sm switch-icon">\
										                    <label>\
										                        <input type="checkbox" class="update_package_code" '+stat+'  name="all_package_code_status" data-id='+full.action+'><span></span>\
										                    </label>\
										                </span>\
										            </a>\
										        </li>\
										    </ul>\
										</div>\
									</div>\
									<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm m-1 view_package_code"  data-id='+full.action+' title="View Package">\
										<i class="la la-eye"></i>\
									</a>\
									<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm m-1 view_remarks_code"  data-id='+full.action+' title="View description">\
										<i class="flaticon2 flaticon2-document "></i>\
									</a>\
								</div>';
						},
					},
					{
						targets: 3,
						render: function(data, type, full, meta) {
							
							return '<div class="d-flex flex-row align-items-center">' +
								'<span class="font-weight-bold text-danger">' + full.used_code + '</span></div>';
						},
					},
					{
						targets: 7,
						render: function(data, type, full, meta) {
							var status = {
								'US': {'title': 'Used', 'state': 'info'},
								'AC': {'title': 'Active', 'state': 'success'},
								'IN': {'title': 'Inactive', 'state': 'danger'}
							};
							if (typeof status[data] === 'undefined') {
								return data;
							}
							return '<div class="d-flex flex-row align-items-center"><span class="label label-' + status[data].state + ' label-dot mr-2"></span>' +
								'<span class="font-weight-bold text-' + status[data].state + '">' + status[data].title + '</span></div>';
						},
					},
				],
			});

		}
	};


	/////////////// Fulfillment ///////////////////

var initTable_Fulfillment = function(tbl,status_type,type) {
		// begin first table
		if(type=='reload'){
			table.ajax.reload();
		}else{
			$('#'+tbl).DataTable().clear().destroy();
			table = $('#'+tbl).DataTable({
			// dom: `<'row'<'col-sm-6 text-right d-none'B>>
			// <'row'<'col-sm-12'tr>>
			// <'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
			language: {
		      emptyTable: "No "+status_type
		    },
			responsive: true,
			processing: true,
			serverSide: true,
			destroy: true,
			ajax: {
				url: 'controller/server/server-Fulfillment.php',
				type: 'POST',
				data: {
					columnsDef: [
						'user_id','txnid','username', 'date_created', 'product_type','full_name','mobile','email','address','quantity', 'price', 'discount', 'tax', 'total_price', 'status', 'delivery_type','payment_method','date_checkout','date_confirmed','action'],
						status_type:status_type
				},
				beforeSend: function() {
					// KTApp.blockPage({
					//   overlayColor: '#000000',
					//   state: 'danger',
					//   message: 'Please wait...'
					//  });
		        },
		        complete: function() {
		            $('#'+tbl).fadeIn();
		            $('#'+tbl).DataTable().columns.adjust().responsive.recalc();
		            APPHANDLER.callFunction('reload_fulfillment');
		            // KTApp.unblockPage();
		        }
			},
			columns: [
				{data: 'user_id',visible: false},
				{data: 'txnid',responsivePriority: 1},
				{data: 'username'},
				{data: 'date_created'},
				{data: 'product_type'},
				{data: 'full_name'},
				{data: 'mobile'},
				{data: 'email'},
				{data: 'address'},
				{data: 'quantity'},
				{data: 'price'},
				{data: 'discount'},
				{data: 'tax'},
				{data: 'total_price',responsivePriority: 5},
				{data: 'status',responsivePriority: 3},
				{data: 'delivery_type',responsivePriority: 4},
				{data: 'payment_method'},
				{data: 'date_checkout'},
				{data: 'date_confirmed'},
				{data: 'action',responsivePriority: 2}
			],
			columnDefs: [
				{ 
				 	targets: [5,10,11,12,13,14],
					className: "text-nowrap"
				},
				{
					targets: -1,
					orderable: false,
					render: function(data, type, full, meta) {
					let move_btn='<a href="javascript:;" class="btn btn-icon btn-light btn-hover-info btn-sm m-1 move_fulfillment" data-status='+full.status+' data-id='+full.action+' data-table='+tbl+'  data-txnid='+full.txnid+' title="Move">\
									<i class="la la-arrow-alt-circle-right"></i>\
								</a>';
					if(full.status=='REMITTED' || full.status=='RTS'){
						move_btn='';
					}
					return '\
							<div class="d-flex flex-row">\
								<div class="dropdown dropdown-inline" >\
										<a href="javascript:;" id="dropdownMenuButton" class="btn btn-icon btn-light btn-hover-primary btn-sm m-1" data-toggle="dropdown" aria-expanded="true">\
	        									<i class="la la-cog"></i>\
	        									</a>\
								        <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">\
										    <ul class="nav nav-hoverable flex-column">\
										        <li class="nav-item">\
										            <a class="nav-link fulfillment_view_details" data-id='+full.action+' href="javascript:;" data-txnid="'+full.txnid+'">\
										                <i class="nav-icon flaticon flaticon-information"></i>\
										                <span class="nav-text">Details</span>\
										            </a>\
										            <a class="nav-link fulfillment_view_logs" data-id='+full.action+' href="javascript:;">\
										                <i class="nav-icon flaticon flaticon-folder-1"></i>\
										                <span class="nav-text">Logs</span>\
										            </a>\
										        </li>\
										    </ul>\
										</div>\
									</div>\
								<a href="javascript:;" class="btn btn-icon btn-light btn-hover-info btn-sm m-1 add_remarks_request" data-status='+full.status+'  data-id='+full.action+' data-table='+tbl+'  data-txnid='+full.txnid+' title="Add Remarks">\
									<i class="la la-folder-plus"></i>\
								</a>\
								'+move_btn+'\
							</div>';
					},
				},
				{
					targets: -6,
					render: function(data, type, full, meta) {
						var status = {
							'REQUESTED': {'title': 'REQUESTED', 'state': 'primary'},
							'PROCESSING': {'title': 'PROCESSING', 'state': 'warning'},
							'IN-TRANSIT': {'title': 'IN-TRANSIT', 'state': 'info'},
							'DELIVERED': {'title': 'DELIVERED', 'state': 'success'},
							'RTS': {'title': 'RTS', 'state': 'danger'},
							'REMITTED': {'title': 'REMITTED', 'state': 'dark'}
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<div class="d-flex flex-row align-items-center"><span class="label label-' + status[data].state + ' label-dot mr-2"></span>' +
							'<span class="font-weight-bold text-' + status[data].state + '">' + status[data].title + '</span></div>';
					},
				},
			],
			});
		}
	};

	var initTable_Fulfillment_Details_View = function(tbl,id) {
	$('#'+tbl).DataTable().clear().destroy();
		table = $('#'+tbl).DataTable({
			dom: `<'row'<'col-sm-6 text-right d-none'B>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
			responsive: true,
			language: {
		      emptyTable: "No details found payout"
		    },
			processing: true,
			serverSide: true,
			destroy: true,
			ajax: {
				url: 'controller/server/server-Fulfillment-Details.php',
				type: 'POST',
				data: {
					columnsDef: [
						'product','item','product_type','quantity','price', 'price_type', 'voucher_type', 'total_discount', 'total_price','tax','status','date_created'],
						id:id
				},
				beforeSend: function() {
		        },
		        complete: function() {
		        }
			},
			columns: [
				{data: 'product'},
				{data: 'item'},
				{data: 'product_type'},
				{data: 'quantity',responsivePriority: 1},
				{data: 'price'},
				{data: 'price_type'},
				{data: 'voucher_type'},
				{data: 'total_discount'},
				{data: 'total_price'},
				{data: 'tax'},
				{data: 'status', responsivePriority: 2},
				{data: 'date_created', responsivePriority: 3}
			],
			columnDefs: [
				// {
				// 	targets: -1,
				// 	title: 'Action',
				// 	orderable: false,
				// 	render: function(data, type, full, meta) {
					
				// 		return '\
				// 				<div class="d-flex flex-row">\
				// 					<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm m-1 view_members_user"  data-id='+full.action+' data-fullname='+full.full_name+' title="View member user">\
				// 						<i class="la la-eye"></i>\
				// 					</a>\
				// 				</div>';
				// 	},
				// },
				{
					targets: -2,
					render: function(data, type, full, meta) {
						var status = {
							'REQUESTED': {'title': 'REQUESTED', 'state': 'primary'},
							'PROCESSING': {'title': 'PROCESSING', 'state': 'warning'},
							'IN-TRANSIT': {'title': 'IN-TRANSIT', 'state': 'info'},
							'DELIVERED': {'title': 'DELIVERED', 'state': 'success'},
							'RTS': {'title': 'RTS', 'state': 'danger'},
							'REMITTED': {'title': 'REMITTED', 'state': 'dark'}
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<div class="d-flex flex-row align-items-center"><span class="label label-' + status[data].state + ' label-dot mr-2"></span>' +
							'<span class="font-weight-bold text-' + status[data].state + '">' + status[data].title + '</span></div>';
					},
				},
			],
		});
	};
	

	/////////////////////// MEMBERS /////////////////////////
	var initTable_Members = function(tbl) {
	$('#'+tbl).DataTable().clear().destroy();
		table = $('#'+tbl).DataTable({
			dom: `<'row'<'col-sm-6 text-right d-none'B>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
			responsive: true,
			language: {
		      emptyTable: "No cancelled payout"
		    },
			processing: true,
			serverSide: true,
			destroy: true,
			ajax: {
				url: 'controller/server/server-Members.php',
				type: 'POST',
				data: {
					columnsDef: [
						'count','user','username','email', 'mobile', 'date_registration', 'sponsor_id', 'status','action'],
				},
				beforeSend: function() {
		        },
		        complete: function() {
		        }
			},
			columns: [
				{data: 'count',visible: false},
				{data: 'user'},
				{data: 'username',responsivePriority: 1},
				{data: 'email'},
				{data: 'mobile'},
				{data: 'date_registration'},
				{data: 'sponsor_id'},
				{data: 'status'},
				{data: 'action', responsivePriority: 2}
			],
			columnDefs: [
				{
					targets: -1,
					title: 'Action',
					orderable: false,
					render: function(data, type, full, meta) {
					
						return '\
								<div class="d-flex flex-row">\
									<a href="javascript:;" class="btn btn-icon btn-light btn-hover-primary btn-sm m-1 view_members_user"  data-id='+full.action+' data-fullname='+full.full_name+' title="View member user">\
										<i class="la la-eye"></i>\
									</a>\
								</div>';
					},
				},
				{
					targets: -2,
					render: function(data, type, full, meta) {
						var status = {
							//'US': {'title': 'Used', 'state': 'info'},
							'2': {'title': 'On Hold', 'state': 'warning'},
							'1': {'title': 'Active', 'state': 'success'},
							'0': {'title': 'Inactive', 'state': 'danger'}
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<div class="d-flex flex-row align-items-center"><span class="label label-' + status[data].state + ' label-dot mr-2"></span>' +
							'<span class="font-weight-bold text-' + status[data].state + '">' + status[data].title + '</span></div>';
					},
				},
			],
		});
							$("body").delegate('#kt_search_member','click', function(e) {
								e.stopImmediatePropagation();
								e.preventDefault();
								var params = {};
								$('.datatable-input').each(function() {
									var i = $(this).data('col-index');
									if (params[i]) {
										if($(this).val()!=''){
										params[i] += '|' + $(this).val();
										}
									}
									else {
										params[i] = $(this).val();
									}
								});
								// alert(JSON.stringify(params));
								$.each(params, function(i, val) {
									// apply search params to datatable
									table.column(i).search(val ? val : '', false, false);
									// alert(val);
								});
								 table.table().draw();
							});

							$("body").delegate('#kt_reset_member','click', function(e) {
								e.stopImmediatePropagation();
								e.preventDefault();
								$('.datatable-input').each(function() {
									$(this).val('');
									table.column($(this).data('col-index')).search('', false, false);
								});
								table.table().draw();
							});
							$('div[name="kt_datepicker"]').datepicker({
								todayHighlight: true,
								templates: {
									leftArrow: '<i class="la la-angle-left"></i>',
									rightArrow: '<i class="la la-angle-right"></i>',
								},
							});
		//table.ajax.reload();
	};
	var initTable_Package_Code_View = function(tbl, id) {
		$('#'+tbl).DataTable().clear().destroy();
		table = $('#'+tbl).DataTable({
			dom: `<'row'<'col-sm-6 text-left'f><'col-sm-6 text-right'B>>
								<'row'<'col-sm-12'tr>>
								<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
			buttons: [
				{
	                extend: 'print',
	                exportOptions: {
	                    columns: [0,1,2,3,4,5,6,7]
	                }
            	},
            	{
	                extend: 'copyHtml5',
	                exportOptions: {
	                    columns: [0,1,2,3,4,5,6,7]
	                }
            	},
            	{
	                extend: 'excelHtml5',
	                exportOptions: {
	                    columns: [0,1,2,3,4,5,6,7]
	                }
            	},
				{
	                extend: 'csvHtml5',
	                exportOptions: {
	                    columns: [0,1,2,3,4,5,6,7]
	                }
            	},
				{
	                extend: 'pdfHtml5',
	                exportOptions: {
	                    columns: [0,1,2,3,4,5,6,7]
	                }
            	},
			],
			responsive: true,
			language: {
		      emptyTable: "No code"
		    },
			processing: true,
			serverSide: true,
			destroy: true,
			ajax: {
				url: 'controller/server/server-Package-Code-View.php',
				type: 'POST',
				data: {
					columnsDef: [
						'owner_username','fullname','user_code','package','price',  'tax', 'total_price', 'status'],
						id:id
				},
				beforeSend: function() {
		        },
		        complete: function() {
		        }
			},
			columns: [
				{data: 'owner_username'},
				{data: 'fullname'},
				{data: 'user_code',responsivePriority: 1},
				{data: 'package'},
				{data: 'price'},
				{data: 'tax'},
				{data: 'total_price',responsivePriority: 3},
				{data: 'status',responsivePriority: 2},
				// {data: 'date_used'},
			],
			columnDefs: [
				{
					targets: -1,
					render: function(data, type, full, meta) {
						var status = {
							'US': {'title': 'Used', 'state': 'warning'},
							'AC': {'title': 'Active', 'state': 'success'},
							'IN': {'title': 'Inactive', 'state': 'danger'},
							'AP': {'title': 'Applied', 'state': 'info'}
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<div class="d-flex flex-row align-items-center"><span class="label label-' + status[data].state + ' label-dot mr-2"></span>' +
							'<span class="font-weight-bold text-' + status[data].state + '">' + status[data].title + '</span></div>';
					},
				},
			],
		});
		//table.table().draw();
		table.ajax.reload();
	};
	var initTable_Package_Code_Used = function(tbl, id) {
		$('#'+tbl).DataTable().clear().destroy();
		table = $('#'+tbl).DataTable({
			responsive: true,
			language: {
		      emptyTable: "No Used package"
		    },
			processing: true,
			serverSide: true,
			destroy: true,
			ajax: {
				url: 'controller/server/server-Package-Code-Used.php',
				type: 'POST',
				data: {
					columnsDef: [
						'owner_username','user_code','price', 'price_type', 'last_voucher_type', 'total_discount', 'total_price',
						'tax', 'status', 'date_used'],
				},
				beforeSend: function() {
		        },
		        complete: function() {
		        }
			},
			columns: [
				{data: 'owner_username'},
				{data: 'user_code',responsivePriority: 1},
				{data: 'price'},
				{data: 'price_type'},
				{data: 'last_voucher_type'},
				{data: 'total_discount'},
				{data: 'total_price',responsivePriority: 3},
				{data: 'tax'},
				{data: 'status',responsivePriority: 2},
				{data: 'date_used'},
			],
			columnDefs: [
				{
					targets: -2,
					render: function(data, type, full, meta) {
						var status = {
							'US': {'title': 'Used', 'state': 'warning'},
							'AC': {'title': 'Active', 'state': 'success'},
							'IN': {'title': 'Inactive', 'state': 'danger'},
							'AP': {'title': 'Applied', 'state': 'info'}
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<div class="d-flex flex-row align-items-center"><span class="label label-' + status[data].state + ' label-dot mr-2"></span>' +
							'<span class="font-weight-bold text-' + status[data].state + '">' + status[data].title + '</span></div>';
					},
				},
			],
		});
		//table.table().draw();
		table.ajax.reload();
	};

	var initTable_Members_Enchashment_Details = function(tbl,id) {
		// begin first table
		$('#'+tbl).DataTable().clear().destroy();
		table = $('#'+tbl).DataTable({
			dom: `<'row'<'col-sm-6 text-right d-none'B>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
			language: {
		      emptyTable: "No encashment transactions"
		    },
			responsive: true,
			processing: true,
			serverSide: true,
			destroy: true,
			ajax: {
				url: 'controller/server/server-Members-Encashment-Details.php',
				type: 'POST',
				data: {
					columnsDef: [
						'txnid','mop','acc_name', 'acc_number', 'mobile','total_payout', 'date_encashed', 'date_update', 'status'],
						id:id
				},
				beforeSend: function() {
		        },
		        complete: function() {
		        }
			},
			columns: [
				{data: 'txnid',responsivePriority: 1},
				{data: 'mop'},
				{data: 'acc_name'},
				{data: 'acc_number'},
				{data: 'mobile'},
				{data: 'total_payout'},
				{data: 'date_encashed'},
				{data: 'date_update'},
				{data: 'status',responsivePriority: 2}
			],
			columnDefs: [
				{
					targets: -1,
					render: function(data, type, full, meta) {
						var status = {
							'P': {'title': 'Pending', 'state': 'info'},
							'S': {'title': 'Approved', 'state': 'success'},
							'C': {'title': 'Cancelled', 'state': 'danger'}
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<div class="d-flex flex-row align-items-center"><span class="label label-' + status[data].state + ' label-dot mr-2"></span>' +
							'<span class="font-weight-bold text-' + status[data].state + '">' + status[data].title + '</span></div>';
					},
				},
			],
			});
	};

	var initTable_Members_Commission_Details = function(tbl,id) {
		// begin first table
		$('#'+tbl).DataTable().clear().destroy();
		table = $('#'+tbl).DataTable({
			dom: `<'row'<'col-sm-6 text-right d-none'B>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
			language: {
		      emptyTable: "No Commission Transactions"
		    },
			responsive: true,
			processing: true,
			serverSide: true,
			destroy: true,
			ajax: {
				url: 'controller/server/server-Members-Commission-Details.php',
				type: 'POST',
				data: {
					columnsDef: [
						'type','amount','date_created'],
						id:id
				},
				beforeSend: function() {
		        },
		        complete: function() {
		        }
			},
			columns: [
				{data: 'type',responsivePriority: 1},
				{data: 'amount'},
				{data: 'date_created'}
			],
			columnDefs: [
				
			],
			});
	};

	////////// Unscheduled ////////////////

	var initTable_Unscheduled = function(tbl) {
		// begin first table
		$('#'+tbl).DataTable().clear().destroy();
		table = $('#'+tbl).DataTable({
			dom: `<'row'<'col-sm-6 text-right d-none'B>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
			language: {
		      emptyTable: "No requested Unscheduled"
		    },
			responsive: true,
			processing: true,
			colReorder: true,
			serverSide: true,
			destroy: true,
			ajax: {
                url: 'controller/server/server-Unscheduled.php',
                type: 'POST',
                data: {
                    columnsDef: [
                        'user_id','txnid','username', 'date_created', 'product_type','quantity', 'price', 'discount', 'tax', 'total_price', 'delivery_type'],
                },
                beforeSend: function() {
                },
                complete: function() {
                }
            },
            columns: [
                {data: 'user_id',visible: false},
                {data: 'txnid',responsivePriority: 1},
                {data: 'username'},
                {data: 'date_created'},
                {data: 'product_type'},
                {data: 'quantity'},
                {data: 'price'},
                {data: 'discount'},
                {data: 'tax'},
                {data: 'total_price'},
                {data: 'delivery_type'},
            ],

			columnDefs: [
				// {
				// 	targets: -1,
				// 	orderable: false,
				// 	render: function(data, type, full, meta) {
				// 	return '\
				// 			<div class="d-flex flex-row">\
				// 				<a href="javascript:;" class="btn btn-icon btn-light btn-hover-info btn-sm m-1 add_unscheduled_remarks"  data-id='+full.action+'   data-fullname='+full.txnid+' title="Move to Request">\
				// 					<i class="la la-folder-plus"></i>\
				// 				</a>\
				// 				<a href="javascript:;" class="btn btn-icon btn-light btn-hover-info btn-sm m-1 move_to_request"  data-id='+full.action+'   data-fullname='+full.txnid+' title="Move to Request">\
				// 					<i class="la la-arrow-alt-circle-right"></i>\
				// 				</a>\
				// 			</div>';
				// 	},
				// },
			],
			});
							$("body").delegate('#kt_search_unscheduled','click', function(e) {
								e.stopImmediatePropagation();
								e.preventDefault();
								var params = {};
								$('.datatable-input').each(function() {
									var i = $(this).data('col-index');
									if (params[i]) {
										if($(this).val()!=''){
										params[i] += '|' + $(this).val();
										}
									}
									else {
										params[i] = $(this).val();
									}
								});
								// alert(JSON.stringify(params));
								$.each(params, function(i, val) {
									// apply search params to datatable
									table.column(i).search(val ? val : '', false, false);
									// alert(val);
								});

								 table.table().draw();

							});

							$("body").delegate('#kt_reset_unscheduled','click', function(e) {
								e.stopImmediatePropagation();
								e.preventDefault();
								$('.datatable-input').each(function() {
									$(this).val('');
									table.column($(this).data('col-index')).search('', false, false);
								});
								table.table().draw();
							});

							$('div[name="kt_datepicker"]').datepicker({
								todayHighlight: true,
								templates: {
									leftArrow: '<i class="la la-angle-left"></i>',
									rightArrow: '<i class="la la-angle-right"></i>',
								},
							});

	};
	//////////// Reseller Tools ////////////////
	var initTable_Reseller_Poster = function(tbl,id) {
		// begin first table
		if(id=='reload'){
			table1.ajax.reload();
		}else{
			$('#'+tbl).DataTable().clear().destroy();
		table1 = $('#'+tbl).DataTable({
			dom: `<'row'<'col-sm-6 text-right d-none'B>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
			language: {
		      emptyTable: "No reseller poster"
		    },
			responsive: true,
			processing: true,
			serverSide: true,
			destroy: true,
			ajax: {
				url: 'controller/server/server-Reseller-Poster.php',
				type: 'POST',
				data: {
					columnsDef: [
						'type','image','link','date_created', 'status', 'action'],
				},
				beforeSend: function() {
		        },
		        complete: function() {
		        }
			},
			columns: [
				{data: 'type',responsivePriority: 1},
				{data: 'image'},
				{data: 'link'},
				{data: 'date_created'},
				{data: 'status'},
				{data: 'action',responsivePriority: 2},
			],
			columnDefs: [
				{
					targets: -2,
					render: function(data, type, full, meta) {
						var status = {
							'0': {'title': 'Inactive', 'state': 'danger'},
							'1': {'title': 'Active', 'state': 'success'}
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<div class="d-flex flex-row align-items-center"><span class="label label-' + status[data].state + ' label-dot mr-2"></span>' +
							'<span class="font-weight-bold text-' + status[data].state + '">' + status[data].title + '</span></div>';
					},
				},
				{
					targets: -1,
					orderable: false,
					render: function(data, type, full, meta) {
						let stat='';
						if(full.status=='1'){
							stat='checked';
						}
					return '\
							<div class="d-flex flex-row">\
								<div class="dropdown dropdown-inline">\
									<a href="javascript:;" id="dropdownMenuButton" class="btn btn-icon btn-light btn-hover-primary btn-sm m-1" data-toggle="dropdown" aria-expanded="true">\
        									<i class="la la-cog"></i>\
        									</a>\
							        <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">\
									    <ul class="nav nav-hoverable flex-column">\
									        <li class="nav-item">\
									            <a class="nav-link" href="javascript:;">\
									                <i class="nav-icon la la-leaf"></i>\
									                <span class="nav-text">Status</span>\
									                <span class="switch switch-sm switch-icon">\
									                    <label>\
									                        <input type="checkbox" class="update_reseller_code" '+stat+' data-table='+tbl+' data-status='+full.status+' data-id='+full.action+'><span></span>\
									                    </label>\
									                </span>\
									            </a>\
									        </li>\
									    </ul>\
									</div>\
								</div>\
								<a href="javascript:;" class="btn btn-icon btn-light btn-hover-info btn-sm m-1 update_reseller_edit" data-status='+full.status+'  data-id='+full.action+' data-table='+tbl+'  title="Edit">\
									<i class="la la-pencil"></i>\
								</a>\
							</div>';
					},
				},
			],
			});
		}
		
	};
	var initTable_Reseller_Landing_Page = function(tbl,id) {
		// begin first table
		if(id=='reload'){
			table1.ajax.reload();
		}else{
			$('#'+tbl).DataTable().clear().destroy();
		table1 = $('#'+tbl).DataTable({
			dom: `<'row'<'col-sm-6 text-right d-none'B>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
			language: {
		      emptyTable: "No reseller landing page"
		    },
			responsive: true,
			processing: true,
			serverSide: true,
			destroy: true,
			ajax: {
				url: 'controller/server/server-Reseller-Landing-Page.php',
				type: 'POST',
				data: {
					columnsDef: [
						'type','image','link','fbpixel','gtag','date_created', 'status', 'action'],
				},
				beforeSend: function() {
		        },
		        complete: function() {
		        }
			},
			columns: [
				{data: 'type',responsivePriority: 1},
				{data: 'image'},
				{data: 'link'},
				{data: 'fbpixel'},
				{data: 'gtag'},
				{data: 'date_created'},
				{data: 'status'},
				{data: 'action',responsivePriority: 2},
			],
			columnDefs: [
				{
					targets: -2,
					render: function(data, type, full, meta) {
						var status = {
							'0': {'title': 'Inactive', 'state': 'danger'},
							'1': {'title': 'Active', 'state': 'success'}
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<div class="d-flex flex-row align-items-center"><span class="label label-' + status[data].state + ' label-dot mr-2"></span>' +
							'<span class="font-weight-bold text-' + status[data].state + '">' + status[data].title + '</span></div>';
					},
				},
				{
					targets: -1,
					orderable: false,
					render: function(data, type, full, meta) {
						let stat='';
						if(full.status=='1'){
							stat='checked';
						}
					return '\
							<div class="d-flex flex-row">\
								<div class="dropdown dropdown-inline">\
									<a href="javascript:;" id="dropdownMenuButton" class="btn btn-icon btn-light btn-hover-primary btn-sm m-1" data-toggle="dropdown" aria-expanded="true">\
        									<i class="la la-cog"></i>\
        									</a>\
							        <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">\
									    <ul class="nav nav-hoverable flex-column">\
									        <li class="nav-item">\
									            <a class="nav-link" href="javascript:;">\
									                <i class="nav-icon la la-leaf"></i>\
									                <span class="nav-text">Status</span>\
									                <span class="switch switch-sm switch-icon">\
									                    <label>\
									                        <input type="checkbox" class="update_reseller_code" '+stat+' data-table='+tbl+' data-status='+full.status+' data-id='+full.action+'><span></span>\
									                    </label>\
									                </span>\
									            </a>\
									        </li>\
									    </ul>\
									</div>\
								</div>\
								<a href="javascript:;" class="btn btn-icon btn-light btn-hover-info btn-sm m-1 update_reseller_edit" data-status='+full.status+'  data-id='+full.action+' data-table='+tbl+'  title="Edit">\
									<i class="la la-pencil"></i>\
								</a>\
							</div>';
					},
				},
			],
			});
		}
		
	};
	var initTable_Reseller_Docs = function(tbl,id) {
		// begin first table
		if(id=='reload'){
			table1.ajax.reload();
		}else{
			$('#'+tbl).DataTable().clear().destroy();
		table1 = $('#'+tbl).DataTable({
			dom: `<'row'<'col-sm-6 text-right d-none'B>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
			language: {
		      emptyTable: "No reseller docs"
		    },
			responsive: true,
			processing: true,
			serverSide: true,
			destroy: true,
			ajax: {
				url: 'controller/server/server-Reseller-Docs.php',
				type: 'POST',
				data: {
					columnsDef: [
						'type','image','docs','date_created', 'status', 'action'],
				},
				beforeSend: function() {
		        },
		        complete: function() {
		        }
			},
			columns: [
				{data: 'type',responsivePriority: 1},
				{data: 'image'},
				{data: 'docs'},
				{data: 'date_created'},
				{data: 'status'},
				{data: 'action',responsivePriority: 2},
			],
			columnDefs: [
				{
					targets: -2,
					render: function(data, type, full, meta) {
						var status = {
							'0': {'title': 'Inactive', 'state': 'danger'},
							'1': {'title': 'Active', 'state': 'success'}
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<div class="d-flex flex-row align-items-center"><span class="label label-' + status[data].state + ' label-dot mr-2"></span>' +
							'<span class="font-weight-bold text-' + status[data].state + '">' + status[data].title + '</span></div>';
					},
				},
				{
					targets: -1,
					orderable: false,
					render: function(data, type, full, meta) {
						let stat='';
						if(full.status=='1'){
							stat='checked';
						}
					return '\
							<div class="d-flex flex-row">\
								<div class="dropdown dropdown-inline">\
									<a href="javascript:;" id="dropdownMenuButton" class="btn btn-icon btn-light btn-hover-primary btn-sm m-1" data-toggle="dropdown" aria-expanded="true">\
        									<i class="la la-cog"></i>\
        									</a>\
							        <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">\
									    <ul class="nav nav-hoverable flex-column">\
									        <li class="nav-item">\
									            <a class="nav-link" href="javascript:;">\
									                <i class="nav-icon la la-leaf"></i>\
									                <span class="nav-text">Status</span>\
									                <span class="switch switch-sm switch-icon">\
									                    <label>\
									                        <input type="checkbox" class="update_reseller_code" '+stat+' data-table='+tbl+' data-status='+full.status+' data-id='+full.action+'><span></span>\
									                    </label>\
									                </span>\
									            </a>\
									        </li>\
									    </ul>\
									</div>\
								</div>\
								<a href="javascript:;" class="btn btn-icon btn-light btn-hover-info btn-sm m-1 update_reseller_edit" data-status='+full.status+'  data-id='+full.action+' data-table='+tbl+'  title="Edit">\
									<i class="la la-pencil"></i>\
								</a>\
							</div>';
					},
				},
			],
			});
		}
	};

	return {

		//main function to initiate the module
		init: function(table, id, type) {
			if(table=="tbl_kyc_request"){
				initTable_KYCReq(table);
			}else if(table=="tbl_invalid_kyc"){
				initTable_KYC_Invalid(table);
			}else if(table=="tbl_approved_kyc"){
				initTable_KYC_Approved(table);
			}else if(table=="tbl_payout_request"){
				initTable_Payout_Req(table);
			}else if(table=="tbl_invalid_payout"){
				initTable_Payout_Invalid(table);
			}else if(table=="tbl_approved_payout"){
				initTable_Payout_Approved(table);
			}else if(table=="tbl_package_code"){
				initTable_Package_Code(table,id);
			}else if(table=="tbl_fulfillment_request" || table=="tbl_fulfillment_processed" || table=="tbl_fulfillment_in_transit" || table=="tbl_fulfillment_delivery" || table=="tbl_fulfillment_rts" || table=="tbl_fulfillment_remitted"){
				initTable_Fulfillment(table,id, type);
			}else if(table=="tbl_fulfillment_details_view"){
				initTable_Fulfillment_Details_View(table,id);
			}else if(table=="tbl_members"){
				initTable_Members(table);
			}else if(table=="tbl_member_encashment_details"){
				initTable_Members_Enchashment_Details(table,id);
			}else if(table=="tbl_member_commission_details"){
				initTable_Members_Commission_Details(table,id);
			}else if(table=="tbl_package_code_view"){
				initTable_Package_Code_View(table, id);
			}else if(table=="tbl_package_code_used"){
				initTable_Package_Code_Used(table);
			}else if(table=="tbl_unscheduled"){
				initTable_Unscheduled(table);
			}else if(table=="tbl_reseller_poster"){
				initTable_Reseller_Poster(table,id);
			}else if(table=="tbl_reseller_landing_page"){
				initTable_Reseller_Landing_Page(table,id);
			}else if(table=="tbl_reseller_docs"){
				initTable_Reseller_Docs(table,id);
			}
		},

	};

}();

// jQuery(document).ready(function() {
// 	KTDatatablesDataSourceAjaxServer.init();
// });
