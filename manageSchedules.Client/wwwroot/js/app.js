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
            .controller('mainCtrl', ["$http", "$q", "$state", function($http, $q, $state) {
                var vm = this;

                vm.showLoadingBar = false;
                vm.headerMsg = "";

                vm.dbTables = [];

                vm.createDb = createDb;
                vm.isCurrentState = isCurrentState;

                function createDb() {
                    //
                    vm.headerMsg = "Creating Database ...";
                    vm.showLoadingBar = true;

                    //
                    var db = openDatabase("mainDB", "1.0", "application main database", 10 * 1024 * 1024);
                    db.transaction(function(tx) {
                        //create employee table
                        tx.executeSql("CREATE TABLE IF NOT EXISTS employee (empid INTEGER PRIMARY KEY NOT NULL, name TEXT, type INTEGER, email TEXT, hiredate TEXT, shifts INTEGER)", []);
                        //populate employee table with defaults
                        uploadEmployeeJson()
                            .then(function (empList) {
                                db.transaction(function(tx) {
                                    for (var i = 0; i < empList.data.length; i++) {
                                        var empName = empList.data[i].name;
                                        var empType = empList.data[i].type;
                                        var empEmail = empList.data[i].email;
                                        var empHiredate = empList.data[i].hiredate;
                                        var empShifts = empList.data[i].shifts;
                                        tx.executeSql("INSERT INTO employee (name, type, email, hiredate, shifts) VALUES (?,?,?,?,?)",
                                            [empName, empType, empEmail, empHiredate, empShifts],
                                            function(tx, results) {
                                                var insertId = results.insertId;
                                            });
                                    }
                                });
                            });
                    });

                    db.transaction(function(tx) {
                        //create shift table
                        tx.executeSql("CREATE TABLE IF NOT EXISTS shift (shiftid INTEGER PRIMARY KEY NOT NULL, name TEXT, dayid INTEGER, timespan text, hours INTEGER, segment INTEGER, staff INTEGER, priority INTEGER)", []);
                        //populate shift table with defaults
                        uploadShiftJson()
                            .then(function (shiftList) {
                                db.transaction(function (tx) {
                                    for (var i = 0; i < shiftList.data.length; i++) {
                                        var shiftName = shiftList.data[i].name;
                                        var shiftDay = shiftList.data[i].day;
                                        var shiftSegment = shiftList.data[i].segment;
                                        var shiftTimespan = shiftList.data[i].timespan;
                                        var shiftHours = shiftList.data[i].hours;
                                        var shiftStaffing = shiftList.data[i].staffing;
                                        var shiftPriority = shiftList.data[i].order;
                                        tx.executeSql("INSERT INTO shift (name, dayid, segment, timespan, hours, staff, priority) VALUES (?,?,?,?,?,?,?)",
                                            [shiftName, shiftDay, shiftSegment, shiftTimespan, shiftHours, shiftStaffing, shiftPriority],
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
                        uploadScheduleJson()
                        .then(function (scheduleList) {
                            db.transaction(function (tx) {
                                for (var i = 0; i < scheduleList.data.length; i++) {
                                    var empid = scheduleList.data[i].empid;
                                    var shiftid = scheduleList.data[i].shiftid;
                                    tx.executeSql("INSERT INTO schedule (empid, shiftid) VALUES (?,?)",
                                        [empid, shiftid],
                                        function(tx, results) {
                                            var insertId = results.insertId;
                                        });
                                }
                            });
                        });
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

                //scheduled
                function uploadScheduleJson() {
                    return $http.get('resources/schedule.json');
                }

                //
                function isCurrentState(stateName) {
                    return ($state.current.name == stateName) ? true : false;
                }

            }]);

})();
(function () {
    'use strict';

    angular
        .module('app')
        .controller('scheduleCtrl', ['$http', '$q', '$filter', function($http, $q, $filter) {
                var vm = this;

                vm.showStaffStats = false;
                vm.showEmployeeDetails = false;

                vm.days = [0,1,2,3,4,5,6];
                vm.employeeObj = [];
                vm.employee = [];
                vm.employeeDetail = [];

                activate();

                vm.getStatusIcon = getStatusIcon;
                vm.updSchedule = updSchedule;

                vm.getShiftDays = getShiftDays;
                vm.getEmployeeDetails = getEmployeeDetails;
                vm.getEmployeeShiftTime = getEmployeeShiftTime;

                vm.toggleAllShifts = toggleAllShifts;
                vm.generateSchedule = generateSchedule;

                //general service function
                vm.getDayOfWeek = getDayOfWeek;

                function activate() {
                    getEmployeeWithAvailability();


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


                function getAllEmployees() {
                    vm.employee = [];
                    //read from database
                    getData("SELECT * FROM employee", [])
                        .then(function (employeeObj) {
                            if (employeeObj.length > 0) {
                                for (var i = 0; i < employeeObj.length; i++) {
                                    vm.employee.push(employeeObj.item(i));
                                }
                            }
                        });
                }


                function getEmployeeWithAvailability() {

                    getData("SELECT * FROM employee", [])
                        .then(function (employeeObj) {
                            getData("SELECT schedule.*, shift.* FROM schedule INNER JOIN shift ON schedule.shiftid = shift.shiftid", [])
                                .then(function(availObj) {
                                    if (employeeObj.length > 0) {
                                        for (var i = 0; i < employeeObj.length; i++) {
                                            var availableShifts = getShiftsFilterByEmpid(employeeObj.item(i).empid, availObj);
                                            vm.employee.push({
                                                "empid": employeeObj.item(i).empid,
                                                "name": employeeObj.item(i).name,
                                                "days": getDaysFilterByEmpid(availableShifts),
                                                "shifts": availableShifts
                                        });
                                        }
                                    }
                                })
                                .then(function() {
                                    console.log("finished loading employees");
                                });
                        });
                    
                }


            //
                function generateSchedule() {
                    //get shift requirements
                    getData("SELECT * FROM shift ORDER BY priority", [])
                        .then(function(shiftsDetails) {

                            //loop through shifts for staffing
                            for (var s = 0; s < shiftsDetails.length; s++) {
                                //loop through employees and get all eligible to work Sunday PM
                                var eligibleEmployees = [];
                                for (var e = 0; e < vm.employee.length; e++) {

                                    //check if current employee has shift available
                                    if (getArrIndexOf(vm.employee[e]
                                            .shifts,
                                            shiftsDetails[s].shiftid,
                                            "shiftid") >=
                                        0) {
                                        eligibleEmployees.push(vm.employee[e].empid);
                                    }
                                    //check if current employee is  not request off or unavailable

                                    //check if employee has already been scheduled over allowed time limit (usually 40 hours)
                                }

                                //randomize arr order
                                if (eligibleEmployees.length > 0) {
                                    eligibleEmployees = randomize(eligibleEmployees);
                                    //truncate to staffing requirements
                                    eligibleEmployees = eligibleEmployees.slice(0, shiftsDetails[s].staff);
                                }
                                console.log(shiftsDetails[s].name + ": ", eligibleEmployees);

                                //update employee object with scheduled employees
                                for (var emps = 0; emps < eligibleEmployees.length; emps++) {
                                    var empIndex = getArrIndexOf(vm.employee, eligibleEmployees[emps], "empid");
                                    var shiftIndex =
                                        getArrIndexOf(vm.employee[empIndex]
                                            .shifts,
                                            shiftsDetails[s].shiftid,
                                            "shiftid");
                                    vm.employee[empIndex].shifts[shiftIndex].status = 2;

                                }
                            }
                        })
                        .then(function() {

                            //dump employee schedules
                            console.log("scheduled employees", vm.employee);
                        });


                }

                //random shuffle algorithm returns same array that is passed in a different order
                function randomize(array) {
                    var currentIndex = array.length, temporaryValue, randomIndex;

                    // While there remain elements to shuffle...
                        while (0 !== currentIndex) {

                            // Pick a remaining element...
                            randomIndex = Math.floor(Math.random() * currentIndex);
                            currentIndex -= 1;

                            // And swap it with the current element.
                            temporaryValue = array[currentIndex];
                            array[currentIndex] = array[randomIndex];
                            array[randomIndex] = temporaryValue;
                        }

                        return array;
                }


                //
                function getEmployeeDetails(index) {
                    vm.employeeDetail = [];
                    vm.showEmployeeDetails = true;
                    vm.employeeDetail.push(vm.employee[index]);
                }

                //return array of objects filtered by empid
                function getDaysFilterByEmpid(arr) {
                    var employeeDays = []; 
                    for (var i = 0; i < arr.length; i++) {
                        if (employeeDays.indexOf(arr[i].dayid) < 0) {
                            employeeDays.push(arr[i].dayid);
                        }
                    }
                    return employeeDays;
                }


                //return array of objects filtered by empid
                function getShiftsFilterByEmpid(id, arr) {
                    var employeeShifts = [];
                    for (var i = 0; i < arr.length; i++) {
                        if (arr.item(i).empid == id) {
                            employeeShifts.push(
                            {
                                "dayid" : arr.item(i).dayid, 
                                "shiftid": arr.item(i).shiftid,
                                "status": 1
                            });
                        }
                    }
                    return employeeShifts;
                }


                function getShiftDays(empid, dayIndex) {
                    var shiftDays = 0;

                    var empIndex = getArrIndexOf(vm.employee, empid, "empid");

                    if (empIndex >= 0) {
                        var tmpObj = vm.employee[empIndex].shifts;
                        var emp = $filter('filter')(tmpObj, { dayid: dayIndex });

                        if (emp.length > 0) {
                            shiftDays = 1;
                        }
                    }
                    
                    return shiftDays;
                }


                function getArrIndexOf(arr, value, prop) {
                    for (var i = 0, len = arr.length; i < len; i++) {
                        if (arr[i][prop] === value)
                            return i;
                    }
                    return -1;
                }

                function getEmployeeShiftTime(empIndex, dayIndex) {

                    return "";
                }

                function toggleAllShifts() {
                    alert('toggle shifts triggered');
                }

                function getStatusIcon(empIndex, dayid) {
                    switch (getShiftDays(empIndex, dayid)) {
                    case 0:
                        return 'fa-minus-circle fa-2x btn-muted';
                        break;
                    case 1:
                        return 'fa-plus-circle fa-2x btn-avail';
                        break;
                    case 2:
                        return 'fa-check-circle btn-scheduled';
                        break;
                    case 3:
                        return 'fa-times-circle fa-2x btn-requestOff';
                        break;
                    default:
                        return 'fa-times-circle fa-2x btn-muted';
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


                function getDayOfWeek(dayid) {

                    switch (dayid) {
                        case 0:
                            return "Sunday";
                            break;
                        case 1:
                            return "Monday";
                            break;
                        case 2:
                            return "Tuesday";
                            break;
                        case 3:
                            return "Wednesday";
                            break;
                        case 4:
                            return "Thursday";
                            break;
                        case 5:
                            return "Friday";
                            break;
                        case 6:
                            return "Saturday";
                            break;
                        default:
                            return "No Day Found";
                    }

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
                            { "label": "Sun", "value": 1 },
                            { "label": "Mon", "value": 1 },
                            { "label": "Tue", "value": 1 },
                            { "label": "Wed", "value": 1 },
                            { "label": "Thu", "value": 1 },
                            { "label": "Fri", "value": 1 },
                            { "label": "Sat", "value": 1 }
                        ]},
                    {
                        "key": "Shift Requirements",
                        "color": "#d62728",
                        "values": [
                            { "label": "Sun", "value": 7 },
                            { "label": "Mon", "value": 3 },
                            { "label": "Tue", "value": 4 },
                            { "label": "Wed", "value": 5 },
                            { "label": "Thu", "value": 5 },
                            { "label": "Fri", "value": 6 },
                            { "label": "Sat", "value": 6 }
                        ]
                    }];

                //
                vm.chartDataPM = [{
                    "key": "Shift Scheduled",
                    "color": "#1f77b4",
                    "values": [
                        { "label": "Sun", "value": 1 },
                        { "label": "Mon", "value": 1 },
                        { "label": "Tue", "value": 1 },
                        { "label": "Wed", "value": 1 },
                        { "label": "Thu", "value": 1 },
                        { "label": "Fri", "value": 1 },
                        { "label": "Sat", "value": 1 }
                    ]
                },
                    {
                        "key": "Shift Requirements",
                        "color": "#d62728",
                        "values": [
                            { "label": "Sun", "value": 7 },
                            { "label": "Mon", "value": 6 },
                            { "label": "Tue", "value": 7 },
                            { "label": "Wed", "value": 8 },
                            { "label": "Thu", "value": 8 },
                            { "label": "Fri", "value": 11 },
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