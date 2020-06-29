(function () {
    var controller = function ($scope, utils, context, $http, $timeout, $ocLazyLoad) {
        var view = {
            init: function () {
                $scope.loadValidationScript();
            },
            schema: {
                type: 'object',
                properties: {
                    'customer': {
                        title: '订货单位',
                        type: 'string'
                    },
                    'project': {
                        title: '项目名称',
                        type: 'string'
                    },
                    'orderNo': {
                        title: '客户订单号',
                        type: 'string'
                    },
                    'productSerialize': {
                        type: 'string',
                        title: '产品系列(1)',
                        required: true
                    },
                    'installMethod': {
                        type: 'string',
                        title: '安装方式(2)',
                        required: true
                    },
                    'ratedVoltage': {
                        type: 'string',
                        title: '额定电压(3)',
                        required: true
                    },
                    'standard': {
                        type: 'string',
                        title: '标准(4)',
                        required: true
                    },
                    'electricCurrent': {
                        title: '接触器额定电流(5)',
                        'default': '400A',
                        type: 'string',
                        required: true
                    },
                    'maxCurrent': {
                        title: '组合电器最大额定电流(6)',
                        type: 'string'
                    },
                    'exceptionCurrent': {
                        title: '额定短时耐受电流(7)',
                        'default': '4kA/4s',
                        type: 'string',
                        required: true
                    },
                    'keepMethod': {
                        title: '保持方式(8)',
                        type: 'string',
                        required: true
                    },
                    'HC': {
                        title: '合闸线圈(HC)(9)',
                        type: 'string',
                        required: true
                    },
                    'trippingCoilHC': {
                        title: '分闸线圈(TC)(电保持无此项)(10)',
                        type: 'string'
                    },
                    'secondConnector': {
                        title: '二次接线(11)',
                        type: 'string',
                        required: true
                    },
                    'reportLang': {
                        title: '铭牌报告语言(12)',
                        type: 'string',
                        required: true
                    },
                    'vehicleType': {
                        title: '底盘车类型(13)',
                        type: 'string'
                    },
                    'vehicleTypeCurrent': {
                        title: '底盘车操作电压(电动专用)(14)',
                        type: 'string'
                    },
                    'groundingMethod': {
                        title: '接地方式(15)',
                        type: 'string'
                    },
                    'breakType': {
                        title: '熔断器类型(16)',
                        type: 'string',
                        'default': 'DIN L=292mm'
                    },
                    'breakMaxCurrent': {
                        title: '熔断器最大额定电流(17)',
                        type: 'string'
                    },
                    'lockMode': {
                        title: '柜门联锁方式 (18)',
                        type: 'string'
                    },
                    'extraRequirements': {
                        title: '其他特殊要求',
                        type: 'string'
                    },
                    'quantity': {
                        title: '数量',
                        type: 'number'
                    }
                }
            },
            form: [{
                type: "region",
                css: 'max-2',
                title: "基本配置",
                items: [
                    {
                        key: 'productSerialize',
                        titleMap: [
                            { name: 'CBX3-O²', value: 'CBX3-O²' },
                            { name: 'CVX-O²', value: 'CVX-O²' }
                        ],
                        type: 'radios-inline',
                        css: 'cell'
                    }, {
                        key: 'quantity',
                        type: 'number',
                        css: 'cell'
                    },
                    {
                        key: 'installMethod',
                        singleLine: true,
                        titleMap: [
                            { name: 'CBX固定式真空接触器(P=150mm)', value: 'CBX固定式真空接触器(P=150mm)' },
                            { name: 'CVX手车式真空接触器(P=150mm)', value: 'CVX手车式真空接触器(P=150mm)' }
                        ],
                        type: 'radios-inline',
                        css: 'cell2'
                    },
                    {
                        key: 'ratedVoltage',
                        singleLine: true,
                        titleMap: [
                            { name: '7.2kV', value: '7.2kV' },
                            { name: '12kV', value: '12kV' }
                        ],
                        type: 'radios-inline',
                        css: 'cell2'
                    },
                    {
                        key: 'standard',
                        singleLine: true,
                        titleMap: [
                            { name: 'IEC 60470', value: 'IEC 60470' },
                            { name: 'GB/T 14808', value: 'GB/T 14808' }
                        ],
                        type: 'radios-inline',
                        css: 'cell2'
                    },
                    {
                        key: 'electricCurrent',
                        singleLine: true,
                        titleMap: [
                            { name: '400A', value: '400A' }
                        ],
                        type: 'radios-inline',
                        css: 'cell2'
                    },
                    {
                        key: 'maxCurrent',
                        singleLine: true,
                        titleMap: [
                            { name: '250A(7.2kV)', value: '250A(7.2kV)' },
                            { name: '160A(12kV)', value: '160A(12kV)' }
                        ],
                        type: 'radios-inline',
                        css: 'cell2'
                    },
                    {
                        key: 'exceptionCurrent',
                        singleLine: true,
                        titleMap: [
                            { name: '4kA/4s', value: '4kA/4s' }
                        ],
                        type: 'radios-inline',
                        css: 'cell2'
                    },
                    {
                        key: 'keepMethod',
                        singleLine: true,
                        titleMap: [
                            { name: '电保持(E)', value: '电保持(E)' },
                            { name: '机械保持(M)', value: '机械保持(M)' }
                        ],
                        type: 'radios-inline',
                        css: 'cell2'
                    },
                    {
                        key: 'HC',
                        singleLine: true,
                        titleMap: [
                            { name: 'DC220V', value: 'DC220V' },
                            { name: 'DC110V', value: 'DC110V' },
                            { name: 'AC220V', value: 'AC220V' },
                            { name: 'AC110V', value: 'AC110V' },
                            { name: '其它', value: ' ', input: true }
                        ],
                        type: 'radios-inline',
                        css: 'cell2'
                    },
                    {
                        key: 'trippingCoilHC',
                        singleLine: true,
                        titleMap: [
                            { name: 'DC220V', value: 'DC220V' },
                            { name: 'DC110V', value: 'DC110V' },
                            { name: 'AC220V', value: 'AC220V' },
                            { name: 'AC110V', value: 'AC110V' },
                            { name: '其它', value: ' ', input: true }
                        ],
                        type: 'radios-inline',
                        css: 'cell2'
                    },
                    {
                        key: 'secondConnector',
                        singleLine: true,
                        titleMap: [
                            { name: '标准', value: '标准', optional: true },
                            { name: '非标准', value: '非标准', input: true }
                        ],
                        type: 'radios-inline',
                        css: 'cell2'
                    },
                    {
                        key: 'reportLang',
                        singleLine: true,
                        titleMap: [
                            { name: '中文', value: '中文' },
                            { name: '英文', value: '英文' },
                            { name: '其它', value: ' ', input: true }
                        ],
                        type: 'radios-inline',
                        css: 'cell2'
                    }
                ]
            },
                {
                    type: "region",
                    css: 'max-2',
                    title: "可选配置",
                    items: [
                        {
                            key: 'vehicleType',
                            singleLine: true,
                            titleMap: [
                                { name: '手动推进', value: '手动推进' },
                                { name: '电动推进(需额外收费)', value: '电动推进(需额外收费)' }
                            ],
                            type: 'radios-inline',
                            css: 'cell2'
                        },
                        {
                            key: 'vehicleTypeCurrent',
                            singleLine: true,
                            titleMap: [
                                { name: 'DC220V', value: 'DC220V' },
                                { name: 'DC110V', value: 'DC110V' },
                                { name: 'DC48V ', value: 'DC48V ' },
                                { name: '其它', value: ' ', input: true }
                            ],
                            type: 'radios-inline',
                            css: 'cell2'
                        },
                        {
                            key: 'groundingMethod',
                            singleLine: true,
                            titleMap: [
                                { name: '手车底部铜排接地', value: '手车底部铜排接地' },
                                { name: '手车两侧触头接地', value: '手车两侧触头接地' },
                                { name: '其它', value: ' ', input: true }
                            ],
                            type: 'radios-inline',
                            css: 'cell2'
                        },
                        {
                            key: 'breakType',
                            singleLine: true,
                            titleMap: [
                                { name: 'DIN L=292mm', value: 'DIN L=292mm' }
                            ],
                            type: 'radios-inline',
                            css: 'cell2'
                        },
                        {
                            key: 'breakMaxCurrent',
                            singleLine: true,
                            titleMap: [
                                { name: '315A(7.2 kV)', value: '315A(7.2 kV)' },
                                { name: '200A(12 kV)', value: '200A(12 kV)' },
                                { name: '其它', value: ' ', input: true }
                            ],
                            type: 'radios-inline',
                            css: 'cell2'
                        },
                        {
                            key: 'lockMode',
                            singleLine: true,
                            titleMap: [
                                { name: '关门联锁', value: '关门联锁' },
                                { name: '非关门联锁', value: '非关门联锁' }
                            ],
                            type: 'radios-inline',
                            css: 'cell2'
                        }]
                },
                {
                    type: "region",
                    css: 'max-2',
                    title: "特殊配置",
                    items: [
                        {
                            key: 'extraRequirements',
                            title: '其他特殊要求',
                            type: "textarea",
                            singleLine: true,
                            css: 'cell2'
                        }
                    ]
                }],
            model: {},
            loadValidationScript: function () {
                var model = {};
                var ctx = new context($scope, true, 'model');
                $scope['destroyWatches'] = ctx.destroyWatches;
                requirejs(['plugins/$default/pages/validation.valid.js'], function (script) {
                    ctx.destroyWatches();
                    if (angular.isFunction(script)) {
                        script.apply(ctx);
                    }
                    $timeout(function () {
                        ctx.enableSetValue();
                    }, 500);
                });
                // $http.jsonp('http://office.yes-soft.cn:9600/api/validation?callback=JSON_CALLBACK').success(function (res) {
                //     ctx.destroyWatches();
                //     if (angular.isFunction(res.script)) {
                //         res.script.apply(ctx);
                //     }
                //     $timeout(function () {
                //         ctx.enableSetValue();
                //     }, 500);
                // }).error(function (err) {
                //     console.log("error...", err);
                // });
            }
        };
        angular.extend($scope, view);
        $scope.init();
    };
    controller.$inject = ['$scope', 'utils', 'context', '$http', '$timeout', '$ocLazyLoad'];
    angular.module('app').controller('app.default.validation', controller);
} ());