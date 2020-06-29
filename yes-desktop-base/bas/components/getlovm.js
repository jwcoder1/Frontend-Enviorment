angular.module('app')
    .directive('getLovm', function($compile, $templateCache, $http) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                ngModel: "=",
                form: "="
            },
            require: '^ngModel',
            templateUrl: 'plugins/bas/components/getlovm.html',
            controller: ['$rootScope', '$timeout', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter', 'qwconfig', 'toastr',
                function($rootScope, $timeout, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter, qwconfig, toastr) {
                    var scope = $scope;

                    if (!scope.form.ngModelOptions) {
                        scope.form.ngModelOptions = {};
                    }





                    scope.form.titleMap = [];

                    scope.form.fieldAddonRight = 'fa-search-minus';
                    if (!qwconfig.lov[scope.form.lovtype]) {
                        toastr.info("请配置[" + scope.form.title + "]速查!");
                        return
                    }
                    scope.config = angular.copy(qwconfig.lov[scope.form.lovtype]);


                    scope.load = function() {
                        var rootmap = scope.form.lovtype + "Map";
                        var data = {};
                        if (scope.form.lovfilter) {
                            scope.form.lovfilter.forEach(function(element) {
                                if (element.hasOwnProperty("constant")) {
                                    data[element.field] = element.constant
                                } else {
                                    if (scope.$parent.model) {
                                        data[element.field] = scope.$parent.model[element.modelfield]
                                    } else {
                                        data[element.field] = scope.$parent.row.entity[element.modelfield];
                                    }
                                }
                            }, this);
                        }

                        utils.ajax({
                            method: 'POST',
                            url: scope.config.queryUrl + "?page=0&size=10000",
                            mockUrl: "plugins/" + scope.config.queryUrl + "/article.json",
                            data: data
                        }).then(function(res) {
                            $rootScope[rootmap] = [];
                            res.data.body.content.forEach(function(e) {
                                if (e) {
                                    e.value = e[scope.config.showField.valueField];
                                    e.name = e[scope.config.showField.nameField];
                                    $rootScope[rootmap].push(e);
                                }
                            })
                            scope.form.titleMap = $rootScope[rootmap];


                        });
                    }

                    scope.load();

                    scope.selectvalue = [];
                    scope.$watch('ngModel', function(newValue, oldValue) {
                        if (scope.ngModel) {
                            scope.selectvalue = scope.ngModel.split(",");
                        } else {
                            scope.selectvalue = [];
                        }
                    }, true); ///

                    scope.$watch('selectvalue', function(newValue, oldValue) {
                        if (scope.selectvalue.length > 0) {
                            scope.ngModel = scope.selectvalue.toString();
                        } else {
                            scope.ngModel = "";
                        }

                    }, true); ///



                    if (scope.config.dialogConfig) {
                        scope.config.dialogConfig = angular.copy(qwconfig.dialog[scope.config.dialogConfig]);
                        $scope.form.dialog = function() {
                            scope.lovpara = {};

                            if (scope.form.lovfilter) {
                                scope.form.lovfilter.forEach(function(element) {

                                    if (element.hasOwnProperty("constant")) {
                                        scope.lovpara[element.field] = element.constant
                                    } else {
                                        if (scope.$parent.model) {
                                            scope.lovpara[element.field] = scope.$parent.model[element.modelfield]
                                        } else {
                                            scope.lovpara[element.field] = scope.$parent.row.entity[element.modelfield];
                                        }

                                    }

                                }, this);
                            }
                            if (!angular.isUndefined(scope.ngModel)) {
                                scope.lovpara.notinfield = scope.ngModel ? scope.ngModel : "";
                            }
                            var injector = angular.element(document).injector();
                            var ngDialog = injector.get('ngDialog');
                            var toastr = injector.get('toastr');
                            scope.config.gridkey = scope.form.lovtype + "_grid";
                            ngDialog.open({
                                className: scope.config.dialogConfig.ngdialogSize,
                                template: 'plugins/bas/components/baslove.html',
                                scope: $scope,
                                controller: function($scope) {
                                    $scope.multiSelect = false;
                                    $scope.lovpara = scope.lovpara;
                                    $scope.config = scope.config;


                                    if (scope.form.lovfilter) {
                                        scope.form.lovfilter.forEach(function(element) {
                                            if (element.hasOwnProperty("constant")) {
                                                data[element.field] = element.constant
                                            } else {
                                                if (scope.$parent.model) {
                                                    data[element.field] = scope.$parent.model[element.modelfield]
                                                } else {
                                                    data[element.field] = scope.$parent.row.entity[element.modelfield];
                                                }
                                            }
                                        }, this);
                                    }


                                    $scope.action = {
                                        lovback: function(rows) {
                                            // var en = rows[0];
                                            // scope.ngModel = en[scope.config.showField.valueField];

                                            rows.forEach(function(element) {
                                                var isfound = false;
                                                scope.selectvalue.forEach(val => {
                                                    if (val == element[scope.config.showField.valueField]) {
                                                        isfound = true;
                                                    }
                                                });
                                                if (!isfound) {
                                                    scope.selectvalue.push(element[scope.config.showField.valueField])
                                                }
                                            }, this);


                                            if (scope.form.onchange) {
                                                var model = {};
                                                if (scope.$parent.model) {
                                                    model = scope.$parent.model;
                                                } else {
                                                    model = scope.$parent.row.entity;
                                                }
                                                $timeout(function() {
                                                    scope.form.onchange(model);
                                                }, 100);
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
                    }



                }
            ]
        }
    });