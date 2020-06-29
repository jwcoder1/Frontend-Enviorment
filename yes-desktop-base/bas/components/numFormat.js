angular.module('app').directive('textFormat', function() {   
    return {    
        require: 'ngModel',
        scope: {
            model: '=ngModel'
        },
        link: function(scope, elm, iAttrs, modelCtrl) {   
            var num = iAttrs.textFormat;      
            //   $(elm).number(true, num); 

        }  
    };
});

angular.module('app').directive('numFormat', function() {
    return {
        scope: {
            model: '=ngModel'
        },
        link: function(scope, elm, attrs, ctrl) {

            function format() {
                if (isNaN(scope.model) || scope.model == "") {
                    scope.model = "0.00";
                } else {
                    //最多保留两位小数
                    var f = parseFloat(scope.model);
                    var f = Math.round(scope.model * 100) / 100;
                    var s = f.toString();
                    var rs = s.indexOf('.');
                    if (rs < 0) {
                        s = s + ".00";
                    } else {
                        while (s.length <= rs + 2) { s += '0'; }
                    }
                    scope.model = s;
                }
            }

            format(); //初始化
            $(elm).bind("blur", format); //jq方式绑定事件

        }
    };
});

angular.module('app').directive('numberFormat', ['$filter', '$parse', function($filter, $parse) { //这个指令的作用是在view层和model层存放不同格式的数据
    var numberFilter = $filter('number');
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ngModelCtrl) {
            //model 转为页面显示值
            var num = 0; //小数点位数     
            if (attrs.numberFormat) {
                var num = attrs.numberFormat;
            } 
            var position = 0; //实际光标位置
            var numposition = 0; //数字+点号光标位置
            var mdposttion = ""; //仅移动光标
            var ismove = false; //是否左右移动


            ngModelCtrl.$formatters.push(function() {
                return numberFilter(elm.val(), num);
            });


            //页面显示值转为model
            ngModelCtrl.$parsers.unshift(function(element) { //注意，指令这里用的是=号引入，formatnumber改变会同时反映在controller上，所以下面的格式化不能直接用formatnumber操作
                //把input输入框的非数字替换为空且第一位要求是1-9，然后格式化数值

                var mat = elm.val().indexOf(".");
                var intstr = elm.val();
                var memstr = "";
                var mtag = "";
                if (mat != -1) {
                    intstr = elm.val().substr(0, mat);
                    memstr = elm.val().substring(mat + 1);
                    mtag = ".";
                }
                var val = intstr.replace(/[^0-9]*/g, "") + mtag + memstr.replace(/[^0-9]*/g, "");
                elm.val(numberFilter(val, num)); //view中的数据需要格式化
                // $parse(attrs['ngModel']).assign(scope, val);
                return val; //返回model中的数据不需要格式化
            });

            function mkeydown(e) {
                mdposttion = ""; // 初始化输入小数点;
                position = getPositionForInput(this); //获取真实光标位置
                if (position == 0 && this.value.substr(0, 1) == "0") {
                    this.value = this.value.substring(1);
                    numposition = 0;
                } else if (position == 1 && this.value.substr(0, 1) == "0") {
                    numposition = 0;
                } else {
                    numposition = getnumpostion(elm.val(), position); //获取数字光标位置
                }



                var ss = window.event || e;
                if (!((ss.keyCode >= 48 && ss.keyCode <= 57) || ss.keyCode == 189 || ss.keyCode == 190 || ss.keyCode == 8 || ss.keyCode == 46 || ss.keyCode == 37 || ss.keyCode == 39 || ss.keyCode == 17 || ss.keyCode == 86)) {
                    ss.preventDefault();
                } else {
                    if (ss.keyCode >= 48 && ss.keyCode <= 57) {
                        numposition = numposition + 1;
                    }

                }

                if (ss.keyCode == 190) { //如果输入的是小数点
                    var mat = elm.val().indexOf(".");
                    if (mat != -1) {
                        mdposttion = mat + 1;
                        ss.preventDefault();
                    }
                }



                if (ss.keyCode == 8) { //向前删除
                    numposition = numposition - 1;
                    if (this.value.substr(position - 1, 1) == ".") { //如果删除的是小数点
                        mdposttion = position - 1;
                        ss.preventDefault();
                    }
                }
                if (ss.keyCode == 46) { //向后删除
                    //  numposition = numposition +1;
                    if (this.value.substr(position, 1) == ".") { //如果删除的是小数点
                        mdposttion = position + 1;
                        ss.preventDefault();
                    }
                }
                if (ss.keyCode == 37 || ss.keyCode == 39) { //左右移动
                    ismove = true;
                } else {
                    ismove = false;
                }
            }

            function mkeyup(e) {
                if (!ismove) {
                    position = getPositionFornum(this.value, numposition); //获取真实光标位置
                    if (mdposttion) { //如果输入是小数点
                        position = mdposttion;
                    } else {
                        position = getPositionFornum(this.value, numposition); //获取真实光标位置
                    }
                    setCursorPosition(this, position);
                }

            }

            function mfocus(e) { //改变输入法状态,只能为英文
                this.style.imeMode = 'inactive'
            }


            $(elm).bind("keydown", mkeydown); //jq方式绑定事件
            $(elm).bind("keyup", mkeyup); //jq方式绑定事件
            $(elm).bind("focus", mfocus); //jq方式绑定事件

            function getPositionForInput(ctrl) {
                var CaretPos = 0;
                if (document.selection) { // IE Support 
                    ctrl.focus();
                    var Sel = document.selection.createRange();
                    Sel.moveStart('character', -ctrl.value.length);
                    CaretPos = Sel.text.length;
                } else if (ctrl.selectionStart || ctrl.selectionStart == '0') { // Firefox support 
                    CaretPos = ctrl.selectionStart;
                }
                return (CaretPos);
            }

            function getPositionFornum(textstr, numposition) {

                var ret = 0;
                var num = 0
                for (var i = 0; i <= textstr.length && num <= numposition; i++) {
                    if (textstr.substr(i, 1) != ",") {
                        num = num + 1;
                    }
                    ret = i;

                }
                return ret;
            }

            //获取数字光标位置(不包含,号)
            function getnumpostion(textstr, position) {
                var numpos = 0;
                for (var i = 0; i <= textstr.length && i < position; i++) {
                    if (textstr.substr(i, 1) != ",") {
                        numpos = numpos + 1;
                    }
                }
                return numpos
            }

            //设置光标位置函数 
            function setCursorPosition(ctrl, pos) {
                if (ctrl.setSelectionRange) {
                    ctrl.focus();
                    ctrl.setSelectionRange(pos, pos);
                } else if (ctrl.createTextRange) {
                    var range = ctrl.createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', pos);
                    range.moveStart('character', pos);
                    range.select();
                }
            }


            scope.$watch(attrs.ngModel, function(newValue, oldValue) {
                elm.val(numberFilter(newValue, num));
            })





        }
    };
}]);



angular.module('app').directive('toChange', function($parse) {
    return {
        link: function(scope, element, attrs, ctrl) {
            //控制输入框只能输入数字和小数点  
            function limit() {
                var limitV = element[0].value;
                limitV = limitV.replace(/[^0-9.]/g, "");
                element[0].value = limitV;
                $parse(attrs['ngModel']).assign(scope, limitV);
                format();
            }

            //对输入数字的整数部分插入千位分隔符  
            function format() {


                var formatV = element[0].value;
                var array = new Array();
                array = formatV.split(".");
                var re = /(-?\d+)(\d{3})/;
                while (re.test(array[0])) {
                    array[0] = array[0].replace(re, "$1,$2")
                }
                var returnV = array[0];
                for (var i = 1; i < array.length; i++) {
                    returnV += "." + array[i];
                }
                element[0].value = returnV;
                $parse(attrs['ngModel']).assign(scope, formatV);
            }

            scope.$watch(attrs.ngModel, function(newValue, oldValue) {

                limit();
            })


        }
    };

})