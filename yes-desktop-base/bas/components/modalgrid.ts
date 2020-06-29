angular.module('app')
    .directive('modalGrid', function ($compile, $templateCache, $http) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                headers: "=",
                rowDblclick: "=",
                onchangepage: "=",
                resource: "="
            },
            require: '^ngModel',
            templateUrl: 'plugins/bas/components/modalgrid.html',
            controller: ['$rootScope', '$timeout', 'settings', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                function ($rootScope, $timeout, settings, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter) {
                    var scope = $scope;

                   

                   var pageSize=20;
                    $scope.gridOptions = {
                        gridMenuTitleFilter: function (title) {
                            return $translate.instant(title);
                        },
                        data: 'entries',
                        enableGridMenu: true,
                        exporterMenuAllData: false,
                        exporterMenuCsv: true,
                        exporterMenuPdf: false,
                        enablePaginationControls: true,
                        enableFiltering: true,
                        enableRowHeaderSelection: true,
                        exporterOlderExcelCompatibility: true,
                        useExternalPagination: true,
                        onRegisterApi: function (gridApi) {
                            $scope.gridApi = gridApi;
                            $scope.$parent.gridApi = gridApi;
                            gridApi.pagination.on.paginationChanged(scope, function (newPage, pageSize) {
                                var start = (newPage - 1) * pageSize;
                                var count = pageSize;
                                if (scope.onchangepage) {
                                    scope.onchangepage(start, count);
                                }

                            });
                        },
                        selectedItems: [],
                        paginationPageSizes: [pageSize, 200, 1000],
                        paginationPageSize: pageSize,
                        virtualizationThreshold: 1000,
                        appScopeProvider: {
                            onDblClick: function (row) {
                            }
                        }
                       
                    };

                    scope.onDblClick = function (event, row) {
                        if (row && row.entity)
                            scope.backentry = angular.copy(row.entity);
                        if (scope.rowDblclick) {
                            scope.rowDblclick(scope.backentry);
                        }

                    }


                    scope.$watch("headers", function (newValue, oldValue) {
                        if (scope.headers) {
                            scope.gridOptions.columnDefs = utils.gridDefine(scope.headers, "");
                        }

                    }, true); ///

                    scope.$watch("resource", function (newValue, oldValue) {
                        if (scope.resource) {
                            scope.entries = scope.resource;
                         //   scope.gridOptions.totalItems = scope.resource.count;
                        }
                    }, true); ///








                }]
        }
    });