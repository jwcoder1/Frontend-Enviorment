angular.module('app')
    .directive('dateTimepicker', function ($compile, $templateCache, $http) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                ngModel: "=",
                form: "="
            },
            require: '^ngModel',
            templateUrl: 'plugins/bas/components/datetimepicker.html',
            controller: ['$timeout','$rootScope', '$scope', '$location', '$log', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                function ($timeout,$rootScope, $scope, $location, $log, $templateCache, $interpolate, $translate, utils, ngDialog, $filter) {
                    var scope = $scope;

                  

                    scope.mytime = new Date();

                   
                    var minu= scope.mytime.getMinutes();
                    minu= minu.toString().substring(0,minu.toString().length-1)+"0";
                    scope.mytime.setMinutes(minu);

                    scope.$watch('ngModel', function (newValue, oldValue) {
                        if (newValue) {
                            scope.mytime = new Date(scope.ngModel.replace(/-/g, "/"));
                            scope.datefield = new moment(scope.mytime).format("YYYY-MM-DD");
                            scope.timefield = new moment(scope.mytime).format("HH:mm");
                        }else{
                            scope.datefield = "";
                            scope.timefield = "";
                        }

                    }, true); ///



                    scope.changeddate = function () {
                        if (!scope.datefield) {
                            return;
                        }
                        if (!scope.timefield) {
                            scope.timefield = new moment(scope.mytime).format("HH:mm")
                        }
                        scope.ngModel = scope.datefield + " " + scope.timefield;
                        scope.mytime = new Date(scope.ngModel);
                        $timeout(function () {
                            scope.form.change();
                        }, 100);

                    }
                    scope.changetimestr = function () {
                        if (!scope.datefield) {
                            scope.datefield = new moment(scope.mytime).format("YYYY-MM-DD");
                        }
                        scope.ngModel = scope.datefield + " " + scope.timefield;
                        scope.mytime = new Date(scope.ngModel.replace(/-/g, "/"));
                    }

                    scope.changedtime = function () {

                        scope.timefield = new moment(scope.mytime).format("HH:mm");
                        if (!scope.datefield) {
                            scope.datefield = new moment(scope.mytime).format("YYYY-MM-DD");
                        }
                        scope.ngModel = scope.datefield + " " + scope.timefield;
                        $timeout(function () {
                            if (scope.form.change){
                                scope.form.change();
                            }
                        }, 100);
                        //this.mytime.setHours(14);
                        //this.mytime.setMinutes(0);

                    };

                    scope.hstep = 1;
                    scope.mstep = 10;


                }]
        }
    });

