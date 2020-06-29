define(function() {
    return {
        listOperations: {
            add: {
                name: "新增",
                icon: "fa-plus",
                action: function(event, scope) {
                    scope.action.add(event);
                }
            },
            edit: {
                name: "编辑",
                icon: "fa-edit",
                action: function(event, scope) {
                    scope.action.edit(event);
                }
            },
            del: {
                name: "删除",
                icon: "fa-remove",
                action: function(event, scope) {
                    scope.action.del(event);
                }
            }
            //,
            //enable: {
            //    name: '启用',
            //    icon: 'fa-user',
            //    action: function (event) {
            //    }
            //},
            //disable: {
            //    name: '停用',
            //    icon: 'fa-ban',
            //    action: function (dialog, utils) {
            //    }
            //},
            //unlock: {
            //    name: '解锁',
            //    icon: 'fa-unlock',
            //    action: function (dialog, utils) {
            //    }
            //}
        },
        headers: {
            "moduleId": {
                displayName: "模块编号",
                width: 75
            },
            "storageDay": {
                displayName: "保存天数",
                width: 75
            },
            "qid": {
                displayName: "队列编号",
                width: 100
            },
            "enable": {
                displayName: "已启用",
                width: 70,
                cellTemplate: "<div class='ui-grid-cell-contents'>{{row.entity.enable?'已启用':'未启用' | translate}}</div>",
                filter: function(columns, rootScope) {
                    rootScope.enableValues = {
                        "true": "已启动",
                        "false": "未启动"
                    };
                    this.cellFilter = "dict:'enableValues'";
                    columns.push(this);
                }
            },
            "type": {
                displayName: "类型",
                width: 70
            },
            "lastScheduler": {
                displayName: "最后调度时间"
            },
            "category": {
                displayName: "分类",
                visible: false
            },
            "name": {
                displayName: "名称"
            },
            "lastMessage": {
                displayName: "最后调度信息"
            },
            "config": {
                displayName: "配置参数",
                visible: false
            },
            "lastState": {
                displayName: "最后调度状态",
                width: 100
            },
            "ipAddress": {
                displayName: "IP地址"
            },
            "storage": {
                displayName: "存储库",
                width: 90
            }
        },
        filterItems: {
            0: {
                type: "input",
                name: "qid$eq",
                title: "队列编号"
            },
            1: {
                type: "input",
                name: "name$match",
                title: "名称"
            },
            2: {
                type: "input",
                name: "type$eq",
                title: "类型"
            },
            3: {
                type: "select",
                name: "enable$eq",
                title: "是否启动",
                titleMap: [{
                    value: '1',
                    name: "已启动"
                }, {
                    value: '0',
                    name: "未启动"
                }]
            },
            4: {
                type: "dateTimePicker",
                name: "lastScheduler$gte",
                title: "最后调度起"
            },
            5: {
                type: "dateTimePicker",
                name: "lastScheduler$lte",
                title: "最后调度止"
            },
            6: {
                type: "input",
                name: "ipAddress",
                title: "IP地址"
            }
        }
    }
});
