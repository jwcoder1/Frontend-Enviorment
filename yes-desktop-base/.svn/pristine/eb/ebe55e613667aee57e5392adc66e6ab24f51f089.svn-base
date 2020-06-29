define(function() {
    angular.module('app').controller('bean.tableInfos',
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

            // $scope.sortOption = {
            //     animation: 100,
            //     handle: '.query-item',
            //     onEnd: function(evt) {
            //         var dd = 11;
            //         dd = 22;


            //     }
            // };


            scope.listUrl = "plugins/bean/templates/list.html";
            scope.config = {
                title: "表结构查询",
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
                        type: 'basLov',
                        lovtype: "getBeans",
                        width: 120
                    },
                    "entityName": {
                        displayName: "实体名",
                        width: 120
                    },
                    "tableName": {
                        displayName: "表名",
                        width: 220
                    },
                    "tableDesc": {
                        displayName: "表说明",
                        width: 220
                    },
                    "type": {
                        displayName: "类别",
                        type: "basLov",
                        lovtype: "select",
                        titleMap: [
                            { value: "1", name: "表" },
                            { value: "2", name: "视图" }
                        ],
                        width: 220
                    }

                },
                filterItems: {
                    beanname: {
                        type: 'basLov',
                        lovtype: "getBeans",
                        name: "beanname",
                        label: "模块名"
                    },
                    entityName: {
                        type: "input",
                        name: "entityName",
                        label: "实体名 "
                    },
                    tableName: {
                        type: "input",
                        name: "tableName",
                        label: "表名 "
                    },
                    tableDesc: {
                        type: "input",
                        name: "tableDesc",
                        label: "表说明 "
                    }
                }
            }

            scope.action = {
                add: function() {
                    $rootScope.uid = "";
                    var node = {
                        name: "表结构明细",
                        url: 'bean/tableInfos.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                },

                load: function() {

                    utils.ajax({
                        method: 'POST',
                        url: "bean/tableInfos/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=created,desc ",
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
                        name: "表信息明细",
                        url: 'bean/tableInfos.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshtableInfos', function(event, message) {
                scope.action.load()
            });
            scope.action.load();


        });

});