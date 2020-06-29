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
            },
            showAuthority: {
                name: "查看人员权限",
                icon: "fa-wrench",
                action: function (event, scope) {
                    scope.action.showAuthority(event);
                }
            },
            showApplication: {
                name: "查看人员应用",
                icon: "fa-wrench",
                action: function (event, scope) {
                    scope.action.showApplication(event);
                }
            }
        },

        headers: {
            "uid": {
                displayName: "UID",
                minWidth: 160
            },
            "name": {
                displayName: "名称",
                minWidth: 160
            },
            "staffNo": {
                displayName: "职工号",
                width: 160
            },
            "tempStaffNo": {
                displayName: "临时职工号",
                minWidth: 160
            },
            "birthday": {
                displayName: "生日",
                width: 160
            },
            "status": {
                displayName: "类别",
                width: 100
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
                name: "uid$match",
                title: "UID"
            },
/*            2: {
                type: "input",
                name: "identifyNo$match",
                title: "身份证"
            },*/
            2: {
                type: "input",
                name: "staffNo$match",
                title: "职工号"
            },
            3: {
                type: "select",
                name: "status$eq",
                title: "类别",
                titleMap: [{
                    value: 'EFFECTED',
                    name: "正式职工"
                }, {
                    value: 'TEMP',
                    name: "临时职工"
                }]
            },
            4: {
                type: "select",
                name: "eid$eq",
                title: "企业",
                titleMap: []
            }
        }
    }
});