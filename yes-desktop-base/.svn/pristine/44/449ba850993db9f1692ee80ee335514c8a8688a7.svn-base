namespace yes {

    interface Ieditscope extends IScope {
        form: Igridconfig,
        gridOptions: IGridOptions,
        gridApi: IGridApi,
        ngModel: any,
        action: any,
        cumulative ? : (grid, row) => void
    }

    interface Igridconfig extends IForm {
        existdel ? : boolean,
            headers: any,
            gridApi: any,
            gridkey: any,
            action ? : any,
            addfn ? : () => void, //返回调用
            delfn ? : (item) => void,
            rowDblclick ? : (item) => void,
            onchangepage ? : (start, count) => void

    }



    (function() {


        angular.module('app')
            .directive('addGrid', function($compile, $templateCache, $http) {
                return {
                    restrict: 'E',
                    replace: true,
                    scope: {
                        ngModel: "=",
                        form: "=",
                        model: "=",
                    },
                    require: '^ngModel',
                    templateUrl: 'plugins/bas/components/addgrid.html',
                    controller: ['$rootScope', 'uiGridConstants', 'toastr', '$timeout', 'settings', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                        function($rootScope, uiGridConstants, toastr, $timeout, settings: ISettings, $scope: Ieditscope, $location, $templateCache, $interpolate, $translate, utils: IUtils, ngDialog, $filter) {

                            if (!$scope.ngModel) {
                                $scope.ngModel = [];
                            }

                            $scope.rowmodel = {};



                            $scope.gridconfig = {
                                schema: {
                                    "type": "object",
                                    "properties": {
                                        "uid": {
                                            "title": "不动产单元号",
                                            "type": "string"
                                        }
                                    }

                                },
                                form: [{
                                        title: "",
                                        type: "basRegion",
                                        css: "max-4",
                                        items: [

                                        ]
                                    },

                                ]
                            }
                            if ($scope.form.hasOwnProperty("form")) {
                                $scope.gridconfig = angular.copy($scope.form.form);
                            }
                            var isfoot = false;

                            $scope.bakheaders = angular.copy($scope.form.headers);

                            angular.forEach($scope.form.headers, function(col, key) {

                                col.title = col.displayName;
                                col.key = key;
                                if (!$scope.form.hasOwnProperty("form")) {
                                    if (!col.hasOwnProperty("type")) {
                                        col.type = "string";
                                    }
                                    $scope.gridconfig.form[0].items.push(col);
                                }


                                col.enableFiltering = false;

                                if (!col.hasOwnProperty("enableColumnMenu")) {
                                    col.enableColumnMenu = false;
                                }

                                if (col.hasOwnProperty("summsg")) {
                                    col.aggregationType = uiGridConstants.aggregationTypes.sum;
                                    isfoot = true
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




                                if (col) {
                                    if (col.readonly) {
                                        col.enableCellEdit = false;
                                        if (col.type == "number" || col.type == "basNumber") {
                                            col.cellTemplate = "ui-grid/gridcellnumber";
                                            col.headerCellClass = "esy-number";
                                        } else if (col.type == "basLov") {
                                            col.cellTemplate = "ui-grid/gridcelllov";
                                        }
                                    } else {
                                        if (col.type == "basLov") {
                                            col.cellTemplate = "ui-grid/gridcelllov";
                                        } else if (col.type == "basNumber" || col.type == "number") {
                                            col.headerCellClass = "esy-number";
                                            col.cellTemplate = "ui-grid/gridcellnumber";
                                        }

                                    }

                                }



                            });

                            if (angular.isUndefined($scope.form.existdel)) { //是否有删除栏位
                                $scope.form.existdel = true;
                            }
                            $scope.gridOptions = angular.extend({
                                data: 'ngModel',
                                enableCellEditOnFocus: false,
                                // enableFiltering: true,
                                enableSorting: true,
                                enableColumnMenu: true,
                                suppressRemoveSort: false,
                                showGridFooter: false,
                                showColumnFooter: isfoot,
                                columnFooterHeight: 24,
                                multiSelect: true,
                                enableFullRowSelection: false, //点选任意位选中
                                enableGridMenu: true,
                                gridMenuCustomItems: [{
                                    title: '重置',
                                    action: function($event) {
                                        $scope.resetgridmsg();
                                        $scope.resetstatus()
                                        $scope.gridOptions.columnDefs = angular.copy($scope.readgridmsg($scope.bakheaders, $scope.form.gridkey ? $scope.form.gridkey : ""));

                                    },
                                    order: 210
                                }],
                                onRegisterApi: function(gridApi) {

                                    $scope.form.gridApi = gridApi;
                                    $scope.gridApi = gridApi;
                                    if ($scope.form.existdel) {
                                        $scope.gridApi.grid.registerRowsProcessor($scope.singleFilter, 200);
                                    }

                                    gridApi.core.on.renderingComplete($scope, function(ar1) {
                                        $timeout(function() {
                                            angular.element(window).trigger('resize');
                                            if ($scope.gridApi.grid.rows.length > 0) {
                                                $scope.gridApi.grid.rows.forEach(element => {
                                                    if (!element.entity.isdel) {
                                                        $scope.rowmodel = $scope.gridApi.grid.rows[0].entity;
                                                        $scope.rowmodel.formstatus = $scope.model.formstatus;
                                                    }
                                                });

                                            } else {
                                                $scope.rowmodel = { formstatus: "view" };
                                            }
                                            $timeout(function() {
                                                $scope.$broadcast('changeadddetail');
                                            })


                                        }, 0);
                                    });

                                    gridApi.core.on.columnVisibilityChanged($scope, function(ar1, ar2) {
                                        $scope.savegridmsg(gridApi.grid.columns);
                                    })
                                    gridApi.colMovable.on.columnPositionChanged($scope, function(ar1, ar2) {
                                        $scope.savegridmsg(gridApi.grid.columns);
                                    })

                                    gridApi.colResizable.on.columnSizeChanged($scope, function(ar1, ar2) {
                                        $scope.savegridmsg(gridApi.grid.columns);
                                    });
                                },

                                rowTemplate: "<div  ng-click=\"grid.appScope.onDblClick($event,row);grid.appScope.hoveredIndex = rowRenderIndex\" " +
                                    "ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" " +
                                    "class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader,'selecthoverclass': grid.appScope.hoveredIndex === rowRenderIndex }\" " +
                                    "ui-grid-cell ></div>"
                            }, settings.uiGrid);

                            if ($scope.form.sortable) {
                                $scope.gridOptions.sortable = $scope.form.sortable;
                            }

                            if ($scope.form.height) {
                                $scope.gridstyle = {
                                    height: $scope.form.height + "px"
                                }
                            }

                            $scope.onDblClick = function(event, row) {
                                if (row && row.entity) {
                                    $scope.rowmodel = row.entity;
                                    $timeout(function() {
                                        $scope.$broadcast('changeadddetail');
                                    })
                                }

                            }



                            $scope.$on("changeadddetail", function(event, id) {
                                if (event.currentScope.$id != event.targetScope.$id) {
                                    $scope.rowmodel = { formstatus: "view" };
                                    if ($scope.gridApi.grid.rows.length > 0) {
                                        $scope.gridApi.grid.rows.forEach(element => {
                                            if (!element.entity.isdel) {
                                                $scope.rowmodel = $scope.gridApi.grid.rows[0].entity;
                                                $scope.rowmodel.formstatus = $scope.model.formstatus;
                                            }
                                        });

                                    }
                                    if ($scope.form.hasOwnProperty("onchangerecord")){
                                        $scope.form.onchangerecord($scope.rowmodel);
                                    }
                                }


                            });





                            $scope.singleFilter = function(renderableRows) {
                                renderableRows.forEach(function(row) {
                                    row.visible = !row.entity["isdel"];
                                });
                                return renderableRows;
                            };


                            $scope.resetgridmsg = function() {
                                localStorage.setItem($scope.form.gridkey + "_grid", "{}");
                            }


                            $scope.savegridmsg = function(gridcols) {
                                var cols = {};

                                angular.forEach(gridcols, function(column) {
                                    cols[column.field] = {
                                        width: column.width,
                                        visible: column.visible
                                    }
                                });

                                localStorage.setItem($scope.form.gridkey + "_grid", angular.toJson(cols, true));

                            }

                            $scope.readgridmsg = function(headers, localStorageKey) {
                                var columns = [];

                                var colsmsg = angular.fromJson(localStorage.getItem(localStorageKey + "_grid") || "{}");
                                angular.forEach(colsmsg, function(col, key) {
                                    if (headers.hasOwnProperty(key)) {
                                        var item = angular.extend(headers[key], col);

                                        if (angular.isObject(headers[key]) && key) {
                                            item.name = key;
                                            item.displayName = headers[key].displayName;
                                        }
                                        if (angular.isUndefined(item.headerCellFilter))
                                            item.headerCellFilter = "translate";
                                        columns.push(item);
                                    }
                                })
                                angular.forEach(headers, function(col, key) {
                                    if (!colsmsg.hasOwnProperty(key)) { //新增的栏位
                                        if (angular.isString(col)) { //只配一个栏位名称
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


                            }

                            $scope.resetstatus = function() {
                                var nowgridmsg = $scope.gridOptions.columnDefs
                                angular.forEach($scope.bakheaders, function(col, key) {
                                    angular.forEach($scope.gridOptions.columnDefs, function(column) {
                                        if (column.name == key) {
                                            if (column.hasOwnProperty("readonly")) {
                                                col.readonly = column.readonly;
                                            }

                                        }
                                    });
                                })

                            }

                            $scope.action = [];
                            if ($scope.form.action) {
                                angular.forEach($scope.form.action, function(op, key) {
                                    var item = {}
                                    if (key == "add") {
                                        item = {
                                            'name': '新增',
                                            'icon': 'fa-plus',
                                            'preclick': function() {
                                                //$scope.form.action[key].click();
                                                op.click($scope.ngModel)
                                                $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
                                                $timeout(function(resource) {
                                                    $scope.gridApi.grid.appScope.hoveredIndex = $scope.gridApi.grid.rows.length - 1;
                                                    $scope.rowmodel = $scope.gridApi.grid.rows[$scope.gridApi.grid.rows.length - 1].entity;
                                                    $timeout(function() {
                                                        $scope.$broadcast('changeadddetail');
                                                    })
                                                });

                                            }
                                        }
                                    } else if (key == "del") {
                                        item = {
                                            'name': '删除',
                                            'icon': 'fa-remove',
                                            'preclick': function() {
                                                var rows = $scope.gridApi.selection.getSelectedRows() || []
                                                if (rows.length == 0) {
                                                    toastr.info("请选择删除记录！");
                                                } else {
                                                    angular.forEach(rows, function(row) {
                                                        op.click(row)
                                                        $scope.gridApi.grid.refresh();

                                                        $scope.rowmodel = { formstatus: "view" };
                                                        $scope.gridApi.grid.rows.forEach(element => {
                                                            if (!element.entity.isdel) {
                                                                $scope.rowmodel = element.entity;
                                                                $timeout(function() {
                                                                    $scope.$broadcast('changeadddetail');
                                                                })
                                                            }
                                                        });

                                                        // $scope.form.action[key].click(row);
                                                        // $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
                                                    });
                                                }

                                            }
                                        }


                                    } else {
                                        item = {
                                            'name': op.name,
                                            'icon': op.icon,
                                            'preclick': function() {
                                                op.click();
                                                // $scope.form.action[key].click();
                                                $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
                                            }
                                        }
                                    }
                                    item = angular.extend(item, op);
                                    $scope.action.push(item);
                                })
                            }




                            $scope.$watch("form.headers", function(newValue, oldValue) {
                                if ($scope.form.headers) {
                                    $scope.gridOptions.columnDefs = angular.copy($scope.readgridmsg($scope.form.headers, $scope.form.gridkey ? $scope.form.gridkey : ""));
                                }

                            }, true); ///

                            $scope.$watch("ngModel", function(newValue, oldValue) {
                                if ($scope.ngModel) {
                                    $scope.gridOptions.totalItems = $scope.ngModel.count;
                                }

                            }, true); ///


                            $scope.$watch("model.formstatus", function(newValue, oldValue) {

                                if ($scope.model.formstatus && $scope.ngModel) {
                                    $scope.ngModel.forEach(element => {
                                        element.formstatus = $scope.model.formstatus
                                    });

                                }

                            }, true); ///




                            $scope.$on('RefreshGrid', function() {
                                $scope.gridApi.grid.refresh();
                            });



                        }
                    ]
                }
            });


    }());


}