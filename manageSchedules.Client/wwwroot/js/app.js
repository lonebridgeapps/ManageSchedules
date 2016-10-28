(function() {
    "use strict";

    angular.module("app", ["templates-main", "ui.router", "ngStorage", "ui.sortable", "nvd3"]);

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
        .controller("employeeCtrl", ["$http", "$q", function($http, $q) {

            var vm = this;
            vm.showFormMsg = false;
            vm.formMsg = "";

            vm.showListMsg = true;
            vm.listMsg = "Loading Employees";

            vm.showShifts = false;

            vm.empCount = 0;

            vm.emp = {};
            vm.employee = [];

            vm.massSelection = "Select All";
            vm.emp.availableShift = [];

            activate();

            vm.saveEmployee = saveEmployee;
            vm.loadEmployee = loadEmployee;
            vm.updateEmployee = updateEmployee;
            vm.deleteEmployee = deleteEmployee;
            vm.toggleShift = toggleShift;
            vm.toggleAllShifts = toggleAllShifts;
            vm.resetForm = resetForm;

            function activate() {
                getAllEmployees();
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

            //shifts
            function getAllShifts() {
                vm.shifts = [];
                //read from database
                getData("SELECT * FROM shift", [])
                    .then(function (shiftObj) {
                        if (shiftObj.length > 0) {
                            for (var i = 0; i < shiftObj.length; i++) {
                                vm.shifts.push(shiftObj.item(i));
                            }
                        }
                        else {
                            vm.showErrMsg = true;
                            vm.errMsg = "Error Loading Shifts!";
                        }
                    });
            }

            //
            function toggleShift(shiftid) {
                var index = vm.emp.availableShift.indexOf(shiftid);
                if (index >= 0) {
                    vm.emp.availableShift.splice(index, 1);
                }
                else {
                    vm.emp.availableShift.push(shiftid);
                }
            }

            //
            function toggleAllShifts() {
                if (vm.shifts.length == vm.emp.availableShift.length) {
                    vm.massSelection = "Select All";
                    vm.emp.availableShift = [];
                }
                else {
                    vm.massSelection = "Deselect All";
                    for (var i = 0; i < vm.shifts.length; i++) {
                        vm.emp.availableShift.push(vm.shifts[i].shiftid);
                    }
                }
            }

            //reset form
            function resetForm() {
                vm.emp = {};

                vm.showFormMsg = false;
                vm.formMsg = "";

                vm.massSelection = "Select All";
                vm.showShifts = false;
            }

        }]);

})();
(function() {
        'use strict';

        angular
            .module('app')
            .controller('mainCtrl', ["$http", "$q", function($http, $q) {
                var vm = this;

                vm.showLoadingBar = false;
                vm.headerMsg = "";

                vm.dbTables = [];

                vm.createDb = createDb;

                function createDb() {
                    //
                    vm.headerMsg = "Creating Database ...";
                    vm.showLoadingBar = true;

                    //
                    var db = openDatabase("mainDB", "1.0", "application main database", 10 * 1024 * 1024);
                    db.transaction(function(tx) {
                        //create employee table
                        tx.executeSql("CREATE TABLE IF NOT EXISTS employee (empid INTEGER PRIMARY KEY NOT NULL, name TEXT, hiredate TEXT, shifts INTEGER)", []);
                        //populate employee table with defaults
                        uploadEmployeeJson()
                            .then(function (empList) {
                                db.transaction(function(tx) {
                                    for (var i = 0; i < empList.data.length; i++) {
                                        var empName = empList.data[i].name;
                                        var empHiredate = empList.data[i].hiredate;
                                        var empShifts = empList.data[i].shifts;
                                        tx.executeSql("INSERT INTO employee (name, hiredate, shifts) VALUES (?,?,?)",
                                            [empName, empHiredate, empShifts],
                                            function(tx, results) {
                                                var insertId = results.insertId;
                                            });
                                    }
                                });
                            });
                    });

                    db.transaction(function(tx) {
                        //create shift table
                        tx.executeSql("CREATE TABLE IF NOT EXISTS shift (shiftid INTEGER PRIMARY KEY NOT NULL, name TEXT, dayid INTEGER, segment INTEGER, staff INTEGER, priority INTEGER)", []);
                        //populate shift table with defaults
                        uploadShiftJson()
                            .then(function (shiftList) {
                                db.transaction(function (tx) {
                                    for (var i = 0; i < shiftList.data.length; i++) {
                                        var shiftName = shiftList.data[i].name;
                                        var shiftDay = shiftList.data[i].day;
                                        var shiftSegment = shiftList.data[i].segment;
                                        var shiftStaffing = shiftList.data[i].staffing;
                                        var shiftPriority = shiftList.data[i].order;
                                        tx.executeSql("INSERT INTO shift (name, dayid, segment, staff, priority) VALUES (?,?,?,?,?)",
                                            [shiftName, shiftDay, shiftSegment, shiftStaffing, shiftPriority],
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

            }]);

})();
(function () {
    'use strict';

    angular
        .module('app')
        .controller('scheduleCtrl',
        [
            '$http', function($http) {
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
                    { 'Sat': { 'AM': 0, 'PM': 0 } }
                ];


                vm.employeeObj = [];

                getSampleData();

                vm.getStatusColor = getStatusColor;
                vm.getStatusIcon = getStatusIcon;
                vm.updSchedule = updSchedule;

                function getSampleData() {
                    $http.get('resources/sampleData.json')
                        .success(function(data) {
                            vm.employeeObj = data;
                            console.log(data);
                        })
                        .error(function() { console.log('ERROR LOADING') });
                }

                function getStatusColor(p, i, e) {
                    var status = vm.employeeObj[p].day[i].shift[e].status;
                    switch (status) {
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
                    if (status == 1 || status == 3) {
                        vm.employeeObj[p].day[i].shift[e].status = 2
                    } else if (status == 2) {
                        vm.employeeObj[p].day[i].shift[e].status = 1
                    }

                    //update button state
                    getStatusColor(p, i, e);
                    getStatusIcon(p, i, e);

                    //update daily shift totals

                    //push change to employee schedule object

                }

                //
                vm.chartOptions = {
                    chart: {
                        type: 'multiBarChart',
                        height: 200,
                        margin: {
                            top: 20,
                            right: 20,
                            bottom: 60,
                            left: 60
                        },
                        x: function(d) { return d.label; },
                        y: function(d) { return d.value; },
                        showValues: true,
                        showControls: false,
                        valueFormat: function (d) {
                            return d3.format(',.0f')(d);
                        },
                        transitionDuration: 500,
                        xAxis: {
                            axisLabel: 'Shifts'
                        },
                        yAxis: {
                            axisLabel: 'Number Staffed',
                            axisLabelDistance: 30
                        }
                    }
                };

                //
                vm.chartDataAM = [{
                        "key": "Shift Scheduled",
                        "color": "#1f77b4",
                        "values": [
                            { "label": "Sun", "value": 3 },
                            { "label": "Mon", "value": 1 },
                            { "label": "Tue", "value": 2 },
                            { "label": "Wed", "value": 4 },
                            { "label": "Thu", "value": 6 },
                            { "label": "Fri", "value": 9 },
                            { "label": "Sat", "value": 9 }
                        ]},
                    {
                        "key": "Shift Requirements",
                        "color": "#d62728",
                        "values": [
                            { "label": "Sun", "value": 7 },
                            { "label": "Mon", "value": 3 },
                            { "label": "Tue", "value": 4 },
                            { "label": "Wed", "value": 5 },
                            { "label": "Thu", "value": 6 },
                            { "label": "Fri", "value": 10 },
                            { "label": "Sat", "value": 11 }
                        ]
                    }];

                //
                vm.chartDataPM = [{
                    "key": "Shift Scheduled",
                    "color": "#1f77b4",
                    "values": [
                        { "label": "Sun", "value": 3 },
                        { "label": "Mon", "value": 1 },
                        { "label": "Tue", "value": 2 },
                        { "label": "Wed", "value": 4 },
                        { "label": "Thu", "value": 6 },
                        { "label": "Fri", "value": 9 },
                        { "label": "Sat", "value": 9 }
                    ]
                },
                    {
                        "key": "Shift Requirements",
                        "color": "#d62728",
                        "values": [
                            { "label": "Sun", "value": 7 },
                            { "label": "Mon", "value": 3 },
                            { "label": "Tue", "value": 4 },
                            { "label": "Wed", "value": 5 },
                            { "label": "Thu", "value": 6 },
                            { "label": "Fri", "value": 10 },
                            { "label": "Sat", "value": 11 }
                        ]
                    }];

            }
        ]);

})();
(function() {
    "use strict";

    angular.module("app")
        .factory("mainService", function($http, $q) {

        return {
            getData: function(query, params) {
                var deferred = $q.defer();
                var db = openDatabase('mainDB', '1.0', 'application main database', 10 * 1024 * 1024);
                db.transaction(function (tx) {
                    tx.executeSql(query, params,
                        function (tx, results) {
                            deferred.resolve(results.rows);
                        });
                });
                return deferred.promise;
            },

            postData: function(query, params) {
                var deferred = $q.defer();
                var db = openDatabase('mainDB', '1.0', 'application main database', 2 * 1024 * 1024);
                db.transaction(function (tx) {
                    tx.executeSql(query, params,
                        function (tx, results) {
                            deferred.resolve(results.insertId);
                        });
                });
                return deferred.promise;
            },

            putData: function(query, params) {
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
        }
    });

});
(function () {
    'use strict';

    angular
        .module('app')
        .controller("shiftCtrl", ["$http", "$q", "$scope", function($http, $q, $scope) {

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
                getData("SELECT * FROM shift ORDER BY priority", [])
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
                    console.log("UPDATE");
                },
                stop: function (e, ui) {
                    // this callback has the changed model
                    console.log("STOP!" + " | shifts:" + vm.shifts.name);
                }
            };
        }]);
})();