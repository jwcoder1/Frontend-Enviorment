angular.module('app').directive('jqChart', ['$timeout', function ($timeout) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            config: '='
        },
        template: "<div class='jq-chart'></div>",
        link: function (scope, element, attr) {
            var render = function () {
                if (scope.config && element.highcharts) {
                    $timeout(
                        function () {
                            element.highcharts(scope.config);
                        }, 0
                    );
                }
            }
            scope.$watchCollection('config', function () {
                render();
            });
        }
    };
}]); 