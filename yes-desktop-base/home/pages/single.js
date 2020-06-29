angular.module('app').controller('single', function($scope, $http, getBaseView, settings, context) {

    var scope = $scope;
    scope.originModel = angular.copy(scope.model);
    scope.detail = {
        schema: {
            type: "object",
            "properties": {
                readonly: {
                    title: '只读',
                    type: "string",
                    readonly: true,
                    default: "122224"
                },
                input: {
                    title: "文本",
                    type: "string",
                    required: true
                },
                datePicker: {
                    title: "日期选择",
                    type: "string",
                    required: true
                },
                dateTimePicker: {
                    title: "时间选择",
                    type: "string",
                    required: true
                },
                dateRangePicker: {
                    title: "日期范围",
                    type: "string",
                    required: true
                },
                password: {
                    title: "密码",
                    type: "string",
                    required: true
                },
                select: {
                    title: "下拉选择",
                    type: "string",
                    required: true
                },
                selectMultiple: {
                    title: "下拉多选",
                    type: "string",
                    required: true
                },
                checkbox: {
                    title: "单个复选框",
                    type: "boolean",
                    required: true
                },
                checkboxesInline: {
                    title: "复选框组",
                    type: "boolean",
                    required: true
                },
                textarea: {
                    title: "长文本",
                    type: "string",
                    required: true
                }
            }
        },
        form: [{
            type: "group",
            title: "基本信息",
            items: [{
                key: 'readonly',
                placeholder: "请输入"
            }, {
                key: 'input',
                placeholder: '请输入用户名'
            }, {
                key: 'datePicker',
                type: "date-picker"
            }, {
                key: 'dateTimePicker',
                type: "date-time-picker"
            }, {
                key: 'dateRangePicker',
                from: "createdAt$gte",
                to: "createdAt$lte",
                // options: {
                //     minDate: "2016-03-03",
                //     maxDate: "2016-12-03",
                //     dateLimit: {
                //         "days": 7
                //     }
                // },
                type: "date-range-picker"
            }, {
                key: 'select',
                type: 'select',
                titleMap: [{
                    value: 1,
                    name: "选择项1"
                }, {
                    value: 0,
                    name: "选择项2"
                }]
            }, {
                key: "selectMultiple",
                type: "select-multiple",
                htmlClass: 'single-line',
                titleMap: [{
                    name: '管理员1',
                    value: 'admin1'
                }, {
                    name: '普通用户2',
                    value: 'user2'
                }, {
                    name: '普通用户3',
                    value: 'user3'
                }, {
                    name: '普通用户4',
                    value: 'user4'
                }, {
                    name: '普通用户5',
                    value: 'user5'
                }, {
                    name: '普通用户6',
                    value: 'user6'
                }, {
                    name: '普通用户7',
                    value: 'user7'
                }, {
                    name: '普通用户8',
                    value: 'user8'
                }, {
                    name: '普通用户9',
                    value: 'user9'
                }, {
                    name: '普通用户10',
                    value: 'user10'
                }, {
                    name: '普通用户11',
                    value: 'user11'
                }, {
                    name: '普通用户12',
                    value: 'user12'
                }]
            }, {
                key: 'checkbox',
                type: 'checkbox'
            }, {
                key: 'checkboxesInline',
                type: 'checkboxes-inline',
                titleMap: [{
                    name: "基本户"
                }, {
                    name: "POS卡"
                }, {
                    name: "其他"
                }]
            }, {
                key: 'textarea',
                type: 'textarea',
                htmlClass: 'single-line'
            }]
        }, {
            type: "group",
            title: "扩展信息",
            items: [{
                key: 'activeCode',
                title: '激活码',
                placeholder: "请输入您的激活码"
            }]
        }, {
            type: "group",
            title: "其他信息",
            items: [{
                key: 'other',
                title: '备用邮箱',
                placeholder: "请输入您的备用邮箱"
            }]
        }]
    };


    scope.filters = [{
        type: "input",
        name: "username$match",
        label: "用户名"
    }, {
        type: "select",
        name: "type$eq",
        label: "账号类型",
        titleMap: [{
            name: 'admin',
            value: 'admin'
        }, {
            name: '普通用户',
            value: 'user'
        }]
    }, {
        type: "dateRangePicker",
        name: "createdAtRang",
        label: "创建日期"
    }, {
        type: "input",
        name: "mobile$match",
        label: "手机号码"
    }];
    scope.form = scope.detail

    var ctx = new context(scope,true);
    function watch() {
            var self = this,
            watch = this.watch,
            getValue = this.getValue,
            setValue = this.setValue,
            setStatus = this.setStatus,
            calculateQuantity = this.calculateQuantity,
            setOptionStatus = this.setOptionStatus;


        watch('version', 'delFlag', 'enable').change(function (v1, v2, v3) {
            console.log("value1", v1);
            console.log("value2", v2);
            console.log("value3", v3)
        });

        //1、(2)中“CBX固定式真空接触器(P=150mm)”在(1)中选择“CBX3-O2”时默认选此项。
        //(2)中“CVX手车式真空接触器(P=150mm)”在(1)中选择“CVX-O2”时默认选此项。

        // watch('productSerialize').change(function (selectedValue) {
        //     setValue('installMethod', {
        //         'CBX3-O²': 'CBX固定式真空接触器(P=150mm)',
        //         'CVX-O²': 'CVX手车式真空接触器(P=150mm)'
        //     }, selectedValue);
        //     setStatus('installMethod', 'readonly', true);
        // });


        // setOptionStatus("ratedVoltage", "12kV", "visible", false);
        // setStatus("vehicleType", "visible", false);
    }
    watch.apply(ctx);
});
