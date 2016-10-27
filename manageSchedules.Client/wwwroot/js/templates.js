angular.module('templates-main', ['../app/employee/employee.html', '../app/main/main.html', '../app/schedule/schedule.html', '../app/shift/shift.html']);

angular.module("../app/employee/employee.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/employee/employee.html",
    "<style>\n" +
    "    .panel {\n" +
    "        margin-top: 15px;\n" +
    "    }\n" +
    "    .alert {\n" +
    "        margin: 10px;\n" +
    "    }\n" +
    "\n" +
    "    .noRecords {\n" +
    "        font-weight: bold;\n" +
    "        color: #696969;\n" +
    "    }\n" +
    "\n" +
    "    .btn-icon {\n" +
    "        padding: 0 10px;\n" +
    "    }\n" +
    "</style>\n" +
    "\n" +
    "\n" +
    "<div id=\"employeeWrapper\">\n" +
    "\n" +
    "    <div></div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "\n" +
    "        <div class=\"col-md-6\">\n" +
    "            <div class=\"panel panel-primary\">\n" +
    "                <div class=\"panel-heading\">\n" +
    "                    Manage Employee\n" +
    "                </div>\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <form id=\"frmEmployee\" name=\"frmEmployee\" ng-submit=\"vm.saveEmployee(frmEmployee.$valid)\">\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label for=\"txtName\">Employee Name</label>\n" +
    "                            <input type=\"text\" class=\"form-control\" id=\"txtName\" placeholder=\"Name\" ng-model=\"vm.emp.name\" required>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-sm-12\">\n" +
    "                                <div class=\"form-group\">\n" +
    "                                    <label for=\"txtHireDate\">Hire Date</label>\n" +
    "                                    <input type=\"date\" class=\"form-control\" id=\"txtHireDate\" placeholder=\"Hire Date\" ng-model=\"vm.emp.hiredate\">\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-sm-6\">\n" +
    "                                <div class=\"form-group\">\n" +
    "                                    <label for=\"txtShifts\">Total Shifts</label>\n" +
    "                                    <input type=\"number\" class=\"form-control\" id=\"txtShifts\" placeholder=\"Total Shifts\" ng-model=\"vm.emp.shifts\" required>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-6\">\n" +
    "                                <div class=\"form-group\">\n" +
    "                                    <label for=\"txtHours\">Total Hours</label>\n" +
    "                                    <input type=\"number\" class=\"form-control\" id=\"txtHours\" placeholder=\"Total Hours\" ng-model=\"vm.emp.hours\" >\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-xs-12\">\n" +
    "                                <div class=\"panel panel-primary\">\n" +
    "                                    <div class=\"panel-heading \">\n" +
    "                                        Shift Availability\n" +
    "                                        <button type=\"button\" class=\"btn btn-primary btn-sm pull-right\" ng-click=\"vm.showShifts = !vm.showShifts\">\n" +
    "                                            <i class=\"fa\" ng-class=\"{'fa-plus':!vm.showShifts, 'fa-minus':vm.showShifts}\"></i>\n" +
    "                                        </button>\n" +
    "                                        <div class=\"clearfix\"></div>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"panel-body\" ng-show=\"vm.showShifts\">\n" +
    "                                        <div class=\"list-group\">\n" +
    "                                            <a class=\"list-group-item text-center\">Select shift availablity</a>\n" +
    "                                            <a class=\"list-group-item\" ng-click=\"vm.toggleAllShifts()\">\n" +
    "                                                <div class=\"row\">\n" +
    "                                                    <div class=\"col-xs-4 text-center text-success\">\n" +
    "                                                        <i class=\"fa\" ng-class=\"vm.shifts.length != vm.emp.availableShift.length ? 'fa-check' : 'fa-square-o'\"></i>\n" +
    "                                                    </div>\n" +
    "                                                    <div class=\"col-xs-8\">{{vm.massSelection}}</div>\n" +
    "                                                </div>\n" +
    "                                            </a>\n" +
    "                                            <a class=\"list-group-item\" ng-repeat=\"sItem in vm.shifts\" ng-click=\"vm.toggleShift(sItem.shiftid)\">\n" +
    "                                                <div class=\"row\">\n" +
    "                                                    <div class=\"col-xs-4 text-center text-success\">\n" +
    "                                                        <i class=\"fa\" ng-class=\"vm.emp.availableShift.indexOf(sItem.shiftid) >= 0 ? 'fa-check' : 'fa-square-o'\"></i>\n" +
    "                                                    </div>\n" +
    "                                                    <div class=\"col-xs-8\">{{sItem.name}}</div>\n" +
    "                                                </div>\n" +
    "                                            </a>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-xs-12\">\n" +
    "                                <div class=\"pull-right\">\n" +
    "                                    <button type=\"submit\" class=\"btn btn-default\" ng-click=\"vm.resetForm()\"><i class=\"fa\" ng-class=\"'fa-undo'\"></i> Reset</button>\n" +
    "                                    <button type=\"submit\" class=\"btn btn-success\" ng-disabled=\"frmEmployee.$invalid\"><i class=\"fa\" ng-class=\"'fa-save'\"></i> Save</button>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"alert text-center\" ng-class=\"'alert-success'\" ng-show=\"vm.showFormMsg\">\n" +
    "                            <i class=\"fa\" ng-class=\"'fa-check-circle-o'\"></i> {{vm.formMsg}}\n" +
    "                        </div>\n" +
    "\n" +
    "                    </form>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            \n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-md-6\">\n" +
    "            <div class=\"panel panel-primary\">\n" +
    "                <div class=\"panel-heading\">\n" +
    "                    Employees\n" +
    "                    <span class=\"badge pull-right\">{{vm.empCount}}</span>\n" +
    "                </div>\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <div class=\"list-group\">\n" +
    "                        <div class=\"list-group-item\" ng-repeat=\"items in vm.employee\">\n" +
    "                            <div class=\"row\">\n" +
    "                                <div class=\"col-xs-5\">{{items.name}}</div>\n" +
    "                                <div class=\"col-xs-2\">{{items.shifts}}</div>\n" +
    "                                <div class=\"col-xs-5\">\n" +
    "                                    <a class=\"text-danger pull-right btn-icon\" ng-click=\"vm.deleteEmployee()\"><i class=\"fa fa-remove\"></i></a>\n" +
    "                                    <a class=\"text-primary pull-right btn-icon\" ng-click=\"vm.loadEmployee(items.empid)\"><i class=\"fa fa-pencil\"></i></a>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"list-group-item noRecords\" ng-show=\"vm.showListMsg\">\n" +
    "                            <div class=\"row\">\n" +
    "                                <div class=\"col-xs-12 text-center\">\n" +
    "                                    <i class=\"fa fa-spin\" ng-class=\"'fa-refresh'\"></i> {{vm.listMsg}}\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            \n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    \n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/main/main.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/main/main.html",
    "<style>\n" +
    "    * {\n" +
    "        -webkit-border-radius: 0 !important;\n" +
    "        -moz-border-radius: 0 !important;\n" +
    "        border-radius: 0 !important;\n" +
    "    }\n" +
    "\n" +
    "    .btn-disabled {\n" +
    "        color: #b5b5b5;\n" +
    "        background-color: #cfcfcf;\n" +
    "        border-color: #b5b5b5;\n" +
    "    }\n" +
    "\n" +
    "    .btn-avail {\n" +
    "      color: #0094ff;\n" +
    "      background-color: #fff;\n" +
    "      border-color: #0094ff;\n" +
    "    }\n" +
    "\n" +
    "    .btn-avail:hover {\n" +
    "      color: #082f9c;\n" +
    "      background-color: #91c7fb;\n" +
    "      border-color: #082f9c;\n" +
    "    }\n" +
    "\n" +
    "    .btn-scheduled {\n" +
    "        color: #2DA127;\n" +
    "        background-color: #EDEDED;\n" +
    "        border-color :#2DA127;\n" +
    "    }\n" +
    "\n" +
    "    .btn-requestOff {\n" +
    "        color: #ff0000;\n" +
    "        background-color: #EDEDED;\n" +
    "        border-color :#ff0000;\n" +
    "    }\n" +
    "        \n" +
    "    .loadingBar {\n" +
    "        padding: 20px;\n" +
    "        background-color: #696969;\n" +
    "        color: #ffffff;\n" +
    "    }\n" +
    "\n" +
    "</style>\n" +
    "\n" +
    "<div class=\"container-fluid\">\n" +
    "    <div class=\"row loadingBar\" ng-show=\"vm.showLoadingBar\">\n" +
    "        <div class=\"col-xs-12 text-center\">\n" +
    "            <i class=\"fa fa-gear fa-spin\"></i> {{vm.headerMsg}}\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div id=\"sideNavWrapper\" class=\"col-xs-12 col-sm-4 col-md-3\">\n" +
    "            <h4>Schedule Manager</h4>\n" +
    "            <div class=\"list-group\">\n" +
    "                <a class=\"list-group-item\" ui-sref=\"main.schedule\">\n" +
    "                    <i class=\"fa fa-calendar-o\"></i> Schedules</a>\n" +
    "                <a class=\"list-group-item\" ui-sref=\"main.shift\">\n" +
    "                    <i class=\"fa fa-clock-o\"></i> Shifts</a>\n" +
    "                <a class=\"list-group-item\" ui-sref=\"main.employee\">\n" +
    "                    <i class=\"fa fa-users\"></i> Employees</a>\n" +
    "\n" +
    "                <a class=\"list-group-item\">\n" +
    "                    <button class=\"btn btn-block btn-default\" ng-click=\"vm.createDb()\"><i class=\"fa fa-database\"></i> Create Database</button>\n" +
    "                </a>\n" +
    "\n" +
    "                <a href=\"#\" class=\"list-group-item active\">\n" +
    "                    <h4 class=\"list-group-item-heading\">Generate Steps</h4>\n" +
    "                    <p class=\"list-group-item-text\" style=\"text-decoration: line-through\">Load Employee Data</p>\n" +
    "                    <p class=\"list-group-item-text\">Add Employee Availability</p>\n" +
    "                    <p class=\"list-group-item-text\">Prioritize days / shifts</p>\n" +
    "                    <p class=\"list-group-item-text\">Populate shifts</p>\n" +
    "                    <p class=\"list-group-item-text\">Optimize shifts</p>\n" +
    "                </a>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "        <div id=\"mainContentWrapper\" class=\"col-xs-12 col-sm-8 col-md-9\">\n" +
    "            <div ui-view></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("../app/schedule/schedule.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/schedule/schedule.html",
    "<style>\n" +
    "    .gridbox {\n" +
    "        margin-top: 2px;\n" +
    "    }\n" +
    "\n" +
    "    .gridbox a {\n" +
    "        text-decoration: none;\n" +
    "        vertical-align:middle;\n" +
    "    }\n" +
    "\n" +
    "    table td {\n" +
    "        padding:2px;\n" +
    "    }\n" +
    "</style>\n" +
    "\n" +
    "\n" +
    "<div id=\"scheduleWrapper\">\n" +
    "    <h4>Schedules</h4>\n" +
    "\n" +
    "    <div></div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-xs-12\">\n" +
    "            <div class=\"panel panel-primary\">\n" +
    "                <div class=\"panel-heading\">\n" +
    "                    <i class=\"fa fa-cogs\"></i> ToolBox\n" +
    "                </div>\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <a class=\"btn btn-default\" ng-click=\"\"><i class=\"fa fa-calendar-plus-o\"></i> Run Schedule</a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-xs-12\">\n" +
    "            <div class=\"panel panel-primary\">\n" +
    "                <div class=\"panel-heading\">\n" +
    "                    Week of: xx/xx/xxxx - xx/xx/xxxx\n" +
    "                </div>\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <table class=\"table table-striped text-center\">\n" +
    "                        <thead>\n" +
    "                        <tr class=\"text-center\">\n" +
    "                            <th class=\"text-center\">Employee</th>\n" +
    "                            <th class=\"text-center\">Sun <br /> 0 / 0</th>\n" +
    "                            <th class=\"text-center\">Mon <br /> 0 / 0</th>\n" +
    "                            <th class=\"text-center\">Tue <br /> 0 / 0</th>\n" +
    "                            <th class=\"text-center\">Wed <br /> 0 / 0</th>\n" +
    "                            <th class=\"text-center\">Thu <br /> 0 / 0</th>\n" +
    "                            <th class=\"text-center\">Fri <br /> 0 / 0</th>\n" +
    "                            <th class=\"text-center\">Sat <br /> 0 / 0</th>\n" +
    "                            <th class=\"text-center\">Totals</th>\n" +
    "                        </tr>\n" +
    "                        </thead>\n" +
    "                        <tbody>\n" +
    "                        <tr ng-repeat=\"x in vm.employeeObj\">\n" +
    "                            <td>\n" +
    "                                <h5 class=\"text-primary\">{{x.name}}</h5>\n" +
    "                                <div>scheduled: {{x.scheduled}}</div>\n" +
    "                                <div>available: {{x.available}}</div>\n" +
    "                            </td>\n" +
    "\n" +
    "                            <td ng-repeat=\"z in x.day\">\n" +
    "                                <a class=\"btn btn-block\" ng-class=\"vm.getStatusColor($parent.$index, $index, 0)\" ng-click=\"vm.updSchedule($parent.$index, $index, 0)\">\n" +
    "                                    <i class=\"fa\" ng-class=\"vm.getStatusIcon($parent.$index, $index, 0)\"></i> {{z.shift[0].name}}\n" +
    "                                </a>\n" +
    "                                <a class=\"btn btn-block\" ng-class=\"vm.getStatusColor($parent.$index, $index, 1)\" ng-click=\"vm.updSchedule($parent.$index, $index, 1)\">\n" +
    "                                    <i class=\"fa\" ng-class=\"vm.getStatusIcon($parent.$index, $index, 1)\"></i> {{z.shift[1].name}}\n" +
    "                                </a>\n" +
    "                            </td>\n" +
    "\n" +
    "                            <td>\n" +
    "                                <a class=\"btn btn-default btn-block\"><i class=\"fa fa-calendar-o \"></i> 0</a>\n" +
    "                                <a class=\"btn btn-default btn-block\"><i class=\"fa fa-calendar-o \"></i> 0</a>\n" +
    "                            </td>\n" +
    "                        </tr>\n" +
    "                        </tbody>\n" +
    "                    </table>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/shift/shift.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/shift/shift.html",
    "<style>\n" +
    "    .noRecords {\n" +
    "        font-weight: bold;\n" +
    "        color: #696969;\n" +
    "    }\n" +
    "</style>\n" +
    "\n" +
    "\n" +
    "<div id=\"shiftWrapper\">\n" +
    "    <h4>Shifts</h4>\n" +
    "\n" +
    "    <div></div>\n" +
    "\n" +
    "    <!--<div class=\"row\">\n" +
    "        <div class=\"col-xs-12\">\n" +
    "            <div class=\"panel panel-primary\">\n" +
    "                <div class=\"panel-heading\">\n" +
    "                    <i class=\"fa fa-cogs\"></i> ToolBox\n" +
    "                </div>\n" +
    "                <div class=\"panel-body\">\n" +
    "                   \n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>-->\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-xs-12\">\n" +
    "            <div class=\"panel panel-primary\">\n" +
    "                <div class=\"panel-heading\">\n" +
    "                    Priority Scheduling (top to bottom)\n" +
    "                </div>\n" +
    "                <div class=\"panel-body\">\n" +
    "\n" +
    "                    <ul class=\"list-group\" ui-sortable=\"vm.sortableOptions\" ng-model=\"vm.shifts\">\n" +
    "                        <li class=\"list-group-item\" ng-repeat=\"item in vm.shifts\">\n" +
    "                            <div class=\"row\">\n" +
    "                                <div class=\"col-xs-5\">{{item.name}}</div>\n" +
    "                                <div class=\"col-xs-5\">{{item.staffing}}</div>\n" +
    "                                <div class=\"col-xs-2\">\n" +
    "                                    <i class=\"fa fa-ellipsis-v pull-right\"></i>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </li>\n" +
    "\n" +
    "                        <li class=\"list-group-item noRecords\" ng-show=\"vm.showListMsg\">\n" +
    "                            <div class=\"row\">\n" +
    "                                <div class=\"col-xs-12 text-center\">\n" +
    "                                    <i class=\"fa fa-spin\" ng-class=\"'fa-refresh'\"></i> {{vm.listMsg}}\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "");
}]);
