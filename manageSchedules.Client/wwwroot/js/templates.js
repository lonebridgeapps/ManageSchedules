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
    "    <h4>Employees</h4>\n" +
    "\n" +
    "    <div></div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-xs-12\">\n" +
    "        </div>\n" +
    "    </div>\n" +
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
    "                                    <label for=\"selEmpType\">Employee Type</label>\n" +
    "                                    <select class=\"form-control\" id=\"selEmpType\" ng-model=\"vm.emp.type\" required>\n" +
    "                                        <option value=\"1\">Server</option>\n" +
    "                                        <option value=\"2\">Busser</option>\n" +
    "                                        <option value=\"3\">Hostess</option>\n" +
    "                                        <option value=\"4\">Bartender</option>\n" +
    "                                        <option value=\"5\">Bar Back</option>\n" +
    "                                    </select>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
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
    "\n" +
    "                <a href=\"#\" class=\"list-group-item active\">\n" +
    "                    <p class=\"list-group-item-text\">Save shift options</p>\n" +
    "                    <p class=\"list-group-item-text\">Higlight changed items</p>\n" +
    "                </a>\n" +
    "\n" +
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
    "    .pIcon {\n" +
    "        padding-right: 10px;\n" +
    "    }\n" +
    "\n" +
    "    table td {\n" +
    "        padding:2px;\n" +
    "    }\n" +
    "\n" +
    "    #employeeDetails {\n" +
    "        color: #ffffff;\n" +
    "        width: 300px;\n" +
    "        height: 100%;\n" +
    "        z-index: 100;\n" +
    "        position: absolute;\n" +
    "        top: 0;\n" +
    "        right: 0;\n" +
    "        padding: 15px;\n" +
    "\n" +
    "        /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#000000+0,000000+100&0.65+84,0+100 */\n" +
    "        background: -moz-linear-gradient(rgba(0,0,0,0.85) 100%, rgba(0,0,0,0.85) 100%, rgba(0,0,0,0) 100%); /* FF3.6-15 */\n" +
    "        background: -webkit-linear-gradient(rgba(0,0,0,0.85) 100%,rgba(0,0,0,0.85) 100%,rgba(0,0,0,0) 100%); /* Chrome10-25,Safari5.1-6 */\n" +
    "        background: linear-gradient(rgba(0,0,0,0.85) 100%,rgba(0,0,0,0.85) 100%,rgba(0,0,0,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n" +
    "\n" +
    "    }\n" +
    "\n" +
    "    #employeeDetails .header {\n" +
    "        font-size: 26px;\n" +
    "        font-weight: bold;\n" +
    "    }\n" +
    "\n" +
    "    #employeeDetails .btnCollapse {\n" +
    "        color: #ffffff;\n" +
    "    }\n" +
    "</style>\n" +
    "\n" +
    "<div id=\"employeeDetails\" ng-show=\"vm.showEmployeeDetails\">\n" +
    "    <div id=\"heading\" class=\"row\">\n" +
    "        <div class=\"col-xs-10\">\n" +
    "            employee name\n" +
    "        </div>\n" +
    "        <div class=\"col-xs-2 pull-right\">\n" +
    "            <a class=\"btnCollapse\" ng-click=\"vm.showEmployeeDetails = !vm.showEmployeeDetails\"><i class=\"fa fa-close\"></i></a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div id=\"scheduleWrapper\">\n" +
    "    <h4>Schedules</h4>\n" +
    "\n" +
    "    <div></div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-xs-12\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-xs-12\">\n" +
    "            <div class=\"panel panel-primary\">\n" +
    "                <div class=\"panel-heading\">\n" +
    "                    Staffing Statistics -\n" +
    "                    Week of: xx/xx/xxxx - xx/xx/xxxx\n" +
    "                    <div class=\"btn-group pull-right\">\n" +
    "                        <button type=\"button\" class=\"btn btn-primary btn-sm\" ng-click=\"vm.showStaffStats = !vm.showStaffStats\">\n" +
    "                            <i class=\"fa\" ng-class=\"{'fa-plus':!vm.showStaffStats, 'fa-minus':vm.showStaffStats}\"></i>\n" +
    "                        </button>\n" +
    "                    </div>\n" +
    "                    <div class=\"clearfix\"></div>\n" +
    "                </div>\n" +
    "                <div class=\"panel-body\" ng-show=\"vm.showStaffStats\">\n" +
    "                    <div>\n" +
    "                        <h4>AM Shifts</h4>\n" +
    "                        <nvd3 options=\"vm.chartOptions\" data=\"vm.chartDataAM\"></nvd3>\n" +
    "                    </div>\n" +
    "                    <div>\n" +
    "                        <h4>PM Shifts</h4>\n" +
    "                        <nvd3 options=\"vm.chartOptions\" data=\"vm.chartDataPM\"></nvd3>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-xs-12\">\n" +
    "            <div class=\"panel panel-primary\">\n" +
    "                <div class=\"panel-heading\">\n" +
    "                    Week of: xx/xx/xxxx - xx/xx/xxxx <button type=\"button\" class=\"btn btn-primary btn-sm\" ng-click=\"\"><i class=\"fa fa-caret-down\"></i> </button>\n" +
    "                    <div class=\"btn-group pull-right\">\n" +
    "                        <button type=\"button\" class=\"btn btn-primary btn-sm\" ng-click=\"\">Run <i class=\"fa fa-arrow-right\"></i> </button>\n" +
    "                    </div>\n" +
    "                    <div class=\"clearfix\"></div>\n" +
    "                </div>\n" +
    "                <div class=\"panel-body\">\n" +
    "\n" +
    "                    <table class=\"table table-striped\">\n" +
    "                        <thead>\n" +
    "                            <tr class=\"\">\n" +
    "                                <th class=\"text-center\">Employee</th>\n" +
    "                                <th class=\"text-center\"><button type=\"button\" class=\"btn btn-default btn-block\">Sun</button></th>\n" +
    "                                <th class=\"text-center\"><button type=\"button\" class=\"btn btn-default btn-block\">Mon</button></th>\n" +
    "                                <th class=\"text-center\"><button type=\"button\" class=\"btn btn-default btn-block\">Tue</button></th>\n" +
    "                                <th class=\"text-center\"><button type=\"button\" class=\"btn btn-default btn-block\">Wed</button></th>\n" +
    "                                <th class=\"text-center\"><button type=\"button\" class=\"btn btn-default btn-block\">Thu</button></th>\n" +
    "                                <th class=\"text-center\"><button type=\"button\" class=\"btn btn-default btn-block\">Fri</button></th>\n" +
    "                                <th class=\"text-center\"><button type=\"button\" class=\"btn btn-default btn-block\">Sat</button></th>\n" +
    "                                <th class=\"text-center\">Totals</th>\n" +
    "                            </tr>\n" +
    "                           \n" +
    "                        </thead>\n" +
    "                        <tbody>\n" +
    "                        <tr ng-repeat=\"i in vm.employee\">\n" +
    "                            <!-- employee cell -->\n" +
    "                            <td class=\"text-left\">\n" +
    "                                <a class=\"btn btn-default btn-block\" ng-click=\"vm.showEmployeeDetails = !vm.showEmployeeDetails\">\n" +
    "                                    <i class=\"fa fa-user-circle pIcon\"></i> {{i.name}}\n" +
    "                                </a>\n" +
    "                            </td>\n" +
    "\n" +
    "                            <!-- days of week cells -->\n" +
    "                            <td>\n" +
    "                                <a class=\"btn btn-block\" ng-class=\"'btn-default'\" ng-click=\"vm.updSchedule()\">\n" +
    "                                    <i class=\"fa\" ng-class=\"'fa-times-circle-o'\"></i> \n" +
    "                                </a>\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                <a class=\"btn btn-block\" ng-class=\"'btn-default'\" ng-click=\"vm.updSchedule()\">\n" +
    "                                    <i class=\"fa\" ng-class=\"'fa-plus'\"></i> \n" +
    "                                </a>\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                <a class=\"btn btn-block\" ng-class=\"'btn-default'\" ng-click=\"vm.updSchedule()\">\n" +
    "                                    <i class=\"fa\" ng-class=\"'fa-plus-square-o'\"></i>\n" +
    "                                </a>\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                <a class=\"btn btn-block\" ng-class=\"'btn-default'\" ng-click=\"vm.updSchedule()\">\n" +
    "                                    <i class=\"fa\" ng-class=\"'fa-plus-circle'\"></i>\n" +
    "                                </a>\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                <a class=\"btn btn-block\" ng-class=\"'btn-default'\" ng-click=\"vm.updSchedule()\">\n" +
    "                                    <i class=\"fa\" ng-class=\"'fa-plus-square'\"></i>\n" +
    "                                </a>\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                <a class=\"btn btn-block\" ng-class=\"'btn-default'\" ng-click=\"vm.updSchedule()\">\n" +
    "                                    <i class=\"fa\" ng-class=\"'fa-times-circle'\"></i>\n" +
    "                                </a>\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                <a class=\"btn btn-block\" ng-class=\"'btn-default'\" ng-click=\"vm.updSchedule()\">\n" +
    "                                    <i class=\"fa\" ng-class=\"'fa-window-close'\"></i>\n" +
    "                                </a>\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                <a class=\"btn btn-default btn-block\"><i class=\"fa fa-calendar-o \"></i> {{i.shifts}}</a>\n" +
    "                            </td>\n" +
    "                        </tr>\n" +
    "                        </tbody>\n" +
    "                    </table>\n" +
    "\n" +
    "\n" +
    "                <!--\n" +
    "                <table class=\"table table-striped text-center\">\n" +
    "                    <thead>\n" +
    "                    <tr class=\"text-center\">\n" +
    "                        <th class=\"text-center\">Employee</th>\n" +
    "                        <th class=\"text-center\">Sun</th>\n" +
    "                        <th class=\"text-center\">Mon</th>\n" +
    "                        <th class=\"text-center\">Tue</th>\n" +
    "                        <th class=\"text-center\">Wed</th>\n" +
    "                        <th class=\"text-center\">Thu</th>\n" +
    "                        <th class=\"text-center\">Fri</th>\n" +
    "                        <th class=\"text-center\">Sat</th>\n" +
    "                        <th class=\"text-center\">Totals</th>\n" +
    "                    </tr>\n" +
    "                    </thead>\n" +
    "                    <tbody>\n" +
    "                    <tr ng-repeat=\"x in vm.employeeObj\">\n" +
    "                        <td>\n" +
    "                            <a class=\"btn btn-block\" ng-class=\"\" ng-click=\"\">\n" +
    "                                <h5 class=\"\">{{x.name}}</h5>\n" +
    "                                <div class=\"\">available</div>\n" +
    "                                <div class=\"\">scheduled</div>\n" +
    "                            </a>\n" +
    "                        </td>\n" +
    "\n" +
    "                        <td ng-repeat=\"z in x.day\">\n" +
    "                            <a class=\"btn btn-block\" ng-class=\"vm.getStatusColor($parent.$index, $index, 0)\" ng-click=\"vm.updSchedule($parent.$index, $index, 0)\">\n" +
    "                                <i class=\"fa\" ng-class=\"vm.getStatusIcon($parent.$index, $index, 0)\"></i> {{z.shift[0].name}}\n" +
    "                            </a>\n" +
    "                            <a class=\"btn btn-block\" ng-class=\"vm.getStatusColor($parent.$index, $index, 1)\" ng-click=\"vm.updSchedule($parent.$index, $index, 1)\">\n" +
    "                                <i class=\"fa\" ng-class=\"vm.getStatusIcon($parent.$index, $index, 1)\"></i> {{z.shift[1].name}}\n" +
    "                            </a>\n" +
    "                        </td>\n" +
    "\n" +
    "                        <td>\n" +
    "                            <a class=\"btn btn-default btn-block\"><i class=\"fa fa-calendar-o \"></i> 0</a>\n" +
    "                            <a class=\"btn btn-default btn-block\"><i class=\"fa fa-calendar-o \"></i> 0</a>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    </tbody>\n" +
    "                </table>\n" +
    "                 -->\n" +
    "\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
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
    "                                <div class=\"col-xs-1\">\n" +
    "                                    <i class=\"fa fa-ellipsis-v pull-left\"></i>\n" +
    "                                </div>\n" +
    "                                <div class=\"col-xs-6\">{{item.name}}</div>\n" +
    "                                <div class=\"col-xs-5\">{{item.staff}}</div>\n" +
    "\n" +
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
