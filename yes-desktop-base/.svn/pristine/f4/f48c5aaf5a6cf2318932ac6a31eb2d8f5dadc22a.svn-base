define(function() {
    angular.module('app').controller('bean.stencilconfigure',
        function($rootScope, $scope, $location, uiGridConstants, utils, path, getSingleView, settings,
            $timeout, dialog, toastr, ngDialog, qwsys, $http) {
            var scope = $scope;
            scope.filter = {
                // stencilType: 'stencilconfigure'
            };
            scope.model = {
                records: 0,
                content: []
            }
            scope.datapage = {
                page: 0,
                size: 20
            }
            scope.listUrl = "plugins/bean/templates/list.html";
            scope.config = {
                title: "查询列表配置",
                listoperation: {
                    addquery: {
                        name: "新增查询列表",
                        icon: "fa-calendar-check-o",
                        action: function(event, scope) {
                            scope.action.add("查询列表", "queryconfigure");
                        }
                    },
                    addsingleg: {
                        name: "单档分组",
                        icon: "fa-calendar-check-o",
                        action: function(event, scope) {
                            scope.action.add("单档分组", "singlegconfigure");
                        }
                    },
                    addsinglet: {
                        name: "单档页签",
                        icon: "fa-calendar-check-o",
                        action: function(event, scope) {
                            scope.action.add("单档页签", "singletconfigure");
                        }
                    },
                    addboth: {
                        name: "双档明细",
                        icon: "fa-calendar-check-o",
                        action: function(event, scope) {
                            scope.action.add("双档明细", "bothconfigure");
                        }
                    },
                    addthree: {
                        name: "三档明细",
                        icon: "fa-calendar-check-o",
                        action: function(event, scope) {
                            scope.action.add("三档明细", "threeconfigure");
                        }
                    },
                    addtree: {
                        name: "树型明细",
                        icon: "fa-calendar-check-o",
                        action: function(event, scope) {
                            scope.action.addtree("树型明细", "treeconfigure");
                        }
                    },
                    addtreedata: {
                        name: "树型资料",
                        icon: "fa-calendar-check-o",
                        action: function(event, scope) {
                            scope.action.add("树型资料", "treedataconfigure");
                        }
                    }
                },
                headers: {
                    "beanname": {
                        type: "basLov",
                        lovtype: "getBeans",
                        displayName: "模块名",
                        width: 120
                    },
                    "stencilname": {
                        displayName: "模版名称",
                        width: 120
                    },
                    "fileName": {
                        displayName: "文件名",
                        width: 120
                    },
                    "entityNamea": {
                        displayName: "实体名",
                        width: 220
                    },
                    "stencilType": {
                        displayName: "类别",
                        width: 220,
                        type: "basLov",
                        lovtype: "select",
                        titleMap: [
                            { value: "queryconfigure", name: "查询列表" },
                            { value: "singlegconfigure", name: "单档分组" },
                            { value: "singletconfigure", name: "单档页签" },
                            { value: "bothconfigure", name: "双档明细" },
                            { value: "threeconfigure", name: "三档明细" },
                            { value: "treeconfigure", name: "树型明细" },
                            { value: "treedataconfigure", name: "树型资料" }

                        ]
                    }


                },
                filterItems: {
                    beanname: {
                        type: "basLov",
                        lovtype: "getBeans",
                        name: "beanname",
                        label: "模块名"
                    },
                    stencilname: {
                        type: "input",
                        name: "stencilname",
                        label: "模版名称"
                    },
                    fileName: {
                        type: "input",
                        name: "fileName",
                        label: "文件名 "
                    },
                    entityNamea: {
                        type: "input",
                        name: "entityNamea",
                        label: "实体名 "
                    },
                    stencilType: {
                        type: "basLov",
                        lovtype: "select",
                        titleMap: [
                            { value: "queryconfigure", name: "查询列表" },
                            { value: "singlegconfigure", name: "单档分组" },
                            { value: "singletconfigure", name: "单档页签" },
                            { value: "bothconfigure", name: "双档明细" },
                            { value: "threeconfigure", name: "三档明细" },
                            { value: "treeconfigure", name: "树型明细" },
                            { value: "treedataconfigure", name: "树型资料" }
                        ],
                        name: "stencilType",
                        label: "实体名 "
                    }
                }
            }

            scope.action = {
                add: function(desc, type) {
                    $rootScope.uid = "";
                    scope.action.opendetail(desc, type)
                },

                load: function() {

                    utils.ajax({
                        method: 'POST',
                        url: "bean/stencilMast/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=created,desc ",
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: scope.filter
                    }).then(function(res) {
                        scope.model = res.data.body;
                    });

                },
                reset: function() {
                    scope.filter = {};
                },
                changepage: function(page, size) {
                    scope.datapage.page = page;
                    scope.datapage.size = size;
                    scope.action.load();
                },
                rowclick: function(entity) {
                    $rootScope.uid = entity.uid;
                    scope.action.opendetail(entity.stencilname, entity.stencilType)
                },
                opendetail: function(desc, type) {

                    var node = {
                        name: desc + "模版",
                        url: 'bean/' + type + '.detail'
                    }
                    $scope.$emit('opencusdetail', node);

                }
            }
            $scope.$on('refreshstencilconfigure', function(event, message) {
                scope.action.load()
            });
            scope.action.load();


        });

});