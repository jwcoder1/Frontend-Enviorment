namespace yes {
    angular.module('app')
        .controller("app.default.helper",
        function ($scope: IClassicalViewScope, helper: IHelper, utils: IUtils) {

            helper.setClassicalScope($scope, {
                commonApiUrl: "$default/helper",
                mock: {
                    config: "plugins/$default/data/helper.config.json",
                    list: "plugins/$default/data/helper.list.json",
                    detail: "plugins/$default/data/helper.detail.json"
                },
                apiConfigUrl: "plugins/$default/data/helper.config.json",
                detailTemplateUrl: 'plugins/$default/pages/helper.detail.html',
                disableDblClick: true
            });

            $scope.init();

            // $scope.$watch('model._id', (newValue, oldValue) => {
            //     if ($scope.config)
            //         updateFormAttr(newValue);
            // });

            // function updateFormAttr(newValue) {
            //     var password = helper.findFormNode('password', $scope.config.form);
            //     var username = helper.findFormNode('username', $scope.config.form);

            //     if (newValue) {
            //         password.required = false;
            //         username.readonly = 'readonly';
            //     } else {
            //         password.required = true;
            //         username.readonly = false;
            //     }
            // }

        });
}