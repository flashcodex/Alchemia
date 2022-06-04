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
        $('#left-side').hide();
        
        $('#left-side-search').hide();
        self.api.get.periodicTableData();
        self.addEvents();
        console.log("start render dragula");
        self.renderDragula(); //making all element dragable 
        //self.renderSearch();
        console.log("finished rendering");

    },
    

    renderDragula() {
        var self = this;
        var left = document.getElementById('left-rm-spill');//all element grid
        var right = document.getElementById('right-rm-spill'); // formula box
        console.log(left);
        console.log(right);

        //form left to right means element are dragable to box but the box is not dragable to element
        dragula([left, right], {
            moves: function (el, source, handle, sibling) {
                console.log("inside Moves function of dragula");
                // if ($(el).hasClass("box2")|| el.classList.contains("fix-item")) {
                //     console.log("I ENTER HAS CLASS CONDITION");
                //     return false;
                // }
                // else {
                //     return true; // elements are always draggable by default
                // }
                if(el.classList.contains("no-drag")){
                    console.log("Enter condition");
                    return false;
                }
                console.log("nag return ng true");
                return true;
            },
            copy: function (el, source) {
                console.log("copy el");
                console.log(el);
                console.log("copy souce");
                console.log(source);

                if ($(el).hasClass("formula-box")) {
                    console.log('disable');
                    return false;
                }
                else {
                    return source === left;
                }
            },
            accepts: function (el, target) {
                // console.log("accepts" + el);

                return target !== left
            },
            invalid: function (el, handle) {
                
                // console.log('invalid');

                // console.log('el');
                // console.log(el);

                // console.log('handle');
                // console.log(handle);
                return false; // don't prevent any drags from initiating by default
            },
        }).on('drop', (el, target, source, sibling) => {
            const elementId = $(el).attr("id");
            const targetID = $(target).attr("id");
            const sourceId = $(source).attr("id");

            console.log(elementId);
            console.log(targetID);
            console.log(sourceId);

            if (targetID == 'right-rm-spill') {
                var id = parseInt($(el).attr('class').split(' ')[0].split('-')[1]);

                console.log(id);
                // self.elements.push(id);            

                const index = self.elements.indexOf(id);
                index > -1 ? self.elements.splice(index, 1) : self.elements.push(id);

                // $(el).attr('class', 'remove_item-' + id);
                document.getElementById('searchEndProduct').value = "";
                document.getElementById('NoEndP').style.visibility = "hidden"; 
                self.renderFormula();
                
                self.addEvents();
            }
        }).on('over', function (el, container, source) {
            console.log('over');
            console.log('el');
            console.log(el);

            console.log('container');
            console.log(container);

            console.log('source');
            console.log(source);
        });
    },
    // renderDragula() {
    //     var self = this;

    //     var left = document.getElementById('left-rm-spill');
    //     var right = document.getElementById('right-rm-spill');

    //     dragula([left, right], {            
    //         copy: function (el, source) {
    //             console.log("copy" + el);
    //             return source === left
    //         },
    //         accepts: function (el, target) {
    //             console.log("accepts" + el);
    //             return target !== left
    //         },
    //     }).on('drop', function (el) {
    //         console.log(el);
    //         var id = parseInt($(el).attr('class').split(' ')[0].split('-')[1]);

    //         console.log(id);
    //         // self.elements.push(id);            

    //         const index = self.elements.indexOf(id);
    //         index > -1 ? self.elements.splice(index, 1) : self.elements.push(id);

    //         $(el).attr('class', 'remove_item-' + id);

    //         
    //         // if ($('drop-target').children.length > 0) {
    //         //     $('display').innerHTML = $('drop-target').innerHTML;
    //         // } else {
    //         //     $('display').innerHTML = "Display";
    //         // }


    //         self.addEvents();
    //     });
    // },

    // dito yung pag lalagay ng event handler sa search bar lagyan din ng delay



    // endProductAction(data){
    //     var search = document.getElementById("searchEndProduct");
    //     document.getElementById("searchEndProduct").onchange = function() {
    //         if($ != ""){
    //             renderEndProduct(data); 
    //             showRightSideSearch();
    //         }
    //         else{
    //             hideLeftSideSearch();
    //         }
    //     }
    // },
        

    // },


    renderEndProduct(data) {
        //console.log(data.length == 0);
        var self = this;

        var content = $('#outcomes-search');
        $('#outcomes-search div').remove();

        $.each(data, function (key, val) {
            var elemHtml = '';

            var requirements = ``;
            var elements = '';

            var elements = JSON.parse("[" + val.elements + "]");

            $.each(elements, function (key_ele, val_ele) {
                self.tableData = self.periodicTable.find(e => e.number == val_ele);
                var data = self.tableData;
                var isLastElement = key_ele == elements.length - 1;
                requirements += `${data.title}` + ' ' + (!isLastElement ? '+' : '');;
            })

            const str = val.name;
            var new_name = '';
            for (let c of str) {
                if ($.isNumeric(c)) {
                    new_name += `<sub>${c}</sub>`;
                }
                else {
                    new_name += c;
                }
            }

            elemHtml = `<div class="col-12 col-sm-12">
                            <div class="card border-dark" style="margin-bottom: 1rem;margin-top: 1rem;">
                                <div class="card-body p-0" style="padding: 1.5rem 0.5rem 0.5rem !important;">
                                    <h4 class="card-title">${val.title} - ${new_name}</h4>
                                    <hr>
                                    <h5>Required Elements</h5>
                                    <p class="card-text"><h4>${requirements}</h4>
                                    
                                </div>
                            </div>
                        </div>`;

            content.append(elemHtml);// wala coma dito?
        })
     


        if (data.length == 0 ) {
            document.getElementById('NoEndP').style.visibility = "visible";  
            self.hideLeftSideSearch();
        }

        else if (data.length > 0 ) {
            self.showRightSideSearch(); 
            document.getElementById('NoEndP').style.visibility = "hidden"; 
           // document.getElementById("clear").click();
        }
        self.addEvents();

    },

    renderOutcomes(data) {

        var self = this;

        var content = $('#outcomes');
        $('#outcomes div').remove();

        $.each(data, function (key, val) {
            var elemHtml = '';

            var requirements = ``;
            var elements = '';

            var elements = JSON.parse("[" + val.elements + "]");

            $.each(elements, function (key_ele, val_ele) {
                self.tableData = self.periodicTable.find(e => e.number == val_ele);
                var data = self.tableData;

                var isLastElement = key_ele == elements.length - 1;

                requirements += `${data.title}` + ' ' + (!isLastElement ? '+' : '');
                // requirements += (`${data.title}` + '' + `${data.number}`) + ' ' + (!isLastElement ? '+' : '');
            })

            // $.each(val.formulas, function (key_ele, val_ele) {

            //     var isLastElement = key_ele == val.formulas.length - 1;

            //     requirements += `${val_ele.elements.title}` + ' ' + (!isLastElement ? '+' : '');
            // })

            const str = val.name;
            var new_name = '';

            // console.log("string : " + str);

            //for subsript
            for (let c of str) {
                // console.log("char : " + c);
                if ($.isNumeric(c)) {
                    // console.log('numeric');
                    new_name += `<sub>${c}</sub>`;
                }
                else {
                    // console.log('alpha');
                    new_name += c;
                }
            }

            elemHtml = `<div class="col-12 col-sm-12">
                            <div class="card border-dark" style="margin-bottom: 1rem;margin-top: 1rem;">
                                <div class="card-body p-0" style="padding: 1.5rem 0.5rem 0.5rem !important;">
                                    <h4 class="card-title">${val.title} - ${new_name}</h4>
                                    <hr>
                                    <h5>Required Elements</h5>
                                    <p class="card-text"><h4>${requirements}</h4>
                                    
                                </div>
                            </div>
                        </div>`;
            content.append(elemHtml)
        })

        if (self.elements.length > 0 && data.length == 0) {
            var no_combination = `<div id="no-outcome" style="float:left;margin-left:1rem; font-size:1em; " class="no-drag" >No Possible Combination</div>`;
            // $('#right-rm-spill').append(no_combination)
            // $(no_combination).insertBefore('#clear-container');
            $('#clear-container').append(no_combination);
            self.hideLeftSide();
            self.hideLeftSideSearch();
        }
        else if (data.length > 0 ) {
            self.showRightSide();
           
        }

        self.addEvents();
    },

    hideLeftSide() {
        var self = this;

        $('#left-side').hide();
        $('#left-side-search').hide();
        $("#right-side").attr("class", "col-12 col-md-12 col-lg-12");
        $('#main-container').attr("class", "main-container center-periodic");
    },

    showRightSide() {
        var self = this;

        $('#left-side').fadeIn();
        $('#left-side-search').hide();
        $("#right-side").attr("class", "col-12 col-md-9 col-lg-9");
        $('#main-container').attr("class", "main-container");
    },

    hideLeftSideSearch() {
        var self = this;
        $('#left-side-search').hide();
        $('#left-side').hide();
        $('#right-side').attr("class", "col-12 col-md-12 col-lg-12");
        $('#main-container').attr("class", "main-container center-periodic");
    },

    showRightSideSearch() {
        var self = this;

        $('#left-side-search').fadeIn();
        $('#left-side').hide();
        $("#right-side").attr("class", "col-12 col-md-9 col-lg-9").fadeIn();
        $('#main-container').attr("class", "main-container");
    },


    renderFormula() {
        var self = this;

        // var content = $('#formula');
        // $('#formula div').remove();

        $('#right-rm-spill div').remove();
        $('#right-rm-spill').append('<div id="formula" class="formula-container no-drag" style="scrollbar-width: thin;  height: 6.5rem; padding:1rem; overflow-y:hidden;  "></div>');
        var content = $('#formula');

        if (self.elements.length > 0) {
            var elemHtml = '<div class="drag-elementstag no-drag " style="position: absolute;top: 0;width: 100%;margin-top: 1rem;margin-bottom: 1rem;"><span class="drag-elementstag" style=" touch-action: none; height:20px">Drag element to combine</span></div>';
            // var elemHtml = '<div style="grid-column-start: 1;grid-column-end: 10;text-align: center;"><span id="drag-elements">Drag elements to combine</span></div>';
            $('#right-rm-spill').append(elemHtml)

            $.each(self.elements, function (key, val) {
                var elemHtml = '';

                self.tableData = self.periodicTable.find(e => e.number == val);
                var data = self.tableData;

                elemHtml = `<div style="grid-column-start: auto;line-height: 0.8;" class=" no-drag remove_item-${val} card grid-item item${val}" > <p class="no-drag" style="font-size: 13px;"> ${data.number} </p> ${data.title} `;

                content.append(elemHtml)
            })

            // var elemHtml = '<div style="grid-column-start: 1;grid-column-end: 10;text-align: center;"><span>Drag elements to combine</span></div>';
            var clear = `<div id="clear-container"  class ="no-drag "
            style="position: absolute;bottom: 0;width: 100%;margin-bottom: 0.7rem; height:30px;"><button id="clear" class="btn btn-info no-drag" style="float: right; margin-right: 1rem;background-color:#0cc6e7; user-drag: none; padding:revert">CLEAR</button></div>`;
            $('#right-rm-spill').append(clear)
        }
        else {
            var elemHtml = '<div class="drag-elementstag no-drag" draggable="false" style="position: absolute;top: 0;width: 100%;margin-top: 1rem;"><span class="drag-elementstag">Drag elements to combine</span></div>';
            // var elemHtml = '<div style="grid-column-start: 1;grid-column-end: 10;text-align: center;"><span id="drag-elements">Drag elements to combine</span></div>';
            $('#right-rm-spill').append(elemHtml)

            self.hideLeftSide();
        }

        self.api.get.combine();

        self.addEvents();
    },
    // renderSearch(){
    //     document.getElementById("searchEndProduct").onchange = function() {
    //         console.log("Onchange Trigger");
    //         if($('#searchEndProduct').val != ""){
    //             self.api.get.endProduct(); 
    //             showRightSideSearch();
    //         }
    //         else{
    //             hideLeftSideSearch();
    //         }
    //     } 
        
    // },

    addEvents: function () {
        var self = this;
        $('#clear').unbind().bind('click', function () {
            self.elements = [];
            self.renderFormula();
            self.hideLeftSide();
            self.addEvents(); 
        });
        
        $('#searchEndProduct').unbind().bind('onchange', function (){
                 console.log("onchange function");
            if($('#searchEndProduct').val() != ""){
                self.addEvents(); 
                console.log("onchange if");
                $('#clear').click(); 
                $('#left-side').fadeOut();
                self.api.get.endProduct(); 
            }else{
                console.log("onchange else");
                self.hideLeftSideSearch();
                document.getElementById('NoEndP').style.visibility = "hidden"; 
              
            }
        },oninput = function(){
            console.log("oninput function");
            if($('#searchEndProduct').val() != ""){
                self.addEvents(); 
                $('#clear').click(); 
                $('#left-side').fadeOut();
                self.api.get.endProduct(); 
                console.log("oninput if");
            }else{
                console.log("oninput else");
                self.hideLeftSideSearch();
                document.getElementById('NoEndP').style.visibility = "hidden"; 
               
            }
        },onsearch = function(){
            console.log("On Search");
            if($('#searchEndProduct').val() != ""){
                self.addEvents(); 
                $('#left-side').fadeOut();
                $('#clear').click(); 
                self.api.get.endProduct(); 

                console.log("On Search IF");
            }else{
                console.log("On Search ELse");
                self.hideLeftSideSearch();
                document.getElementById('NoEndP').style.visibility = "hidden"; 
            }
        }); 



        $('div[class*=remove_item-]').unbind().bind('click', function () {
            console.log('remove item');

            var id = parseInt($(this).attr('class').split(' ')[0].split('-')[1]);
            // self.selectedId = id;

            // const index = self.elements.indexOf(id);
            // self.elements.splice(index, 1)

            $(`#right-rm-spill .remove_item-` + id).remove();
            console.log(`#right-rm-spill .remove_item-` + id);
            // $('#right-rm-spill .remove_item-5').remove();
            const index = self.elements.indexOf(id);
            self.elements.splice(index, 1)

            self.renderFormula();



            self.addEvents();
        });

        $('div[class*=element-]').unbind().bind('click', function () {
            var id = parseInt($(this).attr('class').split(' ')[0].split('-')[1]);

            // // alert(id);
            // // self.elements.push(id);            

            // const index = self.elements.indexOf(id);
            // index > -1 ? self.elements.splice(index, 1) : self.elements.push(id);

            // self.renderFormula();

            // // $('#formula').html(self.elements);
            // // var data = self.getTopicData(id);
            // self.addEvents();

            var data = self.periodicTable.find(e => e.number == id);
            // console.log(data);
            if (data) {
                $('#element-modal').modal('show');
                $('#name').html(data.name);
                $('#atomicNum').html(data.number);
                $('#atomicWeight').html(data.weight);
                $('#eConfig').html(data.config);
                $('#category').html(data.category);
                $('#discoveredBy').html(data.discovered_by);
            }
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
            combine: function () {
                var self = Periodic;

                var params = {
                    elements: self.elements,
                };

                $.ajax({
                    url: self.baseUrl + 'api/combine-elements',
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
            endProduct: function () {
                var self = Periodic;

                var params = {
                    search : $('#searchEndProduct').val()
                };

                $.ajax({
                    url: self.baseUrl + 'api/search-end-products',
                    method: 'GET',
                    data: params,
                    beforeSend: function () {
                    },
                    success: function (resp) {
                        var data = resp.data;
                        self.renderEndProduct(data);
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

        }
    }
}

$(function () {
    setTimeout(function () { Periodic.init(); }, 1000);
})