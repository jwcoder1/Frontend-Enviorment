define(function() {
    angular.module('app').controller('bean.stencilMast.detail',
        function($rootScope, $scope, $location, utils, path, getSingleView, settings,
            $timeout, dialog, toastr, ngDialog, uiGridConstants, qwsys) {
            var scope = $scope;
            scope.uid = "";
            if ($rootScope.uid) {
                scope.uid = $rootScope.uid;
                $rootScope.uid = "";
            };
            scope.model = {
                formstatus: "add" //edit,view
            };
            scope.detailUrl = "plugins/bean/templates/detail.html";
            scope.config = {
                listoperation: {
                    add: {
                        name: "新增",
                        icon: "fa-plus",
                        readonlystatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "add,edit,read" } //表单新增状态
                            ]
                        },
                        action: function(event, form) {
                            scope.action.add(event);
                        }
                    },
                    save: {
                        name: "保存",
                        icon: "fa-save",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "add,edit" }, //表单为新增，修改状态
                            ]
                        },
                        action: function(event, form) {
                            scope.action.save(event, form);
                        }
                    },
                    undo: {
                        name: "取消",
                        icon: "fa-undo",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "add,edit" }, //表单为新增，修改状态
                            ]
                        },
                        action: function(event, form) {
                            scope.action.undo(event);
                        }
                    },
                    edit: {
                        name: "修改",
                        icon: "fa-edit",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "view" } //查询状态                              
                            ]
                        },
                        action: function(event, form) {
                            scope.action.edit(event);
                        }
                    },
                    del: { //分配状态下还可以删除
                        name: "删除",
                        icon: "fa-remove",
                        htmlClass: "deletestyle",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "view" } //表单查询状态                             
                            ]
                        },
                        action: function(event, form) {
                            scope.action.del(event);
                        }
                    }
                },
                form: {
                    schema: {
                        "type": "object",
                        "properties": {
                            "beanname": {
                                "title": "模块名",
                                "type": "string",
                                required: true
                            },
                            "stencilname": {
                                "title": "功能名称",
                                "type": "string",
                                required: true
                            },
                            "stencilType": {
                                "title": "类别",
                                "type": "string"
                            }
                        }
                    },
                    form: [{
                            type: "group",
                            title: "基本信息",
                            items: [{
                                    title: "模块名",
                                    key: 'beanname',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basLov',
                                    lovtype: "getBeans"
                                },
                                {
                                    title: "功能名称",
                                    key: 'stencilname',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basString'
                                },
                                {
                                    title: "模板类别",
                                    key: 'stencilType',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basLov',
                                    titleMap: [
                                        { value: "querystencil", name: "查询列表" },
                                        { value: "singlestencil", name: "单档组别" },
                                        { value: "singlestencil", name: "单档页签" },
                                        { value: "mastdetailstencil", name: "头行明细" },
                                        { value: "doubledetailstencil", name: "双行明细" },
                                        { value: "treestencil", name: "树型维护" },
                                        { value: "treedetailstencil", name: "树型资料维护" }
                                    ],
                                    lovtype: "select"
                                },
                                {
                                    title: "文件名",
                                    key: 'fileName',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basString'
                                },
                                {
                                    title: "表名",
                                    key: 'entityNamea',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basLov',
                                    lovtype: "getTables"

                                },
                                {
                                    title: "别名",
                                    key: 'aliasNamea',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basString'
                                }




                            ]
                        },
                        {
                            type: "basTabs",
                            css: "max-4",
                            tabs: [{
                                    title: "条件配置",
                                    items: [{
                                        title: "日期",
                                        key: 'linesa',
                                        type: "basEditgrid",
                                        gridkey: "linesa",
                                        css: "cell100",
                                        sortable: {
                                            animation: 100,
                                            handle: '.sortclassa',
                                            onEnd: function(evt) {
                                                var sorts = 1;
                                                evt.models.forEach(function(element) {
                                                    element.entity.sorts = sorts;
                                                    sorts += 1;
                                                }, this);
                                                scope.model.linesa.sort(function(a, b) {
                                                    var val1 = a["sorts"];
                                                    var val2 = b["sorts"];
                                                    return val1 - val2;
                                                });


                                            }
                                        },
                                        action: {
                                            add: {
                                                editstatus: {
                                                    relation: "or",
                                                    editstatus: {
                                                        relation: "and",
                                                        filedlist: [
                                                            { field: "formstatus", status: "add,edit" }, //表单为新增，修改状态
                                                        ]
                                                    },
                                                    filedlist: [
                                                        { field: "formstatus", status: "add,edit" }, //表单新增状态
                                                    ]
                                                },
                                                click: function() {

                                                    var paras = {
                                                        entityName: scope.model.entityNamea
                                                    }
                                                    qwsys.getdocuments("getfieldInfos", paras, function(selectmodel) {
                                                        if (selectmodel.type == "rep") {
                                                            scope.model.orderlines_vs.forEach(function(element) {
                                                                element.isdel = true;
                                                            }, this);
                                                        }
                                                        selectmodel.records.forEach(function(element) {
                                                            var item = {
                                                                isdel: false,
                                                                fieldName: element.fieldName,
                                                                fieldDesc: element.fieldDesc,
                                                                fieldType: element.fieldType,
                                                                dbfType: element.fieldType,
                                                                discretenessno: element.discretenessno,
                                                                lovType: element.lovType,
                                                                schemaType: element.schemaType
                                                            }
                                                            scope.model.linesa.push(item);
                                                        }, this);
                                                    });



                                                    // var item = {
                                                    //     isdel: false
                                                    // }
                                                    // scope.model.filters.push(item);
                                                }
                                            },
                                            del: {
                                                editstatus: {
                                                    relation: "or",
                                                    filedlist: [
                                                        { field: "formstatus", status: "add,edit" }, //表单新增状态
                                                    ]
                                                },
                                                click: function(item) {
                                                    item.isdel = true;
                                                }
                                            }
                                        },
                                        headers: {
                                            "sort1": {
                                                displayName: "移动",
                                                enableColumnMenu: false,
                                                readonly: true,
                                                width: 35,
                                                cellTemplate: "<div class='ui-grid-cell-contents'> " +
                                                    "<i class=' iocstyle statusblue sortclassa  fa fa-arrows-alt'  ></i>" +
                                                    "</div>"
                                            },
                                            "sorts": {
                                                displayName: "序号",
                                                enableColumnMenu: false,
                                                width: 35,
                                                readonly: true
                                            },

                                            "fieldName": {
                                                displayName: "栏位名",
                                                enableColumnMenu: false,
                                                readonly: true,
                                                width: 100
                                            },
                                            "fieldDesc": {
                                                displayName: "栏位说明",
                                                enableColumnMenu: false,
                                                readonlystatus: {
                                                    relation: "and",
                                                    filedlist: [
                                                        { field: "formstatus", status: "view,read" }, //表单新增状态
                                                    ]
                                                },
                                                width: 120
                                            },
                                            "discretenessno": {
                                                displayName: "类别",
                                                enableColumnMenu: false,
                                                readonlystatus: {
                                                    relation: "and",
                                                    filedlist: [
                                                        { field: "formstatus", status: "view,read" }, //表单新增状态
                                                    ]
                                                },
                                                type: "basLov",
                                                lovtype: "getdiscreteness",
                                                width: 100
                                            },
                                            "lovType": {
                                                displayName: "lov类别",
                                                enableColumnMenu: false,
                                                readonlystatus: {
                                                    relation: "and",
                                                    filedlist: [
                                                        { field: "formstatus", status: "view,read" }, //表单新增状态
                                                    ]
                                                },
                                                type: "basLov",
                                                lovtype: "getlovtype",
                                                width: 100
                                            },
                                            "schemaType": {
                                                displayName: "schemao类别",
                                                enableColumnMenu: false,
                                                readonly: true,
                                                width: 120
                                            }

                                        }

                                    }]
                                },
                                {
                                    title: "行一信息",
                                    items: [{
                                            title: "表名",
                                            key: 'entityNameb',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basLov',
                                            lovtype: "getTables"

                                        },
                                        {
                                            title: "别名",
                                            key: 'aliasNameb',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basString'
                                        },
                                        {
                                            title: "日期",
                                            key: 'linesb',
                                            type: "basEditgrid",
                                            gridkey: "linesb",
                                            css: "cell100",
                                            sortable: {
                                                animation: 100,
                                                handle: '.sortclassb',
                                                onEnd: function(evt) {
                                                    var sorts = 1;
                                                    evt.models.forEach(function(element) {
                                                        element.entity.sorts = sorts;
                                                        sorts += 1;
                                                    }, this);
                                                    scope.model.linesb.sort(function(a, b) {
                                                        var val1 = a["sorts"];
                                                        var val2 = b["sorts"];
                                                        return val1 - val2;
                                                    });

                                                }
                                            },
                                            action: {
                                                add: {
                                                    editstatus: {
                                                        relation: "or",
                                                        editstatus: {
                                                            relation: "and",
                                                            filedlist: [
                                                                { field: "formstatus", status: "add,edit" }, //表单为新增，修改状态
                                                            ]
                                                        },
                                                        filedlist: [
                                                            { field: "formstatus", status: "add,edit" }, //表单新增状态
                                                        ]
                                                    },
                                                    click: function() {

                                                        var paras = {
                                                            entityName: scope.model.entityNameb
                                                        }
                                                        qwsys.getdocuments("getfieldInfos", paras, function(selectmodel) {
                                                            if (selectmodel.type == "rep") {
                                                                scope.model.orderlines_vs.forEach(function(element) {
                                                                    element.isdel = true;
                                                                }, this);
                                                            }
                                                            selectmodel.records.forEach(function(element) {
                                                                var item = {
                                                                    isdel: false,
                                                                    fieldName: element.fieldName,
                                                                    fieldDesc: element.fieldDesc,
                                                                    fieldType: element.fieldType,
                                                                    dbfType: element.fieldType,
                                                                    discretenessno: element.discretenessno,
                                                                    lovType: element.lovType,
                                                                    schemaType: element.schemaType
                                                                }
                                                                scope.model.linesb.push(item);
                                                            }, this);
                                                        });



                                                        // var item = {
                                                        //     isdel: false
                                                        // }
                                                        // scope.model.filters.push(item);
                                                    }
                                                },
                                                del: {
                                                    editstatus: {
                                                        relation: "or",
                                                        filedlist: [
                                                            { field: "formstatus", status: "add,edit" }, //表单新增状态
                                                        ]
                                                    },
                                                    click: function(item) {
                                                        item.isdel = true;
                                                    }
                                                }
                                            },
                                            headers: {
                                                "sort1": {
                                                    displayName: "移动",
                                                    enableColumnMenu: false,
                                                    readonly: true,
                                                    width: 35,
                                                    cellTemplate: "<div class='ui-grid-cell-contents'> " +
                                                        "<i class=' iocstyle statusblue sortclassb  fa fa-arrows-alt'  ></i>" +
                                                        "</div>"
                                                },
                                                "sorts": {
                                                    displayName: "序号",
                                                    enableColumnMenu: false,
                                                    width: 35,
                                                    readonly: true
                                                },

                                                "fieldName": {
                                                    displayName: "栏位名",
                                                    enableColumnMenu: false,
                                                    readonly: true,
                                                    width: 100
                                                },
                                                "fieldDesc": {
                                                    displayName: "栏位说明",
                                                    enableColumnMenu: false,
                                                    readonlystatus: {
                                                        relation: "and",
                                                        filedlist: [
                                                            { field: "formstatus", status: "view,read" }, //表单新增状态
                                                        ]
                                                    },
                                                    width: 120
                                                },
                                                "discretenessno": {
                                                    displayName: "类别",
                                                    enableColumnMenu: false,
                                                    readonlystatus: {
                                                        relation: "and",
                                                        filedlist: [
                                                            { field: "formstatus", status: "view,read" }, //表单新增状态
                                                        ]
                                                    },
                                                    type: "basLov",
                                                    lovtype: "getdiscreteness",
                                                    width: 100
                                                },
                                                "lovType": {
                                                    displayName: "lov类别",
                                                    enableColumnMenu: false,
                                                    readonlystatus: {
                                                        relation: "and",
                                                        filedlist: [
                                                            { field: "formstatus", status: "view,read" }, //表单新增状态
                                                        ]
                                                    },
                                                    type: "basLov",
                                                    lovtype: "getlovtype",
                                                    width: 100
                                                },
                                                "schemaType": {
                                                    displayName: "schemao类别",
                                                    enableColumnMenu: false,
                                                    readonly: true,
                                                    width: 120
                                                }

                                            }

                                        }
                                    ]
                                },
                                {
                                    title: "行二信息",
                                    items: [{
                                            title: "表名",
                                            key: 'entityNamec',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basLov',
                                            lovtype: "getTables"

                                        },
                                        {
                                            title: "别名",
                                            key: 'aliasNamec',
                                            editstatus: {
                                                relation: "and",
                                                filedlist: [
                                                    { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                                ]
                                            },
                                            type: 'basString'
                                        },
                                        {
                                            title: "日期",
                                            key: 'linesc',
                                            type: "basEditgrid",
                                            gridkey: "linesc",
                                            css: "cell100",
                                            sortable: {
                                                animation: 100,
                                                handle: '.sortclassc',
                                                onEnd: function(evt) {
                                                    var sorts = 1;
                                                    evt.models.forEach(function(element) {
                                                        element.entity.sorts = sorts;
                                                        sorts += 1;
                                                    }, this);
                                                    scope.model.linesc.sort(function(a, b) {
                                                        var val1 = a["sorts"];
                                                        var val2 = b["sorts"];
                                                        return val1 - val2;
                                                    });


                                                }
                                            },
                                            action: {
                                                add: {
                                                    editstatus: {
                                                        relation: "or",
                                                        editstatus: {
                                                            relation: "and",
                                                            filedlist: [
                                                                { field: "formstatus", status: "add,edit" }, //表单为新增，修改状态
                                                            ]
                                                        },
                                                        filedlist: [
                                                            { field: "formstatus", status: "add,edit" }, //表单新增状态
                                                        ]
                                                    },
                                                    click: function() {

                                                        var paras = {
                                                            entityName: scope.model.entityNamec
                                                        }
                                                        qwsys.getdocuments("getfieldInfos", paras, function(selectmodel) {
                                                            if (selectmodel.type == "rep") {
                                                                scope.model.orderlines_vs.forEach(function(element) {
                                                                    element.isdel = true;
                                                                }, this);
                                                            }
                                                            selectmodel.records.forEach(function(element) {
                                                                var item = {
                                                                    isdel: false,
                                                                    fieldName: element.fieldName,
                                                                    fieldDesc: element.fieldDesc,
                                                                    fieldType: element.fieldType,
                                                                    dbfType: element.fieldType,
                                                                    discretenessno: element.discretenessno,
                                                                    lovType: element.lovType,
                                                                    schemaType: element.schemaType

                                                                }
                                                                scope.model.linesc.push(item);
                                                            }, this);
                                                        });



                                                        // var item = {
                                                        //     isdel: false
                                                        // }
                                                        // scope.model.filters.push(item);
                                                    }
                                                },
                                                del: {
                                                    editstatus: {
                                                        relation: "or",
                                                        filedlist: [
                                                            { field: "formstatus", status: "add,edit" }, //表单新增状态
                                                        ]
                                                    },
                                                    click: function(item) {
                                                        item.isdel = true;
                                                    }
                                                }
                                            },
                                            headers: {
                                                "sort1": {
                                                    displayName: "移动",
                                                    enableColumnMenu: false,
                                                    readonly: true,
                                                    width: 35,
                                                    cellTemplate: "<div class='ui-grid-cell-contents'> " +
                                                        "<i class=' iocstyle statusblue sortclassc  fa fa-arrows-alt'  ></i>" +
                                                        "</div>"
                                                },
                                                "sorts": {
                                                    displayName: "序号",
                                                    enableColumnMenu: false,
                                                    width: 35,
                                                    readonly: true
                                                },

                                                "fieldName": {
                                                    displayName: "栏位名",
                                                    enableColumnMenu: false,
                                                    readonly: true,
                                                    width: 100
                                                },
                                                "fieldDesc": {
                                                    displayName: "栏位说明",
                                                    enableColumnMenu: false,
                                                    readonlystatus: {
                                                        relation: "and",
                                                        filedlist: [
                                                            { field: "formstatus", status: "view,read" }, //表单新增状态
                                                        ]
                                                    },
                                                    width: 120
                                                },
                                                "discretenessno": {
                                                    displayName: "类别",
                                                    enableColumnMenu: false,
                                                    readonlystatus: {
                                                        relation: "and",
                                                        filedlist: [
                                                            { field: "formstatus", status: "view,read" }, //表单新增状态
                                                        ]
                                                    },
                                                    type: "basLov",
                                                    lovtype: "getdiscreteness",
                                                    width: 100
                                                },
                                                "lovType": {
                                                    displayName: "lov类别",
                                                    enableColumnMenu: false,
                                                    readonlystatus: {
                                                        relation: "and",
                                                        filedlist: [
                                                            { field: "formstatus", status: "view,read" }, //表单新增状态
                                                        ]
                                                    },
                                                    type: "basLov",
                                                    lovtype: "getlovtype",
                                                    width: 100
                                                },
                                                "schemaType": {
                                                    displayName: "schema类别",
                                                    enableColumnMenu: false,
                                                    readonly: true,
                                                    width: 120
                                                }

                                            }

                                        }
                                    ]
                                }

                            ]
                        }

                    ]
                }
            };
            scope.action = {
                add: function(event) {
                    $scope.$broadcast('schemaFormRedraw');
                    scope.model = {
                        formstatus: "add" //edit,view
                    }
                },
                edit: function() {
                    scope.model.formstatus = "edit"
                    scope.$broadcast("schemaFormRedraw");
                    scope.$broadcast("GridRedraw");
                },
                del: function() {
                    dialog.confirm('确定删除当前数据?').then(function() {
                        utils.ajax({
                            method: 'DELETE',
                            url: "bean/stencilMast/" + scope.model.uid,
                            mockUrl: "plugins/data/stencilMast.json"
                        }).then(function(res) {
                            toastr.info("数据删除成功!!!");
                            scope.uid = "";
                            scope.model = {
                                formstatus: "add",
                                linesa: [],
                                linesb: [],
                                linesc: []
                            }
                            scope.refreshtab("refreshstencilMast", {});

                        });
                    });
                },
                undo: function() {
                    if (scope.model.formstatus == "add") {
                        scope.model = angular.copy(scope.bakmodel);
                    } else {
                        scope.model = angular.copy(scope.bakmodel);
                        scope.$broadcast("GridRedraw");
                    }
                    scope.model.formstatus = "view";
                },
                load: function() {
                    if (scope.uid) {
                        utils.ajax({
                            method: 'GET',
                            url: "bean/stencilMast/" + scope.uid,
                            mockUrl: "plugins/data/stencilMast.json"
                        }).then(function(res) {
                            var data = res.data;
                            scope.model = data.body;
                            scope.model.formstatus = "view";
                            for (var p in scope.model) {
                                if (scope.model[p] === null) {
                                    delete scope.model[p];
                                }
                            }
                            scope.bakmodel = angular.copy(scope.model);
                        });
                    } else {
                        scope.bakmodel = angular.copy(scope.model);
                    }

                },
                save: function(event, form) {
                    for (var p in scope.model) {
                        if (scope.model[p] === null) {
                            delete scope.model[p];
                        }
                    }
                    scope.$broadcast("schemaFormValidate");
                    if (!form.base_form.$valid) {
                        toastr.warning("请输入必填项！");
                        return
                    }
                    var type = scope.model.uid ? "edit" : "add";
                    var bakstatus = scope.model.formstatus
                    scope.model.formstatus = "read";
                    utils.ajax({
                        method: "POST",
                        url: "bean/stencilMast",
                        mockUrl: "plugins/data/stencilMast.json",
                        data: scope.model
                    }).then(function(res) {
                        scope.uid = res.data.body.uid
                        if (type == "add") {
                            toastr.info("新增成功！");
                        } else {
                            toastr.info("修改成功！");
                        }
                        scope.action.load();
                        $scope.$broadcast('schemaFormRedraw');
                        scope.refreshtab("refreshstencilMast", {});

                    }, function(error) {
                        $timeout(function() {
                            scope.model.formstatus = bakstatus
                        }, 100);

                    });
                }
            };
            scope.action.load();
        });

});