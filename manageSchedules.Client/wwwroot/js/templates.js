angular.module('templates-main', ['../app/main/main.html', '../app/schedule/schedule.html']);

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
    "        color: #808080;\n" +
    "        background-color: #b5b5b5;\n" +
    "        border-color: #808080;\n" +
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
    "</style>\n" +
    "\n" +
    "<div class=\"container-fluid\">\n" +
    "    <div class=\"row\">\n" +
    "        <div id=\"sideNavWrapper\" class=\"col-xs-12 col-sm-3 col-md-2\">\n" +
    "            <h4>Side Nav</h4>\n" +
    "            <div class=\"list-group\">\n" +
    "                <a class=\"list-group-item\" ui-sref=\"main.schedule\">Schedules link</a>\n" +
    "                <a href=\"#\" class=\"list-group-item active\">\n" +
    "                    <h4 class=\"list-group-item-heading\">Generate Steps</h4>\n" +
    "                    <p class=\"list-group-item-text\">Load Employee Data</p>\n" +
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
    "                            <div>scheduled: 0</div>\n" +
    "                            <div>available: {{x.ttlShifts}}</div>\n" +
    "                        </td>\n" +
    "                        <td>\n" +
    "                            <a class=\"btn btn-default btn-block\"><i class=\"fa fa-plus-circle \"></i> {{x.schedule.Sun.AM}}</a>\n" +
    "                            <a class=\"btn btn-default btn-block\"><i class=\"fa fa-plus-circle \"></i> {{x.schedule.Sun.PM}}</a>\n" +
    "                        </td>\n" +
    "                        <td>\n" +
    "                            <a class=\"btn btn-avail btn-block\" ng-click=\"vm.updSchedule($index, x.schedule.Mon.AM)\"><i class=\"fa fa-plus-circle \"></i> {{x.schedule.Mon.AM}}</a>\n" +
    "                            <a class=\"btn btn-default btn-block\"><i class=\"fa fa-plus-circle \"></i> {{x.schedule.Mon.PM}}</a>\n" +
    "                        </td>\n" +
    "                        <td>\n" +
    "                            <a class=\"btn btn-disabled btn-block\"><i class=\"fa fa-plus-circle \"></i> {{x.schedule.Tue.AM}}</a>\n" +
    "                            <a class=\"btn btn-default btn-block\"><i class=\"fa fa-plus-circle \"></i> {{x.schedule.Tue.PM}}</a>\n" +
    "                        </td>\n" +
    "                        <td>\n" +
    "                            <a class=\"btn btn-default btn-block\"><i class=\"fa fa-plus-circle \"></i> {{x.schedule.Wed.AM}}</a>\n" +
    "                            <a class=\"btn btn-default btn-block\"><i class=\"fa fa-plus-circle \"></i> {{x.schedule.Wed.PM}}</a>\n" +
    "                        </td>\n" +
    "                        <td>\n" +
    "                            <a class=\"btn btn-default btn-block\"><i class=\"fa fa-plus-circle \"></i> {{x.schedule.Thu.AM}}</a>\n" +
    "                            <a class=\"btn btn-default btn-block\"><i class=\"fa fa-plus-circle \"></i> {{x.schedule.Thu.PM}}</a>\n" +
    "                        </td>\n" +
    "                        <td>\n" +
    "                            <a class=\"btn btn-default btn-block\"><i class=\"fa fa-plus-circle \"></i> {{x.schedule.Fri.AM}}</a>\n" +
    "                            <a class=\"btn btn-default btn-block\"><i class=\"fa fa-plus-circle \"></i> {{x.schedule.Fri.PM}}</a>\n" +
    "                        </td>\n" +
    "                        <td>\n" +
    "                            <a class=\"btn btn-default btn-block\"><i class=\"fa fa-plus-circle \"></i> {{x.schedule.Sat.AM}}</a>\n" +
    "                            <a class=\"btn btn-default btn-block\"><i class=\"fa fa-plus-circle \"></i> {{x.schedule.Sat.PM}}</a>\n" +
    "                        </td>\n" +
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
