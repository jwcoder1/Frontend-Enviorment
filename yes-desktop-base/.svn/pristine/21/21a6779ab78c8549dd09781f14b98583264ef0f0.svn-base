define(function() {
    angular.module('app').controller('bean.fieldtypes',
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
                title: "模块管理",
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
                    "fieldType": {
                        displayName: "实体类别",
                        width: 120
                    },
                    "dbfType": {
                        displayName: "表类别",
                        width: 120
                    },
                    "discretenessno": {
                        displayName: "预设组件",
                        width: 120
                    },
                    "schemaType": {
                        displayName: "schema类别",
                        width: 220
                    }

                },
                filterItems: {
                    fieldType: {
                        type: "input",
                        name: "fieldType",
                        label: "类别"
                    },
                    discretenessno: {
                        type: "input",
                        name: "discretenessno",
                        label: "预设组件 "
                    },
                    schemaType: {
                        type: "input",
                        name: "schemaType",
                        label: "schema类别 "
                    }
                }
            }

            scope.action = {
                add: function() {
                    $rootScope.uid = "";
                    var node = {
                        name: "模块明细",
                        url: 'bean/fieldtypes.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                },

                load: function() {

                    utils.ajax({
                        method: 'POST',
                        url: "bean/fieldtypes/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=created,desc ",
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
                        name: "预约服务项目明细",
                        url: 'bean/fieldtypes.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshfieldtypes', function(event, message) {
                scope.action.load()
            });
            scope.action.load();


        });

});