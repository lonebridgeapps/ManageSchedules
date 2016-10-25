(function() {
        'use strict';

        angular
            .module('app')
            .controller('mainCtrl', ["$http", "$q", function($http, $q) {
                var vm = this;

                vm.showLoadingBar = false;
                vm.headerMsg = "";

                vm.dbTables = [];

                vm.createDb = createDb;

                function createDb() {
                    //
                    vm.headerMsg = "Creating Database ...";
                    vm.showLoadingBar = true;

                    //
                    var db = openDatabase("mainDB", "1.0", "application main database", 10 * 1024 * 1024);
                    db.transaction(function(tx) {
                        //create employee table
                        tx.executeSql("CREATE TABLE IF NOT EXISTS employee (empid INTEGER PRIMARY KEY NOT NULL, name TEXT, hiredate TEXT, shifts INTEGER)", []);
                        //populate employee table with defaults
                        uploadEmployeeJson()
                            .then(function (empList) {
                                db.transaction(function(tx) {
                                    for (var i = 0; i < empList.data.length; i++) {
                                        var empName = empList.data[i].name;
                                        var empHiredate = empList.data[i].hiredate;
                                        var empShifts = empList.data[i].shifts;
                                        tx.executeSql("INSERT INTO employee (name, hiredate, shifts) VALUES (?,?,?)",
                                            [empName, empHiredate, empShifts],
                                            function(tx, results) {
                                                var insertId = results.insertId;
                                            });
                                    }
                                });
                            });
                    });

                    db.transaction(function(tx) {
                        //create shift table
                        tx.executeSql("CREATE TABLE IF NOT EXISTS shift (shiftid INTEGER PRIMARY KEY NOT NULL, name TEXT, dayid INTEGER, segment INTEGER, staff INTEGER, priority INTEGER)", []);
                        //populate shift table with defaults
                        uploadShiftJson()
                            .then(function (shiftList) {
                                db.transaction(function (tx) {
                                    for (var i = 0; i < shiftList.data.length; i++) {
                                        var shiftName = shiftList.data[i].name;
                                        var shiftDay = shiftList.data[i].day;
                                        var shiftSegment = shiftList.data[i].segment;
                                        var shiftStaffing = shiftList.data[i].staffing;
                                        var shiftPriority = shiftList.data[i].order;
                                        tx.executeSql("INSERT INTO shift (name, dayid, segment, staff, priority) VALUES (?,?,?,?,?)",
                                            [shiftName, shiftDay, shiftSegment, shiftStaffing, shiftPriority],
                                            function(tx, results) {
                                                var insertId = results.insertId;
                                            });
                                    }
                                });
                            });
                    });

                    db.transaction(function(tx) {
                        //create shift table
                        tx.executeSql("CREATE TABLE IF NOT EXISTS schedule (empid INTEGER, shiftid INTEGER, status INTEGER)", []);
                        //populate shift table with defaults
                    });

                    console.log("successfull created database and tables");
                    vm.showLoadingBar = false;
                }


                //employees
                function uploadEmployeeJson() {
                    return $http.get("resources/employees.json");
                }

                //shifts
                function uploadShiftJson() {
                    return $http.get('resources/shifts.json');
                }

            }]);

})();