/* global angular */
define(['plugins/base/pages/application.config',
        'plugins/base/directives/tree.organization'],
    function (config) {
        "use strict";
        angular.module('app')
            .controller('app.base.application',
                function ($scope, $timeout, $rootScope, $translate,
                          interpreter, settings, utils, ngDialog, dialog, toastr, path) {
                    var self = $scope;

					/**
	                 * 高度自适应
	                 */
	                $timeout(function  () {
	                	var height = document.documentElement.clientHeight
		    			document.getElementById("con").style.height = height-210+"px"; 
		                document.getElementById("ui-grid").style.height = height-178+"px"; 
	                },200);

                    $scope.appGroupSortOption = {
                        animation: 100,
                        handle: '.my-handle',
                        onEnd: function (evt) {
                            if (evt.newIndex != null && evt.oldIndex != evt.newIndex) {
                                var end;
                                if (evt.oldIndex > evt.newIndex) {
                                    end = evt.models[evt.newIndex + 1].uid;
                                } else {
                                    end = evt.models[evt.newIndex - 1].uid;
                                }
                                var begin = evt.model.uid;
                                utils.async("put", "base/appGroup/changeLocation", {
                                    "begin": begin,
                                    "end": end,
                                    "eid": evt.model.eid,
                                    "pid": evt.model.pid
                                }).then(function (res) {

                                    },
                                    function (error) {
                                        //toastr.warning(error.message);
                                    }
                                );
                            }
                        }
                    };

                    /**
                     * 视图初始化
                     * 仅在加载的时候执行一次
                     * 只能调用方法,不要在里面直接赋值
                     */
                    self.init = function () {
                        self.binds();  //绑定数据到模版
                        self.loadConfig(); //加载配置
                        loadEnterprise();
                    };

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

                    /**
                     * 视图卸载的时候会执行一次
                     */
                    self.destroy = function () {

                    };

                    /**
                     * 数据加载或者刷新
                     * 数据会根据 self.filter 的变化自动变化,如分页,查询字段等.
                     */
                    self.load = function () {
                        if (self.current) {
                            self.filter.agid$eq = self.current.agid;
                        } else {
                            delete self.filter.agid$eq;
                        }
                        if (self.selectedEnterprise) {
                            self.filter.eid = self.selectedEnterprise.eid;
                        }
                        utils.async("GET", "base/application", self.filter).then(function (res) {
                            res.data.body.items.forEach(function (item) {
                                item.sortable = !!self.current;
                            });
                            self.entries = res.data.body.items;
                            self.list.gridOptions.totalItems = res.data.body.count;
                            self.list.pagination.totalItems = res.data.body.count; //自定义的分页
                        });
                    };

                    /**
                     * 加载详情页面
                     * @param data 列表中单条的实体数据
                     */
                    self.loadDetail = function (data) {
                        self.identitys = [];
                        if (data && data.entity) {
                            self.form.model = data.entity;
                        } else {
                            self.form.model = {};
                        }
                        var titleMap = [];
                        var walkChildren = function (tree) {
                            angular.forEach(tree, function (node) {
                                titleMap.push({
                                    name: node.name,
                                    value: node.agid
                                });
                                if (node.children) {
                                    walkChildren(node.children);
                                }
                            });
                        };
                        walkChildren($rootScope.appGroups.children);
                        var typesConfig = path.find(self.form,
                            ['form', '[title:主要信息]', 'items', '[key:groups]'], []);
                        typesConfig.titleMap = titleMap;
                        self.detailUrl = 'plugins/base/pages/application.detail.html';
                    };

                    /**
                     * 卸载详情页面
                     */
                    self.unloadDetail = function () {
                        self.detailUrl = null;
                    };

                    function onEnterpriseChange(enterprise) {
                        if (!enterprise) {
                            enterprise = {eid: ""};
                        }
                        self.current = null;

                        utils.async("get", "base/appGroup", {
                            "eid": enterprise.eid,
                            "count": 9999
                        }).then(function (res) {
                            res.data.body.items.forEach(function (item) {
                                item.tuid = item.uid;
                                item.parent = item.pid;
                                item.uid = item.agid;
                            })
                            var menus = utils.setIteration("", res.data.body.items);
                            res.data.body.items.forEach(function (item) {
                                item.uid = item.tuid;//方法解析的是uid,所以方法后设回来
                            });
                            self.node = {"children": menus, isRoot: true};

                            $rootScope.appGroups = self.node;
                        }, function (error) {
                            //toastr.warning(error.message);
                        });

                        if (loadother) {
                            self.load();
                        }
                    }

                    var loadother = false;

                    self.binds = function () {
                        onEnterpriseChange();
                        loadother = true;
                        self.enables = [
                            {
                                name: "启用",
                                value: true
                            },
                            {
                                name: "禁用",
                                value: false
                            }];

                        //self.events = utils.createEvents();
                        self.title = "";
                        self.filter = {"count": 9999};
                        self.load();
                        self.entries = [];
                        self.list = {
                            gridOptions: { //添加注释,包括未用到的配置项
                                gridMenuTitleFilter: function (title) {
                                    return $translate.instant(title);
                                },
                                data: 'entries',
                                enableGridMenu: true,
                                exporterMenuAllData: false,
                                exporterMenuCsv: true,
                                exporterMenuPdf: false,
                                enablePaginationControls: false,
                                enableFiltering: false,
                                enableRowHeaderSelection: true,
                                exporterOlderExcelCompatibility: true,
                                useExternalPagination: false,
                                sortable: {
                                    animation: 100,
                                    handle: '.my-handle',
                                    onEnd: function (evt) {
                                        if (self.current) {
                                            if (evt.newIndex != null && evt.oldIndex != evt.newIndex) {
                                                var end;
                                                if (evt.oldIndex > evt.newIndex) {
                                                    end = evt.models[evt.newIndex + 1].entity.uid;
                                                } else {
                                                    end = evt.models[evt.newIndex - 1].entity.uid;
                                                }
                                                var begin = evt.model.entity.uid;
                                                utils.async("put", "base/application/changeLocation", {
                                                    "begin": begin,
                                                    "end": end,
                                                    "eid": evt.model.entity.eid,
                                                    "agid": self.current.agid
                                                }).then(function (res) {

                                                    },
                                                    function (error) {
                                                        //toastr.warning(error.message);
                                                    }
                                                );
                                            }
                                        } else {
                                            toastr.warning("请选择分组!");
                                        }
                                    }
                                },
                                onRegisterApi: function (gridApi) {
                                    self.gridApi = gridApi;
                                    gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                                        self.filter.start = (newPage - 1) * pageSize;
                                        self.filter.count = pageSize;
                                        self.load();
                                    });

                                    gridApi.colResizable.on.columnSizeChanged($scope, function (ar1, ar2) {
                                        var cols = [];
                                        angular.forEach(gridApi.grid.columns, function (column) {
                                            cols.push(column.width);
                                        });
                                        // localStorage.setItem(tag + "_grid", cols);
                                    });

                                    gridApi.core.on.renderingComplete($scope, function (ar1) {
                                        $timeout(function () {
                                            angular.element(window).trigger('resize');
                                        }, 0);
                                    });
                                },
                                paginationPageSizes: [9999],
                                paginationPageSize: 9999,
                                virtualizationThreshold: 1000,
                                appScopeProvider: {
                                    onDblClick: function (event, row) {
                                        self.action.edit(event, row);
                                    },
                                    customClick: function (name, row) {
                                        if (angular.isFunction(self[name])) {
                                            scope[name].apply(this,[row.entity]);
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
                                onPageChange: function (newPage) {
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

                        self.action = {
                            dialog: function (identity) {
                                ngDialog.open(
                                    {
                                        template: 'plugins/base/pages/tree.selector.html',
                                        controller: function ($scope) {
                                            $scope.node = angular.copy(self.node);
                                            $scope.action = {
                                                onSelect: function (organization) {
                                                    if (identity.oid != organization.oid) {
                                                        identity.oid = organization.oid;
                                                        self.action.onDetailOrganizationChange(identity);
                                                    }
                                                    $scope.closeThisDialog();
                                                }
                                            }
                                        }
                                    }
                                );
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
                            selectApplication: function (appGroupMember) {
                                if (appGroupMember == self.current) {
                                    appGroupMember.selected = false;
                                    self.current = null;
                                } else {
                                    self.current = appGroupMember;
                                }
                                self.load();
                            },
                            add: function (event, data) {
                                self.loadDetail();
                            },
                            edit: function (event, data) {
                                self.loadDetail(data);
                            },
                            save: function (form) {

                                self.$broadcast('schemaFormValidate');

                                if (form.$valid) {
                                    if (!self.form.model.groups || self.form.model.groups.length < 1) {
                                        toastr.warning("请选择应用分组!");
                                        return false;
                                    }
                                    var namespace = ["base", "application"].join("/");
                                    var method = self.form.model.uid ? "put" : "post";
                                    if (method == "put") {
                                        namespace = [namespace, self.form.model.uid].join("/");
                                        delete self.form.model['new'];
                                    }

                                    //self.events.trigger("beforeSave", self.form);

                                    var model = angular.copy(self.form.model);

                                    model.eid = self.selectedEnterprise.eid;
                                    delete model.sortable;

                                    utils.async(method, namespace, model).then(function (res) {
                                        self.load();
                                        self.unloadDetail();
                                    }, function (error) {
                                        //toastr.warning(error.message);
                                    });

                                }
                            },
                            del: function (event, data) {

                                var rows = self.action.bulk();
                                var loading = 0;
                                if (rows.length) {
                                    dialog.confirm('确定删除该条记录?').then(function () {
                                        angular.forEach(rows, function (row) {

                                            utils.async('delete', "base/application/" + row.uid).then(function (res) {
                                                loading++;
                                                if (loading == rows.length) {
                                                    toastr.success('删除成功！');
                                                    loading = 0;
                                                    self.load();
                                                }
                                            }, function (error) {
                                                self.load();
                                                //toastr.warning(error.message);
                                            });
                                        });
                                    })
                                }
                                else {
                                    toastr.warning('请选中要删除的数据');
                                }

                            },
                            reset: function (event) {
                                angular.forEach(self.filter, function (raw, key) {
                                    if (key != 'count')
                                        delete self.filter[key];
                                });
                            },
                            close: function () {
                                self.unloadDetail();
                            },
                            cancel: function () {
                                //TODO
                            },
                            bulk: function () {
                                return self.gridApi.selection.getSelectedRows() || [];
                            },
                            addRoot: function () {
                                editAppGroup({"pid": ""}, "addRoot");
                            },
                            addChildren: function () {
                                editAppGroup({
                                    "pid": self.current.agid//,
                                    //"company": self.current.company
                                }, "addChildren");
                            },
                            editAppGroup: function () {
                                editAppGroup(self.current, "edit");
                            },
                            delAppGroup: function () {
                                dialog.confirm('确定删除该条记录?').then(function () {
                                    utils.async("DELETE", "base/appGroup/" + self.current.uid)
                                        .then(function (res) {
                                                deleteByNodes(self.node.children, self.current);
                                                self.current = null;
                                            },
                                            function (error) {
                                                //toastr.warning(error.message);
                                            }
                                        );
                                });
                            }
                        };
                        self.bindEvents();
                    };

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

                    function editAppGroup(model, mode) {
                        ngDialog.open({
                            template: "plugins/base/pages/appgroup.edit.html",
                            controller: function ($scope) {
                                $scope.model = angular.copy(model);
                                $scope.save = function (form) {
                                    if ($scope.model.name) {
                                        var method = $scope.model.uid ? "put" : "post";
                                        delete $scope.model.parentNode;
                                        delete $scope.model.children;
                                        delete $scope.model.parent;
                                        delete $scope.model.selected;
                                        delete $scope.model.tuid;
                                        delete $scope.model.type;
                                        delete $scope.model.showMove;
                                        if (self.selectedEnterprise) {
                                            $scope.model.eid = self.selectedEnterprise.eid;
                                        }
                                        if (mode == "addRoot") {
                                            if (self.node.children && self.node.children.length > 0) {
                                                $scope.model.seq = 1 + self.node.children[self.node.children.length - 1].seq;
                                            } else {
                                                $scope.model.seq = 1;
                                            }
                                        } else if (mode == "addChildren") {
                                            if (!self.current.children) {
                                                self.current.children = [];
                                            }
                                            if (self.current.children.length > 0) {
                                                $scope.model.seq = 1 + self.current.children[self.current.children.length - 1].seq;
                                            } else {
                                                $scope.model.seq = 1;
                                            }
                                        }//初始化seq
                                        utils.async(method, "base/appGroup" + (method == "put" ? "/" + $scope.model.uid : ""), $scope.model)
                                            .then(function (res) {
                                                    //model.company = $scope.model.company;
                                                    var item = res.data.body;
                                                    if (mode == "addRoot") {
                                                        self.node.children.push(item);
                                                    } else if (mode == "addChildren") {
                                                        self.current.children.push(item);
                                                    } else if (mode == "edit") {
                                                        self.current.name = item.name;
                                                    }
                                                    ngDialog.closeAll();
                                                },
                                                function (error) {
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

                    /**
                     * 绑定事件
                     */
                    self.bindEvents = function () {
                        self.$on('toolbar:add', self.action.add);
                        self.$on('toolbar:edit', self.action.edit);
                        self.$on('toolbar:del', self.action.del);
                    };

                    /**
                     * 加载配置项
                     * 配置项目包括描述本视图页面的所有配置内容;
                     * 节点包含 title, list, detail 的配置信息;
                     */
                    self.loadConfig = function () {

                        var cfg = interpreter.configuration(self, config);

                        if (cfg.list.headers) {
                            var columns = [];
                            var tag = ["base", "application"].join("/");
                            var colWidth = localStorage.getItem(tag + "_grid") || "";
                            colWidth = colWidth.split(',');
                            var index = 1;
                            angular.forEach(cfg.list.headers, function (col, key) {
                                if (angular.isString(col)) {
                                    col = {name: key, original: col, displayName: col};
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