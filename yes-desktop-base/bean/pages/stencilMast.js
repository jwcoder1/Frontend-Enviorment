define(function() {
    angular.module('app').controller('bean.stencilMast',
        function($rootScope, $scope, $location, uiGridConstants, utils, path, getSingleView, settings,
            $timeout, dialog, toastr, ngDialog, qwsys, $http) {
            var scope = $scope;
            scope.filter = {};
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
                    add: {
                        name: "新增",
                        icon: "fa-calendar-check-o",
                        action: function(event, scope) {
                            scope.action.add();
                        }
                    }
                },
                headers: {
                    "beanname": {
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
                    }

                },
                filterItems: {
                    beanname: {
                        type: "input",
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
                    entityName: {
                        type: "input",
                        name: "entityNamea",
                        label: "实体名 "
                    }
                }
            }

            scope.action = {
                add: function() {
                    $rootScope.uid = "";
                    var node = {
                        name: "新增模版",
                        url: 'bean/stencilMast.detail'
                    }
                    $scope.$emit('opencusdetail', node);
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
                    scope.filter = {

                    };

                },
                changepage: function(page, size) {
                    scope.datapage.page = page;
                    scope.datapage.size = size;
                    scope.action.load();
                },
                rowclick: function(entity) {
                    $rootScope.uid = entity.uid;
                    var node = {
                        name: entity.stencilname + "模版",
                        url: 'bean/stencilMast.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshstencilMast', function(event, message) {
                scope.action.load()
            });
            scope.action.load();


        });

});