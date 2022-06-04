var Material = {

    selectedId: 0,
    lookUpDataTopics: [],
    lookUpDataTopic: {},
    baseUrl: '',

    init: function () {
        var self = this;

        let url = window.location.origin;
        url = url.includes("localhost") ? window.location.origin + "/public/" : 'https://pamantasanalchemia.com/public/';
        self.baseUrl = url;

        self.api.get.userModules();
        // self.addEvents();
    },

    disableModules(data) {
        var self = this;

        // $.each(data, function (key, val) {        
        //     var elemHtml = '';

        //     var content = $('#module_actions-' + val.module);
        //     $('#module_actions-' + val.module + ' sup').remove();
        //     $('#module_actions-' + val.module + ' span').remove();

        //     // `${response} asd asda s                

        //     quiz = '';

        //     if (val.status == 1)
        //     {
        //         quiz = ` | <a href="quiz_${val.module}"><span id="total-sale" class="font-size-h5">Quiz</span></a>`;
        //     }

        //     elemHtml = `<a href="module_${val.module}"><span id="total-sale" class="font-size-h5">Lesson</span></a> |
        //                 <a href="flashcard_${val.module}"><span id="total-sale" class="font-size-h5">Flashcard</span></a>
        //                 ${quiz}
        //                `;

        //     // console.log(elemHtml);

        //     // alert('append');

        //     content.append(elemHtml)
        // })

        self.addEvents();
    },

    addEvents: function () {
        var self = this;

        $('a[class*=topic-]').unbind().bind('click', function () {
            var id = parseInt($(this).attr('class').split(' ')[0].split('-')[1]);
            self.selectedId = id;
            var data = self.getTopicData(id);
            console.log(data);
            self.lookUpDataTopic = data;

            $(".navi-item").removeClass("using");
            $('#nav-topic-' + id).addClass("using");
        });

        $('button[class*=topic_quiz_btn-]').unbind().bind('click', function () {
            var id = parseInt($(this).attr('class').split(' ')[0].split('-')[1]);
            self.selectedId = id;
            self.lookUpDataTopic = self.getTopicData(id);

            Swal.fire({
                html: `Do you want to start the quiz?`,
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
                    window.location.replace('topic_' + self.selectedId);
                    // window.location.replace('quiz_39');
                }
            });
        });


        $('button[class*=next_topic_btn-]').unbind().bind('click', function () {
            var id = parseInt($(this).attr('class').split(' ')[0].split('-')[1]);
            self.selectedId = id;
            // alert(id);

            Swal.fire({
                html: `Proceed to next topic?`,
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
                    // window.location.replace('topic_' + self.selectedId);
                    self.api.post.nextTopic(id);
                }
            });
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
            userModules: function () {
                var self = Material;

                var params = {
                    user_id: $('#user_id').val(),
                    module: $('#material_page').val(),
                };

                $.ajax({
                    url: self.baseUrl + 'api/user-modules',
                    method: 'GET',
                    data: params,
                    beforeSend: function () {

                    },
                    success: function (resp) {
                        self.disableModules(resp.data);
                    },
                    error: function (resp) {

                    },
                    complete: function () {

                    }
                });
            },

            userTopicTakenQuiz: async function () {
                var self = Material;

                var params = {
                    user_id: $('#user_id').val(),
                    module: $('#material_page').val(),
                };

                return await $.ajax({
                    url: self.baseUrl + 'api/user-topic',
                    method: 'GET',
                    data: params,
                    beforeSend: function () {

                    },
                    success: function (resp) {

                    },
                    error: function (resp) {

                    },
                    complete: function () {

                    }
                });
            },
        },

        post: {
            nextTopic: function (id) {
                var self = Material;

                var params = {
                    topic_id: id,
                    user_id: $('#user_id').val(),
                    module: $('#material_page').val(),
                };

                // alert(self.baseUrl + 'api/next-topic');

                $.ajax({
                    url: self.baseUrl + 'api/next-topic',
                    method: 'POST',
                    data: params,
                    beforeSend: function () {

                    },
                    success: function (resp) {
                        // alert('next topic');
                        var module = resp.material ? resp.material : '';

                        if (resp.move == 'material') {
                            Swal.fire({
                                text: `Module finished redirecting to dashboard.`,
                                icon: 'success',
                                buttonsStyling: false,
                                confirmButtonText: "Yes, proceed!",
                                customClass: {
                                    confirmButton: "btn font-weight-bold btn-warning",
                                },
                            }).then(function (result) {
                                if (result.value) {
                                    module ? window.location.replace('material_' + module) : window.location.replace('dashboard');
                                }
                            });

                            setInterval(function () {
                                module ? window.location.replace('material_' + module) : window.location.replace('dashboard');
                            }, 3000);
                            return;
                        }
                        else 
                        {
                            var topic = resp.topic ? '?topic=' + resp.topic : '';

                            window.location.replace('module_' + resp.module + topic);
                        }
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