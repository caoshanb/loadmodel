webModel.controller('indexs', ["$scope","$timeout","$window","util",'setmouter',function ($scope,$timeout,$window,util,setmouter) {

	//分页参数
    $scope.page = {
        page_rows: 20,
        page_index: 1
    };
    var hrefs = GetRequest();  
    $scope.planStart=true;
    $scope.task_statu="";
    $scope.taskSearch="";
    $scope.timeType='';
    $scope.timeTypeList=setmouter.getTimeType();
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
                var projcet=hrefs['projcet'];
                if(projcet){
                   $scope.systemtType=datas.data.page_data[0];
                   angular.forEach($scope.systemTypeList,function(data){
                      if(data.project_id==projcet){
                        $scope.systemtType=data;
                      }
                   })
                  $scope.search('',projcet);
                }else{
                  $scope.systemtType=datas.data.page_data[0];
                  $scope.search();
                }
                var info={"zid":$scope.systemtType.project_id,"nameCode":$scope.systemtType.project_name}
                setStorage("projcet",JSON.stringify(info));
	        }else{
	          $.alerts({
	            msg:datas.message	
	          })
	        }
		})
	}
	$scope.systemType();

	//获取进度列表
	$scope.getSearchProcessList=function(){
		var sendDate={};
		var timestamp = Date.parse(new Date())/1000;
		var sign = getSign("getSearchProcessList", timestamp);
		var urlss="appId=92b9c8d2b03d43b1&apiName=getSearchProcessList&sign="+sign+"&time="+timestamp+"&format=json";
		util.httpRequest(urlss,"POST",sendDate,true).then(function(datas){
			if(datas.status==1){
           		$scope.schedule=datas.data;
           		setTimeout(function(){
                    $('select option[color!="yelllow"]').css('color','#000');
                    $('select option[color=="yelllow"]').css('color','#555');
                },500)
	        }else{
	          $.alerts({
	            msg:datas.message
	          })
	        }
		})
	}
	$scope.getSearchProcessList();
	// tab切换请求
	$scope.projectType=function(sysments,$event){
        $scope.slideToggles($event);
	    $scope.systemtType=sysments;
	    var info={"zid":$scope.systemtType.project_id,"nameCode":$scope.systemtType.project_name}
         setStorage("projcet",JSON.stringify(info));
		$scope.ckNull();
		var sendData=angular.element("#taskList").serializeObject();
        var sendDate={};
        sendDate.time_end=sendData.time_end;
        sendDate.time_start=sendData.time_start;
        sendDate.page_rows=$scope.page.page_rows;
        sendDate.project_type=$scope.systemtType.project_id;
        sendDate.time_type=$scope.timeType; 
        sendDate.task_status=$scope.task_statu;
        sendDate.time_query=angular.element("#timeValue").val();
        sendDate.query_text=$scope.taskSearch;
        sendDate.op_type=1;
        sendDate.auth_type=2;
        if(!sendDate.time_query){
            if(sendDate.time_end && sendDate.time_start){
                sendDate.time_query=3;
            }else{
                sendDate.time_query="";
            } 
        }
		var timestamp = Date.parse(new Date())/1000;
		var sign = getSign("getMyTaskList", timestamp);
		var urlss="appId=92b9c8d2b03d43b1&apiName=getMyTaskList&sign="+sign+"&time="+timestamp+"&format=json";
		util.httpRequest(urlss,"POST",sendDate,true).then(function(datas){
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


	// 搜索按钮
	$scope.search=function(index,projcet){
			var sendData=angular.element("#taskList").serializeObject();
			var sendDate={};
			sendDate.time_end=sendData.time_end;
			sendDate.time_start=sendData.time_start;
			sendDate.page_index=1;
			sendDate.page_rows=$scope.page.page_rows;
			if(projcet){
		        sendDate.project_type=projcet;
		    }else{
		        sendDate.project_type=$scope.systemtType.project_id;
		    }
			sendDate.time_type=$scope.timeType; 
			sendDate.task_status=parseInt($scope.task_statu);
			sendDate.time_query=angular.element('#timeValue').val();
			sendDate.query_text=$scope.taskSearch;
			sendDate.op_type=1;
			sendDate.auth_type=2;
			if(!sendDate.time_query){
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
		            if(!index){
	                  	$scope.MyAkList=datas.data.data;
	                   $scope.total = datas.data.page_total * $scope.page.page_rows;
	                  $scope.page.page_index=1;
	                }else{
	                  $scope.changeList(index);
	                    $scope.total = datas.data.page_total * $scope.page.page_rows;
	                }
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
	 angular.element("#timeValue").val(1);
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
	 angular.element("#timeValue").val(2);
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
		$scope.timeType='';
		$scope.task_statu='';
		$scope.taskSearch='';
		angular.element("#J-x3").val("");
		angular.element("#J-xl4").val("");
		angular.element("#timeValue").val("");
	}

  //关闭
  $scope.reClose=function(){
   $scope.finishTime=false;
   	setTimeout(function(){
   		$scope.$apply(function(){
   			$scope.code=false;
   		})
   },10)
   angular.element(".timeSocl input[type=radio]").attr("checked",false);
   angular.element("#releases textarea").val("");
   angular.element("textarea").val("");
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
								$scope.operationRefresh();
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
	//显示弹窗
	$scope.end=function(id,start,handle_type,is_test_dev,is_ui_dev){
		$scope.endId=id;
		$scope.handle=handle_type;
		$scope.test=is_test_dev;

		$scope.uiDev=is_ui_dev;
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
        if($scope.uiDev==1){
            if($scope.setTextaera){
               $scope.finishTime=true;
            }else{
               $scope.submits();
            }
        }else{
               $scope.finishTime=true;
        }
  }
	//设置实际结束时间
	$scope.submits=function(){
		console.log($scope.endId)
		var sendDate=angular.element("#timeSocl").serializeObject();
	    sendDate.is_release=parseInt(sendDate.is_release);
		sendDate.xid=$scope.endId;
		sendDate.handle_type=$scope.handle;
		sendDate.auth_type=2;
		 var is_test=angular.element("input[name='is_test']:checked").val();
        var is_release=angular.element("input[name='is_release']:checked").val();
        if($scope.uiDev!=1){
        	if(($scope.test==0 && is_test==undefined)||( $scope.test==0 && is_test==0 && is_release==undefined)||($scope.test==1 && is_release==undefined)){
	            $.alerts({
	                msg:"有未填选项"
	            }) 
	            return false;
        	}
        }
        if($scope.setTextaera==true && !$.trim(sendDate.remark)){
            $.alerts({
                msg:"备注不能为空"
            })
            return false;
        }
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
									$scope.operationRefresh();
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

	$scope.changeList=function(index){
		var sendData=angular.element("#taskList").serializeObject();
		var sendDate={};
		sendDate.time_end=sendData.time_end;
		sendDate.time_start=sendData.time_start;
		sendDate.page_index=index;
		sendDate.page_rows=$scope.page.page_rows;
		sendDate.project_type=$scope.systemtType.project_id;
		sendDate.time_type=$scope.timeType; 
		sendDate.task_status=$scope.task_statu;
		sendDate.time_query=angular.element('#timeValue').val();
		sendDate.auth_type=2;
		if(!sendDate.time_query){
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
              $scope.total = datas.data.page_total * $scope.page.page_rows;
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        })
		
	}

	 //操作类刷新
    $scope.operationRefresh=function(){
    	$scope.finishTime=false;
        angular.element("textarea").val('');
        $scope.reClose();
        $scope.search($scope.page.page_index);
    }
    $scope.moduleSelect=function($event){
        if(angular.element($event.target).parent().attr("data-ment")){
            angular.element($event.target).siblings("ul").slideToggle(300);
        }else{
        	 angular.element($event.target).parents().siblings("ul").slideToggle(300);
        }
  }
  $scope.slideToggles=function($event){
        angular.element($event.target).parent().slideToggle(400); 
  }
}])