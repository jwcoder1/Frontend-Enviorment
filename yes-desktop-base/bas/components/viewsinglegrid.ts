angular.module('app')
    .directive('viewsingleGrid', function ($compile, $templateCache, $http) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                headers: "=",
                rowDblclick: "=",
                onchangepage: "=",
                resource: "=",
                gridApi: "=",
                gridKey: "="
            },
            require: '^ngModel',
            templateUrl: 'plugins/bas/components/viewsinglegrid.html',
            controller: ['$rootScope', '$timeout','uiGridConstants', 'settings', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                function ($rootScope, $timeout,uiGridConstants, settings, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter) {
                    var scope = $scope;
                    scope.bakheaders=angular.copy($scope.headers);

                     var isfoot=false;
                      angular.forEach($scope.headers, function (col, key) {
                                if (col) {
                                    if (col.aggregationType) {
                                       isfoot=true
                                    }
                                }
                                col.readonly = true;
                            if (col.type == "basLov") {
                                col.cellTemplate = "ui-grid/gridcelllov";
                            } else if (col.type == "basNumber" || col.type == "number") {
                                col.headerCellClass = "esy-number";
                                col.type = "number";
                                col.cellTemplate = "ui-grid/gridcellnumber";
                            } else if (col.type == "basRemark") {
                                col.cellTemplate = "ui-grid/gridcellremark";
                            } else if (col.type == "basIcos") {
                                col.cellTemplate = "ui-grid/gridcellioc";
                            } else {
                                if (!col.cellTemplate) {
                                    col.cellTemplate = "ui-grid/gridcelldefault";
                                }
                            }
                            if (!col.hasOwnProperty("enableColumnMenu")) {
                                col.enableColumnMenu = false;
                            }
                            if (col.hasOwnProperty("summsg")) {
                                col.aggregationType = uiGridConstants.aggregationTypes.sum;
                                isfoot = true;
                                if (col.summsg.auto) {
                                    col.footerCellTemplate = "<div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><div style=\"text-align: right;line-height: 20px;\">{{ ( col.getAggregationValue() | number :col.colDef.num ) }}</div></div>";
                                } else {
                                    if (angular.isString(col.summsg.sumval)) {
                                        col.footerCellTemplate = "<div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><div style=\"text-align: right;line-height: 20px;\">{{(col.colDef.summsg.sumval)}}</div></div>";
                                    } else {
                                        col.footerCellTemplate = "<div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><div style=\"text-align: right;line-height: 20px;\">{{(col.colDef.summsg.sumval | number :col.colDef.num)}}</div></div>";
                                    }
                                }
                            }
                                if (!col.hasOwnProperty("enableColumnMenu") ){
                                  col.enableColumnMenu=false;
                                 }

                            });

                    scope.gridOptions = angular.extend({
                        data: 'entries',
                        height: 320,
                        enableSorting: false,
                        enableColumnMenu: true,
                        suppressRemoveSort: false,
                         showGridFooter: false,
                         showColumnFooter: isfoot,
                        columnFooterHeight:24,
                        enableRowSelection:false, //行选择是否可用
                        multiSelect: false,
                        enableFullRowSelection :true,//点选任意位选中
                         enableGridMenu: true,
                        gridMenuCustomItems: [{
                            title: '重置',
                            action: function($event) {
                                scope.resetgridmsg();
                                scope.gridOptions.columnDefs = scope.readgridmsg(scope.bakheaders, scope.gridKey ? scope.gridKey : "");
                            },
                            order: 210
                        }],
                        onRegisterApi: function (gridApi) {
                            scope.gridApi = gridApi;
                            scope.$parent.gridApi=gridApi;

                            gridApi.pagination.on.paginationChanged(scope, function (newPage, pageSize) {
                                if (scope.onchangepage) {
                                    scope.onchangepage(newPage-1, pageSize);
                                }

                            });

                            gridApi.core.on.renderingComplete(scope, function (ar1) {
                                $timeout(function () {
                                    angular.element(window).trigger('resize');
                                }, 0);
                            });

                            gridApi.core.on.columnVisibilityChanged(scope, function(ar1, ar2) {
                                scope.savegridmsg(gridApi.grid.columns);
                            })
                            gridApi.colMovable.on.columnPositionChanged(scope, function(ar1, ar2) {
                                scope.savegridmsg(gridApi.grid.columns);
                            })

                            gridApi.colResizable.on.columnSizeChanged(scope, function(ar1, ar2) {
                                scope.savegridmsg(gridApi.grid.columns);
                            });
                        },
                        
                        rowTemplate: "<div ng-dblclick=\"grid.appScope.onDblClick($event,row)\" " +
                        "ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" " +
                        "class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" " +
                        "ui-grid-cell ></div>"
                    }, settings.uiGrid);

                    scope.onDblClick = function (event, row) {
                        if (row && row.entity)
                            scope.backentry = angular.copy(row.entity);
                        if (scope.rowDblclick) {
                            scope.rowDblclick(scope.backentry);
                        }

                    }


                   scope.$watch("headers", function(newValue, oldValue) {
                        if (scope.headers) {
                            scope.gridOptions.columnDefs = scope.readgridmsg(scope.headers, scope.gridKey ? scope.gridKey : "");
                        }

                    }, true); ///

                    scope.$watch("resource", function (newValue, oldValue) {
                        if (scope.resource) {
                            scope.entries = scope.resource.content;
                            scope.gridOptions.totalItems = scope.resource.records;
                        }
                    }, true); ///



                     scope.resetgridmsg=function(){
                        localStorage.setItem(scope.gridKey + "_grid", "{}");
                    }


                     scope.savegridmsg = function(gridcols) {
                        var cols = {};

                        angular.forEach(gridcols, function(column) {
                            cols[column.field] = {
                                    width: column.width,
                                    visible: column.visible
                                }
                                // var item ={ //selectionRowHeaderCol
                                //     key: column.field,
                                //     width: column.width,
                                //     visible: column.visible
                                // }
                                // cols.push(item);
                        });



                        localStorage.setItem(scope.gridKey + "_grid", angular.toJson(cols, true));

                    }


                     scope.readgridmsg = function(headers, localStorageKey) {
                        var columns = [];
                      
                        var colsmsg = angular.fromJson(localStorage.getItem(localStorageKey + "_grid") || "{}");
                        angular.forEach(colsmsg, function(col, key) {
                            if (headers.hasOwnProperty(key)) {
                                var item = angular.extend(headers[key], col);

                                if (angular.isObject(headers[key]) && key) {
                                    item.name = key;
                                }
                                if (angular.isUndefined(item.headerCellFilter))
                                    item.headerCellFilter = "translate";
                                columns.push(item);
                            }
                        })
                        angular.forEach(headers, function(col, key) {
                            if (!colsmsg.hasOwnProperty(key)) {
                                if (angular.isString(col)) {
                                    col = {
                                        name: key,
                                        original: col,
                                        displayName: col
                                    };
                                } else if (angular.isObject(col) && key) {
                                    col.name = key;
                                }
                                if (angular.isUndefined(col.headerCellFilter))
                                    col.headerCellFilter = "translate";
                                columns.push(col);
                            }
                        })
                        return columns;






                        // var columns = [];
                        // var colWidth = angular.fromJson(localStorage.getItem(localStorageKey + "_grid") || "{}");
                        // colWidth = "";
                        // colWidth = colWidth.split(',');
                        // var index = 1;

                        // angular.forEach(headers, function(col, key) {
                        //     if (angular.isString(col)) {
                        //         col = {
                        //             name: key,
                        //             original: col,
                        //             displayName: col
                        //         };
                        //     } else if (angular.isObject(col) && key) {
                        //         col.name = key;
                        //     }
                        //     if (angular.isUndefined(col.headerCellFilter))
                        //         col.headerCellFilter = "translate";

                        //     if (colWidth.length > index) {
                        //         col.width = colWidth[index - 1];

                        //     }
                        //     index++;
                        //     columns.push(col);
                        // });

                        // return columns;
                    }








                }]
        }
    });