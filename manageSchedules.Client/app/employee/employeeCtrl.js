(function () {
    'use strict';

    angular
        .module('app')
        .controller("employeeCtrl", ["$http", "$q", "mainService", function($http, $q, mainService) {

            var vm = this;
            vm.showFormMsg = false;
            vm.formMsg = "";

            vm.showListMsg = true;
            vm.listMsg = "Loading Employees";

            vm.showShifts = false;

            vm.empCount = 0;

            vm.emp = {};
            vm.employee = [];

            activate();

            vm.saveEmployee = saveEmployee;
            vm.loadEmployee = loadEmployee;
            vm.updateEmployee = updateEmployee;
            vm.deleteEmployee = deleteEmployee;
            vm.resetForm = resetForm;

            function activate() {
                getAllEmployees();
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

            function postData(query, params) {
                var deferred = $q.defer();
                var db = openDatabase('mainDB', '1.0', 'application main database', 2 * 1024 * 1024);
                db.transaction(function (tx) {
                    tx.executeSql(query, params,
                        function (tx, results) {
                            deferred.resolve(results.insertId);
                        });
                });
                return deferred.promise;
            }

            function putData(query, params) {
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

            //function used to insert or update based on if employee already exists
            function saveEmployee() {
                vm.showFormMsg = false;

                //check if employee exists
                getData("SELECT empid FROM employee WHERE name = ?", [vm.emp.name])
                    .then(function(empObj) {
                        var empid = 0;
                        if (empObj.length > 0) {
                            //UPDATE
                            empid = empObj.item(0).empid;
                            var updQuery = "UPDATE employee SET name = ?, shifts = ? WHERE empid = ?";
                            var updParam = [vm.emp.name, vm.emp.shifts, empid];

                            putData(updQuery, updParam)
                                .then(function(numRowsAffected) {
                                    vm.formMsg = "Successfully Updated " + vm.emp.name + "!";
                                });
                        } else {
                            //INSERT
                            var insQuery = "INSERT INTO employee (name, hiredate, shifts) VALUES (?,?,?)";
                            var insParam = [vm.emp.name, vm.emp.hiredate, vm.emp.shifts];

                            postData(insQuery, insParam)
                                .then(function(insertId) {
                                    empid = insertId;
                                    vm.formMsg = "Successfully Added " + vm.emp.name + "!";
                                });
                        }

                        return getAllEmployees();
                    })
                    .then(function (empid) {
                        console.log("empid: ", empid);
                        vm.showFormMsg = true;
                        vm.emp = {};
                        //return DELETE  SHIFTS
                    });
                //.then(function(INCLUDING SHIFTS)
                //INSERT SHIFTS

            }


            function loadEmployee(empid) {
                //read from database
                getData("SELECT name, hiredate, shifts FROM employee WHERE empid = ?", [empid])
                    .then(function(empObj) {
                        if (empObj.length > 0) {
                            console.log(empObj.item(0));
                            vm.emp.name = empObj.item(0).name;
                            vm.emp.hiredate = empObj.item(0).hiredate;
                            vm.emp.shifts = empObj.item(0).shifts;
                        }
                    });
            }

            function getAllEmployees() {
                vm.showListMsg = true;
                vm.employee = [];
                //read from database
                getData("SELECT * FROM employee", [])
                    .then(function(employeeObj) {
                        console.log(employeeObj);
                        if (employeeObj.length > 0) {
                            for (var i = 0; i < employeeObj.length; i++) {
                                vm.employee.push(employeeObj.item(i));
                            }
                            vm.showListMsg = false;
                            vm.empCount = employeeObj.length;
                        }
                        else {
                            vm.showListMsg = true;
                            vm.listMsg = "Error Loading Employees!";
                            vm.empCount = 1;
                        }
                    });
            }

            function updateEmployee() {
                
            }

            function deleteEmployee() {

            }

            function resetForm() {
                vm.emp = {};

                vm.showFormMsg = false;
                vm.formMsg = "";
            }

        }]);

})();