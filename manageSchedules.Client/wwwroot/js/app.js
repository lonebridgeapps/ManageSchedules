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
    }

})();