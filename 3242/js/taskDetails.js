webModel.controller('taskDetails', ["$scope", "httpAjax","$timeout","$window","util", function ($scope, httpAjax,$timeout,$window,util) {

	var hrefs = GetRequest();
    $scope.xid = parseInt(hrefs['xid']);
    $scope.auth_type=parseInt(hrefs['auth_type']);
    $scope.myTask = hrefs['myTask'];
    $scope.projcetUrl=getStorage("projcet");
    var a=sessionStorage.getItem("urlr");
    $scope.read = parseInt(hrefs['read']);
    $scope.urlr=JSON.parse(a);
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
    $scope.fixForm="";
    $scope.fixForm={
        priority:"",
        task_type:""
    };
    $scope.arrayList=[];
    $scope.staff=true;
    $scope.name={}
    $scope.selecteds=[];
    $scope.page = {
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
                $scope.dev=$scope.taskInfo.developer;
                if($scope.taskInfo.is_plan.length==2){
                  $scope.is_plan=1;
                }else{
                  $scope.is_plan=0;
                }

                $scope.getModularList();
                //添加参与人函数
                $scope.getUserLIsts();
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        }) 
    }
     $scope.getTaskInfo();

    //任务列表
    $scope.getModularList=function(){
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
                $scope.processList=datas.data.data;
                $scope.total = datas.data.page_total * $scope.page.page_rows;
                 $scope.getUserListo();
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        })    
    }
    
    //获取进度列表判断添加参与人
    $scope.getUserListo=function(){
        var sendDate={};
            sendDate.task_id = $scope.xid;
            sendDate.page_rows=50;
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
        util.httpRequest(urlss,"post",sendDate,false).then(function(datas){
            if(datas.status==1){
                $scope.getuserListrr=datas.data.data;
                console.log($scope.getuserListrr)
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        })    
    }

    //分页
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
        $scope.hides=false;
        $scope.rele=false;
        $scope.shows=false;
        $scope.solo=false;
        $scope.setActualTime=false;
        $scope.code=false;
        angular.element("input[type=radio]").attr("checked",false);
        angular.element("input[type=text]").val("");
        $scope.fixRemark="";
        $scope.textarea="";
        $scope.editRemark="";
        $scope.fixReason="";
        $scope.fixForm="";
        $scope.fixRemarkShow=false;
        $scope.replaceCo=false;
        $scope.fixInfo=false;
        $scope.staff=true;
        $scope.addStaff=undefined;
        $scope.fixr=false;  
        $scope.arrayList=[];
        $scope.getReason='';
    }
   

    // 获取修改历史列表
    $scope.getFixOringList=function(){
        var sendDate={};
        sendDate.task_id=$scope.xid;
        sendDate.page_rows=2;
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
        util.httpRequest(urlss,"post",sendDate,false).then(function(datas){

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
    }


    $scope.fixTimes=function(xid,r,h){
        $scope.shows=true;
        $scope.solo=true;
        $scope.fixTime=xid;
        $scope.fixType=r;
        $scope.fixhs=h;
    }

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

    //结束实际时间
    $scope.end=function(id,r,h){
        if(id){
           $scope.endTimes=id;
           $scope.startTime=r;
           $scope.endhs=h;
           $scope.actualTime=2;
           $scope.setActualTime=true;
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
           return false;
        }
       var is_test=angular.element("input[name='is_test']:checked").val();
       var is_release=angular.element("input[name='is_release']:checked").val();
        if(is_test==undefined||(is_test==0 && is_release==undefined)){
            $.alerts({
                msg:"有未填选项"
            })
            return false;
        }
       
        if($scope.setTextaera==true && !$scope.textarea){
            $.alerts({
                msg:"备注不能为空"
            })
            return false;
        }
        $.confirms({
         msg:"是否确定完结时间？",
            callback:function(){
                var sendDate={};
                sendDate.xid=$scope.endTimes;
                sendDate.is_test= is_test;
                if(sendDate.is_test!="1"){
                   sendDate.is_release= is_release; 
                }
                sendDate.auth_type=$scope.auth_type;
                if($scope.setTextaera){
                     sendDate.remark=$scope.textarea;
                }         
                sendDate.handle_type=$scope.endhs;   
                var timestamp = Date.parse(new Date())/1000;
                var sign = getSign("completeWork", timestamp);
                var urlss="appId=92b9c8d2b03d43b1&apiName=completeWork&sign="+sign+"&time="+timestamp+"&format=json";
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
    //修改备注
    $scope.subFixRemark=function(id,r,h){
        if(id){
            $scope.fixRemarkId=id;
            $scope.editRemark=r;
            $scope.fixRemarkShow=true;
            $scope.remarkhs=h;
            return false;
        }
        if(!$scope.editRemark){
            $.alerts({
                msg:"备注不能为空"
            })
            return false;
        }
        $.confirms({
         msg:"是否确定修改备注？",
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

    /*
     *替换参与人,替换该参与人对应小组的人
     */
    $scope.replaceStaff=function(id,name,devId,h,replace){
        if(name){
            $scope.replaceCo=true;
            $scope.fixName=name;
            $scope.xid=id;
            $scope.replace=replace;
            $scope.devId=[];
            $scope.devId.push(devId);
            $scope.replaceStaffhs=h;
            $scope.userList=[];
                devArray=[];
            angular.forEach($scope.dev,function(data){
              if(data.gid==$scope.replace.gid){
                    devArray.push(data.uid);
              }
            })
            // console.log($scope.replace)
            // console.log($scope.dev)
            //  console.log($scope.addUserLIsts)
            if($scope.addUserLIsts){
                angular.forEach($scope.addUserLIsts,function(data){
                    if($scope.replace.gid==data.id){
                        angular.forEach(data.group_member,function(code){
                            if($scope.replace.uid!=code.uid){
                                if(devArray.indexOf(code.uid) ==-1){
                                    $scope.userList.push(code)
                                }
                            }

                        })
                        
                    }
                })
            }
             // console.log($scope.userList)
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
            
               sendDate.xid=$scope.xid;
               sendDate.developer=[];
               sendDate.dev_nid=[];
               sendDate.developer.push($scope.replace);
               sendDate.remark=$scope.fixReason;
               sendDate.auth_type=$scope.auth_type;
               sendDate.handle_type=$scope.replaceStaffhs;
               angular.forEach($scope.userList,function(data){
                if(data.uid==$scope.getReason){
                   sendDate.dev_nid.push(data); 
                }
               })
               sendDate.dev_nid[0].gid=$scope.replace.gid;
               sendDate.dev_nid[0].group_name=$scope.replace.group_name;
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

    $scope.fixAlertShow=function(id){
        var fixFormr={};
        console.log($scope.taskInfo)
        fixFormr.task_id=$scope.taskInfo.id;
        fixFormr.remark=$scope.taskInfo.remark;
        
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
         
        if($scope.taskInfo.task_type=="新项目"){
           fixFormr.task_type="1";
        }else if($scope.taskInfo.task_type=="新增需求"){
            fixFormr.task_type="2";
        }else if($scope.taskInfo.task_type=="功能改进"){
            fixFormr.task_type="3";
        }else if($scope.taskInfo.task_type=="bug修复"){
            fixFormr.task_type="4";
        }else if($scope.taskInfo.task_type=="界面修改"){
            fixFormr.task_type="5";
        }else if($scope.taskInfo.task_type=="学习"){
            fixFormr.task_type="6";
        }
        $scope.fixForm=fixFormr;
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

    //项目切换
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

    //获取添加用户列表 

   $scope.getUserLIsts=function(){
        var sendDate={};
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getGroupMemberList", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getGroupMemberList&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,false).then(function(datas){
            if(datas.status==1){
                $scope.addUserLIsts=datas.data;
                var arrays=[];
                if($scope.addStaff==""||$scope.addStaff==undefined){
                    arrays=$scope.dev;
                 }else{
                    arrays=$scope.arrayList;
                    angular.forEach($scope.dev,function(data){
                        arrays.push(data);
                    })
                 }
                  if(arrays){
                   var boolen=null;
                    $scope.isSelecteds = function(ids,uids){ 
                      for (var i = 0; i <arrays.length; i++) {
                          if(arrays[i].uid==ids && arrays[i].gid==uids){
                            
                            boolen =true;
                            break;
                          }else{
                             boolen =false;              
                          }
                      };
                     return  boolen; //返回是否选中的true和false   
                    };
                } 
               $scope.newArray=[];
                var boolen=null;
                angular.forEach($scope.dev,function(data,index){
                    $scope.newArray.push(data);              
                });
                $scope.isCheckedo = function(ids,uids){ 
                if($scope.newArray){
                  for (var i = 0; i <$scope.newArray.length; i++) {
                    if($scope.newArray[i].uid==ids && $scope.newArray[i].gid==uids){
                        boolen =true;
                        break;
                    }else{
                         boolen =false;              
                    }
                  };
                 return  boolen;  //返回是否选中的true和false   
                }
                   
                };  

            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        })  
   }

    $scope.sele=[];
   $scope.not="";
   $scope.addParticipant=function(name){
        if(name){
            $scope.addUser=true;
            $scope.getUserLIsts();
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
        angular.forEach($scope.dev,function(data){
            if(nameStr.indexOf(data.user_name) == -1){
                nameStr.push(data.user_name);
            }
        })
        angular.forEach($scope.arrayList,function(data){
            $scope.sele.push(data);
            if(nameStr.indexOf(data.user_name) == -1){
                nameStr.push(data.user_name);
            }
        })
        setTimeout(function(){
            $scope.$apply(function(){
                $scope.addStaff=nameStr; 
            })
        },5)
        if($scope.staff=true){
          $scope.staff=false;
        }
        $scope.reCloser();
        
   }

   $scope.reCloser=function($event,r){
        $scope.addUser=false;
        $scope.edit=0;
    
        if($event && r){
            $scope.arrayList=[];
        }else{
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
        console.log($scope.arrayList)
       
    }
   
      //修改基本信息
    $scope.fixBasicInfo=function(){
            var sendDate={};
            sendDate.task_id=$scope.fixForm.task_id; 
            sendDate.remark=$scope.fixForm.remark;
            sendDate.task_days=$scope.fixForm.consume_days;
            sendDate.applicant=$scope.fixForm.applicant;
            sendDate.task_type=$scope.fixForm.task_type;
            sendDate.approve_no=$scope.fixForm.approve_no;
            if($scope.fixForm.is_plan=="需要"){
                sendDate.is_plan=true;
            }else if($scope.fixForm.is_plan=="不需要"){
                sendDate.is_plan=false;
            }
            if($scope.fixForm.priority=="正常"){
                sendDate.priority=1;
            }else if($scope.fixForm.priority=="紧急"){
                sendDate.priority=2;
            }
            sendDate.time_approve=$scope.fixForm.time_approve;
            sendDate.auth_type=$scope.auth_type;
            sendDate.task_name=$scope.fixForm.task_name;
            if($scope.arrayList.length<1){
                sendDate.new_dev=$scope.dev;
            }else{
                sendDate.new_dev=$scope.arrayList;
                angular.forEach($scope.dev,function(data){
                     sendDate.new_dev.push(data);
                })
            }
            sendDate.old_dev=$scope.dev;
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
     //修改基本信息
    // $scope.fixBasicInfo=function(){
    //     if($scope.checkedr=="" ||$scope.checkedr==undefined){
    //         $scope.systems=true;
    //         return false;
    //     }else{
    //         $scope.systems=false;
    //     }
    //     if($scope.Information.$valid ){
    //         var sendDate={};
    //         sendDate.task_id=$scope.fixForm.task_id; 
    //         sendDate.remark=$scope.fixForm.remark;
    //         sendDate.task_days=$scope.fixForm.consume_days;
    //         sendDate.applicant=$scope.fixForm.applicant;
    //         sendDate.priority=$scope.fixForm.priority;
    //         sendDate.task_type=$scope.fixForm.task_type;
    //         sendDate.approve_no=$scope.fixForm.approve_no;
    //         sendDate.is_plan=$scope.fixForm.is_plan;
    //         if($scope.fixForm.is_plan=="需要"){
    //             sendDate.is_plan=true;
    //         }else if($scope.fixForm.is_plan=="不需要"){
    //             sendDate.is_plan=false;
    //         }
    //         if($scope.fixForm.priority=="正常"){
    //             sendDate.priority=1;
    //         }else if($scope.fixForm.priority=="紧急"){
    //             sendDate.priority=2;
    //         }
    //         sendDate.time_approve=$scope.fixForm.time_approve;
    //         sendDate.auth_type=$scope.auth_type;
    //         sendDate.task_name=$scope.fixForm.task_name;
    //         if($scope.selecteds==''){
    //             sendDate.developer=[];
    //             for(var r in $scope.taskInfo.developer){
    //                 sendDate.developer.push($scope.taskInfo.developer[r].id)
    //             } 
    //         }else{
    //              sendDate.developer=$scope.selecteds;
    //         }
    //         sendDate.project_type=$scope.systemr;
    //         sendDate.sys_type=$scope.checkedr;
    //         sendDate.handle_type=1;
    //         $.confirms({
    //          msg:"是否确定修改任务信息？",
    //             callback:function(){
    //                 var timestamp = Date.parse(new Date())/1000;
    //                 var sign = getSign("modifyTask", timestamp);
    //                 var urlss="appId=92b9c8d2b03d43b1&apiName=modifyTask&sign="+sign+"&time="+timestamp+"&format=json";
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
    //     }
    // }

    $scope.editDevelope=function(){
        $scope.addUser=true;
        $scope.edit=1;
        $scope.getUserLIsts();
        angular.element(".groupUsers").attr("checked",false);

    }

    $scope.editParticipant=function(){
        if($scope.arrayList.length<1){
            $.alerts({
                msg:"请选择参与人员"
            })
            return false;
        }
        angular.forEach($scope.dev,function(data){
            $scope.arrayList.push(data);
        })
        var sendDate={};
        sendDate.xid=$scope.xid;
        sendDate.handle_type=1;
        sendDate.dev_nid=$scope.arrayList;
        sendDate.developer=$scope.dev;
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
    //发布
    $scope.releaseTask=function(r){
    if(r){
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

 }])