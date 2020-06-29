angular.module('app').controller('base.account.detail',
    function($scope, $rootScope, utils, path) {

        var scope = $scope;

        scope.detail = {
            schema: {
                type: "object",
                properties: {
                    mail: {
                        title: "电子邮箱",
                        type: "string",
                        pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                        maxLength: 128
                    },
                    name: {
                        title: "名称",
                        type: "string",
                        required: true,
                        maxLength: 32
                    },
                    alias: {
                        title: "别名",
                        type: "string",
                        maxLength: 32
                    },
                    enable: {
                        title: "是否启用",
                        type: "boolean"
                    },
                    aid: {
                        title: "账号",
                        type: "string"
                    },
                    type: {
                        title: "类型",
                        type: "string",
                        required: true
                    },
                    password: {
                        title: "密码",
                        type: "string",
                        required: true,
                        maxLength: 64
                    },
                    mobile: {
                        title: "手机号码",
                        type: "string",
                        pattern: "^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$",
                        maxLength: 128
                    },
                    group: {
                        title: "账号组",
                        type: "string",
                        maxLength: 64
                    },
                    matrixNo: {
                        "title": "关联编号",
                        "type": "string",
                        readonly: true,
                        maxLength: 64
                    }
                }
            },
            form: [{
                type: "region",
                title: "主要信息",
                items: [{
                        key: 'aid',
                        placeholder: "账号自动生成"
                    }, {
                        key: 'name',
                        placeholder: "请输入名称"
                    },
                    {
                        key: "password",
                        type: "password"
                    },
                    'alias',
                    {
                        key: 'type',
                        type: "select",
                        titleMap: []
                    },
                    'matrixNo',
                    'mail',
                    'mobile',
                    'group',
                    {
                        key: 'enable'
                    }
                ]
            }]
        };

        var model = scope.$parent.model;
        scope.init = function() { //初始设置model

            if (model.uid) { //如果是编辑
                model.password = "******";
            } else {
                model.type = "user";
                model.enable = true;
            }
            loadModelAccountType();

            scope.backmodel = angular.extend({}, model);
        };

        scope.detailReset = function() {
            model = scope.$parent.model = angular.copy(scope.backmodel);
        };

        scope.init();

        function loadModelAccountType() {
            var types = $rootScope.ACCOUNT_TYPES;
            var temp = [];
            for (var i = 0; i < types.length; i++) {
                if (types[i] == "admin" || types[i] == "user") {
                    temp.push({ "name": types[i], "value": types[i] });
                } else if (model.type == types[i]) {
                    temp.push({ "name": types[i], "value": types[i] });
                }
            }
            var typesConfig = path.find(scope.detail, ['form', '[title:主要信息]', 'items', '[key:type]'], []);
            typesConfig.titleMap = temp;
        }
    });