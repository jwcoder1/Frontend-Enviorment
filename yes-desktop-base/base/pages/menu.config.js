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
            "name": {
                displayName: "名称"
            },
            icon: {
                displayName: "图标"
            },
            "home": {
                displayName: "首页链接",
                width: 80
            },
            "blank": {
                displayName: "新窗口开启",
                width: 100
            },
            "memo": {
                displayName: "备注",
                visible: false
            },
            "tag": {
                displayName: "标签",
                visible: false
            },
            "enable": {
                displayName: "已启用",
                width: 70,
                cellTemplate: "<div class='ui-grid-cell-contents'>{{row.entity.enable?'已启用':'未启用' | translate}}</div>"
            },
            "pid": {
                displayName: "上级编号",
                width: 90
            },
            "expanded": {
                displayName: "自动展开",
                visible: false
            },
            "type": {
                displayName: "类别",
                width: 70
            },
            "url": {
                displayName: "URL 地址"
            },
            "order": {
                displayName: "顺序号",
                width: 80
            },
            "color": {
                displayName: "颜色",
                width: 90
            },

            "mid": {
                displayName: "编号"
            }
        },
        filterItems: {
            0: {
                type: "input",
                name: "name$match",
                label: "名称"
            },
            1: {
                type: "input",
                name: "type$eq",
                label: "类别"
            },
            2: {
                type: "input",
                name: "mid$eq",
                label: "编号"
            },
            3: {
                type: "input",
                name: "pid$eq",
                label: "上级编号"
            }
        }
    }
});
