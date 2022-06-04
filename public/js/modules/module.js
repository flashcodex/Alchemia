var Module = {

    selectedId: 0,
    baseUrl: '',
    quizGraph: [],

    init: function () {
        var self = this;

        let url = window.location.origin;
        url = url.includes("localhost") ? window.location.origin + "/public/" : 'https://pamantasanalchemia.com/public/';
        self.baseUrl = url;

        $('#filter-topic').empty();
        $('#filter-topic').append($('<option>', {
            value: 0,
            text: '----SELECT----'
        }));

        self.api.get.fetchUserQuizStatistics();
        self.api.get.fetchFilterStatistics('module');

        self.addEvents();
    },

    renderQuizGraph(data, type)
    {
        var self = this;

        var content = $('#quiz-graph');
        $('#quiz-graph div').remove();

        $.each(data, function (key, val) {
            var content_name = '';

            if (type == 'module')
            {
                content_name = val.content.module_info.name;
            }
            else
            {
                content_name = val.content.topic.name;
            }

            elemHtml = `<div style="margin-bottom:10px;">
                            <hr>
                            <span style="font-size: 2rem;font-weight: 500;">${ content_name }</span>
                            <canvas id="quiz-${key}"></canvas>
                        </div>`;
            content.append(elemHtml)

            var border_data = [];
            var border_color = [];
            var remark =[] ;

            // for creating of line with color represent of pass or failed
            //this will happen in every chart
            let counterofAttempt = 1;
            $.each(data[key].data, function (array_key, array_val,i) {
                //console.log(array_val);
                array_val.x = 'Attempt #' + counterofAttempt +  ": "+ array_val.x ;
                if(array_val.type == 'failed')
                {
                    border_data.push('rgba(237, 22, 68, 0.8)');
                    border_color.push('rgba(247, 10, 61, 0.8)');
                    remark.push('Failed');
                    //color red if failed
                }                 
                else if (array_val.type == 'passed'){
                    border_data.push('rgba(42, 207, 92, 0.8)');
                    border_color.push('rgba(53, 198, 97, 0.8)');
                    remark.push('Passed');
                    //color green if passed
                } 
                else
                {
                    border_data.push('rgba(237, 174, 13, 0.8)');
                    border_color.push('rgba(220, 165, 25, 0.8)');
                    remark.push('Failed');
                } 
                counterofAttempt++
            });

            const registered_data = {
                datasets: [{
                    data: data[key].data, //yung sa 
                    backgroundColor: border_data,
                    borderColor: border_color,
                    remark : remark,
                    borderWidth: 5,
                    tension: 0.1,
                    fill: false,
                }]
            };
            //console.log(registered_data);

            const config = {
                type: 'line',
                data: registered_data,
               
                options: {
                    plugins: {
                        //showAllTooltips: true,
                        subtitle: {

                            display: true,
                            text: function(chart){
                                //data that will be needed to do the conditional statment
                                //remark, dataindex, grade, total attempt
                                //console.log(chart);
                                
                                let trend = [];
                                var datalength = chart.chart.config._config.data.datasets[0].data.length;
                                var comment = "";
                                var comment1 = "";
                                var multistringText = [];
                                
                                // para sa isang attempt palang
                                if(datalength==1){
                                    let remark = chart.chart.config._config.data.datasets[0].remark[0];
                                        if(remark == "Passed"){
                                            comment += "Good Job You Passed the on first Attempt";
                                        }
                                        else if(remark == "Failed"){
                                            comment += "Success is not final, failure is not fatal: it is the courage to continue that counts";
                                        }
                                        else{
                                            comment = "";
                                        }
                                    multistringText.push(comment);
                                }
                                //para sa madaming attempt
                                 else if(datalength>1){
                
                                        for (let i = 0; i < datalength-1; i++) {
                                            if(chart.chart.config._config.data.labels.length == 0){
                                                console.log('skip')
                                            }
                                            else{
                                                let attemp = chart.chart.config._config.data.datasets[0].data[i].grade;
                                                let nextattempt = chart.chart.config._config.data.datasets[0].data[i+1].grade;
                                                
                                                if (attemp<nextattempt){
                                                    trend.push('up');
                                                }
                                                else if(attemp==nextattempt){
                                                    trend.push('stay');
                                                }
                                                else if(attemp>nextattempt){
                                                    trend.push('down');
                                                }
                                                else {
                                                    trend.push('checking');
                                                }
                                            }
                                        }

                                        //comment = ""; 
                                        console.log(trend);

                                        isPossitiveTrend = false;
                                        isNegativeTrend= false;
                                        isZigzagTrend= false;
                                        isLinearTrend = false;
                                        // let = startingpoint ='' ;
                                        // let = currentpoint= '' ;
                                        // let = endpoint= '';

                                        for(let trendcounter=0 ; trendcounter<trend.length; trendcounter++ ){
                                            console.log("trend Index [" +trendcounter+ "] :" + trend[trendcounter]);

                                            if(trendcounter == 0){

                                                if(trend[trendcounter] == 'up'){
                                                    console.log("I Enter the UP");
                                                    console.log(trend.length);
                                                    isPossitiveTrend = true;
                                                    //assume that the line will be zigzag
                                                    isZigzagTrend= true;
                                                    for(let inner = 0 ; inner<trend.length; inner++){
                                                        if(trend[inner] == trend[inner+1]){
                                                            console.log("I Enter the UP if ");
                                                            isNegativeTrend = true;
                                                            isZigzagTrend = false;
                                                        }
                                                        else if (trend.length == 1){
                                                            console.log("i enter zigzag trend = false");
                                                            isZigzagTrend = false;
                                                            inner = trend.length;
                                                        }
                                                        else{
                                                            console.log("I Enter the UP else");
                                                            isNegativeTrend = false;
                                                            inner = trend.length;
                                                        }
                                                    }
                                                }
                                                else if(trend[trendcounter] == 'down'){
                                                    console.log("I Enter the DOWN");
                                                    isNegativeTrend = true;
                                                    //assume that the line will be zigzag
                                                    isZigzagTrend= true;
                                                    for(let inner = 0 ; inner<trend.length; inner++){
                                                        if(trend[inner] == trend[inner+1]){
                                                            console.log("I Enter the DOWN if");
                                                            isPossitiveTrend = true;
                                                            isZigzagTrend = false;
                                                        }
                                                        else if (trend.length == 1){
                                                            console.log("i enter zigzag trend = false");
                                                            isZigzagTrend = false;
                                                            inner = trend.length;
                                                        }
                                                        else{
                                                            console.log("I Enter the DOWN else");
                                                            isPossitiveTrend = false;
                                                            inner = trend.length;
                                                        }
                                                    }
                                                }
                                                else if(trend[trendcounter] == 'stay'){
                                                    console.log("I Enter the STAY");
                                                    isLinearTrend = true;
                                                    //assume that the line will be zigzag
                                                    isZigzagTrend= true;
                                                    for(let inner = 0 ; inner<trend.length; inner++){
                                                        console.log("I Enter the STAY if");
                                                        if(trend[inner] == trend[inner+1]){
                                                            isPossitiveTrend = true;
                                                            isZigzagTrend = false;
                                                        }
                                                        else if (trend.length == 1){
                                                            console.log("i enter zigzag trend = false");
                                                            isZigzagTrend = false;
                                                            inner = trend.length;
                                                        }
                                                        else{
                                                            console.log("I Enter the STAY else");
                                                            isPossitiveTrend = false;
                                                            inner = trend.length;
                                                        }
                                                    }
                                                }


                                            }
                                            // else{
                                            //     // to determin if the line is going up
                                            //     if(trend[trendcounter] == 'up' && trend[trendcounter+1] =='up'){
                                            //         isPossitiveTrend = true;
                                            //     }
                                            //     else{
                                            //         isPossitiveTrend = false;
                                            //     }
                                            //     // to determin if the line is going down
                                            //     if(trend[trendcounter] == 'down' && trend[trendcounter+1] =='down'){
                                            //         isNegativeTrend = true;
                                            //     }
                                            //     else{
                                            //         isNegativeTrend = false;
                                            //     }
                                            //     // to determin if the line is straight line
                                            //     if(trend[trendcounter] == 'stay' && trend[trendcounter+1] =='stay'){
                                            //         isLinearTrend = true;
                                            //     }
                                            //     else{
                                            //         isLinearTrend = false;
                                            //     }
                                            // }
                                        }



                                        if(isPossitiveTrend == true && isZigzagTrend == false){
                                            comment += "Good job! You are showing a Passive trend in learning. Keep improving your score.";
                                            comment1 += "Everytime you take another attempt, you will get higher score than the previous attempt.";
                                        }
                                        else if(isPossitiveTrend == true && isZigzagTrend == true){
                                            comment += "Awesome. It seems like you are improving. Keep on trying. ";
                                            comment1 += "Everytime you take another attempt you will get a chance to perfect your score again.";
                                        }

                                        if(isNegativeTrend == true && isZigzagTrend == false ){
                                            comment += "It's okay. Don't be discourage, Failure is part of every success. Keep trying and you will get better score.";
                                            comment1 += "Everytime you take another attempt, you will get a lower score than the previous attempt.";
                                        }
                                        else if(isNegativeTrend == true && isZigzagTrend == true ){
                                            comment += "Focus on your score, and try to improved it next time!";
                                            comment1 += "Everytime you take another attemp you will get a chance to improve your score.";
                                        }

                                        if(isLinearTrend == true && isZigzagTrend == false){
                                            comment += "Nice! It shows all your scores are consistent. Keep it up!";
                                            comment1 += "Everytime you take another attempt you will get same score from the previous attempt.";
                                        }
                                        else if(isLinearTrend == true && isZigzagTrend == true){
                                            comment += "It seems like your other attemps are consistent and others are inconstant";
                                            comment1 += "Everytime you take another attempt you will get to improve your scores";
                                        }


                                        multistringText.push(comment);
                                        multistringText.push(comment1);
                                        
                                        console.log("isPossitiveTrend : " + isPossitiveTrend)
                                        console.log("isNegativeTrend : " + isNegativeTrend)
                                        console.log("isLinearTrend : " + isLinearTrend)
                                        console.log("isZigzagTrend : " + isZigzagTrend)

                                }
                                
                                return multistringText ;

                            } ,
                            position: 'bottom',
                            color: 'rgba(26, 163, 255, 1)',
                            font: {
                              size: 12,
                              family: 'tahoma',
                              weight: 'normal',
                              style: 'italic' 
                            }
                        },
                        tooltip:{
                            displayColors: false,
                            callbacks:{
                                beforeTitle: function(context){
                                    return 'Information';
                                },
                                title: function(context){
                                    var grade = context[0].dataset.data[context[0].dataIndex].grade;
                                    //console.log(dataIndex);
                                    //console.log(context[0].datasets);
                                    //console.log(context[0].dataset.data[context[0].dataIndex].grade);
                                    var firststring = 'Remark : ' + remark[context[0].dataIndex] ;
                                    var multistringText = [firststring];
                                    console.log(context[0]);
                                    var gradeString = 'Grade : ' + context[0].formattedValue + "%" ;
                                    var commentString = 'Comment : ';
                                        if(grade==100){
                                            commentString += 'Excellent';
                                        }
                                        else if(grade>=81 && grade<=99 ){
                                            commentString += 'Very Good';
                                        }
                                        else if(grade>=71 && grade<=80 ){
                                            commentString += 'Good';
                                        }
                                        else if(grade>=50 && grade<=70){
                                            commentString += 'Average';
                                        }
                                        else{
                                            commentString += 'There is always a room for improvement';
                                        }
                                     
                                    context[0].formattedValue = ""; 
                                    multistringText.push(gradeString);
                                    multistringText.push(commentString);
                                    //return 'Remark : ' + remark[context[0].dataIndex] ;
                                    return multistringText ;
                                },
                                afterTitle: function(context){
                                    //console.log(dataIndex);
                                    return  context[0].label ;
                                },
                                
                                // afterBody: function(context){
                                //     //console.log(dataIndex);
                                //     return 'Quiz Attempt #' + (context[0].dataIndex+1) + ': ' + context[0].label ;
                                // },
                            }
                        },
                        legend: {
                                display: false     
                            }
                        },
                        datalabels: {
                            display: false,
                            //display: true,
                        },
                        scales: {
                            x:{
                                title:{
                                    display: true,
                                    text: 'Quiz Attempt'
                                    }
                            },
                            y: {
                                title:{
                                    display: true,
                                    text: 'Grade in Percentage'
                                },
                                stepSize: 1,
                                callback: function (value) { if (value % 1 === 0) { return value; } },                            
                                beginAtZero: true
                            },
                        }

                    },
                };

            var grapharea = document.getElementById(`quiz-${key}`);

            const myChart = new Chart(
                grapharea,
                config
            );

            // if (!self.quizGraph[key])
                // self.quizGraph[key] = new Chart(grapharea, config);
            // else {
            //     self.quizGraph[key].reset();
            //     self.quizGraph[key].data.datasets[0].data = registered_data;
            //     self.quizGraph[key].update();
            // }            
        })

        self.addEvents();       
    },

    renderLessons(data) {
        var self = this;
        self.lookUpData = data;

        var content = $('#lessons-content');
        $('#lessons-content div').remove();

        $.each(data, function (key, val) {
            if (val.status == 1) {
                elemHtml = '<div class="col-xl-6 col-md-6 col-sm-12"> <div class="card card-custom wave wave-animate-slow wave-success bgi-no-repeat card-stretch gutter-b" style="background-position: right top; background-size: 30% auto; background-image: url(assets/media/svg/shapes/abstract-1.ssvg)"> <div class="card-body"> <div class="d-flex align-items-center">  </span> </span> <span class="font-weight-bold text-dark-75 font-size-h1">' + val.name + '</span> </div> </div></div></div>';
                // console.log(val.status);
                content.append(elemHtml)
            }
        })

        self.addEvents();

        $("#lessons-modal").modal('show');
    },

    addEvents: function () {
        var self = this;

        $('#filter-module').unbind().bind('change', function () {
            if (self.loaded) {
                self.api.get.fetchFilterStatistics('topic');
                self.api.get.fetchUserQuizStatistics();
            }            
        });

        $('#filter-topic').unbind().bind('change', function () {
            // self.api.get.fetchTypeContent('module');

            if (self.loaded) {
                self.api.get.fetchUserQuizStatistics('topic');
            }
        });

        $('span[class*=module-]').unbind().bind('click', function () {
            var id = parseInt($(this).attr('class').split(' ')[0].split('-')[1]);
            self.selectedId = id;

            self.api.get.lessons(id);
        });
    },

    api: {
        get: {
            lessons: function (id = '') {
                var self = Module;

                var params = {
                    module: id,
                };

                $.ajax({
                    url: self.baseUrl + 'api/module-lessons',
                    method: 'GET',
                    data: params,
                    beforeSend: function () {

                    },
                    success: function (resp) {
                        self.renderLessons(resp.data);
                    },
                    error: function (resp) {

                    },
                    complete: function () {

                    }
                });
            },

            fetchFilterStatistics: async function (type = 'module') {
                var self = Module;

                var params = {
                    type: type,
                    module: $('#filter-module').val(),
                    topic: $('#filter-topic').val(),
                    page: type,
                };

                $.ajax({
                    url: self.baseUrl + 'api/dashboard/filter/type',
                    method: 'GET',
                    data: params,
                    beforeSend: function () {

                    },
                    success: function (resp) {
                        var data = resp;

                        $('#filter-topic').empty();
                        $('#filter-topic').append($('<option>', {
                            value: 0,
                            text: '----SELECT----'
                        }));

                        
                        if (!self.loaded) {
                            $('#filter-module').empty();
                            $('#filter-module').append($('<option>', {
                                value: 0,
                                text: '----SELECT MODULE----'
                            }));
                        }

                        $.each(data.data, function (i, item) {
                            // var filter_type = $('#filter-type').val();

                            var item_name = item.name;

                            if (type == 'topic' && $('#filter-module').val() > 0) {
                                var lesson_name = item.lesson && item.lesson.name ? item.lesson.name + ' - ' : '';

                                item_name = lesson_name + '' + item.name;

                                $('#filter-topic').append($('<option>', {
                                    value: item.id,
                                    text: item_name
                                }));
                            }

                            if (!self.loaded) {
                                $('#filter-module').append($('<option>', {
                                    value: item.id,
                                    text: item_name
                                }));
                            }
                        });  
                        
                        self.loaded = true;
                    },
                    error: function (resp) {

                    },
                    complete: function () {

                    }
                });
            },

            fetchUserQuizStatistics(type = 'module') {
                var self = Module;

                var params = {
                    user_id: $('#user_id').val(),
                    module: $('#filter-module').val(),
                    topic: $('#filter-topic').val(),
                    type: type,
                };

                // alert('adsada')

                $.ajax({
                    url: self.baseUrl + 'api/dashboard/quiz',
                    method: 'GET',
                    data: params,
                    beforeSend: function () {

                    },
                    success: function (resp) {
                        var data = resp;

                        self.renderQuizGraph(resp.data, type);
                    },
                    error: function (resp) {

                    },
                    complete: function () {

                    }
                });
            }
        }
    }
}

$(function () {
    Module.init();
})