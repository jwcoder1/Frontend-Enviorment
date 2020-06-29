(function (window, angular) {

    window.application = {
        bootstrap: function (settings) {

            if (application.plugin) {

                var defaultName = settings.pluginDefaultName;
                angular.extend(settings, application.plugin);
                if (defaultName) {
                    settings.pluginDefaultName = defaultName;
                }
            }

            settings.templates = angular.extend({
                'masterPage': 'plugins/' + settings.pluginDefaultName + '/pages/master.html', //根布局母模版
                'login': 'plugins/' + settings.pluginDefaultName + '/pages/login.html', //登录页面模版
                'home': 'plugins/' + settings.pluginDefaultName + '/pages/default.html' //首页
            }, settings.templates);


            settings.routers = {
                'app': {
                    url: '',
                    templateUrl: settings.templates.masterPage,
                    abstract: true,
                    controller: 'app.master',
                    dependencies: [
                        settings.templates.masterPage.replace(".html", "")
                    ]
                },
                'login': {
                    url: '/login',
                    templateUrl: settings.templates.login,
                    controller: "app.login",
                    dependencies: [
                        settings.templates.login.replace(".html", "")
                    ]
                },
                'app.home': {

                    url: '/home',
                    views: {
                        "content": {
                            templateUrl: function () {
                                return settings.templates.home;
                            }
                        }
                    },
                    dependencies: [
                        settings.templates.home.replace(".html", "")
                    ]
                },
                'app.list': {
                    url: '/:module/:page',
                    views: {
                        "content": {
                            templateUrl: function () {
                                return settings.templates.custom;
                            }
                        }
                    },
                    dependencies: [
                        'plugins/{$module}/pages/{$page}'
                    ]
                },
                'app.list.action': {
                    url: '/:action',
                    views: {
                        "content": {
                            templateUrl: function () {
                                return settings.templates.custom;
                            }
                        }
                    },
                    dependencies: [
                        'plugins/{$module}/pages/{$page}'
                    ]
                }
            };

            settings.queryPool = {};

            angular.module('app.settings', [
                'infrastructure',
                'base.utils',
                'base.ui',
                'ui.select',
                'base.ui.ext',
                'base.grid',
                'ui.router',
                'oc.lazyLoad',
                'ngSanitize',
                'ngDialog',
                //'ngAnimate',
                'angularFileUpload',
                'toastr',
                'pascalprecht.translate',
                'schemaForm'
            ]);

            angular.module('base.ui.ext', [
                'ui.select'
            ]);

            angular.module('base.grid', [
                'ui.grid',
                'ui.grid.selection',
                'ui.grid.resizeColumns',
                'ui.grid.pagination',
                'ui.grid.autoResize',
                'ui.grid.exporter',
                'ui.grid.moveColumns',
                'ui.grid.grouping',
                'ui.grid.edit',
                'ui.grid.cellNav',
                'ui.grid.rowEdit'
            ]);

            /**
             * 自动路由设置模版
             * params 地址段按长度匹配不同的路由
             * @returns {*}
             */
            function setPageTemplate(params) {

                var routerCases = {
                    1: ['plugins', settings.pluginDefaultName, 'pages', params.name].join('/'),  // 如 /dashboard
                    2: ['plugins', params.module, 'pages', params.page].join('/'), // 如 base/account
                    3: ['plugins', params.module, 'pages', params.page, params.action].join('/') //如 base/account/detail
                };

                var keys = Object.keys(params);
                if (keys.length) {
                    settings.templates.custom = routerCases[Object.keys(params).length] + ".html";
                }
            }

            /**
             * 初始化路由
             * @param settings
             * @param $stateProvider
             * @param $urlRouterProvider
             */
            function initRouters(settings, $stateProvider, $urlRouterProvider) {
                if (settings.routers) {
                    angular.forEach(settings.routers, function (route, name) {

                        if (route.dependencies) {
                            route.resolve = resolves(route.dependencies);
                        }
                        $stateProvider.state(name, route);
                    });
                }
                if (settings.html5Mode) {
                    $locationProvider.html5Mode({
                        enabled: true
                    });
                }
                $urlRouterProvider.otherwise(settings.otherwise);
            }

            /**
             * 处理异步加载依赖的脚本
             * @param dependencies
             * @returns {{resolver: *[]}|*}
             */
            function resolves(dependencies) {


                var definition;
                definition = {
                    resolver: ['$ocLazyLoad', '$stateParams', 'settings',
                        function ($ocLazyLoad, $stateParams) {
                            var list = [];

                            angular.forEach(dependencies, function (dep) {
                                for (var key in $stateParams) {
                                    if ($stateParams.hasOwnProperty(key) && $stateParams[key]) {
                                        dep = dep.replace('{$' + key + '}', $stateParams[key]);
                                    }
                                }
                                if (dep.indexOf("{$") < 0)
                                    list.push(dep);
                            });

                            setPageTemplate($stateParams);

                            return $ocLazyLoad.load(list).then(function (res) {

                            }, function (e) {
                                console.log("load error:", e);
                            });
                        }]
                };

                return definition;
            }

            /**
             * 处理别名指令
             * @param configItems
             * @param $compileProvider
             */
            function alias(configItems, $compileProvider) {

                angular.forEach(configItems, function (config, alias) {
                    if (angular.isString(config)) {
                        config = {
                            replace: true,
                            template: config
                        };
                    }
                    $compileProvider.directive(alias, function () {
                        return config;
                    });
                });
            }


            function snakeCase(name, separator) {
                separator = separator || '_';
                return name.replace(/[A-Z]/g, function (letter, pos) {
                    return (pos ? separator : '') + letter.toLowerCase();
                });
            }

            function camelCase(s) {
                s = s || "";
                return s.trim().replace(/(\-|_|\s)+(.)?/g, function (mathc, sep, c) {
                    return (c ? c.toUpperCase() : '');
                });
            }

            function registerSchemaFormComponent(provider, name, tplUrl) {

                provider.addMapping(
                    'bootstrapDecorator',
                    name,
                    tplUrl
                );
                provider.createDirective(
                    name,
                    tplUrl
                );
            }

            function registerSchemaForms(provider) {

                angular.forEach(settings.schemaFormComponents, function (items, key) {
                    angular.forEach(items, function (item) {

                        registerSchemaFormComponent(provider, camelCase(key + '-' + item), 'plugins/' +
                            key + '/templates/schema-form/' + snakeCase(item, '-') + '.html');
                    });
                });

                var baseSchemaForms = [
                    'group',
                    'region',
                    'select-multiple',
                    'select2',
                    'select',
                    'editor',
                    'tabs',
                    'gallery',
                    'textarea',
                    'date-picker',
                    'date-time-picker',
                    'date-range-picker',
                    'checkboxes-inline',
                    'label',
                    'uploader',
                    'columns',
                    'table',
                    'tablerow',
                    'arrayschema',
                    'arrayschemarow'
                ];

                angular.forEach(baseSchemaForms, function (item) {
                    registerSchemaFormComponent(provider, item,
                        'ui/templates/forms/' + snakeCase(item, '-') + '.html');
                });
            }

            function registerQueryForms() {
                angular.forEach(settings.queryFormComponents, function (items, key) {
                    angular.forEach(items, function (item) {
                        registerQueryFormComponent(camelCase(key + '-' + item), 'plugins/' +
                            key + '/templates/query-form/' + snakeCase(item, '-') + '.html');
                    });
                });
            }

            function registerQueryFormComponent(name, tplUrl) {
                settings.queryPool[name] = tplUrl;
            }

            function registerComponents() {
                var components = [];
                angular.forEach(settings.components, function (items, key) {
                    angular.forEach(items, function (item) {
                        components.push('plugins/' + key + '/directives/' + item);
                    });
                });

                angular.forEach(settings.filters, function (items, key) {
                    angular.forEach(items, function (item) {
                        components.push('plugins/' + key + '/filters/' + item);
                    });
                });

                angular.forEach(settings.services, function (items, key) {
                    angular.forEach(items, function (item) {
                        components.push('plugins/' + key + '/services/' + item);
                    });
                });

                return components;
            }

            angular.module('app').config(
                function (settingsProvider,
                    $ocLazyLoadProvider,
                    $stateProvider,
                    $compileProvider,
                    $translateProvider,
                    $translatePartialLoaderProvider,
                    schemaFormDecoratorsProvider,
                    $httpProvider,
                    ngDialogProvider,
                    $urlRouterProvider) {

                    $ocLazyLoadProvider.config({
                        jsLoader: requirejs,
                        debug: false
                    });

                    ngDialogProvider.setDefaults({
                        className: 'ngdialog-theme-plain',
                        plain: false,
                        showClose: true,
                        closeByDocument: false,
                        closeByEscape: true
                    });

                    $httpProvider.interceptors.push('authorityInterceptor');
                    $httpProvider.interceptors.push('operationInterceptor');

                    $translateProvider.useLoader('$translatePartialLoader', {
                        urlTemplate: 'plugins/{part}/i18n/{lang}.json'
                    });
                    $translatePartialLoaderProvider.addPart(settings.pluginDefaultName);
                    $translateProvider.preferredLanguage('zh-CN');
                    $translateProvider.useSanitizeValueStrategy(null);
                    settingsProvider.setSettings(settings);

                    registerSchemaForms(schemaFormDecoratorsProvider);
                    registerQueryForms();
                    initRouters(settings, $stateProvider, $urlRouterProvider);
                    alias(settings.alias, $compileProvider);

                    if (!$httpProvider.defaults.headers.get) {
                        $httpProvider.defaults.headers.get = {};
                    }

                    //disable IE ajax request caching
                    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
                    // extra
                    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
                    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
                });

            require.config({
                baseUrl: settings.baseUrl || "",
                urlArgs: "bust=" + (new Date()).getTime()
            });

            var components = registerComponents();
            require(components, function () {
                angular.bootstrap(document, ['app']);
            });
        }
    };

} (window, angular));