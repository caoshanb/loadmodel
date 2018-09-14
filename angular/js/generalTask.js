webModel.controller('generalTask', ["$scope","$timeout","$window","util","setmouter",function ($scope,$timeout,$window,util,setmouter) {

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
    $scope.timeTypeList=setmouter.getTimeTypeData();
    $scope.editForm={
			approve_num:"",
			priority:1,
			task_type:"", 
			task_name:"",
			task_days:"",
			time_approve:"",
			applicant:"",
			remark:"",
			system_type:"",
			is_plan:"",
      process:"5",
			project_type:null
		}
    $scope.sele=[];
    $scope.selecteds=[];
    $scope.getJus=getStorage("getJusr");
    $scope.arrayList=[];
    
    //获取系统列表
	$scope.systemType=function(){
		var sendDate={};
        sendDate.page_rows=$scope.page.page_rows;
        sendDate.page_index=$scope.page.page_index;
        sendDate.auth_type = 1;
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getProjectList", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getProjectList&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
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



  //导出数据
    $scope.getGroupTaskData=function(){
        var sendData=angular.element("#taskList").serializeObject();
        var sendDate={};
        sendDate.time_end=sendData.time_end;
        sendDate.time_start=sendData.time_start;
        sendDate.auth_type=1;
        sendDate.page_rows=$scope.page.page_rows;
        sendDate.project_type=$scope.systemtType.project_id;
        sendDate.time_type=$scope.timeType; 
        sendDate.task_status=$scope.task_statu;
        sendDate.time_query=angular.element('#timeValue').val();
        sendDate.query_text=$scope.taskSearch;
        sendDate.op_type=2;
        sendDate.auth_type=1;
        if(!sendDate.time_query){
            if(sendDate.time_end && sendDate.time_start){
                sendDate.time_query=3;
            }else{
                sendDate.time_query="";
            } 
        }
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getGeneralTaskList", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getGeneralTaskList&sign="+sign+"&time="+timestamp+"&format=json";
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
        sendDate.auth_type=1;
        if(!sendDate.time_query){
            if(sendDate.time_end && sendDate.time_start){
                sendDate.time_query=3;
            }else{
                sendDate.time_query="";
            } 
        }
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getGeneralTaskList", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getGeneralTaskList&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
            if(datas.status==1){
                $scope.generalTaskList=datas.data.data;
                $scope.total = datas.data.page_total * $scope.page.page_rows;
                $scope.page.page_index=1;
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
      sendDate.auth_type=1;
  		sendDate.time_end=sendData.time_end;
  		sendDate.time_start=sendData.time_start;
  		sendDate.page_rows=$scope.page.page_rows;
      if(projcet){
        sendDate.project_type=projcet;
      }else{
        sendDate.project_type=$scope.systemtType.project_id;
      }
  		sendDate.time_type=$scope.timeType;
  		sendDate.task_process=$scope.task_statu;
  		sendDate.time_query=angular.element("#timeValue").val();
  		sendDate.query_text=$scope.taskSearch;
  		sendDate.op_type=1;
  		if(sendDate.time_query==undefined){
          if(sendDate.time_end && sendDate.time_start){
              sendDate.time_query=3;
          }else{
              sendDate.time_query="";
          } 
      }
      if(!sendDate.time_type){
          sendDate.time_type="";
      }
      var timestamp = Date.parse(new Date())/1000;
          var sign = getSign("getGeneralTaskList", timestamp);
          var urlss="appId=92b9c8d2b03d43b1&apiName=getGeneralTaskList&sign="+sign+"&time="+timestamp+"&format=json";
          util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
              if(datas.status==1){
                if(!index){
                  $scope.generalTaskList=datas.data.data;
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
      
        angular.element("#timeValue").val('');
        $scope.timeType='';
        $scope.task_statu='';
        $scope.taskSearch='';
        angular.element("#J-x3").val("");
        angular.element("#J-xl4").val("");
    }

	//显示弹窗
	$scope.end=function(){
     $scope.hides=true;
     
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
   angular.element("#releases textarea").val("");
   angular.element(".timeSocl input[type='radio']").attr("checked",false);
    angular.forEach(angular.element(".timeSocl input[name='is_r']"),function(data,index){
        if(index==1){
           angular.element("input[name='is_r']").eq(index).attr("checked",true);
        }
    })
    $scope.editForm={
            approve_num:"",
            priority:1,
            task_type:"",
            task_name:"",
            task_days:"",
            time_approve:"",
            applicant:"",
            remark:"",
            system_type:"",
            is_plan:"",
            process:"5",
            project_type:null
        }
   $scope.pro=false;
   $scope.systems=false;
   $scope.systemr=null;
   $scope.selecteds=[];
   $scope.addStaff="";
   $scope.rele=false;
   $scope.arrayList=[];

   $timeout(function(){
    $scope.$apply(function(){
        $scope.change=false;
       $scope.task=false;
       $scope.cg=false;
        $scope.timess=false;
        $scope.s=false;
        $scope.applicantrr=false;
        $scope.remarko=false;
        $scope.chan=false;
        })
    },100);
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
		sendDate.task_process=$scope.task_statu;
		sendDate.time_query=angular.element("#timeValue").val();
		sendDate.query_text=$scope.taskSearch;
		sendDate.op_type=1;
    sendDate.auth_type=1;
		if(!sendDate.time_query){
      if(sendDate.time_end && sendDate.time_start){
          sendDate.time_query=3;
    }else{
          sendDate.time_query="";
        } 
    }
     var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getGeneralTaskList", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getGeneralTaskList&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
            if(datas.status==1){
              $scope.generalTaskList=datas.data.data;
              $scope.total = datas.data.page_total * $scope.page.page_rows;
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        })
	}

	$scope.removeMyAk=function(removeId){
		$.confirms({
            msg:"是否确定删除该任务？",
                callback:function(){
                	var sendDate={};
                	sendDate.xid=removeId;
                	sendDate.handle_type=1;
                  sendDate.auth_type=1;
                  var timestamp = Date.parse(new Date())/1000;
                  var sign = getSign("removeItem", timestamp);
                  var urlss="appId=92b9c8d2b03d43b1&apiName=removeItem&sign="+sign+"&time="+timestamp+"&format=json";
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

    $scope.getNewTaskProcessList=function(){
        var sendDate={};
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getNewTaskProcessList", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getNewTaskProcessList&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,false).then(function(datas){
            if(datas.status==1){
                $scope.newTaskProcessList=datas.data;
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        })  
    }
    $scope.getNewTaskProcessList();
    //获取任务类型列表
    $scope.getTaskTypeList=function(){
        var sendDate={};
         var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getTaskTypeList", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getTaskTypeList&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
            if(datas.status==1){
                $scope.taskTypeList=datas.data;
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        })  
    }
    $scope.getTaskTypeList();


	//提交新建任务
	$scope.editTotalTask=function(r){
      $scope.hides=true;
	}

	//系统类型 复选框 start-------
	$scope.isSelected = function(id){ 
            return $scope.checkedr.indexOf(id)!=-1;
        };  

	$scope.checkedr=[];
    $scope.adChecked=function($event,id,o){
        var checkbox = $event.target;
        var action = (checkbox.checked?'add':'remove');
        $scope.updateChecked(action,id,checkbox.name);
   }
   $scope.updateChecked = function(action,id,name){
         if(action == 'add' && $scope.checkedr.indexOf(id) == -1){
            $scope.checkedr.push(id);
         }else{
            // 删除时进行返回元素和指定元素不相等的元素
            $scope.checkedr=$scope.checkedr.filter(function(ele){
                 return ele != id;
            })
         }
         if(action == 'remove' && $scope.checkedr.indexOf(id)!=-1){
             var idx = $scope.checkedr.indexOf(id);
             $scope.checkedr.splice(idx,1);
         }
         if($scope.checkedr=="" ||$scope.checkedr==undefined){
            $scope.systems=true;
        }else{
            $scope.systems=false;
        }
     }
	//系统类型 复选框 end-------

   /*
    *获取参与组列表
    */

   $scope.groupLists=function(){
          var sendDate={};
          var timestamp = Date.parse(new Date())/1000;
          var sign = getSign("getGroupName", timestamp);
          var urlss="appId=92b9c8d2b03d43b1&apiName=getGroupName&sign="+sign+"&time="+timestamp+"&format=json";
          util.httpRequest(urlss,"post",sendDate,false).then(function(datas){
              if(datas.status==1){
                $scope.groupLIstr=datas.data;
              }else{
                  $.alerts({
                    msg:datas.message
                })
              }
          })
    //复选框回显

   }
    $scope.isSelecteds = function(id){
        if($scope.arrayList){
          var boolen=null;
            for (var i = 0; i <$scope.arrayList.length; i++) {
                if($scope.arrayList[i].gid==id){
                  boolen =true;
                  break;
                }else{
                   boolen =false;              
                }
            };
           return  boolen; //返回是否选中的true和false   
          };
      }

  $scope.groupLists();
  $scope.isSelecteds();

  //添加参与组
	$scope.addParticipant=function(name){
        if(name){
        	  $scope.isSelecteds();
            $scope.addUser=true;
            return;
        }
        $scope.sele=[];
        angular.forEach($scope.arrayList,function(data){
            $scope.sele.push(data);
        })
        if($scope.staff=true){
          $scope.staff=false;
        }
        $scope.reCloser();
        
   }


    $scope.reCloser=function($event){
        $scope.addUser=false;
        $scope.edit=0;
        if($event){
          $scope.arrayList=[];
          $scope.selecteds=[];
          angular.forEach($scope.sele,function(data){
            $scope.arrayList.push(data);
            $scope.selecteds.push(data.gid)
          })
        }
   }
 
  //参与组复选框
   $scope.so=function($event,id,names){
      var checkbox = $event.target;
      var action = (checkbox.checked?'add':'remove');
      $scope.updateSelected(action,id,checkbox.name,names);
   }
   $scope.updateSelected = function(action,id,name,names){
        var jsonStr='';
         if(action == 'add' && $scope.selecteds.indexOf(id)==-1 ){
            jsonStr='{"gid":'+id+',"gname":"'+name+'"}';
            var jsonr=eval('(' + jsonStr + ')');
            $scope.arrayList.push(jsonr);
            $scope.selecteds.push(id);
            
         }

         if(action == 'remove' && $scope.selecteds.indexOf(id)!=-1){
             for(var i=0 ;i<$scope.arrayList.length;i++){
                 if($scope.arrayList[i].gid==id){
                    $scope.arrayList.splice(i,1);
                  }
             }
            var idx = $scope.selecteds.indexOf(id);
            $scope.selecteds.splice(idx,1);
         }
     }

   //提交新建任务
   $scope.editTask=function(){
       		$scope.editForm.group=$scope.sele;
          $scope.editForm.system_type=$scope.checkedr;
          $scope.editForm.time_approve=angular.element("#J-x6").val();
          if(!$scope.editForm.is_plan){
              $scope.editForm.is_plan=0;
          }
            var sendDate=$scope.editForm;
            sendDate.auth_type=1;
            $.confirms({
             msg:"是否确定新建任务？",
                callback:function(){
                    var timestamp = Date.parse(new Date())/1000;
                    var sign = getSign("createGeneralTask", timestamp);
                    var urlss="appId=92b9c8d2b03d43b1&apiName=createGeneralTask&sign="+sign+"&time="+timestamp+"&format=json";
                    util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
                        if(datas.status==1){
                            $.alerts({
                                msg:datas.message,
                                callback: function () {
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
//每400毫秒同步数据
    $scope.reloadData = function () {
        setTimeout(function () {
            $scope.$apply(function () {
                $scope.reloadData();
            });
        }, 200);
    }
    $scope.reloadData();


    $scope.releaseTask=function(releaseId){
        if(releaseId){
            $('#J-x8').val(laydate.now(0, 'YYYY-MM-DD'));
            $scope.releaseTaskId=releaseId;
            $scope.rele=true;
            return false;
        }
        var sendDate=angular.element("#releases").serializeObject();
        sendDate.xid=$scope.releaseTaskId;
        sendDate.auth_type=1;
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
        $scope.rele=false;
        $scope.reClose();
        angular.element("textarea").val('');
        $scope.search($scope.page.page_index);
    }

     //切换项目,下拉
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