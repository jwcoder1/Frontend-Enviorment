angular.module('app').controller('app.master',
    function ($scope, $location, tree, utils, $timeout, settings, $ocLazyLoad, ngDialog, toastr) {

        function resizeHighCharts() {
            angular.forEach(Highcharts.charts, function (chart) {
                if (chart && angular.isFunction(chart.reflow)) {
                    chart.reflow();
                }
            });
        }

        $scope.$on("layout-responsive:changed", function () {
            setTimeout(resizeHighCharts, 500);
        });

        $scope.$watch('minSize', function (newValue, oldValue) {
            localStorage.setItem('minSize', newValue);
        });

        var scope = $scope;
        $scope.minSize = JSON.parse(localStorage.getItem('minSize')) || false;
        var children, menuStack, found;
        menuStack = [];
        $scope.displayName = "";
        $scope.tabs = {};

        function setSubMenu(menu) {

            var tree = [];
            if (angular.isObject(menu)) {
                tree.push({
                    name: menu.name,
                    children: menu.children
                });
                $scope.treeSource = tree;
            }
        }

        $scope.operations = {};

        $scope.load = function () {
            utils.ajax({
                url: 'menus?type=suball',
                mockUrl: 'plugins/$default/data/menus.json'
            }).then(
                function (res) {

                    children = children || {};
                    var temp = [];
                    res.data.body.forEach(function (item) {
                        if (item.type != "function") {
                            temp.push(item);
                        }
                    });
                    $scope.menus = tree.initMenus("", temp);

                    setSubMenu($scope.menus[0]);

                    if ($scope.menus.length) {
                        children = $scope.menus;
                        menuStack = tree.buildMenuTree(temp);
                        // walkTree($scope.menus);
                    }

                    $timeout(function () {
                        angular.element("a[href='#" + location.hash.replace("#/", "") + "'")
                            .parent().addClass('tree-selected');
                    }, 500);
                }
                );

            $scope.displayName = localStorage.getItem("displayName");
        };

        $scope.action = {
            nav: function (item, items, changeSize) {

                angular.forEach(items, function (item) {
                    item.active = false;
                });

                $scope.currentMenu = item;
                item.active = true;
                setSubMenu(item);
                if (changeSize)
                    $scope.minSize = true;
            },
            logout: function () {
                utils.ajax({
                    url: "logout"
                }).then(function (res) {
                    localStorage.removeItem("displayName");
                    //$location.path("/login");
                    location.reload();
                }, function (error) {
                    location.reload();
                });
            },
            updatePassword: function () {
                ngDialog.open({
                    template: "plugins/base/pages/updatePassword.html",
                    controller: function ($scope) {
                        $scope.model = {
                            "oldPassword": "",
                            "newPassword": ""
                        };
                        $scope.username = localStorage.getItem("username");
                        $scope.save = function (form) {
                            if ($scope.model.newPassword.length < 6 || $scope.model.newPassword.length > 18) {
                                toastr.warning("新密码必须为6-18位");
                                return;
                            }
                            if ($scope.model.newPassword == $scope.model.oldPassword) {
                                toastr.warning("新密码不能与旧密码一样");
                                return;
                            }
                            utils.async("post", "setpassword", $scope.model).then(function (res) {
                                ngDialog.closeAll();
                                toastr.success("密码修改成功,3秒后自动退出...");
                                setTimeout(function () {
                                    scope.action.logout();
                                }, 3000);
                            },
                                function (error) {
                                    //toastr.error(error.message);
                                });
                        }
                    }
                });
            }
        };

        $scope.loadSubMenus = function (page) {
            $scope.currentPage = page;
        };

        $scope.unLoadSubMenus = function () {
            $scope.treeSource = null;
        };

        $scope.getMenus = function (value) {

            if (!menuStack)
                return [];

            return menuStack.filter(function (raw) {
                return raw.name.includes(value);
            });
        };

        /**
         * 菜单搜索选择处理。
         * @param $item
         */
        $scope.onSelect = function ($item) {
            location.hash = $item.url;
            $scope.search = "";
        };

        //点击菜单,跳转页面
        $scope.onSelectMenu = function (item) {
            //iterationSetMenu($scope.treeSource);
            if (item.children && item.children.length) {
                //item.collapsed = !item.collapsed;
            } else {
                location.hash = item.url;
                item.selected = true;
            }
            $scope.currentMenuSecond = item;
        };

        $scope.load();
    });
