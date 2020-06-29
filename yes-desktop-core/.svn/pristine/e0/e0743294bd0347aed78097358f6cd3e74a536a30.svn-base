(function () {
    var $inject = ['$scope', 'utils'];
    var controller = function ($scope, utils) {
        $scope.gridOptions = {
            enableSorting: true,
            data: [{
                name: '张三', gender: '男'
            }, {
                    name: '张三', gender: '男'
                }, {
                    name: '张三', gender: '男'
                }, {
                    name: '张三', gender: '男'
                }, {
                    name: '张三', gender: '男'
                }, {
                    name: '张三', gender: '男'
                }, {
                    name: '张三', gender: '男'
                }, {
                    name: '张三', gender: '男'
                }, {
                    name: '张三', gender: '男'
                }, {
                    name: '张三', gender: '男'
                }, {
                    name: '张三', gender: '男'
                }, {
                    name: '张三', gender: '男'
                }, {
                    name: '张三', gender: '男'
                }, {
                    name: '张三', gender: '男'
                }, {
                    name: '张三', gender: '男'
                }, {
                    name: '张三', gender: '男'
                }],
            paginationPageSizes: [20, 100, 250],
            columnDefs: [
                { field: 'name', width: 90 },
                { field: 'gender', width: 90 },
                { field: 'company', enableSorting: false }
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            }
        };

        var view = {
            init: function () {
            },
            load: function () {
                utils.ajax({
                    url: 'plugins/base/data/hello.json',
                    params: $scope.filter
                }).then(function (res) {
                    console.log('查询', res);
                });
            },
            filter: {},
            tree: [
                {
                    "name": "root",
                    "children": [
                        {
                            "name": "生产类(55)",
                            "children": [
                                {
                                    "name": "质量管理(55)",
                                    // "uid": 'id || _id',
                                    // "type": 'menu',
                                    // "icon ": 'fa-cog',
                                },
                                {
                                    "name": "物流管理管理(55)"
                                },
                                {
                                    "name": "生产现场6S改善(343)"
                                },
                                {
                                    "name": "测试(64)"
                                },
                                {
                                    "name": "安全(14)"
                                },
                                {
                                    "name": "设备改善(159)"
                                },
                                {
                                    "name": "能耗改善(66)"
                                }
                            ]

                        },
                        {
                            "name": "非生产类",
                            "children": [
                                {
                                    "name": "职责(19)"
                                },
                                {
                                    "name": "流程(18)"
                                },
                                {
                                    "name": "制度(43)"
                                },
                                {
                                    "name": "其他(9)"
                                }
                            ]
                        }
                    ]
                }

            ],
            queries: {
                0: {
                    type: "input",
                    name: "theme",
                    title: "主题"
                },
                1: {
                    type: "select",
                    name: "questionStatus",
                    title: "问题状态"
                },
                2: {
                    type: "base-select2",
                    name: "executeStatus",
                    title: "实施状态",
                    fieldAddonRight: 'fa-search',
                    dialog: function (ngModel, optionName, scope) {
                        scope.action.dialog(ngModel, optionName, config)
                    }
                },
                3: {
                    type: "input",
                    name: "proposer",
                    title: "提出人"
                },
                4: {
                    type: "select",
                    name: "proposeOrg",
                    title: "提出部门"
                },
                5: {
                    type: "base-tree-select",
                    name: "questionOrigin",
                    title: "问题来源",
                    htmlClass: 'col-md-6 col-sm-12',
                    itemClass: 'col-xs-4',
                    selectMap: [{
                        name: '一级',
                        titleMap: [{
                            name: '一级',
                            value: '1'
                        }]
                    }, {
                            name: '二级',
                            titleMap: [{
                                name: '二级',
                                value: '2'
                            }]
                        }, {
                            name: '三级',
                            titleMap: [{
                                name: '三级',
                                value: '3'
                            }]
                        }]
                },
                6: {
                    type: "select",
                    name: "questionType",
                    title: "问题类别"
                },
                7: {
                    type: "select",
                    name: "relativeOrg",
                    title: "相关部门"
                },
                8: {
                    type: "select",
                    name: "group",
                    title: "班组"
                },
                9: {
                    type: "dateRangePicker",
                    name: "proposeDate",
                    title: "提出日期",
                    htmlClass: 'col-md-6 col-sm-12'
                },
                10: {
                    type: "checkboxes",
                    title: "我提出的",
                    titleMap: [{
                        name: 'proposedByMe',
                        value: true
                    }]
                },
                11: {
                    type: "checkboxes",
                    name: "checkedByMe",
                    title: "我审核的",
                    titleMap: [{
                        name: 'checkedByMe',
                        value: true
                    }]
                },
                12: {
                    type: "checkboxes",
                    name: "relatedWithMe",
                    title: "我相关的",
                    titleMap: [{
                        name: 'relatedWithMe',
                        value: true
                    }]
                }
            },
            detail: {
                schema: {
                    type: "object",
                    properties: {
                        "theme": {
                            title: "主题",
                            type: "string",
                            required: true
                        },
                        "no": {
                            title: "编号",
                            type: "string"
                        },
                        "proposalTime": {
                            title: "提出时间",
                            type: "string",
                            required: true
                        },
                        "proposer": {
                            title: "提出人",
                            type: "string",
                            required: true
                        },
                        "proposeOrg": {
                            title: "提出部门",
                            type: "string",
                            required: true
                        },
                        "questionType": {
                            title: "问题类别",
                            type: "string",
                            required: true
                        },
                        "questionLocation": {
                            title: "问题发生位置",
                            type: "string",
                            required: true
                        },
                        "area": {
                            title: "区域",
                            type: "string"
                        },
                        "submitToOrg": {
                            title: "提交至部门",
                            type: "string",
                            required: true
                        },
                        "expectedSolvedTime": {
                            title: "期望完成时间",
                            type: "string"
                        },
                        "questionOrigin": {
                            title: "问题来源",
                            type: "string",
                            required: true
                        },
                        "status": {
                            title: "现状及存在问题",
                            type: "string",
                            required: true
                        },
                        "statusAttachment": {
                            title: "现状附件",
                            type: "string"
                        },
                        "proposal": {
                            title: "建议对策",
                            type: "string"
                        },
                        "proposalAttachment": {
                            title: "对策附件",
                            type: "string"
                        },
                        "inputer": {
                            title: "录入人",
                            type: "string"
                        },
                        "inputeDate": {
                            title: "录入日期",
                            type: "string"
                        },
                        "questionStatus": {
                            title: "问题状态",
                            type: "string"
                        },
                        "executeStatus": {
                            title: "实施状态",
                            type: "string"
                        }
                    }
                },
                form: [{
                    type: "group",
                    title: "主要信息",
                    items: [{
                        key: "theme",
                        htmlClass: "col-sm-6 col-md-8"
                    }, {
                            key: "no"
                        }, {
                            key: "proposalTime",
                            type: 'date-picker'
                        }, {
                            key: "proposer",
                            type: 'select'
                        }, {
                            key: "proposeOrg",
                            type: 'select'
                        }, {
                            key: "questionType",
                            htmlClass: "col-md-12",
                            type: 'base-tree-select',
                            itemClass: 'col-xs-6',
                            selectMap: [{
                                name: 'one',
                                titleMap: [{
                                    name: '一级1',
                                    value: '11'
                                }, {
                                        name: '一级2',
                                        value: '12'
                                    }]
                            }, {
                                    name: 'two',
                                    titleMap: [{
                                        name: '二级1',
                                        value: '21'
                                    }, {
                                            name: '二级2',
                                            value: '22'
                                        }]
                                }]
                        }, {
                            key: "questionLocation",
                            type: 'select'
                        }, {
                            key: "area",
                            type: 'select'
                        }, {
                            key: "submitToOrg",
                            type: 'select'
                        }, {
                            key: "expectedSolvedTime",
                            type: 'date-picker'
                        }, {
                            key: "questionOrigin",
                            htmlClass: "col-sm-6 col-md-8",
                            type: 'base-tree-select',
                            itemClass: 'col-xs-6',
                            selectMap: [{
                                name: 'one',
                                titleMap: [{
                                    name: '一级1',
                                    value: '11'
                                }, {
                                        name: '一级2',
                                        value: '12'
                                    }]
                            }, {
                                    name: 'two',
                                    titleMap: [{
                                        name: '二级1',
                                        value: '21'
                                    }, {
                                            name: '二级2',
                                            value: '22'
                                        }]
                                }]
                        }, {
                            key: "status",
                            htmlClass: "single-line",
                            type: 'textarea',
                            minHeight: '100px'
                        }, {
                            key: "statusAttachment",
                            htmlClass: "single-line",
                            type: 'uploader'
                        }, {
                            key: "proposal",
                            htmlClass: "single-line",
                            type: 'textarea',
                            minHeight: '60px'
                        }, {
                            key: "proposalAttachment",
                            htmlClass: "single-line",
                            type: 'uploader'
                        }, {
                            key: "inputer",
                            htmlClass: "col-sm-4 col-md-3",
                            type: 'select'
                        }, {
                            key: "inputeDate",
                            htmlClass: "col-sm-4 col-md-3",
                            type: 'date-picker'
                        }, {
                            key: "questionStatus",
                            htmlClass: "col-sm-4 col-md-3",
                            type: 'select'
                        }, {
                            key: "executeStatus",
                            htmlClass: "col-sm-4 col-md-3",
                            type: 'select'
                        }]
                }]
            }
        };

        angular.extend($scope, view);
        $scope.init();
    };
    controller.$inject = $inject;
    angular.module('app').controller('app.default.layout', controller);
} ())