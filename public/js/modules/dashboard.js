var Dashboard = {
    count: 0,
    loaded: false,
    selectedId: 0,
    lookUpData: [],
    type: '',
    baseUrl: '',
    order: [],
    total_module: 0,
    total_module_passed: 0,
    total_module_failed: 0,
    total_module_taking: 0,
    takingGraph: null,
    studentGraph: null,
    reportGraph: null,
    modules: [],

    init: async function () {
        var self = this;

        let url = window.location.origin;
        url = url.includes("localhost") ? window.location.origin + "/public/" : 'https://pamantasanalchemia.com/public/';
        self.baseUrl = url;

        await self.api.get.fetchModuleStatistics();
        await self.api.get.fetchFilterStatistics();
        


        self.addEvents();
    },

    renderTopStudents(data) {
        var self = this;

        var content = $('#top-students');
        $('#top-students tr').remove();

        $.each(data, function (key, val) {
            elemHtml = `<tr><th scope="row">${key + 1}</th><td> ${val.lname} ${val.fname}</td> <td>${Number(val.grade).toFixed(2)}</td> </tr>`;
            // console.log(val.status);
            content.append(elemHtml)
        })

        self.addEvents();
    },

    renderTopQuestions(data) {
        var self = this;

        var content = $('#top-questions');
        $('#top-questions li').remove();

        $.each(data, function (key, val) {
            elemHtml = `<li class="list-group-item borderless" style="font-size: 1.5rem;">${key + 1}. ${val.question}</li>`;
            content.append(elemHtml)
        })

        self.addEvents();
    },

    renderRegisteredGraph(data, year) {
        var self = this;

        const registered_data = {
            datasets: [{
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }]
        };

        const config = {
            type: 'bar',
            data: registered_data,
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                },
                datalabels: {
                    display: false,
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    },
                }
            },
        };

        var grapharea = document.getElementById('registered-graph');

        if (!this.studentGraph)
            this.studentGraph = new Chart(grapharea, config);
        else {
            this.studentGraph.reset();
            this.studentGraph.data.datasets[0].data = registered_data;
            this.studentGraph.update();
        }
    },

    renderTakingGraph(data, year) {
        var self = this;

        var labels = [];
        var graph_data = [];

        $.each(data, function (key, val) {

            labels.push(val.name);
            graph_data.push(val.total);
        })

        const registered_data = {
            labels: labels,
            datasets: [{
                axis: 'y',
                data: graph_data,
                fill: false,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }]
        };

        const config = {
            type: 'bar',
            data: registered_data,
            options: {
                // indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    }
                },
                datalabels: {
                    display: false,
                },
                scales: {
                    indexAxis: 'y',

                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        // suggestedMin: 0,
                        suggestedMax: 10,

                        ticks: {
                            beginAtZero: true,
                            stepSize: 1,
                        },

                        grid: {
                            // display: false
                        }
                    }
                }
            },
        };

        var grapharea = document.getElementById('taking-graph');

        if (!this.takingGraph)
            this.takingGraph = new Chart(grapharea, config);
        else {
            this.takingGraph.reset();
            this.takingGraph.data.datasets[0].data = graph_data;
            this.takingGraph.update();
        }

        // $('.taking-modal').show();
    },

    renderReportGraph(data, year) {
        var self = this;

        var labels = ['Passed', 'Failed', 'Taking'];
        var graph_data = [];
        var passed = 0;
        var failed = 0;
        var taking = 0;

        $.each(data, function (key, val) {
            if (val.type == 'passed') passed++;
            else if (val.type == 'failed') failed++;
            else if (val.type == 'failed_complete') failed++;
            else taking++;
        })

        graph_data = [passed, failed, taking];

        console.log(graph_data);

        const report_data = {
            labels: labels,
            datasets: [{
                // label: 'My First Dataset',
                data: graph_data,
                backgroundColor: [
                    'rgb(48, 255, 150)',
                    'rgb(255, 21, 57)',
                    'rgb(255, 158, 10)',
                ],
                hoverOffset: 4
            }]
        };

        const config = {
            type: 'pie',
            data: report_data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
            },
        };

        var grapharea = document.getElementById('report-graph');

        if (!this.reportGraph)
            this.reportGraph = new Chart(grapharea, config);
        else {
            this.reportGraph.reset();
            this.reportGraph.data.datasets[0].data = graph_data;
            this.reportGraph.update();
        }

        // $('.report-modal').show();
    },

    renderQuizStatistic(data) {
        var self = this;
        self.lookUpData = data;

        // const myChart = new Chart(
        //     document.getElementById('registered-graph'),
        //     config
        // );

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

        $('#per-module-show').unbind().bind('click', function () {
            self.api.get.fetchTypeContent(data_type = 'report');
        });

        $('#filter-report').unbind().bind('change', function () {
            self.api.get.fetchTypeContent(data_type = 'report');
        });

        $('#taking-show').unbind().bind('click', function () {
            self.api.get.fetchTypeContent(data_type = 'taking');
        });

        $('#filter-type').unbind().bind('change', function () {
      
            self.api.get.fetchFilterStatistics();
           
        });

        $('#filter-content').unbind().bind('change', function () {
            self.api.get.fetchTypeContent();
        });

        $('.close').unbind().bind('click', function () {
            $('.modal').hide();
        });

        // $('#quiz-summary-btn').unbind().bind('click', function () {

        //     // alert('dsad');

        //     self.api.get.fetchModuleStatistics();
        //     // if ($("#quiz-summary").hasClass("show")) 
        //     // {
        //     //     self.api.get.fetchModuleStatistics();
        //     // }
        //     // else {
        //     //     self.api.get.fetchModuleStatistics();
        //     // }
        // });
    },

    api: {
        get: {
            fetchModuleStatistics: async function () {
                var self = Dashboard;

                var params = {

                };

                // alert('adsada')

                $.ajax({
                    url: self.baseUrl + 'api/dashboard/summary',
                    method: 'GET',
                    data: params,
                    beforeSend: function () {

                    },
                    success: function (resp) {
                        var data = resp;

                        self.total_module = data.topic_quizzes.length;
                        self.total_module_passed = data.passed_topic_quizzes.length;
                        self.total_module_failed = data.failed_topic_quizzes.length;
                        self.total_module_taking = data.taking_topic_quizzes.length;

                        $('#total-module').html(data.topic_quizzes.length);
                        $('#total-module-passed').html(data.passed_topic_quizzes.length);
                        $('#total-module-failed').html(data.failed_topic_quizzes.length);
                        $('#total-module-taking').html(data.taking_topic_quizzes.length);

                        self.renderRegisteredGraph(data.month_registered_users, data.year);
                        self.renderTakingGraph(data.user_progress);
                    },
                    error: function (resp) {

                    },
                    complete: function () {

                    }
                });
            },

            fetchFilterStatistics: async function () {
                var self = Dashboard;
                var filter_type = $('#filter-type').val();

                var params = {
                    type: $('#filter-type').val(),
                    // content: $('#filter-content').val(),
                };

                $.ajax({
                    url: self.baseUrl + 'api/dashboard/filter/type',
                    method: 'GET',
                    data: params,
                    beforeSend: function () {

                    },
                    success: function (resp) {
                        var data = resp;

                        $('#filter-content').empty();
                        $('#filter-content').append($('<option>', {
                            value: 0,
                            text: '----SELECT----'
                        }));

                        if (!self.loaded) {
                            $('#filter-report').empty();

                            $('#filter-report').append($('<option>', {
                                value: 0,
                                text: '----SELECT----'
                            }));

                        }
                     

                        var first_option = '';
                   
                        if (filter_type == "all") {
                            
                            //first_option ='General Student Report';
                            $('#filter-content').empty();
                            //para sa pag papalit ng label
                            document.getElementById('chartLabel').innerHTML = "General Student Report";
                            $('#filter-content').append($('<option>', {
                                value: 0,
                                text: 'General Student Report'
                            }));
                            
                            self.renderTopStudents(resp.top_students);
                            self.renderTopQuestions(resp.top_questions);
                            self.renderReportGraph(resp.quiz_records);
                        } 
                        if (filter_type == "module") {
                            document.getElementById('chartLabel').innerHTML = "Student's Report per Module";

                        }

                        $.each(data.data, function (i, item) {

                            var item_name = item.name;

                            if (filter_type == 'topic') {
                                document.getElementById('chartLabel').innerHTML = "Student's Report per Topic ";
                                var lesson_name = item.lesson && item.lesson.name ? item.lesson.name + ' - ' : '';

                                item_name = lesson_name + '' + item.name;
                             
                            }

                        
                            $('#filter-content').append($('<option>', {
                                value: item.id,
                                text: item_name
                            }));

                            if (!self.loaded) {
                                $('#filter-report').append($('<option>', {
                                    value: item.id,
                                    text: item_name
                                }));

                                if (i == 0) {
                                    first_option = item.id;
                                }
                            }
                        });


                        // if (!self.loaded) {
                        //     $('#filter-report').val(first_option);
                        //     $('#filter-content').val(first_option);
                        //     self.api.get.fetchTypeContent();
                        // }
                 
                        self.loaded = true;
                    },
                    error: function (resp) {

                    },
                    complete: function () {

                    }
                });
            },

            fetchTypeContent: function (data_type = '') {
                var self = Dashboard;

                var params = {
                    page: 'dashboard',
                    data_type: data_type,
                    type: $('#filter-type').val(),
                    content: $('#filter-content').val(),
                    report: $('#filter-report').val(),
                };

                $.ajax({
                    url: self.baseUrl + 'api/dashboard/filter/summary',
                    method: 'GET',
                    data: params,
                    beforeSend: function () {

                    },
                    success: function (resp) {
                        var data = resp;

                        // console.log(resp);
                        // if (data_type == 'taking') self.renderTakingGraph(resp.user_progress)
                        // if (data_type == 'report')
                        // {
                        //     self.renderReportGraph(resp.quiz_records);
                        // }
                        // else
                        // {
                        self.renderTopStudents(resp.top_students);
                        self.renderTopQuestions(resp.top_questions);
                        self.renderReportGraph(resp.quiz_records);
                        // }
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
    setTimeout(function () { Dashboard.init(); }, 1000);
    // Dashboard.init();
})