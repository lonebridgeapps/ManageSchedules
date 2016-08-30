(function() {
    'use strict';

    angular.module('app', ['templates-main', 'ui.router', 'ngStorage']);

})();
(function() {
    'use strict';

    angular
        .module('app')
        .config(configRoutes);

    configRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configRoutes($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('main',
            {
                url: '/',
                templateUrl: '../app/main/main.html',
                controller: 'mainCtrl',
                controllerAs:'vm'
            })

            .state('main.schedule',
            {
                url: '/schedule',
                templateUrl: '../app/schedule/schedule.html',
                controller: 'scheduleCtrl',
                controllerAs: 'vm'
            });

        $urlRouterProvider.otherwise('/');
    }

})();
(function () {
    'use strict';

    angular
        .module('app')
        .controller('mainCtrl', mainCtrl);

    //mainCtrl.$inject[];

    function mainCtrl() {
        var vm = this;
    }

})();
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
                'schedule': { 'Sun': { 'AM': 0, 'PM': 0 }, 'Mon': { 'AM': 0, 'PM': 0 }, 'Tue': { 'AM': 0, 'PM': 0 }, 'Wed': { 'AM': 0, 'PM': 0 }, 'Thu': { 'AM': 0, 'PM': 0 }, 'Fri': { 'AM': 0, 'PM': 0 }, 'Sat': { 'AM': 0, 'PM': 0 } }
            }
        ];

        vm.updSchedule = updSchedule;

        function updSchedule(i, val) {
            console.log('employee', vm.employeeObj[i].name);
            console.log('schedule', vm.employeeObj[i].schedule);
        }
    }

})();