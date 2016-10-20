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

        function createDb() {
            //
            vm.headerMsg = "Creating Database ...";
            vm.showLoadingBar = true;

            //
            var db = openDatabase("mainDB", "1.0", "application main database", 2 * 1024 * 1024);
            db.transaction(function(tx) {
                //create employee table
                tx.executeSql("CREATE TABLE IF NOT EXISTS employee (empid INTEGER PRIMARY KEY, name TEXT, hiredate TEXT, shifts INTEGER)", []);
                //populate employee table with defaults
            });

            db.transaction(function(tx) {
                //create shift table
                tx.executeSql("CREATE TABLE IF NOT EXISTS shift (shiftid INTEGER PRIMARY KEY, name TEXT, day INTEGER, segment INTEGER, createdate TEXT, order INTEGER)", []);
                //populate shift table with defaults
            });


            console.log("successfull created database and tables");
            vm.showLoadingBar = false;
        }
    }

})();