define(function() {
    angular.module('app').controller('bean.tableBeans',
        function($rootScope, $scope, $location, uiGridConstants, utils, path, settings,
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
                    "beanname": {
                        displayName: "模块名",
                        width: 120
                    },
                    "beandesc": {
                        displayName: "模块说明",
                        width: 120
                    },
                    "sources": {
                        displayName: "开发者",
                        width: 220
                    }

                },
                filterItems: {
                    beanname: {
                        type: "input",
                        name: "beanname",
                        label: "模块名"
                    },
                    beandesc: {
                        type: "input",
                        name: "beandesc",
                        label: "模块说明 "
                    },
                    sources: {
                        type: "input",
                        name: "beandesc",
                        label: "开发者 "
                    }
                }
            }

            scope.action = {
                add: function() {
                    $rootScope.uid = "";
                    scope.action.opendetail();
                },

                load: function() {

                    utils.ajax({
                        method: 'POST',
                        url: "bean/tableBeans/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=created,desc ",
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
                    scope.action.opendetail();

                },
                opendetail: function() {
                    var node = {
                        name: "模块详情",
                        url: 'bean/tableBeans.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshtableBeans', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});