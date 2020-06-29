define(['plugins/base/directives/tree.organization'], function() {
    "use strict";
    angular.module('app')
        .controller('app.page.organization', ['$scope', '$rootScope', 'ngDialog', '$location', '$http', 'utils', 'toastr', 'settings', 'dialog',
            function($scope, $rootScope, ngDialog, $location, $http, utils, toastr, settings, dialog) {
                var self = $scope;
                
                /**
                 * 高度自适应
                 */
                var height = document.documentElement.clientHeight
    			document.getElementById("myCon").style.height = height-250+"px"; 
                document.getElementById("myConn").style.height = height-182+"px"; 
                
                self.enableTypes = [{ value: true, name: "启用" }, { value: false, name: "停用" }];
                self.result = [];
                self.title = "组织职务管理";
                $scope.showGroupOrg = true;

                $scope.isGroupTypes = [{
                    name: "是",
                    value: true
                }, {
                    name: "否",
                    value: false
                }];

                //加载组织类型 
                function loadOrgTypes(type) {
                    var eid = self.selectedEnterprise ? self.selectedEnterprise.eid : "";
                    utils.async("get", "base/organization/getroots", {
                        "eid": eid
                    }).then(function(res) {
                        var types = [];
                        res.data.body.forEach(function(item) {
                            types.push({
                                "name": item.name,
                                "value": item.value
                            });
                        });
                        self.types = types;
                        if (type != '') {
                            self.orgType = type;
                        } else {
                            if (self.types.length > 0)
                                self.orgType = self.types[0].value;
                            else
                                self.orgType = '';
                        }

                    }, function(error) {
                        //toastr.warning(error.message);
                    });
                }
                loadOrgTypes('');

                //组织类型改变
                self.orgtypechanged = function() {
                    var type = self.orgType;
                    var items = angular.copy(self.tempitems);
                    var newitems = [];
                    var orgname = self.orgName;

                    //过滤   
                    if (type != undefined && type != null && type != '') {
                        items.forEach(function(item) {
                            var ttype = item.ttype + ",";
                            if ((ttype.indexOf(type) > -1))
                                newitems.push(item);
                        });
                    } else {
                        newitems = angular.copy(items);
                    }

                    //过滤后重组树 
                    function getParentId(node) {
                        var result = "";
                        if (node.parent == '')
                            return result;
                        var vitems = angular.copy(newitems);
                        vitems.forEach(function(item) {
                            if (item.uid == node.parent) {
                                if (!item.isGroup) {
                                    result = item.uid;
                                    return result;
                                } else {
                                    getParentId(item.uid);
                                }
                            }
                        });
                        return result;
                    }

                    function setChildrenPid(node) {
                        var pid = node.uid;
                        newitems.forEach(function(item) {
                            if (item.parent == pid) {
                                item.parent = node.vuid;
                            }
                        });
                    }

                    if (!self.showGroupOrg) {
                        for (var i = 0; i < newitems.length; i++) {
                            var item = newitems[i];
                            if (item.isGroup) {
                                item.deleted = true;
                                var pid = getParentId(item);
                                item.vuid = pid;
                                setChildrenPid(item);
                            } else {
                                item.deleted = false;
                            }
                        }
                    }

                    var realitems = [];
                    newitems.forEach(function(item) {
                        if (!item.deleted) {
                            realitems.push(item);
                        }
                    });

                    //构造树  
                    var menus = utils.setIteration("", realitems);
                    realitems.forEach(function(item) {
                        item.uid = item.tuid;
                        item.type = item.ttype;
                    });

                    var selectedItem = null;
                    items.forEach(function(item) {
                        item.uid = item.tuid;
                        item.type = item.ttype;
                        if (item.selected)
                            selectedItem = item;
                    });
                    self.node = { "children": menus, isRoot: true };
                    //重新定位
                    if (selectedItem != null) {
                        self.action.selectOrganization(selectedItem);
                    }

                }

                $scope.organizationSortOption = {
                    animation: 100,
                    handle: '.my-handle',
                    onEnd: function(evt) {
                        if (evt.newIndex != null && evt.oldIndex != evt.newIndex) {
                            var end;
                            if (evt.oldIndex > evt.newIndex) {
                                end = evt.models[evt.newIndex + 1].path;
                            } else {
                                end = evt.models[evt.newIndex - 1].path;
                            }
                            var begin = evt.model.path;
                            utils.async("put", "base/organization/changeLocation", {
                                "begin": begin,
                                "end": end,
                                "eid": evt.model.eid,
                                "type": evt.model.type,
                                "pid": evt.model.pid
                            }).then(function(res) {
                                    toastr.success('重新排序成功!');
                                },
                                function(error) {
                                    //toastr.warning(error.message);
                                }
                            );
                        }
                    }
                };

                $scope.postSortOption = {
                    animation: 100,
                    handle: '.my-handle',
                    onEnd: function(evt) {
                        if (evt.newIndex != null && evt.oldIndex != evt.newIndex) {
                            var end;
                            if (evt.oldIndex > evt.newIndex) {
                                end = evt.models[evt.newIndex + 1].uid;
                            } else {
                                end = evt.models[evt.newIndex - 1].uid;
                            }
                            var begin = evt.model.uid;
                            utils.async("put", "base/post/changeLocation", {
                                "begin": begin,
                                "end": end,
                                "eid": evt.model.eid,
                                "rootpid": evt.model.rootpid
                            }).then(function(res) {
                                    toastr.success('重新排序成功!');
                                },
                                function(error) {
                                    //toastr.warning(error.message);
                                }
                            );
                        }
                    }
                };
                $scope.sortOption = {
                    animation: 100,
                    handle: '.my-handle',
                    onEnd: function(evt) {
                        if (evt.newIndex != null && evt.oldIndex != evt.newIndex) {
                            var end;
                            if (evt.oldIndex > evt.newIndex) {
                                end = evt.models[evt.newIndex + 1].uid;
                            } else {
                                end = evt.models[evt.newIndex - 1].uid;
                            }
                            var begin = evt.model.uid;
                            utils.async("put", "base/position/changeLocation", {
                                "begin": begin,
                                "end": end,
                                "eid": evt.model.eid,
                                "rootpid": evt.model.rootpid
                            }).then(function(res) {
                                    toastr.success('重新排序成功!');
                                },
                                function(error) {
                                    //toastr.warning(error.message);
                                }
                            );
                        }
                    }
                };

                $scope.myfilter = function(item) {
                    var val = $scope.memberSearch;
                    if (val == null)
                        val = "";
                    if (item.pid.indexOf(val) != -1 || item.name.indexOf(val) != -1) {
                        return true
                    }
                }
                $scope.myfilter2 = function(item) {
                    var val = $scope.memberSearch2;
                    if (val == null)
                        val = "";
                    if (item.pid.indexOf(val) != -1 || item.name.indexOf(val) != -1) {
                        return true
                    }
                }

                function addResult_node(subs, result_node) {
                    if (subs) {
                        subs.forEach(function(item) {
                            if (self.orgName) {
                                if (item.name.indexOf(self.orgName) != -1 || item.oid.indexOf(self.orgName) != -1) {
                                    if (self.orgType) {
                                        if (item.type.indexOf(self.orgType + ",") != -1) {
                                            result_node.push(item);
                                        }
                                    } else {
                                        result_node.push(item);
                                    }
                                }
                            } else {
                                if (item.type.indexOf(self.orgType + ",") != -1) {
                                    result_node.push(item);
                                }
                            }
                            addResult_node(item.children, result_node);
                        });
                    }
                }

                function onOrgSearch() {
                    self.node.children.forEach(function(item) {
                        if (item.copy_children) {
                            item.children = item.copy_children;
                            item.copy_children = null;
                        }
                    });

                    resetCacheIsGroup();
                    $scope.cacheIsGroup = [];
                    if (self.orgName || self.orgType) {
                        var result_node = [];
                        addResult_node(self.copy_organization.children, result_node);
                        result_node.forEach(function(item) {
                            item.copy_children = item.children;
                            item.children = null;
                        })
                        self.node = { "children": result_node, isRoot: true };
                    } else {
                        self.node = self.copy_organization;
                    }

                    if (!self.showGroupOrg) {
                        setShowIsGroup(self.node.children);
                    }

                }

                function resetCacheIsGroup() {
                    if ($scope.cacheIsGroup && $scope.cacheIsGroup.length) {
                        removeIsGroupTemp(self.node.children);
                        $scope.cacheIsGroup.forEach(function(cache) {
                            var parent = cache.item.parentNode ? cache.item.parentNode : self.node;
                            parent.children.splice(cache.i, 0, cache.item);
                        });
                    }
                }

                function removeIsGroupTemp(subs) {
                    if (subs) {
                        for (var i = 0; i < subs.length; i++) {
                            var item = subs[i];
                            if (item.isGroupTemp) {
                                subs.splice(i, 1);
                                i--;
                            }
                            removeIsGroupTemp(item.children);
                        }
                    }
                }

                function setShowIsGroup(subs, showGroupOrg) {
                    if (subs) {
                        var childShift = 0; //因为子元素插入到isGroup元素中,所以要减去这个偏移值,才能得到原先的元素位置
                        var foundShift = 0; //结合上面的变量,删除childShift(因为子元素插入占了位置),再加上foundShift,因为该元素被删除了之后位置空出来了
                        for (var i = 0; i < subs.length; i++) {
                            var item = subs[i];
                            if (item.isGroup) {
                                if (!item.isGroupTemp) {
                                    $scope.cacheIsGroup.push({
                                        "item": item,
                                        "i": i - childShift + foundShift
                                    });
                                }
                                subs.splice(i, 1);
                                foundShift++;
                                if (item.children) {
                                    for (var j = 0; j < item.children.length; j++) {
                                        var child = item.children[j];
                                        child.isGroupTemp = true;
                                        subs.splice(i + j, 0, child);
                                        childShift++;
                                    }
                                }
                                i--;
                            }
                            //                          setShowIsGroup(item.children, showGroupOrg);
                        }
                        for (var i = 0; i < subs.length; i++) {
                            var item = subs[i];
                            setShowIsGroup(item.children, showGroupOrg);
                        }
                    }
                }

                function onEnterpriseChange(enterprise) {
                    loadOrgTypes('');
                    self.orgType = '';

                    if (!enterprise) {
                        enterprise = { eid: "" };
                    }
                    self.current = null;
                    self.editEntity = null;
                    self.members = null;
                    self.members2 = null;
                    utils.async("get", "base/organization", {
                        "eid": enterprise.eid,
                        "count": 9999
                    }).then(function(res) {
                        res.data.body.items.forEach(function(item) {
                            item.ttype = item.type;
                            item.tuid = item.uid;
                            item.parent = item.pid; //父节点id
                            item.uid = item.oid; //本身id
                        });
                        self.tempitems = angular.copy(res.data.body.items); //备份整理
                        self.orgtypechanged();
                    }, function(error) {
                        //toastr.warning(error.message);
                    });
                }
                onEnterpriseChange();

                //重新加载当前树
                function reloadOrgTrees(eid, selectedOid, selectedPath) {
                    self.current = null;
                    self.editEntity = null;
                    self.members = null;
                    self.members2 = null;
                    utils.async("get", "base/organization", {
                        "eid": eid,
                        "count": 9999
                    }).then(function(res) {
                        var isLocated = (selectedOid != null && selectedOid != undefined && selectedPath != null && selectedPath != undefined);
                        res.data.body.items.forEach(function(item) {
                            item.selected = ((isLocated) && (item.oid == selectedOid) && (item.path == selectedPath));
                            item.ttype = item.type;
                            item.tuid = item.uid;
                            item.parent = item.pid;
                            item.uid = item.oid;
                        });
                        self.tempitems = angular.copy(res.data.body.items); //备份整理
                        self.orgtypechanged();
                    }, function(error) {
                        //toastr.warning(error.message);
                    });
                }


                function loadEnterprise() {
                    if ($rootScope.myEnterprise) {
                        self.showEnterpriseName = $rootScope.myEnterprise.cname;
                        self.selectedEnterprise = $rootScope.myEnterprise;
                        self.enterpriseNode = angular.copy($rootScope.myEnterpriseNode);
                    } else {
                        utils.async("get", "base/enterprise/getenterprises").then(function(res) {
                            res.data.body.Enterprises.forEach(function(item) {
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
                            self.enterpriseNode = { "children": menus, isRoot: true };
                            $rootScope.myEnterpriseNode = angular.copy(self.enterpriseNode);
                        }, function(error) {
                            //toastr.warning(error.message);
                        });
                    }
                }
                loadEnterprise();

                function deleteByNodes(nodes, current) {
                    for (var i = 0; i < nodes.length; i++) {
                        var item = nodes[i];
                        if (item == current) {
                            nodes.splice(i, 1);
                            return true;
                        } else if (item.children) {
                            if (deleteByNodes(item.children, current)) {
                                return true;
                            }
                        }
                    }
                }

                function editOrganization(model, mode) {
                    ngDialog.open({
                        template: "plugins/base/pages/organization.edit.html",
                        className: "ngdialog-theme-default ngdialog-theme-custom my-organization-edit",
                        controller: function($scope) {
                            $scope.isGroupTypes = self.isGroupTypes;
                            $scope.types = self.types;
                            $scope.enableTypes = [{ value: true, name: "启用" }, { value: false, name: "停用" }];
                            if (!model.uid) {
                                model.enable = true;
                            }
                            $scope.model = angular.copy(model);

                            $scope.save = function(form) {
                                if ($scope.model.name == '' || $scope.model.name == null || $scope.model.name == undefined) {
                                    toastr.warning("组织名称不能为空");
                                    return false;
                                }
                                // if ($scope.model.showid == '' || $scope.model.showid == null || $scope.model.showid == undefined) {
                                //     toastr.warning("组织编号不能为空");
                                //     return false;
                                // }

                                if ($scope.model.name) {
                                    var errorback = angular.copy($scope.model);
                                    var method = $scope.model.uid ? "put" : "post";
                                    delete $scope.model.parentNode;
                                    delete $scope.model.parentName;
                                    delete $scope.model.children;
                                    delete $scope.model.parent;
                                    delete $scope.model.selected;
                                    delete $scope.model.tuid;
                                    delete $scope.model.ttype;
                                    $scope.model.eid = self.selectedEnterprise.eid;
                                    $scope.model.type = self.orgType;

                                    $scope.model.puid = '';
                                    if (mode == "addRoot") {
                                        //
                                    } else if (mode == "addChildren") {
                                        if (!self.current.children) {
                                            self.current.children = [];
                                        }
                                        $scope.model.puid = self.current.buid;
                                        $scope.model.ppath = self.current.path;
                                    }

                                    utils.async(method, "base/organization" + (method == "put" ? "/" + $scope.model.uid : ""), $scope.model)
                                        .then(function(res) {
                                                var item = res.data.body;
                                                item.ttype = item.type;
                                                item.tuid = item.uid;
                                                item.uid = item.oid;
                                                item.parent = item.pid;
                                                self.tempitems.push(item);

                                                var newitem = angular.copy(item);
                                                newitem.uid = newitem.tuid;
                                                if (mode == "addRoot") {
                                                    loadOrgTypes(item.type); //切换类型到这个根组织  
                                                    reloadOrgTrees(item.eid, item.oid, item.oid); //重新加载根组织 
                                                    toastr.success('新增根组织成功!');
                                                } else if (mode == "addChildren") {
                                                    // newitem.parentNode = self.current;
                                                    // self.current.children.push(newitem);
                                                    var eid = self.current.eid,
                                                        oid = self.current.oid,
                                                        path = self.current.path;
                                                    reloadOrgTrees(eid, oid, path);
                                                    loadRelation(oid);
                                                    toastr.success('新增下级组织成功!');
                                                } else if (mode == "edit") {
                                                    // self.current.name = newitem.name;
                                                    var eid = self.current.eid,
                                                        oid = self.current.oid,
                                                        path = self.current.path;
                                                    reloadOrgTrees(eid, oid, path);
                                                    loadRelation(oid);
                                                    toastr.success('保存成功!');
                                                }
                                                ngDialog.closeAll();
                                            },
                                            function(error) {
                                                $scope.model = errorback;
                                            }
                                        );
                                } else {
                                    toastr.warning("名称不能为空");
                                }
                            }
                        }
                    });
                }

                //打开组织树
                self.openOrgTree = function(addtype) {
                    ngDialog.open({
                        template: 'plugins/base/pages/tree.selector.html',
                        controller: function($scope) {
                                var me = $scope;
                                var eid = self.selectedEnterprise ? self.selectedEnterprise.eid : "";
                                me.showtype = true;
                                me.showGroupOrg = true;
                                //加载组织类型 
                                function loadorytypes() {
                                    utils.async("get", "base/organization/getroots", {
                                        "eid": eid
                                    }).then(function(res) {
                                        var types = [];
                                        res.data.body.forEach(function(item) {
                                            types.push({
                                                "name": item.name,
                                                "value": item.value
                                            });
                                        });
                                        me.types = types;
                                        if (me.types.length > 0)
                                            me.orgType = me.types[0].value;
                                        else
                                            me.orgType = '';
                                        me.action.orgtypechanged();
                                    }, function(error) {
                                        //toastr.warning(error.message);
                                    });
                                }

                                //加载所有的组织
                                function loadallorgs() {
                                    utils.async("get", "base/organization", {
                                        "eid": eid,
                                        "enable$eq": true,
                                        "count": 9999
                                    }).then(function(res) {
                                        res.data.body.items.forEach(function(item) {
                                            item.ttype = item.type;
                                            item.tuid = item.uid;
                                            item.parent = item.pid; //父节点id
                                            item.uid = item.oid; //本身id
                                        });
                                        me.tempitems = angular.copy(res.data.body.items); //备份整理
                                        loadorytypes();
                                    }, function(error) {
                                        //toastr.warning(error.message);
                                    });
                                }
                                loadallorgs();
                                //

                                $scope.title = "选择组织";
                                $scope.multiple = false;
                                $scope.showConfirm = false;

                                $scope.action = {
                                    onSelect: function(organization) {
                                        var org = organization;
                                        var obj = new Object();

                                        if (addtype == 'parent') { //新增上级
                                            obj.oid = self.current.oid;
                                            obj.ppath = org.path;
                                            obj.pid = org.oid;
                                            obj.type = org.type;
                                            obj.eid = org.eid;
                                        } else { //新增下级
                                            obj.oid = org.oid;
                                            obj.ppath = self.current.path;
                                            obj.pid = self.current.oid;
                                            obj.type = self.current.type;
                                            obj.eid = self.current.eid;
                                        }

                                        utils.async("post", "base/organization/relation", obj).then(function(res) {
                                            var oid = self.current.oid;
                                            var eid = self.current.eid;
                                            var path = self.current.path;
                                            reloadOrgTrees(eid, oid, path);
                                            loadRelation(oid);        
                                            me.closeThisDialog();
                                        }, function(error) {
                                           // toastr.warning(error.message);
                                        });

                                    },
                                    orgtypechanged: function(context) {
                                        context = context || { showGroupOrg: true };
                                        var type = me.orgType;
                                        if (context.orgType != undefined)
                                            type = context.orgType;
                                        var items = angular.copy(me.tempitems);
                                        var newitems = [];

                                        //过滤                     
                                        if (type != undefined && type != null && type != '') {
                                            items.forEach(function(item) {
                                                var ttype = item.ttype + ",";
                                                if ((ttype.indexOf(type) > -1))
                                                    newitems.push(item);
                                            });
                                        } else {
                                            newitems = angular.copy(items);
                                        }

                                        //过滤后重组树 
                                        function getParentId(node) {
                                            var result = "";
                                            if (node.parent == '')
                                                return result;
                                            var vitems = angular.copy(newitems);
                                            vitems.forEach(function(item) {
                                                if (item.uid == node.parent) {
                                                    if (!item.isGroup) {
                                                        result = item.uid;
                                                        return result;
                                                    } else {
                                                        getParentId(item.uid);
                                                    }
                                                }
                                            });
                                            return result;
                                        }

                                        function setChildrenPid(node) {
                                            var pid = node.uid;
                                            newitems.forEach(function(item) {
                                                if (item.parent == pid) {
                                                    item.parent = node.vuid;
                                                }
                                            });
                                        }

                                        if (!context.showGroupOrg) {
                                            for (var i = 0; i < newitems.length; i++) {
                                                var item = newitems[i];
                                                if (item.isGroup) {
                                                    item.deleted = true;
                                                    var pid = getParentId(item);
                                                    item.vuid = pid;
                                                    setChildrenPid(item);
                                                } else {
                                                    item.deleted = false;
                                                }
                                            }
                                        }

                                        var realitems = [];
                                        newitems.forEach(function(item) {
                                            if (!item.deleted) {
                                                realitems.push(item);
                                            }
                                        });

                                        //构造树  
                                        var menus = utils.setIteration("", realitems);
                                        realitems.forEach(function(item) {
                                            item.uid = item.tuid;
                                            item.type = item.ttype;
                                        });

                                        items.forEach(function(item) {
                                            item.uid = item.tuid;
                                            item.type = item.ttype;
                                        });
                                        me.node = { "children": menus, isRoot: true };
                                    }
                                }
                            } //controller
                    });
                }

                function loadDetail() {
                    utils.async("get", "base/organization/positions", {
                        "count": 999,
                        "oid": self.current.oid,
                        "path": self.current.path,
                        "eid": self.selectedEnterprise.eid,
                        "rootpid": self.current.type
                    }).then(function(res) {
                        self.members = res.data.body;
                    }, function(error) {});
                }

                function loadDetailPost() {
                    utils.async("get", "base/organization/posts", {
                        "count": 999,
                        "oid": self.current.oid,
                        "path": self.current.path,
                        "eid": self.selectedEnterprise.eid,
                        "rootpid": self.current.type
                    }).then(function(res) {
                        self.members2 = res.data.body;
                    }, function(error) {
                        //toastr.warning(error.message);
                    });
                }

                function loadRelation(oid) { // 所属上级组织
                    self.relations = [];
                    utils.async("get", "base/organization/parentinfo", {
                        "count": 999,
                        "oid": oid,
                        "eid": self.selectedEnterprise.eid
                    }).then(function(res) {
                        self.relations = res.data.body;
                    }, function(error) {
                        //toastr.warning(error.message);
                    });
                }


                //删除关系
                self.deleteRelation = function(relation) {
                    var relations = self.relations;

                    //1.仅有一个关系不可删除
                    if (relations.length == 1) {
                        toastr.warning('该组织关系目前仅有一个，请直接删除该组织节点!');
                        return false;
                    }

                    //2.提示是否要删除
                    dialog.confirm('确定删除该组织关系?').then(function() {
                        var parmas = "eid=" + self.current.eid + "&oid=" + relation.oid + "&path=" + relation.path;
                        var deletethis = (relation.path == self.current.path);
                        var eid = self.selectedEnterprise.eid;
                        var oid = self.current.oid;
                        var path = self.current.path;
                        utils.async("DELETE", "base/organization?" + parmas).
                        then(function(res) {
                                if (deletethis) {
                                    reloadOrgTrees(eid, null, null);
                                    self.relations = [];
                                } else {
                                    reloadOrgTrees(eid, oid, path);
                                    loadRelation(oid);
                                }
                                toastr.success('删除组织关系成功!');
                            },
                            function(error) {
                                toastr.warning(error.message);
                            }
                        );
                    });

                };


                function editMember(model, type) {
                    ngDialog.open({
                        template: "plugins/base/pages/position.edit.html",
                        controller: function($scope) {
                            $scope.type = type;
                            if (!model.uid) {
                                model.enable = true;
                            }
                            $scope.model = angular.copy(model);
                            $scope.save = function(form) {
                                if ($scope.model.pid == undefined || $scope.model.pid == null || $scope.model.pid == '') {
                                    toastr.warning("编号不能为空");
                                    return false;
                                }
                                if ($scope.model.name) {
                                    var errorback = angular.copy($scope.model);
                                    var method = $scope.model.uid ? "put" : "post";
                                    if (self.members && self.members.length > 0) {
                                        $scope.model.seq = 1 + self.members[self.members.length - 1].seq;
                                    } else {
                                        $scope.model.seq = 1;
                                    } //初始化seq
                                    $scope.model.eid = self.selectedEnterprise.eid;
                                    $scope.model.rootpid = self.current.type;
                                    utils.async(method, "base/" + ("post" == type ? "post" : "position") + (method == "put" ? "/" + $scope.model.uid : ""), $scope.model)
                                        .then(function(res) {
                                                if ("post" == type) {
                                                    loadDetailPost();
                                                } else {
                                                    loadDetail();
                                                }
                                                ngDialog.closeAll();
                                            },
                                            function(error) {
                                                $scope.model = errorback;
                                                //toastr.warning(error.message);
                                            }
                                        );
                                } else {
                                    toastr.warning("名称不能为空");
                                }
                            }
                        }
                    });
                }

                self.action = {
                    addSelectOrg: function() {

                    },
                    orgSearchKeyUp: function(e) {
                        var keycode = window.event ? e.keyCode : e.which;
                        if (keycode == 13) {
                            self.orgtypechanged();
                        }
                    },
                    searchOrg: function() {
                        self.orgtypechanged();
                    },
                    resetOrg: function() {
                        self.orgName = "";
                        self.orgType = "";
                        self.showGroupOrg = true;
                        self.orgtypechanged();
                    },
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
                    selectOrganization: function(organization) { //选中组织 
                        self.current = organization;
                        self.editEntity = angular.copy(organization);
                        self.editEntity.isGroup = self.editEntity.isGroup;
                        if (self.editEntity.parentNode && self.editEntity.parentNode.name) {
                            self.editEntity.parentName = self.editEntity.parentNode.name;
                        } else {
                            self.editEntity.parentName = "无"
                        }
                        loadDetail();
                        loadDetailPost();
                        loadRelation(self.current.oid);
                    },

                    saveOrganization: function() {
                        if ($scope.editEntity.name) {
                            if ($scope.editEntity.tuid) {
                                $scope.editEntity.uid = $scope.editEntity.tuid;
                            }

                            var entity = {
                                "uid": $scope.editEntity.uid,
                                "created": $scope.editEntity.created,
                                "updated": $scope.editEntity.updated,
                                "eid": $scope.editEntity.eid,
                                "oid": $scope.editEntity.oid,
                                "showid": $scope.editEntity.showid,
                                "name": $scope.editEntity.name,
                                "pid": $scope.editEntity.pid,
                                // "path": $scope.editEntity.path,
                                // "seq": $scope.editEntity.seq,
                                "memo": $scope.editEntity.memo,
                                "enable": $scope.editEntity.enable,
                                "py": $scope.editEntity.py,
                                "isGroup": $scope.editEntity.isGroup,
                                "abbreviated": $scope.editEntity.abbreviated
                            };
                            utils.async("PUT", "base/organization/" + $scope.editEntity.uid, entity)
                                .then(function(res) {
                                        // var item = res.data.body;
                                        // //self.current.type = item.type;
                                        // self.current.name = item.name;
                                        // self.current.memo = item.memo;
                                        // self.current.enable = item.enable;
                                        // self.current.isGroup = item.isGroup;
                                        // self.current.abbreviated = item.abbreviated;
                                        // self.current.py = item.py;
                                        // //遍历所有节点改变名称 TODO
                                        var eid = self.current.eid;
                                        var oid = self.current.oid;
                                        var path = self.current.path;
                                        reloadOrgTrees(eid, oid, path);
                                        loadRelation(oid);
                                        toastr.success('保存成功!');
                                    },
                                    function(error) {
                                        //toastr.warning(error.message);
                                    }
                                );
                        } else {
                            toastr.warning("名称不能为空");
                        }
                    },
                    addRoot: function() {
                        editOrganization({
                            "pid": "",
                            "parentName": "无",
                            "type": {},
                            "isGroup": "false"
                        }, "addRoot");
                    },
                    addChildren: function() {
                        editOrganization({
                            "pid": self.current.oid,
                            "parentName": self.current.name,
                            "type": {},
                            "isGroup": "false"
                        }, "addChildren");
                    },
                    delOrganization: function() {
//                  	console.info(self.current);
                        dialog.confirm('确定删除该条记录?').then(function() {
                            var parmas = "eid=" + self.current.eid + "&uid=" + self.current.uid + "&oid=" + self.current.oid + "&path=" + self.current.path;
                            utils.async("DELETE", "base/organization?" + parmas)
                                .then(function(res) {
                                		if(!self.current.parent) {
                                			loadOrgTypes();
                                			reloadOrgTrees();
                                		}
                                        deleteByNodes(self.node.children, self.current);
                                        if(self.current){
	                                        reloadOrgTrees(self.current.eid);
                                        }
                                        self.current = null;
                                    },
                                    function(error) {
                                        //toastr.warning(error.message);
                                    }
                                );
                        });
                    },
                    addMember: function() {
                        editMember({ "oid": self.current.oid });
                    },
                    editMember: function(member) {
                        editMember(member);
                    },
                    removeMember: function(member) {
                        dialog.confirm('确定删除该条记录?').then(function() {
                            utils.async("DELETE", "base/position/" + member.uid)
                                .then(function(res) {
                                        loadDetail();
                                    },
                                    function(error) {
                                        //toastr.warning(error.message);
                                    }
                                );
                        });
                    },
                    addMemberPost: function() {
                        editMember({ "oid": self.current.oid }, "post");
                    },
                    editMemberPost: function(member) {
                        editMember(member, "post");
                    },
                    removeMemberPost: function(member) {
                        dialog.confirm('确定删除该条记录?').then(function() {
                            utils.async("DELETE", "base/post/" + member.uid)
                                .then(function(res) {
                                        loadDetailPost();
                                    },
                                    function(error) {
                                        //toastr.warning(error.message);
                                    }
                                );
                        });
                    }
                }

            }
        ]);
});
