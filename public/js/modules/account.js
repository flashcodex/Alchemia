var Account = { 
    baseUrl: '',

    init: function () {
        var self = this;

        let url = window.location.origin;
        url = url.includes("localhost") ? window.location.origin + "/public/" : 'https://pamantasanalchemia.com/public/';
        self.baseUrl = url;
        
        self.addEvents();
    },

    addEvents: function () {
        var self = this;

        $("#email").keyup(function () {
            var email = $('#email').val();

            if (self.isEmail(email))
            {
                self.api.post.emailExist();
            }
        });
    },

    isEmail: function (email) {
        var self = this;
        
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    },

    api: {
        post: {
            emailExist: function () {
                var self = Account;

                var params = {
                    'email': $('#email').val().trim(),
                };

                $.ajax({
                    url: self.baseUrl + 'api/check-email',
                    method: 'POST',
                    data: params,
                    beforeSend: function () {

                    },
                    success: function (resp) {
                        if (resp.success) 
                        {
                            $('#email-error').html('');
                        }
                        else
                        {
                            $('#email-error').html(resp.message);
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
    Account.init();
})