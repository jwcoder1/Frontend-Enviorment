/* global angular */
define(['base/pages/person.config', 'plugins/base/directives/tree.organization'], function (config) {
    "use strict";
    angular.module('app')
        .controller('app.base.organizationselector',
            function ($scope, $timeout, $rootScope,
                      interpreter, settings, utils, ngDialog, toastr) {
                var self = $scope;

                utils.async("get", "base/organization", {
                    "count": 999, "enable$eq": true
                }).then(function (res) {
                    res.data.body.items.forEach(function (item) {
                        item.ttype = item.type
                        item.tuid = item.uid;
                        item.parent = item.pid;
                        item.uid = item.oid;
                    });
                    var menus = utils.setIteration("", res.data.body.items);
                    res.data.body.items.forEach(function (item) {
                        item.uid = item.tuid;//方法解析的是uid,所以方法后设回来
                    });
                    self.node = {"children": menus, isRoot: true};
                }, function (error) {
                    //toastr.warning(error.message);
                });

            });
});