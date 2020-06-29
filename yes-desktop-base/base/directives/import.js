angular.module('app')
    .directive('importUploader', ['$location', 'utils', '$log', 'FileUploader',
        function ($location, utils, $log, FileUploader) {
            return {
                restrict: 'EA',
                templateUrl: 'base/directives/import.html',
                replace: true,
                scope: {
                    options: "="
                },
                controller: ['$scope', '$attrs', '$element',
                    function ($scope, $attrs, $element) {
                        var options = $scope.options || {};

                        $scope.title = options.title;

                        var url = options.url || "/upload";

                        var uploader = $scope.uploader = new FileUploader({
                            url: url
                        });

                        uploader.filters.push({
                            name: 'customFilter',
                            fn: function (item, options) {
                                return this.queue.length < 10;
                            }
                        });

                        uploader.onSuccessItem = function (item, res, status, headers) {
                            $scope.message = res.message;
                            if (angular.isFunction(options.resolve)) {
                                options.resolve.apply();
                            }
                        };
                    }]
            };
        }]);