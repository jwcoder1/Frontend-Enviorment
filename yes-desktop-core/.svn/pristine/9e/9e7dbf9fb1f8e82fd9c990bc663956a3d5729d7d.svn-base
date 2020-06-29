(function () {
    var $inject = ['$scope', 'utils'];
    var controller = function ($scope, utils) {
        var view = {
            queries: {
                0: {
                    type: "input",
                    name: "name$match",
                    title: "名称"
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
                    allowNull: true,
                    css: 'cell2'
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
            },
            init: function () {

            }
        };

        angular.extend($scope, view);
        $scope.init();
    };
    controller.$inject = $inject;
    angular.module('app').controller('app.default.query', controller);
} ())