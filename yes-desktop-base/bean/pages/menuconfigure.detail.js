define(function() {
    angular.module('app').controller('bean.menuconfigure.detail',
        function($rootScope, $scope, $location, utils, path, getSingleView, settings,
            $timeout, dialog, toastr, ngDialog, uiGridConstants, qwsys) {
            var scope = $scope;
            scope.model = {
                formstatus: "add" //edit,view
            };
            if ($rootScope.model) {
                scope.model = $rootScope.model;
                $rootScope.model = "";
            };

            scope.promise = null;
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
                        readonlystatus: {
                            relation: "or",
                            filedlist: [
                                { field: "formstatus", status: "add,edit" }, //查询状态  
                                { field: "mid", status: "SYS" }
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
                        readonlystatus: {
                            relation: "or",
                            filedlist: [
                                { field: "formstatus", status: "add,edit" }, //查询状态  
                                { field: "mid", status: "SYS" }
                            ]
                        },
                        action: function(event, form) {
                            scope.action.del(event);
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
                    cjson: {
                        name: "生成json",
                        icon: "fa-edit",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "view" } //查询状态                              
                            ]
                        },
                        action: function(event, form) {
                            scope.action.cjson(event);
                        }
                    }
                },
                form: {
                    schema: {
                        "type": "object",
                        "properties": {
                            "order": {
                                "title": "顺序号",
                                "type": "Boolean"
                            },
                            "pid": {
                                "title": "上级编号",
                                "type": "Boolean"
                            },
                            "mid": {
                                "title": "编号",
                                "type": "Boolean"
                            },
                            "name": {
                                "title": "名称",
                                "type": "Boolean"
                            },
                            "url": {
                                "title": "URL 地址",
                                "type": "Boolean"
                            },
                            "blank": {
                                "title": "新窗口开启",
                                "type": "Boolean"
                            },
                            "type": {
                                "title": "类别",
                                "type": "Boolean"
                            },
                            "color": {
                                "title": "颜色",
                                "type": "Boolean"
                            },
                            "tag": {
                                "title": "标签",
                                "type": "Boolean"
                            },
                            "home": {
                                "title": "首页链接",
                                "type": "Boolean"
                            },
                            "tip": {
                                "title": "提示",
                                "type": "Boolean"
                            },
                            "memo": {
                                "title": "备注",
                                "type": "Boolean"
                            },
                            "icon": {
                                "title": "图标",
                                "type": "Boolean"
                            },
                            "expanded": {
                                "title": "自动展开",
                                "type": "Boolean"
                            },
                            "enable": {
                                "title": "已启用",
                                "type": "Boolean"
                            }
                        }
                    },
                    form: [{
                            type: "group",
                            title: "SDFWEFWE",
                            items: [{
                                    title: "顺序号",
                                    key: 'order',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basString',
                                    lovtype: ''
                                },
                                {
                                    title: "上级编号",
                                    key: 'pid',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    onchange: function() {
                                        if (scope.model.tag) {
                                            scope.model.mid = (scope.model.pid ? scope.model.pid + "_" : "") + scope.model.tag;
                                        }
                                        if (scope.model.tag && scope.model.pid && scope.model.pid != "SYS") {
                                            if (scope.model.pid.split("_").length == 1) {
                                                scope.model.url = "#/" + scope.model.pid.split("_")[0] + "/" + scope.model.tag;
                                                scope.model.type = "menu";
                                            } else {
                                                scope.model.url = "#"
                                                scope.model.type = "button";
                                            }

                                        } else {
                                            scope.model.url = "#"
                                        }
                                    },
                                    type: 'basString',
                                    lovtype: ''
                                },
                                {
                                    title: "标签",
                                    key: 'tag',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basString',
                                    onchange: function() {
                                        scope.model.mid = ((scope.model.pid && scope.model.pid != "SYS") ? scope.model.pid + "_" : "") + scope.model.tag;
                                        if (scope.model.tag && scope.model.pid && scope.model.pid != "SYS") {
                                            if (scope.model.pid.split("_").length == 1) {
                                                scope.model.url = "#/" + scope.model.pid.split("_")[0] + "/" + scope.model.tag;
                                                scope.model.type = "menu";
                                            } else {
                                                scope.model.url = "#"
                                                scope.model.type = "button";
                                            }

                                        } else {
                                            scope.model.url = "#"
                                        }
                                    },
                                    lovtype: ''
                                },
                                {
                                    title: "编号",
                                    key: 'mid',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basString',
                                    lovtype: ''
                                },
                                {
                                    title: "名称",
                                    key: 'name',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    onchange: function() {
                                        scope.model.tip = scope.model.name;
                                        scope.model.memo = scope.model.name;

                                    },
                                    type: 'basString',
                                    lovtype: ''
                                },
                                {
                                    title: "URL 地址",
                                    key: 'url',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basString',
                                    lovtype: ''
                                },
                                {
                                    title: "新窗口开启",
                                    key: 'blank',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basRadiosinline',
                                    titleMap: [
                                        { value: true, name: "是" },
                                        { value: false, name: "否" }
                                    ],
                                    lovtype: 'select'
                                },
                                {
                                    title: "类别",
                                    key: 'type',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basLov',
                                    titleMap: [
                                        { value: "menu", name: "menu" },
                                        { value: "button", name: "button" }
                                    ],
                                    lovtype: 'select'
                                },
                                {
                                    title: "颜色",
                                    key: 'color',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basLov',
                                    titleMap: [
                                        { value: "btn-pink", name: "<a class='btn btn-app btn-sm menu-btn btn-pink' >  </a>" },
                                        { value: "btn-success", name: "<a class='btn btn-app btn-sm menu-btn btn-success' >  </a>" },
                                        { value: "btn-info", name: "<a class='btn btn-app btn-sm menu-btn btn-info' >  </a>" },
                                        { value: "btn-warning", name: "<a class='btn btn-app btn-sm menu-btn btn-warning' >  </a>" },
                                        { value: "btn-danger", name: "<a class='btn btn-app btn-sm menu-btn btn-danger' >  </a>" },
                                        { value: "btn-primary", name: "<a class='btn btn-app btn-sm menu-btn btn-primary' >   </a>" }
                                    ],
                                    lovtype: 'select'
                                },

                                {
                                    title: "首页链接",
                                    key: 'home',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basRadiosinline',
                                    titleMap: [
                                        { value: true, name: "是" },
                                        { value: false, name: "否" }
                                    ],
                                    lovtype: 'select'
                                },
                                {
                                    title: "提示",
                                    key: 'tip',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basString',
                                    lovtype: ''
                                },
                                {
                                    title: "备注",
                                    key: 'memo',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basString',
                                    lovtype: ''
                                },
                                {
                                    title: "图标",
                                    key: 'icon',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basString',
                                    lovtype: ''
                                },
                                {
                                    title: "自动展开",
                                    key: 'expanded',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basRadiosinline',
                                    titleMap: [
                                        { value: true, name: "是" },
                                        { value: false, name: "否" }
                                    ],
                                    lovtype: 'select'
                                },
                                {
                                    title: "已启用",
                                    key: 'enable',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basRadiosinline',
                                    titleMap: [
                                        { value: true, name: "是" },
                                        { value: false, name: "否" }
                                    ],
                                    lovtype: ''
                                }
                            ]
                        }
                        //下面为分组B
                        //下面为分组C
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
                    scope.$broadcast("GridRedraw");
                },
                copy: function() {
                    scope.model.uid = "";
                    scope.model.formstatus = "edit"
                    scope.$broadcast("GridRedraw");
                },
                del: function() {
                    dialog.confirm('确定删除当前数据?').then(function() {
                        scope.promise = utils.ajax({
                            method: 'DELETE',
                            url: "bean/menuconfigure/" + scope.model.uid,
                            mockUrl: "plugins/data/menuconfigure.detail.json"
                        }).then(function(res) {
                            toastr.info("数据删除成功!!!");
                            scope.uid = "";
                            scope.model = {
                                formstatus: "add",
                            }
                            scope.refreshtab("refreshbean.menuconfigure", {});

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
                    if (scope.model.uid) {
                        scope.promise = utils.ajax({
                            method: 'GET',
                            url: "bean/menuconfigure/" + scope.model.uid,
                            mockUrl: "plugins/data/menuconfigure.detail.json"
                        }).then(function(res) {
                            var data = res.data;
                            data.body.formstatus = scope.model.formstatus;
                            scope.model = data.body;
                            for (var p in scope.model) {
                                if (scope.model[p] === null) {
                                    delete scope.model[p];
                                }
                            }

                            scope.bakmodel = angular.copy(scope.model);
                        });
                    } else {
                        if (scope.model.mid == "SYS") {
                            scope.model.formstatus = "view";
                        }
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
                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "bean/menuconfigure",
                        mockUrl: "plugins/data/menuconfigure.detail.json",
                        data: scope.model
                    }).then(function(res) {
                        scope.uid = res.data.body.uid
                        if (type == "add") {
                            toastr.info("新增成功！");
                        } else {
                            toastr.info("修改成功！");
                        }
                        scope.model.formstatus = "view";
                        scope.action.load();
                        $scope.$broadcast('schemaFormRedraw');
                        scope.refreshtab("refreshbean.menuconfigure", {});
                    }, function(error) {
                        $timeout(function() {
                            scope.model.formstatus = bakstatus
                        }, 100);

                    });
                },
                cjson: function() {
                    scope.promise = utils.ajax({
                        method: 'GET',
                        url: "bean/sysbean/createjson",
                        mockUrl: "plugins/data/menuconfigure.detail.json",
                        params: {
                            mid: scope.model.mid
                        }
                    }).then(function(res) {
                        toastr.info("json创建成功！");
                    });
                }
            };
            scope.action.load();
        });

});