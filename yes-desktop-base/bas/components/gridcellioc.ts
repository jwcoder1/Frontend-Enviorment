angular.module('app')
    .directive('gridCellIoc', function ($compile, $templateCache, $http) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                gridField: "@",
                form: "=",
                entity: "="
            },
            templateUrl: 'plugins/bas/components/gridcellioc.html',
            controller: ['$rootScope', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                function ($rootScope, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter) {
                    var scope = $scope;

                }]
        }
    });