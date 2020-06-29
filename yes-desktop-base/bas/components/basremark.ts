angular.module('app')
    .directive('basRemark', function ($compile, $templateCache, $http) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                ngModel: "=",
                form: "="
            },
            require: '^ngModel',
            templateUrl: 'plugins/bas/components/basremark.html',
            controller: ['$rootScope', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                function ($rootScope, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter) {
                    var scope = $scope;
                    if (!scope.form.ngModelOptions) {
                        scope.form.ngModelOptions = {};
                    }
                   
                    // scope.model = {
                    //     field: scope.ngModel
                    // }

                    // scope.$watch('model.field', function (newValue, oldValue) {
                    //     scope.ngModel = newValue;
                    // }, true); ///

                    // scope.$watch('ngModel', function (newValue, oldValue) {
                    //     scope.model.field = newValue;
                    // }, true); ///
                  //  scope.remarktemplateUrl="plugins/bas/components/remarkpop.html"


                    scope.dialog = function() {
                         
                            
                            var injector = angular.element(document).injector();
                            var ngDialog = injector.get('ngDialog');
                            var toastr = injector.get('toastr');
                            ngDialog.open({
                                className: "ngdialog-sm",
                                template: 'plugins/bas/components/remarkpop.html',
                                scope: $scope,
                                controller: function($scope) {
                                }
                            })
                        }



                }]
        }
    });