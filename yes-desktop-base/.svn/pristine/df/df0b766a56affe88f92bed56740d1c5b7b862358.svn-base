define(function() {
    angular.module('app').controller('bean.lovtype',
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
                    "lovtype": {
                        displayName: "类别代号",
                        width: 120
                    },
                    "typeDesc": {
                        displayName: "类别说明",
                        width: 120
                    }
                },
                filterItems: {
                    lovtype: {
                        type: "input",
                        name: "lovtype",
                        label: "类别代号"
                    },
                    typeDesc: {
                        type: "input",
                        name: "typeDesc",
                        label: "类别说明 "
                    }
                }
            }

            scope.action = {
                add: function() {
                    $rootScope.uid = "";
                    var node = {
                        name: "类别明细",
                        url: 'bean/lovtype.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                },

                load: function() {

                    utils.ajax({
                        method: 'POST',
                        url: "bean/lovtype/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=created,desc ",
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
                        name: "LOV类别明细",
                        url: 'bean/lovtype.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshlovtype', function(event, message) {
                scope.action.load()
            });
            scope.action.load();


        });

});