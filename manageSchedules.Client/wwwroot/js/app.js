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

        vm.employeeObj = [
            {
                'id': 1,
                'name': 'Tim Tester',
                'ttlShifts': 5,
                'shifts': { 'Sunday': { 'AM': 0, 'PM': 0 }, 'Monday': { 'AM': 0, 'PM': 0 }, 'Tuesday': { 'AM': 0, 'PM': 0 }, 'Wednesday': { 'AM': 0, 'PM': 0 }, 'Thursday': { 'AM': 0, 'PM': 0 }, 'Friday': { 'AM': 0, 'PM': 0 }, 'Saturday': { 'AM': 0, 'PM': 0 } }
            },
            {
                'id': 2,
                'name': 'Jane Doe',
                'ttlShifts': 5,
                'shifts': { 'Sunday': { 'AM': 0, 'PM': 0 }, 'Monday': { 'AM': 0, 'PM': 0 }, 'Tuesday': { 'AM': 0, 'PM': 0 }, 'Wednesday': { 'AM': 0, 'PM': 0 }, 'Thursday': { 'AM': 0, 'PM': 0 }, 'Friday': { 'AM': 0, 'PM': 0 }, 'Saturday': { 'AM': 0, 'PM': 0 } }
            },
            {
                'id': 3,
                'name': 'John Doe',
                'ttlShifts': 5,
                'shifts': { 'Sunday': { 'AM': 0, 'PM': 0 }, 'Monday': { 'AM': 0, 'PM': 0 }, 'Tuesday': { 'AM': 0, 'PM': 0 }, 'Wednesday': { 'AM': 0, 'PM': 0 }, 'Thursday': { 'AM': 0, 'PM': 0 }, 'Friday': { 'AM': 0, 'PM': 0 }, 'Saturday': { 'AM': 0, 'PM': 0 } }
            },
            {
                'id': 4,
                'name': 'Seymour Butts',
                'ttlShifts': 5,
                'shifts': { 'Sunday': { 'AM': 0, 'PM': 0 }, 'Monday': { 'AM': 0, 'PM': 0 }, 'Tuesday': { 'AM': 0, 'PM': 0 }, 'Wednesday': { 'AM': 0, 'PM': 0 }, 'Thursday': { 'AM': 0, 'PM': 0 }, 'Friday': { 'AM': 0, 'PM': 0 }, 'Saturday': { 'AM': 0, 'PM': 0 } }
            }
        ];
    }

})();