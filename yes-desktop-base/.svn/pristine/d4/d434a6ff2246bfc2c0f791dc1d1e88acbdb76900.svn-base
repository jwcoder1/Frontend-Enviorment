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
            mId: {
                displayName: "模块编号",
                width: 150
            },
            memo: {
                displayName: "描述"
            },
            storageDay: {
                displayName: "保存天数",
                width: 150
            },
            name: {
                displayName: "名称",
                width: 200
            },
            enable: {
                displayName: "已启动",
                width: 150
            }
        },
        filterItems: {
            0: {
                type: "input",
                name: "mId$match",
                title: "模块编号"
            },
            1: {
                type: "input",
                name: "name$match",
                title: "名称"
            }
        }
    }
});
