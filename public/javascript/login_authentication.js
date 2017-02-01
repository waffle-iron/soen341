var myApp = angular.module("formApp",[]);

myApp.controller("mainController", function(){
    var vm = this;
    vm.submit = function(givenName, givenPass) {
        var username = givenName;
        var password = givenPass;
        console.log("hi");
        if(username == 'admin' && password == 'admin'){
            alert('Information valid');
        }
        else{
            alert('Incorrect information');
        }
    };
})
