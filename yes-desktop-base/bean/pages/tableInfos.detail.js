define(function() {
    angular.module('app').controller('bean.tableInfos.detail',
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
                    },
                    getByentityName: {
                        name: "获取实体",
                        icon: "fa-edit",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "add,edit" } //查询状态                              
                            ]
                        },
                        action: function(event, form) {
                            scope.action.getByentityName(event, "1");
                        }
                    },
                    getByveiewName: {
                        name: "获取视图",
                        icon: "fa-edit",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "add,edit" } //查询状态                              
                            ]
                        },
                        action: function(event, form) {
                            scope.action.getByentityName(event, "2");
                        }
                    },
                    createbean: {
                        name: "后台生成",
                        icon: "fa-edit",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "view" } //查询状态                              
                            ]
                        },
                        action: function(event, form) {
                            scope.action.createbean(event);
                        }
                    },
                    copy: {
                        name: "复制",
                        icon: "fa-edit",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "view" } //查询状态                              
                            ]
                        },
                        action: function(event, form) {
                            scope.action.copy(event);
                        }
                    },
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
                            "entityName": {
                                "title": "实体名",
                                "type": "string",
                                required: true
                            },
                            "tableName": {
                                "title": "表名",
                                "type": "string"
                            },
                            "tableDesc": {
                                "title": "表说明",
                                "type": "string"
                            },
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
                                    title: "实体名",
                                    key: 'entityName',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    onchange: function() {
                                        scope.model.tableName = scope.model.entityName
                                    },
                                    type: 'basString'
                                },
                                {
                                    title: "表名",
                                    key: 'tableName',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basString'
                                },
                                {
                                    title: "表说明",
                                    key: 'tableDesc',
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
                            type: 'basLine',
                            css: "cell100 ",
                            title: "栏位信息"
                        },
                        {
                            title: "栏位信息",
                            key: 'fieldInfos',
                            type: "basEditgrid",
                            gridkey: "tableinfos.details.fieldInfos",
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
                                    scope.model.fieldInfos.sort(function(a, b) {
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
                                        var item = {
                                            isdel: false
                                        }
                                        scope.model.fieldInfos.push(item);
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
                                "sort": {
                                    displayName: "移动",
                                    enableColumnMenu: false,
                                    readonly: true,
                                    width: 35,
                                    cellTemplate: "<div class='ui-grid-cell-contents'> " +
                                        "<i class=' iocstyle statusblue sortclassa  fa fa-arrows-alt'  ></i>" +
                                        "</div>"
                                },
                                "fieldName": {
                                    displayName: "实体栏位",
                                    required: true,
                                    onchange: function(entity) {
                                        entity.dbfFieldName = entity.fieldName;
                                        if (!entity.fieldType) {
                                            entity.fieldType = "String";
                                            entity.dbfType = "String";
                                            entity.schemaType = "string";
                                            entity.discretenessno = "basDefault";
                                            entity.primaryKey = "N";
                                            entity.notEmpty = "N";
                                            entity.findField = "N";
                                            entity.length = 32;
                                            entity.precision = 32;
                                            entity.scale = 0;
                                        }

                                        scope.config.form.form[2].headers.dbfType.titleMap = [
                                            { value: "String", name: "String" },
                                            { value: "String", name: "Text" }
                                        ]
                                    },
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    width: 110
                                },
                                "dbfFieldName": {
                                    displayName: "库栏位",
                                    required: true,
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    width: 110
                                },
                                "fieldDesc": {
                                    displayName: "栏位说明",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    width: 150
                                },
                                "fieldType": {
                                    displayName: "实体栏位类别",
                                    type: "basLov",
                                    lovtype: "getfieldtypes",
                                    relationfield: [
                                        { findfield: "schemaType", tofield: "schemaType" },
                                        { findfield: "discretenessno", tofield: "discretenessno" }
                                    ],
                                    onchange: function(entity) {
                                        entity.dbfType = entity.fieldType;
                                        entity.length = 32;
                                        if (entity.fieldType == "String") {
                                            entity.precision = 32;
                                            entity.scale = 0;
                                            // scope.config.form.form[2].headers.dbfType.titleMap = [
                                            //     { value: "String", name: "String" },
                                            //     { value: "Text", name: "Text" }
                                            // ]
                                        } else if (entity.fieldType == "Date") {
                                            // scope.config.form.form[2].headers.dbfType.titleMap = [
                                            //     { value: "Date", name: "Date" },
                                            //     { value: "Time", name: "Time" }
                                            // ]
                                        } else {
                                            // scope.config.form.form[2].headers.dbfType.titleMap = [
                                            //     { value: entity.fieldType, name: entity.fieldType }
                                            // ]
                                        }


                                    },
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    width: 100
                                },
                                "dbfType": {
                                    displayName: "表栏位类别",
                                    type: "basLov",
                                    lovtype: "getdbftypes",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" } //表单新增状态
                                        ]
                                    },
                                    width: 100
                                },

                                "discretenessno": {
                                    displayName: "表单组件",
                                    type: "basLov",
                                    lovtype: "getdiscretenessa",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    width: 100
                                },
                                "lovType": {
                                    displayName: "lov类别",
                                    type: "basLov",
                                    lovtype: "getlovtype",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    width: 100
                                },

                                "schemaType": {
                                    displayName: "schema类别",
                                    readonly: true,
                                    // type: "basLov",
                                    // lovtype: "select",
                                    // titleMap: [
                                    //     { value: "string", name: "string" },
                                    //     { value: "number", name: "number" },
                                    //     { value: "Boolean", name: "Boolean" }
                                    // ],
                                    // readonlystatus: {
                                    //     relation: "and",
                                    //     filedlist: [
                                    //         { field: "formstatus", status: "view" }, //表单新增状态
                                    //     ]
                                    // },
                                    width: 100
                                },

                                "length": {
                                    displayName: "长度",
                                    type: "number",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    width: 80
                                },
                                "precision": {
                                    displayName: "整形长度",
                                    type: "number",
                                    readonlystatus: {
                                        relation: "and",
                                        type: "number",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    width: 80
                                },
                                "scale": {
                                    displayName: "小数位数",
                                    type: "number",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    width: 80
                                },
                                "primaryKey": {
                                    displayName: "是否主键",
                                    type: "basLov",
                                    lovtype: "select",
                                    titleMap: [{ value: "Y", name: "Y" }, { value: "N", name: "N" }],
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    width: 80
                                },
                                "notEmpty": {
                                    displayName: "不可为空",
                                    type: "basLov",
                                    lovtype: "select",
                                    titleMap: [{ value: "Y", name: "Y" }, { value: "N", name: "N" }],
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    width: 80
                                },
                                "fconditions": {
                                    displayName: "查询条件",
                                    type: "basLov",
                                    lovtype: "select",
                                    titleMap: [
                                        { value: "eq", name: "等于" },
                                        { value: "gt", name: "大于" },
                                        { value: "lt", name: "小于" },
                                        { value: "gte", name: "大于等于" },
                                        { value: "lte", name: "小于等于" },
                                        { value: "match", name: "包含" },
                                        { value: "in", name: "在于" },
                                        { value: "notin", name: "不在于" }
                                    ],
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    width: 100,
                                    onchange: function(entity) {
                                        entity.fdiscretenessno = "basDefault";
                                    }
                                },
                                "fdiscretenessno": {
                                    displayName: "查询组件",
                                    type: "basLov",
                                    lovtype: "getdiscretenessb",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    width: 100
                                },
                                "flovType": {
                                    displayName: "查询lov类别",
                                    type: "basLov",
                                    lovtype: "getlovtype",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "view" }, //表单新增状态
                                        ]
                                    },
                                    width: 100
                                }


                            }

                        }
                    ]
                }
            };
            scope.action = {
                add: function(event) {
                    $scope.$broadcast('schemaFormRedraw');
                    scope.model = {
                        formstatus: "add", //edit,view
                        type: "1"
                    }
                },
                copy: function(event) {

                    scope.model.uid = "";
                    scope.model.formstatus = "add";
                    scope.model.fieldInfos.forEach(element => {
                        element.uid = "";
                    });
                    $scope.$broadcast('schemaFormRedraw');

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
                            url: "bean/tableInfos/" + scope.model.uid,
                            mockUrl: "plugins/data/tableInfos.json"
                        }).then(function(res) {
                            toastr.info("数据删除成功!!!");
                            scope.uid = "";
                            scope.model = {
                                fieldInfos: [],
                                formstatus: "add"
                            }
                            scope.refreshtab("refreshtableInfos", {});

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
                            url: "bean/tableInfos/" + scope.uid,
                            mockUrl: "plugins/data/tableInfos.json"
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
                        scope.action.add();
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
                        url: "bean/tableInfos",
                        mockUrl: "plugins/data/tableInfos.json",
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
                        scope.refreshtab("refreshtableInfos", {});

                    }, function(error) {
                        $timeout(function() {
                            scope.model.formstatus = bakstatus
                        }, 100);

                    });
                },
                getByentityName: function(event, type) {

                    utils.ajax({
                        method: "GET",
                        url: "bean/sysbean/getByentityName",
                        mockUrl: "plugins/data/getByentityName.json",
                        params: {
                            beanname: scope.model.beanname,
                            entityname: scope.model.entityName,
                            type: type
                        }
                    }).then(function(res) {
                        scope.model.type = type;
                        scope.model.fieldInfos = res.data.body;
                        scope.model.fieldInfos.forEach(function(element) {
                            if (element.fconditions) {
                                element.fdiscretenessno = "basDefault";
                            }
                            var filter = {
                                fieldType: element.fieldType
                            }
                            var page = {
                                page: 0,
                                size: 1
                            }
                            qwsys.getlovrecord(filter, page, "getfieldtypes").then(function(res) {
                                rec = res.data.body.content[0];
                                if (!rec) {
                                    return
                                }
                                element.schemaType = rec.schemaType;
                                element.discretenessno = rec.discretenessno;
                            })

                        }, this);

                        toastr.info("获取成功");

                    }, function(error) {

                    });
                },
                createbean: function(event, form) {

                    if (scope.model.type == "2") {
                        toastr.info("视图不可生成");
                        return
                    }

                    utils.ajax({
                        method: "GET",
                        url: "bean/sysbean/createbean/" + scope.model.uid,
                        mockUrl: "plugins/data/bothconfigure.json",
                        data: {}
                    }).then(function(res) {
                        toastr.info("创建成功");

                    }, function(error) {

                    });
                }
            };
            scope.action.load();
        });

});