define(['plugins/base/directives/tree.application'], function () {
    "use strict";
    angular.module('app')
        .controller('app.page.interface', ['$scope', '$rootScope', 'ngDialog', '$location', '$http', 'utils', 'toastr', 'settings', 'dialog',
            function ($scope, $rootScope, ngDialog, $location, $http, utils, toastr, settings, dialog) {

                /*$scope.myfilter = function(item){
                 var val = $scope.memberSearch;
                 if(val==null)
                 val = "";
                 if(item.showType.indexOf(val)!=-1 || item.value.indexOf(val)!=-1
                 || item.show.indexOf(val)!=-1){
                 return true
                 }
                 };*/

				var height = document.documentElement.clientHeight
    			document.getElementById("con").style.height = height-175+"px"; 
                document.getElementById("conn").style.height = height-177+"px"; 
                document.getElementById("connn").style.height = height-235+"px"; 

                var self = $scope;
                self.result = [];

                function loadEnterprise() {
                    if ($rootScope.myEnterprise) {
                        self.showEnterpriseName = $rootScope.myEnterprise.cname;
                        self.selectedEnterprise = $rootScope.myEnterprise;
                        self.enterpriseNode = angular.copy($rootScope.myEnterpriseNode);
                    } else {
                        utils.async("get", "base/enterprise/getenterprises").then(function (res) {
                            res.data.body.Enterprises.forEach(function (item) {
                                if (item.eid == res.data.body.eid) {
                                    $rootScope.myEnterprise = item;
                                    self.showEnterpriseName = item.cname;
                                    self.selectedEnterprise = item;
                                }
                                item.name = item.cname;
                                item.parent = item.pid;
                                item.uid = item.no;
                            });
                            var menus = utils.setIteration("", res.data.body.Enterprises);
                            self.enterpriseNode = {"children": menus, isRoot: true};
                            $rootScope.myEnterpriseNode = angular.copy(self.enterpriseNode);
                        }, function (error) {
                            //toastr.warning(error.message);
                        });
                    }
                }

                loadEnterprise();

                function onEnterpriseChange(enterprise) {
                    if (!enterprise) {
                        enterprise = {eid: ""};
                    }
                    self.current = null;
                    self.members = [];
                    self.members2 = [];

                    utils.async("get", "base/appGroup", {"eid": enterprise.eid, "count": 9999}).then(function (res) {

                        utils.async("get", "base/appGroupMember", {
                            "eid": enterprise.eid,
                            "count": 9999
                        }).then(function (res2) {
                            res.data.body.items.forEach(function (item) {
                                item.parent = item.pid;
                                item.uid = item.agid;
                            });
                            res2.data.body.items.forEach(function (item) {
                                item.parent = item.agid;
                                item.name = item.show;
                                item.isApp = true;
                            });
                            var menus = utils.setIteration("", res2.data.body.items.concat(res.data.body.items));
                            self.node = {"children": menus, isRoot: true};

                        }, function (error2) {
                            toastr.warning(error2.message);
                        });

                    }, function (error) {
                        //toastr.warning(error.message);
                    });
                }

                onEnterpriseChange();

                function loadInterface() {
                    utils.ajax({
                        method: "GET",
                        url: "base/interfaceinfo",
                        params: {"type$eq": "RECV"}
                    }).then(function (res) {
                        var receives = [];
                        res.data.body.items.forEach(function (item) {
                            receives.push({
                                name: item.name,
                                value: item.iid
                            });
                        });
                        $scope.receives = receives;
                    });

                    utils.ajax({
                        method: "GET",
                        url: "base/interfaceinfo",
                        params: {"type$eq": "SEND"}
                    }).then(function (res) {
                        var sends = [];
                        res.data.body.items.forEach(function (item) {
                            sends.push({
                                name: item.name,
                                value: item.iid
                            });
                        });
                        $scope.sends = sends;
                    });
                }

                loadInterface();

                var filter = self.filter = {
                    "start": 0,
                    "count": 999
                };

                function editMember(model, type) {
                    ngDialog.open({
                        template: "plugins/base/pages/interface.edit.html",
                        controller: function ($scope) {
                            $scope.type = type;
                            $scope.model = angular.copy(model);
                            var interfaces = [];
                            if (type == "SEND") {
                                self.sends.forEach(function (item) {
                                    var pd = true;
                                    for (var i = 0; i < self.members2.length; i++) {
                                        var item2 = self.members2[i];
                                        if (item2.iid == item.value) {
                                            pd = false;
                                            break;
                                        }
                                    }
                                    if (pd || item.value == $scope.model.iid) {
                                        interfaces.push(item);
                                    }
                                });
                                $scope.interfaces = interfaces;
                            } else {
                                self.receives.forEach(function (item) {
                                    var pd = true;
                                    for (var i = 0; i < self.members.length; i++) {
                                        var item2 = self.members[i];
                                        if (item2.iid == item.value) {
                                            pd = false;
                                            break;
                                        }
                                    }
                                    if (pd || item.value == $scope.model.iid) {
                                        interfaces.push(item);
                                    }
                                });
                                $scope.interfaces = interfaces;
                            }
                            if (!$scope.model.uid) {
                                $scope.model.enable = true;
                            }
                            $scope.save = function (form) {
                                if ($scope.model.iid) {
                                    if (type == "SEND" && !$scope.model.method) {
                                        toastr.warning("请输入方法");
                                        return false;
                                    }
                                    var errorback = angular.copy($scope.model);
                                    delete model.show;
                                    var method = $scope.model.uid ? "put" : "post";
                                    utils.async(method, "base/" + ("SEND" == type ? "interfacetransmit" : "interfaceauthorized") + (method == "put" ? "/" + $scope.model.uid : ""), $scope.model)
                                        .then(function (res) {
                                                if ("SEND" == type) {
                                                    loadDetail2();
                                                } else {
                                                    loadDetail();
                                                }
                                                ngDialog.closeAll();
                                            },
                                            function (error) {
                                                $scope.model = errorback;
                                                //toastr.warning(error.message);
                                            }
                                        );
                                } else {
                                    toastr.warning("接口必须选择");
                                }
                            }
                        }
                    });
                }

                function loadDetail() {
                    utils.ajax({
                        method: "GET",
                        url: "base/interfaceauthorized",
                        params: {
                            "aid$eq": self.current.appid,
                            "count": 9999
                        }
                    }).then(function (res) {
                        $scope.members = res.data.body.items;
                    });
                }

                function loadDetail2() {
                    utils.ajax({
                        method: "GET",
                        url: "base/interfacetransmit",
                        params: {
                            "aid$eq": self.current.appid,
                            "count": 9999
                        }
                    }).then(function (res) {
                        $scope.members2 = res.data.body.items;
                    });
                }

                self.action = {
                    removeMember: function (member, type) {
                        dialog.confirm('确定删除该条记录?').then(function () {
                            utils.async("DELETE", "base/" + ("SEND" == type ? "interfacetransmit" : "interfaceauthorized") + "/" + member.uid)
                                .then(function (res) {
                                        if (type == "SEND") {
                                            loadDetail2();
                                        } else {
                                            loadDetail();
                                        }
                                    },
                                    function (error) {
                                        //toastr.warning(error.message);
                                    }
                                );
                        });
                    },
                    editMember: function (item, type) {
                        editMember(item, type);
                    },
                    addMember: function (type) {
                        editMember({"aid": self.current.appid}, type);
                    },
                    changeEnterprise: function () {
                        ngDialog.open(
                            {
                                template: 'plugins/base/pages/tree.selector.html',
                                controller: function ($scope) {
                                    $scope.title = "企业列表";
                                    $scope.node = self.enterpriseNode;
                                    $scope.action = {
                                        onSelect: function (enterprise) {
                                            if (enterprise.eid != self.selectedEnterprise.eid) {
                                                self.selectedEnterprise = enterprise;
                                                self.showEnterpriseName = enterprise.cname;
                                                onEnterpriseChange(enterprise);
                                            }
                                            $scope.closeThisDialog();
                                        }
                                    }
                                }
                            }
                        );
                    },
                    selectInterface: function (app) {
                        self.filter.search$match = "";
                        if (app.isApp) {
                            self.current = app;
                            loadDetail();
                            loadDetail2();
                            //loadDetail();
                        } else {
                            self.appAuthoritys = [];
                            self.current = null;
                            self.members = [];
                            self.members2 = [];
                            app.selected = false;
                            app.collapsed = !app.collapsed;
                        }
                    }
                }

            }
        ]);
});