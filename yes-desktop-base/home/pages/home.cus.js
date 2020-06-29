/* global angular */
define(['plugins/base/directives/tree.organization'],
    function() {
        "use strict";
        angular.module('app')
            .controller('app.home.cus',
                function($scope, $timeout, $rootScope, $translate,
                    interpreter, settings, utils, ngDialog, dialog, toastr, path) {
                    var self = $scope;



                    function loadEnterprise() {
                        if ($rootScope.myEnterprise) {
                            self.showEnterpriseName = $rootScope.myEnterprise.cname;
                            self.selectedEnterprise = $rootScope.myEnterprise;
                            self.enterpriseNode = angular.copy($rootScope.myEnterpriseNode);
                            onEnterpriseChange($rootScope.myEnterprise);
                        } else {
                            utils.async("get", "base/enterprise/getenterprises").then(function(res) {
                                res.data.body.Enterprises.forEach(function(item) {
                                    if (item.eid == res.data.body.eid) {
                                        $rootScope.myEnterprise = item;
                                        self.showEnterpriseName = item.cname;
                                        self.selectedEnterprise = item;
                                        onEnterpriseChange($rootScope.myEnterprise);
                                    }
                                    item.name = item.cname;
                                    item.parent = item.pid;
                                    item.uid = item.no;
                                });
                                var menus = utils.setIteration("", res.data.body.Enterprises);
                                self.enterpriseNode = { "children": menus, isRoot: true };
                                $rootScope.myEnterpriseNode = angular.copy(self.enterpriseNode);

                            }, function(error) {
                                //toastr.warning(error.message);
                            });
                        }
                    }

                    var treeOption = {
                        id: "m_type",
                        parent: "parent",
                        name: "type_desc",
                        readonly: true,
                        clicknode: function(item) {
                            self.filter.m_type$match = item.m_type;
                            self.invitmaction.load();
                        }
                    }
                    self.treeOption = treeOption;

                    function onEnterpriseChange(enterprise) {

                        // self.filter = {
                        //     count: 20,
                        //     eid$eq: enterprise.eid
                        // };
                        angular.forEach(self.filter, function(raw, key) {
                            if (key == 'm_type$match') {
                                delete self.filter[key];
                            }
                        });
                        self.filter.eid$eq = enterprise.eid
                        self.invitmaction.load()

                        utils.async("get", "bas/bastype", {
                            eid$eq: enterprise.eid,
                            "count": 9999
                        }).then(function(res) {
                            $scope.menus1 = res.data.body.items;
                        }, function(error) {
                            //toastr.warning(error.message);
                        });

                    }



                    self.binds = function() {

                        self.action = {
                            changeEnterprise: function() {
                                ngDialog.open({
                                    template: 'plugins/base/pages/tree.selector.html',
                                    controller: function($scope) {
                                        $scope.title = "企业列表";
                                        $scope.node = self.enterpriseNode;
                                        $scope.action = {
                                            onSelect: function(enterprise) {
                                                if (enterprise.eid != self.selectedEnterprise.eid) {
                                                    self.selectedEnterprise = enterprise;
                                                    self.showEnterpriseName = enterprise.cname;
                                                    onEnterpriseChange(enterprise);
                                                }
                                                $scope.closeThisDialog();
                                            }
                                        }
                                    }
                                });
                            },

                        };

                    };

                    self.invitms = [];
                    self.filter = { count: 20 };

                    self.invitmaction = {
                        load: function() {
                            utils.ajax({
                                url: "bas/invitm/queryhome",
                                params: self.filter
                            }).then(function(res) {
                                var selfHost = location.protocol + "//" + location.host;
                                self.host = settings.host == "self" ? selfHost : settings.host;
                                self.apiPrefix = settings.apiPrefix;
                                self.invitms = res.data.body.items;
                                self.invitms.forEach(function(item) {
                                    item.thumbUrl = self.host + "/" + self.apiPrefix + "/base/attachment/showthumb?uid=" + item.attuid;
                                }, this);

                            }, function(error) {

                            });
                        }
                    }






                    /**
                     * 执行初始化
                     */
                    loadEnterprise();
                    self.binds();
                    // self.invitmaction.load();


                });
    });