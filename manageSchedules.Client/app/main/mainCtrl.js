(function () {
    'use strict';

    angular
        .module('app')
        .controller('mainCtrl', mainCtrl);

    //mainCtrl.$inject[];

    function mainCtrl() {
        var vm = this;

        createDb();

        function createDb() {
            var db = openDatabase('mainDB', '1.0', 'application main database', 2 * 1024 * 1024);
            db.transaction(function(tx) {
                tx.executeSql('CREATE TABLE IF NOT EXIST employee (empid INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT, hiredate TEXT, shifts INTEGER)');
                tx.executeSql('CREATE TABLE IF NOT EXIST shifts (shiftid INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT, day INTEGER, segment INTEGER, createdate TEXT)');
                tx.executeSql('CREATE TABLE IF NOT EXIST shiftOrder (shiftid INTEGER, order INTEGER)');
            });
            console.log('successfull created database and tables');
        }
    }

})();