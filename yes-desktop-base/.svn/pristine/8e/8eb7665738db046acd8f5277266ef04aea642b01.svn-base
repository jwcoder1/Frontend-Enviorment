define(function() {
    return {
        listOperations: {
        },
        headers: {
            state: {
                displayName: "状态",
                width: 70
            },
            data: {
                displayName: "消息内容"
            },
            seq: {
                displayName: "消息序列",
                width: 80
            },
            qid: {
                displayName: "队列编号",
                width: 100
            },
            lastMessage: {
                displayName: "最后调度信息"
            },
            errorCount: {
                displayName: "已经失败次数",
                width: 100
            },
            attachments: {
                displayName: "附件"
            },
            lastScheduler: {
                displayName: "最后调度时间"
            },
            ipAddress: {
                displayName: "消息原地址"
            }
        },
        filterItems: {
            0: {
                type: "input",
                title: "队列编号",
                name: "qid$eq"
            },
            1: {
                type: "input",
                name: "data$match",
                title: "消息内容"
            },
            2: {
                type: "input",
                name: "seq$eq",
                title: "消息序列"
            },
            3: {
                type: "dateTimePicker",
                name: "lastScheduler$gte",
                title: "最后调度"
            }
        }
    }
});
