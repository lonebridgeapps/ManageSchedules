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