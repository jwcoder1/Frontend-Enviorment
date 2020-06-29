(function() {
    'use strict';
    angular.module('app')
        .directive('getImage', ['$location', 'utils', '$log', 'settings',
            function($location, utils, $log, settings) {
                return {
                    restrict: 'AE',
                    replace: true,
                    scope: {
                        ngModel: "=",
                        form: "="
                    },
                    require: '^ngModel',
                    templateUrl: 'plugins/bas/components/getimage.html',
                    controller: ['$scope', '$attrs', '$element',
                        function($scope, $attrs, $element) {
                            var scope = $scope;
                            scope.$on('layout-responsive:changed', function() {
                                var width = $element.width();
                                scope.imagestyle = { "max-width": width + "px" };
                                scope.$apply();
                            });

                            scope.downurl = "";
                            if (scope.form.downurl) {
                                if (scope.form.downurl.indexOf("http") >= 0) {
                                    scope.downurl = scope.form.downurl;
                                } else {
                                    scope.downurl = settings.rootUrl + "/" + scope.form.downurl;
                                }

                            }
                            scope.imageurl = "";
                            scope.$watch('ngModel', function(newValue, oldValue) {
                                if (newValue) {
                                    if (scope.ngModel.indexOf("http") >= 0) {
                                        scope.imageurl = scope.ngModel;
                                    } else {
                                        scope.imageurl = settings.rootUrl + "/" + scope.form.imageurl + scope.ngModel + "&bust=" + (new Date()).getTime();
                                    }

                                }
                                if (scope.form.downurl) {
                                    if (scope.ngModel.indexOf("http") >= 0) {
                                        scope.downurl = scope.ngModel;
                                    } else {
                                        scope.downurl = settings.rootUrl + "/" + scope.form.downurl + scope.ngModel + "&bust=" + (new Date()).getTime();
                                    }
                                }
                            })

                        }
                    ]
                };
            }
        ]);
})();