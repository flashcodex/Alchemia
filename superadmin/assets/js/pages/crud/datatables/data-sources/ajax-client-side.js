'use strict';
var KTDatatablesDataSourceAjaxClient = function() {
	var initTable_Users = function(tbl,response) {
		// $('#'+tbl).DataTable().clear().destroy();
		var table = $('#'+tbl);
		// table.DataTable().clear().draw().destroy();
		table.DataTable({
			responsive: true,
			processing: true,
            info: true,
            // stateSave: false,
            destroy: true,
			data: response,
			columns: [
				{data: 'image'},
				{data: 'username', responsivePriority: 1},
				{data: 'fullname'},
				{data: 'email'},
				{data: 'mobile'},
				{data: 'status' , responsivePriority: 2}
			],
			columnDefs: [
				{
					targets: -1,
					render: function(data, type, full, meta) {
						var status = {
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
		})

	};
	var initTable_Usersadmin = function(tbl,response) {
		// $('#'+tbl).DataTable().clear().destroy();
		var table = $('#'+tbl);
		// table.DataTable().clear().draw().destroy();
		
		table.DataTable({
			responsive: true,
			processing: true,
            info: true,
            // stateSave: false,
            destroy: true,
			data: response,
			columns: [
				{data: 'image', responsivePriority: 1},
				{data: 'username'},
				{data: 'fullname'},
				{data: 'email'},
				{data: 'mobile'},
				{data: 'status' , responsivePriority: 2},
				{data: 'role'},
				{data: 'id'},
			],
			columnDefs: [
				{
					targets: -3,
					render: function(data, type, full, meta) {
						var status = {
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
				{
					targets: -1,
					render: function(data, type, full, meta) {
						return '<div class="btn-group" role="group"><a class="btn btn-primary btn-shadow font-weight-bold mr-2 edit_admin" data_id="'+data+'"><span class="flaticon flaticon-edit"></span> Edit</a> <a class="btn btn-danger btn-shadow font-weight-bold mr-2 remove_admin" data_id="'+data+'"><span class="flaticon2 flaticon2-trash"></span> Delete</a></div>';
					},
				},
			],
			"order": [[ 1, "asc" ]]
		
		})

		


	};

	var initTable_Quiz = function(tbl,response) {
		// $('#'+tbl).DataTable().clear().destroy();
		var table = $('#'+tbl);
		// table.DataTable().clear().draw().destroy();
		table.DataTable({
			responsive: true,
			processing: true,
            info: true,
            // stateSave: false,
            destroy: true,
			data: response,
			columns: [
				{data: 'name', responsivePriority: 1},
				{data: 'page_name'},
				{data: 'data_type'},
				{data: 'question'},
				{data: 'choices',visible:false},
				{data: 'answer'},
				{data: 'date_created',},
				{data: 'id'},
			],

			columnDefs: [
				{
					targets: -6,
					render: function(data, type, full, meta) {
						var status = {
							'tof': {'title': 'True or False', 'state': 'info'},
							'idnf': {'title': 'Identification', 'state': 'info'},
							'mc': {'title': 'Multiple Choices', 'state': 'info'},
							'mci': {'title': 'Multiple Choices Image', 'state': 'info'}
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
						var val=data.split("|");
						return '<div class="btn-group" role="group"><a class="btn btn-primary btn-shadow font-weight-bold mr-2 edit_quiz" data_id="'+val[0]+'" data_page="'+val[1]+'" data_type="'+val[2]+'" data_question="'+val[3]+'" data_answer="'+val[4]+'"  data_header_id="'+val[5]+'" data_page_id="'+val[6]+'" data_choices="'+val[7]+','+val[8]+','+val[9]+','+val[10]+'"><span class="flaticon flaticon-edit"></span> Edit</a> <a class="btn btn-danger btn-shadow font-weight-bold mr-2 remove_quiz" data_id="'+val[0]+'"><span class="flaticon2 flaticon2-trash"></span> Delete</a></div>';
					},
				},
			],
			"order": [[ 6, "desc" ]]
		})

	};
	var initTable_Report = function(tbl,response) {
		// $('#'+tbl).DataTable().clear().destroy();
		var table = $('#'+tbl);
		// table.DataTable().clear().draw().destroy();
		table.DataTable({
			dom: `<'row'<'col-sm-6 text-left 'f><'col-sm-6 text-right'B>>
<'row'<'col-sm-12'tr>>
<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
buttons: [
{
               extend: 'print',
               exportOptions: {
                   columns: [1,2,3,4,5]
               }
            },
            {
               extend: 'copyHtml5',
               exportOptions: {
                   columns: [1,2,3,4,5]
               }
            },
            {
               extend: 'excelHtml5',
               exportOptions: {
                   columns: [1,2,3,4,5]
               }
            },
{
               extend: 'csvHtml5',
               exportOptions: {
                   columns: [1,2,3,4,5]
               }
            },
{
               extend: 'pdfHtml5',
               exportOptions: {
                   columns: [1,2,3,4,5]
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
				{data: 'stud_name',},
				{data: 'name', responsivePriority: 1},
				{data: 'score'},
				{data: 'grade'},
				{data: 'type'},
				{data: 'date_created'},
				{data: 'id',visible:false},
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
			"order": [[ 5, "desc" ]]
		})

	};
	
	return {

		//main function to initiate the module
		init: function(tbl,response, type) {
			if(tbl=='tbl_users'){
				initTable_Users(tbl,response);
			}else if(tbl=='tbl_usersadmin'){
				initTable_Usersadmin(tbl,response);
			}else if(tbl=='tbl_quiz'){
				initTable_Quiz(tbl,response);
			}else if(tbl=='tbl_report'){
					initTable_Report(tbl,response);
				}

		},

	};

}();

// jQuery(document).ready(function() {
// 	KTDatatablesDataSourceAjaxClient.init();
// });
