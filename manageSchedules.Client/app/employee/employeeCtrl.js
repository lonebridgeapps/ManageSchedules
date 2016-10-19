(function () {
    'use strict';

    angular
        .module('app')
        .controller("employeeCtrl", ["$http", function($http) {

            var vm = this;
            vm.emp = {};
            vm.employee = {};

            activate();

            vm.addEmployee = addEmployee;
            vm.editEmployee = editEmployee;
            vm.deleteEmployee = deleteEmployee;

            function activate() {
                getEmployeeData();
            }

            function openLocalDB() {
                var db = openDatabase('mainDB', '1.0', 'application main database', 2 * 1024 * 1024);
            }

            function getEmployeeData() {
                $http.get('resources/employees.json')
                    .success(function (data) {
                        vm.employee = data;
                        console.log(data);
                    })
                    .error(function () { console.log('ERROR LOADING') });
            }

            function addEmployee() {

                //write to database
                var db = openDatabase('mainDB', '1.0', 'application main database', 2 * 1024 * 1024);
                db.transaction(function (tx) {
                    tx.executeSql('INSERT INTO employee (name, hiredate, shifts) VALUES (?,?,?)', [vm.emp.name, vm.emp.hiredate, vm.emp.shifts]);
                });

                //push to employee array
                vm.employee.push = vm.emp;
                console.log(vm.employee);

                //reset form object
                vm.emp = {};
            }

            function editEmployee() {
                
            }

            function deleteEmployee() {

            }

        }]);

})();