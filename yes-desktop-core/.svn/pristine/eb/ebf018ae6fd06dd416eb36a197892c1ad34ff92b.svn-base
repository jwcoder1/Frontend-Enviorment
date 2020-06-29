(function () {
    var controller = function ($scope, utils, $location, $rootScope) {
        var tradeType, legalOrg, busiUnitOrg, busiPlate, goodsType, getdata, allData, selectTime, filterChange;
        var view = {
            init: function () {
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
                    method: 'POST',
                    url: 'bi/target',
                    mockUrl: 'plugins/$default/data/quota.json',
                    data: $.extend({ "repositoryId": '/指标' }, allData)
                }).then(function (res) {
                    angular.forEach(res.data.body, function (element, index) {
                        if (element.name.indexOf('签约数量') != -1) {
                            element.value = (element.value / 10000).toFixed(2) + "万";
                        }
                        if (element.name.indexOf('签约金额') != -1) {
                            element.value = (element.value / 100000000).toFixed(2) + '亿';
                        }
                        if (element.yoy != 'Infinity') {
                            element.yoy = element.yoy.toFixed(0);
                        }
                        else {
                            element.yoy = 0;
                        }
                        if (element.mom != 'Infinity') {
                            element.mom = element.mom.toFixed(0);
                        }
                        else {
                            element.mom = 0;
                        }
                        $scope.quotos.push(element);
                    });
                });
                utils.ajax({
                    method: 'POST',
                    url: 'bi/getdata',
                    mockUrl: 'plugins/$default/data/olap.getdata.json',
                    data: $.extend({ "repositoryId": '/趋势图' }, allData)
                }).then(function (res) {
                    getdata = res.data.body;
                    var dataSeries = [];
                    angular.forEach(getdata.series, function (element, index) {
                        if (index == 4) {
                            if (element.data.indexOf(0.0)) {
                                var delIndex = element.data.indexOf(0.0);
                                element.data = element.data.splice(0, delIndex);
                            }
                        }
                        this.push(element);
                    }, dataSeries);
                    $scope.chart1 = {
                        chart: {
                            marginBottom: 90,
                            type: 'column'
                        },
                        title: {
                            text: null
                        },
                        xAxis: [{
                            categories: getdata.categories,
                            crosshair: true
                        }],
                        yAxis: [{
                            labels: {
                                formatter: function () {
                                    return Highcharts.numberFormat(this.value / 100000000, 2) + '亿';
                                },
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            },
                            title: {
                                text: '签约量',
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            }
                        }, {
                                title: {
                                    text: '同比增长',
                                    style: {
                                        color: Highcharts.getOptions().colors[0]
                                    }
                                },
                                labels: {
                                    format: '{value} %',
                                    style: {
                                        color: Highcharts.getOptions().colors[0]
                                    }
                                },
                                opposite: true
                            }],
                        tooltip: {
                            shared: false,
                        },
                        legend: {
                            floating: true,
                            align: 'left',
                            x: 70,
                            borderWidth: 1
                        },
                        plotOptions: {
                            column: {
                                stacking: 'normal',
                                dataLabels: {
                                    enabled: false,
                                    color: 'white',
                                    style: {
                                        textShadow: '0 0 3px black'
                                    },
                                },
                                tooltip: {
                                    pointFormatter: function () {
                                        if (this.series.name == '2016年采购') {
                                            return '签约量：' + Highcharts.numberFormat(this.total / 100000000, 2) + ' 亿<br/>' + this.series.name + '：' + Highcharts.numberFormat(this.y / 100000000, 2) + ' 亿<br/>'
                                                + '2016年销售' + '：' + Highcharts.numberFormat((this.total - this.y) / 100000000, 2) + ' 亿<br/>';
                                        }
                                        else if (this.series.name == '2016年销售') {
                                            return '签约量：' + Highcharts.numberFormat(this.total / 100000000, 2) + ' 亿<br/>' + this.series.name + '：' + Highcharts.numberFormat(this.y / 100000000, 2) + ' 亿<br/>'
                                                + '2016年采购' + '：' + Highcharts.numberFormat((this.total - this.y) / 100000000, 2) + ' 亿<br/>';
                                        }
                                        else if (this.series.name == '2015年采购') {
                                            return '签约量：' + Highcharts.numberFormat(this.total / 100000000, 2) + ' 亿<br/>' + this.series.name + '：' + Highcharts.numberFormat(this.y / 100000000, 2) + ' 亿<br/>'
                                                + '2015年销售' + '：' + Highcharts.numberFormat((this.total - this.y) / 100000000, 2) + ' 亿<br/>';
                                        }
                                        else if (this.series.name == '2015年销售') {
                                            return '签约量：' + Highcharts.numberFormat(this.total / 100000000, 2) + ' 亿<br/>' + this.series.name + '：' + Highcharts.numberFormat(this.y / 100000000, 2) + ' 亿<br/>'
                                                + '2015年采购' + '：' + Highcharts.numberFormat((this.total - this.y) / 100000000, 2) + ' 亿<br/>';
                                        }
                                    }
                                }
                            },
                            spline: {
                                tooltip: {
                                    pointFormatter: function () {
                                        return this.series.name + '：' + Highcharts.numberFormat(this.y, 2) + ' %<br/>';
                                    }
                                }
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        exporting: {
                            enabled: false
                        },
                        series: dataSeries
                    };
                });
                utils.ajax({
                    method: 'POST',
                    url: 'olap/busiPlate',
                    mockUrl: 'plugins/$default/data/olap.busiPlate.json',
                    data: $.extend({ "repositoryId": '/主页图表/业务板块' }, allData)
                }).then(function (res) {
                    busiPlate = res.data.body;
                    $scope.chart2 = {
                        chart: {
                            type: 'pie'
                        },
                        title: {
                            text: null
                        },
                        exporting: {
                            enabled: false
                        },
                        tooltip: {
                            formatter: function () {
                                return this.key + '<br/>签约量：' + Highcharts.numberFormat(this.y / 100000000, 2) + ' 亿<br/>' + this.series.name + ': <b>' + Highcharts.numberFormat(this.percentage, 1) + ' %</b>';
                            },
                        },
                        credits: {
                            enabled: false
                        },
                        plotOptions: {
                            series: {
                                cursor: 'pointer',
                                events: {
                                    click: function (e) {
                                        var option = { "conditions": ["[COL_ASCRIPTIONPLATE.业务板块].[" + e.point.name + "]"], "timeCondition": ["2016-01-01", moment().format('YYYY-MM-DD')] };
                                        $rootScope.clickOption = option;
                                        $rootScope.efg = {
                                            cnNames: [e.point.name]
                                        };
                                        $rootScope.clickOptionName = "业务板块：" + e.point.name;
                                        $scope.$emit('nav:open-tab', {
                                            url: 'bi/busi.unit.org',
                                            name: '经营单位详情页'
                                        });
                                        $location.path('bi/busi.unit.org');
                                        if (!$scope.$$phase)
                                            $scope.$apply();
                                    }
                                }
                            },
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                depth: 15,
                                dataLabels: {
                                    enabled: true,
                                    format: '{point.name}：<b>{point.percentage:.1f}%</b>'
                                }
                            }
                        },
                        series: [{
                            type: 'pie',
                            name: '签约量占比',
                            data: busiPlate
                        }]
                    };
                });
                utils.ajax({
                    method: 'POST',
                    url: 'olap/tradeType',
                    mockUrl: 'plugins/$default/data/olap.tradeType.json',
                    data: $.extend({ "repositoryId": '/主页图表/贸易类型' }, allData)
                }).then(function (res) {
                    tradeType = res.data.body;
                    $scope.chart4 = {
                        chart: {
                            type: 'pie',
                            options3d: {
                                enabled: false,
                                alpha: 45,
                                beta: 0
                            }
                        },
                        title: {
                            text: null
                        },
                        exporting: {
                            enabled: false
                        },
                        tooltip: {
                            formatter: function () {
                                return this.key + '<br/>签约量：' + Highcharts.numberFormat(this.y / 100000000, 2) + ' 亿<br/>' + this.series.name + ': <b>' + Highcharts.numberFormat(this.percentage, 1) + ' %</b>';
                            },
                        },
                        plotOptions: {
                            series: {
                                cursor: 'pointer',
                                events: {
                                    click: function (e) {
                                        var option = { "conditions": ["[TBL_TRAD_ETYPE_CON.贸易类型].[" + e.point.name + "]"], "timeCondition": ["2016-01-01", moment().format('YYYY-MM-DD')] };
                                        $rootScope.clickOption = option;
                                        $rootScope.efg = {
                                            cnNames: [e.point.name]
                                        };
                                        $scope.$emit('nav:open-tab', {
                                            url: 'bi/busi.unit.org',
                                            name: '经营单位详情页'
                                        });
                                        $location.path('bi/busi.unit.org');
                                        if (!$scope.$$phase)
                                            $scope.$apply();
                                    }
                                }
                            },
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                depth: 15,
                                dataLabels: {
                                    enabled: true,
                                    format: '{point.name}：<b>{point.percentage:.1f} %</b>'
                                }
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                            type: 'pie',
                            name: '签约量占比',
                            data: tradeType
                        }]
                    };
                });
                utils.ajax({
                    method: 'POST',
                    url: 'olap/legalOrg',
                    mockUrl: 'plugins/$default/data/olap.legalOrg.json',
                    data: $.extend({ "repositoryId": '/主页图表/平台公司' }, allData)
                }).then(function (res) {
                    legalOrg = res.data.body[0];
                    $scope.chart3 = {
                        chart: {
                            type: 'column',
                            marginBottom: 130
                        },
                        title: {
                            text: null
                        },
                        xAxis: [{
                            categories: legalOrg.categories,
                            crosshair: true
                        }],
                        yAxis: {
                            labels: {
                                formatter: function () {
                                    return Highcharts.numberFormat(this.value / 100000000, 2) + '亿';
                                },
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            },
                            title: {
                                text: '签约量',
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            }
                        },
                        tooltip: {
                            shared: false,
                            formatter: function () {
                                return this.x + '<br/>签约量：' + Highcharts.numberFormat(this.total / 100000000, 2) + ' 亿<br/>' + this.series.name + '：' + Highcharts.numberFormat(this.y / 100000000, 2) + ' 亿<br/>';
                            },
                        },
                        legend: {
                            floating: true,
                            align: 'left',
                            x: 70,
                            borderWidth: 1
                        },
                        plotOptions: {
                            series: {
                                cursor: 'pointer',
                                events: {
                                    click: function (e) {
                                        var option = { "conditions": ["[TBL_LEGAL_ORG.平台公司].[" + e.point.category + "]"], "timeCondition": ["2016-01-01", moment().format('YYYY-MM-DD')] };
                                        $rootScope.clickOption = option;
                                        $rootScope.efg = {
                                            cnNames: [e.point.category]
                                        };
                                        $scope.$emit('nav:open-tab', {
                                            url: 'bi/busi.unit.org',
                                            name: '经营单位详情页'
                                        });
                                        $location.path('bi/busi.unit.org');
                                        if (!$scope.$$phase)
                                            $scope.$apply();
                                    }
                                }
                            },
                            column: {
                                stacking: 'normal',
                                dataLabels: {
                                    enabled: false,
                                    color: 'white',
                                    style: {
                                        textShadow: '0 0 3px black'
                                    }
                                }
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        exporting: {
                            enabled: false
                        },
                        series: legalOrg.series
                    };
                });
                utils.ajax({
                    method: 'POST',
                    url: 'olap/goodsType',
                    mockUrl: 'plugins/$default/data/olap.goodsType.json',
                    data: $.extend({ "repositoryId": '/主页图表/商品分类' }, allData)
                }).then(function (res) {
                    goodsType = res.data.body[0];
                    $scope.chart5 = {
                        chart: {
                            type: 'column',
                            marginBottom: 100
                        },
                        title: {
                            text: null
                        },
                        xAxis: [{
                            categories: goodsType.categories,
                            crosshair: true
                        }],
                        yAxis: {
                            labels: {
                                formatter: function () {
                                    return Highcharts.numberFormat(this.value / 100000000, 2) + '亿';
                                },
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            },
                            title: {
                                text: '签约量',
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            }
                        },
                        tooltip: {
                            shared: false,
                            formatter: function () {
                                return this.x + '<br/>签约量：' + Highcharts.numberFormat(this.total / 100000000, 2) + ' 亿<br/>' + this.series.name + '：' + Highcharts.numberFormat(this.y / 100000000, 2) + ' 亿<br/>';
                            },
                        },
                        legend: {
                            floating: true,
                            align: 'left',
                            x: 70,
                            borderWidth: 1
                        },
                        plotOptions: {
                            series: {
                                cursor: 'pointer',
                                events: {
                                    click: function (e) {
                                        var option = { "conditions": ["[TBL_SG_GOODS.商品分类].[" + e.point.category + "]"], "timeCondition": ["2016-01-01", moment().format('YYYY-MM-DD')] };
                                        $rootScope.clickOption = option;
                                        $rootScope.efg = {
                                            cnNames: [e.point.category]
                                        };
                                        $rootScope.clickOptionName = "商品分类:" + e.point.category;
                                        $scope.$emit('nav:open-tab', {
                                            url: 'bi/busi.unit.org',
                                            name: '经营单位详情页'
                                        });
                                        $location.path('bi/busi.unit.org');
                                        if (!$scope.$$phase)
                                            $scope.$apply();
                                    }
                                }
                            },
                            column: {
                                stacking: 'normal',
                                dataLabels: {
                                    enabled: false,
                                    color: 'white',
                                    style: {
                                        textShadow: '0 0 3px black'
                                    }
                                }
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        exporting: {
                            enabled: false
                        },
                        series: goodsType.series
                    };
                });
                utils.ajax({
                    method: 'POST',
                    url: 'olap/busiUnitOrg/whatever',
                    mockUrl: 'plugins/$default/data/olap.busiUnitOrg.json',
                    data: $.extend({ "repositoryId": '/主页图表/经营单位' }, allData)
                }).then(function (res) {
                    busiUnitOrg = res.data.body[0];
                    $scope.chart6 = {
                        chart: {
                            type: 'column',
                            marginBottom: 135
                        },
                        title: {
                            text: null
                        },
                        xAxis: [{
                            categories: busiUnitOrg.categories,
                            crosshair: true
                        }],
                        yAxis: {
                            labels: {
                                formatter: function () {
                                    return Highcharts.numberFormat(this.value / 100000000, 2) + '亿';
                                },
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            },
                            title: {
                                text: '签约量',
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            }
                        },
                        tooltip: {
                            shared: false,
                            formatter: function () {
                                return this.x + '<br/>签约量：' + Highcharts.numberFormat(this.total / 100000000, 2) + ' 亿<br/>' + this.series.name + '：' + Highcharts.numberFormat(this.y / 100000000, 2) + ' 亿<br/>';
                            },
                        },
                        legend: {
                            floating: true,
                            align: 'left',
                            x: 70,
                            borderWidth: 1
                        },
                        plotOptions: {
                            series: {
                                cursor: 'pointer',
                                events: {
                                    click: function (e) {
                                        var option = { "conditions": ["[TBL_ORG.经营单位].[" + e.point.category + "]"], "timeCondition": ["2016-01-01", moment().format('YYYY-MM-DD')] };
                                        $rootScope.clickOption = option;
                                        $rootScope.efg = {
                                            cnNames: [e.point.category]
                                        };
                                        $rootScope.departName = e.point.category;
                                        localStorage.setItem('departName', e.point.category);
                                        $scope.$emit('nav:open-tab', {
                                            url: 'bi/department',
                                            name: '部门'
                                        });
                                        $location.path('bi/department');
                                        if (!$scope.$$phase)
                                            $scope.$apply();
                                    }
                                }
                            },
                            column: {
                                stacking: 'normal',
                                dataLabels: {
                                    enabled: false,
                                    color: 'white',
                                    style: {
                                        textShadow: '0 0 3px black'
                                    }
                                }
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        exporting: {
                            enabled: false
                        },
                        series: busiUnitOrg.series
                    };
                });
            },
            chart1: {},
            chart2: {},
            chart3: {},
            chart4: {},
            chart5: {},
            chart6: {},
            filterOption: {
                resources: [
                    {
                        id: '[COL_ASCRIPTIONPLATE.业务板块]',
                        name: '业务板块',
                        url: 'bi/dictionary/loadKeyName',
                        mockUrl: 'plugins/$default/data/dictionary.loadKeyName.json',
                        data: 224201
                    },
                    {
                        id: '[TBL_ORG.经营单位]',
                        name: '经营单位',
                        url: 'bi/busiUnitOrg/queryAll',
                        mockUrl: 'plugins/$default/data/busiUnitOrg.queryAll.json',
                    },
                    {
                        id: '[TBL_LEGAL_ORG.平台公司]',
                        name: '平台公司',
                        url: '/bi/company/queryAll',
                        mockUrl: 'plugins/$default/data/company.queryAll.json',
                    },
                    {
                        id: '[TBL_TRAD_ETYPE_CON.贸易类型]',
                        name: '贸易类型',
                        url: 'bi/tradeType/queryAll',
                        mockUrl: 'plugins/$default/data/tradeType.queryAll.json'
                    },
                    {
                        id: '[TBL_SG_GOODS.商品分类]',
                        name: '商品分类',
                        url: 'bi/goodsType/queryAll',
                        mockUrl: 'plugins/$default/data/goodsType.queryAll.json'
                    }
                ]
            },
            filter: {
                conditions: []
            },
            quotos: [],
            checkModel: {
                id: []
            }
        };
        angular.extend($scope, view);
        $scope.init();
    };
    controller.$inject = ['$scope', 'utils', '$location', '$rootScope'];
    angular.module('app').controller('app.default.widgets', controller);

} ());