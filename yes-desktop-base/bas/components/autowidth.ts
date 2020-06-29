angular.module('app.core.layout')
    .directive('autoWidth', ['settings', '$timeout', '$window',
        function (settings, $timeout, $window) {
            // var _docHeight = document.documentElement.clientHeight;
            function resetwidth(scope, element, attr) {
                var width=element.parent().width();
                angular.element(element).width(width);
            }

            return {
                restrict: "A",
                link: function (scope, element, attr) {
                    scope.$on('layout-responsive:changed', function () {
                        resetwidth(scope, element, attr);
                    });
                }
            }
        }]);