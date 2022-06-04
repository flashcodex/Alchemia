"use strict";
var KTDatatablesDataSourceAjaxServer = function() {
$.fn.dataTable.ext.errMode = 'throw';
var table1,table2,table3,table4,table5,table6,table7,table8;

	var initTable_Topup = function(tbl,action) {
		if(action=="reload"){
				table1.ajax.reload();
		}else{
		$('#'+tbl).DataTable().clear().destroy();
		table1 = $('#'+tbl).DataTable({
			responsive: true,
			language: {
		      emptyTable: "No uploded top-up"
		    },
			// order: [ 0, 'desc' ],
			processing: true,
			serverSide: true,
			destroy: true,
			ajax: {
				url: 'controller/server/server-Topup.php',
				type: 'POST',
				data: {
					columnsDef: ['count', 'txnid', 'mop', 'txn_number', 'amount', 'date_topup','date_confirmed','status','image','action'],
				},
				beforeSend: function() {
					KTApp.block($('#'+tbl));
		        },
		        complete: function() {
		        	KTApp.unblock($('#'+tbl));
		        }
		        // beforeSend: function() {
		  //       },
		  //       complete: function() {
		  //       },
		  //       success: function (response) {
		  //       	alert(JSON.stringify(response));
		  //       }
			},
			columns: [
				{data: 'count'},
				{data: 'txnid', responsivePriority: 1},
				{data: 'mop'},
				{data: 'txn_number'},
				{data: 'amount'},
				{data: 'date_topup'},
				{data: 'date_confirmed'},
				{data: 'status', responsivePriority: -2},
				{data: 'image'},
				{data: 'action'},
			],
			columnDefs: [
				{
					targets: -1,
					title: 'ACTION',
					orderable: false,
					render: function(data, type, full, meta) {
					let action_btn='';
					if(full.status=='C'){
						action_btn='<button data-id="'+full.action+'" class="btn btn-icon btn-light-info btn-sm m-1 view-remarks" title="View remarks"><i class="flaticon2-rectangular"></i></button>';
					}
					return '<div class="d-flex flex-row">'+action_btn+'</div>';

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

		}
	};

var initTable_Encashment = function(tbl,action) {
		if(action=="reload"){
				table2.ajax.reload();
		}else{
		$('#'+tbl).DataTable().clear().destroy();
		table2 = $('#'+tbl).DataTable({
			responsive: true,
			language: {
		      emptyTable: "No payout recorded"
		    },
			// order: [ 0, 'desc' ],
			processing: true,
			serverSide: true,
			destroy: true,
			ajax: {
				url: 'controller/server/server-Encashment.php',
				type: 'POST',
				data: {
					columnsDef: ['count', 'txnid', 'mop', 'acc_name', 'acc_number', 'mobile', 'total_payout', 'date_encashed','date_confirmed','status', 'action'],
				},
				beforeSend: function() {
		        },
		        complete: function() {
		        }
			},
			columns: [
				{data: 'count'},
				{data: 'txnid', responsivePriority: 1},
				{data: 'mop'},
				{data: 'acc_name'},
				{data: 'acc_number'},
				{data: 'mobile'},
				{data: 'total_payout'},
				{data: 'date_encashed'},
				{data: 'date_confirmed'},
				{data: 'status', responsivePriority: 3},
				{data: 'action', responsivePriority: 2},
			],
			columnDefs: [
				{
					targets: -1,
					title: 'ACTION',
					orderable: false,
					render: function(data, type, full, meta) {
					let action_btn='';
					if(full.status=='C'){
						action_btn='<a href="javascript:;" class="btn btn-sm btn-clean btn-icon view-remarks-encashment" data-id="'+full.action+'" title="View remarks">\
										<i class="la la-envelope-o icon-xl"></i>\
									</a>';
					}else if(full.status=='S'){
						action_btn='<a href="javascript:;" class="btn btn-sm btn-clean btn-icon view-invoice-encashment" data-id="'+full.action+'" title="View invoice">\
										<i class="la la-file icon-xl"></i>\
									</a>';
									// <a href="javascript:;" class="btn btn-sm btn-clean btn-icon view-check-encashment" data-id="'+full.action+'" title="View check">\
									// 	<i class="la la-file-alt icon-xl"></i>\
									// </a>\
						// action_btn='<button data-id="'+full.action+'" class="btn btn-icon btn-light-info btn-sm m-1 view-check-encashment" title="View details"><i class="flaticon2-notepad"></i></button>\
						// <button data-id="'+full.action+'" class="btn btn-icon btn-light-info btn-sm m-1 view-invoice-encashment" title="View details"><i class="flaticon2-notepad"></i></button>';
					};
					return '<div class="d-flex flex-row">'+action_btn+'</div>';

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

		}
	};

var initTable_Order = function(tbl,action) {
		if(action=="reload"){
				table3.ajax.reload();
		}else{
		$('#'+tbl).DataTable().clear().destroy();
		table3 = $('#'+tbl).DataTable({
			responsive: true,
			language: {
		      emptyTable: "No top-up recorded"
		    },
			// order: [ 0, 'desc' ],
			processing: true,
			serverSide: true,
			destroy: true,
			ajax: {
				url: 'controller/server/server-Order.php',
				type: 'POST',
				data: {
					columnsDef: ['count','txnid', 'date_approved', 'amount', 'days_left', 'earned_rewards'],
				},
				beforeSend: function() {
		        },
		        complete: function() {
		        }
			},
			columns: [
				{data: 'count',visible: false},
				{data: 'txnid'},
				{data: 'date_approved'},
				{data: 'amount', responsivePriority: 2},
				{data: 'days_left', responsivePriority: 1},
				{data: 'earned_rewards'},
			],
			// columnDefs: [
			// 	{
			// 		targets: -2,
			// 		orderable: false,
			// 		render: function(data, type, full, meta) {
			// 		// Set the date we're counting down to
			// 		var countDownDate = new Date(full.days_left).getTime();

			// 		// Update the count down every 1 second
			// 		var x = setInterval(function() {

			// 		  // Get today's date and time
			// 		  var now = new Date().getTime();
					    
			// 		  // Find the distance between now and the count down date
			// 		  var distance = countDownDate - now;
					    
			// 		  // Time calculations for days, hours, minutes and seconds
			// 		  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			// 		  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			// 		  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			// 		  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
					    
			// 		  // Output the result in an element with id="demo"
			// 		  $("#demo"+full.count).text(days + "d " + hours + "h "
			// 		  + minutes + "m " + seconds + "s ");
			// 		$(".spinner").remove();
					    
			// 		  // If the count down is over, write some text 
			// 		  if (distance < 0) {
			// 		    clearInterval(x);
			// 		    $("#demo"+full.count).text("<span class='text-danger'>EXPIRED</span>");
			// 		  }
			// 		}, 1000);
			// 		return '<p class="font-weight-bold" id="demo'+full.count+'"><div class="spinner spinner-primary mr-15"></div></p>';

			// 		},
			// 	},
				
			// ],
		});

		}
	};

var initTable_Profit_Qualifiers = function(tbl,action) {
		if(action=="reload"){
				table4.ajax.reload();
		}else{
		$('#'+tbl).DataTable().clear().destroy();
		table4 = $('#'+tbl).DataTable({
			responsive: true,
			language: {
		      emptyTable: "No qualifiers yet"
		    },
			// order: [ 0, 'desc' ],
			processing: true,
			serverSide: true,
			destroy: true,
			ajax: {
				url: 'controller/server/server-Profit-Qualifiers.php',
				type: 'POST',
				data: {
					columnsDef: ['count', 'profile', 'username', 'date_qualified'],
					val:action
				},
				beforeSend: function() {
		        },
		        complete: function() {
                $('td').addClass("dt-center");

		        }
			},
			columns: [
				{data: 'count',visible: false},
				{data: 'profile', responsivePriority: 2},
				{data: 'username', responsivePriority: 1},
				{data: 'date_qualified'},
			],
		});

		}
	};

var initTable_Profit_History= function(tbl,action) {
		if(action=="reload"){
				table5.ajax.reload();
		}else{
		$('#'+tbl).DataTable().clear().destroy();
		table5 = $('#'+tbl).DataTable({
			responsive: true,
			language: {
		      emptyTable: "No history recorded"
		    },
			// order: [ 0, 'desc' ],
			processing: true,
			serverSide: true,
			destroy: true,
			ajax: {
				url: 'controller/server/server-Profit-History.php',
				type: 'POST',
				data: {
					columnsDef: ['count', 'date', 'total_amount', 'total_qualifiers', 'status', 'action'],
				},
				beforeSend: function() {
		        },
		        complete: function() {
		        	$('td').addClass("dt-center");
		        }
			},
			columns: [
				{data: 'count',visible: false},
				{data: 'date', responsivePriority: 1},
				{data: 'total_amount'},
				{data: 'total_qualifiers'},
				{data: 'status'},
				{data: 'action', responsivePriority: 2},
			],
			columnDefs: [
				{
					targets: -1,
					title: 'ACTION',
					orderable: false,
					render: function(data, type, full, meta) {
					return '<span style="overflow: visible; position: relative; width: 130px;">\
								<button data-record-id="1" class="btn btn-sm btn-light-info profit-history" data-id="'+full.action+'" title="View records"><i class="flaticon2-document"></i> Details</button>\
							</span>';
					// return '<div class="d-flex flex-row"><button data-id="'+full.action+'" class="btn btn-icon btn-light-info btn-sm m-1  profit-history" title="View details"><i class="flaticon-eye"></i></button></div>';
					},
				},
				{
					targets: -2,
					render: function(data, type, full, meta) {
						var status = {
							0: {'title': 'OPEN', 'state': 'success'},
							1: {'title': 'CLOSE', 'state': 'primary'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<div class="d-flex flex-row justify-content-center align-items-center"><span class="label label-' + status[data].state + ' label-dot mr-2"></span>' +
							'<span class="font-weight-bold text-' + status[data].state + '">' + status[data].title + '</span></div>';
					},
				},
			],
		});

		}
	};

var initTable_My_Referrals = function(tbl,action) {
		if(action=="reload"){
				table6.ajax.reload();
		}else{
		$('#'+tbl).DataTable().clear().destroy();
		table6 = $('#'+tbl).DataTable({
			responsive: true,
			language: {
		      emptyTable: "No referrals"
		    },
			processing: true,
			serverSide: true,
			destroy: true,
			ajax: {
				url: 'controller/server/server-Referrals.php',
				type: 'POST',
				data: {
					columnsDef: ['count', 'date_registered', 'username', 'full_name', 'total_topup', 'status', 'action'],
				},
				beforeSend: function() {
		        },
		        complete: function() {
		        }
			},
			columns: [
				{data: 'count'},
				{data: 'date_registered'},
				{data: 'username', responsivePriority: 1},
				{data: 'full_name'},
				{data: 'total_topup'},
				{data: 'status', responsivePriority: 2},
				{data: 'action', responsivePriority: 3},
			],
			columnDefs: [
				{
					targets: -1,
					title: 'ACTION',
					orderable: false,
					render: function(data, type, full, meta) {
					return'<button data-id="'+full.action+'" user-name="'+full.username+'" class="btn btn-icon btn-light-info btn-sm m-1 view-ref-topup" title="View Top-Ups"><i class="la la-eye"></i></button>'
					},
				},
				{
					targets: -2,
					render: function(data, type, full, meta) {
						var status = {
							1: {'title': 'Active', 'state': 'success'},
							0: {'title': 'Inactive', 'state': 'danger'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						''
						return '<div class="d-flex flex-row align-items-center"><span class="label label-lg label-light-' + status[data].state + ' label-inline">' + status[data].title + '</span></div>';
					},
				},
			],
		});

		}
	};

var initTable_My_Rewards = function(tbl,action) {
		if(action=="reload"){
				table7.ajax.reload();
		}else{
		$('#'+tbl).DataTable().clear().destroy();
		table7 = $('#'+tbl).DataTable({
			responsive: true,
			language: {
		      emptyTable: "No referrals"
		    },
			processing: true,
			serverSide: true,
			destroy: true,
			ajax: {
				url: 'controller/server/server-Rewards.php',
				type: 'POST',
				data: {
					columnsDef: ['count', 'date_received', 'type', 'from', 'amount'],
				},
				beforeSend: function() {
		        },
		        complete: function() {
		        }
			},
			columns: [
				{data: 'count'},
				{data: 'date_received', responsivePriority: 1},
				{data: 'type'},
				{data: 'from'},
				{data: 'amount', responsivePriority: 2},
			],
			columnDefs: [
				// {
				// 	targets: -1,
				// 	title: 'ACTION',
				// 	orderable: false,
				// 	render: function(data, type, full, meta) {
				// 	return'<button data-id="'+full.action+'" class="btn btn-icon btn-light-info btn-sm m-1 view-ref-topup" title="View Top-Ups"><i class="flaticon2-notepad"></i></button>'
				// 	},
				// },
				{
					targets: -3,
					render: function(data, type, full, meta) {
						var status = {
							'DIRECT_REFERRAL': {'title': 'DIRECT REWARD', 'state': 'success'},
							'INDIRECT_REFERRAL': {'title': 'INDIRECT REWARD', 'state': 'info'},
							'PROFIT_SHARING': {'title': 'PROFIT SHARING REWARD', 'state': 'warning'},
							'DAILY_REWARDS': {'title': 'DAILY REWARD', 'state': 'primary'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						''
						return '<div class="d-flex flex-row align-items-center"><span class="label label-lg label-light-' + status[data].state + ' label-inline">' + status[data].title + '</span></div>';
					},
				},
			],
		});

		}
	};

var initTable_Referral_Topup = function(tbl,action) {
		if(action=="reload"){
				table8.ajax.reload();
		}else{
		$('#'+tbl).DataTable().clear().destroy();
		table8 = $('#'+tbl).DataTable({
			responsive: true,
			language: {
		      emptyTable: "No top-ups"
		    },
			processing: true,
			serverSide: true,
			destroy: true,
			ajax: {
				url: 'controller/server/server-Referral-Topup.php',
				type: 'POST',
				data: {
					columnsDef: ['count', 'date_topup', 'date_expired', 'amount', 'status'],
					id:action
				},
				beforeSend: function() {
		        },
		        complete: function() {
		        }
			},
			columns: [
				{data: 'count'},
				{data: 'date_topup', responsivePriority: 1},
				{data: 'date_expired'},
				{data: 'amount', responsivePriority: 2},
				{data: 'status'},
			],
			columnDefs: [
				{
					targets: -1,
					render: function(data, type, full, meta) {
						var status = {
							1: {'title': 'Active', 'state': 'success'},
							0: {'title': 'Expired', 'state': 'danger'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						''
						return '<div class="d-flex flex-row align-items-center"><span class="label label-lg label-light-' + status[data].state + ' label-inline">' + status[data].title + '</span></div>';
					},
				},
			],
		});
		// table8.ajax.reload();
		}
	};

	return {

		//main function to initiate the module
		init: function(tbl,action) {
			if(tbl=='tbl_topup_details'){
				initTable_Topup(tbl,action);
			}else if(tbl=='tbl_encashment_details'){
				initTable_Encashment(tbl,action);
			}else if(tbl=='tbl_order_details'){
				initTable_Order(tbl,action);
			}else if(tbl=='tbl_profit_qualifiers'){
				initTable_Profit_Qualifiers(tbl,action);
			}else if(tbl=='tbl_profit_history'){
				initTable_Profit_History(tbl,action);
			}else if(tbl=='tbl_my_referrals'){
				initTable_My_Referrals(tbl,action);
			}else if(tbl=='tbl_my_rewards'){
				initTable_My_Rewards(tbl,action);
			}else if(tbl=='tbl_referal_topup'){
				initTable_Referral_Topup(tbl,action);
			}

		},

	};

}();

// jQuery(document).ready(function() {
// 	KTDatatablesDataSourceAjaxServer.init();
// });
