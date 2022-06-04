var Account = {

    init: function () {
        var self = this;
        self.addEvents();
    },



    renderTablePagination: function (data) {
        var self = this;
        $('#table-pagination ul').remove();
        $('#table-pagination').append(data);

        $.each($('#table-pagination	li a'), function (key, val) {
            var id = $(val).html();
            $(val).attr('href', '#');
            $(val).addClass('page-button-' + id + ' pages');
        });

        self.addEvents();
    },

    getSelectedData: function (user_id) {
        var self = this;
        var index = 0;

        $.each(self.lookUpData, function (key, val) {
            if (val.id == user_id) {
                index = key;
            }
        });

        return self.lookUpData[index];
    },

    showErrors: function (errors, prefix) {
        var self = this;

        if (typeof prefix == 'undefined')
            prefix = '';

        $.each(errors, function (key, val) {
            $('#' + prefix + key).parent().addClass('has-error');
            $('#' + prefix + key).next().html(val);
        });
    },

    addEvents: function () {
        var self = this;

        $('#btn-create-account').unbind().bind('click', function (e) {
            e.preventDefault();
            $('#create-account-form')[0].reset();
            $('#create-account-form .help-block').html('');

            $('#new-account-modal > div > div').removeClass('has-error');

            $("#new-account-modal").modal('show');
            if (self.roleId == 2) {
                $('#account-role').val(2);
            }
            else if (self.roleId == 3) {
                $('#account-role').val(3);
            }
            else if (self.roleId == 5) {
                $('#account-role').val(5);
            }
            else if (self.roleId == 1) {
                $('#account-role').val(5);
            }
        });
    },

    api: {
        post: {
            validateEmail: function () {
                var self = Account;

                var params = {
                    'email': $('#email').val().trim(),
                };

                $.ajax({
                    url: baseUrl + '/account/create',
                    method: 'POST',
                    data: params,
                    beforeSend: function () {
                        $("#err-username").html("")
                        $("#err-password").html("")
                        $("#err-confirmpassword").html("")
                        $("#err-nickname").html("")
                        $("#err-contact").html("")
                        $("#err-loadamount").html("")
                        $("#err-email").html("")
                    },
                    success: function (resp) {
                        if (resp.success) {
                            Helper.notify('Success', 'New account was successfully created');
                            $('#create-account-form')[0].reset();
                            $('#create-station-modal').modal('hide');

                            $('#new-account-modal').modal('hide');

                            self.api.get.all(self.page);
                            $("#btn-insert-account").attr('disabled', 'disabled').html('...');
                        }
                    },
                    error: function (resp) {
                        // self.showErrors(resp.responseJSON.errors , 'err-');

                        $("#err-username").html(resp.responseJSON.errors.username)
                        $("#err-password").html(resp.responseJSON.errors.password)
                        $("#err-confirmpassword").html(resp.responseJSON.errors.password_confirmation)
                        $("#err-nickname").html(resp.responseJSON.errors.account_name)
                        $("#err-contact").html(resp.responseJSON.errors.contact_no)
                        $("#err-loadamount").html(resp.responseJSON.errors.load_amount)
                        $("#err-email").html(resp.responseJSON.errors.email)
                    },
                    complete: function () {
                        $("#btn-insert-account").removeAttr('disabled').html('Create');
                    }
                });
            },
        }
    }
}

$(function () {
    Account.init();
})
