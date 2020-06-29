"use strict";
angular.module('app')
    .controller('app.readdocument', ['$scope', '$translate', 'ngDialog', 'utils', 'toastr',
        function($scope, $translate, ngDialog, utils, toastr) {
            var scope = $scope;
            scope.model = {
                records: 0,
                content: []
            }
            scope.datapage = {
                page: 0,
                size: 20
            }
            scope.promise = null;
            scope.filter = angular.copy(scope.para);

            scope.action = {

                load: function() {
                    // scope.$emit("loadIsShow");
                    scope.promise = utils.ajax({
                        method: 'POST',
                        url: scope.config.queryUrl + "?page=" + scope.datapage.page + "&size=" + scope.datapage.size + (scope.config.sort ? "&sort=" + scope.config.sort : ""),
                        mockUrl: "plugins/" + scope.config.queryUrl + "/article.json",
                        data: scope.filter
                    }).then(function(res) {
                        if (res.data.body.content) {
                            scope.model = res.data.body;
                        } else {
                            scope.model = {
                                content: res.data.body.items,
                                records: res.data.body.count
                            }
                        }



                        //   scope.$emit("loadIsHide");
                    });


                },
                reset: function() {
                    scope.filter = angular.copy(scope.para);
                },
                sure: function() {

                    var row = scope.gridApi.selection.getSelectedRows() || [];
                    if (row.length == 0) {
                        toastr.info("请选择记录！");
                        return
                    }
                    scope.$parent.action.lovback(row[0])

                },
                changepage: function(page, size) {
                    scope.datapage.page = page;
                    scope.datapage.size = size;
                    scope.action.load();
                },
                rowclick: function(entity) {
                    scope.$parent.action.lovback(entity)
                },

            }
            scope.action.load();

        }
    ]);