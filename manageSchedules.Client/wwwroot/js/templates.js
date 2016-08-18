angular.module('templates-main', ['../app/main/main.html', '../app/schedule/schedule.html']);

angular.module("../app/main/main.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/main/main.html",
    "<h2>Main</h2>\n" +
    "<div ui-view></div>\n" +
    "\n" +
    "<a ui-sref=\"main.schedule\">Schedules link</a>\n" +
    "\n" +
    "<div class=\"alert alert-info\">Testing Bootstrap</div>");
}]);

angular.module("../app/schedule/schedule.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/schedule/schedule.html",
    "<div id=\"scheduleWrapper\" class=\"container\">\n" +
    "    <h2>Schedules</h2>\n" +
    "\n" +
    "    <div class=\"row text-center text-primary\">\n" +
    "        <div class=\"col-xs-2\">Employee Name</div>\n" +
    "        <div class=\"col-xs-1\">Sunday</div>\n" +
    "        <div class=\"col-xs-1\">Monday </div>\n" +
    "        <div class=\"col-xs-1\">Tuesday</div>\n" +
    "        <div class=\"col-xs-1\">Wednesday</div>\n" +
    "        <div class=\"col-xs-1\">Thursday </div>\n" +
    "        <div class=\"col-xs-1\">Friday</div>\n" +
    "        <div class=\"col-xs-1\">Saturday</div>\n" +
    "        <div class=\"col-xs-1\">Totals</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\" style=\"height:50px;\">\n" +
    "        <div class=\"col-xs-2\" style=\"vertical-align:middle\">Name</div>\n" +
    "        <div class=\"col-xs-1 text-center\">\n" +
    "            <a><i class=\"fa fa-plus-circle fa-2x\"></i></a>\n" +
    "        </div>\n" +
    "        <div class=\"col-xs-1 text-center\">\n" +
    "            <a><i class=\"fa fa-plus-circle fa-2x\"></i></a>\n" +
    "        </div>\n" +
    "        <div class=\"col-xs-1 text-center\">\n" +
    "            <a><i class=\"fa fa-plus-circle fa-2x\"></i></a>\n" +
    "        </div>\n" +
    "        <div class=\"col-xs-1 text-center\">\n" +
    "            <a><i class=\"fa fa-plus-circle fa-2x\"></i></a>\n" +
    "        </div>\n" +
    "        <div class=\"col-xs-1 text-center\">\n" +
    "            <a><i class=\"fa fa-plus-circle fa-2x\"></i></a>\n" +
    "        </div>\n" +
    "        <div class=\"col-xs-1 text-center\">\n" +
    "            <a><i class=\"fa fa-plus-circle fa-2x\"></i></a>\n" +
    "        </div>\n" +
    "        <div class=\"col-xs-1 text-center\">\n" +
    "            <a><i class=\"fa fa-plus-circle fa-2x\"></i></a>\n" +
    "        </div>\n" +
    "        <div class=\"col-xs-1 text-center\">\n" +
    "            <div>0</div>\n" +
    "            <div>0</div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);
