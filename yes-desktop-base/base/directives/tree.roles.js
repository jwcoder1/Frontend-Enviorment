'use strict';
(function () {
    angular.module('app')
        .run(function ($templateCache) {

        }).directive('yesRoleTree', function ($compile, $templateCache, $http) {

            var walkChildren = function (tree, state) {
                angular.forEach(tree, function (node) {
                    node.selected = state;
                    if (node.children) {
                        walkChildren(node.children, state);
                    }
                });
            };

            var walkParent = function (node, state) {
                if (node && node.parentNode && state) {
                    node.parentNode.selected = state;
                    walkParent(node.parentNode, state);
                }
            };

            return {
                restrict: 'EA',
                scope: {
                    nodes: "=",
                    root: "=",
                    hide: "=",
                    cantSelected: "="
                },
                //templateUrl: 'plugins/base/templates/role-tree.html',
                //replace: true,
                link: function (scope, element, attrs) {
                    $http.get("plugins/base/directives/tree.roles.html", {cache: $templateCache})
                        .success(function (html) {
                            scope.selectChanged = scope.selectChanged || function (node) {
                            		if(scope.cantSelected){
	                                    node.selected = !node.selected; 
                            		}else{
                            			walkChildren(node.children, node.selected);
	                                    walkParent(node, node.selected);
                            		}
                                };
                            element.html('').append($compile(html)(scope));
                        });
                }
            };
        })
})();