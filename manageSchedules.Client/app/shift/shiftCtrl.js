(function () {
    'use strict';

    angular
        .module('app')
        .controller("shiftCtrl", ["$http", function($http) {

            var vm = this;

            vm.shifts = {};

            vm.uploadShifts = uploadShifts;

            activate();

            function activate() {
                uploadShifts();
            }

            function uploadShifts() {
                $http.get('resources/shifts.json')
                    .success(function (data) {
                        vm.shifts = data;
                    })
                    .error(function () { console.log('ERROR LOADING') });
            }

        }]);
})();