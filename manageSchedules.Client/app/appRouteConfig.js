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
            });

        $urlRouterProvider.otherwise('/');
    }

})();