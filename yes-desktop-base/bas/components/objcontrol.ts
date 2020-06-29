angular.module('app')
    .directive('objControl', function($compile, $templateCache, $http) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                model: "=",
                dmodel: "=",
                form: "="
            },
            require: '^ngModel',
            controller: ['$rootScope', '$scope', '$location', '$templateCache', '$translate', 'utils', '$element',
                function($rootScope, $scope, $location, $templateCache, $translate, utils, $element) {
                    var scope = $scope;
                    if (angular.isUndefined(scope.form.hide)) {
                        scope.form.hide = false;
                    }
                    var tmodel = "";
                    var tfield ="";
                    if (scope.form.readonlystatus) {
                        if (!scope.form.readonlystatus.relation) {
                            scope.form.readonlystatus.relation = "or";
                        }
                        if (scope.form.readonlystatus.filedlist) {
                            var watchstr = "",
                                tag = "";
                            scope.form.readonlystatus.filedlist.forEach(function(element) {
                                 tmodel = scope.model;
                                 tfield = element.field;
                                if (element.dfield) {
                                    tmodel = scope.dmodel;
                                    tfield = element.dfield;
                                }
                                watchstr += tag + (element.dfield?"dmodel":"model")+'.' + tfield;
                                tag = "+";
                            });
                            scope.$watch(watchstr, function(newValue, oldValue) {
                                var arrayObj = new Array();

                                scope.form.readonlystatus.filedlist.forEach(function(element) {
                                    tmodel = scope.model;
                                    tfield = element.field;
                                    if (element.dfield) {
                                        tmodel = scope.dmodel;
                                        tfield = element.dfield;
                                    }
                                    if (!angular.isUndefined(tmodel) && tmodel.hasOwnProperty(tfield)) {
                                        var formstatus = tmodel[tfield];
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
                                    }

                                });

                                var readonly = false;
                                if (arrayObj.length > 0) {
                                    readonly = arrayObj[0]
                                    arrayObj.forEach(function(element) {
                                        readonly = scope.form.readonlystatus.relation == "or" ? readonly || element : readonly && element;
                                    }, this);
                                }
                                scope.form.readonly = readonly;

                            }, true); ///
                        }

                    }


                    if (scope.form.editstatus) {
                        if (!scope.form.editstatus.relation) {
                            scope.form.editstatus.relation = "or";
                        }
                        if (scope.form.editstatus.filedlist) {
                            var watchstr = "",
                                tag = "";
                            scope.form.editstatus.filedlist.forEach(function(element) {
                                 tmodel = scope.model;
                                 tfield = element.field;
                                if (element.dfield) {
                                    tmodel = scope.dmodel;
                                    tfield = element.dfield;
                                }
                                watchstr += tag + (element.dfield?"dmodel":"model")+'.' + tfield;
                                tag = "+";
                            });
                            scope.$watch(watchstr, function(newValue, oldValue) {
                                //  var edit = true;
                                var arrayObj = new Array();
                                scope.form.editstatus.filedlist.forEach(function(element) {
                                    tmodel = scope.model;
                                    tfield = element.field;
                                    if (element.dfield) {
                                        tmodel = scope.dmodel;
                                        tfield = element.dfield;
                                    }
                                    if (!angular.isUndefined(tmodel) && tmodel.hasOwnProperty(tfield)) {
                                        var formstatus = tmodel[tfield];
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
                                    }

                                });

                                var edit = false;
                                if (arrayObj.length > 0) {
                                    edit = arrayObj[0]
                                    arrayObj.forEach(function(element) {
                                        edit = scope.form.editstatus.relation == "or" ? edit || element : edit && element;
                                    }, this);
                                }
                                scope.form.readonly = !edit;

                            }, true); ///
                        }

                    }


                    if (scope.form.hidestatus) {
                        if (!scope.form.hidestatus.relation) {
                            scope.form.hidestatus.relation = "or";
                        }
                        if (scope.form.hidestatus.filedlist) {
                            var watchstr = "",
                                tag = "";
                            scope.form.hidestatus.filedlist.forEach(function(element) {
                                 tmodel = scope.model;
                                 tfield = element.field;
                                if (element.dfield) {
                                    tmodel = scope.dmodel;
                                    tfield = element.dfield;
                                }
                                watchstr += tag + (element.dfield?"dmodel":"model")+'.' + tfield;
                                tag = "+";
                            });
                            scope.$watch(watchstr, function(newValue, oldValue) {
                                //  var hide = false;
                                var arrayObj = new Array();

                                scope.form.hidestatus.filedlist.forEach(function(element) {
                                    tmodel = scope.model;
                                    tfield = element.field;
                                    if (element.dfield) {
                                        tmodel = scope.dmodel;
                                        tfield = element.dfield;
                                    }
                                    if (!angular.isUndefined(tmodel) && tmodel.hasOwnProperty(tfield)) {
                                        var formstatus = tmodel[tfield];
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
                                    }

                                });
                                var hide = false;
                                if (arrayObj.length > 0) {
                                    hide = arrayObj[0]
                                    arrayObj.forEach(function(element) {
                                        hide = scope.form.hidestatus.relation == "or" ? hide || element : hide && element;
                                    }, this);
                                }

                                scope.form.hide = hide;

                            }, true); ///
                        }

                    }

                    if (scope.form.showstatus) {
                        if (!scope.form.showstatus.relation) {
                            scope.form.showstatus.relation = "or";
                        }
                        if (scope.form.showstatus.filedlist) {
                            var watchstr = "",
                                tag = "";
                            scope.form.showstatus.filedlist.forEach(function(element) {
                                 tmodel = scope.model;
                                 tfield = element.field;
                                if (element.dfield) {
                                    tmodel = scope.dmodel;
                                    tfield = element.dfield;
                                }
                                watchstr += tag + (element.dfield?"dmodel":"model")+'.' + tfield;
                                tag = "+";
                            });
                            scope.$watch(watchstr, function(newValue, oldValue) {
                                var arrayObj = new Array();
                                scope.form.showstatus.filedlist.forEach(function(element) {
                                    tmodel = scope.model;
                                    tfield = element.field;
                                    if (element.dfield) {
                                        tmodel = scope.dmodel;
                                        tfield = element.dfield;
                                    }
                                    if (!angular.isUndefined(tmodel) && tmodel.hasOwnProperty(tfield)) {
                                        var formstatus = tmodel[tfield];
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
                                    }

                                });
                                var show = true;
                                if (arrayObj.length > 0) {
                                    show = arrayObj[0]
                                    arrayObj.forEach(function(element) {
                                        show = scope.form.showstatus.relation == "or" ? show || element : show && element;
                                    }, this);
                                }
                                scope.form.hide = !show;

                            }, true); ///
                        }

                    }


                    if (scope.form.requiredtatus) {
                        if (!scope.form.requiredtatus.relation) {
                            scope.form.requiredtatus.relation = "or";
                        }
                        if (scope.form.requiredtatus.filedlist) {
                            var watchstr = "",
                                tag = "";
                            scope.form.requiredtatus.filedlist.forEach(function(element) {
                                 tmodel = scope.model;
                                 tfield = element.field;
                                if (element.dfield) {
                                    tmodel = scope.dmodel;
                                    tfield = element.dfield;
                                }
                                watchstr += tag + (element.dfield?"dmodel":"model")+'.' + tfield;
                                tag = "+";
                            });
                            scope.$watch(watchstr, function(newValue, oldValue) {
                                var arrayObj = new Array();
                                scope.form.requiredtatus.filedlist.forEach(function(element) {
                                    tmodel = scope.model;
                                    tfield = element.field;
                                    if (element.dfield) {
                                        tmodel = scope.dmodel;
                                        tfield = element.dfield;
                                    }
                                    if (!angular.isUndefined(tmodel) && tmodel.hasOwnProperty(tfield)) {
                                        var requiredtatus = tmodel[tfield];
                                        if (angular.isUndefined(requiredtatus)) {
                                            requiredtatus = "";
                                        }
                                        if (typeof element.status == "string") {
                                            var showstatus = element.status.split(",");
                                            var itemval = false;
                                            showstatus.forEach(item => {
                                                if (item == requiredtatus) {
                                                    itemval = itemval || true;
                                                } else {
                                                    itemval = itemval || false;
                                                }
                                            });
                                            arrayObj.push(itemval);

                                        } else if (requiredtatus == element.status) {
                                            arrayObj.push(true);
                                        } else {
                                            arrayObj.push(false);
                                        }
                                    }

                                });
                                var show = true;
                                if (arrayObj.length > 0) {
                                    show = arrayObj[0]
                                    arrayObj.forEach(function(element) {
                                        show = scope.form.requiredtatus.relation == "or" ? show || element : show && element;
                                    }, this);
                                }
                                scope.form.hide = !show;

                            }, true); ///
                        }

                    }

                }
            ]
        }
    });