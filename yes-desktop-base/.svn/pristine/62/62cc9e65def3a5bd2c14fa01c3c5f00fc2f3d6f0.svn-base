angular.module('app')
    .directive('formatstep', ['$parse', function($parse) {
        return {
            restrict: 'EA',
            require: 'ngModel',
            link: function(scope, ele, attrs, ctrl, $ngModelCtrl) {

                // $ngModelCtrl.$formatters.push(function() {
                //     return numberFilter(elm.val(), num);
                // });


                //页面显示值转为model
                ctrl.$parsers.unshift(function(ele) { //注意，指令这里用的是=号引入，formatnumber改变会同时反映在controller上，所以下面的格式化不能直接用formatnumber操作
                    var val = ele;
                    val = parseFloat(val);
                    if (attrs.hasOwnProperty("num")) {
                        if (attrs["num"]) {
                            val = val.toFixed(attrs["num"]);
                        }

                    }
                    val = val + "";
                    return val; //
                });

            }
        }

    }]);