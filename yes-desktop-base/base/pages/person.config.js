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
                "cname": {
                    displayName: "名称",
                    minWidth: 110
                },
                "employeeNo": {
                    displayName: "职工号",
                    minWidth: 80
                },
                "puid": {
                    displayName: "UID",
                    minWidth: 80
                },
                "sex": {
                    displayName: "性别",
                    width: 60,
                    cellTemplate: "<div class='ui-grid-cell-contents'>{{row.entity.sex=='M'?'男':'女' | translate}}</div>"
                },
                "positionName": {
                    displayName: "职务",
                    minWidth: 100
                },
                "postName": {
                    displayName: "岗位",
                    minWidth: 100
                },
                "mobilePhone": {
                    displayName: "移动电话",
                    minWidth: 90
                },
                "mail": {
                    displayName: "邮箱",
                    minWidth: 150
                }
            },
            filters: [{
                type: "input",
                name: "cname$match",
                label: "名称/职工号"
            }, {
                type: "input",
                name: "puid$match",
                label: "UID"
            }, {
                type: "input",
                name: "mail$match",
                label: "电子邮箱"
            }, {
                type: "input",
                name: "phone$match",
                label: "手机号码"
            }, {
                type: "select",
                name: "position",
                label: "职务",
                titleMap: []
            }, {
                type: "select",
                name: "post",
                label: "岗位",
                titleMap: []
            }, {
                type: "select",
                name: "enable$eq",
                label: "状态",
                titleMap: [{
                    value: '1',
                    name: "已启用"
                }, {
                    value: '0',
                    name: "未启用"
                }]
            }]
        },
        form: {
            schema: {
                type: "object",
                properties: {
                    pid: {
                        title: "编号",
                        type: "string"
                    },
                    employeeNo: {
                        title: "职工号",
                        type: "string",
                        required: true,
                        maxLength: 32
                    },
                    cname: {
                        title: "中文名",
                        type: "string",
                        required: true,
                        maxLength: 64
                    },
                    ename: {
                        title: "英文名全称",
                        type: "string",
                        maxLength: 64
                    },
                    shortName: {
                        title: "英文名简称",
                        type: "string",
                        maxLength: 32
                    },
                    type: {
                        title: "类型",
                        type: "string",
                        "default": "0"
                    },
                    birthday: {
                        title: "生日",
                        type: "string"
                            //                    	required: true
                    },
                    sex: {
                        title: "性别",
                        type: "string",
                        "default": "M"
                    },
                    officePhone: {
                        title: "办公电话",
                        type: "string",
                        maxLength: 64
                    },
                    mobilePhone: {
                        title: "移动电话",
                        type: "string",
                        maxLength: 64
                    },
                    mail: {
                        title: "电子邮件",
                        type: "string",
                        maxLength: 128
                    },
                    pinyin: {
                        title: "拼音全拼",
                        type: "string",
                        readonly: true
                    },
                    py: {
                        title: "拼音简拼",
                        type: "string",
                        readonly: true
                    },
                    memo: {
                        title: "备注",
                        type: "string",
                        maxLength: 255
                    },
                    seq: {
                        title: "排序号",
                        type: "integer"
                    },
                    enable: {
                        title: "是否启用",
                        type: "boolean",
                        "default": true
                    }
                }
            },
            form: [{
                type: "region",
                title: "主要信息",
                items: [{
                        key: 'pid',
                        placeholder: "账号自动生成",
                        readonly: true
                    }, {
                        key: 'cname',
                        placeholder: "请输入中文名"
                    },
                    'employeeNo',
                    'ename',
                    'shortName',
                    {
                        key: 'type',
                        type: "select",
                        titleMap: [{
                            value: "0",
                            name: "临时"
                        }, {
                            value: "1",
                            name: "正式"
                        }]
                    },
                    {
                        key: 'birthday',
                        type: "date-picker"
                    },
                    {
                        key: 'sex',
                        type: "select",
                        titleMap: [{
                            value: "M",
                            name: "男"
                        }, {
                            value: "F",
                            name: "女"
                        }]
                    },
                    'officePhone',
                    'mobilePhone',
                    'mail',
                    'seq',
                    'pinyin',
                    'py',
                    {
                        key: 'memo'
                    },
                    {
                        key: 'enable'
                    }
                ]
            }],
            resolves: function(utils, path, $timeout, $rootScope) {}
        },
        script: function() {
            /*var self = this,
                watch = this.watch,
                getValue = this.getValue,
                setValue = this.setValue,
                setStatus = this.setStatus,
            	getFormItemByKey = this.getFormItemByKey;
            
            var injector = angular.element(document).injector();
            var utils = injector.get('utils');
            
            watch('organization').change(function (selected) {
            	
            	if(selected){
	            	utils.async("get","base/position",{
			        		"count":999,
			        		"oid$eq":selected
		    			}
		        	).then(function(res){
		        			setValue("position",null);
		        			var titleMap = [];
		        			res.data.body.items.forEach(function(item){
		        				titleMap.push({"name":item.name,"value":item.pid});
		        			});
		        			getFormItemByKey("position").titleMap = titleMap;
		            	},function(error){
		            		//toastr.warning(error.message);
		            	}
		            );
		        	utils.async("get","base/post",{
			        		"count":999,
			        		"oid$eq":selected
			    		}
		        	).then(function(res){
		        			setValue("post",null);
			        		var titleMap = [];
		        			res.data.body.items.forEach(function(item){
		        				titleMap.push({"name":item.name,"value":item.pid});
		        			});
		        			getFormItemByKey("post").titleMap = titleMap;
		            	},function(error){
		            		//toastr.warning(error.message);
		            	}
		            );
            	}
            });*/

        }
    };

    function findByFormKey(form, key) {
        for (var i = 0, size = form.length; i < size; i++) {
            var cnf = form[i];
            if (angular.isObject(cnf)) {
                if (cnf.type == "group" || cnf.type == "list") {
                    var rs = findByFormKey(cnf.items, key);
                    if (rs) {
                        return rs;
                    }
                } else if (cnf.key == key) {
                    return cnf;
                }
            } else if (key == cnf) {
                return cnf;
            }
        }
    }
});