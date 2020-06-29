angular.module('app')
    .directive('esyUeditor', function($compile, $templateCache, $http, $parse, settings) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                ngModel: "=",
                form: "="
            },
            require: '^ngModel',
            //  templateUrl: 'plugins/bas/components/esyueditor.html',
            controller: ['$rootScope', '$scope', '$location', '$element', '$attrs',
                function($rootScope, $scope, $location, $element, $attrs) {
                    var scope = $scope;

                    scope.id = scope.form.key.slice(-1)[0] + scope.$id;



                }
            ],
            link: function(scope, ele, attrs, ctrl) {
                scope.id = scope.form.key.slice(-1)[0] + scope.$id;
                var html = "<div>" +
                    // "<input ng-model=\"ngModel\" style=\"width:100%\">" +
                    "<div id=\"" + scope.id + "\"  ng-required=\"true\" ng-model=\"ngModel\"  type=\"text/plain\" style=\"width:100%;height:200px;\"></div>" +
                    "</div>"

                ele.html('').append($compile(html)(scope));
                setTimeout(function() {
                    scope.UE = UE.getEditor(scope.id, { enableAutoSave: false, saveInterval: 0, autoSyncData: false })

                    scope.UE.ready(function() {
                        //加载编辑器数据  

                        scope.UE.setContent(scope.ngModel ? scope.ngModel : "", false);
                        scope.$watch('form.readonly', function(newValue, oldValue) {
                            setTimeout(function() {

                                if (scope.form.readonly) {
                                    if (scope.UE) { //一开启就关,则无法写入数据
                                        scope.UE.setDisabled('fullscreen');
                                    }
                                } else {
                                    if (scope.UE) { //一开启就关,则无法写入数据
                                        scope.UE.setEnabled();
                                    }

                                }

                            }, 1500);
                        }, true); ///



                        scope.$watch('ngModel', function(newValue, oldValue) {
                            if (!scope.UE.isFocus()) {
                                setTimeout(function() {
                                    if (scope.UE) { //一开启就关,则无法写入数据
                                        scope.UE.setContent(scope.ngModel ? scope.ngModel : "", false);
                                    }
                                }, 1000);
                            }

                        }, true); ///



                        scope.UE.addListener('contentChange', function() {
                            if (!scope.$$phase) {
                                scope.$apply(function() {
                                    var dd = scope.UE.getContent();
                                    ctrl.$setViewValue(dd);
                                });
                            }
                        });



                    });

                    ele.on('$destroy', function() {
                        scope.UE.destroy();
                    });
                })

            }
        }
    });