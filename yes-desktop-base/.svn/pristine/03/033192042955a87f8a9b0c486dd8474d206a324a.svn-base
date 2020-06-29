/* global angular */
define(['plugins/base/pages/person.config',
        'plugins/base/directives/tree.organization'
    ],
    function(config, context) {
        "use strict";
        angular.module('app')
            .controller('app.base.person',
                function($scope, $timeout, $rootScope, $translate,
                    interpreter, settings, utils, ngDialog, dialog, toastr, path) {
                    var self = $scope;

					/**
	                 * 高度自适应
	                 */
	                $timeout(function  () {
	                	var height = document.documentElement.clientHeight
		    			document.getElementById("myCon").style.height = height-210+"px"; 
		                document.getElementById("ui-grid").style.height = height-209+"px"; 
	                },200);
	                

                    /**
                     * 视图初始化
                     * 仅在加载的时候执行一次
                     * 只能调用方法,不要在里面直接赋值
                     */
                    self.init = function() {
                        self.binds(); //绑定数据到模版
                        self.loadConfig(); //加载配置
                        loadEnterprise();
                    };
                    self.showGroupOrg = true;

                    self.getShow = function() {
                        if (self.form.model == undefined)
                            return false;
                        var model = angular.copy(self.form.model);
                        if (model.uid == undefined || model.uid == null || model.uid == '') {
                            return true;
                        }
                        return false;
                    }

                    function loadTypes() {
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
                            if (self.types.length > 0)
                                self.orgType = self.types[0].value;
                            else
                                self.orgType = '';
                        }, function(error) {
                            //toastr.warning(error.message);
                        });
                    }
                    loadTypes();

                    function loadEnterprise() {
                        if ($rootScope.myEnterprise) {
                            self.showEnterpriseName = $rootScope.myEnterprise.cname;
                            self.selectedEnterprise = $rootScope.myEnterprise;
                            self.enterpriseNode = angular.copy($rootScope.myEnterpriseNode);
                        } else {
                            utils.async("get", "base/enterprise/getenterprises").then(function(res) {
                                $rootScope.enterpriseTitleMap = [];
                                $rootScope.alleids = ',';
                                res.data.body.Enterprises.forEach(function(item) {
                                    if (item.eid == res.data.body.eid) {
                                        $rootScope.myEnterprise = item;
                                        self.showEnterpriseName = item.cname;
                                        self.selectedEnterprise = item;
                                    }
                                    item.name = item.cname;
                                    item.parent = item.pid;
                                    item.uid = item.no;
                                    $rootScope.enterpriseTitleMap.push({ name: item.cname, value: item.eid });
                                    $rootScope.alleids += item.eid + ',';
                                });
                                var menus = utils.setIteration("", res.data.body.Enterprises);
                                self.enterpriseNode = { "children": menus, isRoot: true };
                                $rootScope.myEnterpriseNode = angular.copy(self.enterpriseNode);
                            }, function(error) {
                                //toastr.warning(error.message);
                            });
                        }
                    }

                    /**
                     * 视图卸载的时候会执行一次
                     */
                    self.destroy = function() {

                    };

                    /**
                     * 获取组织
                     */
                    function getOrganizations(eid) {
                        utils.async("get", "base/organization", {
                            "count": 999,
                            "eid": eid,
                            "enable$eq": true
                        }).then(function(res) {
                            var titleMap = [];
                            res.data.body.items.forEach(function(item) {
                                titleMap.push({
                                    name: item.name,
                                    value: item.oid
                                });
                            });
                            $rootScope.organizationTitleMap = titleMap;
                        });
                    }

                    self.showTd = function(ident) {
                        if (ident == undefined || ident == null)
                            return false;
                        if (ident.eid == undefined || ident.eid == null || ident.eid == '')
                            return true;
                        var str = '';
                        str += $rootScope.alleids
                        if (str.indexOf(',' + ident.eid + ',') > -1)
                            return true;

                        return false;
                    }

                    /**
                     * 数据加载或者刷新
                     * 数据会根据 self.filter 的变化自动变化,如分页,查询字段等.
                     */
                    self.load = function() {
                        if (self.current) {
                            //self.filter.oid$eq = self.current.oid;
                            self.filter.path = self.current.path;
                        } else {
                            delete self.filter.oid$eq;
                        }
                        if (self.selectedEnterprise) {
                            self.filter.eid = self.selectedEnterprise.eid;
                        }
                        delete self.filter.type$eq;

                        utils.async("GET", "base/person", self.filter).then(function(res) {
                            self.entries = res.data.body.items;
                            self.list.gridOptions.totalItems = res.data.body.count;
                            self.list.pagination.totalItems = res.data.body.count; //自定义的分页
                        });
                    };


                    //清空企业
                    function clearEid(identity) {
                        identity.org = null;
                        identity.oid = null;
                        identity.oName = null;
                        identity.path = null;
                        identity.roottype = null;
                        identity.positionId = null;
                        identity.positionName = null;
                        identity.type = null;
                        identity.types = [];
                        identity.organizations = [];
                        identity.positions = [];
                        identity.posts = [];
                        identity.postss = [];
                    }

                    function clearOrg(identity) {
                        identity.positionId = null;
                        identity.positionName = null;
                        identity.positions = [];
                        identity.posts = [];
                        identity.postss = [];
                    }


                    function getFirstOid(path) {
                        if (path == undefined || path == null || path == '') {
                            return '';
                        }
                        var index = path.indexOf('.');
                        if (index > -1) {
                            return path.substring(0, index);
                        }
                        return path;
                    }

                    function getOrgs(identity) {
                        var roottype = getFirstOid(identity.path);
                        identity.roottype = roottype; //所属根节点的type
                        var oid = identity.oid,
                            name = identity.oName,
                            path = identity.path;
                        identity.org = { value: oid, name: name, path: path, type: roottype };

                        utils.async("get", "base/organization", {
                            "count": 9999,
                            "eid": identity.eid,
                            "type$eq": roottype,
                            "enable$eq": true
                        }).then(function(res) {
                            var titleMap = [];
                            res.data.body.items.forEach(function(item) {
                                titleMap.push({
                                    name: item.name,
                                    value: item.oid,
                                    path: item.path,
                                    type: item.type
                                });
                            });
                            identity.organizations = titleMap;
                        });
                    }

                    function getPositions(identity) {
                        utils.async("get", "base/position/parentpositions", {
                            "count": 999,
                            "enable": true,
                            "oid": identity.oid,
                            "path": identity.path,
                            "rootpid": identity.roottype,
                            "eid": identity.eid
                        }).then(function(res) {
                            var titleMap = [];
                            res.data.body.forEach(function(item) {
                                titleMap.push({ "name": item.name, "value": item.pid });
                            });
                            identity.positions = titleMap;
                        }, function(error) {
                            //toastr.warning(error.message);
                        });
                    }

                    function getPosts(identity) {
                        var roottype = getFirstOid(identity.path);
                        utils.async("get", "base/post/parentposts", {
                            "count": 999,
                            "enable": true,
                            "oid": identity.oid,
                            "path": identity.path,
                            "rootpid": roottype,
                            "eid": identity.eid
                        }).then(function(res) {
                            var titleMap = [];
                            res.data.body.forEach(function(item) {
                                titleMap.push({ "name": item.name, "id": item.pid });
                            });
                            identity.postss = titleMap;
                        }, function(error) {
                            //toastr.warning(error.message);
                        });
                    }

                    function getTypes(identity) { //身份类型
                        //加载type类型
                        utils.async("get", "base/dicdetail/detail", {
                            "type": "ENT",
                            "id": "IDENTITYTYPE",
                            "eid": identity.eid,
                            "count": 999
                        }).then(function(res) {
                            var types = [];
                            res.data.body.items.forEach(function(item) {
                                types.push({
                                    "name": item.value,
                                    "value": item.id
                                });
                            });
                            identity.types = types;
                            var showtype = '';
                            if (types.length > 0 && identity.type != null && identity.type != undefined && identity.type != '') {
                                for (var i = 0; i < types.length; i++) {
                                    if (types[i].value == identity.type) {
                                        showtype = types[i].name;
                                        break;
                                    }
                                }
                            }
                            identity.showtype = showtype;
                            // showtype

                        }, function(error) {
                            //toastr.warning(error.message);
                        });
                    }
                    /**
                     * 加载详情页面
                     * @param data 列表中单条的实体数据
                     */
                    self.loadDetail = function(data) {
                        self.showisMain = true;
                        self.identitys = [];
                        loadents();
                        if (data && data.entity) {
                            self.form.model = data.entity;
                            loadPersonOrgs(data.entity.pid);
                            utils.async("get", "base/identity/" + self.form.model.pid)
                                .then(function(res) {
                                    self.identitys = [];
                                    res.data.body.forEach(function(item) {
                                        self.identitys.push(item);
                                    });

                                    self.identitys.forEach(function(identity) {
                                        if (identity.isMain)
                                            identity.isMain = "true";
                                        if (identity.posts == undefined || identity.posts == null) {
                                            identity.posts = [];
                                        }
                                        //组织
                                        getOrgs(identity);
                                        //职位
                                        getPositions(identity);
                                        //岗位
                                        getPosts(identity);
                                        //身份类型
                                        getTypes(identity);
                                    });
                                }, function(error) {
                                    //toastr.warning(error.message);
                                });
                        } else { //新增
                            self.form.model = {};
                            self.identitys = [];
                            self.identorgs = [];
                        }
                        self.detailUrl = 'plugins/base/pages/person.detail.html';
                    };

                    //加载企业
                    function loadents() {
                        self.ents = [];
                        if ($rootScope.enterpriseTitleMap == undefined || $rootScope.enterpriseTitleMap == null || $rootScope.enterpriseTitleMap.length == 0) {
                            utils.async("get", "base/enterprise/getenterprises").then(function(res) {
                                res.data.body.Enterprises.forEach(function(item) {
                                    self.ents.push({ name: item.cname, value: item.eid });
                                });
                            }, function(error) {
                                //toastr.warning(error.message);
                            });
                        } else {
                            self.ents = $rootScope.enterpriseTitleMap;
                        }

                    }

                    //人员所属组织
                    function loadPersonOrgs(pid) {
                        self.identorgs = [];
                        utils.async("get", "base/person/getorgs?pid=" + pid)
                            .then(function(res) {
                                self.identorgs = res.data.body;
                            }, function(err) {

                            });
                    }

                    function loadDicDetail() {
                        //加载type类型
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

                    /**
                     * 卸载详情页面
                     */
                    self.unloadDetail = function() {
                        self.detailUrl = null;
                    };

                    //组织类型改变
                    self.orgtypechanged = function() { //TODO
                        var type = self.orgType;
                        var items = angular.copy(self.tempitems);
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

                        items.forEach(function(item) {
                            item.uid = item.tuid;
                            item.type = item.ttype;
                        });
                        self.node = { "children": menus, isRoot: true };
                    }


                    function onEnterpriseChange(enterprise) {
                        loadTypes();
                        if (!enterprise) {
                            enterprise = { eid: "" };
                        }
                        self.current = null;
                        utils.async("get", "base/organization", {
                            "enable$eq": true,
                            "eid": enterprise.eid,
                            "count": 9999
                        }).then(function(res) {
                            res.data.body.items.forEach(function(item) {
                                item.ttype = item.type;
                                item.tuid = item.uid;
                                item.parent = item.pid;
                                item.uid = item.oid;
                            });
                            self.tempitems = angular.copy(res.data.body.items); //备份整理
                            self.orgtypechanged();
                            self.load();
                            //TODO 查询人员

                            var titleMap = [];
                            res.data.body.items.forEach(function(item) {
                                titleMap.push({
                                    name: item.name,
                                    value: item.oid
                                });
                            });
                            $rootScope.organizationTitleMap = titleMap;
                            $rootScope.node = angular.copy(self.node);
                        }, function(error) {
                            //toastr.warning(error.message);
                        });
                        if (loadother) {
                            self.load();
                        }
                    }

                    var loadother = false;

                    self.binds = function() {
                        onEnterpriseChange();
                        loadother = true;
                        self.enables = [{
                            name: "启用",
                            value: true
                        }, {
                            name: "禁用",
                            value: false
                        }];

                        //self.events = utils.createEvents();
                        self.title = "";
                        self.filter = {
                            "type$eq": "1"
                        };
                        self.load();
                        self.entries = [];
                        self.list = {
                            gridOptions: { //添加注释,包括未用到的配置项
                                gridMenuTitleFilter: function(title) {
                                    return $translate.instant(title);
                                },
                                data: 'entries',
                                enableGridMenu: true,
                                exporterMenuAllData: false,
                                exporterMenuCsv: true,
                                exporterMenuPdf: false,
                                enablePaginationControls: true,
                                enableFiltering: false,
                                enableRowHeaderSelection: true,
                                exporterOlderExcelCompatibility: true,
                                useExternalPagination: true,
                                onRegisterApi: function(gridApi) {
                                    self.gridApi = gridApi;
                                    gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
                                        self.filter.start = (newPage - 1) * pageSize;
                                        self.filter.count = pageSize;
                                        self.load();
                                    });

                                    gridApi.colResizable.on.columnSizeChanged($scope, function(ar1, ar2) {
                                        var cols = [];
                                        angular.forEach(gridApi.grid.columns, function(column) {
                                            cols.push(column.width);
                                        });
                                        // localStorage.setItem(tag + "_grid", cols);
                                    });

                                    gridApi.core.on.renderingComplete($scope, function(ar1) {
                                        $timeout(function() {
                                            angular.element(window).trigger('resize');
                                        }, 0);
                                    });
                                },
                                paginationPageSizes: [20, 200, 1000],
                                paginationPageSize: 20,
                                virtualizationThreshold: 1000,
                                appScopeProvider: {
                                    onDblClick: function(event, row) {
                                        self.action.edit(event, row);
                                    },
                                    customClick: function(name, row) {
                                        if (angular.isFunction(self[name])) {
                                            scope[name].apply(this, [row.entity]);
                                        }
                                    }
                                },
                                rowTemplate: "<div ng-dblclick=\"grid.appScope.onDblClick($event,row)\" " +
                                    "ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" " +
                                    "class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" " +
                                    "ui-grid-cell ></div>"
                            },
                            columns: [],
                            filters: [],
                            pagination: {
                                pageSize: 20,
                                onPageChange: function(newPage) {
                                    self.filter.start = (newPage - 1) * self.list.pagination.pageSize;
                                    self.filter.count = self.list.pagination.pageSize;
                                    self.load();
                                }
                            }
                        };
                        self.form = {
                            schema: {},
                            form: {},
                            model: {}
                        };


                        //打开组织树
                        self.openOrgTree = function(identity) {
                            ngDialog.open({
                                template: 'plugins/base/pages/tree.selector.html',
                                controller: function($scope) {
                                        var me = $scope;
                                        var eid = identity.eid;
                                        me.showtype = true;
                                        me.showGroupOrg = true;
                                        me.title = "选择组织";
                                        me.multiple = false;
                                        me.showConfirm = true;
                                        me.current = null;

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

                                        $scope.action = {
                                            onSelect: function(organization) {
                                                me.current = organization;
                                            },
                                            confirm: function() {
                                                if (me.current == null) {
                                                    toastr.warning('请选择组织');
                                                    return false;
                                                }
                                                clearOrg(identity);
                                                identity.path = me.current.path;
                                                identity.roottype = me.current.type;
                                                identity.oid = me.current.oid;
                                                identity.oName = me.current.name;
                                                //组织
                                                getOrgs(identity);
                                                //职位
                                                getPositions(identity);
                                                //岗位
                                                getPosts(identity);

                                                ngDialog.closeAll();
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

                        self.action = {
                            resetOrg: function() {
                                self.orgName = "";
                                self.orgType = "";
                                self.showGroupOrg = true;
                                self.orgtypechanged();
                            },
                            dialog: function(identity) {
                                self.openOrgTree(identity);
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
                            getEnterprise: function(identity) {
                                var itemeid = identity.eid;
                                ngDialog.open({
                                    template: 'plugins/base/pages/tree.selector.html',
                                    controller: function($scope) {
                                        $scope.title = "企业列表";
                                        $scope.node = self.enterpriseNode;
                                        $scope.action = {
                                            onSelect: function(enterprise) {
                                                identity.eid = enterprise.eid;
                                                identity.enterpriseName = enterprise.cname;
                                                if (identity.eid != itemeid) {
                                                    clearEid(identity);
                                                    //身份类型
                                                    getTypes(identity);
                                                    //组织 
                                                    getOrgs(identity);
                                                }
                                                $scope.closeThisDialog();
                                            }
                                        }
                                    }
                                });
                            },
                            onDetailEnterpriseChange: function(identity) { //改变企业 
                                clearEid(identity);
                                //身份类型
                                getTypes(identity);
                                //组织 
                                getOrgs(identity);
                            },
                            onDetailOrganizationChange: function(identity) { //改变组织 
                                if (identity.eid == undefined || identity.eid == null || identity.eid == '') {
                                    clearSelect2(identity);
                                    toastr.warning("请先选选择企业!");
                                    return false;
                                }

                                var selected = identity.org;
                                if (selected) {
                                    identity.path = selected.path;
                                    identity.roottype = selected.type;
                                    identity.oid = selected.value;
                                    identity.oName = selected.name;
                                    clearOrg(identity);
                                    getPositions(identity);
                                    getPosts(identity);
                                }
                            },
                            isMainResetOther: function(identity) {
                                self.identitys.forEach(function(item) {
                                    if (item != identity) {
                                        delete item.isMain;
                                    }
                                });
                            },
                            removeIdentity: function(identity) {
                                self.identitys.splice(self.identitys.indexOf(identity), 1);
                            },
                            addIdentity: function() {
                                var identity = new Object();
                                identity.isShow = true;
                                identity.enable = true;
                                identity.eid = self.selectedEnterprise.eid;
                                identity.enterpriseName = self.selectedEnterprise.cname;
                                identity.org = {};

                                clearEid(identity);
                                //组织
                                getOrgs(identity);
                                //职位
                                getPositions(identity);
                                //岗位
                                getPosts(identity);
                                //身份类型
                                getTypes(identity);
                                self.identitys.push(identity);
                            },
                            selectOrganization: function(organization) { //选择部门
                                if (organization == self.current) {
                                    organization.selected = false;
                                    self.current = null;
                                    var typesConfig = path.find(self.list, ['filters', '[name:position]'], []).titleMap = [];
                                    var typesConfig = path.find(self.list, ['filters', '[name:post]'], []).titleMap = [];
                                    delete self.filter.post;
                                    delete self.filter.position;
                                } else {
                                    self.current = organization;
                                    utils.async("get", "base/position/parentpositions", {
                                        "count": 999,
                                        "enable": true,
                                        "oid": self.current.oid,
                                        "path": self.current.path,
                                        "rootpid": self.current.type,
                                        "eid": self.selectedEnterprise.eid
                                    }).then(function(res) {
                                        var temp = [];
                                        res.data.body.forEach(function(item) {
                                            temp.push({
                                                name: item.name,
                                                value: item.pid
                                            });
                                        });
                                        var typesConfig = path.find(self.list, ['filters', '[name:position]'], []).titleMap = temp;
                                    }, function(error) {

                                    });

                                    utils.async("get", "base/post/parentposts", {
                                        "count": 999,
                                        "enable": true,
                                        "oid": self.current.oid,
                                        "path": self.current.path,
                                        "rootpid": self.current.type,
                                        "eid": self.selectedEnterprise.eid
                                    }).then(function(res) {
                                        var temp = [];
                                        res.data.body.forEach(function(item) {
                                            temp.push({
                                                name: item.name,
                                                value: item.pid
                                            });
                                        });
                                        var typesConfig = path.find(self.list, ['filters', '[name:post]'], []).titleMap = temp;
                                    }, function(error) {});

                                }
                                self.load();
                            },
                            add: function(event, data) {
                                self.loadDetail();
                            },
                            edit: function(event, data) {
                                self.loadDetail(data);
                            },
                            save: function(form) {
                                self.$broadcast('schemaFormValidate');
                                if (form.$valid) {
                                    if (!self.identitys.length) {
                                        toastr.warning("请填写身份信息");
                                        return false;
                                    }

                                    var identitysFlag = true;
                                    var identitys = [];
                                    var hasPosition = false,
                                        hasIsMain = false;
                                    for (var i = 0; i < self.identitys.length; i++) {
                                        var iden = self.identitys[i];
                                        if (iden.positionId) {
                                            hasPosition = true;
                                        }
                                        if (iden.isMain) {
                                            hasIsMain = true;
                                        }

                                        if (iden.positionId == null && iden.posts.length == 0) {
                                            toastr.warning("身份信息的职务/岗位请至少选其中一个!");
                                            return false;
                                        } else {
                                            var sendData = angular.copy(iden);
                                            delete sendData.positions;
                                            delete sendData.postss;
                                            delete sendData.organizations;
                                            delete sendData.types;
                                            delete sendData.roottype;
                                            delete sendData.org;
                                            if (sendData.showtype != undefined)
                                                delete sendData.showtype;
                                            sendData.seq = 1 + i;
                                            sendData.pid = self.form.model.pid;
                                            identitys.push(sendData);
                                        }
                                    }
                                    if (!hasPosition) {
                                        toastr.warning("至少得选择一个职务");
                                        return false;
                                    }
                                    if (!hasIsMain) {
                                        toastr.warning("必须选择一个主身份");
                                        return false;
                                    }

                                    if (iden.startDate == undefined || iden.startDate == null || iden.startDate == '') {
                                        toastr.warning("身份生效日期不可为空!");
                                        return false;
                                    }

                                    var namespace = ["base", "person"].join("/");
                                    var method = self.form.model.uid ? "put" : "post";
                                    if (method == "put") {
                                        namespace = [namespace, self.form.model.uid].join("/");
                                        delete self.form.model['new'];
                                    }

                                    if (self.form.model) {
                                        for (var k in self.form.model) {
                                            if (self.form.model.hasOwnProperty(k) && angular.isDate(self.form.model[k])) {
                                                self.form.model[k] = moment(self.form.model[k]).format("YYYY-MM-DD HH:mm:ss");
                                            }
                                        }
                                    }

                                    //self.events.trigger("beforeSave", self.form);
                                    var model = angular.copy(self.form.model);
                                    model.eid = self.selectedEnterprise.eid;
                                    utils.async(method, namespace, {
                                        "person": model,
                                        "identitys": identitys
                                    }).then(function(res) {
                                        self.load();
                                        self.unloadDetail();
                                    }, function(error) {
                                        //toastr.warning(error.message);
                                    });

                                } else {
                                    angular.element('.help-block').addClass('text-right');
                                }
                            },
                            get: function() {
                                var model = angular.copy(self.form.model);
                                if (model.type == '1') {
                                    toastr.warning("员工【类型】请先选为临时");
                                    return false;
                                }

                                utils.async("get", "base/person/gettempno?eid=" + self.selectedEnterprise.eid).then(function(res) {
                                    var tempno = res.data.body;
                                    self.form.model.employeeNo = tempno;
                                });
                            },
                            del: function(event, data) {

                                var rows = self.action.bulk();
                                var loading = 0;
                                if (rows.length) {
                                    dialog.confirm('确定删除该条记录?').then(function() {
                                        angular.forEach(rows, function(row) {

                                            utils.async('delete', "base/person/" + row.uid).then(function(res) {
                                                loading++;
                                                if (loading == rows.length) {
                                                    toastr.success('删除成功！');
                                                    loading = 0;
                                                    self.load();
                                                }
                                            }, function(error) {
                                                self.load();
                                                //toastr.warning(error.message);
                                            });
                                        });
                                    })
                                } else {
                                    toastr.warning('请选中要删除的数据');
                                }

                            },
                            reset: function(event) {
                                angular.forEach(self.filter, function(raw, key) {
                                    if (key != 'count')
                                        delete self.filter[key];
                                });
                            },
                            close: function() {
                                self.unloadDetail();
                            },
                            cancel: function() {},
                            bulk: function() {
                                return self.gridApi.selection.getSelectedRows() || [];
                            }
                        };
                        self.bindEvents();
                    };

                    /**
                     * 绑定事件
                     */
                    self.bindEvents = function() {
                        self.$on('toolbar:add', self.action.add);
                        self.$on('toolbar:edit', self.action.edit);
                        self.$on('toolbar:del', self.action.del);
                    };

                    /**
                     * 加载配置项
                     * 配置项目包括描述本视图页面的所有配置内容;
                     * 节点包含 title, list, detail 的配置信息;
                     */
                    self.loadConfig = function() {
                        var cfg = interpreter.configuration(self, config);
                        if (cfg.list.headers) {
                            var columns = [];
                            var tag = ["base", "person"].join("/");
                            var colWidth = localStorage.getItem(tag + "_grid") || "";
                            colWidth = colWidth.split(',');
                            var index = 1;
                            angular.forEach(cfg.list.headers, function(col, key) {
                                if (angular.isString(col)) {
                                    col = { name: key, original: col, displayName: col };
                                } else if (angular.isObject(col) && key) {
                                    col.name = key;
                                }
                                if (angular.isUndefined(col.headerCellFilter))
                                    col.headerCellFilter = "translate";

                                if (colWidth.length > index) {
                                    col.width = colWidth[index];

                                }
                                index++;
                                if (col.filter && angular.isFunction(col.filter)) {
                                    col.filter.apply(col, [columns, $rootScope]);
                                } else {
                                    columns.push(col);
                                }
                            });
                            self.list.gridOptions.columnDefs = self.list.columns = columns;
                        }

                        self.list.filters = cfg.list.filters;
                        self.form = cfg.form;
                        self.title = cfg.title;
                        //self.setTools(cfg.operation);
                    };

                    /**
                     * 执行初始化
                     */
                    self.init();
                });
    });
