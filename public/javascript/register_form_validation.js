/**
 * Created by mike on 2/12/17.
 */
var validate_email = function(){
    var userEmail = document.getElementById('email');
    var regex = /^[a-zA-Z0-9-_\.]{1,}[@][a-zA-Z0-9-\.]{1,}[.][a-zA-Z]{2,24}$/;
    if (!userEmail.match(regex)){
        //Action to be taken in the case of a wrong email
        $("#loginSubmit").append("<div class="alert alert-warning">
            <strong>Warning!</strong> Indicates a warning that might need attention.
        </div>");
        window.alert("Please enter a valid email!");
    }


}