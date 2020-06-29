angular.module('app')
    .directive('gridCellNumber', function ($compile, $templateCache, $http) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                gridField: "@",
                form: "="
            },
            templateUrl: 'plugins/bas/components/gridcellnumber.html',
            controller: ['$rootScope', '$scope', '$location', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                function ($rootScope, $scope, $location, $templateCache, $interpolate, $translate, utils, ngDialog, $filter) {
                var scope= $scope;
                if (scope.form.showchange){
                    scope.showprice =   localStorage.getItem("price")=="Y"?true:false;
                }else{
                    scope.showprice=true;
                }
                


                

                } ]

                
        }
    });