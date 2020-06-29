define(['plugins/base/pages/uid.config','plugins/base/pages/uid.detail'],
    function (config) {
        angular.module('app').controller('base.uid',
            function ($scope, $rootScope, utils, path, getBaseView, settings, $translate, $timeout,dialog, toastr, ngDialog) {
                var scope = getBaseView($scope, 'plugins/base/pages/uid.detail.html'); //虚拟继承基础的view.
                scope.loadSubMenus("all");  //告诉母版页面加载左侧菜单。

                /**
                 * 所有页面要绑定的
                 */
                scope.binds = function () {

                    /**
                     * 声明查询过滤条件字段
                     * @type {{}}
                     */
                    scope.filter = {};

                    /**
                     * 表格设置
                     */
                    scope.gridOptions = angular.extend({
                        data: 'entries',
                        onRegisterApi: function (gridApi) {
                            scope.gridApi = gridApi;

                            gridApi.pagination.on.paginationChanged(scope, function (newPage, pageSize) {
                                scope.filter.start = (newPage - 1) * pageSize;
                                scope.filter.count = pageSize;
                                scope.load();
                            });

                            gridApi.core.on.renderingComplete(scope, function (ar1) {
                                $timeout(function () {
                                    angular.element(window).trigger('resize');
                                }, 0);
                            });

                            gridApi.colResizable.on.columnSizeChanged(scope, function (ar1, ar2) {
                                var cols = [];
                                angular.forEach(gridApi.grid.columns, function (column) {
                                    cols.push(column.width);
                                });
                                //localStorage.setItem(gridKey + "_grid", cols);
                            });
                        },
                        appScopeProvider: { //行模版内的事件定义
                            onDblClick: function (event, row) {
                                if (row && row.entity)
                                    scope.loadDetail(row.entity);
                            },
                            customClick: function (name, row) {
                                //if (angular.isFunction(scope[name])) {
                                //    scope[name].apply(this,[row.entity]);
                                //}
                            }
                        },
                        rowTemplate: "<div ng-dblclick=\"grid.appScope.onDblClick($event,row)\" " +
                        "ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" " +
                        "class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" " +
                        "ui-grid-cell ></div>"
                    }, settings.uiGrid);

                    /**
                     * 绑定列表的操作按钮渲染绑定
                     * @type {{add: {name: string, icon: string}, edit: {name: string, icon: string, action: Function}, del: {name: string, icon: string, action: Function}, enable: {name: string, icon: string, action: Function}, disable: {name: string, icon: string, action: Function}, unlock: {name: string, icon: string, action: Function}}}
                     */
                    scope.listOperations = config.listOperations;

                    /**
                     * 表格列定义
                     * @type {{name: {displayName: string, minWidth: number, maxWidth: number}, aid: {displayName: string, minWidth: number, maxWidth: number}, displayName: {displayName: string, minWidth: number, maxWidth: number}, email: {displayName: string, minWidth: number, maxWidth: number}, enable: {displayName: string, minWidth: number, maxWidth: number, cellTemplate: string}, type: {displayName: string, minWidth: number, maxWidth: number}, password: {displayName: string, minWidth: number, maxWidth: number, visible: boolean}, activeCode: {displayName: string, minWidth: number, maxWidth: number}, mobile: {displayName: string, minWidth: number}}}
                     */
                    scope.headers = config.headers;

                    /**
                     * 绑定查询字段
                     * @type {*[]}
                     * 对于需要数组的配置都定义成对象配置方式,这样容易定位,代码容易折叠收起
                     */
                    scope.filterItems = config.filterItems;         
                    function getEnterprises(obj){
                    	 	utils.async("get", "base/enterprise/getenterprises").then(function (res) { 
	                	 		for ( var i=0;i<res.data.body.Enterprises.length; i++ ){
	                	 			obj.titleMap.push( {value:res.data.body.Enterprises[i].eid,name:res.data.body.Enterprises[i].cname} ); 
	                	 		}
                    	 	}, function (error) {
                                //toastr.warning(error.message);
                            });
                    }
                    getEnterprises(scope.filterItems[4]);
                    
                    
                    
                    /**
                     * 绑定详情对象
                     * @type {{}}
                     */
                    scope.model = {};

                    /**
                     * 最终的按钮操作行为实现
                     * @type {{}}
                     */
                    scope.action = {
                		showAuthority: function (event){
                			var eid= scope.filter.eid$eq;
                			var ent=new Object();
                            var rows = scope.action.rowsActionCheck(1);                      
                            if (rows) {
                            	ngDialog.open({
                                    template: "plugins/base/pages/uid.authority.html", 
                                    className: "ngdialog-theme-default ngdialog-theme-custom my-selector-dialog",
                                    controller: function ($scope, $translate) {
                                    	$scope.node = {"children": null, isRoot: true};
                                    	$scope.ents=[];
                                    	$scope.ent=ent;                                     	
                                    	$scope.entity = rows[0]; 
                                    	$scope.roles=[]; //角色
                                    	
                                	 	utils.async("get", "base/enterprise/getbyperson?pid="+$scope.entity.pid).then(function (res) { 
                                	 		for ( var i=0;i<res.data.body.length; i++ ){
                                	 			$scope.ents.push( {value:res.data.body[i].eid,name:res.data.body[i].cname} ); 
                                	 		}
                                	 		 
//                              	 		if (eid!=undefined && eid!=null && eid!=''){
//                              	 			$scope.ent.value=eid;
//                              				for (var i=0;i<$scope.ents.length;i++){
//                              					var item=$scope.ents[i];
//                              					if (item.value==eid){
//                              						$scope.ent.name=item.name;
//                              						break;
//                              					}
//                              				}
//                              			 }else {
//                              				 if ($scope.ents.length>0){
//                              					 $scope.ent=$scope.ents[0];
//                              				 }
//                              			}
	                                	 	}, function (error) {
	                                            //toastr.warning(error.message);
	                                       });
                          	
                                    	var typeMap = {
                                    			 "A": "账号",
                                                 "AT": "账号类型",
                                                 "E": "企业",
                                                 "ET": "企业类型",
                                                 "O": "组织",
                                                 "PN": "职务",
                                                 "PT": "岗位",
                                                 "P": "人员",
                                                 "G": "群组"
                                        };      
                                    	//
                                    	function filterRoles(veid){
                                    		$scope.roles=[]; 
                                    		if (veid==undefined || veid==null || veid==''){
                                    			return false;
                                    		}
                                    		
                                    		if ($scope.authoritys!=undefined && $scope.authoritys.length>0){
                                    			for (var i=0;i<$scope.authoritys.length;i++){
                                    				var item=$scope.authoritys[i];
                                    				if (item.eid==veid){
                                    					item.selected=false;
                                    					$scope.roles.push(item);
                                    				}
                                    			}
                                    		}
                                    		
                                    		if ($scope.roles.length>0){
                                    			$scope.roles[0].selected=true;
                                        		var aid=$scope.roles[0].aid;	 
                                				loadmenus(aid);//树
                                    		}else {
                                    			loadmenus(null);//树
                                    		}
                                    	}
                                    	
                                    	function loadmenus(aid){
                                    		$scope.node = {"children": null, isRoot: true};
                                    		if ( aid==undefined  || aid==null || aid=='' ){
                                    			return false;
                                    		}
                                    		utils.async("get", "base/authority/aidmenus", {"aid": aid}).then(function (res) {  
                                                var menus = utils.setIteration("", res.data.body);
                                                $scope.node = {"children": menus, isRoot: true};
                                            }, function (error) {
                                            });
                                    	}
                                    	
                                    	$scope.action={
                                    			onEnterpriseChange:function(ent){
                                    				filterRoles(ent.value);
                                    		   },
                                    		   selectAuthority:function(au){
                                    			  for (var i=0;i<$scope.roles.length;i++){
                                    				  var item=$scope.roles[i];
                                    				  item.selected=(item.aid==au.aid);  				  
                                    			  }
                                    			  loadmenus(au.aid);
                                    		   }
                                    	} //action
                                    	
                                    	function loadAuthority() {
                                            utils.async("get", "base/authority/uidappauth", {"uid":$scope.entity.uid}).then(function (res) {
                                            	$scope.authoritys = res.data.body.items;
                                            	$scope.authoritys.forEach(function (it) {
                                                    it.showType = typeMap[it.type];
                                                }); 
                                            	filterRoles($scope.ent.value);                            				
                                            }, function (error) {
                                            	
                                            });
                                        }
                                    	loadAuthority();
                                                           				
                                    }//controller 
                                });
                            }
                		},
                		
                		showApplication: function (event){
                			var eid= scope.filter.eid$eq;
                			var rows = scope.action.rowsActionCheck(1);
                			
                            if (rows) {
                            	ngDialog.open({
                                    template: "plugins/base/pages/uid.appauthority.html",
                                    className: "ngdialog-theme-default ngdialog-theme-custom my-selector-dialog",
                                    controller: function ($scope, $translate) {
                                    	var selfscope=$scope;
                                    	$scope.node = {"children": null, isRoot: true};
                                    	selfscope.ents=[];                                    	
                                    	selfscope.ent={};                           
                                    	selfscope.entity = rows[0]; 
                                    	selfscope.roles=[]; //角色
                                    	var typeMap = {
                                    			 "A": "账号",
                                                 "AT": "账号类型",
                                                 "E": "企业",
                                                 "ET": "企业类型",
                                                 "O": "组织",
                                                 "PN": "职务",
                                                 "PT": "岗位",
                                                 "P": "人员",
                                                 "G": "群组"
                                        };
                                    	
                                    	utils.async("get", "base/enterprise/getbyperson?pid="+selfscope.entity.pid).then(function (res) { 
                                	 		for ( var i=0;i<res.data.body.length; i++ ){
                                	 			selfscope.ents.push( {value:res.data.body[i].eid,name:res.data.body[i].cname} ); 
                                	 		}
//                              	 		if (eid!=undefined && eid!=null && eid!=''){
//                              	 			selfscope.ent.value=eid;
//                              				for (var i=0;i<selfscope.ents.length;i++){
//                              					var item=selfscope.ents[i];
//                              					if (item.value==eid){
//                              						selfscope.ent.name=item.name;
//                              						break;
//                              					}
//                              				}
//                              			 }else {
//                              				 if (selfscope.ents.length>0){
//                              					 selfscope.ent=selfscope.ents[0];
//                              				 }
//                              			}
	                                	 	}, function (error) {
	                                            //toastr.warning(error.message);
	                                       });
                                    	
                                    	selfscope.onSelect=function(item){
                                    		return false;
                                    	}
                                    	//
                                    	function filterRoles(veid){
                                    		selfscope.roles=[]; 
                                    		
                                    		if (veid==undefined || veid==null || veid==''){
                                    			return false;
                                    		}
                                    		
                                    		if (selfscope.appAuthoritys!=undefined && selfscope.appAuthoritys.length>0){
                                    			for (var i=0;i<selfscope.appAuthoritys.length;i++){
                                    				var item=selfscope.appAuthoritys[i];
                                    				if (item.eid==veid){
                                    					var isRepeat=false;
                                    					//处理item 同名的情况
                                        				for (var j=0; j<selfscope.roles.length;j++ ){
                                        					var roleitem=selfscope.roles[j];
                                        					if (roleitem.type==item.type && roleitem.value==item.value && roleitem.type2==item.type2 && roleitem.value2==item.value2){
                                        						isRepeat=true;
                                        						break;
                                        					} 
                                        				}
                                        				if (!isRepeat){
                                        					item.selected=false;
                                        					selfscope.roles.push(item);
                                        				}                                    					
                                    				}
                                    			}
                                    		}
                                    		
                                    		if (selfscope.roles.length>0){
                                    			selfscope.roles[0].selected=true;
                                        		var au=selfscope.roles[0];
                                        		loadapps(au);//树
                                    		}else {
                                    			loadapps(null);
                                    		}
                                    	}
                                    	
                                    	function loadAuthority() {
                                            utils.async("get", "base/appAuthority/uidappauth", {"uid":selfscope.entity.uid}).then(function (res) {
                                            	selfscope.appAuthoritys = res.data.body.items;
                                            	selfscope.appAuthoritys.forEach(function (it) {
                                                    it.showType = typeMap[it.type];
                                                });
                                            	filterRoles(selfscope.ent.value);
                                            }, function (error) {
                                            });
                                        }
                                    	loadAuthority();
                                    	
                                    	/*selfscope.$watch('ent.value',function(newValue,oldValue){
                                    		console.info('new',newValue);
                                    		if (newValue!=oldValue && newValue!=null && newValue!=undefined ){
                                    			filterRoles(newValue);
                                    		}
                                    	});*/
                                    	
                                    	selfscope.action={
                                    			onEntChange:function(ent){
                                    				filterRoles(ent.value);
                                    		   },
                                    		   selectAuthority:function(au){
                                    			  for (var i=0;i<selfscope.roles.length;i++){
                                    				  var item=selfscope.roles[i];
                                    				  item.selected=(item.uid==au.uid );  				  
                                    			  }
                                    			  loadapps(au);
                                    		   }
                                    	} //action
                                    	
                                    	function loadapps(au){
                                    		selfscope.node = {"children": null, isRoot: true};
                                    		if (au==undefined || au==null ){
                                    			return false;
                                    		}
                                    		utils.async("get", "base/appGroup", {"count": 9999, "eid":au.eid }).then(function (res) {
                                                utils.async("get", "base/appAuthority/auapps", {  
                                                    "uid": $scope.entity.uid,
                                                    "type":au.type,
                                                    "value":au.value,
                                                    "type2":au.type2,
                                                    "value2":au.value2
                                                }).then(function (res2) {
                                                    res.data.body.items.forEach(function (item) {
                                                        item.parent = item.pid;
                                                        item.uid = item.agid;
                                                        item.deleted=true;
                                                    });
                                                  
                                                    res2.data.body.items.forEach(function (item) {
                                                        item.parent = item.agid;
                                                        item.name = item.show;
                                                        item.isApp = true;
                                                        for (var i=0;i<res.data.body.items.length;i++){
                                                        	var pitem=res.data.body.items[i];
                                                        	if (item.agid==pitem.uid){
                                                        		pitem.deleted=false;
                                                        		break;
                                                        	}
                                                        } 
                                                    });

                                                    //1在2中不存在，则删除
                                                    var ayy=[];
                                                    for (var i=0;i<res.data.body.items.length;i++){
                                                    	var item=res.data.body.items[i];
                                                    	if (!item.deleted)
                                                    		ayy.push(item);
                                                    }
                                                                                                       
                                                    var menus = utils.setIteration("", res2.data.body.items.concat(ayy));
                                                    $scope.node = {"children": menus, isRoot: true};

                                                }, function (error2) {
                                                });

                                            }, function (error) {
                                            });
                                    	}
                                    }
                                });
                            }
                		},
                        add: function (event, data) {
                            scope.loadDetail({});
                        },
                        save: function (event, form) {
                            scope.$broadcast("schemaFormValidate");

                            if (form.$valid) {
                                if (scope.model.status=='TEMP'){
                                    if (scope.model.tempStaffNo==null || scope.model.tempStaffNo=='' || typeof(scope.model.tempStaffNo)=='undefined'){
                                       toastr.info("请填写临时职工号");
                                       return ;
                                    } 
                                }

                                if (scope.model.status=='EFFECTED'){
                                    if (scope.model.staffNo==null || scope.model.staffNo=='' || typeof(scope.model.staffNo)=='undefined'){
                                       toastr.info("请填写职工号");
                                       return ;
                                    } 
                                }
                             
                                var method = scope.model.uid ? "PUT" : "POST";
                                if (method == "put") {
                                    delete scope.model['new'];
                                }

                                var data = angular.copy(scope.model);
                                if (data) {
                                    for (var k in data) {
                                        if (data.hasOwnProperty(k) && angular.isDate(data[k])) {
                                            data[k] = moment(data[k]).format("YYYY-MM-DD HH:mm:ss");
                                        }
                                    }
                                }

                                utils.ajax({
                                    method: method,
                                    url: "base/uid" + (data.uid ? ("/" + data.uid) : ""),
                                    mockUrl: "plugins/base/data/uid.save.json",
                                    data: data
                                }).then(function (res) {
                                    scope.load();
                                    scope.unloadDetail();
                                });
                            }

                        },
                        edit: function (event, data) {
                            var rows = scope.action.rowsActionCheck(1);
                            if (rows) {
                                scope.loadDetail(rows[0]);
                            }
                        },
                        del: function (event, data) {
                            var rows = scope.action.rowsActionCheck();

                            if (rows.length) {
                                dialog.confirm('确定删除该条记录?').then(function () {
                                    var loading = 0;
                                    angular.forEach(rows, function (row) {
                                        utils.ajax({
                                            method: "DELETE",
                                            url: 'base/uid/' + row.uid,
                                            mockUrl: 'plugins/base/data/uid.del.json'
                                        }).then(function (res) {
                                            loading++;
                                            if (loading == rows.length) {
                                                scope.load();
                                            }
                                        });
                                    });
                                });
                            }
                        },
                        reset: function (event) {
                            angular.forEach(scope.filter, function (raw, key) {
                                if (key != 'count')
                                    delete scope.filter[key];
                            });
                        },
                        close: function () {
                            scope.unloadDetail();
                        },
                        back: function () {
                            scope.unloadDetail();
                        },
                        rowsActionCheck: function (count) {
                            var rows = scope.action.bulk();
                            if (count === 1 && rows.length !== 1) {
                                toastr.info("所选条数必须是一条！");
                                return false;
                            } else if (!rows.length) {
                                toastr.info("所选条数必须多于一条！");
                            }
                            return rows;
                        },
                        rowAction: function () {

                        },
                        bulk: function () {
                            return scope.gridApi.selection.getSelectedRows() || [];
                        }
                    };
                };

                /**
                 * 定义页面加载数据
                 */
                scope.load = function () {
                    var data = angular.copy(scope.filter);
                    utils.ajax({
                        method: 'GET',
                        url: 'base/uid',
                        // mockUrl: "plugins/base/data/uids.json",
                        params: data
                    }).then(function (res) {
                        var data = res.data;
                        scope.gridOptions.columnDefs = utils.gridDefine(scope.headers, "base/uid");
                        if (data.body.items){
                            for (var i=0; i<data.body.items.length;i++){
                               if (data.body.items[i].status=='TEMP'){
                                  data.body.items[i].status='临时职工';
                               }else{
                                  data.body.items[i].status='正式职工';
                               }
                            } 
                            scope.entries = data.body.items;
                        };

                        scope.gridOptions.totalItems = data.body.count;
                    });
                };

                /**
                 * 初始化页面
                 */
                scope.init();
            });

    });
