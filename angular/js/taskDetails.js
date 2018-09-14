webModel.controller('taskDetails', ["$scope","$timeout","$window","util", function ($scope,$timeout,$window,util) {

    var hrefs = GetRequest();
    $scope.xid = parseInt(hrefs['xid']);
    $scope.auth_type=parseInt(hrefs['auth_type']);
    $scope.myTask = hrefs['myTask'];
    $scope.projcetUrl=getStorage("projcet");
    $scope.read = parseInt(hrefs['read']);
    $scope.urlr=getStorage("urlr");
    angular.element("body").attr("id",$scope.urlr.header);
    $scope.template='';
    $scope.planTime="";
    $scope.fixRemark="";
    $scope.textarea="";
    $scope.fixReason="";
    $scope.getReason="";
    $scope.editRemark="";
    $scope.elapsedTime=""; 
    $scope.fixInfoRemark="";
    $scope.demanders=""; 
    $scope.fixForm={
        priority:"",
        task_type:""
     };
    $scope.arrayList=[];
    $scope.staff=true;
    $scope.name={}
    $scope.selecteds=[];
    $scope.checkedr=[];
    $scope.sele=[];
    $scope.addDevList=[];
    $scope.checkedDevList=[];
    $scope.checkedGroup=[];
    $scope.page = {
        page_rows: 10,
        page_index: 1
    };
    $scope.rkPage = {
        page_rows: 5,
        page_index: 1
    };

    //未读
    $scope.setRead=function(){
      var sendDate={};
      if($scope.read==0){
        sendDate.task_id=$scope.xid;
        sendDate.is_read=true;
        var timestamp = Date.parse(new Date())/1000;
          var sign = getSign("setTaskRead", timestamp);
          var urlss="appId=92b9c8d2b03d43b1&apiName=setTaskRead&sign="+sign+"&time="+timestamp+"&format=json";
          util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
              if(datas.status==1){
              }else{
                  $.alerts({
                      msg:datas.message
                  })
              }
          }) 
      } 
    }
    $scope.setRead();

    // get基本信息
    $scope.getTaskInfo=function(){
        var sendDate={};
          sendDate.task_id = $scope.xid;
          sendDate.auth_type = $scope.auth_type;
          sendDate.handle_type=1;
         if($scope.myTask!=undefined){
          var apiName= 'getMyTaskInfo';
        }else{
          var apiName= 'getTaskInfo';
        }
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign(apiName, timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName="+apiName+"&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
            if(datas.status==1){
                var newArray=[]
                $scope.taskInfo=datas.data;
                //复选参与组参数
                $scope.dev=$scope.taskInfo.group;
                $scope.sele=$scope.taskInfo.group;
                angular.forEach($scope.dev,function(data,index){
                    $scope.selecteds.push(data.id);
                    $scope.arrayList.push(data);
                    $scope.checkedGroup.push(data);
                })
                //判断详情计划
                if($scope.taskInfo.is_plan.length==2){
                  $scope.is_plan=1;
                }else{
                  $scope.is_plan=0;
                }
                //任务进度列表
                $scope.getModularList();
                //添加参与组函数
                $scope.getGroupList();
                //获取任务已参与人;
                $scope.participants();
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        }) 
    }
     $scope.getTaskInfo();

    //任务进度列表
    $scope.getModularList=function(index){
        var sendDate={};
            sendDate.task_id = $scope.xid;
            sendDate.page_rows=$scope.page.page_rows;
            sendDate.page_index=1;
            sendDate.auth_type = $scope.auth_type;
            sendDate.handle_type=1;
              if($scope.myTask!=undefined){
          var apiName= 'getMyTaskProcessList';
        }else{
          var apiName= 'getTaskProcessList';
        }
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign(apiName, timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName="+apiName+"&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
            if(datas.status==1){
                if(!index){
                  $scope.processList=datas.data.data;
                  $scope.total = datas.data.page_total * $scope.page.page_rows;
                }else{
                   $scope.total = datas.data.page_total * $scope.page.page_rows;
                }
                
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        })    
    }

    //任务进度分页
    $scope.changeList=function(r){

        var sendDate={};
        sendDate.task_id=$scope.xid;
        sendDate.page_rows=$scope.page.page_rows;
        sendDate.page_index=r;
        sendDate.auth_type = $scope.auth_type;
        sendDate.handle_type=1;
        if($scope.myTask!=undefined){
          var apiName= 'getMyTaskProcessList';
        }else{
          var apiName= 'getTaskProcessList';
        }
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign(apiName, timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName="+apiName+"&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
            if(datas.status==1){
                $scope.processList=datas.data.data; 
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        })    
    }
   
    //show弹窗
    $scope.newTask=function(){
        $scope.hides=true;
    }
    // hide弹窗
    $scope.reClose=function(){
        console.log($scope.fixInfo)
        if($scope.fixInfo){
            $scope.getGroupListr=undefined;
        }
        $scope.hides=false;
        $scope.rele=false;
        $scope.shows=false;
        $scope.solo=false;
        $scope.finishTime=false;
        $scope.code=false;
        angular.element(".addParticipant input[type=checkbox]").attr("checked",false);
        angular.element("input[type=radio]").attr("checked",false);
        angular.element("input[type=text]").val("");
         angular.element("textarea").val("");
        $scope.fixRemark="";
        $scope.textarea="";
        $scope.editRemark="";
        $scope.fixReason="";
        $scope.fixForm="";
        $scope.replaceCo=false;
        $scope.fixInfo=false;
        $scope.staff=true;
        $scope.addStaff=undefined;
        $scope.fixr=false; 
        $scope.arrayList=[]; 
        $scope.arrayList=$scope.checkedGroup;
        $scope.getReason='';
        $scope.sele=$scope.checkedGroup;
        if($scope.fixRemarkShow && $scope.historyRemark){
            $scope.fixRemarkShow=false;
        }else{
            $scope.historyRemark=false;
            $scope.fixRemarkShow=false;
        }
        $scope.rkPage = {
            page_rows: 5,
            page_index: 1
        };

    }
   

    // 获取修改历史列表
    $scope.getFixOringList=function(){
        var sendDate={};
        sendDate.task_id=$scope.xid;
        sendDate.page_rows=10;
        sendDate.page_index=1;
        sendDate.auth_type = $scope.auth_type;
        sendDate.handle_type=1;
        if($scope.myTask!=undefined){
          var apiName= 'getMyModuleLog';
        }else{
          var apiName= 'getModuleLog';
        }
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign(apiName, timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName="+apiName+"&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
            if(datas.status==1){
                $scope.fixOringList=datas.data.data;
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        }) 
    }
    $scope.getFixOringList();

    //设置计划时间
    $scope.setTime=function(r,o,h){
        if(r){
           $scope.shows=true;
            $scope.fixType="";
            $scope.fixr=o;
            $scope.r=r;
            $scope.hs=h;
            console.log(h)
            return false; 
        }else{
        if(!$.trim(angular.element("#J-x3").val())){
            $.alerts({
                msg:"未选择时间"
            })
            return false;
        }
        if($scope.fixr==1){
            info="是否确定计划开始时间？";
        }else if($scope.fixr==2){
             info="是否确定计划结束时间？";
        }else{
            info="是否确定计划发布时间？";
        }
        $.confirms({
         msg:info,
            callback:function(){
            var sendDate={};
            sendDate.xid=$scope.r;
            sendDate.handle_type=$scope.hs;
            if($scope.fixr==1){
                sendDate.time_type=1
            }else if($scope.fixr==2){
                sendDate.time_type=2
            }else{
                 sendDate.time_type=3
            } 
            sendDate.auth_type=$scope.auth_type;
            sendDate.time_new=angular.element("#J-x3").val();
            var timestamp = Date.parse(new Date())/1000;
                var sign = getSign("addScheduleTime", timestamp);
                var urlss="appId=92b9c8d2b03d43b1&apiName=addScheduleTime&sign="+sign+"&time="+timestamp+"&format=json";
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
    }


    $scope.fixTimes=function(xid,r,h){
        $scope.shows=true;
        $scope.solo=true;
        $scope.fixTime=xid;
        $scope.fixType=r;
        $scope.fixhs=h;
    }

    //修改任务时间
    $scope.submitFix=function(){
        if(!angular.element("#J-x3").val()){
            $.alerts({
                msg:"未选择时间"
            })
            return false;
        }
        if(!$scope.fixRemark){
            $.alerts({
                msg:"修改原因未填写"
            })
            return false;
        }
        $.confirms({
         msg:"是否确定修改时间？",
            callback:function(){
            var sendDate={};
            sendDate.xid=$scope.fixTime;
            sendDate.op_type=$scope.fixType;
            sendDate.time_new=angular.element("#J-x3").val();
            sendDate.remark=$scope.fixRemark;
            sendDate.auth_type = $scope.auth_type;
            sendDate.handle_type=$scope.fixhs;
             if($scope.fixType==1){
                sendDate.time_type=1
            }else if($scope.fixType==2){
                sendDate.time_type=2
            }else{
                 sendDate.time_type=3
            } 
            var timestamp = Date.parse(new Date())/1000;
            var sign = getSign("modifyTime", timestamp);
            var urlss="appId=92b9c8d2b03d43b1&apiName=modifyTime&sign="+sign+"&time="+timestamp+"&format=json";
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
    //开始实际时间
    $scope.beginTime = function(id,h){
        $.confirms({
         msg:"是否确定开始时间？",
            callback:function(){
                var sendDate={};
                sendDate.xid=id;
                sendDate.auth_type=$scope.auth_type;
                sendDate.handle_type=h;
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

    //结束实际时间
    $scope.end=function(id,time_end,handle_type,is_test_dev,is_ui_dev){
           $scope.endTimes=id;
           $scope.startTime=time_end;
           $scope.endhs=handle_type;
           $scope.actualTime=2;
           $scope.test=is_test_dev;
           
           $scope.uiDev=is_ui_dev;
           var myDate = new Date(); 
           var my=myDate.toLocaleDateString(); 
           var len= my.split("/");
           var times=len[0]+'-'+len[1]+'-'+len[2];
      
           var date1 = new Date($scope.startTime);
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

    $scope.submits=function(){
        var sendDate=angular.element("#timeSocl").serializeObject();
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
        msg:"是否确定完结时间？",
            callback:function(){
                sendDate.xid=$scope.endTimes;
                sendDate.is_test= is_test;
                sendDate.handle_type=$scope.endhs;
                sendDate.auth_type=$scope.auth_type; 
                if(is_test){
                  sendDate.is_test= parseInt(is_test);  
                }
                if(is_release){
                   sendDate.is_release= parseInt(is_release); 
                }       
                var timestamp = Date.parse(new Date())/1000;
                var sign = getSign("completeWork", timestamp);
                var urlss="appId=92b9c8d2b03d43b1&apiName=completeWork&sign="+sign+"&time="+timestamp+"&format=json";
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

    //修改备注
    $scope.subFixRemark=function(id,r,h,index){
        if(id){
            $scope.fixRemarkId=id;
            $scope.editRemark=r;
            $scope.remarkhs=h;
            if(!h){
              $scope.remarkhs=20;  
            }
            if(index){
               $scope.releaseRemarkTask=0; 
            }else{
               $scope.releaseRemarkTask=1;  
            }
            if(r){
                $scope.historyRemark=true;
                $scope.getHistoryRemark(id,$scope.remarkhs);
            }else{
                $scope.fixRemarkShow=true;
            } 
            return false;
        }
        if(!$scope.editRemark){
            $.alerts({
                msg:"备注不能为空"
            })
            return false;
        }
        $.confirms({
         msg:"是否确定添加备注？",
            callback:function(){
                var sendDate={};
                sendDate.content=$scope.editRemark;
                sendDate.xid=$scope.fixRemarkId;
                sendDate.auth_type=$scope.auth_type;
                sendDate.handle_type=$scope.remarkhs;
                var timestamp = Date.parse(new Date())/1000;
                var sign = getSign("modifyRemark", timestamp);
                var urlss="appId=92b9c8d2b03d43b1&apiName=modifyRemark&sign="+sign+"&time="+timestamp+"&format=json";
                util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
                    if(datas.status==1){
                        $.alerts({
                            msg:datas.message,
                            callback: function () {
                                if($scope.fixRemarkShow && $scope.historyRemark){
                                    $scope.fixRemarkShow=false;
                                    $scope.getHistoryRemark($scope.fixRemarkId);
                                    $scope.changeList($scope.page.page_index,$scope.remarkhs);
                                }else{
                                    $scope.operationRefresh();
                                }
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

    /*
     *历史备注
     * 
     */
    $scope.getHistoryRemark=function(id,handle_type){
        var sendDate={};
        $scope.remarks_id=id;
        sendDate.xid=id;
        sendDate.handle_type=handle_type;
        sendDate.auth_type=$scope.auth_type;
        sendDate.page_index=1;
        sendDate.page_rows=$scope.rkPage.page_rows;
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getRemarkLog", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getRemarkLog&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
            if(datas.status==1){
                $scope.HistoryRemarkList=datas.data.data;
                $scope.rkTotal=$scope.rkPage.page_rows * datas.data.page_total;
                $scope.rkPage.page_index=1;
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        }) 
    };

    /*
     *历史备注分页
     */
    $scope.changeRkList=function(index){
        var sendDate={};
        sendDate.xid=$scope.remarks_id;
        sendDate.handle_type=10;
        sendDate.auth_type=$scope.auth_type;
        sendDate.page_index=index;
        sendDate.page_rows=$scope.rkPage.page_rows;
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getRemarkLog", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getRemarkLog&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
            if(datas.status==1){
                $scope.HistoryRemarkList=datas.data.data;
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        }) 
    }

    /*
     *替换参与人,替换该参与人对应小组的人
     */
    $scope.replaceStaff=function(id,name,devId,h,replace){
        if(name){
            $scope.replaceCo=true;
            $scope.fixName=name;
            $scope.taskId=id;
            $scope.replace=replace;
            $scope.devId=[];
            $scope.devId.push(devId);
            $scope.replaceStaffhs=h;
            $scope.userList=[];
            var devArray=[];
            //获取已参与人id
            angular.forEach($scope.participantsList,function(data){
                if($scope.replace.gid==data.gid){
                    devArray.push(parseInt(data.id));
                }
            })
            //筛选出未选择的本组参与人
            if($scope.groupMemberList){
                angular.forEach($scope.groupMemberList,function(data){
                    if($scope.replace.gid==data.group_id){
                        angular.forEach(data.member,function(code){
                            if(devArray.indexOf(code.uid) ==-1){
                                $scope.userList.push(code)
                            }

                        }) 
                    }
                })
            }  

            
            return false;   
        }
        if($scope.userList.length<1){
            $.alerts({
                msg:"暂无替换人员"
            })
            return false;
        }
        if(!$scope.getReason){
             $.alerts({
                msg:"有未填选项，请选择"
            })
            return false;
       }
        if(!$scope.fixReason){
            $.alerts({
                msg:"备注不能为空"
            })
            return false;
        }
       $.confirms({
         msg:"是否确定更换参与人？",
            callback:function(){
               var sendDate={};
               sendDate.xid=$scope.taskId;
               sendDate.developer=[];
               sendDate.dev_nid=[];
               sendDate.developer.push($scope.replace);
               sendDate.remark=$scope.fixReason;
               sendDate.auth_type=$scope.auth_type;
               sendDate.handle_type=$scope.replaceStaffhs;
               var jsonStr='';
               angular.forEach($scope.userList,function(data){
                if(data.uid==$scope.getReason){
                    jsonStr='{"uid":'+data.uid+',"user_name":"'+data.name+'","gid":'+$scope.replace.gid+',"group_name":"'+$scope.replace.group_name+'"}';
                    jsonStr=eval( '(' +jsonStr+ ')' );
                   sendDate.dev_nid.push(jsonStr); 
                }
               })
                var timestamp = Date.parse(new Date())/1000;
                var sign = getSign("modifyWorker", timestamp);
                var urlss="appId=92b9c8d2b03d43b1&apiName=modifyWorker&sign="+sign+"&time="+timestamp+"&format=json";
                util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
                    if(datas.status==1){
                        $.alerts({
                            msg:datas.message,
                            callback: function () {
                                $scope.operationRefresh(2);

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

    $scope.fixAlertShow=function(id){
        var fixFormr={};
        fixFormr.task_id=$scope.taskInfo.id;
        fixFormr.remark=$scope.taskInfo.remark;
        fixFormr.can_process=$scope.taskInfo.current_process.id;
        fixFormr.task_status=$scope.taskInfo.task_status;
        fixFormr.consume_days=$scope.taskInfo.consume_days;
        fixFormr.applicant=$scope.taskInfo.applicant;
        fixFormr.priority=$scope.taskInfo.priority;
        fixFormr.task_name=$scope.taskInfo.task_name;
        fixFormr.approve_no=$scope.taskInfo.approve_no;
        fixFormr.is_plan=$scope.taskInfo.is_plan;
        fixFormr.sys_type=$scope.taskInfo.sys_type;
        fixFormr.project_type=$scope.taskInfo.project_type.id;
        fixFormr.time_approve=$scope.taskInfo.time_approve;
        fixFormr.developer=[];
        var newArray=[];
        angular.forEach($scope.dev,function(data){
            if(newArray.indexOf(data.user_name)==-1){
                newArray.push(data.user_name);
               fixFormr.developer.push(data);
            }
        })
        //获取修改信息中任务类型的id(异步返回是string类型)
        if($scope.taskInfo.task_type){
            angular.forEach($scope.taskTypeList,function(data){
                if(data.name==$scope.taskInfo.task_type){
                  fixFormr.task_type=data.id;  
                }
            })
        }else{
             fixFormr.task_type="";
        }
        $scope.fixForm=fixFormr;
        if(fixFormr.priority=="正常"){
            $scope.fixForm.priority = 1;
         }else if(fixFormr.priority=="紧急"){
            $scope.fixForm.priority = 2;
        }
        $scope.fixInfo=true; 
        $scope.systemShow();
        $scope.checkedr=[];
        angular.forEach($scope.fixForm.sys_type,function(data,index){
            $scope.checkedr.push(data.id)
        })
       $scope.isSelected = function(id){ 
            if($scope.fixForm){
                return $scope.checkedr.indexOf(id)!=-1;
            }else{
                return false;
            }
        };  
    }

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

    //系统列表
    $scope.getSystemlists=function(){
         var sendDate={};
         sendDate.page_index=1;
         sendDate.page_row=100;
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getProjectList", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getProjectList&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
            if(datas.status==1){
                $scope.projectList=datas.data.page_data;
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        }) 
    }
    $scope.getSystemlists();

    //修改任务信息-项目切换
    $scope.systemShow=function(id){
        $scope.pro=false;
        if(id){
            $scope.systemr=id;
            $scope.fixForm.sys_type="";
            $scope.checkedr=[];
        }else{
            $scope.systemr=$scope.fixForm.project_type;
            }

         if($scope.fixForm.sys_type==''){
            $scope.systems=true;

        }else{
            $scope.systems=false;
        }
    }

    //获取参与组 
   $scope.getGroupList=function(){
        if($scope.getGroupListr==undefined){
            var sendDate={};
            var timestamp = Date.parse(new Date())/1000;
            var sign = getSign("getGroupName", timestamp);
            var urlss="appId=92b9c8d2b03d43b1&apiName=getGroupName&sign="+sign+"&time="+timestamp+"&format=json";
            util.httpRequest(urlss,"post",sendDate,false).then(function(datas){
                if(datas.status==1){
                    $scope.getGroupListr=datas.data;
                }else{
                    $.alerts({
                        msg:datas.message
                    })
                }
            })
        }
        var arrays=[];
        if($scope.addStaff==undefined){
            arrays=$scope.dev;
        }else{
            arrays=$scope.arrayList;
        }
        if($scope.arrayList.length>0){
            var boolen=null;
            $scope.isSelecteds = function(gid){ 
                for (var i = 0; i <$scope.arrayList.length; i++) {
                    if($scope.arrayList[i].id==gid){
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

    //添加参与组
    $scope.addParticipant=function(name){
        if(name){
            $scope.addUser=true;
            $scope.getGroupList();
            return;
        }
        $scope.sele=[];
        angular.forEach($scope.arrayList,function(data){
            $scope.sele.push(data);
        })
        if($scope.staff=true){
          $scope.staff=false;
        }
         $scope.addUser=false;
        $scope.edit=0;
        
   }

   // 添加参与组弹窗关闭
   $scope.reCloser=function($event,r){
        $scope.addUser=false;
        $scope.edit=0;
    
        if($event && r){
            $scope.addDevList=[];
        }else{
          $scope.arrayList=[];
          $scope.selecteds=[];
          angular.forEach($scope.sele,function(data){
            $scope.arrayList.push(data);
            $scope.selecteds.push(data.id)
          })
        }
   }
   //参与组复选框
   $scope.so=function($event,id,names,gid,gname){
      var checkbox = $event.target;
      var action = (checkbox.checked?'add':'remove');
      $scope.updateSelected(action,id,checkbox.name,names,gid,gname);
   }
   $scope.updateSelected = function(action,id,name,names,gid,gname){
        // var jsonStr='';

        //  if(action == 'add' && $scope.selecteds.indexOf(id)==-1 ){
        //     jsonStr='{"id":'+id+',"name":"'+name+'"}';
        //     var jsonr=eval('(' + jsonStr + ')');
        //     $scope.arrayList.push(jsonr);
        //     $scope.selecteds.push(id);
            
        //  }

        //  if(action == 'remove' && $scope.selecteds.indexOf(id)!=-1){
        //      for(var i=0 ;i<$scope.arrayList.length;i++){
        //          if($scope.arrayList[i].id==id){
        //             $scope.arrayList.splice(i,1);
        //           }
        //      }
        //     var idx = $scope.selecteds.indexOf(id);
        //     $scope.selecteds.splice(idx,1);
        //  }
        //  console.log($scope.arrayList)

        if(!gid){  //添加参与组
            if(action == 'add' && $scope.selecteds.indexOf(id)==-1 ){
                jsonStr='{"id":'+id+',"name":"'+name+'"}';
                var jsonr=eval('(' + jsonStr + ')');
                $scope.arrayList.push(jsonr);
                $scope.selecteds.push(id);
             }

             if(action == 'remove' && $scope.selecteds.indexOf(id)!=-1){
                for(var i=0 ;i<$scope.arrayList.length;i++){
                    if($scope.arrayList[i].id==id){
                        $scope.arrayList.splice(i,1);
                    }
                }
                var idx = $scope.selecteds.indexOf(id);
                $scope.selecteds.splice(idx,1);
            }
        }else{ //添加参与人
            if(action == 'add' ){
                jsonStr='{"uid":'+id+',"user_name":"'+name+'","gid":'+gid+',"group_name":"'+gname+'"}';
                var jsonr=eval('(' + jsonStr + ')');
                $scope.addDevList.push(jsonr);
                $scope.checkedDevList.push(id);
            }
           if(action == 'remove' && $scope.checkedDevList.indexOf(id)!=-1){
            for(var i=0 ;i<$scope.addDevList.length;i++){
                if($scope.addDevList[i].uid==id && $scope.addDevList[i].gid==gid){
                    $scope.addDevList.splice(i,1);
                }
            }
            var idx = $scope.checkedDevList.indexOf(id);
            $scope.checkedDevList.splice(idx,1);
         } 
        }
     }
   


      //修改基本信息
    $scope.fixBasicInfo=function(){
            var sendDate={};
            sendDate.task_id=$scope.fixForm.task_id; 
            sendDate.remark=$scope.fixForm.remark;
            sendDate.task_days=$scope.fixForm.consume_days;
            sendDate.applicant=$scope.fixForm.applicant;
            sendDate.task_type= parseInt($scope.fixForm.task_type);
            sendDate.approve_no=$scope.fixForm.approve_no;
            if($scope.fixForm.is_plan=="需要" || $scope.fixForm.is_plan==true ){
                sendDate.is_plan=true;
            }else if($scope.fixForm.is_plan=="不需要" || $scope.fixForm.is_plan==false ){
                sendDate.is_plan=false;
            }
            sendDate.priority = parseInt($scope.fixForm.priority);
            sendDate.time_approve=angular.element("#J-x6").val();
            sendDate.auth_type=$scope.auth_type;
            sendDate.task_name=$scope.fixForm.task_name;
            sendDate.group=$scope.arrayList; 
            sendDate.can_process=$scope.fixForm.can_process;
            sendDate.project_type=$scope.systemr;
            sendDate.sys_type=$scope.checkedr;
            sendDate.handle_type=1;
            $.confirms({
             msg:"是否确定修改任务信息？",
                callback:function(){
                    var timestamp = Date.parse(new Date())/1000;
                    var sign = getSign("modifyTask", timestamp);
                    var urlss="appId=92b9c8d2b03d43b1&apiName=modifyTask&sign="+sign+"&time="+timestamp+"&format=json";
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

    //获取参与人和组,
    $scope.getGroupMemberList=function(){
        var sendDate={};
            if($scope.auth_type==1){
                sendDate.task_type=1;
            }else{
                sendDate.task_type=2; 
            }
            sendDate.group=$scope.taskInfo.group;
        if($scope.groupMemberList==undefined){
            var timestamp = Date.parse(new Date())/1000;
            var sign = getSign("getGroupMemberList", timestamp);
            var urlss="appId=92b9c8d2b03d43b1&apiName=getGroupMemberList&sign="+sign+"&time="+timestamp+"&format=json";
            util.httpRequest(urlss,"post",sendDate,false).then(function(datas){
                if(datas.status==1){
                    $scope.groupMemberList=datas.data;
                  
                }else{
                    $.alerts({
                        msg:datas.message
                    })
                }
            })
         }
          if($scope.participantsList){
                   var boolen=null;
                    $scope.isCheckedo = function(uid,gid){ 
                      for (var i = 0; i <$scope.participantsList.length; i++) {
                          if($scope.participantsList[i].id==uid && $scope.participantsList[i].gid==gid){
                            boolen =true;
                            break;
                          }else{
                             boolen =false;              
                          }
                      };
                      // console.log(boolen)
                     return  boolen; //返回是否选中的true和false   
                    };
                }  
    }

    //获取任务已参与人;
    $scope.participants=function(){
        var sendDate={};
            sendDate.auth_type=$scope.auth_type;
            sendDate.task_id=$scope.xid;
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getTaskDev", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getTaskDev&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
            if(datas.status==1){
                $scope.participantsList=datas.data;
                 //获取添加参与人函数
                $scope.getGroupMemberList();
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        })  
    }
   

    //添加参与人弹窗
    $scope.editDevelope=function(){
        $scope.addUser=true;
        $scope.edit=1;
        $scope.getGroupMemberList();
        // angular.element(".groupUsers").attr("checked",false);

    }

    $scope.editParticipant=function(){
        if($scope.addDevList.length<1){
            $.alerts({
                msg:"请选择参与人员"
            })
            return false;
        }
        var newArray=[];
        if($scope.participantsList.length>0){
         angular.forEach($scope.participantsList,function(data){
            newArray.push('{"uid":'+data.id+',"user_name":"'+data.name+'","gid":'+data.gid+',"group_name":"'+data.gname+'"}');
            var n=eval('(' +newArray + ')');
            $scope.addDevList.push(n);
        })
        var oldDev=eval('(' +newArray + ')'); 
        newArray=[];
        newArray.push(oldDev);  
        }
        
        
        var sendDate={};
        sendDate.xid=$scope.xid;
        sendDate.handle_type=1;
        sendDate.dev_nid=$scope.addDevList;
        sendDate.developer=newArray;
        sendDate.auth_type=$scope.auth_type;
        sendDate.handle_type=1;
        $.confirms({
             msg:"是否确定添加参与人？",
                callback:function(){
                    var timestamp = Date.parse(new Date())/1000;
                    var sign = getSign("modifyWorker", timestamp);
                    var urlss="appId=92b9c8d2b03d43b1&apiName=modifyWorker&sign="+sign+"&time="+timestamp+"&format=json";
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
    //删除任务
    $scope.removeDev=function(dev){
    $.confirms({
            msg:"是否确定删除该任务？",
            callback:function(){
              var sendDate={};
              sendDate.handle_type=10;
              sendDate.auth_type=$scope.auth_type;
              sendDate.xid=dev.id;
              var timestamp = Date.parse(new Date())/1000;
              var sign = getSign("removeItem", timestamp);
              var urlss="appId=92b9c8d2b03d43b1&apiName=removeItem&sign="+sign+"&time="+timestamp+"&format=json";
              util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
                  if(datas.status==1){
                    $.alerts({
                        msg:datas.message,
                        callback:function(){
                           $scope.operationRefresh(1);
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


    //任务或计划-发布
    $scope.releaseTask=function(r){
    if(r){
      $('#J-x8').val(laydate.now(0, 'YYYY-MM-DD'));
      $scope.releaseTaskId=r;
      $scope.rele=true;
      return false;
    }

    var sendDate=angular.element("#releases").serializeObject();

    sendDate.xid=$scope.xid;
    sendDate.auth_type=$scope.auth_type;
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
   //操作类刷新
    $scope.operationRefresh=function(status){
        // $scope.finishTime=false;
        
        if(status==1){
           $scope.getModularList(status);
           $scope.getGroupMemberList();
           $scope.participants();
        }else if(status==2){
            $scope.getGroupMemberList();
            $scope.participants();
        }
        angular.element("textarea").val('');
        $scope.reClose();
        $scope.changeList($scope.page.page_index);  
        $scope.getFixOringList();
    }   
 }])