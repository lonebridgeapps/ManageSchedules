(function() {
    "use strict";

    angular.module("app")
        .factory("mainService", function($http, $q) {

        return {
            getData: function(query, params) {
                var deferred = $q.defer();
                var db = openDatabase('mainDB', '1.0', 'application main database', 10 * 1024 * 1024);
                db.transaction(function (tx) {
                    tx.executeSql(query, params,
                        function (tx, results) {
                            deferred.resolve(results.rows);
                        });
                });
                return deferred.promise;
            },

            postData: function(query, params) {
                var deferred = $q.defer();
                var db = openDatabase('mainDB', '1.0', 'application main database', 2 * 1024 * 1024);
                db.transaction(function (tx) {
                    tx.executeSql(query, params,
                        function (tx, results) {
                            deferred.resolve(results.insertId);
                        });
                });
                return deferred.promise;
            },

            putData: function(query, params) {
                var deferred = $q.defer();
                var db = openDatabase('mainDB', '1.0', 'application main database', 2 * 1024 * 1024);
                db.transaction(function (tx) {
                    tx.executeSql(query, params,
                        function (tx, results) {
                            deferred.resolve(results.rowsAffected);
                        });
                });
                return deferred.promise;
            }    
        }
    });

});