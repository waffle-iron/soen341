'use strict';

angular.module('app.view2', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'views/classroom.html',
            controller: 'view2Ctrl',
            controllerAs:'vm'
        });
    }])

    .controller('view2Ctrl', view2Ctrl);

function view2Ctrl ($http){
    var vm = this;
    vm.classroomNum = 2;
}