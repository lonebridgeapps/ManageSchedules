(function () {
    'use strict';

    angular
        .module('app')
        .controller("shiftCtrl", ["$http", "$q", function($http, $q) {

            var vm = this;
            var sortingLog = [];

            vm.shift = {};
            vm.shifts = [];

            vm.showListMsg = true;
            vm.listMsg = "";

            vm.addShift = addShift;
            vm.getAllShifts = getAllShifts;

            activate();

            function activate() {
                getAllShifts();
            }

            function getData(query, params) {
                var deferred = $q.defer();
                var db = openDatabase('mainDB', '1.0', 'application main database', 10 * 1024 * 1024);
                db.transaction(function (tx) {
                    tx.executeSql(query, params,
                        function (tx, results) {
                            deferred.resolve(results.rows);
                        });
                });
                return deferred.promise;
            }

            function addShift() {

                vm.showFormMsg = false;
                var shiftName = vm.shift.name;
                var shiftDay = vm.shift.day;
                var shiftSegment = vm.shift.segment;
                var shiftStaffing = vm.shift.staffing;
                var shiftOrder = vm.shift.order;

                //write to database
                var db = openDatabase('mainDB', '1.0', 'application main database', 10 * 1024 * 1024);
                db.transaction(function (tx) {
                    tx.executeSql("SELECT name, staffing, proirity FROM shifts)",
                        [shiftName, shiftDay, shiftSegment, shiftStaffing, shiftOrder],
                        function (tx, results) {
                            vm.shift.id = results.insertId;
                        });
                });

                //update user messaging
                vm.formMsg = "Successfully Added Shift!";
                vm.showFormMsg = true;

                //push to employee array
                vm.shifts.push(vm.shift);

                //reset form object
                vm.shift = {};
            }

            function getAllShifts() {
                vm.showListMsg = true;
                vm.listMsg = "Loading shifts...";

                vm.shifts = [];
                //read from database
                getData("SELECT * FROM shift", [])
                    .then(function (shiftObj) {
                        console.log(shiftObj);
                        if (shiftObj.length > 0) {
                            for (var i = 0; i < shiftObj.length; i++) {
                                vm.shifts.push(shiftObj.item(i));
                            }
                            vm.showListMsg = false;
                        }
                        else {
                            vm.listMsg = "Error Loading Shifts!";
                        }
                    });
            }


            vm.sortableOptions = {
                update: function (e, ui) {
                    var logEntry = vm.shifts.map(function (i) {
                        return i.value;
                    }).join(', ');
                    sortingLog.push('Update: ' + logEntry);
                    console.log(sortingLog);
                },
                stop: function (e, ui) {
                    // this callback has the changed model
                    var logEntry = vm.shifts.map(function (i) {
                        return i.value;
                    }).join(', ');
                    sortingLog.push('Stop: ' + logEntry);
                    console.log(sortingLog);
                }
            };
        }]);
})();