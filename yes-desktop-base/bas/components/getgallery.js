(function() {
    'use strict';
    angular.module('app')
        .directive('getGallery', ['$location', 'utils', '$log', 'FileUploader', 'settings',
            function($location, utils, $log, FileUploader, settings) {

                return {
                    restrict: 'EA',
                    templateUrl: 'plugins/bas/components/getgallery.html',
                    replace: true,
                    scope: {
                        options: "=",
                        readonly: "=",
                        ngModel: "=",
                    },
                    require: 'ngModel',
                    link: function link(scope, element, attrs, ngModelController) {
                        setTimeout(function() {
                            scope.attachmentId = ngModelController.$viewValue;
                            scope.options = angular.extend({
                                maxMB: 100,
                                multiple: 10
                            }, scope.options);
                            if (scope.options.multiple == false) {
                                scope.options.multiple = 1;
                            }
                            scope.showall = false
                            if (scope.options.hasOwnProperty("showall")) {
                                scope.showall = scope.options.showall;
                            }
                            // scope.init();

                            scope.$watch("attachmentId", function() {
                                var chkstr = ngModelController.$viewValue;
                                if (chkstr) {
                                    chkstr = chkstr.trim()
                                }
                                if (scope.attachmentId && !chkstr) {
                                    ngModelController.$setViewValue(scope.attachmentId);
                                }
                            });
                        }, 200);

                    },
                    controller: ['$scope', '$attrs', '$element', 'ngDialog',
                        function($scope, $attrs, $element, ngDialog) {

                            var scope = $scope;

                            scope.options = angular.extend({
                                maxMB: 100,
                                multiple: 10
                            }, scope.options);
                            if (scope.options.multiple == false) {
                                scope.options.multiple = 1;
                            }
                            scope.showall = false
                            if (scope.options.hasOwnProperty("showall")) {
                                scope.showall = scope.options.showall;
                            }


                            $scope.rootUrl = '';
                            var selfHost = location.protocol + "//" + location.host;
                            $scope.host = settings.host == "self" ? selfHost : settings.host;
                            if (settings.apiPrefix) {
                                $scope.rootUrl = [$scope.host, settings.apiPrefix].join('/');
                            } else {
                                $scope.rootUrl = $scope.host;
                            }


                            var url = $scope.rootUrl + settings.uploadUrl;

                            $scope.downUrl = $scope.rootUrl + settings.downloadUrl;
                            var uploader = $scope.uploader = new FileUploader({
                                url: url,
                                autoUpload: true
                            });
                            $scope.sumSize = 0;
                            $scope.showbigimage = function(item) {
                                ngDialog.open({
                                    className: "ngdialog-lg",
                                    template: 'plugins/bas/components/getgalleryimage.html',
                                    controller: function($scope) {
                                        $scope.form = {

                                        }
                                        $scope.item = item;
                                        $scope.bigimageurl = scope.downUrl + "?uid=" + item.uid;
                                        $scope.action = {

                                            lovcancel: function() {
                                                $scope.closeThisDialog();
                                            }
                                        }
                                    }
                                })
                            }
                            $scope.init = function() {
                                $scope.apiPrefix = settings.apiPrefix;
                                var chkstr = $scope.attachmentId;
                                if (chkstr) {
                                    chkstr = chkstr.trim()
                                }
                                if (!chkstr) {
                                    utils.async("GET", settings.getUuid).then(function(attId) {
                                        if (!$scope.attachmentId) {
                                            $scope.ngModel = attId.data;
                                            $scope.attachmentId = attId.data;
                                            uploader.formData = [{ 'attachmentId': $scope.attachmentId }, { 'isImage': true }];
                                        }
                                    });
                                } else {


                                    uploader.formData = [{ 'attachmentId': $scope.attachmentId }, { 'isImage': true }];
                                    utils.async("GET", $scope.showall ? settings.getallByAttIdUrl : settings.getByAttIdUrl, { "attId": $scope.attachmentId }).then(function(res) {
                                        $scope.items = res.data.body;
                                        if ($scope.items) {
                                            $scope.items.forEach(function(item) {
                                                item.thumbUrl = $scope.host + "/" + $scope.apiPrefix + "/base/attachment/showthumb?uid=" + item.uid;
                                                item.downloadUrl = $scope.host + "/" + $scope.apiPrefix + "/base/attachment/showMiddleThumb?uid=" + item.uid;
                                            });
                                        }
                                    });
                                }
                                uploader.onSuccessItem = function(item, res, status, headers) {
                                    item.uid = res.body.data[0].uid;
                                    item.thumbUrl = $scope.host + "/" + $scope.apiPrefix + "/base/attachment/showthumb?uid=" + item.uid;
                                    item.downloadUrl = $scope.host + "/" + $scope.apiPrefix + "/base/attachment/showMiddleThumb?uid=" + item.uid;
                                    $scope.message = res.message;
                                };
                            };

                            $scope.$watch("ngModel", function() {
                                $scope.attachmentId = scope.ngModel;
                                $scope.init();
                            });

                            $scope.remove = function(item) {
                                utils.async("DELETE", settings.delByUid + "/" + item.uid).then(function(res) {
                                    if (res.data.body) {
                                        if ($scope.items) {
                                            for (var i = 0, size = $scope.items.length; i < size; i++) {
                                                if ($scope.items[i] == item) {
                                                    $scope.items.splice(i, 1);
                                                }
                                            }
                                        }
                                    } else {
                                        console.log("后台删除出错!");
                                    }
                                });
                            };

                            uploader.filters.push({
                                name: 'sizeFilter',
                                fn: function(item /*{File|FileLikeObject}*/ , options) {
                                    var tsum = 0;
                                    if ($scope.items) {
                                        $scope.items.forEach(function(item) {
                                            tsum += item.fileSize ? item.fileSize : 0;
                                        });
                                    }
                                    uploader.queue.forEach(function(item) {
                                        tsum += item.size;
                                    });
                                    tsum += item.size;
                                    if (tsum > $scope.options.maxMB * 1048576) {
                                        alert("大小不能超过" + $scope.options.maxMB + "M!");
                                        return false;
                                    } else if (((uploader.queue ? uploader.queue.length : 0) + ($scope.items ? $scope.items.length : 0)) >= $scope.options.multiple) {
                                        alert("最多只能上传" + $scope.options.multiple + "个文件!");
                                        return false;
                                    } else {
                                        return true;
                                    }
                                }
                            });

                        }
                    ]
                };
            }
        ]);
})();