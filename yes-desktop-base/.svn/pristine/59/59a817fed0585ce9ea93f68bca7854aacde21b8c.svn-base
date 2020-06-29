angular.module('app')
    .directive('checkboxs', function($compile, $templateCache, $http) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                ngModel: "=",
                option: "="
            },
            require: '^ngModel',
            templateUrl: 'plugins/bas/components/checkboxs.html',
            controller: ['$rootScope', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                function($rootScope, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter) {
                    var scope = $scope;
                    scope.fieldval = [];
                    scope.$watch('ngModel', function(newValue, oldValue) {
                        if (angular.isUndefined(newValue)) {
                            scope.fieldval = [];
                        }
                        if (!angular.isUndefined(newValue) && newValue) {
                            scope.fieldval = newValue.split(",");
                        }


                    }, true); ///

                    scope.$watch('fieldval', function(newValue, oldValue) {
                        if (newValue.length > 0) {
                            scope.ngModel = newValue.join(",");
                        } else if (!angular.isUndefined(scope.ngModel)) {
                            scope.ngModel = "";
                        }

                    }, true); ///








                }
            ]
        }
    });