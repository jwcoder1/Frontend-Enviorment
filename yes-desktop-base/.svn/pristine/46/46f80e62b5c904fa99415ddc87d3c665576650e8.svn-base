define(['plugins/base/directives/tree.roles', 'plugins/base/directives/tree.application', 'plugins/base/pages/people.selector'], function() {
    "use strict";
    angular.module('app')
        .controller('app.page.rolemenu', ['$scope', '$rootScope', 'ngDialog', '$location', '$http', 'utils', 'toastr', 'settings', 'dialog',
            function($scope, $rootScope, ngDialog, $location, $http, utils, toastr, settings, dialog) {
				
				// /**
				//  * 高度自适应
				//  */
				// var height = document.documentElement.clientHeight;
                // document.getElementById("connn").style.height = height-170+"px";
                // document.getElementById("conn").style.height = height-139+"px";
                // document.getElementById("con").style.height = height-104+"px";
				// document.getElementById("bon").style.height = height-139+"px";

                var self = $scope;

                utils.async("get", "menus", { "type": "suball" }).then(function(res) {
                    var menus = utils.setIteration("", res.data.body);
                    self.node = { "children": menus, isRoot: true };
                });

                var filter = self.filter = {
                    "start": 0,
                    "count": 20
                };

                self.nowPage = 1;
                self.sumPage = 1;

                function loadRole() {
                    filter.start = (self.nowPage - 1) * filter.count;
                    utils.async("get", "base/role", filter).then(function(res) {
                        var count = res.data.body.count;
                        self.roles = res.data.body.items;
                        self.sumPage = Math.floor((count - 1) / filter.count) + 1;
                        if (self.sumPage === 0) {
                            self.sumPage = 1;
                        }
                        if (self.sumPage < self.nowPage) {
                            self.action.prevPage();
                        }
                        clearMenus();
                    });
                }

                function loadDetail(item) {
                    utils.async("get", "base/rolemenu?roleId$eq=" + item.rid).then(function(res) {
                        var items = res.data.body.items || [];
                        setSelected(self.node.children, items);
                    }, function(error) {
                    });
                }

                function setSelected(menus, items) {
                    if (menus) {
                        menus.forEach(function(menu) {
                            menu.selected = false;
                            for (var i = 0, size = items.length; i < size; i++) {
                                var item = items[i];
                                if (item.menuId === menu.uid) {
                                    menu.selected = true;
                                    break;
                                }
                            }
                            if (menu.operations) {
                                menu.operations.forEach(function(op) {
                                    op.selected = false;
                                    for (var i = 0, size = items.length; i < size; i++) {
                                        var item = items[i];
                                        if (item.menuId === op.uid) {
                                            op.selected = true;
                                            break;
                                        }
                                    }
                                });
                            }
                            if (menu.children) {
                                setSelected(menu.children, items);
                            }
                        });
                    }
                }

                function clearMenus() {
                    setSelected(self.node.children, []);
                }

                function getSelected(selects, menus) {
                    if (menus) {
                        menus.forEach(function(menu) {
                            if (menu.selected) {
                                selects.push(menu.uid); //实际上存的是mid的值
                            }
                            if (menu.operations) {
                                menu.operations.forEach(function(op) {
                                    if (op.selected) {
                                        selects.push(op.uid);
                                    }
                                });
                            }
                            if (menu.children) {
                                getSelected(selects, menu.children);
                            }
                        });
                    }
                }

                self.action = {
                    nextPage: function() {
                        self.current = null;
                        if (self.nowPage + 1 <= self.sumPage) {
                            self.nowPage = self.nowPage + 1;
                            loadRole();
                        }
                    },
                    prevPage: function() {
                        self.current = null;
                        if (self.nowPage - 1 > 0) {
                            self.nowPage = self.nowPage - 1;
                            loadRole();
                        }
                    },
                    selectRole: function(item) {
                        self.current = item;
                        loadDetail(item);
                    },
                    save: function() {
                        if (self.current) {
                            var selects = [];
                            getSelected(selects, self.node.children);
                            utils.async("post", "base/rolemenu/detail", {
                                "roleId": self.current.rid,
                                "menuId": selects.toString()
                            }).then(function(res) {
                                toastr.success("保存成功");
                            });
                        } else {
                            toastr.warning("请选择角色成员");
                        }
                    },
                    copy: function() {
                        self.copy = [];
                        getSelected(self.copy, self.node.children);
                        toastr.success("复制成功");
                    },
                    paste: function() {
                        var items = [];
                        self.copy.forEach(function(c) {
                            items.push({ "menuId": c });
                        });
                        setSelected(self.node.children, items);
                    }
                };

                loadRole();
            }
        ]);
});
