(function () {
    'use strict';
    angular.module('app')
        .directive('yesUploader', ['$location', 'utils', '$log', 'FileUploader',
            function ($location, utils, $log, FileUploader) {

                return {
                    restrict: 'EA',
                    templateUrl: 'plugins/base/directives/uploader.html',
                    replace: true,
                    scope: {
                        options: "=",
                        readonly: "="
                    },
                    require: 'ngModel',
                    link: function link(scope, element, attrs, ngModelController) {
                        setTimeout(function () {
                            scope.attachmentId = ngModelController.$viewValue;
                            scope.options = angular.extend({
                                maxMB: 10,
                                multiple: 10
                            }, scope.options);
                            if (scope.options.multiple == false) {
                                scope.options.multiple = 1;
                            }
                            scope.init();
                            scope.$watch("attachmentId", function () {
                                if (scope.attachmentId && !ngModelController.$viewValue) {
                                    ngModelController.$setViewValue(scope.attachmentId);
                                }
                            });
                        }, 200);

                    },
                    controller: ['$scope', '$attrs', '$element', 'utils', 'settings',
                        function ($scope, $attrs, $element, utils, settings) {
                            var host = settings.host == "self" ? "" : settings.host;
                            var rootUrl = [host, settings.apiPrefix].join('/');
                            function getApiUrl(relativeUrl) {
                                if (relativeUrl && relativeUrl.indexOf('http') === 0)
                                    return relativeUrl;
                                return [rootUrl, relativeUrl].join('/');
                            }


                            var url = getApiUrl( settings.uploadUrl);
                            $scope.downUrl = getApiUrl( settings.downloadUrl);
                            var uploader = $scope.uploader = new FileUploader({
                                url: url,
                                autoUpload: true
                            });
                            $scope.sumSize = 0;
                            $scope.init = function () {
                                $scope.apiPath = settings.apiPath;
                                if (!$scope.attachmentId) {
                                    utils.async("GET", settings.getUuid).then(function (attId) {
                                        $scope.attachmentId = attId.data;
                                        uploader.formData = [{'attachmentId': $scope.attachmentId}];
                                    });
                                } else {
                                	uploader.formData = [{'attachmentId': $scope.attachmentId}];
                                    utils.async("GET", settings.getByAttIdUrl, {"attId": $scope.attachmentId}).then(function (res) {
                                        $scope.items = res.data.body;
                                    });
                                }
                                uploader.onSuccessItem = function (item, res, status, headers) {
                                    item.uid = res.body.data[0].uid;
                                    $scope.message = res.message;
                                };
                            };

                            $scope.remove = function (item) {
                                utils.async("DELETE", settings.delByUid + "/" + item.uid).then(function (res) {
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
                                fn: function (item /*{File|FileLikeObject}*/, options) {
                                    var tsum = 0;
                                    if ($scope.items) {
                                        $scope.items.forEach(function (item) {
                                            tsum += item.fileSize ? item.fileSize : 0;
                                        });
                                    }
                                    uploader.queue.forEach(function (item) {
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

                            //
                            //uploader.filters.push({
                            //    name: 'customFilter',
                            //    fn: function (item /*{File|FileLikeObject}*/, options) {
                            //        return this.queue.length < 10;
                            //    }
                            //});
                            //
                            //if (angular.isFunction(options.resolve)) {
                            //    options.resolve.apply(uploader);
                            //}
                        }]
                };
            }]);
})();