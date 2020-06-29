angular.module('app')
    .directive('esyUeditord', function($compile, $templateCache, $http) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                ngModel: "=",
                form: "="
            },
            require: '^ngModel',
            templateUrl: 'plugins/bas/components/esyueditord.html',
            controller: ['$rootScope', '$scope', '$location', 'qwsys', '$templateCache', '$interpolate', '$translate', 'utils', 'ngDialog', '$filter',
                function($rootScope, $scope, $location, qwsys, $templateCache, $interpolate, $translate, utils, ngDialog, $filter) {
                    var scope = $scope;
                    scope.edit = function() {
                        ngDialog.open({
                            className: "ngdialog-lg",
                            template: '<div class="modal-header"><h4 class="modal-title">文本编辑</h4></div>' +
                                '<esy-ueditor ng-model="$parent.ngModel" form="form"></esy-ueditor>' +
                                '<div class="modal-footer"><button type="submit" class="btn btn-primary fa fa-save" ng-click="confirm()" >确定</button></div>',
                            plain: true,
                            scope: $scope,
                            controller: function($scope) {
                                $scope.confirm = function() {
                                    $scope.closeThisDialog();
                                }
                            }
                        })
                    }

                }
            ]
        };
    });