/**
 * Created by ericxiao on 2017-02-09.
 */
'use strict';

angular.module('app.classroom', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/class/:classId', {
            templateUrl: 'views/classroom.html',
            controller: 'classCtrl',
            controllerAs:'vm'
        });
    }])

    .controller('classCtrl', classCtrl);

function classCtrl ($http, $routeParams){
    var vm = this;
    vm.classId = $routeParams.classId;
}