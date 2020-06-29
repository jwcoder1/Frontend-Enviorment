define(function() {
    angular.module('app').controller('base.log',
        function($rootScope, $scope, $location, uiGridConstants, utils, path, settings,
            $timeout, dialog, toastr, ngDialog, qwsys, $http) {
            var scope = $scope;
            scope.filter = {};
            scope.model = {
                records: 0,
                content: []
            }
            scope.datapage = {
                page: 0,
                size: 20,
                sort: "created,desc"
            }
            scope.promise = null;
            scope.listUrl = "plugins/bas/templates/list.html";
            scope.config = {
                gridkey: "log",
                title: "log记录",
                listoperation: {
                    add: {
                        name: "新增",
                        icon: "fa-calendar-check-o",
                        action: function(event, scope) {
                            scope.action.add();
                        }
                    }
                },
                headers: {
                    "moduleId": {
                        displayName: "模块编号",
                        width: 120
                    },
                    "eventId": {
                        displayName: "事件编号",
                        width: 120
                    },
                    "user": {
                        displayName: "操作用户",
                        width: 120
                    },
                    "time": {
                        displayName: "操作时间",
                        width: 120
                    },
                    "localIp": {
                        displayName: "本地Ip",
                        width: 120
                    },
                    "info": {
                        displayName: "操作说明",
                        width: 120
                    },
                    "remote": {
                        displayName: "远程记录",
                        width: 120
                    },
                    "remoteIp": {
                        displayName: "远程Ip",
                        width: 120
                    }
                },
                filterItems: {
                    moduleId: {
                        type: "basDefault",
                        lovtype: "",
                        name: "moduleId",
                        label: "模块编号"
                    },
                    eventId: {
                        type: "basDefault",
                        lovtype: "",
                        name: "eventId",
                        label: "事件编号"
                    },
                    user: {
                        type: "basDefault",
                        lovtype: "",
                        name: "user",
                        label: "操作用户"
                    },
                    time: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "time",
                        label: "操作时间F"
                    },
                    timeb: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "timeb",
                        label: "操作时间F"
                    },
                    info: {
                        type: "basDefault",
                        lovtype: "",
                        name: "info",
                        label: "操作说明"
                    },
                    remoteIp: {
                        type: "basDefault",
                        lovtype: "",
                        name: "remoteIp",
                        label: "远程Ip"
                    }
                }
            }

            scope.action = {
                add: function() {
                    $rootScope.uid = "";
                    scope.action.opendetail();
                },

                load: function() {

                    scope.promise = utils.ajax({
                        method: 'POST',
                        url: "base/log/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: scope.filter
                    }).then(function(res) {
                        scope.model = res.data.body;
                    });

                },
                reset: function() {
                    scope.filter = {

                    };

                },
                changepage: function(page, size, sort) {
                    scope.datapage.page = page;
                    scope.datapage.size = size;
                    if (sort) {
                        scope.datapage.sort = sort;
                    }
                    scope.action.load();
                },
                rowclick: function(entity) {
                    $rootScope.uid = entity.uid;
                    scope.action.opendetail();
                },
                opendetail: function() {
                    var node = {
                        name: "",
                        url: 'base/log.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshlog', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});