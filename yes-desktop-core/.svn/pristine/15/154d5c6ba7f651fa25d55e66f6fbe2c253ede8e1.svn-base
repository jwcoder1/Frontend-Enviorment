(function () {
    var $inject = ['$scope', 'utils'];
    var controller = function ($scope, utils) {

        $scope.gridOptions = {
            enableSorting: true,
            data: [{
                name: '张三', gender: '男'
            }, {
                name: '张三', gender: '男'
            }, {
                name: '张三', gender: '男'
            }, {
                name: '张三', gender: '男'
            }, {
                name: '张三', gender: '男'
            }, {
                name: '张三', gender: '男'
            }, {
                name: '张三', gender: '男'
            }, {
                name: '张三', gender: '男'
            }, {
                name: '张三', gender: '男'
            }, {
                name: '张三', gender: '男'
            }, {
                name: '张三', gender: '男'
            }, {
                name: '张三', gender: '男'
            }, {
                name: '张三', gender: '男'
            }, {
                name: '张三', gender: '男'
            }, {
                name: '张三', gender: '男'
            }, {
                name: '张三', gender: '男'
            }],
            paginationPageSizes: [10, 20, 100, 500, 2000],
            columnDefs: [
                { field: 'name', width: 90 },
                { field: 'gender', width: 90 },
                { field: 'company', enableSorting: false }
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            rowHeight: 36
        };

        var view = {
            init: function () {

            },
            queries: {
                0: {
                    type: "input",
                    name: "name$match",
                    title: "名称",
                    placeholder: "请输入名称"
                },
                1: {
                    type: "search",
                    name: "currency$match",
                    title: "类型",
                    placeholder: "请输入类型"
                },
                2: {
                    type: "date-range-picker",
                    name: "calendar$range",
                    title: "日期",
                    css: 'cell'
                },
                3: {
                    type: "select",
                    name: "currency$match",
                    title: "类型"
                },
                4: {
                    type: "select",
                    name: "currency$match",
                    title: "类型"
                },
                5: {
                    type: "select",
                    name: "currency$match",
                    title: "类型"
                }
            }
        };
        angular.extend($scope, view);
        $scope.init();
    };
    controller.$inject = $inject;
    angular.module('app').controller('app.default.page', controller);
} ())