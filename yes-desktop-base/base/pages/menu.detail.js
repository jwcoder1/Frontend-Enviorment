angular.module('app').controller('base.menu.detail',
    function ($scope, $rootScope, utils, path) {

        var scope = $scope;

        scope.detail = {
            schema: {
                type: "object",
                properties: {
                    icon: {
                        type: "string",
                        title: "图标"
                    },
                    home: {
                        type: "boolean",
                        title: "首页链接"
                    },
                    blank: {
                        type: "boolean",
                        title: "新窗口开启"
                    },
                    enable: {
                        type: "boolean",
                        title: "已启用"
                    },
                    pid: {
                        type: "string",
                        title: "上级编号"
                    },
                    type: {
                        type: "string",
                        title: "类别",
                        required: true
                    },
                    tip: {
                        type: "string",
                        title: "提示"
                    },
                    order: {
                        "type": "string",
                        pattern: /^\+?[1-9][0-9]*$/,
                        patternMessage: "请输入正整数",
                        title: "顺序号",
                        required: true
                    },
                    color: {
                        type: "string",
                        title: "颜色"
                    },
                    name: {
                        type: "string",
                        title: "名称",
                        required: true
                    },
                    mid: {
                        type: "string",
                        title: "编号",
                        required: true
                    },
                    expanded: {
                        type: "boolean",
                        title: "自动展开"
                    },
                    url: {
                        type: "string",
                        title: "URL地址"
                    }
                }
            },
            form: [
                {
                    type: "group",
                    title: "基本配置",
                    items: ['name', 'mid', 'icon',
                        {
                            key: "type",
                            type: "select",
                            titleMap: [
                                {
                                    name: "menu",
                                    value: "menu"
                                },
                                {
                                    name: "function",
                                    value: "function"
                                }
                            ]
                        }, 'order', 'color',
                        'pid', 'url', 'tip']
                },
                {
                    type: "group",
                    title: "其他配置",
                    items: ['enable', 'blank', 'home',
                        'expanded']
                }]
        };

        var model = scope.$parent.model;
        scope.init = function () {//初始设置model
            if (!model.uid) {
                model.enable = true;
                model.type = "menu";
            }
            scope.backmodel = angular.extend({}, model);
        };

        scope.detailReset = function () {
            model = scope.$parent.model = angular.copy(scope.backmodel);
        };

        scope.init();
    });