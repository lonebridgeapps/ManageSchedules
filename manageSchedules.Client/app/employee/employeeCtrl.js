(function () {
    'use strict';

    angular
        .module('app')
        .controller("employeeCtrl", ["$http", "$q", function($http, $q) {

            var vm = this;
            vm.showFormMsg = false;
            vm.formMsg = "";
            vm.emp = {};
            vm.employee = [];

            activate();

            vm.addEmployee = addEmployee;
            vm.loadEmployee = loadEmployee;
            vm.updateEmployee = updateEmployee;
            vm.deleteEmployee = deleteEmployee;
            vm.uploadEmployee = uploadEmployee;

            function activate() {
                //getEmployeeData();
            }

            function openLocalDB() {
                var db = openDatabase('mainDB', '1.0', 'application main database', 2 * 1024 * 1024);
            }

            function postEmployee(eName, eDate, eShifts) {
                var deferred = $q.defer();

                var insertId = 0;
                var db = openDatabase('mainDB', '1.0', 'application main database', 2 * 1024 * 1024);
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
                var empName = vm.emp.name;
                var empHireDate = vm.emp.hiredate;
                var empShifts = vm.emp.shifts;

                //write to database
                //var db = openDatabase('mainDB', '1.0', 'application main database', 2 * 1024 * 1024);
                //db.transaction(function (tx) {
                //    tx.executeSql('INSERT INTO employee (name, hiredate, shifts) VALUES (?,?,?)',
                //        [empName, empHireDate, empShifts],
                //        function(tx, results) {
                //            vm.emp.id = results.insertId;
                //        });
                //});

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


                //**********//
                //make promise chains
                //creating race condition and id not added to vm.emp 
                //before pushing to vm.employee array

                ////update user messaging
                //vm.formMsg = "Successfully Added Employee!";
                //vm.showFormMsg = true;

                ////push to employee array
                //console.log("emp record: ", vm.emp);
                //vm.employee.push(vm.emp);

                ////reset form object
                //vm.emp = {};
            }

            function loadEmployee(empId) {
                //read from database
                var db = openDatabase('mainDB', '1.0', 'application main database', 2 * 1024 * 1024);
                db.transaction(function (tx) {
                    tx.executeSql('SELECT * FROM employee WHERE ?', [empId], function(tx, results) {
                        console.log("empid: ", empId);
                        if (results.rows.length > 0) {
                            console.log(results.rows.item(0));
                        }
                    });
                });
            }

            function updateEmployee() {
                
            }

            function deleteEmployee() {

            }

            function uploadEmployee() {
                $http.get('resources/employees.json')
                    .success(function (data) {

                        for (var i = 0; i < data.length; i++) {
                            vm.emp.name = data[i].name;
                            vm.emp.hiredate = data[i].hiredate;
                            vm.emp.shifts = data[i].shifts;
                            addEmployee();
                        }
                    })
                    .error(function () { console.log('ERROR LOADING') });
            }

        }]);

})();