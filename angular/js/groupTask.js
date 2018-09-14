webModel.controller('groupTasks', ["$scope","$timeout","$window","util","setmouter",function ($scope,$timeout,$window,util,setmouter) {

    //分页参数
    $scope.page = {
        page_rows: 20,
        page_index: 1
    };
    var hrefs = GetRequest();
    $scope.planStart=true;
    $scope.task_statu="";
    $scope.taskSearch="";
    $scope.groupFiltrate="";
    $scope.timeType='';
    $scope.timeTypeList=setmouter.getTimeType();
    $scope.groupSelList=setmouter.getGroupSel();
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
   $scope.getJus=getStorage("getJusr");
   $scope.arrayList=[];
   $scope.selecteds=[];
   $scope.sele=[];
   $scope.groupInit=[{name:"小组筛选",gid:""}];
    $scope.memberInit=[{name:"组员筛选",id:""}];
    //获取系统列表
    $scope.systemType=function(){
        var sendDate={};
        sendDate.page_rows=$scope.page.page_rows;
        sendDate.page_index=$scope.page.page_index;
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getProjectList", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getProjectList&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
            if(datas.status==1){
                $scope.systemTypeList=datas.data.page_data;
                var projcet=parseInt(hrefs['projcet']);
                console.log(projcet)
                if(projcet){
                   $scope.systemtType=datas.data.page_data[0];
                   angular.forEach($scope.systemTypeList,function(data){
                      if(data.project_id==projcet){
                        $scope.sysment=data;
                      }
                   })
                  $scope.getGroupList(projcet);
                }else{
                  $scope.sysment=datas.data.page_data[0];
                  $scope.getGroupList();
                }
            var info={"zid":$scope.sysment.project_id,"nameCode":$scope.sysment.project_name}
            setStorage("projcet",JSON.stringify(info));
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        })  
    }
    $scope.systemType();
    
    //请求筛选小组列表
    $scope.getGroupList=function(projcet){
        var sendDate={};
        sendDate.accuount=getStorage("userInfor").user_account;
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getGroupName", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getGroupName&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,false).then(function(datas){
            if(datas.status==1){
                angular.forEach(datas.data,function(arr){
                    $scope.groupInit.push(arr);
                })
                $scope.groupSel=3;
                $scope.GroupList=$scope.groupInit;
                $scope.groupFiltrate=datas.data[0];
                //任务列表
                if(projcet){
                    $scope.search('',projcet);
                }else{
                    $scope.search();    
                }
                
                $scope.getTeamLists($scope.groupFiltrate.gid);
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        })  
    }
     //请求筛选组员列表
    $scope.getTeamLists=function(gid){
        var sendDate={};
        sendDate.gid=gid;
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getMyGroupMember", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getMyGroupMember&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"POST",sendDate,false).then(function(datas){
          if(datas.status==1){
                if(gid){
                     angular.forEach(datas.data,function(arr){
                        $scope.memberInit.push(arr);
                    })   
                }
                $scope.teamList=$scope.memberInit;
                $scope.memberSel=$scope.teamList[0];
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
            sendDate.gid=$scope.groupFiltrate.gid;
            sendDate.time_end=sendData.time_end;
            sendDate.auth_type=3;
            sendDate.time_start=sendData.time_start;
            sendDate.page_rows=$scope.page.page_rows;
            sendDate.project_type=$scope.sysment.project_id;
            sendDate.time_type=$scope.timeType; 
            sendDate.task_status=$scope.task_statu;
            sendDate.time_query=angular.element("#timeValue").val();
            sendDate.query_text=$scope.taskSearch;
            sendDate.op_type=2;
            if(!sendDate.time_query){
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
            var sign = getSign("getGroupTaskList", timestamp);
            var urlss="appId=92b9c8d2b03d43b1&apiName=getGroupTaskList&sign="+sign+"&time="+timestamp+"&format=json";
            util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
                if(datas.status==1){
                     downloadfile(datas.data);
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
    $scope.projectType=function(projcet,$event){
        $scope.sysment=projcet;
        $scope.ckNull();
        var info={"zid":$scope.sysment.project_id,"nameCode":$scope.sysment.project_name}
        setStorage("projcet",JSON.stringify(info));
        $scope.slideToggles($event); 
        $scope.projcetUrl=getStorage("projcet");
        var sendData=angular.element("#taskList").serializeObject();
        var sendDate={};
        sendDate.time_end=sendData.time_end;
        sendDate.time_start=sendData.time_start;
        sendDate.page_rows=$scope.page.page_rows;
        // sendDate.page_index=1;
        sendDate.op_type=1;
        sendDate.project_type=$scope.sysment.project_id;
        sendDate.time_type=$scope.timeType; 
        sendDate.task_status=$scope.task_statu;
        sendDate.time_query=angular.element("#timeValue").val();
        sendDate.query_text=$scope.taskSearch;
       
        var timestamp = Date.parse(new Date())/1000;
        if($scope.groupSel==3){
            sendDate.gid=$scope.groupFiltrate.gid;
            sendDate.auth_type=3;
            var sign = getSign("getGroupTaskList", timestamp);
            var urlss="appId=92b9c8d2b03d43b1&apiName=getGroupTaskList&sign="+sign+"&time="+timestamp+"&format=json";
            util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
                if(datas.status==1){
                $scope.groupTaskList=datas.data.page_data;
                $scope.total = datas.data.total_page * $scope.page.page_rows;
                }else{
                    $.alerts({
                        msg:datas.message
                    })
                }
            }) 
        }else{
            sendDate.auth_type=4;
            sendDate.op_type=1;
            sendDate.member=$scope.memberSel.id;
            var sign = getSign("getMemberTaskList", timestamp);
            var urlss="appId=92b9c8d2b03d43b1&apiName=getMemberTaskList&sign="+sign+"&time="+timestamp+"&format=json";
            util.httpRequest(urlss,"POST",sendDate,true).then(function(datas){
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
         
    }


    //任务类型
    $scope.getScheduleList=function(){
        var sendDate={};
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getTaskTypeList", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getTaskTypeList&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,false).then(function(datas){
            if(datas.status==1){
                $scope.ScheduleList=datas.data;
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        })  
    }
    $scope.getScheduleList();
    
    // 搜索按钮
    $scope.search=function(index,projcet){
            var sendData=angular.element("#taskList").serializeObject();
            var sendDate={};
            sendDate.time_end=sendData.time_end;
            sendDate.time_start=sendData.time_start;
            sendDate.page_rows=$scope.page.page_rows;
            // sendDate.page_index=1;
            
            sendDate.time_type=$scope.timeType; 
            sendDate.task_status=$scope.task_statu;
            sendDate.time_query=angular.element("#timeValue").val();
            sendDate.query_text=$scope.taskSearch;
            sendDate.op_type=1;
            if(projcet){
                sendDate.project_type=projcet;
            }else{
                sendDate.project_type=$scope.sysment.project_id;
            }

            if(!sendDate.time_query){
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
            if($scope.groupSel==3){
                console.log(1)
                sendDate.gid=$scope.groupFiltrate.gid;
                sendDate.auth_type=3;
                var sign = getSign("getGroupTaskList", timestamp);
                var urlss="appId=92b9c8d2b03d43b1&apiName=getGroupTaskList&sign="+sign+"&time="+timestamp+"&format=json";
                util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
                    if(datas.status==1){
                        if(!index){
                            $scope.groupTaskList=datas.data.page_data;
                            $scope.total = datas.data.total_page * $scope.page.page_rows;
                            $scope.page.page_index=1;
                        }else{
                            $scope.changeList(index);
                            $scope.total = datas.data.total_page * $scope.page.page_rows;
                        }
                        
                    }else{
                        $.alerts({
                            msg:datas.message
                        })
                    }
                }) 
            }else{
                console.log(2)
                sendDate.member=$scope.memberSel.id;
                sendDate.auth_type=4;
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
            
    }
    //选择小组搜索
    $scope.queryTask=function(group,$event){
        $scope.groupSel=3;
        $scope.groupFiltrate=group;
        $scope.slideToggles($event);
        $scope.memberInit=[{name:"组员筛选",id:""}];
        $scope.getTeamLists(group.gid);
        $scope.search();
    }
    $scope.teamTask=function(team,$event){
        
        $scope.memberSel=team;
        $scope.slideToggles($event);
        if(team.id){
            $scope.groupSel=4;
        }else{
            $scope.groupSel=3;
        }
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

       //列表参与人悬停
  $scope.getDeveloper=function($event,dev){
     angular.element($event.target).attr("title",setmouter.getDeveloperList(dev));
  }

  //关闭
  $scope.reClose=function(){
    angular.element("#releases textarea").val("");
    angular.element(".timeSocl input[type='radio']").attr("checked",false);
    angular.forEach(angular.element(".timeSocl input[name='is_r']"),function(data,index){
        if(index==1){
           angular.element("input[name='is_r']").eq(index).attr("checked",true);
        }
    })
    $scope.hideCode=false;
    $scope.code=false;
    $scope.hides=false;
    $scope.finishTime=false;
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

  // 分页
    $scope.changeList=function(r){
        var sendData=angular.element("#taskList").serializeObject();
        var sendDate={};
        sendDate.time_end=sendData.time_end;
        sendDate.time_start=sendData.time_start;
        sendDate.page_index=r;
        sendDate.page_rows=$scope.page.page_rows;
        sendDate.project_type=$scope.sysment.project_id;
        sendDate.time_type=$scope.timeType; 
        sendDate.task_status=$scope.task_statu;
        sendDate.time_query=angular.element("#timeValue").val();
        sendDate.query_text=$scope.taskSearch;
        sendDate.op_type=1;
        if(!sendDate.time_query){
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
        if($scope.groupSel==3){
            sendDate.gid=$scope.groupFiltrate.gid;
            var sign = getSign("getGroupTaskList", timestamp);
            var urlss="appId=92b9c8d2b03d43b1&apiName=getGroupTaskList&sign="+sign+"&time="+timestamp+"&format=json";
            util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
                if(datas.status==1){
                    $scope.groupTaskList=datas.data.page_data;
                    $scope.total = datas.data.total_page * $scope.page.page_rows;
                }else{
                    $.alerts({
                        msg:datas.message
                    })
                }
            })
        }else{
            sendDate.auth_type=$scope.groupSel;
            sendDate.member=$scope.memberSel.id;
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
          
    }

    $scope.removeMyAk=function(r){
        $.confirms({
            msg:"是否确定删除该任务？",
                callback:function(){
                    var sendDate={};
                    sendDate.xid=r;
                    sendDate.handle_type=1;
                  sendDate.auth_type=3;
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

    //新建任务
    $scope.editTask=function(r){
        if(r){
            $scope.hideCode=true;
            return false;
        }
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
   $scope.getTaskGroupList=function(){
        if($scope.getGroupLists==undefined){
            var sendDate={};
            sendDate.accuount=getStorage("userInfor").user_account;
            var timestamp = Date.parse(new Date())/1000;
            var sign = getSign("getGroupName", timestamp);
            var urlss="appId=92b9c8d2b03d43b1&apiName=getGroupName&sign="+sign+"&time="+timestamp+"&format=json";
            util.httpRequest(urlss,"post",sendDate,false).then(function(datas){
                if(datas.status==1){
                    $scope.getGroupLists=datas.data;

                }else{
                    $.alerts({
                        msg:datas.message
                    })
                }
            })  
        }
        //复选框回显
        if($scope.arrayList){
            var boolen=null;
            $scope.isSelecteds = function(id){ 
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
        

   }
   
   $scope.getTaskGroupList();

    //添加分组
    $scope.addParticipant=function(name){
        if(name){
            $scope.getTaskGroupList();
            $scope.addGroup=true;
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

    //关闭分组按钮
    $scope.reCloser=function($event){
        $scope.addGroup=false;
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
   $scope.editGroupTask=function(){

            $scope.editForm.group=$scope.sele;
            $scope.editForm.system_type=$scope.checkedr;
            $scope.editForm.time_approve=angular.element("#J-x6").val();
            if(!$scope.editForm.is_plan){
              $scope.editForm.is_plan=0;
            }
            var sendDate=$scope.editForm;
            sendDate.auth_type=3;
            sendDate.handle_type=1;
            $.confirms({
             msg:"是否确定新建任务？",
                callback:function(){
                    var timestamp = Date.parse(new Date())/1000;
                    var sign = getSign("createGroupTask", timestamp);
                    var urlss="appId=92b9c8d2b03d43b1&apiName=createGroupTask&sign="+sign+"&time="+timestamp+"&format=json";
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

    //发布
    $scope.releaseTask=function(r,is_plan){
        if(r){
            $('#J-x8').val(laydate.now(0, 'YYYY-MM-DD'));
            $scope.plans=is_plan;
            $scope.releaseTaskId=r;
            $scope.rele=true;
            return false;
        }

        var sendDate=angular.element("#releases").serializeObject();
        sendDate.xid=$scope.releaseTaskId;
        sendDate.auth_type=3;
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
                                    //保留内容刷新
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

  //切换项目,下拉
  $scope.moduleSelect=function($event){
        if(angular.element($event.target).attr("data-ment")){
            if(angular.element($event.target).find("ul>li").length>0){
                angular.element($event.target).find("ul").slideToggle(300);
            }
        }else{
            if(angular.element($event.target).hasClass("bottom-arrow")){
                if(angular.element($event.target).parents().siblings("ul").find('li').length>0){
                    angular.element($event.target).parents().siblings("ul").slideToggle(300);
                }
            }else{
                if(angular.element($event.target).siblings("ul").find('li').length>0){
                     angular.element($event.target).siblings("ul").slideToggle(300); 
                }else if(angular.element($event.target).parent().siblings("ul").find('li').length>0){
                    angular.element($event.target).parent().siblings("ul").slideToggle(300);
                }
            }
        }
  }
  $scope.slideToggles=function($event){
        angular.element(".sysmentList ul").each(function(){
            if($(this).css('display')=='block'){
                $(this).slideToggle(400);
            }
        })
  }

}])