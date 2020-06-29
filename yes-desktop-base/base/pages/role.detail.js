angular.module('app').controller('base.role.detail',
    function ($scope, $rootScope, utils, path) {

        var scope = $scope;

        scope.detail = {
            schema: {
                type: "object",
                properties: {
                    name: {
                        title: "名称",
                        type: "string",
                        required: true,
                        maxLength: 32
                    },
                    rid: {
                        title: "编号",
                        type: "string",
                        required: true,
                        maxLength: 32
                    },
                    describe: {
                        title: "描述",
                        type: "string",
                        required: true,
                        maxLength: 100
                    }
                }
            },
            form: [{
                type: "region",
                title: "主要信息",
                items: [
                    'name',
                    'rid',
                    'describe'
                ]
            }]
        };

        var model = scope.$parent.model;
        scope.init = function () { //初始设置model
            scope.backmodel = angular.extend({}, model);
        };

        scope.detailReset = function () {
            model = scope.$parent.model = angular.copy(scope.backmodel);
        };

        scope.init();

    });