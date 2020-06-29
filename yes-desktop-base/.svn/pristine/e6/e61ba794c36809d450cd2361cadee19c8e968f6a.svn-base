"use strict";
angular.module('app')
    .controller('app.readdocuments', ['$scope', '$translate', 'ngDialog', 'utils', 'toastr',
        function($scope, $translate, ngDialog, utils, toastr) {
            var scope = $scope;
            var theRequest = new Object();
            var tag = scope.config.queryUrl.indexOf("?");
            if (tag != -1) {
                theRequest["url"] = scope.config.queryUrl.substr(0, tag);
                var str = scope.config.queryUrl.substr(tag + 1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            } else {
                theRequest["url"] = scope.config.queryUrl;
            }
            scope.model = {
                records: 0,
                content: []
            }
            scope.datapage = {
                page: 0,
                size: 20
            }
            if (theRequest["page"]) {
                scope.datapage.page = theRequest["page"];
            }
            if (theRequest["size"]) {
                scope.datapage.size = theRequest["size"];
            }
            if (theRequest["sort"]) {
                scope.datapage.sort = theRequest["sort"];
            }
            scope.url = theRequest["url"];
            scope.promise = null;
            scope.filter = angular.copy(scope.para);

            scope.action = {

                load: function() {
                    // scope.$emit("loadIsShow");
                    scope.promise = utils.ajax({
                        method: 'POST',
                        url: scope.url + "?page=" + scope.datapage.page + "&size=" + scope.datapage.size + (scope.datapage.sort ? "&sort=" + scope.datapage.sort : ""),
                        mockUrl: "plugins/" + scope.url + "/article.json",
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
                repsure: function() {

                    var row = scope.gridApi.selection.getSelectedRows() || [];
                    if (row.length == 0) {
                        toastr.info("请选择记录！");
                        return
                    }
                    var basmodel = {
                        type: "rep",
                        records: row
                    }
                    scope.$parent.action.lovback(basmodel)

                },
                addsure: function() {

                    var row = scope.gridApi.selection.getSelectedRows() || [];
                    if (row.length == 0) {
                        toastr.info("请选择记录！");
                        return
                    }
                    var basmodel = {
                        type: "add",
                        records: row
                    }
                    scope.$parent.action.lovback(basmodel)

                },
                changepage: function(page, size) {
                    scope.datapage.page = page;
                    scope.datapage.size = size;
                    scope.action.load();
                },
                rowclick: function(entity) {

                },

            }
            scope.action.load();

        }
    ]);