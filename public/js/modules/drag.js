var Drag = {
    baseUrl: '',

    init: function () {
        var self = this;

        let url = window.location.origin;
        url = url.includes("localhost") ? window.location.origin + "/public/" : 'https://pamantasanalchemia.com/public/';
        self.baseUrl = url;

        self.renderDragula();
    },

    renderDragula()
    {
        var self = this;

        var left = document.getElementById('left-rm-spill');
        var right = document.getElementById('right-rm-spill');

        dragula([left, right], {
            copy: function (el, source) {
                return source === document.getElementById(left)
            },
            accepts: function (el, target) {
                return target !== document.getElementById(left)
            }
        });
    }
}

$(function () {
    setTimeout(function () { Drag.init(); }, 500);   
})