define(['plugins/base/pages/people.selector'], function () {
    angular.module('app').controller('base.entrustmanagement.detail',
        function ($scope, $rootScope, utils, path, ngDialog, toastr) {

            var scope = $scope;

            scope.detail = {
                schema: {
                    type: "object",
                    properties: {
                        entrustPerson: {
                            title: "委办人",
                            type: "string",
                            required: true,
                            maxLength: 64
                        },
                        dateRange: {
                            title: "委办时间范围",
                            type: "string",
                            required: true
                        },
                        /*toDate: {
                         title: "委办结束时间",
                         type: "string",
                         required: true,
                         maxLength: 32
                         },*/
                        toEntrustPersonId: {
                            title: "被委办人",
                            type: "string",
                            required: true,
                            maxLength: 64
                        },
                        aid: {
                            title: "应用名称",
                            type: "string",
                            required: true,
                            maxLength: 32
                        },
                        enable: {
                            title: "已启用",
                            type: "boolean"
                        }
                    }
                },
                form: [
                    {
                        type: "group",
                        title: "主要信息",
                        items: [
                            {
                                key: 'entrustPerson',
                                fieldHtmlClass: "input-people-selector",
                                readonly2: true,
                                onclick: function (form) {
                                    ngDialog.open(
                                        {
                                            className: 'ngdialog-theme-default dialog-people-selector',
                                            template: 'plugins/base/pages/people.selector.html',
                                            controller: function ($scope) {
                                                //$scope.eid = "";
                                                $scope.callback = function (justPersons, selects) {
                                                    if (justPersons.length > 0) {
                                                        scope.model.entrustPersonId = justPersons[0].pid;
                                                        scope.model.entrustPerson = justPersons[0].cname;
                                                        ngDialog.closeAll();
                                                    } else if (justPersons.length > 1) {
                                                        toastr.warning("只能选择一个委办人!");
                                                    } else {
                                                        toastr.warning("请选择委办人!");
                                                    }
                                                };
                                            }
                                        }
                                    );
                                },
                                placeholder: "点击选择委办人"
                            },
                            {
                                key: "dateRange",
                                type: "dateRangePicker"
                            },
                            /*{
                             key: "toDate",
                             type: "datePicker"
                             },*/
                            {
                                key: "toEntrustPersonId",
                                type: "select",
                                onChange: function (selected) {
                                    scope.model.toEntrustPerson = selected.name;
                                }
                            },
                            {
                                key: "aid",
                                type: "select",
                                onChange: function (selected) {
                                    scope.model.appName = selected.name;
                                }
                            },
                            {
                                key: "enable"
                            }
                        ]
                    }
                ]
            };

            var model = scope.$parent.model;
            scope.init = function () {//初始设置model
                if (model.startDate && model.toDate) {
                    model.dateRange = model.startDate + "~" + model.toDate;
                }
                utils.async("get", "base/application").then(function (res) {
                    var titleMap = [];
                    res.data.body.items.forEach(function (item) {
                        titleMap.push({
                            name: item.name,
                            value: item.aid
                        });
                    });
                    var typesConfig = path.find(scope.detail,
                        ['form', '[title:主要信息]', 'items', '[key:aid]'], []);
                    typesConfig.titleMap = titleMap;
                }, function (error) {
                    //toastr.warning(error.message);
                });

                if (!model.uid) {//如果是编辑
                    model.enable = true;
                }

                scope.backmodel = angular.extend({}, model);
            };

            scope.detailReset = function () {
                model = scope.$parent.model = angular.copy(scope.backmodel);
            };

            scope.init();
            var firstLoadOrgPeople = true;
            scope.$watch("model.entrustPersonId", function (newVal, oldVal) {
                if (newVal) {
                    utils.async("get", "base/person/orgpeople", {"pid": newVal}).then(function (res) {
                        var titleMap = [];
                        var notIn = true;
                        if (res.data.body.items && res.data.body.items.length > 0) {
                            res.data.body.items.forEach(function (item) {
                                if (item.pid != scope.model.entrustPersonId) {
                                    titleMap.push({
                                        name: item.cname,
                                        value: item.pid
                                    });
                                    if (item.pid == model.toEntrustPersonId) {
                                        notIn = false;
                                    }
                                }
                            });
                        }
                        var typesConfig = path.find(scope.detail,
                            ['form', '[title:主要信息]', 'items', '[key:toEntrustPersonId]'], []);
                        typesConfig.titleMap = titleMap;
                        if (notIn) {
                            if (model.toEntrustPersonId) {
                                model.toEntrustPersonId = undefined;
                                model.toEntrustPerson = "";
                                if (firstLoadOrgPeople) {
                                    toastr.warning("该数据原设置的被委办人已被删除!");
                                }
                            }
                        }
                        firstLoadOrgPeople = false;
                    }, function (error) {
                        //toastr.warning(error.message);
                    });
                }
            });

        });
});