angular.module('app')
    .directive('rangedate', function($compile, $templateCache, $http) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                ngModel: "=",
                option: "="
            },
            require: '^ngModel',
            templateUrl: 'plugins/bas/components/rangedate.html',
            controller: ['$rootScope', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                function($rootScope, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter) {
                    var scope = $scope;

                    scope.dateval = "";
                    scope.dateformat = "yyyy-mm-dd";
                    if (scope.option.dateconfig) {
                        if (scope.option.dateconfig.dateformat) {
                            scope.dateformat = scope.option.dateconfig.dateformat;
                        }
                    }

                    scope.$watch('ngModel', function(newValue, oldValue) {
                        newValue = newValue ? newValue : "";
                        if (scope.option.dateconfig) {
                            if (scope.option.dateconfig) {
                                datearr = newValue.split("~");
                                if (scope.option.dateconfig.type == "to") {
                                    if (datearr.length > 1) {
                                        scope.dateval = datearr[1];
                                    } else {
                                        scope.dateval = "";
                                    }

                                } else {
                                    scope.dateval = datearr[0];
                                }
                            } else {
                                scope.dateval = newValue;
                            }

                        } else {
                            scope.dateval = ngModel ? newValue : "";
                        }



                    }, true); ///

                    scope.$watch('dateval', function(newValue, oldValue) {

                        newValue = newValue ? newValue : "";
                        if (scope.option.dateconfig) {
                            if (scope.option.dateconfig) {
                                datearr = (scope.ngModel ? scope.ngModel : "~").split("~");
                                if (scope.option.dateconfig.type == "to") {
                                    if (datearr.length > 1) {
                                        datearr[1] = newValue;
                                    } else {
                                        datearr.push(newValue);
                                    }

                                } else {
                                    datearr[0] = newValue;
                                }
                                scope.ngModel = datearr.join("~");
                            } else {
                                scope.ngModel = newValue;
                            }

                        } else {
                            scope.ngModel = newValue;
                        }


                    }, true); ///








                }
            ]
        }
    });