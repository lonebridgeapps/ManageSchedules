(function () {
    'use strict';

    angular
        .module('app')
        .controller("shiftCtrl", ["$http", "$scope", function($http, $scope) {

            var vm = this;
            var sortingLog = [];

            vm.shift = {};
            vm.shifts = [];

            vm.addShift = addShift;
            vm.uploadShifts = uploadShifts;

            activate();

            function activate() {

            }

            function uploadShifts() {
                $http.get('resources/shifts.json')
                    .success(function (data) {
                        //vm.shifts = data;
                        console.log(data.length);
                        for (var i = 0; i < data.length; i++) {
                            vm.shift.name = data[i].name;
                            vm.shift.day = data[i].day;
                            vm.shift.segment = data[i].segment;
                            vm.shift.staffing = data[i].staffing;
                            vm.shift.order = data[i].order;
                            console.log(i);
                            addShift();
                        }
                    })
                    .error(function () { console.log('ERROR LOADING') });
            }

            function addShift() {

                vm.showFormMsg = false;
                var shiftName = vm.shift.name;
                var shiftDay = vm.shift.day;
                var shiftSegment = vm.shift.segment;
                var shiftStaffing = vm.shift.staffing;
                var shiftOrder = vm.shift.order;

                //write to database
                var db = openDatabase('mainDB', '1.0', 'application main database', 2 * 1024 * 1024);
                db.transaction(function (tx) {
                    tx.executeSql('INSERT INTO shifts (name, day, segment, staffing, order) VALUES (?,?,?,?,?)',
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