define(['plugins/base/pages/account.config', 'plugins/base/pages/account.detail'],
    function(config) {
        angular.module('app').controller('base.account',
            function($scope, $rootScope, utils, path, getBaseView, settings, $translate,
                $timeout, dialog, toastr) {

                var scope = getBaseView($scope, 'plugins/base/pages/account.detail.html'); //虚拟继承基础的view.
                scope.loadSubMenus("all"); //告诉母版页面加载左侧菜单。
                scope.promise = null;
                /**
                 * 所有页面要绑定的
                 */
                scope.binds = function() {

                    /**
                     * 声明查询过滤条件字段
                     * @type {{}}
                     */
                    scope.filter = {};

                    /**
                     * 表格设置
                     */
                    scope.gridOptions = angular.extend({
                        data: 'entries',
                        onRegisterApi: function(gridApi) {
                            scope.gridApi = gridApi;

                            gridApi.pagination.on.paginationChanged(scope, function(newPage, pageSize) {
                                scope.filter.start = (newPage - 1) * pageSize;
                                scope.filter.count = pageSize;
                                scope.load();
                            });

                            gridApi.core.on.renderingComplete(scope, function(ar1) {
                                $timeout(function() {
                                    angular.element(window).trigger('resize');
                                }, 0);
                            });

                            gridApi.colResizable.on.columnSizeChanged(scope, function(ar1, ar2) {
                                var cols = [];
                                angular.forEach(gridApi.grid.columns, function(column) {
                                    cols.push(column.width);
                                });
                                //localStorage.setItem(gridKey + "_grid", cols);
                            });
                        },
                        appScopeProvider: { //行模版内的事件定义
                            onDblClick: function(event, row) {
                                if (row && row.entity)
                                    scope.loadDetail(row.entity);
                            },
                            customClick: function(name, row) {
                                //if (angular.isFunction(scope[name])) {
                                //    scope[name].apply(this,[row.entity]);
                                //}
                            }
                        },
                        rowTemplate: "<div ng-dblclick=\"grid.appScope.onDblClick($event,row)\" " +
                            "ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" " +
                            "class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" " +
                            "ui-grid-cell ></div>"
                    }, settings.uiGrid);

                    /**
                     * 绑定列表的操作按钮渲染绑定
                     * @type {{add: {name: string, icon: string}, edit: {name: string, icon: string, action: Function}, del: {name: string, icon: string, action: Function}, enable: {name: string, icon: string, action: Function}, disable: {name: string, icon: string, action: Function}, unlock: {name: string, icon: string, action: Function}}}
                     */
                    scope.listOperations = config.listOperations;

                    /**
                     * 表格列定义
                     * @type {{name: {displayName: string, minWidth: number, maxWidth: number}, aid: {displayName: string, minWidth: number, maxWidth: number}, displayName: {displayName: string, minWidth: number, maxWidth: number}, email: {displayName: string, minWidth: number, maxWidth: number}, enable: {displayName: string, minWidth: number, maxWidth: number, cellTemplate: string}, type: {displayName: string, minWidth: number, maxWidth: number}, password: {displayName: string, minWidth: number, maxWidth: number, visible: boolean}, activeCode: {displayName: string, minWidth: number, maxWidth: number}, mobile: {displayName: string, minWidth: number}}}
                     */
                    scope.headers = config.headers;


                    /**
                     * 绑定查询字段
                     * @type {*[]}
                     * 对于需要数组的配置都定义成对象配置方式,这样容易定位,代码容易折叠收起
                     */
                    scope.filterItems = config.filterItems;

                    function getEnterprises(obj) {
                        utils.async("get", "base/enterprise/getenterprises").then(function(res) {
                            for (var i = 0; i < res.data.body.Enterprises.length; i++) {
                                obj.titleMap.push({ value: res.data.body.Enterprises[i].eid, name: res.data.body.Enterprises[i].cname });
                            }
                        }, function(error) {
                            //toastr.warning(error.message);
                        });
                    }
                    getEnterprises(scope.filterItems[7]);

                    /**
                     * 绑定详情对象
                     * @type {{}}
                     */
                    scope.model = {};

                    /**
                     * 最终的按钮操作行为实现
                     * @type {{}}
                     */
                    scope.action = {
                        add: function(event, data) {
                            scope.loadDetail({});
                        },
                        save: function(event, form) {
                            scope.$broadcast("schemaFormValidate");

                            if (form.$valid) {

                                var method = scope.model.uid ? "PUT" : "POST";
                                if (method == "put") {
                                    delete scope.model['new'];
                                }

                                var data = angular.copy(scope.model);

                                if (data) {
                                    for (var k in data) {
                                        if (data.hasOwnProperty(k) && angular.isDate(data[k])) {
                                            data[k] = moment(data[k]).format("YYYY-MM-DD HH:mm:ss");
                                        }
                                    }
                                }

                                utils.ajax({
                                    method: method,
                                    url: "base/account" + (data.uid ? ("/" + data.uid) : ""),
                                    mockUrl: "plugins/base/data/account.save.json",
                                    data: data
                                }).then(function(res) {
                                    scope.load();
                                    scope.unloadDetail();
                                });
                            }

                        },
                        edit: function(event, data) {
                            var rows = scope.action.rowsActionCheck(1);
                            if (rows) {
                                console.log(rows[0]);

                                scope.loadDetail(rows[0]);
                            }
                        },
                        del: function(event, data) {
                            var rows = scope.action.rowsActionCheck();

                            if (rows.length) {
                                dialog.confirm('确定删除该条记录?').then(function() {
                                    var loading = 0;
                                    angular.forEach(rows, function(row) {
                                        utils.ajax({
                                            method: "DELETE",
                                            url: 'base/account/' + row.uid,
                                            mockUrl: 'plugins/base/data/account.del.json'
                                        }).then(function(res) {
                                            loading++;
                                            if (loading == rows.length) {
                                                scope.load();
                                            }
                                        });
                                    });
                                });
                            }
                        },
                        reset: function(event) {
                            angular.forEach(scope.filter, function(raw, key) {
                                if (key != 'count')
                                    delete scope.filter[key];
                            });
                        },
                        close: function() {
                            scope.unloadDetail();
                        },
                        back: function() {
                            scope.unloadDetail();
                        },
                        rowsActionCheck: function(count) {
                            var rows = scope.action.bulk();
                            if (count === 1 && rows.length !== 1) {
                                toastr.info("所选条数必须是一条！");
                                return false;
                            } else if (!rows.length) {
                                toastr.info("所选条数必须多于一条！");
                            }
                            return rows;
                        },
                        rowAction: function() {

                        },
                        bulk: function() {
                            return scope.gridApi.selection.getSelectedRows() || [];
                        }
                    };
                };

                /**
                 * 定义页面加载数据
                 */
                scope.load = function() {
                    var data = angular.copy(scope.filter);
                    scope.promise = utils.ajax({
                        method: 'GET',
                        url: 'base/account',
                        mockUrl: "plugins/base/data/accounts.json",
                        params: data
                    }).then(function(res) {
                        var data = res.data;
                        scope.gridOptions.columnDefs = utils.gridDefine(scope.headers, "base/account");
                        scope.entries = data.body.items;
                        scope.gridOptions.totalItems = data.body.count;
                    });
                };

                function getTypes(types) {
                    var temp = [];
                    for (var i = 0; i < types.length; i++) {
                        temp.push({ "name": types[i], "value": types[i] });
                    }
                    return temp;
                }

                scope.loadTypes = function() {
                    utils.ajax({
                        method: "GET",
                        url: "base/account/getTypes",
                        mockUrl: 'plugins/base/data/account.types.json'
                    }).then(function(res) {
                        $rootScope.ACCOUNT_TYPES = res.data.body;
                        scope.filterItems["6"].titleMap = getTypes(res.data.body);
                    });
                };

                scope.loadTypes();
                /**
                 * 初始化页面
                 */
                scope.init();
            });

    });