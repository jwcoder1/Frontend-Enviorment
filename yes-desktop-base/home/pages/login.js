(function (yes) {
    var controller = function ($scope, utils, dialog, $location, toastr, sysconstant) {
        var view = {
            init: function () {
                $scope.vm = {
                    username: "admin",
                    password: ""
                };
            },
            action: {
                forgotPassword: function () {
                    dialog.open({
                        template: "plugins/theme/pages/login.forgot.html",
                        className: "ngdialog-theme-default ngdialog-theme-custom",
                        controller: function ($scope, $translate, sysconstant) {
                            // $scope.model = {
                            //     "account": self.filter.username
                            // };
                            // $scope.sendIdentifyCode = function () {
                            //     if (!$scope.model.account) {
                            //         toastr.warning("用户名不能为空");
                            //     } else {
                            //         utils.async("get", "base/account/sendIdentifyCode/" + $scope.model.account).then(function (res) {
                            //             toastr.success("验证码已发送到邮箱,请注意查收,10分钟后过期");
                            //         },
                            //             function (error) {
                            //                 toastr.error(error.data.message);
                            //             });
                            //     }
                            // };
                            // $scope.updatepwd = function () {
                            //     if (!$scope.model.newpwd) {
                            //         toastr.warning("密码不能为空");
                            //     } else {
                            //         if ($scope.model.newpwd != $scope.model.newpwd2) {
                            //             toastr.warning("确认密码与密码不一致");
                            //         } else {
                            //             utils.async("post", "base/account/mailUpdatePassword", $scope.model).then(function (res) {
                            //                 toastr.success("密码修改成功");
                            //                 ngDialog.closeAll();
                            //             },
                            //                 function (error) {
                            //                     toastr.error(error.data.message);
                            //                 });
                            //         }
                            //     }
                            // };
                            // $scope.next = function () {
                            //     if (!$scope.model.identify || $scope.model.identify.length != 6) {
                            //         toastr.warning("请输入正确的验证码");
                            //     } else {
                            //         utils.async("get", "base/account/identifyCode/" + $scope.model.identify, {
                            //             "account": $scope.model.account
                            //         }).then(function (res) {
                            //             $scope.account = res.data.body;
                            //             $scope.canchange = true;
                            //         },
                            //             function (error) {
                            //                 toastr.error(error.data.message);
                            //             });
                            //     }
                            // };
                        }
                    });
                },
                login: function () {
                    var data = angular.copy($scope.vm);
                    utils.ajax({
                        'method': "POST",
                        'url': 'login',
                        'mockUrl': 'login.mock',
                        'data': data
                    }).then(function (res) {
                        var data = res.data.body;
                        localStorage.setItem("displayName", data['displayName'] || data['name']);
                        var hash = decodeURIComponent($location.search()["return"]);
                        if (angular.isUndefined(hash) && hash) {
                            location.hash = hash;
                        }
                        else {
                            location.hash = "";
                        }
                    }, function (err) {
                        // toastr.error("登录失败 " + err.data.message);
                    });
                }
            }
        };
        angular.extend($scope, view);
        $scope.init();
    };
    controller.$inject = ['$scope', 'utils', 'dialog', '$location', 'toastr', 'sysconstant'];
    angular.module('app').controller('app.login', controller);
})(yes || (yes = {}));
//# sourceMappingURL=login.js.map

//# sourceMappingURL=login.js.map
