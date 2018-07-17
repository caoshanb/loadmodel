webModel.controller('groupTasks', ["$scope", "httpAjax","$timeout","$window","util","setmouter",function ($scope, httpAjax,$timeout,$window,util,setmouter) {

    //分页参数
    $scope.page = {
        page_rows: 5,
        page_index: 1
    };
    var hrefs = GetRequest();
    $scope.planStart=true;
    $scope.task_statu="";
    $scope.taskSearch="";
    $scope.groupFiltrate="";
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
                        $scope.getGroupTaskList();
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
    $scope.getGroupTaskList=function(){
        var sendDate={};
        sendDate.page_rows=$scope.page.page_rows;
        sendDate.page_index=$scope.page.page_index;
        sendDate.project_type=parseInt(angular.element(".activer").attr("dat-stute"));
        sendDate.op_type=1;
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getGroupTaskList", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getGroupTaskList&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,false).then(function(datas){
            if(datas.status==1){
                $scope.groupTaskList=datas.data.page_data;
                $scope.total = datas.data.total_page * $scope.page.page_rows;
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
            sendDate.gid=$scope.groupFiltrate;
            sendDate.time_end=sendData.time_end;
            sendDate.auth_type=3;
            sendDate.time_start=sendData.time_start;
            sendDate.page_rows=$scope.page.page_rows;
            sendDate.project_type=parseInt(angular.element(".activer").attr("dat-stute"));
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


    // tab切换请求
    $scope.projectType=function($event){
        $scope.blsit=true;
        angular.element("#taskList select").val("");
        angular.element("#taskList input[type=radio]").attr("checked",false);
        $scope.task_statu='';
        $scope.groupFiltrate='';
        var info={
              "zid":angular.element($event.target).attr("dat-stute"),
              "nameCode":angular.element($event.target).text()
            }
        setStorage("projcet",info);
        $scope.projcetUrl=getStorage("projcet");
        var sendDate={};
        sendDate.project_type=parseInt(angular.element($event.target).attr("dat-stute"));
        sendDate.page_rows=$scope.page.page_rows;
        sendDate.page_index=1;
        sendDate.op_type=1;
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getGroupTaskList", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getGroupTaskList&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
            if(datas.status==1){
            $scope.groupTaskList=datas.data.page_data;
            $scope.total = datas.data.total_page * $scope.page.page_rows;
            $scope.blsit=false;
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        })  
    }

    //请求筛选小组列表
    $scope.getGroupList=function(){
        var sendDate={};
        
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getGroupName", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getGroupName&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,false).then(function(datas){
            if(datas.status==1){
                $scope.GroupList=datas.data;
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        })  
    }
    $scope.getGroupList();

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
    $scope.search=function(){
            var sendData=angular.element("#taskList").serializeObject();
            var sendDate={};
            console.log(sendData)
            sendDate.gid=$scope.groupFiltrate;
            sendDate.time_end=sendData.time_end;
            sendDate.time_start=sendData.time_start;
            sendDate.page_rows=$scope.page.page_rows;
            sendDate.project_type=angular.element(".activer").attr("dat-stute");
            sendDate.time_type=angular.element("input[name='taskTime']:checked").val(); 
            sendDate.task_status=$scope.task_statu;
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
     angular.element($event.target).attr("title",setmouter.getDeveloperList(dev));
  }

  //关闭
  $scope.reClose=function(){
  
    angular.element("input[name='is_k']").attr("checked",false);
    angular.element("input[name='is_r']").attr("checked",false);
    angular.element("#releases textarea").val("");
    angular.element(".timeSocl input[type='radio']").attr("checked",false);
     $scope.code=false;
    $scope.hides=false;
    $scope.finishTime=false;
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
  // 分页
    $scope.changeList=function(r){
        var sendData=angular.element("#taskList").serializeObject();
        var sendDate={};
        sendDate.gid=$scope.groupFiltrate;
        sendDate.time_end=sendData.time_end;
        sendDate.time_start=sendData.time_start;
        sendDate.page_index=r;
        sendDate.page_rows=$scope.page.page_rows;
        sendDate.project_type=parseInt(angular.element(".activer").attr("dat-stute"));
        sendDate.time_type=angular.element("input[name='taskTime']:checked").val(); 
        sendDate.task_status=$scope.task_statu;
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
        var sign = getSign("getGroupTaskList", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getGroupTaskList&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
            if(datas.status==1){
                $scope.groupTaskList=datas.data.page_data;

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
                  sendDate.auth_type=3;
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

    //新建任务
    $scope.editTask=function(r){
        if(r){
            $scope.hides=true;
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
     $scope.selecteds=[];
   $scope.getUserLIsts=function(){
        var sendDate={};
        if($scope.addUserLIsts==undefined){
            var timestamp = Date.parse(new Date())/1000;
            var sign = getSign("getGroupMemberList", timestamp);
            var urlss="appId=92b9c8d2b03d43b1&apiName=getGroupMemberList&sign="+sign+"&time="+timestamp+"&format=json";
            util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
                if(datas.status==1){
                    $scope.addUserLIsts=datas.data;
                }else{
                    $.alerts({
                        msg:datas.message
                    })
                }
            })  
        }

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
   // $scope.so=function($event,id,o){
   //      var checkbox = $event.target;
   //      var action = (checkbox.checked?'add':'remove');
   //      $scope.updateSelected(action,id,checkbox.name);
   // }
   // $scope.updateSelected = function(action,id,name){
   //       if(action == 'add' && $scope.selecteds.indexOf(id) == -1){
   //          $scope.selecteds.push(id);
   //       }else{
   //          // 删除时进行返回元素和指定元素不相等的元素
   //          $scope.selecteds=$scope.selecteds.filter(function(ele){
   //               return ele != id;
   //          })
   //       }
   //       if(action == 'remove' && $scope.selecteds.indexOf(id)!=-1){
   //           var idx = $scope.selecteds.indexOf(id);
   //           $scope.selecteds.splice(idx,1);
   //       }
   //   }


 //提交新建任务
   $scope.editGroupTask=function(){

            $scope.editForm.developer=$scope.arrayList;
            $scope.editForm.system_type=$scope.checkedr;
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
   // //提交新建任务
   // $scope.editGroupTask=function(){

   //      if($scope.systemr==undefined){
   //          $scope.pro=true;
   //          return false;
   //      }else{
   //          $scope.pro=false;
   //      }

   //      if($scope.Informations.$valid){
   //      if($scope.checkedr=="" ||$scope.checkedr==undefined){
   //          $scope.systems=true;
   //          return false;
   //      }else{
   //          $scope.systems=false;
   //      }
   //      if($scope.selecteds==""){
   //          $scope.developerd=true;
   //          return false;
   //      }else{
   //          $scope.developerd=false;
   //      }

   //      if($scope.editForm.is_plan==""){
   //          $scope.is_plans=true;
   //          return false;
   //      }else{
   //          $scope.is_plans=false;
   //      }
   //          $scope.editForm.developer=$scope.selecteds;
   //          $scope.editForm.system_type=$scope.checkedr;

   //          var sendDate=$scope.editForm;
   //          sendDate.auth_type=3;
   //          sendDate.handle_type=1;
   //          $.confirms({
   //           msg:"是否确定新建任务？",
   //              callback:function(){
   //                  var timestamp = Date.parse(new Date())/1000;
   //                  var sign = getSign("createGroupTask", timestamp);
   //                  var urlss="appId=92b9c8d2b03d43b1&apiName=createGroupTask&sign="+sign+"&time="+timestamp+"&format=json";
   //                  util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
   //                      if(datas.status==1){
   //                          $.alerts({
   //                              msg:datas.message,
   //                              callback: function () {
   //                                  $window.location.reload();
   //                              }
   //                          })
   //                      }else{
   //                          $.alerts({
   //                              msg:datas.message
   //                          })
   //                      }
   //                  })  
   //              },
   //              errors:function(){
   //                  return false;
   //              }
   //          })
   //      }else{
   //          $scope.change=true;
   //          $scope.task=true;
   //          $scope.cg=true;
   //          $scope.timess=true;
   //          $scope.s=true;
   //          $scope.applicantrr=true;
   //          $scope.remarko=true;
   //          $scope.chan=true;
   //      }
   //  }

    //设置实际开始时间
    $scope.beginTime=function(r){
        $.confirms({
            msg:"是否确定开始？",
            callback:function(){
               var sendDate={};
                sendDate.xid=r;
                sendDate.handle_type=1;
                sendDate.auth_type=3;
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

    $scope.end=function(id,start){
        $scope.endId=id;
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
    //设置实际结束时间
    $scope.submits=function(){
        
    var sendDate=angular.element("#timeSocl").serializeObject();
        sendDate.xid=$scope.endId;
        sendDate.handle_type=1;
        sendDate.auth_type=3;
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
        //     sendDate.is_release=1;
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


    //发布
    $scope.releaseTask=function(r,is_plan){
        if(r){
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