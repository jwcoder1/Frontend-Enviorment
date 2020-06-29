'use strict';
(function () {
    angular.module('app')
        .run(function ($templateCache) {

        }).directive('yesApplicationTree', function ($compile, $templateCache, $http) {

            var walkChildren = function (tree, state) {
                angular.forEach(tree, function (node) {
                    node.selected = state;
                    if (node.children) {
                        walkChildren(node.children, state);
                    }
                });
            };
            
            return {
                restrict: 'EA',
                scope: {
                    nodes: "=",
                    root: "=",
                    hide: "=",
                    initial: "=",
                    onSelect: "="
                },
                //templateUrl: 'plugins/base/templates/role-tree.html',
                //replace: true,
                link: function (scope, element, attrs) {
                    $http.get("plugins/base/directives/tree.application.html", {cache: $templateCache})
                        .success(function (html) {
                            scope.selectChanged = function (node, pd) {
                            		if(pd || !node.children || !node.children.length){
	                            		walkChildren(scope.initial,false);
	                        			node.selected = true;
	                        			scope.onSelect(node);
                            		}
                                };
                            element.html('').append($compile(html)(scope));
                        });
                }
            };
        })
})();