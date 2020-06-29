angular.module('app').controller('base.uid.detail',
    function ($scope, $rootScope, utils, path) {
        var scope = $scope;

        scope.detail = {
            schema: {
                type: "object",
                properties: {
                    uid: {
                        title: "UID",
                        type: "string",
                        required: false,
                        maxLength: 30
                    },
                    name: {
                        title: "名称",
                        type: "string",
                        required: true,
                        maxLength: 30
                    },
                    staffNo: {
                        title: "职工号",
                        type: "string",
                        maxLength: 30
                    },
                    tempStaffNo: {
                        title: "临时职工号",
                        type: "string",
                        maxLength: 30
                    },
                    birthday: {
                        title: "生日",
                        type: "string",
                        required: true
                    },
                    identifyNo: {
                        title: "身份证",
                        type: "string",
                        maxLength: 30
                    },
                    status: {
                        title: "类型",
                        type: "string",
                        required: true,
                        maxLength: 10
                    }
                }
            },
            form: [
                {
                    type: "group",
                    title: "UID信息",
                    items: [
                        {
                            key: 'uid',
                            placeholder: "账号自动生成",
                            readonly: true
                        }, {
                            key: 'name',
                            placeholder: "请输入名称"
                        },
                        {
                            key: 'birthday',
                            type:'datePicker'
                        },
                        {
                            key: "status",
                            type: "select",
                            titleMap: 
                            [{ value: 'EFFECTED',
                              name: "正式职工"
                            }, 
                            { value: 'TEMP',
                            name: "临时职工"
                            }]
                        },
                        {
                            key: 'staffNo',
                            placeholder: "职工号"
                        },
                        {
                            key: 'tempStaffNo',
                            placeholder: "临时职工号"
                        },
                        'identifyNo'
                    ]
                }
            ]
        };


        var model = scope.$parent.model;

        scope.init = function () {//初始设置model
            if (model.status=='临时职工'){
                model.status='TEMP';
            }else {
                model.status='EFFECTED';
            }

            if (model.uid) {//如果是编辑
              //
            } else {
               //
            }
            scope.backmodel = angular.extend({}, model);
        };

        scope.detailReset = function () {
            model = scope.$parent.model = angular.copy(scope.backmodel);
        };

        scope.init();
    });