define(function () {
    return {
  
        headers: {
            "logDate": {
                displayName: "发生时间",
                minWidth: 100
            },
            "ip": {
                displayName: "访问IP",
                minWidth: 80
            },
            "type": {
                displayName: "接口类型",
                width: 80
            },
            "iname": {
                displayName: "接口名称",
                width: 120
            },
            "aname": {
                displayName: "应用名称",
                minWidth: 120
            },
            "url": {
                displayName: "url",
                width: 120
            },
            "recv": {
                displayName: "接收内容",
                width: 200
            },
            "send": {
                displayName: "发送内容",
                width: 200
            }
        },
        
        filterItems: {
            0: {
                type: "input",
                name: "iname$match",
                title: "接口编号/名称"
            },
            1: {
                type: "input",
                name: "aname$match",
                title: "应用编号/名称"
            },
            2: {
                type: "input",
                name: "ip$eq",
                title: "IP"
            },
            3: {
                type: "select",
                name: "type$eq",
                title: "接口类型",
                titleMap: [{
                    value: 'RECV',
                    name: "可访问接口"
                }, {
                    value: 'SEND',
                    name: "可订阅接口"
                }]
            },
            4: {
                type: "dateTimePicker",
                name: "logDate$gte",
                title: "操作时间起"
            },
            5: {
                type: "dateTimePicker",
                name: "logDate$lte",
                title: "操作时间止"
            }
        }
    }
});