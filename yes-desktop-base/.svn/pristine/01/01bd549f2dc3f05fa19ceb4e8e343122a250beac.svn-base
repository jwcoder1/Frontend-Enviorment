angular.module('app')
    .directive('basString', function ($compile, $templateCache, $http) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                ngModel: "=",
                form: "="
            },
            require: '^ngModel',
            templateUrl: 'plugins/bas/components/basstring.html',
            controller: ['$rootScope', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                function ($rootScope, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter) {
                    var scope = $scope;

                    scope.model = {
                        field: scope.ngModel
                    }

                    scope.$watch('model.field', function (newValue, oldValue) {

                        scope.ngModel = newValue;

                    }, true); ///

                    scope.$watch('ngModel', function (newValue, oldValue) {

                        scope.model.field = newValue;

                    }, true); ///

                    scope.$watch('$parent.model.formstatus', function (newValue, oldValue) {

                        var formstatus = "00";//初始状态
                        if (newValue) {
                            formstatus = newValue;
                        }
                        if (formstatus == "99") {
                            scope.form.readonly = true;
                        } else {
                            if (scope.form.readonlystatus) {
                                var readonlystatus = scope.form.readonlystatus.split(",");
                                var readonly = false;
                                readonlystatus.forEach( function(element) {
                                    if (element == formstatus) {
                                        readonly = true;
                                    }
                                });
                                scope.form.readonly = readonly;
                            }
                        }
                    }, true); ///





                }]
        }
    });