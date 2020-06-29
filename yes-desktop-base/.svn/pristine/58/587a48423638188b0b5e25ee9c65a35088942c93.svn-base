angular.module('app.core.qwconfig', ["app.core.proconfig"])

.factory('qwconfig', ['utils', 'ngDialog', 'settings', '$sce', 'proconfig', 'toastr', '$location', '$ocLazyLoad',
    function(utils, ngDialog, settings, $sce, proconfig, toastr, $location, $ocLazyLoad) {
        var config = {
            lov: {
                getenterprise: {
                    title: "获取企业信息",
                    queryUrl: "base/enterprise/query", //查询地址
                    initLoad: false, //加载时是否初始化数据
                    small: false, //速查是否显示编号
                    showField: { //速查基本栏位
                        valueField: "eid",
                        nameField: "cname"
                    },
                    dialogConfig: ""
                },
                getaccount: {
                    title: "获取帐号信息",
                    queryUrl: "base/account/lovquery", //查询地址
                    initLoad: false, //加载时是否初始化数据
                    small: false, //速查是否显示编号
                    showField: { //速查基本栏位
                        valueField: "aid",
                        nameField: "name"
                    },
                    dialogConfig: "getaccount"
                },
                getrole: {
                    title: "获取角色",
                    queryUrl: "base/role/query", //查询地址
                    initLoad: false, //加载时是否初始化数据
                    small: false, //速查是否显示编号
                    showField: { //速查基本栏位
                        valueField: "rid",
                        nameField: "name"
                    }
                },
                getBeans: {
                    title: "模块查询",
                    queryUrl: "bean/tableBeans/query", //查询地址
                    initLoad: true, //加载时是否初始化数据
                    small: false, //速查是否显示编号
                    showField: { //速查基本栏位
                        valueField: "beanname",
                        nameField: "beandesc"
                    }
                },
                getTables: {
                    title: "表查询",
                    queryUrl: "bean/tableInfos/query", //查询地址
                    initLoad: true, //加载时是否初始化数据
                    small: false, //速查是否显示编号
                    showField: { //速查基本栏位
                        valueField: "entityName",
                        nameField: "tableDesc"
                    }
                },
                getfieldtypes: {
                    title: "获取类别",
                    queryUrl: "bean/fieldtypes/queryfieldtype", //查询地址
                    initLoad: true, //加载时是否初始化数据
                    small: false, //速查是否显示编号
                    showField: { //速查基本栏位
                        valueField: "fieldType",
                        nameField: "fieldType"
                    }
                },
                getdbftypes: {
                    title: "获取dbf类别",
                    queryUrl: "bean/fieldtypes/querydbftype", //查询地址
                    initLoad: true, //加载时是否初始化数据
                    small: false, //速查是否显示编号
                    showField: { //速查基本栏位
                        valueField: "dbfType",
                        nameField: "dbfType"
                    }
                },
                getdiscretenessa: {
                    title: "组件表单组件",
                    queryUrl: "bean/discreteness/query", //查询地址
                    initLoad: true, //加载时是否初始化数据
                    lovfilter: [
                        { field: "discretenesType", constant: "A" }
                    ],
                    small: false, //速查是否显示编号
                    showField: { //速查基本栏位
                        valueField: "discretenessno",
                        nameField: "discretenessDesc"
                    }
                },
                getdiscretenessb: {
                    title: "组件查询组件",
                    queryUrl: "bean/discreteness/query", //查询地址
                    initLoad: true, //加载时是否初始化数据
                    small: false, //速查是否显示编号
                    lovfilter: [
                        { field: "discretenesType", constant: "B" }
                    ],
                    showField: { //速查基本栏位
                        valueField: "discretenessno",
                        nameField: "discretenessDesc"
                    }
                },
                getlovtype: {
                    title: "lov类别",
                    queryUrl: "bean/lovtype/query", //查询地址
                    initLoad: true, //加载时是否初始化数据
                    small: false, //速查是否显示编号
                    showField: { //速查基本栏位
                        valueField: "lovtype",
                        nameField: "typeDesc"
                    }
                },
                getyn: {
                    title: "类别选择",
                    initLoad: true, //加载时是否初始化数据
                    small: false, //速查是否显示编号
                    titleMap: [
                        { value: "Y", name: "是" },
                        { value: "N", name: "否" }
                    ],
                    showField: { //速查基本栏位
                        valueField: "value",
                        nameField: "name"
                    }
                }

            },
            dialog: {
                getfieldInfos: {
                    title: "选择栏位信息",
                    queryUrl: "bean/fieldInfos/query", //查询地址 
                    ngdialogSize: "ngdialog-sm",
                    headers: {
                        "fieldName": {
                            displayName: "栏位代号",
                            width: 120
                        },
                        "fieldDesc": {
                            displayName: "栏位说明",
                            width: 140
                        }

                    },
                    filterItems: { //速查filter条件
                        fieldName: {
                            type: "input",
                            name: "fieldName",
                            label: "栏位代号"
                        },
                        fieldDesc: {
                            type: "input",
                            name: "fieldDesc",
                            label: "栏位说明"
                        }
                    },
                    readfilterItems: { //速查filter条件
                        entityName: {
                            type: "input",
                            readonly: true,
                            name: "entityName",
                            label: "资料表"
                        }

                    }
                },
                getaccount: {
                    title: "账号查询",
                    queryUrl: "base/account/query", //查询地址 --accountv
                    ngdialogSize: "ngdialog-sm",
                    headers: {
                        aid: {
                            displayName: "账号",
                            width: 120
                        },
                        name: {
                            displayName: "名称",
                            width: 120
                        }
                    },
                    filterItems: { //速查filter条件
                        aid$match: {
                            type: "input",
                            name: "aid$match",
                            label: "账号"
                        },
                        name$match: {
                            type: "input",
                            name: "name$match",
                            label: "名称"
                        }
                    }

                }
            }

        }

        config.lov = angular.extend(config.lov, proconfig.lov);
        config.dialog = angular.extend(config.dialog, proconfig.dialog);

        return config;
    }
]);