define(function() {
    angular.module('app').controller('bean.menuconfigure',
        function($rootScope, $scope, $location, uiGridConstants, utils, path, settings,
            $timeout, dialog, toastr, ngDialog, qwsys, $http) {
            var scope = $scope;

            scope.filter = {};
            scope.parent = {};
            scope.model = {
                records: 0,
                content: []
            }

            scope.treesource = [];
            scope.datapage = {
                page: 0,
                size: 2000
            }
            scope.promise = null;
            scope.treeUrl = "plugins/bean/templates/tree.html";
            scope.config = {
                sortable: {
                    animation: 100,
                    handle: '.sortclass',
                    onEnd: function(evt) {
                        var sorts = scope.parent.order;
                        var step = 100000;
                        if (scope.parent.mid == "SYS") {
                            step = 100000;
                        } else {
                            var arr = scope.parent.mid.split("_");
                            if (arr.length == 1) {
                                step = 1000
                            } else if (arr.length == 2) {
                                step = 10
                            } else {
                                step = 1
                            }
                        }
                        evt.models.forEach(function(element) {
                            element.entity.order = sorts;
                            sorts += step;
                        }, this);
                        scope.model.content.sort(function(a, b) {
                            var val1 = a["order"];
                            var val2 = b["order"];
                            return val1 - val2;
                        });

                        utils.ajax({
                            method: 'POST',
                            url: "bean/menuconfigure/savesort",
                            mockUrl: "plugins/base/data/orderlines.json",
                            data: scope.model.content
                        }).then(function(res) {
                            toastr.info("已新重新排序！");
                            scope.action.load();
                        });



                    }
                },
                headers: {
                    "sort": {
                        displayName: "移动",
                        enableColumnMenu: false,
                        readonly: true,
                        width: 35,
                        cellTemplate: "<div class='ui-grid-cell-contents'> " +
                            "<i class=' iocstyle statusblue sortclass  fa fa-arrows-alt'  ></i>" +
                            "</div>"
                    },
                    "pid": {
                        displayName: "上级编号",
                        width: 120
                    },
                    "mid": {
                        displayName: "编号",
                        width: 120
                    },
                    "order": {
                        displayName: "顺序号",
                        width: 80
                    },
                    "url": {
                        displayName: "URL 地址",
                        width: 120
                    },
                    "name": {
                        displayName: "名称",
                        width: 120
                    },
                    "color": {
                        displayName: "颜色",
                        width: 60,
                        cellTemplate: "<div class='ui-grid-cell-contents'><a class='btn btn-app btn-sm menu-btn' ng-class='COL_FIELD' >  </a></div>"
                    },
                    "home": {
                        displayName: "首页显示",
                        width: 60,
                        cellTemplate: "<div class='ui-grid-cell-contents'> {{COL_FIELD?'是':'否'}}</div>"
                    }
                },
                parentItems: {
                    mid: {
                        type: "basString",
                        readonly: true,
                        lovtype: "",
                        name: "mid",
                        label: "编号"
                    },
                    name: {
                        type: "basString",
                        readonly: true,
                        lovtype: "",
                        name: "name",
                        label: "名称"
                    }
                }
            }


            scope.treeOption = {
                lowerlevels: [],
                title: "菜单",
                id: "mid",
                parent: "pid",
                name: "name",
                addfn: function(item) {
                    scope.action.add(item);
                },
                delfn: function() {
                    dialog.confirm('确定删除菜单?').then(function() {
                        var ids = "",
                            tag = "";
                        scope.treesource.forEach(function(element) {
                            if (element.select) {
                                ids = ids + tag + element.uid;
                                tag = ",";
                            }
                        }, this);

                        utils.ajax({
                            method: 'DELETE',
                            url: "bean/menuconfigure/" + ids,
                            mockUrl: "plugins/data/custheader.json"
                        }).then(function(res) {
                            toastr.info("数据删除成功!!!");
                            scope.action.classload();
                        });

                    });
                },
                editfn: function(item) { //tree内部固定
                    scope.action.rowclick(item);
                },
                clicknode: function(item, level) { //tree内部固定
                    scope.parent.mid = item.mid; //省
                    scope.parent.name = item.name;
                    scope.parent.order = item.order;
                    scope.model.content = scope.treeOption.lowerlevels;
                },
                load: function() {
                    scope.action.load();
                }

            }


            scope.action = {
                add: function(item) {
                    $rootScope.model = {
                        uid: "",
                        formstatus: "add",
                        icon: "fa-book",
                        enable: true,
                        expanded: false,
                        home: true,
                        blank: false,
                        color: "btn-danger",
                        pid: item.mid ? item.mid : ""
                    }
                    scope.action.opendetail();
                },

                load: function() {

                    scope.promise = utils.ajax({
                        method: 'POST',
                        url: "bean/menuconfigure/query?page=0&size=2000&sort=order,asc ",
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: scope.filter
                    }).then(function(res) {
                        scope.treesource = res.data.body;
                    });

                },
                changepage: function(page, size) {
                    scope.datapage.page = page;
                    scope.datapage.size = size;
                    scope.action.load();
                },
                rowclick: function(entity) {
                    entity.formstatus = "edit";
                    $rootScope.model = entity
                    scope.action.opendetail();
                },
                opendetail: function() {
                    var node = {
                        name: "菜单明细",
                        url: 'bean/menuconfigure.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshbean.menuconfigure', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});