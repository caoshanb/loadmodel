webModel.controller('generalTask', ["$scope", "httpAjax","$timeout","$window","util","setmouter",function ($scope, httpAjax,$timeout,$window,util,setmouter) {

	//分页参数
    $scope.page = {
        page_rows: 5,
        page_index: 1
    };
    var hrefs = GetRequest();
    $scope.planStart=true;
    $scope.task_statu="";
    $scope.taskSearch="";
    $scope.editForm={
			approve_num:"",
			priority:"",
			task_type:"", 
			task_name:"",
			task_days:"",
			time_approve:"",
			applicant:"",
			remark:"",
			developer:"",
			system_type:"",
			is_plan:"",
			project_type:null
		}
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
                      $scope.getGeneralTaskLists();
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
	$scope.getGeneralTaskLists=function(){
		var sendDate={};
		sendDate.page_rows=$scope.page.page_rows;
		sendDate.page_index=$scope.page.page_index;
    sendDate.auth_type=1;
		sendDate.project_type=sendDate.project_type=parseInt(angular.element(".clearfix .activer").attr("dat-stute"));
        
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getGeneralTaskList", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getGeneralTaskList&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,false).then(function(datas){
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


  //导出数据
    $scope.getGroupTaskData=function(){
        var sendData=angular.element("#taskList").serializeObject();
        var sendDate={};
        sendDate.time_end=sendData.time_end;
        sendDate.time_start=sendData.time_start;
        sendDate.auth_type=1;
        sendDate.page_rows=$scope.page.page_rows;
        sendDate.project_type=parseInt(angular.element(".clearfix .activer").attr("dat-stute"));
        sendDate.time_type=angular.element("input[name='taskTime']:checked").val(); 
        sendDate.task_status=$scope.task_statu;
        sendDate.time_query=angular.element('input:radio[name="state"]:checked').val();
        sendDate.query_text=$scope.taskSearch;
        sendDate.op_type=2;
        sendDate.auth_type=1;
        if(sendDate.time_query==undefined){
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
        sendDate.auth_type=1; 
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getGeneralTaskList", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getGeneralTaskList&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
            if(datas.status==1){
                $scope.generalTaskList=datas.data.data;
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
      sendDate.auth_type=1;
  		sendDate.time_end=sendData.time_end;
  		sendDate.time_start=sendData.time_start;
  		sendDate.page_rows=$scope.page.page_rows;
  		sendDate.project_type=parseInt(angular.element(".activer").attr("dat-stute"));
  		sendDate.time_type=angular.element("input[name='taskTime']:checked").val(); 
  		sendDate.task_process=$scope.task_statu;
  		sendDate.time_query=angular.element('input:radio[name="state"]:checked').val();
  		sendDate.query_text=$scope.taskSearch;
  		sendDate.op_type=1;
  		if(sendDate.time_query==undefined){
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
   angular.element("input[name='is_k']").attr("checked",false);
   angular.element("input[name='is_r']").attr("checked",false);
   angular.element("#releases textarea").val("");
    $scope.editForm={
            approve_num:"",
            priority:"",
            task_type:"",
            task_name:"",
            task_days:"",
            time_approve:"",
            applicant:"",
            remark:"",
            developer:"",
            system_type:"",
            is_plan:"",
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


	$scope.changeList=function(r){
		var sendData=angular.element("#taskList").serializeObject();
		var sendDate={};
		sendDate.time_end=sendData.time_end;
		sendDate.time_start=sendData.time_start;
		sendDate.page_index=r;
		sendDate.page_rows=$scope.page.page_rows;
		sendDate.project_type=parseInt(angular.element(".activer").attr("dat-stute"));
		sendDate.time_type=angular.element("input[name='taskTime']:checked").val(); 

		sendDate.task_process=$scope.task_statu;
		sendDate.time_query=angular.element('input:radio[name="state"]:checked').val();
		sendDate.query_text=$scope.taskSearch;
		sendDate.op_type=1;
    sendDate.auth_type=1;
		if(sendDate.time_query==undefined){
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
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        })
	}

	$scope.removeMyAk=function(r){
		$.confirms({
            msg:"是否确定删除该任务？",
                callback:function(){
                	var sendDate={};
                	sendDate.xid=r;
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

	 //获取添加用户列表 
	 $scope.selecteds=[];
   $scope.getUserLIsts=function(){
        var sendDate={};
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getGroupMemberList", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getGroupMemberList&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,false).then(function(datas){
            if(datas.status==1){
              $scope.addUserLIsts=datas.data;
            }else{
                $.alerts({
                  msg:datas.message
              })
            }
        })  
    var arrays=[];
    
    //复选框回显
     if($scope.sele.length>0 && $scope.closeSta==1){
        arr=$scope.sele;
        $scope.closeSta=0;
      }else{
        arr=$scope.arrayList;
      }
    if(arr){
       var boolen=null;
        $scope.isSelecteds = function(ids,uids){ 
          for (var i = 0; i <arr.length; i++) {
              if(arr[i].uid==ids && arr[i].gid==uids){
                arrays.push(arr[i].uid);
                boolen =true;
                break;
              }else{
                 boolen =false;              
              }
          };
         return  boolen; //返回是否选中的true和false   
        };
    }  
   }
 $scope.sele=[];
  $scope.getUserLIsts();
	$scope.addParticipant=function(name){
        if(name){
        	$scope.getUserLIsts();
            $scope.addUser=true;
            return;
        }
        if($scope.arrayList.length<1){
            $.alerts({
                msg:"请选择参与人员"
            })
            return false;
        }
        var nameStr=[];
         $scope.sele=[];
        angular.forEach($scope.arrayList,function(data){
                $scope.sele.push(data);
            
            if(nameStr.indexOf(data.user_name) == -1){
                nameStr.push(data.user_name);
            }
        })
        $scope.closeSta=0;
        $scope.addStaff=nameStr; 
   
        if($scope.staff=true){
          $scope.staff=false;
        }
        $scope.reCloser();
        
   }


    $scope.reCloser=function($event){
        $scope.addUser=false;
        $scope.edit=0;
        if($event){
          var newArrays=[];
          $scope.arrayList='';
          $scope.arrayList=[];
          $scope.selecteds=[];
          angular.forEach($scope.sele,function(data){
            $scope.arrayList.push(data);
            $scope.selecteds.push(data.uid)
            if(newArrays.indexOf(data.user_name) == -1){
                newArrays.push(data.user_name);
              }
          })
          $scope.closeSta=0;
          $scope.addStaff=newArrays; 


          // $scope.arrayList='';
          // $scope.arrayList=[];
          // $scope.arrayLists=[];
          // angular.forEach($scope.sele,function(data){
          //   $scope.arrayLists.push(data)
          // })
          // $scope.closeSta=1;
          // setTimeout(function(){
          //   $scope.$apply(function(){
          //     $scope.arrayList=$scope.arrayLists;
          //     angular.forEach($scope.arrayList,function(data){
          //       $scope.sele.push(data);
            
          //   if(kr.indexOf(data.name) == -1){
          //       kr.push(data.name);
          //     }
          // })
          // $scope.closeSta=0;
          // $scope.addStaff=kr; 
          //   })
          // },10)
        }
   }
 
   $scope.so=function($event,id,o,uid,uname){
        
        var checkbox = $event.target;
        var action = (checkbox.checked?'add':'remove');
        $scope.updateSelected(action,id,checkbox.name,uid,uname);
   }
   $scope.updateSelected = function(action,id,name,uid,uname){
          var jsonStr='';
         if(action == 'add' ){
            jsonStr='{"uid":'+id+',"user_name":"'+name+'","gid":'+uid+',"group_name":"'+uname+'"}';
            var jsonr=eval('(' + jsonStr + ')');
            $scope.arrayList.push(jsonr);
            $scope.selecteds.push(id);
         }

         if(action == 'remove' && $scope.selecteds.indexOf(id)!=-1){
             for(var i=0 ;i<$scope.arrayList.length;i++){
                 if($scope.arrayList[i].uid==id && $scope.arrayList[i].gid==uid){
                    $scope.arrayList.splice(i,1);
                  }
             }
            var idx = $scope.selecteds.indexOf(id);
            $scope.selecteds.splice(idx,1);
         }
       
     }

   //提交新建任务
   $scope.editTask=function(){
       		$scope.editForm.developer=$scope.sele;
            $scope.editForm.system_type=$scope.checkedr;
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

//提交新建任务
    // $scope.editTask=function(){

    //   if($scope.systemr==undefined){
    //    $scope.pro=true;
    //    return false;
    //   }else{
    //    $scope.pro=false;
    //   }

    //     if($scope.Informations.$valid){
    //     if($scope.checkedr=="" ||$scope.checkedr==undefined){
    //         $scope.systems=true;
    //         return false;
    //     }else{
    //         $scope.systems=false;
    //     }
    //     if($scope.selecteds==""){
    //      $scope.developerd=true;
    //         return false;
    //     }else{
    //         $scope.developerd=false;
    //     }
    //     if($scope.editForm.is_plan==""){
    //      $scope.is_plans=true;
    //         return false;
    //     }else{
    //      $scope.is_plans=false;
    //     }
    //       $scope.editForm.developer=$scope.selecteds;
    //         $scope.editForm.system_type=$scope.checkedr;
    //         var sendDate=$scope.editForm;
    //         sendDate.auth_type=1;
    //         $.confirms({
    //          msg:"是否确定新建任务？",
    //             callback:function(){
    //                 var timestamp = Date.parse(new Date())/1000;
    //                 var sign = getSign("createGeneralTask", timestamp);
    //                 var urlss="appId=92b9c8d2b03d43b1&apiName=createGeneralTask&sign="+sign+"&time="+timestamp+"&format=json";
    //                 util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
    //                     if(datas.status==1){
    //                         $.alerts({
    //                             msg:datas.message,
    //                             callback: function () {
    //                                 $window.location.reload();
    //                             }
    //                         })
    //                     }else{
    //                         $.alerts({
    //                             msg:datas.message
    //                         })
    //                     }
    //                 })  
    //             },
    //             errors:function(){
    //                 return false;
    //             }
    //         })
    //     }else{
    //      $scope.change=true;
    //     $scope.task=true;
    //     $scope.cg=true;
    //     $scope.timess=true;
    //     $scope.s=true;
    //     $scope.applicantrr=true;
    //     $scope.remarko=true;
    //     $scope.chan=true;
    //     }
    // }

    $scope.releaseTask=function(r){
        if(r){
            $scope.releaseTaskId=r;
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