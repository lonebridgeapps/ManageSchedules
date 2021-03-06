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
        .controller('scheduleCtrl', ['$http', '$q', '$filter', function ($http, $q, $filter) {
            /*controller ideas
                1. shiftReqRatio = number of employees available / shift requirements
                2. shiftAverageLength (steps to create):
                    a. get count of all shifts
                    b. remove 10% of longest shifts from list
                    c. remove 10% of shortest shifts from list
                    d. calculate average based on remaining shifts
                3. possible employee rating system to coinside with scheduling highest prioirty shifts with highest rated employees
                4. calculate total number of available schedule hours
                    a. schedule then subtract shift totals for short week employees 3 days (or ~24 hours) or fewer availability
                    
                5. create vm.schedule object on page load after vm.employee object is created
                    a. vm.schedule [{empid, availableShifts, scheduledShifts, availableHours, scheduledHours, dayDetails[0:"", 1:"", etc]}]
            */
                var vm = this;

                vm.showStaffStats = false;
                vm.showEmployeeDetails = false;
                vm.toggleEmployeeDetails = true;

            //configuration variables
                var configAvgShift = 0;
                var configTotalShiftHours = 0;
                var configAutoStaff = 0;
                var configAutoStaffPercentage = 0.5; //default value

                var config = {};
                config.schedulePartialAvailableEmployees = true;
                config.allowDoubleShift = false;

                vm.days = [0,1,2,3,4,5,6];
                vm.employeeObj = [];
                vm.employee = [];
                vm.schedule = [];
                vm.employeeDetail = [];
                vm.shifts = [];

                activate();

                vm.getShiftDays = getShiftDays;
                vm.getIcon = getIcon;
                vm.getEmployeeDetails = getEmployeeDetails;
                vm.getSchedules = getSchedules;

                

                function activate() {
                    getEmployeeWithAvailability();
                    getShiftReqDefaults();

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
                                            var dailyAvailability = createEmployeeDailyAvailability(availableShifts);
                                            
                                            vm.schedule.push({
                                                "empid": employeeObj.item(i).empid,
                                                "name": employeeObj.item(i).name,
                                                "availableDays": getAvailableDays(availableShifts),
                                                "scheduledDays": 0,
                                                "availableShifts": availableShifts.length,
                                                "scheduledShifts": 0,
                                                "availableHours": 40,
                                                "scheduledHours": 0,
                                                "dailyDetails": dailyAvailability,
                                                "shifts": availableShifts
                                            });
                                        }
                                    }
                                })
                                .then(function() {
                                    console.log("finished loading schedule", vm.schedule);
                                });
                        });
                    
                }


                function getShiftReqDefaults() {
                    getData("SELECT * FROM shift ORDER BY dayid", [])
                       .then(function (allShifts) {
                            for (var i = 0; i < allShifts.length; i++) {
                                vm.shifts.push({
                                    "shiftid": allShifts[i].shiftid,
                                    "name": allShifts[i].name,
                                    "details": allShifts[i].timespan,
                                    "hours": allShifts[i].hours,
                                    "staffRequirements": allShifts[i].staff,
                                    "staffScheduled": 0
                                });
                            }
                        })
                       .then(function () {

                           //dump shifts 
                           console.log("shifts", vm.shifts);

                       });
                }

                //get average length of shift
                function getShiftLengthAverage(shiftDetails) {
                    var shiftHours = [];
                    angular.forEach(shiftDetails, function(key, value) {
                        shiftHours.push(key.hours);
                    });
                    shiftHours.sort();
                        
                    //get 10% of list
                    var percentage = Math.round(shiftHours.length * .1);
                    var frontSliced = shiftHours.slice(0, shiftHours.length - percentage);
                    var ttlSliced = shiftHours.slice(percentage, frontSliced.length);

                    var sum = 0;
                    for (var i = 0; i < ttlSliced.length; i++) {
                        sum += parseInt(ttlSliced[i], 10);
                    }

                    var avg = Math.round(sum / ttlSliced.length);
                    return avg;
                }

            //get total hours of available shift hours
                function getTotalShiftHours(shiftDetails) {
                    var ttlAvailableHours = 0;
                    angular.forEach(shiftDetails,
                        function(key, value) {
                            ttlAvailableHours += (key.hours * key.staff);
                        });
                    return ttlAvailableHours;
                }

            //define at what daily availability we automatically schedule
            //configurable **//??
                function getAutoStaffDefinition(shiftDetails) {
                    var autoDefinition = 0;
                    var dayArray = [];
                    for (var i = 0; i < shiftDetails.length; i++) {
                        var doesExists = false;
                        for (var j = 0; j < dayArray.length; j++) {
                            if (dayArray[j] === shiftDetails[i].dayid) {
                                doesExists = true;
                            }
                        }
                        if (!doesExists) {
                            dayArray.push(shiftDetails[i].dayid);
                        }

                    }
                    autoDefinition = Math.round(dayArray.length * configAutoStaffPercentage); 
                    return autoDefinition;
                }

                //
                function getAvailableDays(arr) {
                    var dayCount = [];
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].status === 1) {
                            var exists = false;
                            for (var j = 0; j < dayCount.length; j++) {
                                if (dayCount[j] === arr[i].dayid) {
                                    exists = true;
                                }
                            }
                            if (!exists) {
                                dayCount.push(arr[i].dayid);
                            }
                        }
                    }
                    return dayCount.length;
                }

                //
                function getPartialAvailableEmployeesList(configAutoStaff, empList) {
                    var partialEmployees = [];
                    for (var i = 0; i < empList.length; i++) {
                        if (empList[i].availableDays <= configAutoStaff) {
                            partialEmployees.push(empList[i]);
                        }
                    }
                    return partialEmployees;
                }

                //
                function getUnscheduledEmployees(empList) {
                    var unscheduledEmployees = [];
                    for (var i = 0; i < empList.length; i++) {
                        if (empList[i].scheduledHours <= 0) {
                            unscheduledEmployees.push(empList[i]);
                        }
                    }
                    return unscheduledEmployees;
                }


                //
                function getScheduledHours() {
                    var ttlScheduledHours = 0;
                    for (var i = 0; i < vm.schedule.length; i++) {
                        ttlScheduledHours += vm.schedule[i].scheduledHours;
                    }
                    return ttlScheduledHours;
                }

                //
                function chkShiftStaffing(shifts) {
                    var underScheduled = [];
                    for(var i = 0; i < shifts.length; i++)
                    {
                        if (shifts[i].staffScheduled < shifts[i].staffRequirements) {
                            underScheduled.push(shifts[i].shiftid);
                        }
                    }
                    return underScheduled;
                }

            //
                function getEligibleEmployeesList(employeeList, shiftsDetails, shiftRatio) {
                    var eligibleEmployees = [];
                    for (var e = 0; e < employeeList.length; e++) {
                        //check if current employee has shift available
                        if (getArrIndexOf(employeeList[e].shifts, shiftsDetails.shiftid, "shiftid") < 0) {
                            continue;
                        }
                        //check if employee is already scheduled on this day and not scheduled over 40 hours
                        else if (isScheduledToday(shiftsDetails.dayid, employeeList[e].dailyDetails) &&
                            !config.allowDoubleShift) {
                            continue;
                        }
                        //check if employee has been scheduled over 40 hours (configurable)
                        else if ((employeeList[e].scheduledHours + shiftsDetails.hours) >= 40) {
                            continue;
                        }
                        //check if employee has been scheduled for max allowable shifts (configurable)
                        else if (employeeList[e].scheduledShifts >= shiftRatio) {
                            continue;
                        }
                        //check if current employee is not request off and remove
                        else if (1 === 2) {
                            continue;
                        } else {
                            eligibleEmployees.push({
                                "empid": employeeList[e].empid,
                                "shiftCount": employeeList[e].availableShifts,
                                "shiftRatio": employeeList[e].scheduledHours / 40
                                //NEED CALCULATION AND VARIABLE FOR THIS BASED ON DAYS AND WHETHER OR NOT DOUBLE SHIFTING IS ALLOWED      
                            });
                        }
                    }
                    return eligibleEmployees;
                }


                //
                function generateSchedule(employeeList, shiftsDetails, shiftRatio) {
                    shiftRatio = 4;
                    for (var s = 0; s < shiftsDetails.length; s++) {

                        var eligibleEmployees = getEligibleEmployeesList(employeeList, shiftsDetails[s], shiftRatio);
                        
                        var idx = getArrIndexOf(vm.shifts, shiftsDetails[s].shiftid, "shiftid");
                        if (eligibleEmployees.length > 0) {
                            //sort eligible employee lowest to highest shift count then shift ratio
                            //selectionSortDesc(eligibleEmployees);

                            //truncate to staffing requirements
                            eligibleEmployees = eligibleEmployees.slice(0, (shiftsDetails[s].staff - vm.shifts[idx].staffScheduled));
                        }

                        for (var emps = 0; emps < eligibleEmployees.length; emps++) {
                            var empIndex = getArrIndexOf(employeeList, eligibleEmployees[emps].empid, "empid");
                            var dayIndex = getArrIndexOf(employeeList[empIndex].dailyDetails, shiftsDetails[s].dayid, "dayid");

                            //update employee schedule object
                            if (dayIndex >= 0) {
                                employeeList[empIndex].dailyDetails[dayIndex].status = 2;
                                employeeList[empIndex].dailyDetails[dayIndex].iconClass = getIcon(2);
                                employeeList[empIndex].dailyDetails[dayIndex].detail = shiftsDetails[s].timespan;
                                employeeList[empIndex].dailyDetails[dayIndex].shiftid = shiftsDetails[s].shiftid;
                            }
                            //update employee scheduled objects
                            employeeList[empIndex].scheduledHours = employeeList[empIndex].scheduledHours + shiftsDetails[s].hours;
                            employeeList[empIndex].scheduledShifts += 1;
                            employeeList[empIndex].scheduledDays += 1;

                            //update shifts staffing 
                            vm.shifts[idx].staffScheduled += 1;
                        }
                    }
                }

                //
                function getSchedules() {
                    //get shift requirements
                    getData("SELECT * FROM shift ORDER BY priority", [])
                        .then(function(shiftsDetails) {
                            //get average shift length
                            configAvgShift = getShiftLengthAverage(shiftsDetails);
                            configTotalShiftHours = getTotalShiftHours(shiftsDetails);
                            configAutoStaff = getAutoStaffDefinition(shiftsDetails);

                            var employees = [];
                            employees.push(randomize(vm.schedule));

                            if (config.schedulePartialAvailableEmployees) {
                                //first schedule employees with partial weekly availablity
                                var partialEmployees = getPartialAvailableEmployeesList(configAutoStaff, vm.schedule);
                                partialEmployees = randomize(partialEmployees);

                                //loop through shifts and switch availability to scheduled
                                generateSchedule(partialEmployees, shiftsDetails, configAvgShift);

                                //adjust staffing numbers
                                var availableScheduleHours = configTotalShiftHours - getScheduledHours();
                                
                                //adjust employee list to staff rremaining unscheduled employees
                                employees = [];
                                employees = randomize(getUnscheduledEmployees(vm.schedule));

                            }

                            generateSchedule(employees, shiftsDetails);

                            //shift scheduling
                            //loop through shifts and ensure coverage
                            var underStaffedShifts = chkShiftStaffing(vm.shifts);

                            if (underStaffedShifts.length > 0) {
                                var shiftRatio = 5;  //?? need algorithm - or maybe set to max? ??//
                                for (var j = 0; j < underStaffedShifts.length; j++) {

                                    var ptr = getArrIndexOf(vm.shifts, underStaffedShifts[j], "shiftid");
                                    var emps = getEligibleEmployeesList(employees, vm.shifts[ptr], shiftRatio);
                                    emps = selectionSortDesc(emps);

                                    var k = 0;
                                    while (vm.shifts[ptr].staffScheduled < vm.shifts[ptr].staffRequirements) {

                                        var empIndex = getArrIndexOf(vm.schedule, emps[k].empid, "empid");
                                        var shiftIndex = getArrIndexOf(shiftsDetails, underStaffedShifts[j], "shiftid");
                                        var dayIndex = getArrIndexOf(shiftsDetails, shiftsDetails[shiftIndex].dayid, "dayid"); 

                                        vm.schedule[empIndex].dailyDetails[dayIndex].status = 2;
                                        vm.schedule[empIndex].dailyDetails[dayIndex].iconClass = getIcon(2);
                                        vm.schedule[empIndex].dailyDetails[dayIndex].detail = shiftsDetails[ptr].timespan;
                                        vm.schedule[empIndex].dailyDetails[dayIndex].shiftid = shiftsDetails[ptr].shiftid;

                                        //update employee scheduled objects
                                        vm.schedule[empIndex].scheduledHours = vm.schedule[empIndex].scheduledHours + shiftsDetails[ptr].hours;
                                        vm.schedule[empIndex].scheduledShifts += 1;
                                        vm.schedule[empIndex].scheduledDays += 1;

                                        //update shifts staffing 
                                        vm.shifts[ptr].staffScheduled += 1;
                                        k++;
                                    }
                                }
                            }

                        })
                        .then(function() {
                            console.log("Schedules Run!", vm.schedule);

                        });

                }


                //selection sort
                function selectionSortDesc(arr) {
                    var len = arr.length;
                    var min = 0;
                    var temp = [];

                    for (var i = 0; i < len; i++) {
                        min = i;

                        //check the rest of the array to see if anything is smaller
                        for (var j = i + 1; j < len; j++) {
                            if (arr[j].shiftCount > arr[min].shiftCount) {
                                min = j;
                            }
                            else if (arr[j].shiftCount === arr[min].shiftCount) {
                                if (arr[j].shiftRatio > arr[min].shiftRatio) {
                                    min = j;
                                }
                            }
                        }

                        //if min isn't in starting position then swap positions
                        if (i !== min) {
                            temp = arr[i];
                            arr[i] = arr[min];
                            arr[min] = temp;
                        }
                    }

                    return arr;
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


                //returns bool if employee is already schedule for shift on passed in day
                function isScheduledToday(dayid, arrSchedule) {
                    for (var i = 1; i < arrSchedule.length; i++) {
                        if (arrSchedule[i].dayid === dayid && arrSchedule[i].status === 2) {
                            return true;
                        }
                    }
                    return false;
                }

                //initialize employee hours object
                function getEmployeeScheduleHours(arr, hours) {
                    var employeeHours = [];

                    for (var i = 0; i < arr.length; i++) {
                        employeeHours.push({
                            "empid": arr[i].empid,
                            "maxHours": 40, //default value .... ** need tertiary assignment **
                            "scheduledHours": hours.length > 0 ? hours[i].scheduledHours : 0, //initialize scheduled hours count
                            "shiftCount": getCountAvailableShifts(arr[i].schedule), //default value .... ** need tertiary assignment **
                            "scheduledShifts": 0 //initialize scheduled shift count
                        });
                    }
                    return employeeHours;
                }

                function getCountAvailableShifts(arr) {
                    var count = 0;
                    angular.forEach(arr, function(value, key) {
                        if (value.status === 1) {
                            count++;
                        }
                    });
                    return count;
                }

                //initialize schedule object
                function createEmployeeDailyAvailability(arr) {
                    var dailyAvailability = [];
                    for (var day = 0; day < 7; day++) {
                        var status = 0;
                        if (getArrIndexOf(arr, day, "dayid") >= 0) {
                            status = 1;
                        }
                        dailyAvailability.push(
                            {
                                "dayid": day,
                                "status": status,
                                "iconClass": getIcon(status),
                                "detail": "",
                                "shiftid": 0,
                                "segment": 0
                            });
                    }

                    return dailyAvailability;
                }

                function getShiftDays(empid, dayIndex) {
                    var shiftDays = 0;
                    var empIndex = getArrIndexOf(vm.employee, empid, "empid");

                    if (empIndex >= 0) {
                        //var arrEmpShifts = vm.employee[empIndex].shifts;
                        var tmpObj = vm.employee[empIndex].shifts;
                        var arrEmpShifts = $filter('filter')(tmpObj, { dayid: dayIndex });

                        if (arrEmpShifts.length > 0) {
                            shiftDays = 1;
                            for (var i = 0; i > arrEmpShifts.length; i++) {
                                if (arrEmpShifts[i].status > 1) {
                                    shiftDays = arrEmpShifts[i].status;
                                    break;
                                }
                            }
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

                function getIcon(status) {
                    switch (status) {
                    case 0:
                        return 'fa-minus-circle  btn-muted';
                        break;
                    case 1:
                        return 'fa-plus-circle  btn-avail';
                        break;
                    case 2:
                        //return 'fa-check-circle  btn-scheduled';
                        return "no-show";
                        break;
                    case 3:
                        return 'fa-times-circle  btn-requestOff';
                        break;
                    default:
                        return 'fa-times-circle  btn-muted';
                    }
                }

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