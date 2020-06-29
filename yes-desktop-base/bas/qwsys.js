angular.module('app.core.qwsys', ["app.core.prosys"])
    .constant('sysconstant', {
        SYS_COIN: 'RMB', //预设币别
        SYS_WAREO: "", //预设出货仓库
        SYS_TAX: "A", //预设税别
        SYS_PAY: "2", //预设付款条件
        CUS_NAME: "乔伟资讯有限公司"
    })
    .factory('qwsys', ['utils', 'ngDialog', 'settings', '$sce', 'prosys', 'qwconfig', 'toastr', '$location', '$ocLazyLoad', 'FileUploader',
        function(utils, ngDialog, settings, $sce, prosys, qwconfig, toastr, $location, $ocLazyLoad, FileUploader) {
            var sys = {
                getsysvar: function(var_type, var_name) { //获取汇率
                    var sysvar = {
                        var_type: var_type,
                        var_name: var_name
                    }
                    return utils.ajax({
                        method: "POST",
                        url: "base/sysvar/getsysvar",
                        data: sysvar,
                        mockUrl: "bas/bastype/bastype.del.json"
                    })
                },
                exportReportPdf: function(requestMapping) { //获取产品单位转换系数
                    ngDialog.open({
                        className: 'ngdialog-print',
                        template: 'plugins/bas/templates/print.detail.html',
                        controller: function($scope) {
                            var selfHost = location.protocol + "//" + location.host;
                            var host = settings.host == "self" ? selfHost : settings.host;
                            var rootUrl = host;
                            if (settings.apiPrefix) {
                                rootUrl = [host, settings.apiPrefix].join('/');
                            } else {
                                rootUrl = host;
                            }

                            var url = rootUrl + requestMapping;
                            $scope.reporturl = $sce.trustAsResourceUrl(url);

                        }
                    })
                },
                exportExcel: function(url, filter, page, filename) {
                    toastr.info("EXCEL下载中....");
                    url += "?page=" + (page.page ? page.page : 0) + "&size=" + (page.size ? page.size : 20) + "&sort=" + (page.sort ? page.sort : "");
                    return utils.ajax({
                        method: 'POST',
                        responseType: "arraybuffer",
                        url: url,
                        data: filter,
                        mockUrl: "plugins/data/custheader.json"
                    }).then(function(data) {
                        var blob = new Blob([data.data], { type: "application/vnd.ms-excel" });
                        var objectUrl = URL.createObjectURL(blob);
                        var aForExcel = $("<a><span class='forExcel'>下载excel</span></a>").attr("href", objectUrl);
                        if (filename) {
                            aForExcel.attr("download", filename);
                        }
                        $("body").append(aForExcel);
                        $(".forExcel").click();
                        aForExcel.remove();
                    });
                },
                exportExcel: function(url, gridhead, filter, page, filename) {
                    var exceltitle = {};
                    if (gridhead) {
                        angular.forEach(gridhead, function(col, key) {
                            var isget = true;
                            if (col.hasOwnProperty("excel") && !col.excel) {
                                isget = false;
                            }

                            var mapval = "";
                            if (col.titleMap) {
                                mapval = {};
                                col.titleMap.forEach(element => {
                                    mapval[element.value] = element.name;
                                });
                            }
                            if (isget) {
                                exceltitle[col.name] = {
                                    name: col.displayName,
                                    titleMap: mapval
                                };
                            }

                        });
                    }
                    if (!filter.exceltitle) {
                        filter.exceltitle = exceltitle;
                    }

                    toastr.info("EXCEL下载中....");
                    url += "?page=" + (page.page ? page.page : 0) + "&size=" + (page.size ? page.size : 20) + "&sort=" + (page.sort ? page.sort : "");
                    return utils.ajax({
                        method: 'POST',
                        responseType: "arraybuffer",
                        url: url,
                        data: filter,
                        mockUrl: "plugins/data/custheader.json"
                    }).then(function(data) {
                        var blob = new Blob([data.data], { type: "application/vnd.ms-excel" });
                        var objectUrl = URL.createObjectURL(blob);
                        var aForExcel = $("<a><span class='forExcel'>下载excel</span></a>").attr("href", objectUrl);
                        if (filename) {
                            aForExcel.attr("download", filename);
                        }
                        $("body").append(aForExcel);
                        $(".forExcel").click();
                        aForExcel.remove();
                    });
                },
                gettoday: function() { //获取当天日期
                    return new moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
                },
                getBeforeCurrentMonthday: function() { //获取昨天日期
                    var date = new Date();
                    var oneDay = 1000 * 60 * 60 * 24;
                    return new moment(new Date(date - oneDay)).format("YYYY-MM-DD");
                },
                getCurrentMonthFirst: function() { //获取当月第一天
                    var date = new Date();
                    var currentMonth = date.getMonth();
                    var previousMonth = --currentMonth;
                    return new moment(new Date(date.getFullYear(), previousMonth, 1)).format("YYYY-MM-DD");


                    // var date = new Date();
                    // date.setDate(1);
                    // return new moment(date).format("YYYY-MM-DD");
                },
                getCurrentMonthLast: function() { //获取当月最后一天
                    //   var date = new Date();
                    //   var currentMonth = date.getMonth();
                    // var previousMonth = --currentMonth;
                    //    return new moment(new Date(date.getFullYear(), currentMonth, 25)).format("YYYY-MM-DD");

                    var date = new Date();
                    var currentMonth = date.getMonth();
                    var nextMonth = +currentMonth;
                    var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
                    var oneDay = 1000 * 60 * 60 * 24;
                    return new moment(new Date(nextMonthFirstDay - oneDay)).format("YYYY-MM-DD");
                },
                getPreviousMonthFirst: function() { //获取上月第一天

                    // var date = new Date();
                    // var currentMonth = date.getMonth();
                    // var previousMonth = --currentMonth;
                    // previousMonth = --previousMonth;
                    // return new moment(new Date(date.getFullYear(), previousMonth, 1)).format("YYYY-MM-DD");
                    var date = new Date();
                    var currentMonth = date.getMonth();
                    var previousMonth = --currentMonth;
                    return new moment(new Date(date.getFullYear(), previousMonth, 1)).format("YYYY-MM-DD");
                },
                getPreviousMonthLast: function() { //获取上月最后一天
                    var date = new Date();
                    var currentMonth = date.getMonth();
                    var nextMonthFirstDay = new Date(date.getFullYear(), currentMonth, 1);
                    var oneDay = 1000 * 60 * 60 * 24;
                    return new moment(new Date(nextMonthFirstDay - oneDay)).format("YYYY-MM-DD");

                },
                getdocuments: function(type, para, fn) { //获取多笔数据
                    var dialogConfig = null;
                    //两种配置方式,一种直接传实际的配置值,另一种通过qwconfig里的type去找
                    if (typeof type == "string") {
                        dialogConfig = qwconfig.dialog[type];
                    } else {
                        dialogConfig = type;
                    }

                    if (!dialogConfig) {
                        toastr.info("请配置类别为[" + type + "]查询信息!");
                        return
                    }

                    ngDialog.open({
                        className: dialogConfig.ngdialogSize,
                        template: 'plugins/bas/components/readdocuments.html',
                        controller: function($scope) {
                            $scope.para = para;
                            $scope.config = dialogConfig;
                            $scope.action = {
                                lovback: function(rows) {
                                    if (angular.isFunction(fn)) {
                                        fn(rows);
                                    }
                                    $scope.closeThisDialog();

                                },
                                lovcancel: function() {
                                    $scope.closeThisDialog();
                                }
                            }
                        }
                    })
                },
                getdocument: function(type, para, fn) { //获取多笔数据
                    var dialogConfig = null;
                    //两种配置方式,一种直接传实际的配置值,另一种通过qwconfig里的type去找
                    if (typeof type == "string") {
                        dialogConfig = qwconfig.dialog[type];
                    } else {
                        dialogConfig = type;
                    }

                    if (!dialogConfig) {
                        toastr.info("请配置类别为[" + type + "]查询信息!");
                        return
                    }

                    ngDialog.open({
                        className: dialogConfig.ngdialogSize,
                        template: 'plugins/bas/components/readdocument.html',
                        controller: function($scope) {
                            $scope.para = para;
                            $scope.config = dialogConfig;
                            $scope.action = {
                                lovback: function(rows) {
                                    if (angular.isFunction(fn)) {
                                        fn(rows);
                                    }
                                    $scope.closeThisDialog();

                                },
                                lovcancel: function() {
                                    $scope.closeThisDialog();
                                }
                            }
                        }
                    })
                },
                geteditdocuments: function(routename, sizeClass, fn) { //获取多笔数据

                    var getPageFilePath = function(params) {
                        switch (params.length) {
                            case 1:
                                return ['plugins', 'infrastructure', 'pages', params[0]].join('/');
                                break;
                            case 2:
                                return ['plugins', params[0], 'pages', params[1]].join('/');
                                break;
                            case 3:
                                return ['plugins', params[0], 'pages', params[1], params[2]].join('/');
                                break;
                            default:
                                return "";
                        }
                    }

                    var params = routename.split('\/');
                    var filePath = getPageFilePath(params);

                    $ocLazyLoad.load(filePath).then(function() {
                        ngDialog.open({
                            className: sizeClass,
                            template: filePath + ".html",
                            controller: function($scope) {
                                $scope.dialogaction = {
                                    back: function(row) {
                                        if (angular.isFunction(fn)) {
                                            fn(row);
                                        }
                                        $scope.closeThisDialog();
                                    },
                                    save: function(row) {
                                        if (angular.isFunction(fn)) {
                                            fn(row);
                                        }

                                    },
                                    cancel: function() {
                                        $scope.closeThisDialog();
                                    }
                                }
                            }
                        })
                    })




                },
                getlovrecord: function(filter, pageable, type) {
                    var parastr = "",
                        tag = "";
                    if (pageable) {
                        if (pageable.page) {
                            parastr += tag + "page=" + pageable.page;
                            tag = "&"
                        }

                        if (pageable.size) {
                            parastr += tag + "size=" + pageable.size;
                            tag = "&"
                        }

                        if (pageable.sort) {
                            parastr += tag + "sort=" + pageable.sort;
                            tag = "&"
                        }

                    }
                    parastr = (parastr ? "?" : "") + parastr;
                    var config = qwconfig.lov[type];

                    return utils.ajax({
                        method: 'POST',
                        url: config.queryUrl + parastr,
                        mockUrl: "plugins/" + config.queryUrl + "/article.json",
                        data: filter
                    })
                },
                exportReportPdfurl: function(reportname, requestMapping, para) { //报表打印
                    if (!para) {
                        para = {}
                    }
                    para.reportname = reportname;
                    var selfHost = location.protocol + "//" + location.host;
                    var host = settings.host == "self" ? selfHost : settings.host;
                    var rootUrl = host;
                    if (settings.apiPrefix) {
                        rootUrl = [host, settings.apiPrefix].join('/');
                    } else {
                        rootUrl = host;
                    }
                    para.dataurl = rootUrl + "/" + requestMapping;

                    var printDialog = true;
                    if (para.hasOwnProperty("isDialog")) {
                        printDialog = para.isDialog;
                    } else {
                        para.isDialog = true;
                    }



                    if (printDialog) {
                        var urlpara = "";
                        for (var p in para) {
                            if (para[p] != null) {
                                urlpara = urlpara + (urlpara ? "&" : "") + p + "=" + para[p];
                            }
                        }
                        var url = rootUrl + "/printpdf?" + urlpara;
                        ngDialog.open({
                            className: 'ngdialog-print',
                            template: 'plugins/bas/templates/print.detail.html',
                            controller: function($scope) {
                                $scope.reporturl = $sce.trustAsResourceUrl(url);
                            }
                        })
                    } else {
                        utils.ajax({
                            method: 'GET',
                            url: "printpdf",
                            params: para,
                            mockUrl: "plugins/data/purven.detail.json"
                        }).then(function(res) {
                            toastr.info("打印中,请稍后!");
                        });
                    }
                },
                print: function(url, paras) {
                    var iframe = document.getElementById('print');
                    paras.isGetData = false;
                    // 打印监听
                    if (iframe.attachEvent) {
                        iframe.attachEvent("onload", function() {
                            pdfprint();
                        });
                    } else {
                        iframe.onload = function() {
                            pdfprint();
                        };
                    }
                    angular.element("[id='cgbusy']>.cg-busy").removeClass('ng-hide');

                    function pdfprint() {
                        setTimeout(function() {
                            iframe.contentWindow.print();
                            angular.element("[id='cgbusy']>.cg-busy").addClass('ng-hide');
                        });
                    }
                    var printurl = settings.rootUrl + url + "?t=" +
                        new Date().getTime();
                    var oReq = new XMLHttpRequest();
                    oReq.open("POST", printurl, true);
                    oReq.responseType = 'blob';
                    oReq.setRequestHeader('Content-type', 'application/json');
                    // 输出打印
                    oReq.onload = function(oEvent) {
                        var blob = this.response;
                        if (!paras.hasOwnProperty("isDialog")) {
                            paras.isDialog = true;
                        }
                        angular.element("[id='cgbusy']>.cg-busy").addClass('ng-hide');
                        if (paras.hasOwnProperty("isDialog") && paras.isDialog) {
                            iframe.src = URL.createObjectURL(blob);
                        }

                    }
                    oReq.send(JSON.stringify(paras));
                },
                getarraycol: function(array, column) { //获取当月第一天
                    var ret = [];
                    array.forEach(element => {
                        angular.forEach(element, function(value, key) {
                            if (key == column) {
                                ret.push(value)
                            }
                        })

                    });
                    return ret;
                },
                getarraycolval: function(array, columnname, columnval) { //获取当月第一天
                    var ret = [];
                    array.forEach(element => {
                        item = {};
                        angular.forEach(element, function(val, key) {
                            if (key == columnname) {
                                item.name = val;
                            }
                            if (key == columnval) {
                                item.value = val;
                            }
                        })
                        ret.push(item);

                    });
                    return ret;
                },
                changearray: function(array, keycol, titlecol, valcol) { //获取当月第一天
                    var colmsg = {};
                    var datamsg = {};

                    array.forEach(element => {
                        angular.forEach(element, function(val, key) {
                            if (key == titlecol) {
                                colmsg[val] = 0;
                            }
                        })
                    });
                    array.forEach(element => {
                        if (!datamsg[element[keycol]]) {
                            datamsg[element[keycol]] = angular.copy(colmsg);
                        }
                        datamsg[element[keycol]][element[titlecol]] = element[valcol];
                    })
                    return datamsg;
                },
                importExcel: function(posturl, modelurl, fn) { //导入excel
                    var url = settings.rootUrl + "/" + posturl;

                    ngDialog.open({
                        className: "ngdialog-sm",
                        template: 'plugins/bas/components/importExcel.html',
                        controller: function($scope) {
                            if (modelurl) {
                                $scope.downfile = settings.rootUrl.replace("api", "") + modelurl;
                            }
                            $scope.uploader = new FileUploader({
                                url: url,
                                autoUpload: true
                            });
                            $scope.uploader.onSuccessItem = function(item, res, status, headers) {
                                $scope.action.back();
                            };
                            $scope.action = {
                                back: function() {
                                    if (angular.isFunction(fn)) {
                                        fn();
                                    }
                                    $scope.closeThisDialog();
                                },

                            }
                        }
                    })
                }

            }
            sys = angular.extend(sys, prosys);
            return sys;
        }
    ]);