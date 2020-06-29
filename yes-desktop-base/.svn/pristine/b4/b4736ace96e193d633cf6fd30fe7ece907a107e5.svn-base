"use strict";
angular.module('app')
    .directive('departmentTree', function ($compile, $templateCache, $http) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                items: '=',
                isChild: '=',
                openLevel: '=',
                hide: '=',
                onSelect: '=',
                onOperate: '=',
                onFooterbuttonclick:'='
            },
            link: function (scope, element, attr) {
                $http.get("plugins/base/directives/department.tree.html", { cache: $templateCache })
                    .success(function (html) {
                        element.html('').append($compile(html)(scope));
                    });
            },
            controller: ["$scope", 'utils', function ($scope, utils) {
                $scope.treeSelect = function (item, $event) {
                    $scope.onSelect(item);
                    $event.stopPropagation();
                    $scope.onFooterbuttonclick('selector_col_1','buttonSection');
                };
                if ($scope.openLevel) {
                    $scope.$watch("items", function () {
                        if ($scope.items) {
                            autoOpen(1, $scope.openLevel, $scope.items);
                        }
                    });
                }
                function autoOpen(nowLevel, openLevel, items) {
                    if (nowLevel <= openLevel) {
                        items.forEach(function (it) {
                            if (it.children) {
                                it.opened = true;
                                autoOpen(nowLevel + 1, openLevel, it.children);
                            }
                        });
                    }
                }

                $scope.open = function (item) {
                    item.opened = !item.opened;
                };
            }]
        }
    });