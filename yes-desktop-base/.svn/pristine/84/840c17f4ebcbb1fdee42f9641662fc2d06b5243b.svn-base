angular.module('app')
    .directive('gridCellLov', function($compile, $templateCache, $http) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                gridField: "@",
                form: "="
            },
            templateUrl: 'plugins/bas/components/gridcelllov.html',
            controller: ['$rootScope', '$scope', 'utils', 'ngDialog', '$filter', 'qwconfig', 'toastr',
                function($rootScope, $scope, utils, ngDialog, $filter, qwconfig, toastr) {
                    var scope = $scope;
                    scope.name = "";



                    if (!qwconfig.lov[scope.form.lovtype] && scope.form.lovtype != "select") {
                        scope.showField = scope.gridField;
                        return
                    }

                    if (scope.form.lovtype != "select") {
                        scope.form.titleMap = [];
                        scope.config = qwconfig.lov[scope.form.lovtype];
                        if (scope.config.small) {
                            scope.form.small = true;
                        }
                        if (!scope.config.queryUrl) {
                            scope.config.initLoad = true;
                        }
                        if (scope.config.titleMap) {
                            scope.form.titleMap = scope.config.titleMap;
                        }

                        if (scope.config.lovfilter && !scope.form.lovfilter) {
                            scope.form.lovfilter = scope.config.lovfilter;
                        }
                    }



                    scope.getMapName = function(modelval) {
                        scope.form.titleMap.forEach(function(element) {
                            if (modelval && element.value == modelval) {
                                scope.showvalue = element.name;
                            }
                        }, this);
                    }

                    scope.downitem = function(modelval) {
                        if (scope.config.showField.valueField == scope.config.showField.nameField) {
                            scope.showvalue = modelval;
                            return;
                        }

                        var exist = false;
                        scope.form.titleMap.forEach(function(element) {
                            if (modelval && element.value == modelval) {
                                scope.showvalue = element.name;
                                exist = true;
                            }

                        }, this);
                        if (exist) {
                            return;
                        }
                        if (scope.config.queryUrl) {
                            var data = {};

                            data[scope.config.showField.valueField] = modelval;
                            utils.ajax({
                                method: 'POST',
                                url: scope.config.queryUrl + "?page=0&size=1",
                                mockUrl: "plugins/" + scope.config.queryUrl + "/article.json",
                                data: data
                            }).then(function(res) {

                                if (res.data.body.content.length > 0) {
                                    if (!scope.form.titleMap) {
                                        scope.form.titleMap = [];
                                    }
                                    var item = res.data.body.content[0];
                                    item.value = item[scope.config.showField.valueField];
                                    item.name = item[scope.config.showField.nameField];
                                    scope.form.titleMap.push(item);
                                    scope.showvalue = item.name;
                                }

                            });
                        }

                    }


                    scope.$watch('gridField', function(newValue, oldValue) {

                        if (newValue) {
                            if (scope.form.hasOwnProperty("nameField")) {
                                if (scope.$parent.model) {
                                    scope.showvalue = scope.$parent.model[scope.form.nameField];
                                } else {
                                    scope.showvalue = scope.$parent.row.entity[scope.form.nameField];
                                }
                            } else {


                                if (scope.form.lovtype == "select") {
                                    scope.getMapName(newValue);
                                    return
                                }

                                if (scope.config.titleMap) {
                                    scope.getMapName(newValue);
                                    return
                                }

                                if (scope.config.showField.valueField == scope.config.showField.nameField) {
                                    scope.showvalue = newValue;
                                    return;
                                }

                                if (scope.config.initLoad) {
                                    var rootmap = scope.form.lovtype + "Map";
                                    if ($rootScope[rootmap]) {
                                        scope.form.titleMap = $rootScope[rootmap];
                                        scope.getMapName(newValue);
                                    } else {
                                        var initMap = function() {
                                            var data = {};
                                            if (scope.form.lovfilter) {
                                                scope.form.lovfilter.forEach(function(element) {
                                                    if (element.hasOwnProperty("constant")) {
                                                        data[element.field] = element.constant
                                                    } else {
                                                        if (scope.$parent.model) {
                                                            data[element.field] = scope.$parent.model[element.modelfield]
                                                        } else if (scope.$parent.row) {
                                                            data[element.field] = scope.$parent.row.entity[element.modelfield];
                                                        } else if (scope.$parent.ngModel) {
                                                            data[element.field] = scope.$parent.ngModel[element.modelfield];
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
                                                if (res.data.body.content.length > 0) {
                                                    $rootScope[rootmap] = [{ value: "", name: "重置" }];
                                                }
                                                res.data.body.content.forEach(function(e) {
                                                    if (e) {
                                                        e.value = e[scope.config.showField.valueField];
                                                        e.name = e[scope.config.showField.nameField];
                                                        $rootScope[rootmap].push(e);
                                                    }
                                                })
                                                scope.form.titleMap = $rootScope[rootmap];
                                                scope.getMapName(newValue);

                                            });
                                        }
                                        initMap();
                                    }
                                } else {
                                    scope.downitem(newValue);
                                }

                            }

                        }

                    }, true); ///


                }
            ]
        }
    });