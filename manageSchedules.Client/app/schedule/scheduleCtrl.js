(function () {
    'use strict';

    angular
        .module('app')
        .controller('scheduleCtrl', ['$http', '$q', '$filter', function($http, $q, $filter) {
                var vm = this;

                vm.showStaffStats = false;
                vm.showEmployeeDetails = false;

                //shift key
                // 0 = not available
                // 1 = available
                // 2 = scheduled
                // 3 = requested off

                vm.days = [0,1,2,3,4,5,6];
                vm.employeeObj = [];
                vm.employee = [];
                vm.employeeDetail = [];

                activate();

                vm.getStatusColor = getStatusColor;
                vm.getStatusIcon = getStatusIcon;
                vm.updSchedule = updSchedule;

                vm.getShiftDays = getShiftDays;
                vm.getEmployeeDetails = getEmployeeDetails;

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
                                            vm.employee.push({
                                                "empid": employeeObj.item(i).empid,
                                                "name": employeeObj.item(i).name,
                                                "ttlShifts": employeeObj.item(i).shifts,
                                                "aShifts": getShiftsFilterByEmpid(employeeObj.item(i).empid, availObj)
                                        });
                                        }
                                    }
                                })
                                .then(function() {
                                    console.log("finished: ", vm.employee);
                                });
                        });
                    
                }

                //
                function getEmployeeDetails(index) {
                    vm.employeeDetail = [];
                    vm.showEmployeeDetails = true;
                    vm.employeeDetail.push(vm.employee[index]);
                }


                //return array of objects filtered by empid
                function getShiftsFilterByEmpid(id, arr) {
                    var employeeShifts = [];
                    for (var i = 0; i < arr.length; i++) {
                        if (arr.item(i).empid == id) {
                            employeeShifts.push(
                            {
                                "dayid" : arr.item(i).dayid, 
                                "segment": arr.item(i).segment,
                                "status": arr.item(i).status
                            });
                        }
                    }
                    return employeeShifts;
                }


                function getShiftDays(empIndex, dayIndex) {
                    var shiftDays = 0;

                    var tmpObj = vm.employee[empIndex].aShifts;
                    var emp = $filter('filter')(tmpObj, { dayid: dayIndex });

                    if (emp.length > 0) {
                        shiftDays = 1;
                    }
                    
                    return shiftDays;
                }


                function getStatusColor(empIndex, dayid) {
                    switch (getShiftDays(empIndex, dayid)) {
                    case 0:
                        return 'btn-muted';
                        break;
                    case 1:
                        return 'btn-avail';
                        break;
                    case 2:
                        return 'btn-scheduled';
                        break;
                    case 3:
                        return 'btn-requestOff';
                        break;
                    default:
                        return 'btn-muted';
                    }
                }

                function getStatusIcon(empIndex, dayid) {
                    switch (getShiftDays(empIndex, dayid)) {
                    case 0:
                        return 'fa-times';
                        break;
                    case 1:
                        return 'fa-plus';
                        break;
                    case 2:
                        return 'fa-plus';
                        break;
                    case 3:
                        return 'fa-times';
                        break;
                    default:
                        return 'fa-times';
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