(function() {
    "use strict";

    angular.module("app").service("mainService", mainService);

    mainService.$inject = ["$http", "$q"];

    function mainService($http, $q) {

        var service = {
            postEmployee: postEmployee
        };

        return service;

        //-------------------------------------------------------------//

        function postEmployee(eName, eDate, eShifts) {
            var deferred = $q.defer();

            var insertId = 0;
            var db = openDatabase('mainDB', '1.0', 'application main database', 2 * 1024 * 1024);
            db.transaction(function (tx) {
                tx.executeSql('INSERT INTO employee (name, hiredate, shifts) VALUES (?,?,?)',
                    [eName, eDate, eShifts],
                    function(tx, results) {
                        insertId = results.insertId;
                        deferred.resolve(insertId);
                    });
            });

            return deferred.promise;

        }
    }
});