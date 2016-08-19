(function () {
    'use strict';

    angular
        .module('app')
        .controller('scheduleCtrl', scheduleCtrl);

    //scheduleCtrl.$inject[];

    function scheduleCtrl() {
        var vm = this;

        //shift key
        // 0 = not available
        // 1 = AM available
        // 2 = PM available
        // 3 = Either available
        // 4 = Double available

        vm.employeeObj = [
            {
                'id': 1,
                'name': 'Tim Tester',
                'ttlShifts': 5,
                'shifts': { 'Sunday': { 'AM': 0, 'PM': 0 }, 'Monday': { 'AM': 0, 'PM': 0 }, 'Tuesday': { 'AM': 0, 'PM': 0 }, 'Wednesday': { 'AM': 0, 'PM': 0 }, 'Thursday': { 'AM': 0, 'PM': 0 }, 'Friday': { 'AM': 0, 'PM': 0 }, 'Saturday': { 'AM': 0, 'PM': 0 } }
            }
        ];
    }

})();