(function () {
    'use strict';

    angular
        .module('app')
        .controller('scheduleCtrl', ['$http', '$q', function($http, $q) {
                var vm = this;

                vm.showStaffStats = false;
                vm.showEmployeeDetails = false;

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
                vm.employee = [];

                activate();

                vm.getStatusColor = getStatusColor;
                vm.getStatusIcon = getStatusIcon;
                vm.updSchedule = updSchedule;


                function activate() {
                    getAllEmployees();
                    getEmployeeAvailability();
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
                            else {
                                console.log("Error Loading Employees!");
                            }
                        });
                }


                function getEmployeeAvailability() {
                    vm.avail = [];
                    //read from database
                    getData("SELECT * FROM schedule", [])
                        .then(function (availObj) {
                            if (availObj.length > 0) {
                                for (var i = 0; i < availObj.length; i++) {
                                    vm.avail.push(availObj.item(i));
                                }
                            }
                            else {
                                console.log("Error Loading Schedules!");
                            }
                        });
                    console.log('Availability: ', vm.avail);
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