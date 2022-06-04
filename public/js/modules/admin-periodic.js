var Periodic = {

    tableData: {},
    periodicTable: [],
    lookUpData: [],
    selectedId: 0,
    elements: [],
    elementDisplay: [],
    baseUrl: '',

    init: function () {
        var self = this;

        let url = window.location.origin;
        url = url.includes("localhost") ? window.location.origin + "/public/" : 'https://pamantasanalchemia.com/public/';
        self.baseUrl = url;

        self.api.get.periodicTableData();
        self.api.get.all();
        self.addEvents();
    },

    renderOutcomes(data) {
        var self = this;
        self.lookUpData = data;

        var table = $('#tbl_outcomes');
        table.DataTable({
            bAutoWidth: false,
            responsive: true,
            processing: true,
            info: true,
            // stateSave: false,
            destroy: true,
            data: data,
            columns: [
                { data: 'name', responsivePriority: 1 },
                { data: 'created_at' },
                { data: 'id', sWidth: '10%' },
            ],
            columnDefs: [
                {
                    targets: 2,
                    width: "10%",
                    render: function (data, type, full, meta) {
                        return `<div class="btn-group" role="group">
                                    <button type="button" class="edit_element-${data} btn btn-primary btn-shadow font-weight-bold mr-2"><span class="flaticon flaticon-edit"></span> Edit</button>
                                    <button type="button" class="remove_element-${data} btn btn-danger btn-shadow font-weight-bold mr-2"><span class="flaticon2 flaticon2-trash"></span> Delete</button>
                               </div>`;
                        // var val = data.split("|");
                        // return '<div class="btn-group" role="group"><a class="btn btn-primary btn-shadow font-weight-bold mr-2 edit_quiz" data_id="' + val[0] + '" data_page="' + val[1] + '" data_type="' + val[2] + '" data_question="' + val[3] + '" data_answer="' + val[4] + '"  data_header_id="' + val[5] + '" data_page_id="' + val[6] + '" data_choices="' + val[7] + ',' + val[8] + ',' + val[9] + ',' + val[10] + '"><span class="flaticon flaticon-edit"></span> Edit</a> <a class="btn btn-danger btn-shadow font-weight-bold mr-2 remove_quiz" data_id="' + val[0] + '"><span class="flaticon2 flaticon2-trash"></span> Delete</a></div>';
                    },
                },
            ],
            "order": [[2, "desc"]],
        });

        self.addEvents();
    },

    renderFormula()
    {
        var self = this;

        var content = $('#formula');
        $('#formula div').remove();

        if (self.elements.length > 0) {
            $.each(self.elements, function (key, val) {
                var elemHtml = '';

                self.tableData = self.periodicTable.find(e => e.number == val);
                var data = self.tableData;

                elemHtml = `<div style="grid-column-start: auto;" class="remove_item-${val} card grid-item item${val}">${data.title}</div>`;

                content.append(elemHtml)
            })
        }
        else {
            var elemHtml = '<div style="grid-column-start: 1;grid-column-end: 10;text-align: center;"><span>Drag elements to combine</span></div>';

            content.append(elemHtml)
        }

        self.addEvents();
    },

    addEvents: function () {
        var self = this;
        
        $('button[class*=edit_element-]').unbind().bind('click', function () {
            // alert('xxxx');
            var id = parseInt($(this).attr('class').split(' ')[0].split('-')[1]);
            self.selectedId = id;
            var data = self.getSelectedData(id);
            self.type = 'EDIT';
            $('#modal-title').html('Edit Question');
            
            $('#element-title').val(data.title);
            $('#element-name').val(data.name);
            self.elements = JSON.parse("[" + data.elements + "]");
            self.renderFormula();

            $('#periodic_modal').modal('show');
        });

        $('button[class*=remove_element-]').unbind().bind('click', function () {
            alert('adsad');
            var id = parseInt($(this).attr('class').split(' ')[0].split('-')[1]);
            var data = self.getSelectedData(id);

            Swal.fire({
                html: `Do you want to delete this element <br> ${data.title} - ${data.name}?`,
                icon: "question",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Yes, proceed!",
                cancelButtonText: "No, cancel",
                customClass: {
                    confirmButton: "btn font-weight-bold btn-primary",
                    cancelButton: "btn font-weight-bold btn-default",
                },
            }).then(function (result) {
                if (result.value) {
                    self.api.post.remove(id);
                }
            });
        });

        $('#create_element_btn').unbind().bind('click', function () {
            $('#periodic_form').trigger("reset");
            self.elements = [];
            self.renderFormula();
            self.type = 'ADD';
            $('#modal-title').html('Create Element');
            $('#periodic_modal').modal('show');
        });

        $('#btn-save-element').unbind().bind('click', function () {
            Swal.fire({
                html: `Save element?`,
                icon: "question",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Yes, proceed!",
                cancelButtonText: "No, cancel",
                customClass: {
                    confirmButton: "btn font-weight-bold btn-primary",
                    cancelButton: "btn font-weight-bold btn-default",
                },
            }).then(function (result) {
                if (result.value) {
                    self.api.post.save();
                }
            });   
        });

        $('div[class*=remove_item-]').unbind().bind('click', function () {
            var id = parseInt($(this).attr('class').split(' ')[0].split('-')[1]);
            // self.selectedId = id;
        
            const index = self.elements.indexOf(id);
            self.elements.splice(index, 1)

            self.renderFormula();

            self.addEvents();
        });

        $('div[class*=element-]').unbind().bind('click', function () {
            var id = parseInt($(this).attr('class').split(' ')[0].split('-')[1]);

            // alert(id);
            // self.elements.push(id);            

            const index = self.elements.indexOf(id);
            index > -1 ? self.elements.splice(index, 1) : self.elements.push(id);

            self.renderFormula();

            // $('#formula').html(self.elements);
            // var data = self.getTopicData(id);
            self.addEvents();
        });
    },

    getSelectedData: function (id) {
        var self = this;
        var index = 0;

        $.each(self.lookUpData, function (key, val) {
            if (val.id == id) {
                index = key;
            }
        });

        return self.lookUpData[index];
    },

    api: {
        get: {
            all: function () {
                var self = Periodic;

                var params = {
                    // id: id,
                };

                $.ajax({
                    url: self.baseUrl + 'api/periodic/all',
                    method: 'GET',
                    data: params,
                    beforeSend: function () {

                    },
                    success: function (resp) {
                        var data = resp.data;

                        self.renderOutcomes(data);
                    },
                    error: function (resp) {

                    },
                    complete: function () {

                    }
                });
            },

            periodicTableData: function () {
                var self = Periodic;

                var params = {
                    // id: id,
                };

                $.ajax({
                    url: self.baseUrl + 'api/periodic/table/all',
                    method: 'GET',
                    data: params,
                    beforeSend: function () {

                    },
                    success: function (resp) {
                        var data = resp.data;

                        self.periodicTable = data;
                    },
                    error: function (resp) {

                    },
                    complete: function () {

                    }
                });
            },            
        },

        post: {
            save: function () {
                var self = Periodic;
                
                var params = {
                    elements: self.elements,
                    title: $('#element-title').val(),
                    name: $('#element-name').val(),
                    type: self.type,
                    id: self.selectedId,
                };

                $.ajax({
                    url: self.baseUrl + 'api/periodic/save',
                    method: 'POST',
                    data: params,
                    beforeSend: function () {

                    },
                    success: function (resp) {
                        var data = resp.data;

                        $("#periodic_modal").modal('hide');

                        Swal.fire({
                            text: `Element ${self.type.toLowerCase()}ed.`,
                            icon: "success",
                        })

                        self.selectedId = 0;

                        self.api.get.all();
                    },
                    error: function (resp) {

                    },
                    complete: function () {

                    }
                });
            },

            remove: function (id) {
                var self = Periodic;

                var params = {
                    id: id,
                };

                $.ajax({
                    url: self.baseUrl + 'api/periodic/remove',
                    method: 'POST',
                    data: params,
                    beforeSend: function () {

                    },
                    success: function (resp) {
                        Swal.fire({
                            text: `Element deleted.`,
                            icon: "success",
                        })

                        self.api.get.all();
                    },
                    error: function (resp) {

                    },
                    complete: function () {

                    }
                });
            },            
        }
    }
}

$(function () {
    Periodic.init();
})