var TopicQuiz = {

    selectedId: 0,
    lookUpData: [],
    type: '',
    baseUrl: '',
    order: [],

    init: function () {
        var self = this;

        let url = window.location.origin;
        url = url.includes("localhost") ? window.location.origin + "/public/" : 'https://pamantasanalchemia.com/public/';
        self.baseUrl = url;

        self.api.get.fetchTopicQuizRecords();

        self.addEvents();
    },

    renderTopicQuizRecords(data) {
        var self = this;
        self.lookUpData = data;

        var table = $('#tbl_topic_quiz');
        table.DataTable({
            bAutoWidth: false,
            responsive: true,
            processing: true,
            info: true,
            // stateSave: false,
            destroy: true,
            buttons: [
                {
                    extend: 'print',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                    }
                },
                {
                    extend: 'copyHtml5',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                    }
                },
                {
                    extend: 'excelHtml5',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                    }
                },
                {
                    extend: 'csvHtml5',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                    }
                },
                {
                    extend: 'pdfHtml5',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                    }
                },
            ],            
            data: data,
            columns: [
                { data: 'user', responsivePriority: 1 },
                { data: 'topic' },
                { data : 'remarks' },
                { data: 'grade' },
                { data: 'type' },
                { data: 'created_at' },
            ],
            columnDefs: [
                {
                    targets: 0,
                    render: function (data, type, full, meta) {
                        return `${data.fname} ${data.lname}`;
                    },
                },
                {
                    targets: 1,
                    render: function (data, type, full, meta) {
                        return `${data.name}`;
                    },
                },
                {
                    targets: 4,
                    render: function (data, type, full, meta) {
                        var status = {
                            'passed': { 'title': 'PASSED', 'state': 'success' },
                            'failed': { 'title': 'FAILED', 'state': 'danger' },
                            'taking': { 'title': 'Taking', 'state': 'info' },
                            'failed_complete': { 'title': 'FAILED TO COMPLETE', 'state': 'danger' }
                        };
                        if (typeof status[data] === 'undefined') {
                            return data;
                        }

                        return '<div class="d-flex flex-row align-items-center"><span class="label label-' + status[data].state + ' label-dot mr-2"></span>' +
                            '<span class="font-weight-bold text-' + status[data].state + '">' + status[data].title + '</span></div>';
                    },
                },              
            ],
            "order": [[5, "desc"]]
        });

        self.addEvents();
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

    addEvents: function () {
        var self = this;

    },

    api: {
        get: {
            fetchTopicQuizRecords: function () {
                var self = TopicQuiz;

                var params = {
                    // id: id,
                };

                $.ajax({
                    url: self.baseUrl + 'api/fetch/topic/quiz/records',
                    method: 'GET',
                    data: params,
                    beforeSend: function () {

                    },
                    success: function (resp) {
                        var data = resp.data;
                        self.renderTopicQuizRecords(data);
                    },
                    error: function (resp) {

                    },
                    complete: function () {

                    }
                });
            },
        },
    }
}

$(function () {
    TopicQuiz.init();
})