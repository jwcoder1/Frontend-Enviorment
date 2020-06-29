define(function () {
    return {
        listOperations: {
            add: {
                name: "新增",
                icon: "fa-plus",
                action: function (event, scope) {
                    scope.action.add(event);
                }
            },
            edit: {
                name: "编辑",
                icon: "fa-edit",
                action: function (event, scope) {
                    scope.action.edit(event);
                }
            },
            del: {
                name: "删除",
                icon: "fa-remove",
                action: function (event, scope) {
                    scope.action.del(event);
                }
            }
        },

        headers: {
            "name": {
                displayName: "名称",
                minWidth: 100
            },
            "aid": {
                displayName: "账号",
                minWidth: 100
            },
            "alias": {
                displayName: "别名",
                width: 150
            },
            "type": {
                displayName: "类型",
                width: 70,
                cellTemplate: "<div class='ui-grid-cell-contents'>{{row.entity.type | translate}}</div>"
            },
            "matrixNo": {
                displayName: "关联编号",
                minWidth: 130
            },
            "mobile": {
                displayName: "手机号码",
                width: 90
            },
            "mail": {
                displayName: "电子邮箱",
                width: 170
            },
            "enable": {
                displayName: "状态",
                width: 70,
                cellTemplate: "<div class='ui-grid-cell-contents'>{{row.entity.enable?'已启用':'未启用' | translate}}</div>"
            }
        },
        
        filterItems: {
            0: {
                type: "input",
                name: "name$match",
                title: "名称"
            },
            1: {
                type: "input",
                name: "aid$match",
                title: "账号"
            },
            2: {
                type: "input",
                name: "mail$match",
                title: "电子邮箱"
            },
            3: {
                type: "input",
                name: "mobile$match",
                title: "手机号码"
            },
            4: {
                type: "select",
                name: "enable$eq",
                title: "状态",
                titleMap: [{
                    value: '1',
                    name: "已启用"
                }, {
                    value: '0',
                    name: "未启用"
                }]
            },
            6: {
                type: "select",
                name: "type$eq",
                title: "账号类型",
                titleMap: []
            },
            7: {
                type: "select",
                name: "eid$eq",
                title: "企业",
                titleMap: []
            }
        }
    }
});