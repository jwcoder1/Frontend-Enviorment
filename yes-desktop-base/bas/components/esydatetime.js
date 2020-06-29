angular.module('app')
    .directive('esyDatetime', ['$parse', '$timeout', function($parse, $timeout) {
        return {
            restrict: 'EA',
            require: 'ngModel',
            link: function(scope, ele, attrs, ctrl) {
                scope.timeoption = {
                    isinitVal: false,
                    festival: false,
                    ishmsVal: true,
                    format: "YYYY-MM-DD hh:mm:ss",
                    zIndex: 30000,
                    choosefun: function(elem, val, date) {
                        // str = date.replace(/-/g, "/");
                        // var date = new Date(str);
                        // date = new moment(date).format(scope.timeoption.format);
                        $parse(attrs['ngModel']).assign(scope, val);
                        scope.onchange();

                    },
                    okfun: function(elem, val, date) {
                        // str = date.replace(/-/g, "/");
                        // var date = new Date(str);
                        // date = new moment(date).format(scope.timeoption.format);
                        $parse(attrs['ngModel']).assign(scope, val);
                        scope.onchange();
                    },
                    clearfun: function(elem, val) {
                        $parse(attrs['ngModel']).assign(scope, "");
                        scope.onchange();
                    }
                };

                scope.onchange = function() {
                    if (scope.timeoption.onchange) {
                        $timeout(function() {
                            scope.timeoption.onchange(scope.model ? scope.model : scope.row.entity);
                        });
                    }
                }

                if (scope.form) {
                    angular.extend(scope.timeoption, scope.form);
                };
                if (scope.col && scope.col.colDef) {
                    angular.extend(scope.timeoption, scope.col.colDef);
                };
                if (scope.option) {
                    angular.extend(scope.timeoption, scope.option);
                };
                $(ele).jeDate(scope.timeoption);

                //页面显示值转为model
                ctrl.$parsers.unshift(function(ele) { //注意，指令这里用的是=号引入，formatnumber改变会同时反映在controller上，所以下面的格式化不能直接用formatnumber操作
                    var val = ele;
                    return val; //
                });

            }
        }

    }]);