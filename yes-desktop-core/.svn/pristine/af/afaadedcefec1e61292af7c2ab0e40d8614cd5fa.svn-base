angular.module('app').directive('jqMarquee', ['$timeout', function ($timeout) {
    function init(element, $ul, options) {
        var defaults = {
            speed: 40,
            rowHeight: 24
        };
        $ul.height(819);
        var opts = $.extend({}, defaults, options), intId = [];
        function marquee(obj, step) {
            $ul.animate({
                marginTop: '-=1'
            }, 0, function () {
                var s = Math.abs(parseInt($ul.css("margin-top")));
                if (s >= step) {
                    $ul.find("li").slice(0, 1).appendTo($ul);
                    $ul.css("margin-top", 0);
                }
            });
        }
        element.each(function (i) {
            var sh = opts["rowHeight"], speed = opts["speed"];
            intId[i] = setInterval(function () {
                if ($ul.height() <= element.height()) {
                    clearInterval(intId[i]);
                }
                else {
                    marquee(element, sh);
                }
            }, speed);
            element.hover(function () {
                clearInterval(intId[i]);
            }, function () {
                intId[i] = setInterval(function () {
                    if ($ul.height() <= element.height()) {
                        clearInterval(intId[i]);
                    }
                    else {
                        marquee(element, sh);
                    }
                }, speed);
            });
        });
    }
    return {
        restrict: "E",
        replace: true,
        scope: {
            ngModel: '=',
            option: '='
        },
        transclude: true,
        require: 'ngModel',
        template: "\n                <div class='jq-marquee'>\n                    <ul>\n                        <li ng-repeat=\"quota in ngModel\" ng-class-even=\"'lieven'\">\n                            <p>{{quota.name}}\uFF1A{{quota.value}}</p>\n                            <p>\n                                <a target=\"_blank\" class=\"btn_lh\">\u540C\u6BD4 \n                                    <i ng-show='quota.yoy==0' style=\"color: #28BD19;\">- -</i>\n                                    <i ng-show='quota.yoy>0' style=\"color: #FF3300;\">\u2191 {{quota.yoy}} %</i>\n                                    <i ng-show='quota.yoy<0' style=\"color: #28BD19;\">\u2193 {{quota.yoy}} %</i>\n                                     \n                                </a>\n                                <em>\u73AF\u6BD4\n                                    <i ng-show='quota.mom==0' style=\"color: #28BD19;\">- -</i>\n                                    <i ng-show='quota.mom>0' style=\"color: #FF3300;\">\u2191 {{quota.mom}} %</i>\n                                    <i ng-show='quota.mom<0' style=\"color: #28BD19;\">\u2193 {{quota.mom}} %</i>\n                                </em>\n                            </p>\n                        </li>\n                    </ul>\n                </div>",
        link: function (scope, element, attr) {
            var $ul = element.find('ul');
            init(element, $ul, {
                speed: 30,
                rowHeight: 68
            });
        }
    };
}]);