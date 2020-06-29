define(function() {
    angular.module('app').controller('base.sysvar',
        function($rootScope, $scope, $location, utils, path, getSingleView, settings,
            $timeout, dialog, toastr, ngDialog, uiGridConstants, qwsys, sysconstant) {
            var scope = $scope;

            scope.model = {
                formstatus: "add" //edit,view
            };
            scope.promise = null;
            scope.detailUrl = "plugins/bas/templates/detail.html";
            scope.config = {
                listoperation: {

                    save: {
                        name: "保存",
                        icon: "fa-save",
                        action: function(event, form) {
                            scope.action.save(event, form);
                        }
                    },
                    refresh: {
                        name: "刷新",
                        icon: "fa-refresh",
                        htmlClass: "refresh",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "view" }, //表单为新增，修改状态
                            ]
                        },
                        action: function(event, form) {
                            scope.action.load();
                        }
                    }
                },
                form: {
                    schema: {
                        "type": "object",
                        "properties": {
                            "schemaType": {
                                "title": "sreadm类别",
                                "type": "string"
                            }
                        }
                    },
                    form: [{
                        type: "group",
                        title: "配置信息",
                        items: [{
                            title: "sreadm类别",
                            key: 'schemaType',
                            type: 'basDefault',
                            lovtype: ''
                        }]
                    }]
                }
            };
            scope.action = {

                load: function() {

                    scope.promise = utils.ajax({
                        method: 'GET',
                        url: "base/sysvar/getgroptype",
                        mockUrl: "plugins/data/sysvar.json"
                    }).then(function(res) {
                        var data = res.data;
                        scope.sysvartype = data.body;
                        if (scope.sysvartype.length > 0) {
                            scope.var_type = scope.sysvartype[0].id;
                            scope.action.setconfig()
                        }

                    });

                },
                setconfig: function() {
                    var filter = {
                        var_type: scope.var_type
                    }
                    scope.promise = utils.ajax({
                        method: 'POST',
                        url: "base/sysvar/query?page=0&size=30",
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: filter
                    }).then(function(res) {
                        scope.sysvars = res.data.body.content;
                        scope.model = {};
                        scope.config.form.schema.properties = {};
                        scope.config.form.form[0].items = [];
                        scope.sysvars.forEach(function(element) {
                            if (element.schemaType == "number") {
                                element.var_val = element.var_val * 1;
                            }
                            //转换成model
                            scope.model[element.var_name] = element.var_val;

                            //转换成scream
                            var scream = {
                                title: element.var_desc,
                                type: element.schemaType
                            }
                            scope.config.form.schema.properties[element.var_name] = scream;

                            //转换成form
                            var form = {
                                title: element.var_desc,
                                key: element.var_name,
                                css: "cell2",
                                type: element.discretenessno,
                                lovtype: element.lovType
                            }
                            if (element.var_name == "ordpritype") { //客户产品售价特欣殊处理
                                form.titleMap = [
                                    { value: "itmprice", name: "产品定价" },
                                    { value: "quoprice", name: "报价记录" },
                                    { value: "ordprice", name: "订单记录" },
                                    { value: "shpprice", name: "出货记录" }

                                ]

                            }

                            scope.config.form.form[0].items.push(form);

                        }, this);
                        $scope.$broadcast('schemaFormRedraw');



                    });

                },
                save: function(event, form) {
                    scope.sysvars.forEach(function(element) {
                        element.var_val = scope.model[element.var_name]
                    }, this);

                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "base/sysvar/savelist",
                        mockUrl: "plugins/data/sysvar.json",
                        data: scope.sysvars
                    }).then(function(res) {
                        toastr.info("设置成功！");
                    });
                }
            };


            scope.sysvartype = [];
            scope.treeOption = {
                id: "id",
                parent: "pid",
                name: "name",
                clicknode: function(item) { //tree内部固定
                    scope.var_type = item.id;
                    scope.action.setconfig()
                }
            }



            scope.action.load();
        });

});