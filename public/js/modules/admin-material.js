var Material = {

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

        self.addEvents();
    },

    renderTopicQuiz(data)
    {
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
            data: data,
            columns: [
                { data: 'type', responsivePriority: 1 },
                { data: 'question' },
                { data: 'choices', visible: false },
                { data: 'answer' },
                { data: 'created_at' },
                { data: 'id', sWidth: '10%'  },
            ],
            columnDefs: [
                {
                    targets: 0,
                    render: function (data, type, full, meta) {
                        var status = {
                            'tof': { 'title': 'True or False', 'state': 'info' },
                            'idnf': { 'title': 'Identification', 'state': 'info' },
                            'mc': { 'title': 'Multiple Choices', 'state': 'info' },
                            'mci': { 'title': 'Multiple Choices Image', 'state': 'info' }
                        };
                        if (typeof status[data] === 'undefined') {
                            return data;
                        }
                        return '<div class="d-flex flex-row align-items-center"><span class="label label-' + status[data].state + ' label-dot mr-2"></span>' +
                            '<span class="font-weight-bold text-' + status[data].state + '">' + status[data].title + '</span></div>';
                    },
                },
                {
                    targets: 5,
                    width: "10%",
                    render: function (data, type, full, meta) {
                        return `<div class="btn-group" role="group">
                                    <a class="edit_quiz-${data} btn btn-primary btn-shadow font-weight-bold mr-2"><span class="flaticon flaticon-edit"></span> Edit</a>
                                    <a class="remove_quiz-${data} btn btn-danger btn-shadow font-weight-bold mr-2"><span class="flaticon2 flaticon2-trash"></span> Delete</a>
                               </div>`;
                        // var val = data.split("|");
                        // return '<div class="btn-group" role="group"><a class="btn btn-primary btn-shadow font-weight-bold mr-2 edit_quiz" data_id="' + val[0] + '" data_page="' + val[1] + '" data_type="' + val[2] + '" data_question="' + val[3] + '" data_answer="' + val[4] + '"  data_header_id="' + val[5] + '" data_page_id="' + val[6] + '" data_choices="' + val[7] + ',' + val[8] + ',' + val[9] + ',' + val[10] + '"><span class="flaticon flaticon-edit"></span> Edit</a> <a class="btn btn-danger btn-shadow font-weight-bold mr-2 remove_quiz" data_id="' + val[0] + '"><span class="flaticon2 flaticon2-trash"></span> Delete</a></div>';
                    },
                },
            ],
            "order": [[4, "desc"]]
        });

        // $.each(data, function (key, val) {
        //     elemHtml = '<div class="col-xl-6 col-md-6 col-sm-12"> <div class="card card-custom wave wave-animate-slow wave-success bgi-no-repeat card-stretch gutter-b" style="background-position: right top; background-size: 30% auto; background-image: url(assets/media/svg/shapes/abstract-1.ssvg)"> <div class="card-body"> <div class="d-flex align-items-center">  </span> </span> <span class="font-weight-bold text-dark-75 font-size-h1">' + val.name + '</span> </div> </div></div></div>';

        //     content.append(elemHtml)
        // })
    
        $('#topic_quiz_modal').modal('show');

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

        $('#show_pages').unbind().bind('click', function () {
            if ($("#pages").hasClass("show")) {
                $('#btn-update-topic-order').hide();
            }
            else
            {
                $('#btn-update-topic-order').show();                
            }
        });

        $('#btn-update-topic-order').unbind().bind('click', function () {
            self.api.post.updateTopicNumber();
        });        

        var instance = document.querySelector(".grabbable-parent")
            .grabbable({
                callback: function (el, newIndex, oldIndex) {
                    alert("Grabbed!\n" + oldIndex + " -> " + newIndex);
                }
            });

        // document.querySelector(".grabbable-parent2")
        // .grabbable({
        //     rememberId: "grabbable-sample",
        //     style: {
        //         border: "2px solid #ff0000",
        //         background: "#ffddcc",
        //         transform: "scale(0.5, 0.5)",
        //     }
        // });


        $('#save-topic-btn').unbind().bind('click', function () {
            var topic_id = $('#topic_id').val();

            self.api.post.saveTopic(topic_id, self.selectedId);
        });

        $('#quiz_publish_btn').unbind().bind('click', function () {
            var topic_id = $('#topic_id').val();

            Swal.fire({
                html: `Publish this topic quiz?`,
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
                    self.api.post.publish(topic_id, 1);
                }
            });            
        });

        $('#quiz_unpublish_btn').unbind().bind('click', function () {
            var topic_id = $('#topic_id').val();

            Swal.fire({
                html: `Unpublish this topic quiz?`,
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
                    self.api.post.publish(topic_id, 0);
                }
            });
        });        

        $('#quiz_type').unbind().bind('change', function () {
            // alert(this.value);         
            $('.tof').hide();
            $('.idnf').hide();
            $('.mc').hide();
            $('.mci').hide();

            $('.' + this.value).show();
        });        

        $('#update_topic_setting').unbind().bind('click', function () {
            var title = $('#topic_title').html();

            Swal.fire({
                html: `Update ${title} settings?`,
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
                    var topic_id = $('#topic_id').val();

                    self.api.post.updateTopicSetting(topic_id);
                }
            });
        });

        $('#add_topic_question_btn').unbind().bind('click', function () {
            self.type = 'ADD';
            $('#topic_quiz_form')[0].reset();
            $('#question_title').html('Add Question');
            $('#save-topic-btn').html('Add');
            
            $('.tof').hide();
            $('.idnf').hide();
            $('.mc').hide();
            $('.mci').hide();

            $('#topic_quiz_question_modal').modal('show');
        });

        $('#add-quiz').unbind().bind('click', function () {
            var topic_id = $('#topic_id').val();

            // alert('topic ' + self.selectedId);

            self.api.get.fetchTopic(topic_id);
        });

        function delay(callback, ms) {
            var timer = 0;
            return function () {
                var context = this, args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function () {
                    callback.apply(context, args);
                }, ms || 0);
            };
        }

        // Example usage:

        $('#module_no').unbind().keyup(delay(function (e) {
            var module_id = $('#module_id').val();
            var module_no = $('#module_no').val();
            var module_name = $('#module_name').val();

            if (module_no != '')
            {
                Swal.fire({
                    html: `Update ${module_name} number as ${module_no}?`,
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
                        self.api.post.updateModuleNumber(module_id);
                    }
                });
            }
        }, 500));

        $('a[class*=remove_quiz-]').unbind().bind('click', function () {
            var id = parseInt($(this).attr('class').split(' ')[0].split('-')[1]);
            self.selectedId = id;
            var data = self.getSelectedData(id);

            Swal.fire({
                html: `Do you want to delete this question <br> ${data.question}?`,
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
                if (result.value) 
                {
                    self.api.post.removeTopic(id);
                }
            });
        });

        $('a[class*=edit_quiz-]').unbind().bind('click', function () {
            var id = parseInt($(this).attr('class').split(' ')[0].split('-')[1]);
            self.selectedId = id;
            var data = self.getSelectedData(id);
            self.type = 'EDIT';
            $('#question_title').html('Edit Question');
            $('#save-topic-btn').html('Edit');

            console.log(data);

            $('#quiz_type').val(data.type)
            $('#question').val(data.question)

            $('.tof').hide();
            $('.idnf').hide();
            $('.mc').hide();
            $('.mci').hide();

            $('.' + $('#quiz_type').val()).show();

            if (data.type == 'tof') {
                // choices = $('#tof-ans').val();
                $('#tof-ans').val(data.answer);
            }
            else if (data.type == 'idnf') {
                $('#idnf-ans').val(data.answer);
            }
            else if (data.type == 'mc') {
                $('#mc-ans').val(data.answer);

                var array = data.choices.split(",");

                $('#qa').val(array[0]);
                $('#qb').val(array[1]);
                $('#qc').val(array[2]);
                $('#qd').val(array[3]);
            }

            // self.api.post.saveTopic(self.selectedId , id);

            $('#topic_quiz_question_modal').modal('show');
        });

        $('.close').unbind().bind('click', function () {
            $('#topic_quiz_question_modal').hide();
        });        
    },

    api: {
        get: {
            fetchTopic: function (id) {
                var self = Material;

                var params = {
                    id: id,
                };

                $.ajax({
                    url: self.baseUrl + 'api/fetch-topic',
                    method: 'GET',
                    data: params,
                    beforeSend: function () {
                        
                    },
                    success: function (resp) {
                        var data = resp.data;

                        $('#topic_title').html(data.name);
                        $('#passing_grade').val(data.passing_grade);
                        $('#quiz_item').val(data.quiz_item);
                        if(data.with_quiz == 0)
                        {
                            $('#quiz_publish_btn').show();
                            $('#quiz_unpublish_btn').hide();
                        }
                        else
                        {
                            $('#quiz_publish_btn').hide();
                            $('#quiz_unpublish_btn').show();
                        }

                        self.renderTopicQuiz(data.quizzes);
                    },
                    error: function (resp) {

                    },
                    complete: function () {

                    }
                });
            },
        },

        post: {
            updateTopicSetting(id)
            {
                var self = Material;

                var params = {
                    id: id,
                    quiz_item: $('#quiz_item').val(),
                    passing_grade: $('#passing_grade').val(),
                };

                $.ajax({
                    url: self.baseUrl + 'api/setting/update',
                    method: 'POST',
                    data: params,
                    beforeSend: function () {

                    },
                    success: function (resp) {
                        Swal.fire({
                            text: 'Setting updated.',
                            icon: "success",
                        })
                    },
                    error: function (resp) {

                    },
                    complete: function () {

                    }
                });                
            },

            updateTopicNumber()
            {
                var self = Material;

                self.order = [];

                $('.topic_page').each(function (i, obj) {
                    // console.log('loop : ' + i);
                    // console.log(obj);
                    var dataId = $(this).attr("data_id");
                    
                    self.order.push(dataId);
                });                
                

                var params = {
                    module: $('#module_id').val(),
                    number: self.order,
                };

                $.ajax({
                    url: self.baseUrl + 'api/update/topic/order',
                    method: 'POST',
                    data: params,
                    beforeSend: function () {

                    },
                    success: function (resp) {
                        Swal.fire({
                            text: `Topic order updated.`,
                            icon: "success",
                        })
                    },
                    error: function (resp) {

                    },
                    complete: function () {

                    }
                });                
            },

            updateModuleNumber: function (id) {
                var self = Material;

                var params = {
                    module: id,
                    number: $('#module_no').val(),
                };

                $.ajax({
                    url: self.baseUrl + 'api/update/module/number',
                    method: 'POST',
                    data: params,
                    beforeSend: function () {

                    },
                    success: function (resp) {                    
                        Swal.fire({
                            text: `Module number updateed.`,
                            icon: "success",
                        })
                    },
                    error: function (resp) {

                    },
                    complete: function () {

                    }
                });
            },

            saveTopic: function (topic_id , id = 0) {
                var self = Material;

                var type = $('#quiz_type').val().trim();
                var choices = '';
                var answer = '';

                if (type == 'tof')
                {
                    // choices = $('#tof-ans').val();
                    answer = $('#tof-ans').val();
                }
                else if (type == 'idnf')
                {
                    // choices = $('#tof-ans').val();
                    answer = $('#idnf-ans').val();
                }
                else if (type == 'mc')
                {
                    answer = $('#mc-ans').val();                
                    choices = $('#qa').val() + ',' + $('#qb').val() + ',' + $('#qc').val() + ',' + $('#qd').val();
                }

                var params = {
                    topic_id: topic_id,
                    id: id,
                    user_id: $('#user_id').val(),
                    question: $('#question').val(),
                    type: type,
                    choices: choices,
                    answer: answer,
                    action: self.type,
                };

                $.ajax({
                    url: self.baseUrl + 'api/save-topic',
                    method: 'POST',
                    data: params,
                    beforeSend: function () {

                    },
                    success: function (resp) {
                        $('#topic_quiz_form')[0].reset();
                        $('#topic_quiz_question_modal').modal('hide');
                        var topic_id = $('#topic_id').val();

                        Swal.fire({
                            text: `Topic ${self.type.toLowerCase()}ed.`,
                            icon: "success",
                        })
                        
                        self.api.get.fetchTopic(topic_id);
                    },
                    error: function (resp) {

                    },
                    complete: function () {

                    }
                });
            },

            removeTopic: function (id) {
                var self = Material;

                var params = {
                    id: id,
                };

                $.ajax({
                    url: self.baseUrl + 'api/remove-topic',
                    method: 'POST',
                    data: params,
                    beforeSend: function () {

                    },
                    success: function (resp) {
                        Swal.fire({
                            text: `Topic deleted.`,
                            icon: "success",
                        })

                        var topic_id = $('#topic_id').val();

                        self.api.get.fetchTopic(topic_id);
                    },
                    error: function (resp) {

                    },
                    complete: function () {

                    }
                });
            },

            publish: function (id , with_quiz) {
                var self = Material;

                var params = {
                    id: id,
                    with_quiz: with_quiz
                };

                $.ajax({
                    url: self.baseUrl + 'api/publish-topic',
                    method: 'POST',
                    data: params,
                    beforeSend: function () {

                    },
                    success: function (resp) {
                        Swal.fire({
                            text: with_quiz == 1 ? 'Topic published' : 'Topic unpublished.',
                            icon: "success",
                        })

                        var topic_id = $('#topic_id').val();

                        self.api.get.fetchTopic(topic_id);
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
    Material.init();
})