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
            "entrustPerson": {
                displayName: "委办人",
                minWidth: 150
            },
            "startDate": {
                displayName: "开始时间",
                width: 90
            },
            "toDate": {
                displayName: "结束时间",
                width: 90
            },
            "toEntrustPerson": {
                displayName: "被委办人",
                minWidth: 150
            },
            "appName": {
                displayName: "应用名称",
                minWidth: 150
            },
            "enable": {
                displayName: "已启用",
                width: 70,
                cellTemplate: "<div class='ui-grid-cell-contents'>{{row.entity.enable?'已启用':'未启用' | translate}}</div>"
            }
        },
        filterItems: {
            0: {
                type: "datePicker",
                name: "startDate$gte",
                title: "开始日期起"
            },
            1: {
                type: "datePicker",
                name: "startDate$lte",
                title: "开始日期止"
            },
            2: {
                type: "datePicker",
                name: "toDate$gte",
                title: "结束日期起"
            },
            3: {
                type: "datePicker",
                name: "toDate$lte",
                title: "结束日期止"
            },
            4: {
                type: "input",
                name: "entrustPerson$match",
                title: "委办人"
            },
            5: {
                type: "input",
                name: "toEntrustPerson$match",
                title: "被委办人"
            },
            6: {
                type: "input",
                name: "appName$match",
                title: "应用名称"
            }
        }
    }
});