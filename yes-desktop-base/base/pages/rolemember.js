define(['plugins/base/directives/tree.roles', 'plugins/base/directives/tree.application', 'plugins/base/pages/people.selector'], function() {
    "use strict";
    angular.module('app')
        .controller('app.page.rolemember', ['$scope', '$rootScope', 'ngDialog', '$location', '$http', 'utils', 'toastr', 'settings', 'dialog', 'qwsys',
            function($scope, $rootScope, ngDialog, $location, $http, utils, toastr, settings, dialog, qwsys) {

                /**
                 * 高度自适应
                 */
                var height = document.documentElement.clientHeight;
                document.getElementById("connn").style.height = height - 170 + "px";
                document.getElementById("conn").style.height = height - 139 + "px";
                document.getElementById("con").style.height = height - 104 + "px";
                document.getElementById("bon").style.height = height - 139 + "px";

                var self = $scope;

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
                    });
                }

                function loadDetail(item) {
                    utils.async("get", "base/rolemember/detail/" + item.rid).then(function(res) {
                        self.accounts = res.data.body || [];
                    });
                }

                function getSelected(selects, menus) {
                    if (menus) {
                        menus.forEach(function(menu) {
                            if (!menu.isDelete) {
                                selects.push(menu.aid); //实际上存的是mid的值
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
                            getSelected(selects, self.accounts);
                            utils.async("post", "base/rolemember/detail", {
                                "roleId": self.current.rid,
                                "accountId": selects.toString()
                            }).then(function() {
                                toastr.success("保存成功");
                                loadDetail(self.current);
                            });
                        } else {
                            toastr.warning("请选择角色成员");
                        }
                    },
                    add: function() {
                        var selects = [];
                        getSelected(selects, self.accounts);
                        var parm = {
                            aid$notin: selects.toString()
                        };
                        qwsys.getdocuments("getaccount", parm, function(selectmodel) {
                            if (selectmodel.type === "rep") {
                                console.info(selectmodel);
                                self.accounts = selectmodel.records;
                            } else {
                                selectmodel.records.forEach(function(item) {
                                    var i = {};
                                    i.aid = item.aid;
                                    i.name = item.name;
                                    self.accounts.push(i);
                                })
                            }
                        });
                    },
                    delete: function() {
                        if (self.current) {
                            angular.forEach(self.accounts, function(a) {
                                if (a.selected) {
                                    a.isDelete = true;
                                }
                            })
                        }
                    }
                };

                loadRole();
            }
        ]);
});