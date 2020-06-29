angular.module('app')
    .directive('showOnFocus', function() {
        return {
            restrict: 'A',
            link: function(scope, element) {
                var focused = false,
                    opened = false;
                var select = element.children('.selectize-input');
                var toggleInput = element.find('input')[0];
                var span = element.children('.ui-select-match-text');


                var onfocus = function() {
                    if (!focused && !opened) {
                        toggleInput.click();
                        opened = focused = true;
                    } else if (opened) {
                        opened = false;
                    }
                };
                var onhover = function() {
                    if (!focused && !opened) {
                        toggleInput.click();
                        opened = focused = true;
                    };
                };

                var onblur = function(event) {
                    focused = false;
                    //  event.keyCode = 13;
                    console.log("aaaddd");
                };
                var lostfocus = function(event) {
                    focused = false;
                    //  event.keyCode = 13;
                    console.log("gggggggg");
                };
                element.bind('mouseenter', onhover);
                element.bind('click', onblur);
                select.bind('blur', onblur);
                select.bind('focus', onfocus);
                span.bind('blur', lostfocus);

                //show on pageload
                onhover();
            }
        };
    });