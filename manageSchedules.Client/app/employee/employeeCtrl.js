(function () {
    'use strict';

    angular
        .module('app')
        .controller("employeeCtrl", ["$http", function($http) {

            var vm = this;
            vm.showFormMsg = false;
            vm.showFormMsg = "";
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

            function addEmployee() {

                vm.showFormMsg = false;
                var empName = vm.emp.name;
                var empHireDate = vm.emp.hiredate;
                var empShifts = vm.emp.shifts;

                //write to database
                var db = openDatabase('mainDB', '1.0', 'application main database', 2 * 1024 * 1024);
                console.log('employee object: ', vm.emp);
                console.log('employee name: ', vm.emp.name);
                console.log('employee hiredate: ', vm.emp.hiredate);
                console.log('employee shifts: ', vm.emp.shifts);
                db.transaction(function (tx) {
                    tx.executeSql('INSERT INTO employee (name, hiredate, shifts) VALUES (?,?,?)',
                        [empName, empHireDate, empShifts],
                        function(tx, results) {
                            vm.emp.id = results.insertId;
                            console.log('new employee id: ', vm.emp.id);
                        });
                });

                //update user messaging
                vm.formMsg = "Successfully Added Employee!";
                vm.showFormMsg = true;

                //push to employee array
                vm.employee.push(vm.emp);

                //reset form object
                vm.emp = {};
            }

            function loadEmployee(empId) {
                //read from database
                var db = openDatabase('mainDB', '1.0', 'application main database', 2 * 1024 * 1024);
                db.transaction(function (tx) {
                    tx.executeSql('SELECT * FROM employee WHERE ?', [empId], function(tx, results) {
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