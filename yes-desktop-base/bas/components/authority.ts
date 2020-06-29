angular.module('app')
    .directive('authority', function ($compile, $templateCache, $http) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                authorityOption: "="
            },
            require: '^ngModel',
            controller: ['$rootScope', '$scope', '$location', '$element', '$attrs', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                function ($rootScope, $scope, $location, $element, $attrs, utils, ngDialog, $filter) {
                    var scope = $scope;
                    if (scope.authorityOption.authoritykey) {

                        var authorityList = $rootScope.authorityList;
                        var readonly = true
                        authorityList.forEach(function (item) {
                            if (item.bas_cuscus_add == scope.authorityOption.authoritykey) {
                                readonly = false;
                            }
                        });

                        scope.authorityOption.readonly =readonly;
                    }

                    //scope.dataNgDisabled="disabled"
                    //  $element.addClass("disabled");








                }]
        }
    });


