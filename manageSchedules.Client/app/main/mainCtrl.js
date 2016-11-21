(function() {
        'use strict';

        angular
            .module('app')
            .controller('mainCtrl', ["$http", "$q", "$state", function($http, $q, $state) {
                var vm = this;

                vm.showLoadingBar = false;
                vm.headerMsg = "";

                vm.dbTables = [];

                vm.createDb = createDb;
                vm.isCurrentState = isCurrentState;

                function createDb() {
                    //
                    vm.headerMsg = "Creating Database ...";
                    vm.showLoadingBar = true;

                    //
                    var db = openDatabase("mainDB", "1.0", "application main database", 10 * 1024 * 1024);
                    db.transaction(function(tx) {
                        //create employee table
                        tx.executeSql("CREATE TABLE IF NOT EXISTS employee (empid INTEGER PRIMARY KEY NOT NULL, name TEXT, type INTEGER, email TEXT, hiredate TEXT, shifts INTEGER)", []);
                        //populate employee table with defaults
                        uploadEmployeeJson()
                            .then(function (empList) {
                                db.transaction(function(tx) {
                                    for (var i = 0; i < empList.data.length; i++) {
                                        var empName = empList.data[i].name;
                                        var empType = empList.data[i].type;
                                        var empEmail = empList.data[i].email;
                                        var empHiredate = empList.data[i].hiredate;
                                        var empShifts = empList.data[i].shifts;
                                        tx.executeSql("INSERT INTO employee (name, type, email, hiredate, shifts) VALUES (?,?,?,?,?)",
                                            [empName, empType, empEmail, empHiredate, empShifts],
                                            function(tx, results) {
                                                var insertId = results.insertId;
                                            });
                                    }
                                });
                            });
                    });

                    db.transaction(function(tx) {
                        //create shift table
                        tx.executeSql("CREATE TABLE IF NOT EXISTS shift (shiftid INTEGER PRIMARY KEY NOT NULL, name TEXT, dayid INTEGER, timespan text, hours INTEGER, segment INTEGER, staff INTEGER, priority INTEGER)", []);
                        //populate shift table with defaults
                        uploadShiftJson()
                            .then(function (shiftList) {
                                db.transaction(function (tx) {
                                    for (var i = 0; i < shiftList.data.length; i++) {
                                        var shiftName = shiftList.data[i].name;
                                        var shiftDay = shiftList.data[i].day;
                                        var shiftSegment = shiftList.data[i].segment;
                                        var shiftTimespan = shiftList.data[i].timespan;
                                        var shiftHours = shiftList.data[i].hours;
                                        var shiftStaffing = shiftList.data[i].staffing;
                                        var shiftPriority = shiftList.data[i].order;
                                        tx.executeSql("INSERT INTO shift (name, dayid, segment, timespan, hours, staff, priority) VALUES (?,?,?,?,?,?,?)",
                                            [shiftName, shiftDay, shiftSegment, shiftTimespan, shiftHours, shiftStaffing, shiftPriority],
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
                        uploadScheduleJson()
                        .then(function (scheduleList) {
                            db.transaction(function (tx) {
                                for (var i = 0; i < scheduleList.data.length; i++) {
                                    var empid = scheduleList.data[i].empid;
                                    var shiftid = scheduleList.data[i].shiftid;
                                    tx.executeSql("INSERT INTO schedule (empid, shiftid) VALUES (?,?)",
                                        [empid, shiftid],
                                        function(tx, results) {
                                            var insertId = results.insertId;
                                        });
                                }
                            });
                        });
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

                //scheduled
                function uploadScheduleJson() {
                    return $http.get('resources/schedule.json');
                }

                //
                function isCurrentState(stateName) {
                    return ($state.current.name == stateName) ? true : false;
                }

            }]);

})();