webModel.controller('indexs', ["$scope", "httpAjax","$timeout","$window","util",function ($scope, httpAjax,$timeout,$window,util) {

	//分页参数
    $scope.page = {
        page_rows: 5,
        page_index: 1
    };
    var hrefs = GetRequest();  
    $scope.planStart=true;
    $scope.task_statu="";
    $scope.taskSearch="";
   	
    //获取系统列表
	$scope.systemType=function(){
		var sendDate={};
			sendDate.page_index=$scope.page.page_index;
		var timestamp = Date.parse(new Date())/1000;
		var sign = getSign("getProjectList", timestamp);
		var urlss="appId=92b9c8d2b03d43b1&apiName=getProjectList&sign="+sign+"&time="+timestamp+"&format=json";
		util.httpRequest(urlss,"POST",sendDate,true).then(function(datas){
			if(datas.status==1){
	            $scope.systemTypeList=datas.data.page_data;
	            if($scope.systemTypeList!=undefined &&  $scope.systemTypeList!=''){
		            $timeout(function(){
	                    $scope.projcetUrl=getStorage("projcet");
	                    if(hrefs['dat']!=undefined){
	                       $scope.pro = hrefs['dat'];
	                        angular.forEach($scope.systemTypeList,function(data,index){
	                            if(data.project_id==$scope.pro){
	                                angular.element(".clearfix").find('li').eq(index).addClass("activer");
	                            }
	                        })
	                     }else{
	                        angular.element(".clearfix").find('li').eq(0).addClass("activer");
	                        $scope.projcetUrl={
	                        	nameCode:""
	                        }
	                        $scope.projcetUrl.nameCode=angular.element(".clearfix").find('li').eq(0).addClass("activer").text();
	                        var info={
	                          "zid":angular.element(".clearfix .activer").attr("dat-stute"),
	                          "nameCode":angular.element(".clearfix .activer").text()
	                         }
	                        setStorage("projcet",info);
	                     }
	                    $scope.getMyAkList();
	                },150)
				}
	        }else{
	          $.alerts({
	            msg:datas.message	
	          })
	        }
		})
	}
	$scope.systemType();
	

	// 请求初始列表
	$scope.getMyAkList=function(){

		var sendDate={};
		sendDate.page_rows=$scope.page.page_rows;
		sendDate.page_index=$scope.page.page_index;
		sendDate.auth_type=2;
		sendDate.project_type=parseInt(angular.element(".clearfix .activer").attr("dat-stute"));
		var timestamp = Date.parse(new Date())/1000;
		var sign = getSign("getMyTaskList", timestamp);
		var urlss="appId=92b9c8d2b03d43b1&apiName=getMyTaskList&sign="+sign+"&time="+timestamp+"&format=json";
		util.httpRequest(urlss,"POST",sendDate,false).then(function(datas){
			if(datas.status==1){

            $scope.MyAkList=datas.data.data;
			 $scope.total = datas.data.page_total * $scope.page.page_rows;
	        }else{
	          $.alerts({
	            msg:datas.message
	          })
	        }
		})
	}
	
	// tab切换请求
	$scope.projectType=function($event){
		$scope.blsit=true;
		var info={
            "zid":angular.element($event.target).attr("dat-stute"),
            "nameCode":angular.element($event.target).text()
            }
        setStorage("projcet",info);
        $scope.projcetUrl=getStorage("projcet");
		angular.element("#taskList select").val("");
		angular.element("#taskList input[type=radio]").attr("checked",false);
		 $scope.task_statu='';
		var sendDate={};
		sendDate.project_type=parseInt(angular.element($event.target).attr("dat-stute"));
		sendDate.page_rows=$scope.page.page_rows;
		sendDate.page_index=1;
		sendDate.auth_type=2;
		var timestamp = Date.parse(new Date())/1000;
		var sign = getSign("getMyTaskList", timestamp);
		var urlss="appId=92b9c8d2b03d43b1&apiName=getMyTaskList&sign="+sign+"&time="+timestamp+"&format=json";
		util.httpRequest(urlss,"POST",sendDate,true).then(function(datas){
			if(datas.status==1){
            $scope.MyAkList=datas.data.data;
			$scope.total = datas.data.page_total * $scope.page.page_rows;
			$scope.blsit=false;
	        }else{
	          $.alerts({
	            msg:datas.message
	          })
	        }
		})
	}


	// 搜索按钮
	$scope.search=function(){
			var sendData=angular.element("#taskList").serializeObject();
			var sendDate={};
			sendDate.time_end=sendData.time_end;
			sendDate.time_start=sendData.time_start;
			sendDate.page_rows=$scope.page.page_rows;
			sendDate.project_type=parseInt(angular.element(".activer").attr("dat-stute"));
			sendDate.time_type=angular.element("input[name='taskTime']:checked").val(); 
			sendDate.task_status=$scope.task_statu;
			sendDate.time_query=angular.element('input:radio[name="state"]:checked').val();
			sendDate.query_text=$scope.taskSearch;
			sendDate.op_type=1;
			sendDate.auth_type=2;
			if(sendDate.time_query==undefined){
	            if(sendDate.time_end && sendDate.time_start){
	                sendDate.time_query=3;
	            }else{
	                sendDate.time_query="";
	            } 
	        }
			var timestamp = Date.parse(new Date())/1000;
	        var sign = getSign("getMyTaskList", timestamp);
	        var urlss="appId=92b9c8d2b03d43b1&apiName=getMyTaskList&sign="+sign+"&time="+timestamp+"&format=json";
	        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
	            if(datas.status==1){
	                $scope.MyAkList=datas.data.data;
	                $scope.total = datas.data.page_total * $scope.page.page_rows;
	            }else{
	                $.alerts({
	                    msg:datas.message
	                })
	            }
	        })
	}

	$scope.Schedule=function(r){
		if(r==null){
			return ;
		}
		$scope.search();
	}

	//获得本周的开始日期
	$scope.thisWeek = function(){

	 var getWeekStartDate = new Date(nowYear, nowMonth, nowDay- nowDayOfWeek+1 );
	 var getWeekStartDate = formatDate(getWeekStartDate);
	 $scope.tswkStart = getWeekStartDate;

	 angular.element("#J-x3").val($scope.tswkStart);
	 //获得本周的结束日期
	 var getWeekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek));
	 var getWeekEndDate = formatDate(getWeekEndDate);
	 $scope.tswkEnd = getWeekEndDate;
	 angular.element("#J-xl4").val($scope.tswkEnd);
	};

	$scope.thisMonth = function(){
	 //获得本月的开始日期
	 var getMonthStartDate = new Date(nowYear, nowMonth, 1);
	 var getMonthStartDate = formatDate(getMonthStartDate);
	 $scope.startThisMonth = getMonthStartDate;
	 angular.element("#J-x3").val($scope.startThisMonth);
	 //获得本月的结束日期
	 var getMonthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
	 var getMonthEndDate = formatDate(getMonthEndDate);
	 $scope.endThisMonth = getMonthEndDate;
	 angular.element("#J-xl4").val($scope.endThisMonth);
	};

	$scope.ckNull=function(){
		$scope.alls=true;
		angular.element("#J-x3").val("");
		angular.element("#J-xl4").val("");
		
		$timeout(function(){
			$scope.$apply(function () {
		     　　$scope.alls=false;
		      });
		},1500)
	}

	//显示弹窗
	$scope.end=function(id,start,handle_type){
		$scope.endId=id;
		$scope.handle=handle_type;
     	$scope.finishTime=true;
     	var myDate = new Date(); 
        var my=myDate.toLocaleDateString(); 
        var len= my.split("/");
        var times=len[0]+'-'+len[1]+'-'+len[2];
        var date1 = new Date(start);
        var date2 = new Date(times);
        if(date1.getTime() < date2.getTime()){
            $scope.setTextaera=true;
        }else{
            $scope.setTextaera=false; 
        }
  }

  //关闭
  $scope.reClose=function(){
   $scope.finishTime=false;
   angular.element(".timeSocl input[type=radio]").attr("checked",false);
    angular.element("#releases textarea").val("");
   angular.element("textarea").val("");
   $scope.code=false;
   $scope.rele=false;
  }
	//设置实际开始时间
	$scope.beginTime=function(r,handle_type){
		$.confirms({
            msg:"是否确定开始？",
            callback:function(){
               var sendDate={};
				sendDate.xid=r;
				sendDate.handle_type=handle_type;
				sendDate.auth_type=2;
				var timestamp = Date.parse(new Date())/1000;
		        var sign = getSign("startWork", timestamp);
		        var urlss="appId=92b9c8d2b03d43b1&apiName=startWork&sign="+sign+"&time="+timestamp+"&format=json";
		        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
		            if(datas.status==1){
		               $.alerts({
							msg:datas.message,
							callback:function(){
								$window.location.reload();
							}
						})
		            }else{
		                $.alerts({
		                    msg:datas.message
		                })
		            }
		        })  
            },
            errors:function(){
                return false;
            }
        })
		
	}

	//设置实际结束时间
	$scope.submits=function(){
		
	var sendDate=angular.element("#timeSocl").serializeObject();
		sendDate.xid=$scope.endId;
		sendDate.handle_type=$scope.handle;
		sendDate.auth_type=2;
		if($scope.setTextaera==true && $.trim(sendDate.remark)==""){
			$.alerts({
				msg:'请填写备注'
			})
			return false;
		}
		if(!sendDate.is_test || (sendDate.is_test==0 && !sendDate.is_release)){
			$.alerts({
				msg:'有未填选项，请选择'
			})
			return false;
		}
		// if(sendDate.is_test==1){
		// 	sendDate.is_release=1;
		// }
		$.confirms({
            msg:"是否确定结束？",
                callback:function(){
                	var timestamp = Date.parse(new Date())/1000;
			        var sign = getSign("completeWork", timestamp);
			        var urlss="appId=92b9c8d2b03d43b1&apiName=completeWork&sign="+sign+"&time="+timestamp+"&format=json";
			        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
			            if(datas.status==1){
			                $.alerts({
								msg:datas.message,
								callback:function(){
									$window.location.reload();
								}
							})
			            }else{
			                $.alerts({
			                    msg:datas.message
			                })
			            }
			        }) 
                },
                errors:function(){
                  return false;
                }
        })
		
	}

	$scope.changeList=function(r){
		var sendData=angular.element("#taskList").serializeObject();
		var sendDate={};
		sendDate.time_end=sendData.time_end;
		sendDate.time_start=sendData.time_start;
		sendDate.page_index=r;
		sendDate.page_rows=$scope.page.page_rows;
		sendDate.project_type=parseInt(angular.element(".activer").attr("dat-stute"));
		sendDate.time_type=angular.element("input[name='taskTime']:checked").val(); 
		sendDate.task_status=$scope.task_statu;
		sendDate.time_query=angular.element('input:radio[name="state"]:checked').val();
		sendDate.auth_type=2;
		if(sendDate.time_query==undefined){
            if(sendDate.time_end && sendDate.time_start){
                sendDate.time_query=3;
            }else{
                sendDate.time_query="";
            } 
        }
		sendDate.query_text=$scope.taskSearch;
		sendDate.op_type=1;
		var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getMyTaskList", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getMyTaskList&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
            if(datas.status==1){
              $scope.MyAkList=datas.data.data;
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        })
		
	}

	$scope.removeMyAk=function(r,is_plan){
		$.confirms({
            msg:"是否确定删除该任务？",
                callback:function(){
                	var sendDate={};
                	sendDate.xid=r;
                	sendDate.handle_type=1;
                	sendDate.auth_type=2;
                	var timestamp = Date.parse(new Date())/1000;
			        var sign = getSign("removeItem", timestamp);
			        var urlss="appId=92b9c8d2b03d43b1&apiName=removeItem&sign="+sign+"&time="+timestamp+"&format=json";
			        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
			            if(datas.status==1){
			              $.alerts({
								msg:datas.message,
								callback:function(){
									$window.location.reload();
								}
							})
			            }else{
			                $.alerts({
			                    msg:datas.message
			                })
			            }
			        })
                },
                errors:function(){
                  return false;
                }
        })

	}

	$scope.releaseTask=function(r,is_plan){
		if(r){
			$scope.plans=is_plan;
			$scope.releaseTaskId=r;
			$scope.rele=true;
			return false;
		}

		var sendDate=angular.element("#releases").serializeObject();
		sendDate.xid=$scope.releaseTaskId;
		sendDate.auth_type=2;
		sendDate.handle_type=1;
		if(!$.trim(sendDate.remark)){
			 $.alerts({
                    msg:"请填写备注"
                })
			return false; 
		}
		$.confirms({
            msg:"是否确定发布该任务？",
                callback:function(){
                	var timestamp = Date.parse(new Date())/1000;
			        var sign = getSign("taskRelease", timestamp);
			        var urlss="appId=92b9c8d2b03d43b1&apiName=taskRelease&sign="+sign+"&time="+timestamp+"&format=json";
			        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
			            if(datas.status==1){
			              $.alerts({
								msg:datas.message,
								callback:function(){
									$window.location.reload();
								}
							})
			            }else{
			                $.alerts({
			                    msg:datas.message
			                })
			            }
			        })
                },
                errors:function(){
                  return false;
                }
        })

	}

}])