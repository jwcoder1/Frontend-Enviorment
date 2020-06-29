define(['plugins/base/directives/tree.organization', 'plugins/base/pages/people.selector'], function () {
    "use strict";
    angular.module('app')
        .controller('app.page.interfacelist', ['$scope', '$rootScope', '$timeout', 'ngDialog', '$location', '$http', 'utils', 'toastr', 'dialog',
            function ($scope, $rootScope, $timeout, ngDialog, $location, $http, utils, toastr, dialog) {

                $scope.myfilter = function (item) {
                    var val = $scope.memberSearch;
                    if (val == null)
                        val = "";
                    if (item.showType.indexOf(val) != -1 || item.value.indexOf(val) != -1
                        || item.show.indexOf(val) != -1) {
                        return true
                    }
                };
				
				/**
				 * 高度自适应
				 */
				var height = document.documentElement.clientHeight
    			document.getElementById("con").style.height = height-230+"px"; 
                document.getElementById("conn").style.height = height-217+"px"; 

                var self = $scope;
                self.result = [];
                self.title = "群组管理";

                var filter = {
                    "start": 0,
                    "count": 15
                };

                self.filter2 = {
                    "start": 0,
                    "search":"",
                    "count": 15
                };

                self.nowPage = 1;
                self.sumPage = 1;
                self.nowPage2 = 1;
                self.sumPage2 = 1;

                function onEnterpriseChange(enterprise) {
                    if (!enterprise) {
                        enterprise = {eid: ""};
                    }
                    self.current = null;
                    self.groupmembers = null;
                    self.peopleMembers = null;
                    self.nowPage = 1;
                    loadInterfaceList();
                }

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

                //TODO
                self.loadPeople=function(){
                	 if (self.current) {     
                             self.nowPage2 = 1;
                             loadDetailPeople(self.current);
                     }
                }
                
                loadEnterprise();
                function loadDetailPeople(group) {//TODO
                    self.filter2.start = (self.nowPage2 - 1) * self.filter2.count;
                    self.filter2["iid$eq"] = group.iid;
                    if(self.selectedEnterprise){
                        self.filter2.eid = self.selectedEnterprise.eid;
                    }
                    console.info('filter',self.filter2);
                    var url = group.type=="SEND"?"base/interfacetransmit/apps":"base/interfaceauthorized/apps";
                    utils.async("get", url, self.filter2).then(function (res) {
                        var count = res.data.body.count;
                        self.peopleMembers = res.data.body.items;
                        self.sumPage2 = Math.floor((count - 1) / self.filter2.count) + 1;
                        if (self.sumPage2 == 0) {
                            self.sumPage2 = 1;
                        }
                        if (self.sumPage2 < self.nowPage2) {
                            self.action.prevPage2();
                        }
                    }, function (error) {
                    	 //
                    });
                }

                function loadInterfaceList() {
                    filter.start = (self.nowPage - 1) * filter.count;
                    utils.async("get", "base/interfaceinfo", filter).then(function (res) {
                        var count = res.data.body.count;
                        self.groups = res.data.body.items;
                        self.sumPage = Math.floor((count - 1) / filter.count) + 1;
                        if (self.sumPage == 0) {
                            self.sumPage = 1;
                        }
                        if (self.sumPage < self.nowPage) {
                            self.action.prevPage();
                        }
                    }, function (error) {
                        //toastr.warning(error.message);
                    });
                }


                onEnterpriseChange();

                self.action = {
                    searchKeyUp: function (e) {
                        var keycode = window.event ? e.keyCode : e.which;
                        if (keycode == 13) {
                            self.current = null;
                            self.groupmembers = [];
                            filter["name$match"] = self.search;
                            self.nowPage = 1;
                            loadInterfaceList();
                        }
                    },
                    searchKeyUpPeople: function (e) {
                        if (self.current) {
                            var keycode = window.event ? e.keyCode : e.which;
                            if (keycode == 13) {
                                self.nowPage2 = 1;
                                loadDetailPeople(self.current);
                            }
                        }
                    },
                    nextPage: function () {
                        if (self.nowPage + 1 <= self.sumPage) {
                            self.current = null;
                            self.groupmembers = [];
                            self.nowPage = self.nowPage + 1;
                            loadInterfaceList();
                        }
                    },
                    prevPage: function () {
                        if (self.nowPage - 1 > 0) {
                            self.current = null;
                            self.groupmembers = [];
                            self.nowPage = self.nowPage - 1;
                            loadInterfaceList();
                        }
                    },
                    nextPage2: function () {
                        if (self.current) {
                            if (self.nowPage2 + 1 <= self.sumPage2) {
                                self.peopleMembers = [];
                                self.nowPage2 = self.nowPage2 + 1;
                                loadDetailPeople(self.current);
                            }
                        }
                    },
                    prevPage2: function () {
                        if (self.current) {
                            if (self.nowPage2 - 1 > 0) {
                                self.peopleMembers = [];
                                self.nowPage2 = self.nowPage2 - 1;
                                loadDetailPeople(self.current);
                            }
                        }
                    },
                    selectInterface: function (group) {
                        self.current = group;
                        self.nowPage2 = 1;
                        loadDetailPeople(group);
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
                    }
                }

            }
        ]);
});