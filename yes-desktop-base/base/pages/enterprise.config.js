define(function() {
    return {
        title: "企业管理",
        operation: {
            add: true,
            del: true
        },
        list: {
            headers: {
                "cname": {
                    displayName: "企业名称",
                    minWidth: 230
                },
                "no": {
                    displayName: "编号"
                },
                "contact": {
                    displayName: "联系人"
                },
                "regTel": {
                    displayName: "联系电话"
                },
                "admin": {
                    displayName: "管理员账号",
                    minWidth: 105
                },
                "legalPerson": {
                    displayName: "法定代表人"
                },
                "enable": {
                    displayName: "状态",
                    width: 70,
                    cellTemplate: "<div class='ui-grid-cell-contents'>{{row.entity.enable?'已启用':'未启用' | translate}}</div>"
                }
            },
            filters: [{
                type: "input",
                name: "cname$match",
                label: "名称"
            }, {
                type: "input",
                name: "no$match",
                label: "编号"
            }, {
                type: "select",
                name: "enable$eq",
                label: "状态",
                titleMap: [{
                    value: '1',
                    name: '已启用'
                }, {
                    value: '0',
                    name: '未启用'
                }]
            }]
        },
        form: {
            schema: {
                type: "object",
                properties: {
                    no: {
                        title: "编号",
                        type: "string"
                    },
                    cname: {
                        title: "中文名称",
                        type: "string",
                        required: true
                    },
                    ename: {
                        title: "英文名称",
                        type: "string"
                    },
                    csName: {
                        title: "中文简称",
                        type: "string"
                    },
                    orgCode: {
                        title: "组织机构代码",
                        type: "string"
                    },
                    attachment: {
                        title: "企业营业执照",
                        type: "string"
                    },
                    regCode: {
                        title: "营业执照注册号",
                        type: "string"
                    },
                    regProvince: {
                        title: "注册地（省）",
                        type: "string"
                    },
                    regCity: {
                        title: "注册地（市）",
                        type: "string"
                    },
                    regDistrict: {
                        title: "注册地（区）",
                        type: "string"
                    },
                    regAddr: {
                        title: "注册地址",
                        type: "string"
                    },
                    website: {
                        title: "公司网址",
                        type: "string"
                    },
                    taxCode: {
                        title: "税号",
                        type: "string"
                    },
                    legalPerson: {
                        title: "法定代表人",
                        type: "string"
                    },
                    regDate: {
                        title: "注册时间",
                        type: "string"
                    },
                    regCapital: {
                        title: "注册资本(万元)",
                        type: "string"
                    },
                    contact: {
                        title: "联系人",
                        type: "string"
                    },
                    regTel: {
                        title: "联系电话",
                        type: "string"
                    },
                    enable: {
                        title: "是否启用",
                        type: "boolean",
                        'default': true
                    },
                    memo: {
                        title: "备注",
                        type: "string"
                    },
                    classify: {
                        title: "企业分类",
                        type: "string",
                        required: true
                    },
                    "admin": {
                        title: "账号",
                        type: "string",
                        placeholder: "账号自动生成"
                    }
                }
            },
            form: [{
                    type: "basRegion",
                    title: "基本信息",
                    items: [{
                            key: 'no',
                            readonly: true
                        }, 'cname', 'ename', 'csName', 'orgCode',
                        {
                            key: 'classify',
                            type: 'select',
                            placeholder: '请选择',
                            refresh: function(cfg, value) {
                                var $rootScope = angular.element('body').injector().get('$rootScope');
                                var titleMap = [];
                                $rootScope.dicDetails.forEach(function(item) {
                                    titleMap.push({
                                        name: item.name,
                                        value: item.value
                                    });
                                });
                                cfg.titleMap = titleMap;
                            }
                        },
                        {
                            key: 'enable'
                        }
                    ]
                },
                {
                    type: "basRegion",
                    title: "企业管理员信息",
                    items: [{
                        key: 'admin',
                        readonly: true
                    }]
                },
                {
                    type: "basRegion",
                    title: "详细信息",
                    items: [{
                            key: "attachment",
                            type: "uploader",
                            css: "cell100",
                            options: {
                                multiple: 1,
                                maxMB: 20
                            }
                        }, 'regCode', 'legalPerson',
                        {
                            key: "regDate",
                            type: "date-picker"
                        }, {
                            key: 'regProvince',
                            type: "select",
                            onChange: function(selected, model) {
                                model.regProvinceShow = selected.name;
                            }
                        }, {
                            key: 'regCity',
                            type: "select",
                            onChange: function(selected, model) {
                                model.regCityShow = selected.name;
                            }
                        }, {
                            key: 'regDistrict',
                            type: "select",
                            onChange: function(selected, model) {
                                model.regDistrictShow = selected.name;
                            }
                        }, 'regAddr',
                        'website', 'taxCode', 'regTel', 'regCapital', 'contact',
                        {
                            key: 'memo',
                            type: 'textarea',
                            css: "cell100"
                        }
                    ]
                }
            ],
            resolves: [function(utils, path, ngDialog, toastr) {
                var context = this;
            }],
            model: {}
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