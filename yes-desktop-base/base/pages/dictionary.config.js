define(function() {
    return {
        title: "人员信息",
        operation: {
            add: true,
            del: true
        },
        list: {
            editable: true,
            wrap: "default",
            headers: {
                "id": {
                    displayName: "编号",
                    minWidth: 150
                },
                "value": {
                    displayName: "值",
                    minWidth: 150
                },
                "seq": {
                    displayName: "序号",
                    minWidth: 70
                },
                "text": {
                    displayName: "描述",
                    minWidth: 150
                }
            },
            filters: [{
                type: "input",
                name: "name$match",
                label: "名称"
            }, {
                type: "input",
                name: "id$match",
                label: "编号"
            }, {
                type: "input",
                name: "value$match",
                label: "值"
            }]
        },
        form: {
            schema: {
                type: "object",
                properties: {
                    id: {
                        title: "编号",
                        type: "string",
                        required: true,
                        maxLength: 50
                    },
                    value: {
                        title: "值",
                        type: "string",
                        required: true,
                        maxLength: 100
                    },
                    text: {
                        title: "描述",
                        type: "string",
                        maxLength: 200
                    },
                    seq: {
                        title: "排序号",
                        type: "integer"
                    }
                }
            },
            form: [{
                type: "region",
                title: "主要信息",
                items: [
                    'id',
                    'value',
                    'text',
                    'seq'
                ]
            }]
        }
    };
});