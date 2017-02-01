'use strict';

angular.module('app.view2', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'views/view2.html',
            controller: 'view2Ctrl',
            controllerAs:'vm'
        });
    }])

    .controller('view2Ctrl', view2Ctrl);

function view2Ctrl ($http){
    console.log('view 2 Ctrl')

}