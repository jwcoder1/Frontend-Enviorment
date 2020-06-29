(function () {
    var $inject = ['$scope', 'utils'];
    var controller = function ($scope, utils) {
        var view = {
            schema: {
                type: "object",
                properties: {
                    "accountNo": {
                        title: "银行账号",
                        required: true,
                        type: "string"
                    },
                    "accountAlias": {
                        title: "账号别名",
                        type: "string"
                    },
                    "currencyId": {
                        title: "币别",
                        type: "string",
                    },
                    "corpId": {
                        title: "公司",
                        type: "string"
                    },
                    "bankId": {
                        title: "银行",
                        type: "string"
                    },
                    "description": {
                        title: "描述",
                        type: "string"
                    },
                    "baseAccount": {
                        title: "是否基本户",
                        type: "boolean"
                    },
                    "loanAccount": {
                        title: "是否贷款户",
                        type: "boolean"
                    },
                    "foreignAccount": {
                        title: "是否外汇资金户",
                        type: "boolean"
                    },
                    "valid": {
                        title: "是否生效",
                        type: "boolean",
                    }
                }
            },
            form: [{
                type: "region",
                title: "主要信息",
                css: 'max-5',
                items: [
                    {
                        key: 'accountNo',
                        icon: "fa-anchor"
                    },
                    {
                        key: 'accountAlias',
                        css: 'cell2'
                    }, {
                        key: 'description',
                        type: 'textarea',
                        css: 'cell100'
                    },
                    {
                        key: 'currencyId'
                    },
                    {
                        key: 'corpId'
                    },
                    {
                        key: "loanAccount",
                        type: "checkbox"
                    },
                    {
                        key: 'bankId'
                    }
                ]
            }, {
                type: "region",
                title: "其他信息",
                css: 'max-5',
                items: [
                    {
                        key: "baseAccount",
                        type: "checkbox"
                    },
                    {
                        key: "foreignAccount",
                        type: "checkbox"
                    },
                    {
                        key: "valid",
                        type: "checkbox"
                    }]
            }],
            model: {},
            init: function () {

            }
        };

        angular.extend($scope, view);
        $scope.init();
    };
    controller.$inject = $inject;
    angular.module('app').controller('app.default.form', controller);
} ())