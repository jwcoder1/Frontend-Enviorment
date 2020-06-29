define(function() {
    angular.module('app').controller('bean.annotation.detail',
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
                    }

                },
                form: {
                    schema: {
                        "type": "object",
                        "properties": {
                            "authorName": {
                                "title": "开发者姓名",
                                "type": "string",
                                required: true
                            },
                            "authorMail": {
                                "title": "邮件",
                                "type": "string",
                                required: true
                            },
                            "version": {
                                "title": "版本号",
                                "type": "string"
                            },
                            "savepath": {
                                "title": "存档路径",
                                "type": "string"
                            }
                        }
                    },
                    form: [{
                        type: "group",
                        title: "基本信息",
                        items: [{
                                title: "开发者姓名",
                                key: 'authorName',
                                editstatus: {
                                    relation: "and",
                                    filedlist: [
                                        { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                    ]
                                },
                                type: 'basString'
                            },
                            {
                                title: "e-mail",
                                key: 'authorMail',
                                editstatus: {
                                    relation: "and",
                                    filedlist: [
                                        { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                    ]
                                },
                                type: 'basString'
                            },
                            {
                                title: "版本号",
                                key: 'version',
                                editstatus: {
                                    relation: "and",
                                    filedlist: [
                                        { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                    ]
                                },
                                type: 'basString'
                            },
                            {
                                title: "前端路径",
                                key: 'savepath',
                                css: "cell100",
                                editstatus: {
                                    relation: "and",
                                    filedlist: [
                                        { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                    ]
                                },
                                type: 'basString'
                            },
                            {
                                title: "后端路径",
                                key: 'javapath',
                                css: "cell100",
                                editstatus: {
                                    relation: "and",
                                    filedlist: [
                                        { field: "formstatus", status: "add,edit" } //表单为新增，修改状态
                                    ]
                                },
                                type: 'basString'
                            },
                            {
                                title: "备注:",
                                css: "cell100",
                                labelHtmlClass: "inherit",
                                fieldHtmlClass: "inherit",
                                value: "存档路径为前端开发路径",
                                type: 'basLabel'
                            }


                        ]
                    }]
                }
            };
            scope.action = {

                load: function() {
                    // if (scope.uid) {
                    utils.ajax({
                        method: 'GET',
                        url: "bean/annotation/aid",
                        mockUrl: "plugins/data/annotation.json"
                    }).then(function(res) {
                        var data = res.data;
                        scope.model = data.body;
                        scope.model.formstatus = "edit";
                        for (var p in scope.model) {
                            if (scope.model[p] === null) {
                                delete scope.model[p];
                            }
                        }
                        scope.bakmodel = angular.copy(scope.model);
                    });
                    // } else {
                    //     scope.bakmodel = angular.copy(scope.model);
                    // }

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
                        // scope.model.formstatus = "read";
                    utils.ajax({
                        method: "POST",
                        url: "bean/annotation",
                        mockUrl: "plugins/data/annotation.json",
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
                        scope.refreshtab("refreshannotation", {});

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