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
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "            <div class=\"panel panel-primary\">\n" +
    "                <div class=\"panel-heading\">\n" +
    "                    Manage Employee\n" +
    "                </div>\n" +
    "                <div class=\"panel-body\">\n" +
    "                    <form id=\"frmEmployee\" name=\"frmEmployee\" ng-submit=\"vm.saveEmployee(frmEmployee.$valid)\">\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-xs-12 col-sm-6\">\n" +
    "                                <div class=\"form-group\">\n" +
    "                                    <label for=\"txtName\">Employee Name</label>\n" +
    "                                    <input type=\"text\" class=\"form-control\" id=\"txtName\" placeholder=\"Name\" ng-model=\"vm.emp.name\" required>\n" +
    "                                </div>\n" +
    "\n" +
    "                                <div class=\"row\">\n" +
    "                                    <div class=\"col-sm-6 col-xs-12\">\n" +
    "                                        <div class=\"form-group\">\n" +
    "                                            <label for=\"selEmpType\">Employee Type</label>\n" +
    "                                            <select class=\"form-control\" id=\"selEmpType\" ng-model=\"vm.emp.type\" required>\n" +
    "                                                <option value=\"1\">Server</option>\n" +
    "                                                <option value=\"2\">Busser</option>\n" +
    "                                                <option value=\"3\">Hostess</option>\n" +
    "                                                <option value=\"4\">Bartender</option>\n" +
    "                                                <option value=\"5\">Bar Back</option>\n" +
    "                                            </select>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    \n" +
    "                                    <div class=\"col-sm-6 col-xs-12\">\n" +
    "                                        <div class=\"form-group\">\n" +
    "                                            <label for=\"txtHireDate\">Hire Date</label>\n" +
    "                                            <input type=\"date\" class=\"form-control\" id=\"txtHireDate\" placeholder=\"Hire Date\" ng-model=\"vm.emp.hiredate\">\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "\n" +
    "                                <div class=\"row\">\n" +
    "                                    <div class=\"col-sm-12 col-xs-12\">\n" +
    "                                        <div class=\"form-group\">\n" +
    "                                            <label for=\"txtEmail\">Email</label>\n" +
    "                                            <input type=\"email\" class=\"form-control\" id=\"txtEmail\" placeholder=\"someone@email.com\" ng-model=\"vm.emp.email\">\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "\n" +
    "                                <div class=\"row\">\n" +
    "                                    <div class=\"col-sm-6 col-xs-12\">\n" +
    "                                        <div class=\"form-group\">\n" +
    "                                            <label for=\"txtShifts\">Total Shifts</label>\n" +
    "                                            <input type=\"number\" class=\"form-control\" id=\"txtShifts\" placeholder=\"Total Shifts\" ng-model=\"vm.emp.shifts\" required>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "\n" +
    "                                    <div class=\"col-sm-6 col-xs-12\">\n" +
    "                                        <div class=\"form-group\">\n" +
    "                                            <label for=\"txtHours\">Total Hours</label>\n" +
    "                                            <input type=\"number\" class=\"form-control\" id=\"txtHours\" placeholder=\"Total Hours\" ng-model=\"vm.emp.hours\" required>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "\n" +
    "                            </div>\n" +
    "                            \n" +
    "                            \n" +
    "                            <div class=\"col-sm-6 col-xs-12\">\n" +
    "                                <label for=\"lstShifts\">Shift Availability</label>\n" +
    "                                <div class=\"list-group\">\n" +
    "                                    <a class=\"list-group-item text-center\">Select shift availablity</a>\n" +
    "                                    <a class=\"list-group-item\" ng-click=\"vm.toggleAllShifts()\">\n" +
    "                                        <div class=\"row\">\n" +
    "                                            <div class=\"col-xs-4 text-center text-success\">\n" +
    "                                                <i class=\"fa\" ng-class=\"vm.shifts.length != vm.emp.availableShift.length ? 'fa-check' : 'fa-square-o'\"></i>\n" +
    "                                            </div>\n" +
    "                                            <div class=\"col-xs-8\">{{vm.massSelection}}</div>\n" +
    "                                        </div>\n" +
    "                                    </a>\n" +
    "                                    <a class=\"list-group-item\" ng-repeat=\"sItem in vm.shifts\" ng-click=\"vm.toggleShift(sItem.shiftid)\">\n" +
    "                                        <div class=\"row\">\n" +
    "                                            <div class=\"col-xs-4 text-center text-success\">\n" +
    "                                                <i class=\"fa\" ng-class=\"vm.emp.availableShift.indexOf(sItem.shiftid) >= 0 ? 'fa-check' : 'fa-square-o'\"></i>\n" +
    "                                            </div>\n" +
    "                                            <div class=\"col-xs-8\">{{sItem.name}}</div>\n" +
    "                                        </div>\n" +
    "                                    </a>\n" +
    "                                </div>\n" +
    "\n" +
    "                            </div>\n" +
    "                            \n" +
    "\n" +
    "                        </div>\n" +
    "                        \n" +
    "\n" +
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
    "        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    \n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "            <div class=\"panel panel-primary\">\n" +
    "                <div class=\"panel-heading\">\n" +
    "                    Employees\n" +
    "                    <span class=\"badge pull-right\">{{vm.empCount}}</span>\n" +
    "                </div>\n" +
    "                <div class=\"panel-body\">\n" +
    "\n" +
    "                    <div class=\"list-group\">\n" +
    "                        <div class=\"list-group-item\">\n" +
    "                            <div class=\"input-group\">\n" +
    "                                <span class=\"input-group-addon\">\n" +
    "                                    <i class=\"fa fa-search\"></i>\n" +
    "                                </span>\n" +
    "                                <input type=\"text\" class=\"form-control\" id=\"txtEmployeeSearch\" name=\"txtEmployeeSearch\" placeholder=\"employee search\" ng-model=\"empSearch\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"list-group-item\" ng-repeat=\"items in vm.employee | filter: empSearch\">\n" +
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
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
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
    "    .main-container {\n" +
    "        padding-top: 60px;\n" +
    "    }\n" +
    "\n" +
    "    .btn-muted {\n" +
    "        color: #dedede;\n" +
    "        background-color: #fff;\n" +
    "        border-color: #ccc;\n" +
    "    }\n" +
    "\n" +
    "    .btn-avail {\n" +
    "      color: #337ab7;\n" +
    "      background-color: #fff;\n" +
    "      border-color: #337ab7;\n" +
    "    }\n" +
    "\n" +
    "    .btn-scheduled {\n" +
    "        color: #3c763d;\n" +
    "        background-color: #fff;\n" +
    "        border-color :#3c763d;\n" +
    "    }\n" +
    "\n" +
    "    .btn-requestOff {\n" +
    "        color: #a94442;\n" +
    "        background-color: #fff;\n" +
    "        border-color :#a94442;\n" +
    "    }\n" +
    "        \n" +
    "    .loadingBar {\n" +
    "        padding: 20px;\n" +
    "        background-color: #696969;\n" +
    "        color: #ffffff;\n" +
    "    }\n" +
    "\n" +
    "    .siteDetail {\n" +
    "        text-align: center;\n" +
    "        border: solid 1px #696969;\n" +
    "        padding: 5px 0;\n" +
    "    }\n" +
    "\n" +
    "    .siteDetail__section {\n" +
    "        padding: 10px;\n" +
    "        font-weight: bold;\n" +
    "    }\n" +
    "\n" +
    "</style>\n" +
    "\n" +
    "<nav class=\"navbar navbar-inverse navbar-fixed-top\">\n" +
    "    <div class=\"container-fluid\">\n" +
    "        <div class=\"navbar-header\">\n" +
    "            <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\n" +
    "                <span class=\"sr-only\">Toggle navigation</span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "            </button>\n" +
    "            \n" +
    "            <a class=\"navbar-brand\" href=\"#\">Tru Staff</a>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"collapse navbar-collapse\">\n" +
    "            <ul class=\"nav navbar-nav\">\n" +
    "                <li>\n" +
    "                    <a ui-sref=\"main.schedule\">\n" +
    "                        <i class=\"fa fa-calendar-o\"></i> Schedules\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <a ui-sref=\"main.shift\">\n" +
    "                        <i class=\"fa fa-clock-o\"></i> Shifts\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <a ui-sref=\"main.employee\">\n" +
    "                        <i class=\"fa fa-users\"></i> Employees\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <a ng-click=\"vm.createDb()\">\n" +
    "                        <i class=\"fa fa-database\"></i> Create Database\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "    \n" +
    "</nav>\n" +
    "\n" +
    "<div class=\"container-fluid main-container\">\n" +
    "    \n" +
    "    <div class=\"row loadingBar\" ng-show=\"vm.showLoadingBar\">\n" +
    "        <div class=\"col-xs-12 text-center\">\n" +
    "            <i class=\"fa fa-gear fa-spin\"></i> {{vm.headerMsg}}\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div id=\"sideNavWrapper\" class=\"hidden-xs col-sm-4 col-md-3 \">\n" +
    "            <!--  -->\n" +
    "            <div class=\"siteDetail\">\n" +
    "                <div class=\"siteDetail__section\"><i class=\"fa fa-3x fa-calendar\"></i></div>\n" +
    "                <div class=\"siteDetail__section\">Tru Staff</div>\n" +
    "            </div>\n" +
    "            \n" +
    "            <div class=\"siteNav\">\n" +
    "                <ul class=\"nav nav-pills nav-stacked\">\n" +
    "                    <li ui-sref-active=\"active\"><a ui-sref=\"main.schedule\"><i class=\"fa fa-calendar-o\"></i> Schedules</a></li>\n" +
    "                    <li ui-sref-active=\"active\"><a ui-sref=\"main.shift\"><i class=\"fa fa-clock-o\"></i> Shifts</a></liui-sref-active=\"active\">\n" +
    "                    <li ui-sref-active=\"active\"><a ui-sref=\"main.employee\"><i class=\"fa fa-users\"></i> Employees</a></li>\n" +
    "                    <li><a ng-click=\"vm.createDb()\"><i class=\"fa fa-database\"></i> Create Database</a></li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <!--<a id=\"scheduleLegend\" class=\"list-group-item\" ng-if=\"vm.isCurrentState('main.schedule');\">\n" +
    "                <p>Scheduling Legend</p>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-xs-12 text-primary\">\n" +
    "                        <i class=\"fa fa-square\"></i> Available\n" +
    "                    </div>\n" +
    "                    <div class=\"col-xs-12 text-success\">\n" +
    "                        <i class=\"fa fa-square\"></i> Scheduled\n" +
    "                    </div>\n" +
    "                    <div class=\"col-xs-12 text-danger\">\n" +
    "                        <i class=\"fa fa-square\"></i> Request Off\n" +
    "                    </div>\n" +
    "                    <div class=\"col-xs-12 text-muted\">\n" +
    "                        <i class=\"fa fa-square\"></i> Unavailable\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </a>-->\n" +
    "\n" +
    "</div>\n" +
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
    "    .schedule-wrapper {\n" +
    "        font-size: 12px;\n" +
    "    }\n" +
    "\n" +
    "     .gridbox {\n" +
    "         margin-top: 2px;\n" +
    "     }\n" +
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
    "    .btnCollapse {\n" +
    "        color: #fff;\n" +
    "        font-weight: bold;\n" +
    "    }\n" +
    "\n" +
    "    table td {\n" +
    "        padding:2px;\n" +
    "    }\n" +
    "\n" +
    "    #panel-body-modal {\n" +
    "        position: absolute;\n" +
    "        top: 50px;\n" +
    "        right: 30px;\n" +
    "        width: 300px;\n" +
    "        z-index: 100;\n" +
    "        background-color: #fff;\n" +
    "        /*border-top: 1px solid #ffffff;*/\n" +
    "        border-left: 7px solid #5cb85c; /*337ab7*/\n" +
    "        border-right: 1px solid #696969;\n" +
    "        border-bottom: 1px solid #696969;\n" +
    "    }\n" +
    "\n" +
    "    .panel-body-modal-header {\n" +
    "        background-color: #5cb85c;\n" +
    "        color: #fff;\n" +
    "        font-weight: bold;\n" +
    "    }\n" +
    "\n" +
    "    .runScheduleToolBar {\n" +
    "        background-color: #f9f9f9;\n" +
    "        padding: 10px;\n" +
    "        position: relative;\n" +
    "        top: -15px;\n" +
    "    }\n" +
    "\n" +
    "    .date-dayOfWeek {\n" +
    "        font-weight: bold;\n" +
    "        text-transform: uppercase;\n" +
    "    }\n" +
    "\n" +
    "    .table-employee-name {\n" +
    "        color: darkgray;\n" +
    "        font-weight: bold;\n" +
    "    }\n" +
    "\n" +
    "    .table__schedule-detail-text {\n" +
    "        color: #3c763d;\n" +
    "        font-weight: bold;\n" +
    "    }\n" +
    "\n" +
    "    .no-show {\n" +
    "        display: none;\n" +
    "    }\n" +
    "\n" +
    "</style>\n" +
    "\n" +
    "<div id=\"scheduleWrapper\" class=\"schedule-wrapper\">\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-xs-12\">\n" +
    "            <div class=\"panel panel-primary\">\n" +
    "                <div class=\"panel-heading\">\n" +
    "                    <button type=\"button\" class=\"btn btn-primary btn-sm\" ng-click=\"vm.showStaffStats = !vm.showStaffStats\">\n" +
    "                        <i class=\"fa\" ng-class=\"{'fa-plus':!vm.showStaffStats, 'fa-minus':vm.showStaffStats}\"></i>\n" +
    "                    </button>\n" +
    "                    Staffing Statistics -\n" +
    "                    Week of: xx/xx/xxxx - xx/xx/xxxx\n" +
    "                </div>\n" +
    "                <div class=\"panel-body\" ng-show=\"vm.showStaffStats\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"shiftStats col-xs-12 col-sm-6\">\n" +
    "                            <ul>\n" +
    "                                <li ng-repeat=\"s in vm.shifts\">\n" +
    "                                    {{s.name}} : {{s.details}} : {{s.staffScheduled}} / {{s.staffRequirements}}\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                            <p>maybe utilize stacked column charts to display shifts needing staffing</p>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"empStats col-xs-12 col-sm-6\">\n" +
    "                            <p>show employees scheduled off</p>\n" +
    "                            <p>average hours scheduled per employee</p>\n" +
    "                            <p>staffing ratios (both shifts and days)</p>\n" +
    "                        </div>\n" +
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
    "                    \n" +
    "                    <button type=\"button\" class=\"btn btn-primary btn-sm pull-right\" ng-click=\"\">\n" +
    "                        <i class=\"fa fa-pie-chart\"></i> Refine Shifts\n" +
    "                    </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-primary btn-sm pull-right\" ng-click=\"\">\n" +
    "                        <i class=\"fa fa-bar-chart\"></i> Analysis\n" +
    "                    </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-primary btn-sm pull-right\" ng-click=\"vm.getSchedules()\">\n" +
    "                        <i class=\"fa fa-calendar-o\"></i> Run\n" +
    "                    </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-primary btn-sm pull-right\" ng-click=\"\">\n" +
    "                        <i class=\"fa fa-refresh\"></i> Refresh\n" +
    "                    </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-primary btn-sm pull-right\" ng-click=\"\">\n" +
    "                        <i class=\"fa fa-download\"></i> Export\n" +
    "                    </button>\n" +
    "                    <div class=\"clearfix\"></div>\n" +
    "                </div>\n" +
    "                <div class=\"panel-body\" > <!-- style=\"max-height: 700px; overflow-y: scroll;\" -->\n" +
    "                    <!-- modal popup box -->\n" +
    "                    <div id=\"panel-body-modal\" class=\"row\" ng-show=\"vm.showEmployeeDetails\">\n" +
    "                        <div class=\"col-xs-12\">\n" +
    "                            employee name\n" +
    "                        </div>\n" +
    "                        <div class=\"list-group\">\n" +
    "                            <div id=\"header\" class=\"list-group-item panel-body-modal-header\">\n" +
    "                                <div class=\"row\">\n" +
    "                                    <div class=\"col-xs-9\">\n" +
    "                                        {{vm.employeeDetail[0].name}}\n" +
    "                                    </div>\n" +
    "                                    <div class=\"col-xs-3 text-center\">\n" +
    "                                        <a class=\"btn btn-success btn-sm\" ng-click=\"vm.showEmployeeDetails = !vm.showEmployeeDetails\">\n" +
    "                                            <i class=\"fa fa-caret-up\"></i>\n" +
    "                                        </a>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <div class=\"list-group-item\" ng-repeat=\"d in vm.employeeDetail[0].schedule\">\n" +
    "                                <div class=\"row\">\n" +
    "                                    <div class=\"col-xs-3\" style=\"padding-top: 10px;\">\n" +
    "                                        <i class=\"fa fa-2x\" ng-class=\"d.iconClass\"></i>\n" +
    "                                        <div>{{d.detail}}</div>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"col-xs-9\">\n" +
    "                                        <span class=\"date-dayOfWeek\">{{}}</span>00/00/00\n" +
    "                                        <select class=\"form-control\" >\n" +
    "                                            <option value=\"0\">...</option>\n" +
    "                                            <option value=\"1\">AM Shift</option>\n" +
    "                                            <option value=\"2\">PM Shift</option>\n" +
    "                                            <option value=\"3\">Request Off</option>\n" +
    "                                            <option value=\"4\">Unavailable</option>\n" +
    "                                        </select>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <div>\n" +
    "                                   \n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <table class=\"table table-striped\">\n" +
    "                        <thead>\n" +
    "                            <tr>\n" +
    "                                <th>Employee \n" +
    "                                    <a ng-click=\"vm.toggleEmployeeDetails = !vm.toggleEmployeeDetails\">\n" +
    "                                        (<i ng-class=\"vm.toggleEmployeeDetails?'fa fa-minus':'fa fa fa-plus'\"></i> Details)\n" +
    "                                    </a>\n" +
    "                                </th>\n" +
    "                                <th ng-show=\"vm.toggleEmployeeDetails\">Days</th>\n" +
    "                                <th ng-show=\"vm.toggleEmployeeDetails\">Shifts</th>\n" +
    "                                <th ng-show=\"vm.toggleEmployeeDetails\">Hours</th>\n" +
    "                                <th class=\"text-center\">Sun</th>\n" +
    "                                <th class=\"text-center\">Mon</th>\n" +
    "                                <th class=\"text-center\">Tue</th>\n" +
    "                                <th class=\"text-center\">Wed</th>\n" +
    "                                <th class=\"text-center\">Thu</th>\n" +
    "                                <th class=\"text-center\">Fri</th>\n" +
    "                                <th class=\"text-center\">Sat</th>\n" +
    "                                <th class=\"text-center\"></th>\n" +
    "                            </tr>\n" +
    "                        </thead>\n" +
    "                        <tbody>\n" +
    "                            <tr ng-repeat=\"i in vm.schedule | orderBy :'name'\" ng-click=\"vm.getEmployeeDetails($index)\">\n" +
    "                                <td class=\"table-employee-name\">\n" +
    "                                    <span ng-show=\"vm.toggleEmployeeDetails\">{{i.empid}} : </span>{{i.name}} {{}}\n" +
    "                                </td>\n" +
    "                                <td ng-show=\"vm.toggleEmployeeDetails\">\n" +
    "                                    {{i.scheduledDays}} / {{i.availableDays}}\n" +
    "                                </td>\n" +
    "                                <td ng-show=\"vm.toggleEmployeeDetails\">\n" +
    "                                    {{i.scheduledShifts}} / {{i.availableShifts}}\n" +
    "                                </td>\n" +
    "                                <td ng-show=\"vm.toggleEmployeeDetails\">\n" +
    "                                    {{i.scheduledHours}} / {{i.availableHours}}\n" +
    "                                </td>\n" +
    "\n" +
    "                                <td ng-repeat=\"s in i.dailyDetails\" class=\"text-center\">\n" +
    "                                    <div><i class=\"fa fa-2x\" ng-class=\"s.iconClass\"></i></div> \n" +
    "                                    <div class=\"table__schedule-detail-text emp-sub-details\">{{s.detail}}</div>\n" +
    "                                </td>\n" +
    "                            </tr>\n" +
    "                        </tbody>\n" +
    "                    </table>\n" +
    "                    \n" +
    "                    \n" +
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
    "\n" +
    "    .shift-form {\n" +
    "        border: solid 2px #337ab7;\n" +
    "        background-color: #ffffff;\n" +
    "    }\n" +
    "\n" +
    "    .shift-form__heading {\n" +
    "        font-size: 16px;\n" +
    "        font-weight: bold;\n" +
    "        color: #337ab7;\n" +
    "        padding: 0 15px;\n" +
    "         \n" +
    "    }\n" +
    "\n" +
    "    .shift-form__body {\n" +
    "        padding: 15px;\n" +
    "    }\n" +
    "\n" +
    "</style>\n" +
    "\n" +
    "\n" +
    "<div id=\"shiftWrapper\">\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\" col-sm-6 col-xs-12\">\n" +
    "            <!-- shift list -->\n" +
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
    "        \n" +
    "        <div class=\"col-sm-6 col-xs-12\">\n" +
    "            <!-- shift form -->\n" +
    "            <div class=\"shift-form\">\n" +
    "                <h2 class=\"shift-form__heading\">\n" +
    "                    <a class=\"fa fa-2x fa-list-alt\"></a>\n" +
    "                    Shift Form\n" +
    "                </h2>\n" +
    "                <div class=\"shift-form__body\">\n" +
    "                    <form id=\"frmShift\" name=\"frmShift\">\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label for=\"txtName\">Name</label>\n" +
    "                            <input type=\"text\" class=\"form-control\" id=\"txtName\" placeholder=\"Name\" ng-model=\"vm.shift.name\" required>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label for=\"txtDoW\">Day of Week</label>\n" +
    "                            <input type=\"text\" class=\"form-control\" id=\"txtDoW\" placeholder=\"Day of Week\" ng-model=\"vm.shift.dayid\" required>\n" +
    "                        </div>\n" +
    "                        \n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-xs-6\">\n" +
    "                                <div class=\"form-group\">\n" +
    "                                    <label for=\"txtStartTime\">Start Time</label>\n" +
    "                                    <input type=\"text\" class=\"form-control\" id=\"txtStartTime\" placeholder=\"Start Time\" ng-model=\"vm.shift.startTime\" required>\n" +
    "                                </div>   \n" +
    "                            </div>\n" +
    "                            <div class=\"col-xs-6\">\n" +
    "                                <div class=\"form-group\">\n" +
    "                                    <label for=\"txtEndTime\">End Time</label>\n" +
    "                                    <input type=\"text\" class=\"form-control\" id=\"txtEndTime\" placeholder=\"End Time\" ng-model=\"vm.shift.endTime\" required>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        \n" +
    "\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-xs-4\">\n" +
    "                                <div class=\"form-group\">\n" +
    "                                    <label for=\"txtHours\">Length (in hours)</label>\n" +
    "                                    <input type=\"number\" class=\"form-control\" id=\"txtHours\" placeholder=\"Shift Length\" ng-model=\"vm.shift.hours\" required>\n" +
    "                                </div> \n" +
    "                            </div>\n" +
    "                            <div class=\"col-xs-4\">\n" +
    "                                <div class=\"form-group\">\n" +
    "                                    <label for=\"txtSegment\">Segment</label>\n" +
    "                                    <input type=\"number\" class=\"form-control\" id=\"txtSegment\" placeholder=\"Segment\" ng-model=\"vm.shift.segment\" required>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <div class=\"col-xs-4\">\n" +
    "                                <div class=\"form-group\">\n" +
    "                                    <label for=\"txtOrder\">Priority</label>\n" +
    "                                    <input type=\"number\" class=\"form-control\" id=\"txtOrder\" placeholder=\"Priority\" ng-model=\"vm.shift.order\" required>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        \n" +
    "                        \n" +
    "                        \n" +
    "                        \n" +
    "                        \n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label for=\"txtNotes\">Notes</label>\n" +
    "                            <input type=\"text\" class=\"form-control\" id=\"txtNotes\" placeholder=\"Notes\" ng-model=\"vm.shift.notes\" required>\n" +
    "                        </div>\n" +
    "                       \n" +
    "                        <div>\n" +
    "                            <button type=\"submit\" class=\"btn btn-default\" ng-click=\"vm.resetForm()\"><i class=\"fa\" ng-class=\"'fa-undo'\"></i> Reset</button>\n" +
    "                            <button type=\"submit\" class=\"btn btn-success\" ng-disabled=\"frmShift.$invalid\"><i class=\"fa\" ng-class=\"'fa-save'\"></i> Save</button>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </form>\n" +
    "                </div>    \n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "");
}]);
