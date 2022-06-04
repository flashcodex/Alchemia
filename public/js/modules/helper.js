var Helper = {

    init: function () {
        $.fn.removeClassStartingWith = function (filter) {
            $(this).removeClass(function (index, className) {
                return (className.match(new RegExp("\\S*" + filter + "\\S*", 'g')) || []).join(' ')
            });
            return this;
        };
    },

    shuffle : function (a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    },

    notify: function (title, message) {
        $.toast({
            heading: title,
            text: message,
            position: 'top-right',
            loaderBg: '#ff6849',
            icon: 'success',
            hideAfter: 3500,
            stack: 6
        });
    },

    warn: function (title, message) {
        $.toast({
            heading: title,
            text: message,
            position: 'top-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500,
            stack: 6
        });
    },

    confirm: {
        ok: function (title, message, callback) {
            $('#confirm-ok-modal').remove();

            var elemHtml = '<div id="confirm-ok-modal" class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="confirm-ok-modal" aria-hidden="true" style="display: none; z-index: 999999999;">'
                + '<div class="modal-dialog">'
                + '<div class="modal-content">'
                + '<div class="modal-header">'
                + '<h4 class="modal-title" style="color: black;">' + title + '</h4>'
                + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button></div>'
                + '<div class="modal-body">'
                + '<p>' + message + '</p>'
                + '</div>'
                + '<div class="modal-footer">'
                + '<button class="btn btn-danger waves-effect confirm-ok">Ok</button>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '</div>';

            $('body').append(elemHtml);
            $('#confirm-ok-modal').modal({
                backdrop: 'static',
                keyboard: false
            });

            $('.confirm-ok').unbind().bind('click', function (e) {
                $('#confirm-ok-modal').modal('toggle');

                if (typeof callback != 'undefined') {
                    callback();
                }
            });
        },

        info: function (title, message, callback) {
            $('#confirm-info-modal').remove();

            var elemHtml = '<div id="confirm-info-modal" class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="confirm-info-modal" aria-hidden="true" style="display: none; z-index: 999999999;">'
                + '<div class="modal-dialog modal-md">'
                + '<div class="modal-content">'
                + '<div class="modal-header">'
                + '<h4 class="modal-title" style="color: black;">' + title + '</h4> '
                + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button></div>'
                + '<div class="modal-body">'
                + '<h2>' + message + '</h2>'
                + '</div>'
                + '<div class="modal-footer">'
                + '<button class="btn btn-danger waves-effect confirm-info">Ok</button>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '</div>';

            $('body').append(elemHtml);
            $('#confirm-info-modal').modal({
                backdrop: 'static',
                keyboard: false
            });

            $('.confirm-info').unbind().bind('click', function (e) {
                $('#confirm-info-modal').modal('toggle');

                if (typeof callback != 'undefined') {
                    callback();
                }
            });
        },

        show: function (title, message, callback) {
            $('#confirm-modal').remove();

            var elemHtml = '<div id="confirm-modal" class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true" style="display: none; z-index: 999999999;">'
                + '<div class="modal-dialog">'
                + '<div class="modal-content">'
                + '<div class="modal-header">'
                + '<h4 class="modal-title" style="color: black;">' + title + '</h4><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'
                + '</div>'
                + '<div class="modal-body">'
                + '<p>' + message + '</p>'
                + '</div>'
                + '<div class="modal-footer">'
                + '<button class="btn btn-default waves-effect" data-dismiss="modal">No</button>'
                + '<button class="btn btn-danger waves-effect confirm-yes">Yes</button>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '</div>';

            $('body').append(elemHtml);
            $('#confirm-modal').modal({
                backdrop: 'static',
                keyboard: false
            });

            $('.confirm-yes').unbind().bind('click', function (e) {
                $('.confirm-yes').attr('disabled', 'disabled');
                $('#confirm-modal').modal('toggle');

                if (typeof callback != 'undefined') {
                    callback();
                }
            });
        },

        hide: function () {
            $('#confirm-modal, #confirm-ok-modal, #confirm-error-modal').modal('hide');
        },

        error: function (title, message) {
            var elemHtml = '<div id="confirm-error-modal" class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true" style="display: none; z-index: 999999999;">'
                + '<div class="modal-dialog">'
                + '<div class="modal-content">'
                + '<div class="modal-header alert alert-danger">'
                + '<h4 class="modal-title" style="color: black;">' + title + '</h4><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'
                + ' </div>'
                + '<div class="modal-body">'
                + '<p>' + message + '</p>'
                + '</div>'
                + '<div class="modal-footer">'
                + '<button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Ok</button>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '</div>';

            $('body').append(elemHtml);
            $('#confirm-error-modal').modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    },

    format: {
        number: {
            withComma: function (n) {
                n = parseFloat(n);
                var value = n.toLocaleString(
                    undefined, // use a string like 'en-US' to override browser locale
                    { minimumFractionDigits: 0 }
                );
                return value;
            },

            removeComma: function (n) {
                return n.replace(/,/g, '');
            },

            convertToTrailingZero: function (n) {
                var value = '';
                for (i = 0; i < n.length; i++) {
                    value += '0';
                }

                return value;
            }
        }
    },

    scroll: {
        toTop: function () {
            $(document).scrollTop(0);
        }
    },
};

$(function () {
    Helper.init();
});