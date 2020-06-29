/* global angular */
define(['plugins/base/pages/enterprise.config',
        'plugins/base/directives/tree.organization'],
    function (config) {
        "use strict";
        angular.module('app')
            .controller('app.base.enterprise',
                function ($scope, $timeout, $rootScope, $translate,
                          interpreter, settings, utils, ngDialog, dialog, toastr, path) {
                    var self = $scope;
					
					/**
	                 * 高度自适应
	                 */
	                $timeout(function  () {
	                	var height = document.documentElement.clientHeight
		    			document.getElementById("con").style.height = height-175+"px"; 
		                document.getElementById("ui-grid").style.height = height-178+"px"; 
	                },200);
					
					
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

                    function reloadEnterprise() {
                        delete $rootScope.myEnterprise;
                        delete $rootScope.myEnterpriseNode
                        loadEnterprise();
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
                            self.filter.classify = self.current.value;
                        } else {
                            delete self.filter.classify;
                        }
                        if (self.selectedEnterprise) {
                            self.filter.pid = self.selectedEnterprise.no;
                        }
                        utils.async("GET", "base/enterprise/getchildren", self.filter).then(function (res) {
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
                            self.form.model = {
                                "classify": (self.current ? self.current.value : null),
                                "regCapital":0
                            };
                        }
                        /*    var ctx = new context(self, true);
                         self.destroyWatches = ctx.destroyWatches;
                         ctx.destroyWatches();

                         config.script && config.script.apply(ctx);

                         $timeout(function () {
                         ctx.enableSetValue();
                         }, 500);*/
                        utils.async("get", "base/area", {"pid": "0"}).then(function (res) {
                            res.data.body.forEach(function (item) {
                                item.value = item.id;
                            });
                            path.find(self.form, ['form', '[title:详细信息]', 'items', '[key:regProvince]'], []).titleMap = res.data.body;
                        }, function (error) {
                            toastr.warning("加载省失败!");
                        });

                        self.$watch("form.model.regProvince", function (newVal, oldVal) {
                            if (newVal) {
                                if (newVal != oldVal) {
                                    self.form.model.regCity = undefined;
                                    self.form.model.regDistrict = undefined;
                                }
                                utils.async("get", "base/area", {"pid": newVal}).then(function (res) {
                                    res.data.body.forEach(function (item) {
                                        item.value = item.id;
                                    });
                                    path.find(self.form, ['form', '[title:详细信息]', 'items', '[key:regCity]'], []).titleMap = res.data.body;
                                }, function (error) {
                                    toastr.warning("加载市失败!");
                                });
                            }
                        });
                        self.$watch("form.model.regCity", function (newVal, oldVal) {
                            if (newVal) {
                                if (newVal != oldVal) {
                                    self.form.model.regDistrict = undefined;
                                }
                                utils.async("get", "base/area", {"pid": newVal}).then(function (res) {
                                    res.data.body.forEach(function (item) {
                                        item.value = item.id;
                                    });
                                    path.find(self.form, ['form', '[title:详细信息]', 'items', '[key:regDistrict]'], []).titleMap = res.data.body;
                                }, function (error) {
                                    toastr.warning("加载区失败!");
                                });
                            }
                        });
                        self.detailUrl = 'plugins/base/pages/enterprise.detail.html';
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

                        utils.async("get", "base/dicdetail/detail", {
                            "type": "ENT",
                            "id": "ENTCLASSIFY",
                            "eid": enterprise.eid,
                            "count": 9999
                        }).then(function (res) {
                            res.data.body.items.forEach(function(item){
                                item.name = item.value;
                                item.value = item.id;
                            });
                            self.node = {"children": res.data.body.items, isRoot: true};

                            $rootScope.dicDetails = res.data.body.items;
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
                        self.filter = {};
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
                                enablePaginationControls: true,
                                enableFiltering: false,
                                enableRowHeaderSelection: true,
                                exporterOlderExcelCompatibility: true,
                                useExternalPagination: true,
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
                                paginationPageSizes: [20, 200, 1000],
                                paginationPageSize: 20,
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
                            selectClassicy: function (classify) {
                                if (classify == self.current) {
                                    classify.selected = false;
                                    self.current = null;
                                } else {
                                    self.current = classify;
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

                                    var namespace = ["base", "enterprise"].join("/");
                                    var method = self.form.model.uid ? "put" : "post";
                                    if (method == "put") {
                                        namespace = [namespace, self.form.model.uid].join("/");
                                        delete self.form.model['new'];
                                    }

                                    //self.events.trigger("beforeSave", self.form);

                                    var model = angular.copy(self.form.model);

                                    model.pid = self.selectedEnterprise.no;
                                    if (method == "post") {
                                        model.eid = self.selectedEnterprise.eid;
                                    }

                                    utils.async(method, namespace, model).then(function (res) {
                                        //self.events.trigger("entrySaved", res.data.body);
                                        self.load();
                                        self.unloadDetail();
                                        reloadEnterprise();
                                    }, function (error) {
                                        //toastr.warning(error.message);
                                    });

                                } else {
                                    angular.element('.help-block').addClass('text-right');
                                }
                            },
                            del: function (event, data) {

                                var rows = self.action.bulk();
                                var loading = 0;
                                if (rows.length) {
                                    dialog.confirm('确定删除该条记录?').then(function () {
                                        angular.forEach(rows, function (row) {

                                            utils.async('delete', "base/enterprise/" + row.uid).then(function (res) {
                                                loading++;
                                                if (loading == rows.length) {
                                                    toastr.success('删除成功！');
                                                    loading = 0;
                                                    self.load();
                                                    reloadEnterprise();
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
                            }
                        };
                        self.bindEvents();
                    };

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
                            var tag = ["base", "enterprise"].join("/");
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