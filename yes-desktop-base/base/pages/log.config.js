define(function() {
    return {
        listOperations: {
        },
        headers: {
            "updated": {
                displayName: "操作时间",
                width: 150
            },
            "moduleId": {
                displayName: "模块编号",
                width: 100
            },
            "eventId": {
                displayName: "事件编号",
                width: 160
            },
            "remoteIp": {
                displayName: "远程IP",
                width: 100
            },
            "remote": {
                displayName: "远程记录",
                width: 80,
                filter: function(columns, rootScope) {
                    rootScope.remoteValues = {
                        "true": "是",
                        "false": "否"
                    };
                    this.cellFilter = "dict:'remoteValues'";
                    columns.push(this);
                }

            },
            "user": {
                displayName: "操作用户",
                width: 80,
                filter: function(columns, rootScope) {
                    rootScope.userValues = {
                        "admin": "管理员",
                        "user": "用户"
                    };
                    this.cellFilter = "dict:'userValues'";
                    columns.push(this);
                }
            },
            "info": {
                displayName: "事件信息",
                minWidth: 200
            },
            "localIp": {
                displayName: "本地IP",
                width: 120
            }
        },
        filterItems: {
            0: {
                type: "select",
                name: "user$eq",
                title: "账号类型",
                titleMap: [{
                    value: "admin",
                    name: "管理员"
                }, {
                    value: "user",
                    name: "用户"
                }]
            },
            1: {
                type: "input",
                name: "moduleId$eq",
                title: "模块编号"
            },
            2: {
                type: "input",
                name: "user$eq",
                title: "操作用户"
            },
            3: {
                type: "input",
                name: "remoteIp$match",
                title: "远程IP"
            },
            4: {
                type: "input",
                name: "localIp$match",
                title: "本地IP"
            },
            6: {
                type: "dateTimePicker",
                name: "updated$gte",
                title: "操作时间起"
            },
            7: {
                type: "dateTimePicker",
                name: "updated$lte",
                title: "操作时间止"
            }
        }
    }
});
