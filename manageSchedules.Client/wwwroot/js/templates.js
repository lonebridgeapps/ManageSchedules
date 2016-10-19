angular.module('templates-main', ['../app/employee/employee.html', '../app/main/main.html', '../app/schedule/schedule.html', '../app/shift/shift.html']);

angular.module("../app/employee/employee.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/employee/employee.html",
    "<style>\n" +
    "    .panel {\n" +
    "        margin: 10px;\n" +
    "    }\n" +
    "    .alert {\n" +
    "        margin: 10px;\n" +
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
    "                    Add Employees\n" +
    "                </div>\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <form id=\"addEmployee\">\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label for=\"txtName\">Employee Name</label>\n" +
    "                            <input type=\"text\" class=\"form-control\" id=\"txtName\" placeholder=\"Name\" ng-model=\"vm.emp.name\">\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-sm-6\">\n" +
    "                                <div class=\"form-group\">\n" +
    "                                    <label for=\"txtHireDate\">Hire Date</label>\n" +
    "                                    <input type=\"date\" class=\"form-control\" id=\"txtHireDate\" placeholder=\"Hire Date\" ng-model=\"vm.emp.hiredate\">\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-6\">\n" +
    "                                <div class=\"form-group\">\n" +
    "                                    <label for=\"txtShifts\">Total Shifts</label>\n" +
    "                                    <input type=\"number\" class=\"form-control\" id=\"txtShifts\" placeholder=\"Total Shifts\" ng-model=\"vm.emp.shifts\">\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-xs-12\">\n" +
    "                                <div class=\"pull-right\">\n" +
    "                                    <button class=\"btn btn-success\" ng-click=\"vm.addEmployee()\"><i class=\"fa fa-plus\"></i> Add Employee</button>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"alert text-center\" ng-class=\"'alert-success'\">\n" +
    "                            <i class=\"fa\" ng-class=\"'fa-check-circle-o'\"></i> Successfully Added Employee!\n" +
    "                        </div>\n" +
    "\n" +
    "                    </form>\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            \n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-md-6\">\n" +
    "            <div class=\"panel panel-primary\">\n" +
    "                <div class=\"panel-heading\">\n" +
    "                    Employees <span class=\"badge pull-right\">0</span>\n" +
    "                </div>\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <div class=\"list-group\">\n" +
    "                        <div class=\"list-group-item\" ng-repeat=\"items in vm.employee\">\n" +
    "                            <div class=\"row\">\n" +
    "                                <div class=\"col-xs-3\">{{items.name}}</div>\n" +
    "                                <div class=\"col-xs-3\">{{items.hiredate}}</div>\n" +
    "                                <div class=\"col-xs-3\">{{items.shifts}}</div>\n" +
    "                                <div class=\"col-xs-3\">\n" +
    "                                    <button class=\"btn btn-danger pull-right\" ng-click=\"vm.deleteEmployee()\"><i class=\"fa fa-remove\"></i></button>\n" +
    "                                    <button class=\"btn btn-primary pull-right\" ng-click=\"vm.editEmployee()\"><i class=\"fa fa-pencil\"></i></button>\n" +
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
    "</style>\n" +
    "\n" +
    "<div class=\"container-fluid\">\n" +
    "    <div class=\"row\">\n" +
    "        <div id=\"sideNavWrapper\" class=\"col-xs-12 col-sm-3 col-md-2\">\n" +
    "            <h4>Side Nav</h4>\n" +
    "            <div class=\"list-group\">\n" +
    "                <a class=\"list-group-item\" ui-sref=\"main.schedule\">\n" +
    "                    <i class=\"fa fa-calendar-o\"></i> Schedules</a>\n" +
    "                <a class=\"list-group-item\" ui-sref=\"main.shift\">\n" +
    "                    <i class=\"fa fa-clock-o\"></i> Shifts</a>\n" +
    "                <a class=\"list-group-item\" ui-sref=\"main.employee\">\n" +
    "                    <i class=\"fa fa-users\"></i> Employees</a>\n" +
    "                <a href=\"#\" class=\"list-group-item active\">\n" +
    "                    <h4 class=\"list-group-item-heading\">Generate Steps</h4>\n" +
    "                    <p class=\"list-group-item-text\" style=\"text-decoration:line-through\">Load Employee Data</p>\n" +
    "                    <p class=\"list-group-item-text\">Add Employee Availability</p>\n" +
    "                    <p class=\"list-group-item-text\">Prioritize days / shifts</p>\n" +
    "                    <p class=\"list-group-item-text\">Populate shifts</p>\n" +
    "                    <p class=\"list-group-item-text\">Optimize shifts</p>\n" +
    "                </a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div id=\"mainContentWrapper\" class=\"col-xs-12 col-sm-9 col-md-10\">\n" +
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
    "            <table class=\"table table-striped text-center\">\n" +
    "                <thead>\n" +
    "                    <tr class=\"text-center\">\n" +
    "                        <th>Employee</th>\n" +
    "                        <th>Sun: 0 / 0</th>\n" +
    "                        <th>Mon: 0 / 0</th>\n" +
    "                        <th>Tue: 0 / 0</th>\n" +
    "                        <th>Wed: 0 / 0</th>\n" +
    "                        <th>Thu: 0 / 0</th>\n" +
    "                        <th>Fri: 0 / 0</th>\n" +
    "                        <th>Sat: 0 / 0</th>\n" +
    "                        <th>Totals</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                    <tr ng-repeat=\"x in vm.employeeObj\">\n" +
    "                        <td>\n" +
    "                            <h5 class=\"text-primary\">{{x.name}}</h5>\n" +
    "                            <div>scheduled: {{x.scheduled}}</div>\n" +
    "                            <div>available: {{x.available}}</div>\n" +
    "                        </td>\n" +
    "\n" +
    "                        <td ng-repeat=\"z in x.day\">\n" +
    "                            <a class=\"btn btn-block\" ng-class=\"vm.getStatusColor($parent.$index, $index, 0)\" ng-click=\"vm.updSchedule($parent.$index, $index, 0)\">\n" +
    "                                <i class=\"fa\" ng-class=\"vm.getStatusIcon($parent.$index, $index, 0)\"></i> {{z.shift[0].name}}</a>\n" +
    "                            <a class=\"btn btn-block\" ng-class=\"vm.getStatusColor($parent.$index, $index, 1)\" ng-click=\"vm.updSchedule($parent.$index, $index, 1)\">\n" +
    "                                <i class=\"fa\" ng-class=\"vm.getStatusIcon($parent.$index, $index, 1)\"></i> {{z.shift[1].name}}</a>\n" +
    "                        </td>\n" +
    "                        \n" +
    "                        <td>\n" +
    "                            <a class=\"btn btn-default btn-block\"><i class=\"fa fa-calendar-o \"></i> 0</a>\n" +
    "                            <a class=\"btn btn-default btn-block\"><i class=\"fa fa-calendar-o \"></i> 0</a>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    \n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/shift/shift.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/shift/shift.html",
    "<style>\n" +
    "\n" +
    "</style>\n" +
    "\n" +
    "\n" +
    "<div id=\"shiftWrapper\">\n" +
    "    <h4>Shifts</h4>\n" +
    "\n" +
    "    <div></div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-xs-12\">\n" +
    "            \n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    \n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "");
}]);
