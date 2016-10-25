(function () {
    'use strict';

    angular
        .module('app')
        .controller("employeeCtrl", ["$http", "$q", function($http, $q) {

            var vm = this;
            vm.showFormMsg = false;
            vm.formMsg = "";
            vm.noRecords = true;
            vm.empCount = 0;

            vm.emp = {};
            vm.employee = [];

            activate();

            vm.addEmployee = addEmployee;
            vm.loadEmployee = loadEmployee;
            vm.updateEmployee = updateEmployee;
            vm.deleteEmployee = deleteEmployee;

            function activate() {
                getAllEmployees();
            }

            function openLocalDB() {
                var db = openDatabase('mainDB', '1.0', 'application main database', 10 * 1024 * 1024);
            }

            function postEmployee(eName, eDate, eShifts) {
                var deferred = $q.defer();

                var insertId = 0;
                var db = openDatabase('mainDB', '1.0', 'application main database', 10 * 1024 * 1024);
                db.transaction(function (tx) {
                    tx.executeSql('INSERT INTO employee (name, hiredate, shifts) VALUES (?,?,?)',
                        [eName, eDate, eShifts],
                        function (tx, results) {
                            insertId = results.insertId;
                            deferred.resolve(insertId);
                        });
                });

                return deferred.promise;

            }

            function addEmployee() {

                vm.showFormMsg = false;

                //mainService
                postEmployee(vm.emp.name, vm.emp.hiredate, vm.emp.shifts)
                    .then(function (empId) {
                        vm.emp.id = empId;

                        //update user messaging
                        vm.formMsg = "Successfully Added Employee!";
                        vm.showFormMsg = true;

                        //output
                        console.log(vm.emp);

                        //push to employee array
                        vm.employee.push(vm.emp);

                        //reset form object
                        vm.emp = {};
                    });

            }

            function loadEmployee(empId) {
                //read from database
                var db = openDatabase('mainDB', '1.0', 'application main database', 10 * 1024 * 1024);
                db.transaction(function (tx) {
                    tx.executeSql('SELECT * FROM employee WHERE ?', [empId], function(tx, results) {
                        if (results.rows.length > 0) {
                            console.log(results.rows.item(0));
                        }
                    });
                });
            }

            function getAllEmployees() {
                //read from database
                var db = openDatabase('mainDB', '1.0', 'application main database', 10 * 1024 * 1024);
                db.transaction(function (tx) {
                    tx.executeSql("SELECT * FROM employee", [], function (tx, results) {
                        if (results.rows.length > 0) {
                            for (var i = 0; i < results.rows.length; i++) {
                                vm.employee.push(results.rows.item(i));
                            }
                            vm.noRecords = false;
                            vm.empCount = results.rows.length;
                        }
                        else {
                            vm.noRecords = true;
                            vm.empCount = 1;
                        }
                    });
                });
            }

            function updateEmployee() {
                
            }

            function deleteEmployee() {

            }

        }]);

})();