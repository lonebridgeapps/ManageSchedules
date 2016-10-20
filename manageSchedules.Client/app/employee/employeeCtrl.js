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

                //write to database
                var db = openDatabase('mainDB', '1.0', 'application main database', 2 * 1024 * 1024);

                db.transaction(function (tx) {
                    tx.executeSql('INSERT INTO employee (name, hiredate, shifts) VALUES (?,?,?)', [vm.emp.name, vm.emp.hiredate, vm.emp.shifts],
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
                        console.log(results);
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
                        //vm.employee = data;
                        //console.log(data[0].name);
                        for (var i = 0; i <= data.length; i++) {
                            vm.emp.name = data[i].name;
                            vm.emp.hiredate = data[i].hiredate;
                            vm.emp.shifts = data[i].shifts;
                            console.log(i);
                            console.log(vm.emp);
                            addEmployee();
                        }
                    })
                    .error(function () { console.log('ERROR LOADING') });
            }

        }]);

})();