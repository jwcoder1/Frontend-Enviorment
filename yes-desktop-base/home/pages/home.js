define(['plugins/vehicle/pages/pievehicle.detail'], function () {
    var controller = function ($scope, toastr, utils, $location, $rootScope) {
        var tradeType, legalOrg, busiUnitOrg, busiPlate, goodsType, getdata, allData, selectTime, filterChange;
        var view = {
            init: function () {
                var scope = $scope;
                scope.pievehicleUrl = "";
                $scope.plateitems = [];
                $scope.driveritems = [];
                // scope.isclgly = false;
                scope.widthclass = "col-xs-12 col-sm-12 col-md-12 col-lg-12";
                scope.selectidentity = "plugins/vehicle/pages/pievehicle.select.identity.html";
                scope.headers = {
                    "initiatororgname": {
                        displayName: "申请部门",
                        width: 120
                    },
                    "usePersonNames": {
                        displayName: "使用人",
                        width: 120
                    },
                    "birthland": {
                        displayName: "乘车点",
                        width: 150
                    },
                    "destination": {
                        displayName: "目的地",
                        width: 150
                    },
                    "usedate": {
                        displayName: "用车时间",
                        width: 120
                    },
                    "status": {
                        displayName: "当前状态",
                        width: 100
                    },
                    "initiatorname": {
                        displayName: "申请人",
                        width: 120
                    },
                    "applypersontel": {
                        displayName: "联系人电话",
                        width: 120
                    },
                    "contactsperson": {
                        displayName: "联系人",
                        width: 80
                    },
                    "contactstel": {
                        displayName: "联系电话",
                        width: 100
                    }
                };
                scope.action = {
                    add: function (event, data) {
                        if (scope.listidentity.identitys.length == 0) {
                            toastr.info("用户信息未设定组织身份！");
                            return;
                        }
                        if (scope.listidentity.identitys.length > 1) {
                            scope.model = {
                                data: {
                                    initiatororg: "",
                                    initiatororgname: "",
                                    initiator: scope.listidentity.person.pid,
                                    initiatorname: scope.listidentity.person.cname,
                                    applypersontel: scope.listidentity.person.mobilePhone,
                                    planVehicles: []
                                }
                            };
                            angular.forEach(scope.listidentity.identitys, function (item, key) {
                                if (item.isMain) {
                                    scope.model.data.initiatororg = item.oid;
                                    scope.model.data.initiatororgname = item.oName;
                                    scope.model.data.eid = item.eid;
                                    scope.model.data.path = item.path;
                                    scope.model.data.oid = item.oid;
                                }
                            });
                        }
                        else {
                            var useriden = "", pietype = "1"; //用户身份,派单类别
                            scope.listidentity.identitys[0].posts.forEach(function (post) {
                                useriden = post.id;
                                if (post.id == "clgly") {
                                    pietype = "2";
                                }
                            }, this);
                            scope.model = {
                                data: {
                                    initiatororg: scope.listidentity.identitys[0].oid,
                                    initiatororgname: scope.listidentity.identitys[0].oName,
                                    eid: scope.listidentity.identitys[0].eid,
                                    path: scope.listidentity.identitys[0].path,
                                    oid: scope.listidentity.identitys[0].oid,
                                    initiator: scope.listidentity.person.pid,
                                    initiatorname: scope.listidentity.person.cname,
                                    applypersontel: scope.listidentity.person.mobilePhone,
                                    pietype: pietype,
                                    useriden: useriden
                                }
                            };
                            scope.backentry = angular.copy(scope.model);
                            scope.loadDetail(scope.model.data);
                        }
                    },
                    identityadd: function (event, data) {
                        scope.backentry = angular.copy(scope.model);
                        scope.loadDetail(scope.model.data);
                        //                            scope.detailurl="plugins/vehicle/pages/pievehicle.detail.html";
                    },
                    changeidentity: function (item) {
                        var useriden = "", pietype = "1"; //用户身份,派单类别
                        item.posts.forEach(function (post) {
                            useriden = post.id;
                            if (post.id == "clgly") {
                                pietype = "2";
                            }
                        }, this);
                        scope.model.data.initiatororg = item.oid;
                        scope.model.data.initiatororgname = item.oName;
                        scope.model.data.eid = item.eid;
                        scope.model.data.path = item.path;
                        scope.model.data.oid = item.oid;
                        scope.model.data.pietype = pietype;
                        scope.model.data.useriden = useriden;
                    },
                    rowclick: function (item) {
                        scope.loadDetail(item);
                        // scope.winpara = {
                        //     retfn: function () {
                        //         scope.pievehicleUrl = "";
                        //         scope.load();
                        //     },
                        //     model: {
                        //         data: angular.copy(item)
                        //     }
                        // }
                        // scope.pievehicleUrl = "plugins/vehicle/pages/pievehicle.detail.html";
                    },
                    changepage: function (start, page) {
                    }
                };
                scope.piedata = [];
                scope.filter = {
                    start: 0,
                    count: 20
                };
                scope.loadDetail = function (entroy) {
                    scope.winpara = {
                        retfn: function () {
                            scope.pievehicleUrl = "";
                            scope.load();
                        },
                        model: {
                            data: entroy
                        }
                    };
                    scope.pievehicleUrl = "plugins/vehicle/pages/pievehicle.detail.html";
                };
                scope.getidentitybylogin = function () {
                    return utils.ajax({
                        method: 'GET',
                        url: 'base/identity/getidentitybylogin',
                        mockUrl: "plugins/vehicle/data/pievehicle.json"
                    }).then(function (res) {
                        console.log(res);
                        scope.listidentity = res.data.body;
                        if (scope.listidentity.identitys) {
                            scope.listidentity.identitys.forEach(function (identity) {
                                identity.posts.forEach(function (post) {
                                    if (post.id == "clgly") {
                                    }
                                });
                            });
                        }
                    });
                };
                scope.getidentitybylogin();
                filterChange = $rootScope.selectItem ? $rootScope.selectItem : $scope.filter;
                selectTime = { timeCondition: ['2016-01-01', moment().format('YYYY-MM-DD')] };
                allData = $.extend(filterChange, selectTime);
                $scope.load();
                $scope.$on('timeModel:change', function (event, data) {
                    var rangeTime = data.time;
                    var startDate = rangeTime.substring(0, 10);
                    var endDate = rangeTime.substring(11);
                    selectTime = { timeCondition: [] };
                    selectTime.timeCondition.push(startDate);
                    selectTime.timeCondition.push(endDate);
                    allData = $.extend($rootScope.selectItem, selectTime);
                    $scope.load();
                });
            },
            load: function () {
                utils.ajax({
                    method: 'GET',
                    url: 'vehicle/pievehicle/homepie',
                    mockUrl: "plugins/vehicle/data/pievehicle.json",
                    params: $scope.filter
                }).then(function (res) {
                    var data = res.data;
                    $scope.piedata = data.body.items;
                });
                // utils.ajax({
                //     method: 'GET',
                //     url: 'vehicle/pievehicle/querybyPlate',
                //     mockUrl: "plugins/vehicle/data/pievehicle.json",
                //     params: $scope.filter
                // }).then(function (res) {
                //     var data = res.data;
                //     $scope.plateitems = data.body.items;
                // });
                // utils.ajax({
                //     method: 'GET',
                //     url: 'vehicle/pievehicle/vpiedriverbygroup',
                //     mockUrl: "plugins/vehicle/data/pievehicle.json",
                //     params: $scope.filter
                // }).then(function (res) {
                //     var data = res.data;
                //     $scope.driveritems = data.body.items;
                // });
                //   "name": "vehicle",
                //                         "page": "pievehicle/queryPlate"
            }
        };
        angular.extend($scope, view);
        $scope.init();
    };
    controller.$inject = ['$scope', 'toastr', 'utils', '$location', '$rootScope'];
    angular.module('app').controller('app.base.home', controller);
}());

//# sourceMappingURL=home.js.map
