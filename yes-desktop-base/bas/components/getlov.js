angular.module('app')
    .directive('getLov', function($compile, $templateCache, $http) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                ngModel: "=",
                form: "="
            },
            require: '^ngModel',
            templateUrl: 'plugins/bas/components/getlov.html',
            controller: ['$rootScope', '$timeout', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter', 'qwconfig', 'toastr',
                function($rootScope, $timeout, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter, qwconfig, toastr) {
                    var scope = $scope;

                    if (!scope.form.ngModelOptions) {
                        scope.form.ngModelOptions = {};
                    }
                    scope.model = {
                        field: scope.ngModel
                    }

                    scope.isinit = true;
                    scope.config = { //设定预设配置,如果类型为select将起作用
                        initLoad: false, //加载时是否初始化数据
                        small: false, //速查是否显示编号
                        showField: { //速查基本栏位
                            valueField: "value",
                            nameField: "name",
                            smallField: "name"
                        },
                    };
                    if (scope.form.lovtype != "select") {
                        scope.form.titleMap = [];
                        scope.form.fieldAddonRight = 'fa-search';
                        if (!qwconfig.lov[scope.form.lovtype]) {
                            toastr.info("请配置[" + scope.form.title + "]速查!");
                            return
                        }
                        scope.config = angular.copy(qwconfig.lov[scope.form.lovtype]);
                        if (scope.config.lovfilter && !scope.form.lovfilter) {
                            scope.form.lovfilter = scope.config.lovfilter;
                        }
                        if (scope.config.small) {
                            scope.form.small = true;
                        }

                        if (!scope.config.showField.hasOwnProperty("smallField")) {
                            scope.config.showField.smallField = scope.config.showField.nameField;
                        }

                        if (scope.config.titleMap) { //有预设资料
                            scope.form.titleMap = scope.config.titleMap;
                            scope.config.queryUrl = "";
                        }

                        if (scope.config.initLoad) {
                            var rootmap = scope.form.lovtype + "Map";
                            if ($rootScope[rootmap]) {
                                scope.form.titleMap = $rootScope[rootmap];
                            } else {
                                var getmap = function() {

                                    if (scope.config.queryUrl) {
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
                                                    e.smallName = e[scope.config.showField.smallField];
                                                    $rootScope[rootmap].push(e);
                                                }
                                            })
                                            scope.form.titleMap = $rootScope[rootmap];
                                        });

                                    }

                                }
                                getmap();
                            }
                        } else {
                            scope.form.refresh = function(options, search) {
                                if (!search) {
                                    scope.form.titleMap = scope.initMap;
                                } else {
                                    scope.getsearchMap(search);
                                }
                            }
                        }

                        scope.initMap = [];



                        scope.selectmodel = { value: "" };

                        scope.onDropdown = function() {
                            if (!scope.config.initLoad) {
                                scope.form.titleMap = [];
                                scope.getsearchMap("");
                            }

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
                                scope.config.gridkey = scope.form.lovtype + "_grid";
                                ngDialog.open({
                                    className: scope.config.dialogConfig.ngdialogSize,
                                    template: 'plugins/bas/components/baslov.html',
                                    scope: $scope,
                                    controller: function($scope) {
                                        $scope.multiSelect = false;
                                        $scope.lovpara = scope.lovpara;

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
                                                        data[element.field] = scope.$parent.ngModel[element.modelfield]; //查询条件
                                                    }
                                                }
                                            }, this);
                                        }


                                        $scope.action = {
                                            lovback: function(rows) {
                                                var en = rows[0];

                                                if (!scope.config.initLoad) {
                                                    scope.form.titleMap = [];
                                                    en.value = en[scope.config.showField.valueField];
                                                    en.name = en[scope.config.showField.nameField];
                                                    en.smallName = en[scope.config.showField.smallField];
                                                    scope.form.titleMap.push(en);
                                                }
                                                if (scope.form.relationfield) {
                                                    scope.form.relationfield.forEach(function(element) {
                                                        if (scope.$parent.model) {
                                                            if (en[element.findfield]) {
                                                                scope.$parent.model[element.tofield] = en[element.findfield];
                                                            }

                                                        } else if (scope.$parent.row) {
                                                            if (en[element.findfield]) {
                                                                scope.$parent.row.entity[element.tofield] = en[element.findfield];
                                                            }

                                                        } else {
                                                            if (en[element.findfield]) {
                                                                scope.$parent.ngModel[element.tofield] = en[element.findfield];
                                                            }

                                                        }
                                                    });
                                                }
                                                scope.ngModel = en[scope.config.showField.valueField];
                                                if (scope.form.onchange) {
                                                    var model = {};
                                                    if (scope.$parent.model) {
                                                        model = scope.$parent.model;
                                                    } else if (scope.$parent.row) {
                                                        model = scope.$parent.row.entity;
                                                    } else if (scope.$parent.ngModel) {
                                                        model = scope.$parent.ngModel;
                                                    }
                                                    $timeout(function() {
                                                        scope.form.onchange(model);
                                                    }, 100);
                                                }


                                                // $timeout(function() {
                                                //     scope.form.onchange(en);
                                                // }, 100);


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

                    scope.getsearchMap = function(search) {

                        if (scope.config.queryUrl) {
                            var data = {};
                            if (scope.form.lovfilter) {
                                scope.form.lovfilter.forEach(function(element) {
                                    if (element.hasOwnProperty("constant")) {
                                        data[element.field] = element.constant;
                                    } else {

                                        if (scope.$parent.model) {
                                            data[element.field] = scope.$parent.model[element.modelfield];
                                        } else if (scope.$parent.row) {
                                            data[element.field] = scope.$parent.row.entity[element.modelfield];
                                        } else if (scope.$parent.ngModel) {
                                            data[element.field] = scope.$parent.ngModel[element.modelfield];
                                        }
                                    }
                                }, this);
                            }


                            data.lovsearchstr = search
                            utils.ajax({
                                method: 'POST',
                                url: scope.config.queryUrl + "?page=0&size=20",
                                mockUrl: "plugins/" + scope.config.queryUrl + "/article.json",
                                data: data
                            }).then(function(res) {
                                var titleMap = []
                                if (res.data.body.content.length > 0) {
                                    titleMap = [{ value: "", name: "空白", smallName: "空白" }];
                                }
                                var exist = false;
                                res.data.body.content.forEach(function(e) {
                                    if (e) {

                                        e.value = e[scope.config.showField.valueField];
                                        e.name = e[scope.config.showField.nameField];
                                        e.smallName = e[scope.config.showField.smallField];
                                        titleMap.push(e);
                                        if (scope.selectmodel.value && scope.selectmodel.value == e.value) {
                                            exist = true;
                                        }
                                    }
                                })
                                if (!exist) {
                                    titleMap.push(scope.selectmodel)
                                }
                                scope.form.titleMap = titleMap;
                                if (!search) {
                                    scope.initMap = titleMap
                                }
                            });
                        }

                    }

                    scope.getvalMap = function(modelval) {
                        if (!modelval) {
                            return
                        }
                        var exist = false;
                        scope.form.titleMap.forEach(function(element) {
                            if (modelval && element.value == modelval) {
                                exist = true;
                            }

                        }, this);
                        if (exist) {
                            return;
                        }

                        if (scope.config.showField.valueField == scope.config.showField.nameField) {
                            scope.form.titleMap = [];
                            var item = {
                                value: modelval,
                                name: modelval,
                                smallName: modelval
                            }

                            scope.initMap = scope.form.titleMap;
                            scope.form.titleMap.push(item);
                            scope.selectmodel = item;
                            return true;
                        }

                        if (scope.config.queryUrl) {

                            var data = {};
                            if (scope.form.lovfilter) {
                                scope.form.lovfilter.forEach(function(element) {
                                    if (element.hasOwnProperty("constant")) {
                                        data[element.field] = element.constant;
                                    } else {

                                        if (scope.$parent.model) {
                                            data[element.field] = scope.$parent.model[element.modelfield];
                                        } else if (scope.$parent.row) {
                                            data[element.field] = scope.$parent.row.entity[element.modelfield];
                                        } else if (scope.$parent.ngModel) {
                                            data[element.field] = scope.$parent.ngModel[element.modelfield];
                                        }
                                    }
                                }, this);
                            }
                            data[scope.config.showField.valueField] = modelval;
                            utils.ajax({
                                method: 'POST',
                                url: scope.config.queryUrl + "?page=0&size=1",
                                mockUrl: "plugins/" + scope.config.queryUrl + "/article.json",
                                data: data
                            }).then(function(res) {

                                if (res.data.body.content.length > 0) {
                                    var item = res.data.body.content[0];
                                    item.value = item[scope.config.showField.valueField];
                                    item.name = item[scope.config.showField.nameField];
                                    item.smallName = item[scope.config.showField.smallField];
                                    scope.form.titleMap.push(item);
                                    scope.selectmodel = item;
                                }

                            });
                        }

                    }


                    scope.$watch('model.field', function(newValue, oldValue) {
                        scope.ngModel = newValue;
                    }, true); ///

                    scope.$watch('ngModel', function(newValue, oldValue) {
                        scope.model.field = newValue;
                        if (!scope.config.initLoad) {
                            if (newValue) {
                                if (scope.isinit && scope.form.hasOwnProperty("nameField")) {
                                    var item = { value: newValue }
                                    if (scope.$parent.model) {
                                        item.name = scope.$parent.model[scope.form.nameField];
                                    } else if (scope.$parent.row) {
                                        item.name = scope.$parent.row.entity[scope.form.nameField];
                                    } else if (scope.$parent.ngModel) {
                                        item.name = scope.$parent.ngModel[scope.form.nameField];
                                    }
                                    item.smallName = item.name;
                                    if (item.name) {
                                        var existitem = false;
                                        scope.form.titleMap.forEach(function(element) {
                                            if (element.value == newValue) {
                                                existitem = true;
                                            }
                                        }, this);
                                        if (!existitem) {
                                            scope.form.titleMap.push(item);
                                        }
                                        scope.isinit = false;
                                    } else {
                                        scope.getvalMap(newValue);
                                    }

                                } else {
                                    scope.getvalMap(newValue);
                                }

                            }
                        }
                    }, true); ///

                    scope.onChange = function(selected) {
                        if (scope.form.nameField) {
                            if (scope.$parent.model) {
                                scope.$parent.model[scope.form.nameField] = selected[scope.config.showField.nameField];
                            } else if (scope.$parent.row) {
                                scope.$parent.row.entity[scope.form.nameField] = selected[scope.config.showField.nameField];
                            } else if (scope.$parent.ngModel) {
                                scope.$parent.ngModel[scope.form.nameField] = selected[scope.config.showField.nameField];
                            }
                        }

                        if (scope.form.relationfield) {
                            scope.form.relationfield.forEach(function(element) {

                                if (scope.$parent.model) {
                                    if (selected[element.findfield]) {
                                        scope.$parent.model[element.tofield] = selected[element.findfield];
                                    }

                                } else if (scope.$parent.row) {
                                    if (selected[element.findfield]) {
                                        scope.$parent.row.entity[element.tofield] = selected[element.findfield];
                                    }

                                } else {
                                    if (selected[element.findfield]) {
                                        scope.$parent.ngModel[element.tofield] = selected[element.findfield];
                                    }

                                }
                            })
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


                }
            ]
        }
    });