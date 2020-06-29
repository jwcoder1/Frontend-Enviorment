define(function() {
    angular.module('app').controller('bean.discreteness',
        function($rootScope, $scope, $location, uiGridConstants, utils, path, getSingleView, settings,
            $timeout, dialog, toastr, ngDialog, qwsys, $http) {
            var scope = $scope;
            scope.filter = {
                discretenesType: "A"
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
                title: "LOV类别",
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
                    "discretenessno": {
                        displayName: "组件代号",
                        width: 120
                    },
                    "discretenessDesc": {
                        displayName: "组件说明",
                        width: 120
                    }
                },
                filterItems: {
                    discretenessno: {
                        type: "input",
                        name: "discreteness",
                        label: "组件代号"
                    },
                    discretenessDesc: {
                        type: "input",
                        name: "typeDesc",
                        label: "组件说明 "
                    }
                }
            }

            scope.action = {
                add: function() {
                    $rootScope.uid = "";
                    var node = {
                        name: "表单组件明细",
                        url: 'bean/discreteness.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                },

                load: function() {

                    utils.ajax({
                        method: 'POST',
                        url: "bean/discreteness/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=created,desc ",
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: scope.filter
                    }).then(function(res) {
                        scope.model = res.data.body;
                    });

                },
                reset: function() {
                    scope.filter = {
                        discretenesType: "A"
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
                        name: "表单组件明细",
                        url: 'bean/discreteness.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshdiscreteness', function(event, message) {
                scope.action.load()
            });
            scope.action.load();


        });

});