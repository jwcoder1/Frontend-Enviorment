define(['plugins/base/directives/tree.organization'], function () {
    "use strict";
    angular.module('app')
        .controller('app.page.appGroupMember', ['$scope', 'ngDialog', '$location', '$http', 'utils', 'toastr', 'settings',
            function ($scope, ngDialog, $location, $http, utils, toastr, settings) {
        	
        		$scope.myfilter = function(item){
        			var val = $scope.memberSearch;
        			if(val==null)
        				val = "";
        			if(item.appid.indexOf(val)!=-1 || item.show.indexOf(val)!=-1){
        				return true
        			}
        		}
        	
                var self = $scope;
                self.result = [];
                self.title = "分组设置";
                
                utils.async("get","base/appGroup").then(function(res){
                	res.data.body.items.forEach(function(item){
                		item.tuid = item.uid;
                		item.parent = item.pid;
                		item.uid = item.agid;
                	});
                	var menus = utils.setIteration("", res.data.body.items);
                	res.data.body.items.forEach(function(item){
                		item.uid = item.tuid;//方法解析的是uid,所以方法后设回来
                	});
                    self.node = {"children": menus, isRoot: true};
                },function(error){
                	//toastr.warning(error.message);
                });

                var filter = self.filter = {
            		"start":0,
            		"count":999
        		};
                
                var typeMap = {
                	"A" : "账号"
                }
                
                function loadDetail(){
                	filter["agid$eq"] = self.current.agid;
                	utils.async("get","base/appGroupMember",filter).then(function(res){
                		self.appGroupMembers = res.data.body.items;
                	},function(error){
                		//toastr.warning(error.message);
                	});
                }
                
                function editAppGroup(model,mode){
                	ngDialog.open({
                        template: "plugins/base/pages/appgroup.edit.html",
                        controller: function ($scope) {
                            $scope.model = angular.copy(model);
                            $scope.save = function (form) {
                            	if($scope.model.name){
	                            	var method = $scope.model.uid?"put":"post";
	                            	delete $scope.model.parentNode;
	                            	delete $scope.model.children;
	                            	delete $scope.model.parent;
	                            	delete $scope.model.selected;
	                            	delete $scope.model.tuid;
	                            	delete $scope.model.type;
	                            	if(mode=="addRoot"){
	                            		if(self.node.children && self.node.children.length>0){
	                            			$scope.model.seq = 1 + self.node.children[self.node.children.length-1].seq;
	                            		}else{
	                            			$scope.model.seq = 1;
	                            		}
                            		}else if(mode=="addChildren"){
                            			if(!self.current.children){
                            				self.current.children = [];
                            			}
                            			if(self.current.children.length > 0){
                            				$scope.model.seq = 1 + self.current.children[self.current.children.length-1].seq;
                            			}else{
                            				$scope.model.seq = 1;
                            			}
                            		}//初始化seq
	                            	utils.async(method, "base/appGroup" + (method=="put"?"/"+$scope.model.uid:""), $scope.model)
	                    				.then(function (res) {
	                    					var item = res.data.body;
	                    					item.parent = item.pid;
	                                		if(mode=="addRoot"){
	                                			self.node.children.push(item);
	                                		}else if(mode=="addChildren"){
	                                			self.current.children.push(item);
	                                		}else if(mode=="edit"){
	                                			self.current.name = item.name;
	                                		}
	                                        ngDialog.closeAll();
	                                    },
	                                    function (error) {
	                                        //toastr.warning(error.message);
	                                    }
	                                );
                            	}else{
                            		toastr.warning("名称不能为空");
                            	}
                            }
                        }
                    });
                }
                
                function deleteByNodes(nodes,current){
                	for(var i=0;i<nodes.length;i++){
                		var item = nodes[i];
                		if(item==current){
                			nodes.splice(i,1);
                			return true;
                		}else if(item.children){
                			if(deleteByNodes(item.children,current)){
                				return true;
                			}
                		}
                	}
                }
                
                self.action = {
                	addmember: function(type){
                		if(!self.current){
                			toastr.warning("请选择应用分组!");
                			return;
                		}
                		if(type=="A"){
                			ngDialog.open({
                                template: "plugins/base/pages/selector.html",
                                className: "ngdialog-theme-default ngdialog-theme-custom my-selector-dialog",
                                controller: function ($scope, $translate) {
                                	$scope.current = {
                                		"name": "base",
                                		"page": "application"
                                	};
                                	$scope.config = {
                            			operations: {
                            				'confirm': {
                                                name: "确认",
                                                action: function () {
                                                	var rows = $scope.gridApi.selection.getSelectedRows() || [];
                                                    if (rows.length < 1) {
                                                        toastr.warning("请选择要添加的应用");
                                                        return;
                                                    }else{
                                                    	var ids = [],names = [];
                                                    	rows.forEach(function(en){
                                                    		if(en.aid && en.name){
                                                    			ids.push(en.aid);
                                                    			names.push(en.name);
                                                    		}
                                                    	});
                                                    	utils.async("post","base/appGroupMember",{
                                                    		"appid": ids.toString(),
                                                    		"show": names.toString(),
                                                    		"agid": self.current.agid
                                                    	}).then(function(res){
                                                    			loadDetail();
                                                    			ngDialog.closeAll();
	                                                    	},function(error){
	                                                    		//toastr.warning(error.message);
	                                                    	}
	                                                    );
                                                    }
                                                }
                                            }
                            			},
                            			filters: [{
                                            type: "input",
                                            name: "name$match",
                                            label: "名称"
                                        }, {
                    					    type: "input",
                    					    name: "aid$match",
                    					    label: "账号"
                    					}, {
                                            type: "select",
                                            name: "enable$eq",
                                            label: "状态",
                                            titleMap: [{
                                                value: '1',
                                                name: "已启用"
                                            }, {
                                                value: '0',
                                                name: "未启用"
                                            }]
                                        }],
                                        headers: {
                                            "name": {
                                                displayName: "名称",
                                                minWidth: 100
                                            },
                                            "aid": {
                                                displayName: "账号",
                                                minWidth: 70
                                            },
                                            "mail": {
                                                displayName: "电子邮箱",
                                                minWidth: 150
                                            },
                                            "enable": {
												displayName: "已启用",
												width: 70,
												cellTemplate: "<div class='ui-grid-cell-contents'>{{row.entity.enable?'已启用':'未启用' | translate}}</div>"
                                            }
                                        }
                                	};
                                }
                            });
                		}
                	},
					selectGroupSet: function (appGroupMember) {
                        self.current = appGroupMember;
                        loadDetail();
                    },
                    removeMember: function (appGroupMember) {
                    	utils.async("delete","base/appGroupMember/"+appGroupMember.uid).then(function(res){
                    		loadDetail();
                    	},function(error){
                    		//toastr.warning(error.message);
                    	});
                    },
                    addRoot: function(){
                    	editAppGroup({"pid":""},"addRoot");
                    },
                    addChildren: function(){
                    	editAppGroup({"pid":self.current.agid,"company":self.current.company},"addChildren");
                    },
                    editAppGroup: function(){
            			editAppGroup(angular.copy(self.current),"edit");
                    },
                    delAppGroup: function(){
                    	utils.async("DELETE", "base/appGroup/"+self.current.uid)
        				.then(function (res) {
        						deleteByNodes(self.node.children,self.current);
        						self.current = null;
	                        },
	                        function (error) {
	                            //toastr.warning(error.message);
	                        }
        				);
                    }
                }

            }
        ]);
});