angular.module('templates-main', ['../app/main/main.html']);

angular.module("../app/main/main.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/main/main.html",
    "<h2>Main</h2>\n" +
    "");
}]);
