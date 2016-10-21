(function () {
    'use strict';

    angular
        .module('app')
        .controller('mainCtrl', mainCtrl);

    //mainCtrl.$inject[];

    function mainCtrl() {
        var vm = this;

        vm.showLoadingBar = false;
        vm.headerMsg = "";

        vm.createDb = createDb;
        vm.getDatabaseTableNames = getDatabaseTableNames;

        function createDb() {
            //
            vm.headerMsg = "Creating Database ...";
            vm.showLoadingBar = true;

            //
            var db = openDatabase("mainDB", "1.0", "application main database", 2 * 1024 * 1024);
            db.transaction(function(tx) {
                //create employee table
                tx.executeSql("CREATE TABLE IF NOT EXISTS employee (empid INTEGER PRIMARY KEY NOT NULL, name TEXT, hiredate TEXT, shifts INTEGER)", []);
                //populate employee table with defaults
            });

            db.transaction(function(tx) {
                //create shift table
                tx.executeSql("CREATE TABLE IF NOT EXISTS shift (shiftid INTEGER PRIMARY KEY NOT NULL, name TEXT, day INTEGER, segment INTEGER, createdate TEXT, order INTEGER)", []);
                //populate shift table with defaults
            });


            console.log("successfull created database and tables");
            vm.showLoadingBar = false;

            getDatabaseTableNames();
        }

        function getDatabaseTableNames() {
            var db = openDatabase("mainDB", "1.0", "application main database", 2 * 1024 * 1024);
            db.transaction(function (tx) {
                tx.executeSql("SELECT tbl_name, sql from sqlite_master WHERE type = 'table'", [],
                    function (tx, results) {
                        if (results.rows.length > 0) {
                            console.log(results.rows.item(0));
                    }
                });
            });
        }
    }

})();