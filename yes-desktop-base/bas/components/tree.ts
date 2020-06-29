namespace yes {

    angular.module('app').directive('basTree', [
        '$templateCache', '$http', '$compile',
        function($templateCache, $http, $compile) {
            return {
                restrict: "EA",
                scope: {
                    resource: "=", //数据源
                    option: "=", ///参数配置(parent:父节点栏位,id:节点id栏位)
                    bootValue: "@", //展示父节点
                    levelValue: "@" //显示层级
                },
                transclude: true,
                controller: ['$scope', '$location', '$templateCache', '$interpolate',
                    function($scope, $location, $templateCache, $interpolate) {
                        var scope = $scope;
                        scope.items = [];
                        scope.$watch('resource', function(newValue, oldValue) {
                            if (newValue) {
                                scope.items = scope.resource.filter(function(t) {
                                    if (!scope.bootValue && !t[scope.option.parent]) {
                                        t.hasnextlevel = (scope.findnextlevel(t[scope.option.id]).length > 0 ? true : false);
                                        if (!t.icon) {
                                            t.icon = "fa-book";
                                        }
                                        return t;
                                    }
                                    if (t[scope.option.parent] == scope.bootValue) {
                                        t.hasnextlevel = (scope.findnextlevel(t[scope.option.id]).length > 0 ? true : false);
                                        if (!t.icon) {
                                            t.icon = "fa-book";
                                        }
                                        return t;
                                    }

                                })
                            }
                        }, true); ///



                        scope.findnextlevel = function(parentval) {
                            var nextitems = scope.resource.filter(function(t) {
                                if (t[scope.option.parent] == parentval) {
                                    return t;
                                }
                            })
                            return nextitems;
                        };

                        angular.element(".sidebar").on('mousedown', function(e) {
                            angular.element(document.querySelector('.sidebar .tree-selected')).removeClass('tree-selected');
                        });

                        scope.clearactive = function() {
                                scope.resource.forEach(function(element) {
                                    element.active = false;
                                }, this);
                            }
                            //scope.crentnode=null;

                        scope.nodeadd = function(node) {
                            scope.option.addfn(node);
                        };

                        scope.nodeedit = function(node) {
                            scope.option.editfn(node);
                        };








                        scope.nodeSelect = function(event, node) {
                            scope.clearactive();
                            node.active = true;
                            if (scope.option.clicknode) {
                                scope.option.lowerlevels=scope.findnextlevel(node[scope.option.id]);
                                scope.option.clicknode(node,scope.levelValue);
                            }
                            // scope.$emit("selfadaption:hide", event);


                            //angular.element(event.currentTarget).addClass('tree-selected');
                            // scope.$emit('nav:open-tab', node);
                        };
                    }
                ],
                link: function(scope, ele, attrs, ctrl) {
                    if (scope.root == null) {
                        scope.root = true;
                    }
                    $http.get('plugins/bas/components/tree.html', { cache: $templateCache })
                        .success(function(html) {
                            // scope.selectChanged = scope.selectChanged || function (node) {
                            //         walkChildren(node.children, node.selected);
                            //         walkParent(node, node.selected);
                            //     };
                            ele.html('').append($compile(html)(scope));
                        });
                }
            };
        }
    ]);
}