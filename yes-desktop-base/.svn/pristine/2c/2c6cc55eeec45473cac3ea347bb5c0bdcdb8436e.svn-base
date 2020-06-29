angular.module('app')
    .directive('gridcolControl', function($compile, $templateCache, $http) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                ngModel: "=",
                model: "=",
                form: "="
            },
            require: '^ngModel',
            controller: ['$rootScope', '$scope', '$location', '$templateCache', '$translate', 'utils', '$element', '$timeout','uiGridConstants',
                function($rootScope, $scope, $location, $templateCache, $translate, utils, $element, $timeout,uiGridConstants) {
                    var scope = $scope;
                    var watchstr = "",
                        tag = "+";
                    var watfld = "";
                    angular.forEach(scope.form.headers, function(col, key) {

                        if (col.editstatus) {
                            col.editstatus.filedlist.forEach(function(element) {
                                watfld = tag + 'model.' + element.field + tag;
                                if (watchstr.indexOf(watfld) < 0) {
                                    watchstr += tag + 'model.' + element.field + tag;
                                }

                            });
                        }
                        if (col.readonlystatus) {
                            col.readonlystatus.filedlist.forEach(function(element) {
                                watfld = tag + 'model.' + element.field + tag;
                                if (watchstr.indexOf(watfld) < 0) {
                                    watchstr += tag + 'model.' + element.field + tag;
                                }
                            });
                        }

                        if (col.hidestatus) {
                            col.hidestatus.filedlist.forEach(function(element) {
                                watfld = tag + 'model.' + element.field + tag;
                                if (watchstr.indexOf(watfld) < 0) {
                                    watchstr += tag + 'model.' + element.field + tag;
                                }
                            });
                        }

                        if (col.showstatus) {
                            col.showstatus.filedlist.forEach(function(element) {
                                watfld = tag + 'model.' + element.field + tag;
                                if (watchstr.indexOf(watfld) < 0) {
                                    watchstr += tag + 'model.' + element.field + tag;
                                }
                            });
                        }


                    })
                    if (watchstr) {
                        watchstr = watchstr.substr(1, watchstr.length - 2)
                        scope.$watch(watchstr, function(newValue, oldValue) {
                            angular.forEach(scope.form.headers, function(col, key) {

                                if (col.editstatus) {
                                   var  arrayObj = new Array();
                                    col.editstatus.filedlist.forEach(function(element) {
                                        var formstatus = scope.model[element.field];
                                        if (angular.isUndefined(formstatus)) {
                                            formstatus = "";
                                        }
                                        if (typeof element.status == "string") {
                                            var editstatus = element.status.split(",");
                                            var itemval = false;
                                            editstatus.forEach(item => {
                                                if (item == formstatus) {
                                                    itemval = itemval || true;
                                                    // arrayObj.push(true);
                                                } else {
                                                    itemval = itemval || false;
                                                    // arrayObj.push(false);
                                                }
                                            });
                                            arrayObj.push(itemval);

                                        } else if (formstatus == element.status) {
                                            arrayObj.push(true);
                                        } else {
                                            arrayObj.push(false);
                                        }
                                    });

                                    var edit = false;
                                    if (arrayObj.length > 0) {
                                        edit = arrayObj[0]
                                        arrayObj.forEach(function(element) {
                                            edit = col.editstatus.relation == "or" ? edit || element : edit && element;
                                        }, this);
                                    }
                                    col.readonly = !edit;
                                    col.enableCellEdit = !col.readonly;

                                }
                                if (col.readonlystatus) {

                                  var  arrayObj = new Array();
                                    col.readonlystatus.filedlist.forEach(function(element) {
                                        var formstatus = scope.model[element.field];
                                        if (angular.isUndefined(formstatus)) {
                                            formstatus = "";
                                        }
                                        if (typeof element.status == "string") {
                                            var readonlystatus = element.status.split(",");
                                            var itemval = false;
                                            readonlystatus.forEach(item => {
                                                if (item == formstatus) {
                                                    itemval = itemval || true;
                                                    // arrayObj.push(true);
                                                } else {
                                                    itemval = itemval || false;
                                                    // arrayObj.push(false);
                                                }
                                            });
                                            arrayObj.push(itemval);


                                        } else if (formstatus == element.status) {
                                            arrayObj.push(true);
                                        } else {
                                            arrayObj.push(false);
                                        }
                                    });

                                    var readonly = false;
                                    if (arrayObj.length > 0) {
                                        readonly = arrayObj[0]
                                        arrayObj.forEach(function(element) {
                                            readonly = col.readonlystatus.relation == "or" ? readonly || element : readonly && element;
                                        }, this);
                                    }
                                    col.readonly = readonly;
                                    col.enableCellEdit = !col.readonly;

                                }


                                if (col.showstatus) {
                                   var arrayObj = new Array();
                                    col.showstatus.filedlist.forEach(function(element) {
                                        var formstatus = scope.model[element.field];
                                        if (angular.isUndefined(formstatus)) {
                                            formstatus = "";
                                        }
                                        if (typeof element.status == "string") {
                                            var showstatus = element.status.split(",");
                                            var itemval = false;
                                            showstatus.forEach(item => {
                                                if (item == formstatus) {
                                                    itemval = itemval || true;
                                                    // arrayObj.push(true);
                                                } else {
                                                    itemval = itemval || false;
                                                    // arrayObj.push(false);
                                                }
                                            });
                                            arrayObj.push(itemval);

                                        } else if (formstatus == element.status) {
                                            arrayObj.push(true);
                                        } else {
                                            arrayObj.push(false);
                                        }
                                    });
                                    var show = true;
                                    if (arrayObj.length > 0) {
                                        show = arrayObj[0]
                                        arrayObj.forEach(function(element) {
                                            show = col.showstatus.relation == "or" ? show || element : show && element;
                                        }, this);
                                    }
                                    col.visible = show;
                                }



                                if (col.hidestatus) {
                                   var arrayObj = new Array();

                                    col.hidestatus.filedlist.forEach(function(element) {
                                        var formstatus = scope.model[element.field];
                                        if (angular.isUndefined(formstatus)) {
                                            formstatus = "";
                                        }
                                        if (typeof element.status == "string") {
                                            var hidestatus = element.status.split(",");
                                            var itemval = false;
                                            hidestatus.forEach(item => {
                                                if (item == formstatus) {
                                                    itemval = itemval || true;
                                                    // arrayObj.push(true);
                                                } else {
                                                    itemval = itemval || false;
                                                    // arrayObj.push(false);
                                                }
                                            });
                                            arrayObj.push(itemval);

                                        } else if (formstatus == element.status) {
                                            arrayObj.push(true);
                                        } else {
                                            arrayObj.push(false);
                                        }
                                    });
                                    var hide = false;
                                    if (arrayObj.length > 0) {
                                        hide = arrayObj[0]
                                        arrayObj.forEach(function(element) {
                                            hide = col.hidestatus.relation == "or" ? hide || element : hide && element;
                                        }, this);
                                    }

                                    col.visible = !hide;
                                }

                                if (scope.form.gridApi){
                                    // scope.form.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
                                    // scope.form.gridApi.grid.refresh();
                                }
                                
                                // var resource = angular.copy(scope.ngModel);
                                // scope.ngModel = resource;
                                // $timeout(function() {
                                //     scope.ngModel = resource;
                                // }, 100);


                              

                            })
          
                        }, true); ///


                        //   scope.$on('GridRedraw', function () {
                        //        $scope.resource = angular.copy($scope.ngModel);
                        //         $scope.ngModel = [];
                        //         $timeout(function() {
                        //            $scope.ngModel = $scope.resource;
                        //         }, 20);
                                
                        //     });
                           

                    
                
                  }
                }
            ]
        }
    });