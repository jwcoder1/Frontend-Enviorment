angular.module('app')
    .directive('gridCellRemark', function($compile, $templateCache, $http) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                ngModel: "=",
                form: "="
            },
            require: '^ngModel',
            templateUrl: 'plugins/bas/components/gridcellremark.html',
            controller: ['$rootScope', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                function($rootScope, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter) {
                    var scope = $scope;
                    // scope.gridField = scope.ngModel;
                    if (!scope.form.ngModelOptions) {
                        scope.form.ngModelOptions = {};
                    }

                    scope.dialog = function() {
                        var injector = angular.element(document).injector();
                        var ngDialog = injector.get('ngDialog');
                        var toastr = injector.get('toastr');
                        ngDialog.open({
                            className: "ngdialog-sm",
                            template: 'plugins/bas/components/remarkpop.html',
                            scope: $scope,
                            controller: function($scope) {}
                        })
                    }



                }
            ]


        }
    });