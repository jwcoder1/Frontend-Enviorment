define(function() {
    angular.module('app').controller('base.enterprisestatus',
        function($rootScope, $scope, $location, utils, path, getSingleView, settings,
            $timeout, dialog, toastr) {
            var scope = $scope;
            scope.filter = {
                acr_mon$eq: new moment(new Date()).format("YYYYMM"),
                count: 20
            };
            //scope.listUrl = "plugins/bas/templates/viewList.html";
            scope.config = {
                title: "企业状态",
                listoperation: {
                    find: {
                        name: "查询",
                        icon: "fa-search",
                        action: function(event, scope) {
                            scope.action.load();
                        }
                    },
                    reset: {
                        name: "重置",
                        icon: "fa-undo",
                        action: function(event, scope) {
                            scope.action.reset();
                            scope.action.load();
                        }
                    }

                },
                headers: {
                    "cus_nbr": {
                        displayName: "企业代号",
                        width: 80
                    },
                    "cus_name": {
                        displayName: "企业名称",

                    },
                    "addr": {
                        displayName: "企业地址",
                        width: 250
                    },
                    "date": {
                        displayName: "注册日期",
                        width: 120
                    },
                    "status": {
                        displayName: "状态",
                        width: 90
                    },
                    "mans": {
                        displayName: "在线人数",
                        width: 90
                    }

                },
                filterItems: {
                    nbr: {
                        type: "input",
                        name: "nbr$match",
                        label: "企业代号"
                    },
                    cus_nbr: {
                        type: "input",
                        name: "cus_nbr$eq",
                        label: "企业名称"
                    }


                }
            }



            scope.data = {
                count: 103,
                items: [{
                        "cus_nbr": "047     ",
                        "cus_name": "以翔實業有限公司          ",
                        "addr": "彰化縣鹿港鎮山崙里崙尾巷124-49號  ",
                        "date": "2014-02-06",
                        "status": "在线",
                        "mans": 3
                    },
                    {
                        "cus_nbr": "126      ",
                        "cus_name": "茂源紙業有限公司             ",
                        "addr": "台中縣大里市健行路143號      ",
                        "date": "2014-07-12",
                        "status": "在线",
                        "mans": 1
                    },
                    {
                        "cus_nbr": "537     ",
                        "cus_name": "上寶水電材料有限公司              ",
                        "addr": "宜蘭縣宜蘭市環巿東路三段529號        ",
                        "date": "2014-05-19",
                        "status": "离线",
                        "mans": 0
                    },

                    {
                        "cus_nbr": "555      ",
                        "cus_name": "富聖紙器興業有限公司           ",
                        "addr": "台中縣霧峰鄉六股村南阡巷80號        ",
                        "date": "2013-07-25",
                        "status": "在线",
                        "mans": 2
                    },
                    {
                        "cus_nbr": "589     ",
                        "cus_name": "得貹股份有限公司                ",
                        "addr": "彰化縣員林鎮萬年里大饒路342號              ",
                        "date": "2014-09-01",
                        "status": "在线",
                        "mans": 4
                    },
                    {
                        "cus_nbr": "601     ",
                        "cus_name": "品佳紙器股份有限公司            ",
                        "addr": "台中市南屯區工業二十路22號                   ",
                        "date": "2017-01-15",
                        "status": "在线",
                        "mans": 3
                    },
                    {
                        "cus_nbr": "539     ",
                        "cus_name": "可利金五金有限公司              ",
                        "addr": "台北縣樹林市光武街36巷21號                     ",
                        "date": "2016-09-06",
                        "status": "在线",
                        "mans": 1
                    },
                    {
                        "cus_nbr": "633     ",
                        "cus_name": "嘉晉紙業股份有限公司                 ",
                        "addr": "彰化縣鹿港鎮頂番里埤頭巷152號之1                        ",
                        "date": "2017-01-04",
                        "status": "在线",
                        "mans": 3
                    },
                    {
                        "cus_nbr": "595     ",
                        "cus_name": "台昇紙器股份有限公司                 ",
                        "addr": "台中縣清水鎮海濱路168之24號              ",
                        "date": "2017-04-23",
                        "status": "在线",
                        "mans": 2
                    }
                ]
            }


            scope.action = {
                load: function() {
                    // utils.ajax({
                    //     url: "ord/shpbah",
                    //     params: scope.filter
                    // }).then(function(res) {
                    //     scope.shptot = res.data.body;
                    // }, function(error) {

                    // });

                },
                reset: function() {
                    scope.filter = {
                        count: 20
                    };

                },



            }
            scope.action.load();


        });

});