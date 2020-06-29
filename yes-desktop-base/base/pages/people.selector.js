define(['plugins/base/directives/department.tree'], function () {
    "use strict";
    angular.module('app')
        .controller('app.base.people', [
            '$scope', '$timeout', 'utils', 'toastr',
            function ($scope, $timeout, utils, toastr) {
                var lastChecked = [null, null, null];
                var tabIndex = $scope.currentTab = 0;
                $scope.eid = $scope.$parent.eid;
                $scope.currentPage = [1, 1, 1];
                $scope.sumPage = [1, 1, 1];
                $scope.pCount = [0, 0, 0];
                $scope.depName = ["", "", ""];
                $scope.items = [[], [], []];
                $scope.peopleItems = [[], [], []];
                $scope.search = ["", "", ""];
                $scope.sels = [];
                $scope.searchSelected = "";
                $scope.sumCount = 0;
                $scope.footerbutton = {
                    buttonSection: "部门信息",
                    buttonSelected: "已选"
                }
                $scope.action = {
                    mousemove: function (p, value, event) {
                        var x = -80;
                        var y = -60;

                        if (value) {
                            var info = "邮箱:" + p.mail + "<br/>部门:" + p.pp_name;
                            if (p.pp_name != "公司领导") {
                                info = "电话:" + p.mobilePhone + "<br/>" + info;
                                y = -80;
                            }
                            if (event) {
                                x = x + event.clientX;
                                y = y + event.clientY;
                            }
                            $scope.mouseMoveShowStyle = "left:" + x + "px;top:" + y + "px;";
                            info = "<div style='position: fixed;'>" + info + "<div>"
                            $scope.mouseMoveShow = info;
                        } else {
                            $scope.mouseMoveShow = null;
                        }
                    }
                };
                $scope.onFooterbuttonclick = function (v, k, close) {
                    $("#" + v).toggleClass("toggled");
                    if ($("#" + v).hasClass("toggled")) {
                        if (k == "buttonSection") {
                            $scope.footerbutton.buttonSection = "组织信息";
                        } else {
                            $scope.footerbutton.buttonSelected = "已选";
                        }
                    } else {
                        if (close && $("#" + close).hasClass("toggled")) {
                            if (k == "buttonSection") {
                                $scope.footerbutton.buttonSection = "部门信息";
                            } else {
                                $scope.footerbutton.buttonSelected = "返回";
                            }
                        } else if (close && !$("#" + close).hasClass("toggled")) {
                            $("#" + close).toggleClass("toggled");
                            if (k == "buttonSection") {
                                $scope.footerbutton.buttonSelected = "已选";
                            } else {
                                $scope.footerbutton.buttonSection = "组织信息";
                                $scope.footerbutton.buttonSelected = "返回";
                            }
                        }
                    }
                }
                $scope.methords = {

                }

                $scope.changeTab = function (tab) {
                    tabIndex = tab;
                    $scope.currentTab = tab;
                    $scope.init();
                };

                function setJustPerson(justPerson, persons) {
                    persons.forEach(function (dPerson) {
                        var noIn = true;
                        for (var i = 0; i < justPerson.length; i++) {
                            if (justPerson[i].pid == dPerson.pid) {
                                noIn = false;
                                break;
                            }
                        }
                        if (noIn) {
                            justPerson.push(dPerson);
                        }
                    });
                }

                $scope.confirm = function () {
                    var justPerson = [];
                    var departmentCount = 0, loadedDepartmentCount = 0;
                    $scope.sels.forEach(function (item) {//先处理完人员
                        if (item.pp_uid) {//人员
                            justPerson.push(item);
                        } else {
                            departmentCount++;
                        }
                    });
                    $scope.sels.forEach(function (item) {
                        if (!item.pp_uid) {//部门
                            if (item.allPersonLoaded) {//如果已经加载了人员数据
                                loadedDepartmentCount++;
                                setJustPerson(justPerson, item.allPerson);
                            } else {//加载该部门的全部人员数据
                                utils.async("GET", "base/person",
                                    {
                                        "count": 9999,
                                        "eid": $scope.eid,
                                        "oid$eq": item.oid,
                                        "path": item.path
                                    }
                                ).then(function (res) {
                                    setJustPerson(justPerson, res.data.body.items);
                                    item.allPerson = res.data.body.items;
                                    loadedDepartmentCount++;
                                    if (departmentCount == loadedDepartmentCount) {
                                        $scope.callback(justPerson, $scope.sels);
                                    }
                                }, function (error) {
                                    console.log(error);
                                });
                            }
                        }
                    });
                    if (departmentCount == loadedDepartmentCount) {
                        $scope.callback(justPerson, $scope.sels);
                    }
                };
                $scope.searchKeyUp = function (e) {
                    var keyCode = window.event ? e.keyCode : e.which;
                    if (keyCode == 13) {
                        if (lastChecked[tabIndex]) {
                            $scope.onSelect(lastChecked[tabIndex], true);
                            $scope.onFooterbuttonclick('selector_col_1', 'buttonSection');//响应式布局展开部门信息
                        } else {
                            toastr.warning("请选择组织信息");
                        }
                    }
                };
                $scope.searchKeyUpSelected = function (e) {
                    var keyCode = window.event ? e.keyCode : e.which;
                    if (keyCode == 13) {
                        $scope.sels.forEach(function (it) {
                            if ((it.pp_uid && it.cname.indexOf($scope.searchSelected) == -1
                                && (!it.py || it.py.indexOf($scope.searchSelected) == -1)
                                && (!it.pinyin || it.pinyin.indexOf($scope.searchSelected) == -1))
                                || (!it.pp_uid && it.name.indexOf($scope.searchSelected) == -1)) {
                                it.unfound = true;
                            } else {
                                delete it.unfound;
                            }
                        });
                    }
                };
                $scope.goPrev = function () {
                    if ($scope.currentPage[tabIndex] > 1) {
                        $scope.currentPage[tabIndex]--;
                        $scope.onSelect(lastChecked[tabIndex], true, true);
                        //if (tabIndex == 0) {
                        //
                        //} else if (tabIndex == 1) {
                        //
                        //} else if (tabIndex == 2) {
                        //
                        //}
                    }
                };
                $scope.goNext = function () {
                    if ($scope.currentPage[tabIndex] < $scope.sumPage[tabIndex]) {
                        $scope.currentPage[tabIndex]++;
                        $scope.onSelect(lastChecked[tabIndex], true, true);
                        //if (tabIndex == 0) {
                        //
                        //} else if (tabIndex == 1) {
                        //
                        //} else if (tabIndex == 2) {
                        //
                        //}
                    }
                };
                $scope.onSelect = function (item, isSearch, isChangePage) {
                    if (item && (item != lastChecked[tabIndex] || isSearch)) {
                        if (!isSearch) {
                            $scope.search[tabIndex] = "";
                        }
                        if (!isChangePage) {
                            $scope.currentPage[tabIndex] = 1;
                            $scope.sumPage[tabIndex] = 1;
                        }
                        if (lastChecked[tabIndex]) {
                            lastChecked[tabIndex].checked = false;
                        }
                        item.checked = true;
                        lastChecked[tabIndex] = item;
                        utils.async("GET", "base/person",
                            {
                                "start": ($scope.currentPage[tabIndex] - 1) * 20,
                                "count": 20,
                                "eid": $scope.eid,
                                "oid$eq": item.oid,
                                "path": item.path,
                                "cname$match": $scope.search[tabIndex]
                            }
                        ).then(function (res) {
                            if (lastChecked[tabIndex] == item) {//避免异步产生的错误
                                $scope.pCount[tabIndex] = item.pCount = res.data.body.count;
                                item.dataCount = res.data.body.count;
                                if (!item.allPersonLoaded && item.pCount <= 20) {//如果总数据小于等于20,则此次加载的就是全部数据,存起来.
                                    item.allPersonLoaded = true;
                                    item.allPerson = res.data.body.items;
                                }
                                item.countLoaded = true;
                                $scope.sumPage[tabIndex] = item.dataCount != 0 ? Math.ceil(item.dataCount / 20) : 1;
                                res.data.body.items.forEach(function (it) {
                                    it.pp_uid = item.oid;
                                    it.pp_name = item.name;
                                });
                                if (item.selected) {
                                    res.data.body.items.forEach(function (it) {
                                        it.selected = true;
                                    });
                                } else {
                                    res.data.body.items.forEach(function (it) {
                                        for (var i = 0, size = $scope.sels.length; i < size; i++) {
                                            if ($scope.sels[i].pid == it.pid) {
                                                it.selected = true;
                                                break;
                                            }
                                        }
                                    });
                                }
                                $scope.peopleItems[tabIndex] = res.data.body.items;
                                $scope.depName[tabIndex] = item.name;
                            }
                        }, function (error) {
                            console.log(error);
                        });
                    }
                };
                $scope.addAll = function () {
                    if ($scope.search[tabIndex]) {
                        utils.async("GET", "base/person",
                            {
                                "count": 9999,
                                "eid": $scope.eid,
                                "oid$eq": lastChecked[tabIndex].oid,
                                "path": lastChecked[tabIndex].path,
                                "cname$match": $scope.search[tabIndex]
                            }
                        ).then(function (res) {
                            res.data.body.items.forEach(function (it) {
                                var noIn = true;
                                for (var i = 0; i < $scope.sels.length; i++) {
                                    var sel = $scope.sels[i];
                                    if (sel.pid == it.pid) {
                                        noIn = false;
                                        break;
                                    }
                                }
                                if (noIn) {
                                    it.pp_uid = lastChecked[tabIndex].oid;
                                    it.pp_name = lastChecked[tabIndex].name;
                                    $scope.sels.push(it);
                                    it.selected = true;
                                }
                            });
                        }, function (error) {
                            console.log(error);
                        });
                    } else {
                        if (lastChecked[tabIndex] && !lastChecked[tabIndex].selected) {
                            $scope.addDepartment(lastChecked[tabIndex]);
                        }
                    }

                    /*$scope.peopleItems[tabIndex].forEach(function (item) {
                     if (!item.selected) {
                     $scope.addPeople(item)
                     }
                     });*/
                    /**/
                };
                $scope.characterSearch = function (char) {
                    $scope.search[tabIndex] = $scope.search[tabIndex] + char;
                    $scope.onSelect(lastChecked[tabIndex], true);
                };
                // 部门排序
                $scope.sortDep = function () {
                    $scope.sels.sort(function (a, b) {
                        if (a.pp_uid && b.pp_uid) {
                            if (a.pp_uid == b.pp_uid) {
                                return a.py < b.py ? -1 : 1;
                            } else {
                                return a.pp_uid < b.pp_uid ? -1 : 1;
                            }
                        } else if (a.pp_uid && !b.pp_uid) {
                            return 1;
                        } else if (!a.pp_uid && b.pp_uid) {
                            return -1;
                        } else {
                            return a.oid < b.oid ? -1 : 1;
                        }
                    });
                };
                // 职位排序
                $scope.sortPost = function () {
                    $scope.sels.sort(function (a, b) {
                        if (a.pp_uid && b.pp_uid) {
                            if (a.positionId == b.positionId) {
                                return a.py < b.py ? -1 : 1;
                            } else {
                                return a.positionId < b.positionId ? -1 : 1;
                            }
                        } else if (a.pp_uid && !b.pp_uid) {
                            return 1;
                        } else if (!a.pp_uid && b.pp_uid) {
                            return -1;
                        } else {
                            return a.oid < b.oid ? -1 : 1;
                        }
                    });
                };
                // 姓名排序
                $scope.sortName = function () {
                    $scope.sels.sort(function (a, b) {
                        if (a.pp_uid && b.pp_uid) {
                            return a.py < b.py ? -1 : 1;
                        } else if (a.pp_uid && !b.pp_uid) {
                            return 1;
                        } else if (!a.pp_uid && b.pp_uid) {
                            return -1;
                        } else {
                            return a.oid < b.oid ? -1 : 1;
                        }
                    });
                };
                $scope.removeAll = function () {
                    $scope.items.forEach(function (arrIt) {
                        arrIt.forEach(function (it) {
                            it.selected = true;
                            $scope.addDepartment(it);
                        })
                    })
                };
                $scope.addDepartment = function (item) {
                    item.selected = !item.selected;
                    for (var i = 0; i < $scope.sels.length; i++) {
                        if ($scope.sels[i].pp_uid == item.oid) {
                            $scope.sels.splice(i, 1);
                            i--;
                        }
                    }
                    iterationSelectSubSet(item);// 保证下级与上级的状态一致,并 删除已选列表中的下级
                    changePeopleItemsSelected(item);// 部门的选中/取消选中会直接影响到人员
                    if (item.selected) {
                        $scope.sels.push(item);
                        iterationAllBrotherSelected(item); //如果兄弟元素全选中了那就等于选中 父元素
                    } else {
                        removeByObj($scope.sels, item);
                        iterationCancelParent(item);// 取消下级时一并取消上级,并 删除已选列表的父元素,然后添加兄弟元素
                    }
                };
                $scope.addPeople = function (people) {
                    people.selected = !people.selected;
                    if (people.selected) {
                        $scope.sels.push(people);
                        var count = 0;
                        for (var i = 0, size = $scope.sels.length; i < size; i++) {
                            if (lastChecked[tabIndex].oid == $scope.sels[i].pp_uid) {
                                count++;
                            }
                        }
                        // 将"pCount"改成"allPerson.length":如选择部门(公司领导)后，搜索栏(庄)回车搜索,中间组织信息出现单个人员且小于部门人员总数，添加后在右边已选会出现整个部门
                        if (lastChecked[tabIndex].allPerson.length == count) {
                            $scope.addDepartment(lastChecked[tabIndex]);
                        }
                    } else {
                        //removeByObj($scope.sels, people);
                        for (var i = 0, size = $scope.sels.length; i < size; i++) {
                            if ($scope.sels[i].pid && $scope.sels[i].pid == people.pid) {
                                $scope.sels.splice(i, 1);
                                break;
                            }
                        }

                        if (lastChecked[tabIndex].selected) {//TODO 如果操作的是子部门的人员,并且当前部门已选的情况下移除人员问题
                            $scope.addDepartment(lastChecked[tabIndex]);

                            utils.async("GET", "base/person",
                                {
                                    "count": 9999,
                                    "eid": $scope.eid,
                                    "oid$eq": lastChecked[tabIndex].oid,
                                    "path": lastChecked[tabIndex].path,
                                }
                            ).then(function (res) {
                                res.data.body.items.forEach(function (it) {
                                    if (it.pid != people.pid) {
                                        it.pp_uid = lastChecked[tabIndex].oid;
                                        it.pp_name = lastChecked[tabIndex].name;
                                        $scope.sels.push(it);
                                        it.selected = true;
                                    }
                                });
                            }, function (error) {
                                console.log(error);
                            });

                            $scope.peopleItems[tabIndex].forEach(function (it) {
                                if (it.pid != people.pid) {
                                    it.selected = true;
                                }
                            });
                        }
                    }
                };
                $scope.removeSelected = function (item) {
                    removeByObj($scope.sels, item);
                    item.selected = false;
                    if (!item.pp_uid) {
                        changePeopleItemsSelected(item);
                        iterationCancelSubSet(item);
                    } else {
                        if ($scope.peopleItems[0]) {
                            $scope.peopleItems[0].forEach(function (it) {
                                if (it.pid == item.pid) {
                                    it.selected = false;
                                }
                            });
                        }
                    }
                };
                $scope.$watch("sels.length", function () {
                    $timeout(function () {
                        // scrollBottom();
                        var sumCount = 0;
                        $scope.sels.forEach(function (it) {
                            delete it.unfound;
                            if (it.pp_uid) {
                                sumCount++;
                            } else {
                                if (!it.countLoaded) {
                                    utils.async("GET", "base/person/orgcount",
                                        {
                                            "count": 9999,
                                            "eid": $scope.eid,
                                            "oid$eq": it.oid,
                                            "path": it.path
                                        }
                                    ).then(function (res) {
                                        // console.info('orgcount',res);
                                        it.pCount = res.data.body.allcount;
                                        it.countLoaded = true;
                                        $scope.sumCount += it.pCount;
                                    }, function (error) {
                                        console.log(error);
                                    });
                                } else {
                                    sumCount += it.pCount ? it.pCount : 0;
                                }
                            }
                        });
                        $scope.sumCount = sumCount;
                    }, 0);
                });
                // function scrollBottom() {
                //     var div = window.document.getElementById('selsdiv');
                //     div.scrollTop = div.scrollHeight;
                // }

                function changePeopleItemsSelected(dep) {
                    for (var i = 0, size = lastChecked.length; i < size; i++) {
                        if (dep == lastChecked[i]) {
                            $scope.peopleItems[i].forEach(function (it) {
                                it.selected = dep.selected;
                            });
                        }
                    }
                }

                function iterationAllBrotherSelected(item) {
                    var parent = item.parentNode;
                    if (parent && (!parent.selected)) {
                        var allSelected = true;
                        for (var i = 0, size = parent.children.length; i < size; i++) {
                            if (!parent.children[i].selected) {
                                allSelected = false;
                                break;
                            }
                        }
                        if (allSelected) {
                            $scope.addDepartment(parent);
                        }
                    }
                }

                function iterationCancelParent(item) {
                    var parent = item.parentNode;
                    if (parent && parent.selected) {
                        parent.selected = false;
                        changePeopleItemsSelected(parent);
                        removeByObj($scope.sels, parent);
                        parent.children.forEach(function (it) {
                            if (it != item) {
                                $scope.sels.push(it);
                            }
                        });
                        iterationCancelParent(parent);
                    }
                }

                function iterationSelectSubSet(item) {
                    if (item.children) {
                        item.children.forEach(function (it) {
                            it.selected = item.selected;
                            removeByObj($scope.sels, it);
                            for (var i = 0; i < $scope.sels.length; i++) {
                                if ($scope.sels[i].pp_uid == it.oid) {
                                    $scope.sels.splice(i, 1);
                                    i--;
                                }
                            }
                            changePeopleItemsSelected(it);
                            iterationSelectSubSet(it);
                        });
                    }
                }

                function iterationCancelSubSet(item) {
                    if (item.children) {
                        item.children.forEach(function (it) {
                            it.selected = false;
                            iterationCancelSubSet(it);
                            changePeopleItemsSelected(it);
                        });
                    }
                }

                function removeByObj(arr, obj) {
                    for (var i = 0, size = arr.length; i < size; i++) {
                        if (arr[i] == obj) {
                            arr.splice(i, 1);
                            return true;
                        }
                    }
                }

                $scope.init = function () {
                    if ($scope.items[tabIndex].length < 1) {
                        if (tabIndex == 0) {
                            utils.async("GET", "base/organization", {
                                "count": 9999,
                                "enable$eq": true,
                                "eid": $scope.eid
                            }).then(function (res) {
                                res.data.body.items.forEach(function (item) {
                                    item.parent = item.pid;
                                    item.uid = item.oid;
                                });

                                $scope.items[tabIndex] = utils.setIteration("", res.data.body.items);
                                //$scope.items[tabIndex] = formatToTree(mockdatas[tabIndex]);
                            });
                        } else if (tabIndex == 1) {
                            //utils.async("GET", "department/all", {"count": 99999}).then(function (result) {
                            //$scope.items[tabIndex] = formatToTree(mockdatas[tabIndex]);
                            //});
                        } else if (tabIndex == 2) {
                            //utils.async("GET", "department/all", {"count": 99999}).then(function (result) {
                            //$scope.items[tabIndex] = formatToTree(mockdatas[tabIndex]);
                            //});
                        }
                    }
                };
                var temp = null;

                $scope.init();
                $scope.changeChildren = function (item) {
                    var checked = item.checked;
                    item.list.forEach(function (it) {
                        it.checked = checked;
                    });
                };
                $scope.close = function () {
                    //$modalInstance.dismiss();
                };
            }
        ]);
});