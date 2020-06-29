define(function() {
    angular.module('app').controller('bean.test',
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
            scope.promise = null;
            scope.listUrl = "plugins/bean/templates/list.html";
            scope.config = {
                title: "测试",
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
                    "aaa": {
                        displayName: "aaa",
                        width: 120
                    },
                    "bbbb": {
                        displayName: "bbbb",
                        width: 120
                    },
                    "dddd": {
                        displayName: "dddd",
                        width: 120
                    },
                    "ccc": {
                        displayName: "cccc",
                        width: 120
                    }
                },
                filterItems: {
                    aaa: {
                        type: "basDefault",
                        lovtype: "",
                        name: "aaa",
                        label: "aaa"
                    },
                    bbbb: {
                        type: "basDefault",
                        lovtype: "",
                        name: "bbbb",
                        label: "bbbb"
                    }
                },
                filtermoreItems: {
                    ccc: {
                        type: "basDefault",
                        lovtype: "",
                        name: "ccc",
                        label: "1222"
                    }
                }
            }

            scope.action = {
                add: function() {
                    $rootScope.uid = "";
                    scope.action.opendetail();
                },

                load: function() {

                    scope.promise = utils.ajax({
                        method: 'POST',
                        url: "bean/test/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=created,desc ",
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
                        name: "测试明细",
                        url: 'bean/test.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshtest', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});