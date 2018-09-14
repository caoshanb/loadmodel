webModel.controller('teamTask', ["$scope","$timeout","$window","util","setmouter",function ($scope, $timeout,$window,util,setmouter) {

	//分页参数
    $scope.page = {
        page_rows: 20,
        page_index: 1
    };
    var hrefs = GetRequest();
    $scope.planStart=true;
    $scope.task_statu="";
    $scope.taskSearch="";
    $scope.teamFiltrate="";
    
    function getCookie(name)
    {    
        var offset,cookieValue;
        var search=name+"=";
        if(document.cookie.length>0)
        {
            offset=document.cookie.indexOf(search);
            if(offset!=-1)
            {
                offset += search.length;   
                end = document.cookie.indexOf(";", offset);   
                if (end == -1) 
                    end = document.cookie.length;   
                cookieValue=unescape(document.cookie.substring(offset, end));
            }
        }
        return cookieValue;
    } 
  document.cookie=getCookie("token");

  //获取进度列表
  $scope.getSearchProcessList=function(){
    var sendDate={};
    var timestamp = Date.parse(new Date())/1000;
    var sign = getSign("getSearchProcessList", timestamp);
    var urlss="appId=92b9c8d2b03d43b1&apiName=getSearchProcessList&sign="+sign+"&time="+timestamp+"&format=json";
    util.httpRequest(urlss,"POST",sendDate,true).then(function(datas){
      if(datas.status==1){
              $scope.schedule=datas.data;
          }else{
            $.alerts({
              msg:datas.message
            })
          }
    })
  }
  $scope.getSearchProcessList();
  
    //获取系统列表
	$scope.systemType=function(){
        var sendDate={};
        sendDate.page_index=$scope.page.page_index;
        sendDate.page_rows=100;
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getProjectList", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getProjectList&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
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
                          var info={
                            "zid":angular.element(".clearfix .activer").attr("dat-stute"),
                            "nameCode":angular.element(".clearfix .activer").text()
                           }
                          setStorage("projcet",info);
                       }
                      $scope.getTeamTaskList();
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
	$scope.getTeamTaskList=function(){
		var sendDate={};
		sendDate.page_rows=$scope.page.page_rows;
		sendDate.page_index=$scope.page.page_index;
		sendDate.project_type=parseInt(angular.element(".clearfix .activer").attr("dat-stute"));
    sendDate.auth_type=4;
    var timestamp = Date.parse(new Date())/1000;
    var sign = getSign("getMemberTaskList", timestamp);
    var urlss="appId=92b9c8d2b03d43b1&apiName=getMemberTaskList&sign="+sign+"&time="+timestamp+"&format=json";
    util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
        if(datas.status==1){
            $scope.teamsTaskList=datas.data.data;
            $scope.total = datas.data.page_total * $scope.page.page_rows;
        }else{
            $.alerts({
                msg:datas.message
            })
        }
    })    
	}
	
  //导出数据
    $scope.getGroupTaskData=function(){
        var sendData=angular.element("#taskList").serializeObject();
        var sendDate={};
        sendDate.member=$scope.teamFiltrate;
        sendDate.auth_type=4;
        sendDate.time_end=sendData.time_end;
        sendDate.time_start=sendData.time_start;
        sendDate.page_rows=$scope.page.page_rows;
        sendDate.project_type=angular.element(".activer").attr("dat-stute");
        sendDate.time_type=angular.element("input[name='taskTime']:checked").val(); 
        sendDate.task_status=$scope.task_statu;
        sendDate.time_query=angular.element('input:radio[name="state"]:checked').val();
        sendDate.query_text=$scope.taskSearch;
        sendDate.op_type=2;
        if(sendDate.time_query==undefined){
            if(sendDate.time_end && sendDate.time_start){
                sendDate.time_query=3;
            }else{
                sendDate.time_query="";
            } 
        }
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getMemberTaskList", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getMemberTaskList&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
            if(datas.status==1){
               downloadfile(datas.data)
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
    angular.element(".timeSel input").val("");
		angular.element("#taskList select").val("");
		angular.element("#taskList input[type=radio]").attr("checked",false);
		$scope.task_statu='';
    $scope.teamFiltrate='';
    var info={
              "zid":angular.element($event.target).attr("dat-stute"),
              "nameCode":angular.element($event.target).text()
            }
    setStorage("projcet",info);
    $scope.projcetUrl=getStorage("projcet");
		var sendDate={};
			sendDate.project_type=angular.element($event.target).attr("dat-stute");
			sendDate.page_rows=$scope.page.page_rows;
      sendDate.page_index=1;
      sendDate.auth_type=4;
    var timestamp = Date.parse(new Date())/1000;
    var sign = getSign("getMemberTaskList", timestamp);
    var urlss="appId=92b9c8d2b03d43b1&apiName=getMemberTaskList&sign="+sign+"&time="+timestamp+"&format=json";
    util.httpRequest(urlss,"POST",sendDate,true).then(function(datas){
      if(datas.status==1){
            $scope.teamsTaskList=datas.data.data;
            $scope.total = datas.data.page_total * $scope.page.page_rows;
            $scope.blsit=false;
          }else{
            $.alerts({
              msg:datas.message
            })
          }
    })
	}



     //请求筛选组员列表
    $scope.getTeamLists=function(){
        var sendDate={};
        var userInfo=getStorage("userInfor");
        if(userInfo){
           sendDate.user_account=userInfo.user_account;
        }
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getMyGroupMember", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getMyGroupMember&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"POST",sendDate,false).then(function(datas){
          if(datas.status==1){
                $scope.teamList=datas.data;
              }else{
                $.alerts({
                  msg:datas.message
                })
              }
        })
       
    }
    $scope.getTeamLists();

	// 搜索按钮
	$scope.search=function(index){
  		var sendData=angular.element("#taskList").serializeObject();
  		var sendDate={};
      sendDate.member=$scope.teamFiltrate;
  		sendDate.time_end=sendData.time_end;
  		sendDate.time_start=sendData.time_start;
  		sendDate.page_rows=$scope.page.page_rows;
  		sendDate.project_type=angular.element(".activer").attr("dat-stute");
  		sendDate.time_type=angular.element("input[name='taskTime']:checked").val(); 
  		sendDate.task_status=$scope.task_statu;
  		sendDate.time_query=angular.element('input:radio[name="state"]:checked').val();
  		sendDate.query_text=$scope.taskSearch;
  		sendDate.op_type=1;
      sendDate.auth_type=4;
  		if(sendDate.time_query==undefined){
              if(sendDate.time_end && sendDate.time_start){
                  sendDate.time_query=3;
              }else{
                  sendDate.time_query="";
              } 
          }
      var timestamp = Date.parse(new Date())/1000;
      var sign = getSign("getMemberTaskList", timestamp);
      var urlss="appId=92b9c8d2b03d43b1&apiName=getMemberTaskList&sign="+sign+"&time="+timestamp+"&format=json";
      util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
          if(datas.status==1){
              if(!index){
                  $scope.teamsTaskList=datas.data.data;
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

    //选择小组搜索
  $scope.queryTask=function(){
      $scope.search();
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

        //列表参与人悬停
  $scope.getDeveloper=function($event,dev){
    var newArrays=[];
      angular.forEach(dev,function(data){
        newArrays.push(data.name)
      })
     angular.element($event.target).attr("title",setmouter.getDeveloperList(newArrays));
  }

  //关闭
  $scope.reClose=function(){
   $scope.hides=false;
   angular.element("input[name='is_k']").attr("checked",false);
   angular.element("input[name='is_r']").attr("checked",false);
   angular.element(".timeSocl input[type=radio]").attr("checked",false);
   angular.element("textarea").val("");
   $scope.code=false;
   $scope.rele=false;
   $scope.finishTime=false;

  }
  // 分页
	$scope.changeList=function(r){
		var sendData=angular.element("#taskList").serializeObject();
		var sendDate={};
    sendDate.member=$scope.teamFiltrate;
		sendDate.time_end=sendData.time_end;
		sendDate.time_start=sendData.time_start;
		sendDate.page_index=r;
		sendDate.page_rows=$scope.page.page_rows;
		sendDate.project_type=angular.element(".activer").attr("dat-stute");
		sendDate.time_type=angular.element("input[name='taskTime']:checked").val(); 
		sendDate.task_status=$scope.task_statu;
		sendDate.time_query=angular.element('input:radio[name="state"]:checked').val();
		sendDate.query_text=$scope.taskSearch;
		sendDate.op_type=1;
    sendDate.auth_type=4;
		if(sendDate.time_query==undefined){
      if(sendDate.time_end && sendDate.time_start){
          sendDate.time_query=3;
    }else{
          sendDate.time_query="";
        } 
    }
      var timestamp = Date.parse(new Date())/1000;
          var sign = getSign("getMemberTaskList", timestamp);
          var urlss="appId=92b9c8d2b03d43b1&apiName=getMemberTaskList&sign="+sign+"&time="+timestamp+"&format=json";
          util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
              if(datas.status==1){
                $scope.teamsTaskList=datas.data.data;
              }else{
                  $.alerts({
                      msg:datas.message
                  })
              }
          })
	}
    // 项目切换 
    $scope.systemShow=function(id){
    	$scope.pro=false;
    	if(id){
    		$scope.systems=true;
            $scope.systemr=id;
            $scope.editForm.project_type=id;
            $scope.editForm.system_type="";
            $scope.checkedr=[];
        }

    }
   

    $scope.beginTime=function(id,handle_types){
        var sendDate={};
        sendDate.xid=id;
        sendDate.handle_type=handle_types;
        sendDate.auth_type=4;
        $.confirms({
             msg:"是否确定开始？",
                callback:function(){
                   var timestamp = Date.parse(new Date())/1000;
                    var sign = getSign("startWork", timestamp);
                    var urlss="appId=92b9c8d2b03d43b1&apiName=startWork&sign="+sign+"&time="+timestamp+"&format=json";
                    util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
                        if(datas.status==1){
                            $.alerts({
                                msg:datas.message,
                                callback: function () {
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

$scope.end=function(id,time,handle_types,is_test_dev){
      $scope.hides=true;
      $scope.test=is_test_dev;
      $scope.endId=id;
      $scope.handle_types=handle_types;
      $scope.finishTime=true;
      var myDate = new Date(); 
      var my=myDate.toLocaleDateString(); 
      var len= my.split("/");
      var times=len[0]+'-'+len[1]+'-'+len[2];
      var date1 = new Date(time);
      var date2 = new Date(times);
      if(date1.getTime() < date2.getTime()){
            $scope.setTextaera=true;

      }else{
            $scope.setTextaera=false; 
      }
}
  $scope.submits=function(){
    
    var sendDate=angular.element("#timeSocl").serializeObject();
    sendDate.xid=$scope.endId;
    sendDate.handle_type=$scope.handle_types;
    sendDate.auth_type=4;
    var is_test=angular.element("input[name='is_test']:checked").val();
    var is_release=angular.element("input[name='is_release']:checked").val();
    if(($scope.test==0 && is_test==undefined)||( $scope.test==0 && is_test==0 && is_release==undefined)||($scope.test==1 && is_release==undefined)){
        $.alerts({
          msg:"有未填选项"
        }) 
        return false;
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

 
   //操作类刷新
    $scope.operationRefresh=function(){
      $scope.finishTime=false;
        angular.element("textarea").val('');
        $scope.reClose();
        $scope.search($scope.page.page_index);
    }
}])