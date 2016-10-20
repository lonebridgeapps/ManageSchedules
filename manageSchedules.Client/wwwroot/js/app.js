(function() {
    'use strict';

    angular.module('app', ['templates-main', 'ui.router', 'ngStorage']);

})();
(function() {
    'use strict';

    angular
        .module('app')
        .config(configRoutes);

    configRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configRoutes($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('main',
            {
                url: '/',
                templateUrl: '../app/main/main.html',
                controller: 'mainCtrl',
                controllerAs:'vm'
            })

            .state('main.employee',
            {
                url: 'employee',
                templateUrl: '../app/employee/employee.html',
                controller: 'employeeCtrl',
                controllerAs: 'vm'
            })

            .state('main.schedule',
            {
                url: 'schedule',
                templateUrl: '../app/schedule/schedule.html',
                controller: 'scheduleCtrl',
                controllerAs: 'vm'
            })

            .state('main.shift',
            {
                url: 'shift',
                templateUrl: '../app/shift/shift.html',
                controller: 'shiftCtrl',
                controllerAs: 'vm'
            });

        $urlRouterProvider.otherwise('/');
    }

})();
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
(function () {
    'use strict';

    angular
        .module('app')
        .controller('mainCtrl', mainCtrl);

    //mainCtrl.$inject[];

    function mainCtrl() {
        var vm = this;

        vm.showLoadingBar = false;
        vm.headerMsg = "";

        vm.createDb = createDb;

        function createDb() {
            //
            vm.headerMsg = "Creating Database ...";
            vm.showLoadingBar = true;

            //
            var db = openDatabase("mainDB", "1.0", "application main database", 2 * 1024 * 1024);
            db.transaction(function(tx) {
                //create employee table
                tx.executeSql("CREATE TABLE IF NOT EXISTS employee (empid INTEGER PRIMARY KEY, name TEXT, hiredate TEXT, shifts INTEGER)", []);
                //populate employee table with defaults
            });

            db.transaction(function(tx) {
                //create shift table
                tx.executeSql("CREATE TABLE IF NOT EXISTS shift (shiftid INTEGER PRIMARY KEY, name TEXT, day INTEGER, segment INTEGER, createdate TEXT, order INTEGER)", []);
                //populate shift table with defaults
            });


            console.log("successfull created database and tables");
            vm.showLoadingBar = false;
        }
    }

})();
(function () {
    'use strict';

    angular
        .module('app')
        .controller('scheduleCtrl', ['$http', function($http) {
        var vm = this;

        //shift key
        // 0 = not available
        // 1 = available
        // 2 = scheduled
        // 3 = requested off

        vm.shifts = [
            { 'Sun': { 'AM': 0, 'PM': 0 } },
            { 'Mon': { 'AM': 0, 'PM': 0 } },
            { 'Tue': { 'AM': 0, 'PM': 0 } },
            { 'Wed': { 'AM': 0, 'PM': 0 } },
            { 'Thu': { 'AM': 0, 'PM': 0 } },
            { 'Fri': { 'AM': 0, 'PM': 0 } },
            { 'Sat': { 'AM': 0, 'PM': 0 } }];


        vm.employeeObj = [];

        getSampleData();

        vm.getStatusColor = getStatusColor;
        vm.getStatusIcon = getStatusIcon;
        vm.updSchedule = updSchedule;

        function getSampleData() {
            $http.get('resources/sampleData.json')
                .success(function (data) {
                    vm.employeeObj = data;
                    console.log(data);
                })
                .error(function () { console.log('ERROR LOADING') });
        }

        function getStatusColor(p, i, e) {
            var status = vm.employeeObj[p].day[i].shift[e].status;
            switch (status){
                case 0:
                    return 'btn-disabled';
                    break;
                case 1:   
                    return 'btn-default';
                    break;
                case 2:
                    return 'btn-scheduled';
                    break;
                case 3:
                    return 'btn-requestOff';
                    break;
                default:
                    return 'btn-default';
            }
        }

        function getStatusIcon(p, i, e) {
            var status = vm.employeeObj[p].day[i].shift[e].status;
            switch (status) {
                case 0:
                    return 'fa-times';
                    break;
                case 1:
                    return 'fa-plus-circle';
                    break;
                case 2:
                    return 'fa-minus-circle';
                    break;
                case 3:
                    return 'fa-plus-circle';
                    break;
                default:
                    return 'fa-plus-circle';
            }
        }

        function updSchedule(p, i, e) {
            console.log('employee', vm.employeeObj[p].name);
            console.log('day', vm.employeeObj[p].day[i].name);
            console.log('shift', vm.employeeObj[p].day[i].shift[e].name);

            //set status vallue to determine action
            var status = vm.employeeObj[p].day[i].shift[e].status;
            if (status == 1 || status == 3)
            { vm.employeeObj[p].day[i].shift[e].status = 2}
            else if (status == 2)
            { vm.employeeObj[p].day[i].shift[e].status = 1 }

            //update button state
            getStatusColor(p, i, e);
            getStatusIcon(p, i, e);

            //update daily shift totals

            //push change to employee schedule object

        }
    }])

})();
(function () {
    'use strict';

    angular
        .module('app')
        .controller("shiftCtrl", ["$http", function($http) {
        var vm = this;

    }]);

})();