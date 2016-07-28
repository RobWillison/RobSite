function sendContactForm() {
    var email = $("#email-field").val();
    var message = $("#message-field").val();

    if (!checkEmail(email)) {
        $("#email-field-div").addClass('has-error');
        return;
    }

    $("#email-field-div").removeClass('has-error');


}

function checkEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}