define(function () {
    return {
        title: "应用管理",
        operation: {
            add: true,
            del: true
        },
        list: {
            editable: true,
            wrap: "default",
            headers: {
                "name": {
                    displayName: "应用名称",
                    minWidth: 120
                },
                "aid": {
                    displayName: "应用编号",
                    minWidth: 100
                },
                "url": {
                    displayName: "应用IP地址",
                    minWidth: 150
                },
                "domain": {
                    displayName: "门户域名",
                    minWidth: 130
                },
                "sort": {
                    width: 45,
                    displayName: "排序",
                    cellTemplate: '<div><div ng-if="row.entity.sortable" class="my-handle"><i class="glyphicon glyphicon-move"></i></div><div ng-if="!row.entity.sortable" class="not-handle"><i class="glyphicon glyphicon-remove"></i></div></div>'
                }
            },
            filters: [
                {
                    type: "input",
                    name: "name$match",
                    label: "应用名称"
                }, {
                    type: "input",
                    name: "aid$match",
                    label: "编号"
                }
            ]
        },
        form: {
            schema: {
                type: "object",
                properties: {
                    name: {
                        title: "应用名称",
                        type: "string",
                        required: true,
                        maxLength: 32
                    },
                    aid: {
                        title: "应用编号",
                        type: "string"
                    },
                    loginUrl: {
                        title: "登入地址",
                        type: "string",
                        maxLength: 255
                    },
                    url: {
                        title: "应用IP地址",
                        type: "string",
                        maxLength: 39,
                        required: true
                    },
                    port: {
                        title: "访问端口号",
                        type: "string",
                        maxLength: 5,
                        required: true
                    },
                    mappingIp: {
                        title: "映射IP地址",
                        type: "string",
                        maxLength: 39
                    },
                    domain: {
                        title: "门户域名",
                        type: "string",
                        required: true,
                        maxLength: 64
                    },
                    singletree: {
                        title: "单点根",
                        type: "string",
                        required: true,
                        maxLength: 200
                    },
                    developer: {
                        title: "应用开发商",
                        type: "string",
                        maxLength: 32
                    },
                    linkman: {
                        title: "联系人",
                        type: "string",
                        maxLength: 32
                    },
                    phone: {
                        title: "联系电话",
                        type: "string",
                        maxLength: 32
                    },
                    manager: {
                        title: "负责人",
                        type: "string",
                        maxLength: 32
                    },
                    deployUrl: {
                        title: "应用部署地址",
                        type: "string",
                        maxLength: 255
                    },
                    remark: {
                        title: "备注说明",
                        type: "string",
                        maxLength: 255
                    },
                    groups: {
                        title: "所属分组",
                        type: "object",
                        required: true
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
                            key: 'aid',
                            placeholder: "编号自动生成",
                            readonly: true
                        }, {
                            key: 'name',
                            placeholder: "应用名称"
                        },
                        'loginUrl',
                        'url',
                        'mappingIp',
                        'port',
                        'domain',
                        'singletree',
                        'developer',
                        'deployUrl',
                        'remark',
                        'linkman',
                        'phone',
                        'manager',
                        {
                            key: 'groups',
                            type: 'select-multiple',
                            singleLine: true,
                            placeholder: '请选择',
                            fieldAddonRight: 'fa-plus',
                            dialog: function (cfg, parent) {
                                var injector = angular.element(document).injector();
                                var dialog = injector.get('ngDialog');
                                var key = 'groups';
                                var model = parent.model;
                                var toastr = injector.get('toastr');
                                var $timeout = injector.get('$timeout');
                                dialog.open(
                                    {
                                        template: 'plugins/base/pages/tree.selector.html',
                                        controller: function ($scope) {
                                            $scope.title = "分组列表";
                                            $scope.multiple = true;
                                            $scope.showConfirm = true;
                                            if (!model[key]) {
                                                model[key] = [];
                                            }
                                            var walkChildren = function (tree) {
                                                angular.forEach(tree, function (node) {
                                                    model[key].forEach(function (item) {
                                                        if (node.agid == item) {
                                                            node.selected = true;
                                                        }
                                                    });
                                                    if (node.children) {
                                                        walkChildren(node.children);
                                                    }
                                                });
                                            };
                                            var getSelecteds = function (tree, selecteds) {
                                                angular.forEach(tree, function (node) {
                                                    if (node.selected) {
                                                        selecteds.push(node.agid);
                                                    }
                                                    if (node.children) {
                                                        getSelecteds(node.children, selecteds);
                                                    }
                                                });
                                            };
                                            $scope.node = angular.copy($scope.$root.appGroups);
                                            walkChildren($scope.node.children);
                                            $scope.action = {
                                                onSelect: function (appgroup) {
                                                },
                                                confirm: function () {
                                                    var selecteds = [];
                                                    getSelecteds($scope.node.children, selecteds);
                                                    model[key] = selecteds;
                                                    $scope.closeThisDialog();
                                                },
                                                close: function () {
                                                    $scope.closeThisDialog();
                                                }
                                            }
                                        }
                                    }
                                );
                            }
                        },
                        {
                            key: "enable"
                        }
                    ]
                }
            ]
        }
    };
    function findByFormKey(form, key) {
        for (var i = 0, size = form.length; i < size; i++) {
            var cnf = form[i];
            if (angular.isObject(cnf)) {
                if (cnf.type == "group" || cnf.type == "list") {
                    var rs = findByFormKey(cnf.items, key);
                    if (rs) {
                        return rs;
                    }
                } else if (cnf.key == key) {
                    return cnf;
                }
            } else if (key == cnf) {
                return cnf;
            }
        }
    }
});