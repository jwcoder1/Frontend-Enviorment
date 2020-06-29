angular.module('app').controller('app.master',
    function($scope, $location, $http, tree, utils, $timeout, settings, $ocLazyLoad, ngDialog, toastr) {

        function setSubMenu(menu) {
            var tree = [];
            if (angular.isObject(menu)) {
                tree.push({
                    name: menu.name,
                    children: menu.children
                });
                $scope.treeSource = tree;
                //$scope.treeSource = menu.children;
            }
        }

        function walkTree(menus, parent) {
            angular.forEach(menus, function(item) {
                if (parent)
                    item.parent = parent;

                walkTree(item.children, item);
            })
        }

        function walkParent(menu) {
            if (menu.parent) {
                menu.parent.expanded = true;
                walkParent(menu.parent);
            }
        }

        function expandedParents() {
            var uri = location.hash.substring(2);

            found = menuStack.filter(function(item) {
                return item.url && item.url.lastIndexOf(uri) > 0;
            });
            if (found.length === 1) {
                walkParent(found[0]);
            } else {
                found = null;
            }
        }

        function getPageFilePath(params) {
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

        $scope.refreshtab = function(tab, para) {
            $scope.$broadcast(tab, para);
        }


        $scope.$on("opencusdetail", function(event, node) {
            console.log('opencusdetail', node.url); //父级能得到值
            renderTabs($ocLazyLoad, node);
        });

        $scope.$on("closepage", function(event, msg) {
            $scope.tabs.forEach(element => {
                if (element.active) {
                    delete $scope.tabs[element.id];
                }
            });
        });



        function renderTabs(loader, node) {

            var parsed = (node.url || "").split('?')[0].replace('#\/', "").replace('#', "");
            var params = parsed.split('\/');

            var filePath = getPageFilePath(params);

            loader.load(filePath).then(function() {

                index++;
                $scope.tabs[index] = {
                    "name": node.name,
                    "id": index,
                    "url": node.url,
                    "content": filePath + ".html",
                    "active": true
                };
                scope.index = index;
                if (node.data) {
                    setTimeout(function() {
                        $scope.$broadcast(node.eventName + index, node.data);
                    }, 1000)
                }

            });
        }

        function openTabWithUrl() {
            var currentUrl = '#' + $location.$$url;

            if (currentUrl !== '#/home') {
                angular.forEach($scope.originMenus, function(ele) {

                    if (ele.url == currentUrl) {
                        renderTabs($ocLazyLoad, ele);
                    }
                })

            }
        }


        var scope = $scope;

        $scope.displayName = "";
        $scope.displayName = localStorage.getItem("displayName");
        if (!localStorage.getItem("signin") && !settings.mock) {
            //   location.href = 'signin.html'
        }

        // 有选项卡时通过url开启页面，打开当页tab

        $scope.$on('$locationChangeSuccess', function() {
            openTabWithUrl()
        });

        // 设置表格行数
        $scope.setMinRowsToShow = function(full, scope) {

            var wW = document.documentElement.clientWidth,
                wH = document.documentElement.clientHeight,
                // 工具栏高度
                toolbarRow = settings.ui.toolbar ? 35 : 0,
                // 查询框高度
                filterRow = $('.tab-pane.active .schema-form-section').height() || $(".content-view .schema-form-section").height();

            setTimeout(function() {

                if (wW < 751 || full) {
                    filterRow = 0;
                }
                var minRowsToShow = Math.floor((wH - filterRow - toolbarRow - 160) / 26);
                minRowsToShow = minRowsToShow > 10 ? minRowsToShow : 10;
                minRowsToShow = minRowsToShow < 20 ? minRowsToShow : 20;
                scope.gridOptions.minRowsToShow = minRowsToShow;
            }, 0);
        };
        // 自适应布局-折叠query-form
        $scope.resize = function(event, full) {
            if (event.type == "click") {
                scope.isCollapsed = !scope.isCollapsed;
            }
            angular.element(window).trigger('resize');
        };
        // 根据数据字典名获取字典值数据
        scope.getDictValue = function(arr) {
            // 如果未加载过dataDict数据，则加载
            function loadDictValue() {
                utils.ajax({
                    method: 'POST',
                    url: "biz/dataDictValue/query",
                    data: {
                        dictID: scope.dataDictEntries[arr[0]]
                    }
                }).then(
                    function(res) {
                        var result = {
                            name: arr[0],
                            data: res.data.body.content
                        };
                        if (!arr[1].length) {
                            arr[1] = 'id';
                        }
                        angular.forEach(result.data, function(ele) {
                            ele.value = ele[arr[1]];
                        })
                        scope.$broadcast('getDictValueSuccess', result);
                    })
            }
            if (!scope.dataDictEntries) {
                utils.ajax({
                    method: 'POST',
                    url: "biz/dataDict/query",
                    data: {}
                }).then(
                    function(res) {
                        scope.dataDictEntries = {};
                        angular.forEach(res.data.body.content, function(ele) {
                            scope.dataDictEntries[ele.name] = ele.id;
                        })
                        loadDictValue();
                    })
            } else {
                loadDictValue();
            }
        }


        $scope.minSize = false;
        var children, menuStack, found;

        menuStack = [];

        $scope.openMethod = "tab";
        $scope.toolbar = settings.ui.toolbar;
        $scope.tabs = {
            0: {
                "name": "首页",
                "id": 0,
                "content": "plugins/home/pages/homepage.html",
                "url": "#home",
                "active": true,
                "closable": true
            }
        };

        // hsu 需要折叠的面板
        var toggledList = ['minSize',
            'showLeft',
            'showRight',
            'showSearchControls',
            'showFooterBarMore'
        ];
        //开关所选面板，关闭其他
        $scope.showThis = function(name, status) {
            angular.forEach(toggledList, function(ele) {
                if (ele !== name) {
                    $scope[ele] = false
                }
            })
            if (typeof(status) == 'boolean') {
                $scope[name] = status;
                if (document.body.clientWidth > 768) {
                    $scope[name] = !status;
                }
            } else {
                $scope[name] = !$scope[name];
            }
        }
        $scope.switchTab = function(tab) {
            $scope.currentTabName = tab.title;
            $(".tab-pane").removeClass("active in")
            $(tab.href).addClass("active in")
            $(".nav-tabs li").removeClass("active")
            $(".nav-tabs li:has(a[href=" + tab.href + "])").addClass("active")
        };

        var index = index || 0;


        $scope.closeTab = function(event, tab) {

            if ($scope.tabs.hasOwnProperty(tab.id)) {
                delete $scope.tabs[tab.id];
            }
        };

        $scope.$on('nav:open-tab', function(event, node) {
            if (document.body.clientWidth < 768) {
                $scope.minSize = false;
            }

            if (!$scope.activenode(node)) {
                renderTabs($ocLazyLoad, node);
            }


        });


        $scope.activenode = function(node) {
            var ret = false;
            angular.forEach($scope.tabs, function(element, key) {
                if (element.url == node.url) {
                    ret = true;
                    element.active = true;
                }
            })

            return ret;


        }


        // 工具栏

        $scope.operations = {
            calculator: {
                name: '计算器',
                color: "#002A7A",
                icon: 'fa-calculator'
            },
            edit: {
                name: "编辑",
                color: "#0095FF",
                icon: 'fa-edit'
            },
            attach: {
                name: "附件",
                color: "#079E5F",
                icon: 'fa-file'
            },
            lockEdit: {
                name: "锁定编辑",
                color: "#01670B",
                icon: 'fa-lock'
            },
            save: {
                name: "保存",
                color: "#BF3E00",
                icon: 'fa-save'
            },
            commit: {
                name: "提交",
                color: "#CF0000",
                icon: 'fa-check'
            },
            cancel: {
                name: "取消提交",
                color: "#810333",
                icon: 'fa-undo'
            },
            create: {
                name: "新建",
                color: "#1F0055",
                icon: 'fa-plus'
            },
            delete: {
                name: "删除",
                color: "#3000B8",
                icon: 'fa-remove'
            }
        };

        // 加载菜单

        $scope.load = function() {
            $scope.menu = {};
            utils.ajax({
                url: 'menus?type=suball',
                mockUrl: 'plugins/$default/data/menus.json'
            }).then(
                function(res) {

                    var temp = [];
                    var items = res.data.body.docs || res.data.body.items || res.data.body;
                    items.forEach(function(item) {
                        if (item.type != "function") {
                            $scope.menu[item.url] = item.name;
                            temp.push(item);
                        }
                    });
                    $scope.menus = tree.initMenus("", temp);
                    setSubMenu($scope.menus[0]);




                    // angular.forEach(data, function(element, index) {
                    //     if (element.type != "function") {
                    //         // element.name = element.nameCn;
                    //         element.parent = element.pid || '';
                    //         element.type = 'menu';
                    //         element.icon = element.icon || 'fa-cog';
                    //         // $scope.menu[item.url] = element.name;
                    //         // temp.push(element);
                    //     }
                    // });
                    data = temp;


                    //  children = children || {};

                    $scope.originMenus = data;
                    //  $scope.menus = tree.initMenus("", data);



                    openTabWithUrl();

                    // setSubMenu($scope.menus[0]);

                    if ($scope.menus.length) {
                        children = $scope.menus;
                        menuStack = tree.buildMenuTree(data);
                        walkTree($scope.menus);
                    }

                    expandedParents();

                    $timeout(function() {
                        angular.element("a[href='#" + location.hash.replace("#/", "") + "'")
                            .parent().addClass('tree-selected');
                    }, 500);
                }
            );


        };

        //操作绑定

        $scope.action = {
            nav: function(item, items, changeSize) {

                angular.forEach(items, function(item) {
                    item.active = false;
                });

                $scope.currentMenu = item;
                item.active = true;
                setSubMenu(item);
                if (changeSize)
                    $scope.minSize = true;
            },
            logout: function() {
                utils.ajax({
                    url: "logout"
                }).then(function(res) {
                    localStorage.removeItem("displayName");
                    //$location.path("/login");
                    location.reload();
                }, function(error) {
                    location.reload();
                });
            },
            updatePassword: function() {
                ngDialog.open({
                    template: "plugins/base/pages/updatePassword.html",
                    controller: function($scope) {
                        $scope.model = {
                            "oldPassword": "",
                            "newPassword": ""
                        };
                        $scope.username = localStorage.getItem("username");
                        $scope.save = function(form) {
                            if ($scope.model.newPassword.length < 5 || $scope.model.newPassword.length > 18) {
                                toastr.warning("新密码必须为5-18位");
                                return;
                            }
                            if ($scope.model.newPassword == $scope.model.oldPassword) {
                                toastr.warning("新密码不能与旧密码一样");
                                return;
                            }
                            utils.async("post", "setpassword", $scope.model).then(function(res) {
                                    ngDialog.closeAll();
                                    toastr.success("密码修改成功,3秒后自动退出...");
                                    setTimeout(function() {
                                        scope.action.logout();
                                    }, 3000);
                                },
                                function(error) {
                                    //toastr.error(error.message);
                                });
                        }
                    }
                });
            },
            changelanguage: function(language) {
                $translate.use(language);
                localStorage.language = language;
                $scope.$broadcast('change-lange', language);
                $scope.$emit('change-lange', language);
                // window.location.reload();
            }
        };

        // $scope.action = {
        //     nav: function(item, items) {

        //         angular.forEach(items, function(item) {
        //             item.active = false;
        //         });

        //         $scope.currentMenu = item;
        //         item.active = true;
        //         setSubMenu(item);
        //     },
        //     logout: function() {
        //         utils.ajax({
        //             method: "POST",
        //             url: "logout"
        //         }).then(function(res) {
        //             localStorage.removeItem("signin");
        //             localStorage.removeItem("password");
        //             // location.href = 'signin.html';
        //         }, function(error) {
        //             // location.href = 'signin.html';
        //         });
        //     }
        // };

        $scope.loadSubMenus = function(page) {
            $scope.currentPage = page;
        };

        $scope.unLoadSubMenus = function() {
            $scope.treeSource = null;
        };

        $scope.getMenus = function(value) {

            if (!menuStack)
                return [];

            return menuStack.filter(function(raw) {
                return raw.name.includes(value);
            });
        };

        /**
         * 菜单搜索选择处理。
         * @param $item
         */
        $scope.onSelect = function($item) {
            //location.hash = $item.url;
            //$scope.search = "";

            //console.log($item);
            renderTabs($ocLazyLoad, {
                name: $item.label,
                url: $item.url,
                data: $item.data
            });
            $scope.search = "";
        };


        /**
         * 菜单搜索选择处理。
         * @param $item
         */
        $scope.onselecthome = function($item) {
            //location.hash = $item.url;
            //$scope.search = "";

            //console.log($item);
            renderTabs($ocLazyLoad, {
                name: $item.name,
                url: $item.url,
                data: $item.data
            });
            $scope.search = "";
        };


        $scope.load();
    });