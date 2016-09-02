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

        vm.shifts = [
            { 'Sun': { 'AM': 0, 'PM': 0 } },
            { 'Mon': { 'AM': 0, 'PM': 0 } },
            { 'Tue': { 'AM': 0, 'PM': 0 } },
            { 'Wed': { 'AM': 0, 'PM': 0 } },
            { 'Thu': { 'AM': 0, 'PM': 0 } },
            { 'Fri': { 'AM': 0, 'PM': 0 } },
            { 'Sat': { 'AM': 0, 'PM': 0 } }];


        vm.employeeObj = [
            {
                'id': 1,
                'name': 'Tim Tester',
                'ttlShifts': 5,
                'schedule': { 'Sun': { 'AM': 0, 'PM': 0 }, 'Mon': { 'AM': 0, 'PM': 0 }, 'Tue': { 'AM': 0, 'PM': 0 }, 'Wed': { 'AM': 0, 'PM': 0 }, 'Thu': { 'AM': 0, 'PM': 0 }, 'Fri': { 'AM': 0, 'PM': 0 }, 'Sat': { 'AM': 0, 'PM': 0 } }
            },
            {
                'id': 2,
                'name': 'Jane Doe',
                'ttlShifts': 6,
                'schedule': { 'Sun': { 'AM': 0, 'PM': 0 }, 'Mon': { 'AM': 0, 'PM': 0 }, 'Tue': { 'AM': 0, 'PM': 0 }, 'Wed': { 'AM': 0, 'PM': 0 }, 'Thu': { 'AM': 0, 'PM': 0 }, 'Fri': { 'AM': 0, 'PM': 0 }, 'Sat': { 'AM': 0, 'PM': 0 } }
            },
            {
                'id': 3,
                'name': 'John Doe',
                'ttlShifts': 5,
                'schedule': { 'Sun': { 'AM': 0, 'PM': 0 }, 'Mon': { 'AM': 0, 'PM': 0 }, 'Tue': { 'AM': 0, 'PM': 0 }, 'Wed': { 'AM': 0, 'PM': 0 }, 'Thu': { 'AM': 0, 'PM': 0 }, 'Fri': { 'AM': 0, 'PM': 0 }, 'Sat': { 'AM': 0, 'PM': 0 } }
            },
        {
            'id': 4,
            'name': 'Seymour Butts',
            'ttlShifts': 3,
            'day': [
                {
                    'id': 0,
                    'name': 'Sun',
                    'shift': [
                        { 'id': 0, 'name': 'AM', 'status': 0 },
                        { 'id': 1, 'name': 'PM', 'status': 0 }
                    ]
                },
                {
                    'id': 1,
                    'name': 'Mon',
                    'shift': [
                        { 'id': 0, 'name': 'AM', 'status': 0 },
                        { 'id': 1, 'name': 'PM', 'status': 0 }
                    ]
                }, {
                    'id': 2,
                    'name': 'Tue',
                    'shift': [
                        { 'id': 0, 'name': 'AM', 'status': 0 },
                        { 'id': 1, 'name': 'PM', 'status': 0 }
                    ]
                }, {
                    'id': 3,
                    'name': 'Wed',
                    'shift': [
                        { 'id': 0, 'name': 'AM', 'status': 0 },
                        { 'id': 1, 'name': 'PM', 'status': 0 }
                    ]
                }, {
                    'id': 4,
                    'name': 'Thu',
                    'shift': [
                        { 'id': 0, 'name': 'AM', 'status': 0 },
                        { 'id': 1, 'name': 'PM', 'status': 0 }
                    ]
                }, {
                    'id': 5,
                    'name': 'Fri',
                    'shift': [
                        { 'id': 0, 'name': 'AM', 'status': 0 },
                        { 'id': 1, 'name': 'PM', 'status': 0 }
                    ]
                }, {
                    'id': 6,
                    'name': 'Sat',
                    'shift': [
                        { 'id': 0, 'name': 'AM', 'status': 0 },
                        { 'id': 1, 'name': 'PM', 'status': 0 }
                    ]
                }]
            }
        ];

        vm.updSchedule = updSchedule;

        function updSchedule(i, emp, day, shift) {
            console.log('employee', vm.employeeObj[i].name);
            console.log('schedule', vm.employeeObj[i].schedule);
        }
    }

})();