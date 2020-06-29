define(function() {
    angular.module('app').controller('base.custset',
        function($scope, $rootScope, utils, path, getSingleView, settings,
            $timeout, dialog, toastr) {
            var scope = $scope;
            scope.models = [];

            scope.form = {
                existdel: false,
                action: {
                    save: {
                        'name': "保存",
                        'icon': "fa-save",
                        'click': function() {
                            console.log("存档中 ...");
                            utils.ajax({
                                method: "POST",
                                url: "base/sysvar/savesysvars",
                                mockUrl: "plugins/data/CUSTVAR.save.json",
                                data: scope.models
                            }).then(function(res) {
                                toastr.info("存档成功！");
                            });
                        }
                    },
                    reset: {
                        'name': "重置",
                        'icon': "fa-undo",
                        'click': function() {
                            scope.load();
                        }
                    }
                },
                headers: {
                    "var_desc": {
                        displayName: "变量名",
                        readonly: true,
                        width: 150
                    },
                    "var_val": {
                        displayName: "变量值",
                        minWidth: 150
                    }

                }

            }

            scope.load = function() {

                params = {
                    var_type$eq: "cus"
                }

                utils.ajax({
                    method: 'GET',
                    url: "base/sysvar",
                    mockUrl: "plugins/data/sysvar.json",
                    params: params
                }).then(function(res) {
                    var data = res.data;
                    scope.models = data.body.items

                });

            }

            scope.load();



        });

});