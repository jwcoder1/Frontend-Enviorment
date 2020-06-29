angular.module('app').controller('base.logmodule.detail',
    function ($scope, $rootScope, utils, path) {

        var scope = $scope;

        scope.detail = {
            schema: {
                type: "object",
                properties: {
                    mId: {
                        title: "模块编号",
                        type: "string",
                        required: true
                    },
                    storageDay: {
                        title: "保存天数",
                        "type": "string",
                        pattern: /^\+?[1-9][0-9]*$/,
                        patternMessage: "请输入正整数",
                        required: true
                    },
                    name: {
                        title: "名称",
                        type: "string",
                        required: true
                    },
                    memo: {
                        title: "描述",
                        type: "string",
                        required: true
                    },
                    enable: {
                        title: "已启动",
                        type: "boolean"
                    }
                }

            },
            form: [{
                type: "group",
                title: "主要配置",
                items: ["mId", 'storageDay', 'name', 'memo']
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
