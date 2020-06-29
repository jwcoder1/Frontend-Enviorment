angular.module('app')
    .directive('getPerson', function ($compile, $templateCache, $http) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                ngModel: "=",
                form: "="
            },
            require: '^ngModel',
            templateUrl: 'plugins/base/components/getperson.html',
            controller: ['$rootScope', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                function ($rootScope, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter) {
                    var scope = $scope;

                    if (!scope.form.ngModelOptions) {
                        scope.form.ngModelOptions = {}
                    }

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
                                readonlystatus.forEach(element => {
                                    if (element == formstatus) {
                                        readonly = true;
                                    }
                                });
                                scope.form.readonly = readonly;
                            }
                        }
                    }, true); ///

                    scope.form.titleMap = [];
                    scope.form.small = false;
                    scope.form.fieldAddonRight = 'fa-search-minus';
                    scope.form.refresh = function (options, search) {
                        if (!search) {
                            return
                        }
                        var params = {
                            count: 10,
                            oid$eq: "203500010799",
                            cname$match: search
                        }

                        utils.ajax({
                            method: 'GET',
                            url: 'base/person',
                            mockUrl: "plugins/vehicle/data/vehicleInfo.json",
                            params: params
                        }).then(function (res) {
                            scope.form.titleMap = [];

                            res.data.body.items.forEach(function (e) {
                                var item = {
                                    value: e.pid,
                                    name: e.cname
                                }
                                if (scope.form.relationfield) {
                                    scope.form.relationfield.forEach(element => {
                                        item[element.findfield] = e[element.findfield]
                                    });
                                }
                                scope.form.titleMap.push(item);
                            })


                        });
                    }

                    scope.onChange = function (selected) {
                        if (scope.form.relationfield) {
                            scope.form.relationfield.forEach(element => {
                                if (scope.$parent.model) {
                                    scope.$parent.model[element.tofield] = selected[element.findfield];
                                } else {
                                    scope.$parent.row.entity[element.tofield] = selected[element.findfield];
                                }
                            });
                        }
                    }




                    var init = function () {
                        if (scope.ngModel) {
                            var params = {
                                count: 10,
                                oid$eq: "203500010799",
                                pid$eq: scope.ngModel
                            }
                            utils.ajax({
                                method: 'GET',
                                url: 'base/person',
                                mockUrl: "plugins/vehicle/data/vehicleInfo.json",
                                params: params
                            }).then(function (res) {
                                scope.form.titleMap = [];
                                res.data.body.items.forEach(function (e) {
                                    var item = {
                                        value: e.pid,
                                        name: e.cname
                                    }
                                    if (scope.form.relationfield) {
                                        scope.form.relationfield.forEach(element => {
                                            item[element.findfield] = e[element.findfield]
                                        });
                                    }
                                    scope.form.titleMap.push(item);
                                })

                            });
                        }

                    }
                    init();



                    $scope.form.dialog = function () {
                        ngDialog.open({
                            className: 'ngdialog-theme-default dialog-people-selector',
                            template: 'plugins/base/pages/people.selector.html',
                            controller: function ($scope) {

                                $scope.callback = function (justPersons, selects) {
                                    if (justPersons.length > 0) {

                                        justPersons.forEach(function (person) {
                                            if (person.pid && person.cname) {
                                                scope.ngModel = person.pid;
                                                var item = {
                                                    value: person.pid,
                                                    name: person.cname
                                                }
                                                if (scope.form.relationfield) {
                                                    scope.form.relationfield.forEach(element => {
                                                        if (scope.$parent.model) {
                                                            scope.$parent.model[element.tofield] = person[element.findfield];
                                                        } else {
                                                            scope.$parent.row.entity[element.tofield] = person[element.findfield];
                                                        }
                                                    });
                                                }
                                                scope.form.titleMap.push(item);


                                                scope.ngModel = person.pid;
                                            }
                                        });
                                        ngDialog.closeAll();
                                    } else {
                                        ngDialog.closeAll();
                                    }
                                };
                            }
                        });



                    }










                }]
        }
    });