angular.module('app')
    .directive('onRepeat', ['$timeout', '$compile', function($timeout, $compile) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                scope.rowform = angular.copy(scope.form.items);
                if (scope.$first == true) {}
                if (scope.$last === true) {

                }
            }
        }

    }]);