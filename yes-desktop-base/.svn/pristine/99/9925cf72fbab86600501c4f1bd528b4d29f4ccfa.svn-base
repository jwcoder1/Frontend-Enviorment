'use strict';
(function () {
    angular.module('app')
        .run(function ($templateCache) {

        }).directive('yesOrganizationTree', function ($compile, $templateCache, $http) {

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
                    onSelect: "=",
                    multiple: "=",
                    sortable: "=",
                    sortOption: "="
                },
                //templateUrl: 'plugins/base/templates/role-tree.html',
                //replace: true,
                link: function (scope, element, attrs) {
                	var template = "tree.organization.html";
                	if(scope.sortable){
                		template = "tree.organization.sortable.html";
                	}
                    $http.get("plugins/base/directives/"+template, {cache: $templateCache})
                        .success(function (html) {
                            scope.selectChanged = function (node, pd) {
                            		if(pd || !node.children || !node.children.length){
                            			if(scope.multiple){
                            				node.selected = !node.selected;
                            			}else{
		                            		walkChildren(scope.initial,false);
		                        			node.selected = true;
                            			}
	                        			scope.onSelect(node);
                            		}
                                };
                            element.html('').append($compile(html)(scope));
                            scope.showMoveIco = function(brothers){
                            	brothers.forEach(function(item){
                            		item.showMove = true;
                            	});
                            };
                            scope.hideMoveIco = function(brothers){
                            	brothers.forEach(function(item){
                            		item.showMove = false;
                            	});
                            };
                        });
                }
            };
        })
})();