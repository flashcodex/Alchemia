var Topic = {

    selectedId: 0,
    baseUrl: '',

    init: function () {
        var self = this;

        let url = window.location.origin;
        url = url.includes("localhost") ? window.location.origin + "/public/" : 'https://pamantasanalchemia.com/public/';
        self.baseUrl = url;

        self.api.get.topicQuiz();
    },

    renderQuiz(data) {
        var self = this;

        var content = $('#quiz-content');
        $('#quiz-content div').remove();
        
        content.append(`<input type="hidden" name="topic_id" value="${data.id}"></input>`)

        $.each(data.quizzes, function (key, val) {
            var elemHtml = '';
            var type = val.type;
            var choices = val.choices;

            if(type == 'mc')
            {
                var array = choices.split(",");
                
                var select_options = [];
                var options = [];
                // var select_options = '';
                // var options = '';

                var i = 1;
                $.each(array, function (key, val) {
                    var letter = (i + 9).toString(36);

                    var select_option = `<option value="${letter}">${val}</option>`;
                    var option = `<label class="col-12 col-md-6 col-form-label text-center">${val}</label>`;

                    select_options.push(select_option);
                    options.push(option);
                    // select_options += select_option
                    // options += option;
                    i++;
                })

                select_options = Helper.shuffle(select_options)
                options = Helper.shuffle(options)
                options = options.join("")
                
                choices_div = 
                `<div class="form-group row">
                    <div class="col-4 col-md-2">
                        <select class="form-control form-control-solid" data_id="${val.id}" required="" data_ans="${val.answer}" type="text" name="question[${val.id}]">
                            <option>Select Answer</option>
                            ${select_options}
                        </select>
                    </div>
                    <label class="col-8 col-md-10 col-form-label">${val.question}</label>
                    ${options}
                </div>
                `;
            }
            else if(type == 'idnf')
            {
                choices_div = 
                `
                    <div class="form-group row">
                        <div class="col-4 col-md-2">
                            <input class="form-control form-control-solid" type="text" data_id="${val.id}" name="question[${val.id}]" required="" data_ans="${val.answer}" id="example-text-input" />
                        </div>
                        <label class="col-8 col-md-10 col-form-label">${val.question}</label>
                    </div>
                `;
            }
            else if (type == 'tof') {
               choices_div =
               `
                <div class="form-group row">
                    <div class="col-4 col-md-2">
                        <select class="form-control form-control-solid" type="text" data_id="${val.id}" required="" data_ans="${val.answer}" name="question[${val.id}]">
                            <option></option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>
                    <label class="col-8 col-md-10 col-form-label">${val.question}</label>
                </div>
               `;
            }

            var card = `                        
                        <div class="card">
                            <div id="collapse55" class="" data-parent="#accordionExample3">
                                <div class="card-body">
                                    ${choices_div}
                                </div>
                            </div>
                        </div>
                        `;

            elemHtml = `
                        ${card}
                       `;

            content.append(elemHtml)
        })

        self.addEvents();
    },

    addEvents: function () {
        var self = this;

        $('#submit-quiz-btn').unbind().bind('click', function () {
            // alert('module_39?topic=178');
            // window.location.replace('module_39?topic=178');

            Swal.fire({
                html: `Finish quiz?`,
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
                    self.api.post.submitQuiz();
                }
            });            
        });

        $('a[class*=topic-]').unbind().bind('click', function () {
            var id = parseInt($(this).attr('class').split(' ')[0].split('-')[1]);
            self.selectedId = id;
            var data = self.getTopicData(id);
            console.log(data);
            self.lookUpDataTopic = data;
        });       
    },

    getTopicData: function (id) {
        var self = this;
        var index = 0;

        $.each(self.lookUpDataTopics, function (key, val) {
            if (val.id == id) {
                index = key;
            }
        });

        return self.lookUpDataTopics[index];
    },

    api: {
        get: {
            topicQuiz: function () {
                var self = Topic;

                var params = {
                    user_id: $('#user_id').val(),
                    topic_id: $('#topic_page').val(),
                    random_order: true,
                };

                $.ajax({
                    url: self.baseUrl + 'api/topic-quiz',
                    method: 'GET',
                    data: params,
                    beforeSend: function () {

                    },
                    success: function (resp) {
                        // alert('topic quiz');
                        // console.log(resp);
                        $('#questions-count').html(resp.data.quizzes.length);
                        $('#quiz-name').html(resp.data.name)
                        $('#quiz_id').val(resp.quiz.id)
                            
                        self.renderQuiz(resp.data); 
                    },
                    error: function (resp) {

                    },
                    complete: function () {

                    }
                });
            },
        },

        post: {
            submitQuiz: function () {
                var self = Topic;

                $.ajax({
                    url: self.baseUrl + 'api/compute-quiz',
                    method: 'POST',
                    dataType: 'json',
                    // data: params,
                    data: $('#quiz_form').serialize(),
                    beforeSend: function () {

                    },
                    success: function (resp) {
                        var next = resp.type == 'passed' ? 'next' : 'current';
                        var topic = resp.topic ? '?topic=' + resp.topic : '';

                        Swal.fire({
                            html: `Checking is finished, you have ${resp.type} the quiz. <br> Your score is ${resp.score} / ${resp.total_questions}. <br> Redirecting to ${next} ${resp.move}.`,
                            icon: resp.type == 'passed' ? 'success' : 'error',
                            buttonsStyling: false,
                            confirmButtonText: "Yes, proceed!",
                            customClass: {
                                confirmButton: "btn font-weight-bold btn-warning",
                            },
                        }).then(function (result) {
                            if (result.value) {                                                  
                                // alert(resp.move + '_' + resp.module + topic);
                                var module = resp.material ? resp.material : '';
                                
                                // alert(module +  'dasd')
                                // window.location.replace(resp.move + '_' + resp.module + topic);
                                module ? window.location.replace('material_' + module) : window.location.replace(resp.move + '_' + resp.module + topic);
                            }
                        });

                        // setInterval(function () {
                        //     window.location.replace(resp.move + '_' + resp.module);
                        // }, 3000);
                        return;                        
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
    Topic.init();
})