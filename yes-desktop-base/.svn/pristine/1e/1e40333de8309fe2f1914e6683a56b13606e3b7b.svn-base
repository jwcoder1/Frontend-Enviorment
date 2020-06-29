angular.module('app')
    .directive('getLove', function($compile, $templateCache, $http) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                ngModel: "=",
                form: "="
            },
            require: '^ngModel',
            templateUrl: 'plugins/bas/components/getlove.html',
            controller: ['$rootScope', '$timeout', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter', 'qwconfig', 'toastr',
                function($rootScope, $timeout, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter, qwconfig, toastr) {
                    var scope = $scope;

                    if (!scope.form.ngModelOptions) {
                        scope.form.ngModelOptions = {};
                    }
                    // scope.model = {
                    //     field: scope.ngModel
                    // }


                    scope.form.titleMap = [];

                    scope.form.fieldAddonRight = 'fa-search-minus';
                    if (!qwconfig.lov[scope.form.lovtype]) {
                        toastr.info("请配置[" + scope.form.title + "]速查!");
                        return
                    }
                    scope.config = angular.copy(qwconfig.lov[scope.form.lovtype]);

                    if (scope.form.hasOwnProperty("init")) {
                        scope.form.init(scope.form);
                    }

                    scope.onChange = function(selected) {
                        if (scope.config.hasOwnProperty("upperCase")) {
                            if (scope.config.upperCase) {
                                scope.ngModel = scope.ngModel.toUpperCase()
                            }
                        }
                        if (scope.form.onchange) {
                            var model = {};
                            if (scope.$parent.model) {
                                model = scope.$parent.model
                            } else if (scope.$parent.row) {
                                model = scope.$parent.row.entity
                            } else if (scope.$parent.ngModel) {
                                model = scope.$parent.ngModel
                            }
                            $timeout(function() {
                                scope.form.onchange(model);
                            }, 100);

                        }

                    }
                    var multiple = true;
                    if (scope.form.hasOwnProperty("multiple")) {
                        multiple = scope.form.multiple
                    }
                    scope.searchclass = "fa-search-plus";
                    if (!multiple) {
                        scope.searchclass = "fa-search";
                    }

                    if (scope.config.dialogConfig) {
                        scope.config.dialogConfig = angular.copy(qwconfig.dialog[scope.config.dialogConfig]);
                        $scope.dialog = function() {
                            scope.lovpara = {};

                            if (scope.form.lovfilter) {
                                scope.form.lovfilter.forEach(function(element) {
                                    if (element.hasOwnProperty("constant")) {
                                        scope.lovpara[element.field] = element.constant
                                    } else {
                                        if (scope.$parent.model) {
                                            scope.lovpara[element.field] = scope.$parent.model[element.modelfield]
                                        } else if (scope.$parent.row) {
                                            scope.lovpara[element.field] = scope.$parent.row.entity[element.modelfield];
                                        } else if (scope.$parent.ngModel) {
                                            scope.lovpara[element.field] = scope.$parent.ngModel[element.modelfield];
                                        }
                                    }

                                }, this);
                            }
                            var injector = angular.element(document).injector();
                            var ngDialog = injector.get('ngDialog');
                            var toastr = injector.get('toastr');
                            multiple = true;
                            if (scope.form.hasOwnProperty("multiple")) {
                                multiple = scope.form.multiple
                            }

                            scope.config.gridkey = scope.form.lovtype + "_grid";
                            ngDialog.open({
                                className: scope.config.dialogConfig.ngdialogSize,
                                template: 'plugins/bas/components/' + (multiple ? "baslove.html" : "baslov.html"),
                                scope: $scope,
                                controller: function($scope) {

                                    $scope.lovpara = scope.lovpara;
                                    $scope.multiSelect = true;

                                    // if (scope.form.lovfilter) {
                                    //     scope.form.lovfilter.forEach(function(element) {
                                    //         if (element.hasOwnProperty("constant")) {
                                    //             data[element.field] = element.constant
                                    //         } else {
                                    //             data[element.field] = scope.$parent.model[element.modelfield]
                                    //         }
                                    //     }, this);
                                    // }


                                    $scope.action = {
                                        lovback: function(rows) {
                                            var fieldname = scope.config.showField.valueField;
                                            if (scope.form.hasOwnProperty("takefield")) {
                                                fieldname = scope.form.takefield;
                                            }
                                            rows.forEach(function(element) {
                                                if (multiple) {
                                                    scope.ngModel = (!scope.ngModel || angular.isUndefined(scope.ngModel) ? "" : scope.ngModel + ",") + element[fieldname];
                                                } else {
                                                    scope.ngModel = element[fieldname];
                                                }

                                            }, this);

                                            if (scope.form.relationfield) {
                                                var en = rows[0];
                                                scope.form.relationfield.forEach(function(element) {
                                                    if (scope.$parent.model) {
                                                        scope.$parent.model[element.tofield] = en[element.findfield];
                                                    } else {
                                                        if (scope.$parent.row) {
                                                            scope.$parent.row.entity[element.tofield] = en[element.findfield];
                                                        } else {
                                                            if (scope.$parent.ngModel) {
                                                                scope.$parent.ngModel[element.tofield] = en[element.findfield];
                                                            }
                                                        }
                                                    }
                                                });
                                            }
                                            if (scope.form.onChange) {
                                                scope.form.onChange(rows[0]);
                                            }
                                            $scope.closeThisDialog();
                                        },
                                        lovcancel: function() {
                                            $scope.closeThisDialog();
                                        }
                                    }
                                }
                            })
                        }
                    } else {
                        $scope.form.dialog = function() {
                            toastr.info("请配置[" + scope.form.title + "]速查!");
                        }
                    }


                }
            ]
        }
    });