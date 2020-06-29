angular.module('app').controller('base.mqueuecfg.detail',
    function ($scope, $rootScope, utils, path) {

        var scope = $scope;

        scope.detail = {
                schema: {
                    type: "object",
                    properties: {
                        moduleId: {
                            title: "模块编号",
                            type: "string",
                            required: true
                        },
                        storageDay: {
                            title: "保存天数",
                            "type": "string",
                            pattern:  /^\+?[1-9][0-9]*$/,
                            patternMessage: "请输入正整数",
                            required: true
                        },
                        qid: {
                            title: "队列编号",
                            type: "string",
                            required: true
                        },
                        enable: {
                            title: "已启动",
                            type: "boolean"
                        },
                        type: {
                            title: "类型",
                            type: "string",
                            required: true
                        },
                        lastScheduler: {
                            title: "最后调度时间",
                            type: "string"
                        },
                        category: {
                            title: "分类",
                            type: "string",
                            required: true
                        },
                        name: {
                            title: "名称",
                            type: "string",
                            required: true
                        },
                        lastMessage: {
                            title: "最后调度信息",
                            type: "string"
                        },
                        config: {
                            title: "配置参数",
                            type: "string"
                        },
                        lastState: {
                            title: "最后调度状态",
                            type: "string"
                        },
                        ipAddress: {
                            title: "IP地址",
                            type: "string"
                        },
                        storage: {
                            title: "存储库",
                            type: "string"
                        }
                    }
                },
                form: [
                    {
                        type: "group",
                        title: "主要配置",
                        items: ['name', 'moduleId',
                            'storageDay', 'qid', 'type', {
                                key: "lastScheduler",
                                type: "dateTimePicker"
                            }, 'category', 'config',
                            'lastState', 'ipAddress',
                            'storage']
                    }, {
                        type: "group",
                        title: "其他配置",
                        items: ['enable']
                    }]
            };

        var model = scope.$parent.model;
        scope.init = function () {//初始设置model
            if (!model.uid) {
                model.enable = true;
            }
            scope.backmodel = angular.extend({}, model);
        };

        scope.detailReset = function () {
            model = scope.$parent.model = angular.copy(scope.backmodel);
        };

        scope.init();
    });