angular.module('app.core.layout')
    .directive('selfAdaption', ['settings', '$timeout', '$window', '$templateCache', '$http', '$compile', '$rootScope',
        function(settings, $timeout, $window, $templateCache, $http, $compile, $rootScope) {
            return {
                restrict: 'AE',
                // scope: {
                //     postion: "@",
                //     buttontitle: "@"
                // },
                link: function(scope, ele, attrs, ctrl) {
                    if (scope.root == null) {
                        scope.root = true;
                    }
                    if (!scope.leftbuttons) {
                        scope.leftbuttons = [];
                    }

                    if (!scope.rightbuttons) {
                        scope.rightbuttons = [];
                    }

                    if (!attrs.id) {
                        attrs.id = "selfadaptionid" + new Date().getTime().toString();
                    }

                    // scope.$on('selfadaption:hide', function() {
                    //     angular.element(document.querySelector('.drawer-right')).removeClass('toggled');
                    //     angular.element(document.querySelector('.drawer-left')).removeClass('toggled');
                    // });

                    if (attrs.postion == "left") {
                        ele.addClass("drawer-left toggled");
                        scope.leftbuttons.push({
                            id: attrs.id,
                            name: attrs.buttontitle,
                            onFooterbuttonclick: function(item) {
                                if (ele.hasClass("toggled")) {
                                    //    scope.$emit("selfadaption:hide", event);
                                    item.name = "返回";
                                    ele.addClass("auto-height");
                                    ele.removeClass("toggled");
                                } else {
                                    item.name = attrs.buttontitle;
                                    // scope.$emit("selfadaption:hide", event);
                                    ele.removeClass("auto-height");
                                    ele.addClass("toggled");
                                }

                            }
                        })
                    }


                    if (attrs.postion == "right") {
                        ele.addClass("drawer-right toggled");
                        scope.rightbuttons.push({
                            id: attrs.id,
                            name: attrs.buttontitle,
                            onFooterbuttonclick: function(item) {
                                if (ele.hasClass("toggled")) {
                                    // scope.$emit("selfadaption:hide", event);
                                    item.name = "返回";
                                    ele.addClass("auto-height");
                                    ele.removeClass("toggled");
                                } else {
                                    // scope.$emit("selfadaption:hide", event);
                                    item.name = attrs.buttontitle;
                                    ele.removeClass("auto-height");
                                    ele.addClass("toggled");
                                }

                            }
                        })
                    }
                    // scope.$on('treenode:click', function() {
                    //     console.log("on event:", "ddddd");
                    // });
                    if (attrs.postion == "bottom") {
                        $http.get('plugins/bas/components/selfadaptionbutton.html', { cache: $templateCache })
                            .success(function(html) {
                                ele.html(ele.html()).append($compile(html)(scope));
                            });
                    }

                }
            }


        }
    ]);