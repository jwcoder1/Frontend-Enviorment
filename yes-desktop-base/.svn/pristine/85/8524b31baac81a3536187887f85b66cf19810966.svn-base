(function() {
    var settings = {
        host: 'http://localhost:8080', //当前API调用的主机头
        mock: false, //如果是mock状态则API调取得静态的目录data下的json
        debug: true, //如启用debug 则服务log 输出日志
        apiPrefix: "qw_erp_3_0/api", //api调用的地址前缀
        language: 'zh-CN', //当前语言的设定
        pageSize: 30, //分页默认大小,
        uiGrid: {
            enableGridMenu: true, //启用表格菜单
            exporterMenuCsv: true, //启用导出CSV的菜单
            exporterMenuPdf: false, //启用导出PDF的菜单
            enablePaginationControls: true, //启用表格自带的分页控件
            enableFiltering: false, //启用表格内的查询过滤输入框
            enableRowHeaderSelection: true, //启用左侧选择栏
            exporterOlderExcelCompatibility: true, //导出兼容旧版本excel的格式
            useExternalPagination: true, //使用服务端分页,
            paginationPageSizes: [30, 60, 90], //表格分页页大小选项
            paginationPageSize: 30, //表格分页页大小
            minRowsToShow: 12,
            rowHeight: 28,
            virtualizationThreshold: 1000 //虚拟化阈值
        },
        company: {
            logoTitle: "QW",
            comAlias: "青维科技"
        },
        ui: {
            openWithTabs: !window.noTabs && true, //默认打开方式为tab  
            toolbar: !window.noToolbar && false //默认有toolbar  
        },
        logo: "plugins/home/assets/images/logo.png",
        logoTitle: "QW",
        otherwise: 'home',
        templates: {},
        plugins: {},
        components: {},
        queryFormComponents: {},
        schemaFormComponents: {},
        pluginDefaultName: '$default',
        getByAttIdUrl: "/base/attachment/getByAttId",
        getallByAttIdUrl: "/base/attachment/getallByAttId",
        uploadUrl: "/base/attachment/upload",
        downloadUrl: "/base/attachment/download",
        getUuid: "/base/attachment/getUuid",
        delByUid: "/base/attachment/"
    };

    settings.templates = {
        'masterPage': 'plugins/home' + (settings.ui.openWithTabs ? '/pages/master.tabs.html' : '/pages/master.html'), //根布局母模版
        'login': 'plugins/home' + '/pages/login.html', //登录页面模版
        'home': 'plugins/home' + (settings.ui.openWithTabs ? '/pages/tabs.html' : '/pages/home.html') //首页
    };

    $(document).attr("title", settings.company.comAlias);


    if (window.UEDITOR_CONFIG) {
        var rootUrl = '';
        var selfHost = location.protocol + "//" + location.host;
        var host = settings.host == "self" ? selfHost : settings.host;
        if (settings.apiPrefix) {
            rootUrl = [host, settings.apiPrefix].join('/');
        } else {
            rootUrl = host;
        }
        window.UEDITOR_CONFIG.serverUrl = [rootUrl, "controller.jsp"].join('/');
    }


    var selfHost = location.protocol + "//" + location.host;
    var host = settings.host == "self" ? selfHost : settings.host;
    if (settings.apiPrefix) {
        settings.rootUrl = [host, settings.apiPrefix].join('/');
    } else {
        settings.rootUrl = host;
    }

    application.bootstrap(settings);
}());