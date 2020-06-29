"use strict";
angular.module('app')
    .controller('app.baslov', ['$scope', '$translate', 'ngDialog', 'utils', 'toastr',
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

            scope.filter = scope.lovpara;

            scope.action = {

                load: function() {
                    //  scope.$emit("loadIsShow");
                    scope.filter.conditionRelatiion = "and";
                    scope.promise = utils.ajax({
                        method: 'POST',
                        url: scope.config.queryUrl + "?page=" + scope.datapage.page + "&size=" + scope.datapage.size,
                        mockUrl: "plugins/" + scope.config.queryUrl + "/article.json",
                        data: scope.filter
                    }).then(function(res) {
                        scope.model = res.data.body;
                        //  scope.$emit("loadIsHide");
                    });


                },
                reset: function() {
                    scope.filter = scope.lovpara;

                },
                sure: function() {

                    var rows = scope.gridApi.selection.getSelectedRows() || [];
                    if (rows.length == 0) {
                        toastr.info("请选择记录！");
                        return
                    }
                    scope.$parent.action.lovback(rows)

                },
                changepage: function(page, size) {
                    scope.datapage.page = page;
                    scope.datapage.size = size;
                    scope.action.load();
                },
                rowclick: function(entity) {
                    var rows = [];
                    rows.push(entity);
                    scope.$parent.action.lovback(rows)
                },

            }
            scope.action.load();

        }
    ]);