webModel.controller('planDetails', ["$scope","$timeout","$window","util","$http",function ($scope,$timeout,$window,util,$http) {

	var hrefs = GetRequest();
    $scope.xid =parseInt(hrefs['xid']);
    $scope.groupIds=parseInt(hrefs['gid']);
    $scope.projcetUrl=getStorage("projcet");
    $scope.planId = parseInt(hrefs['planId']);
    $scope.auth_type = parseInt(hrefs['auth_type']);
    $scope.myTask = hrefs['myTask'];
    $scope.urlr=getStorage("urlr");
    angular.element("body").attr("id",$scope.urlr.header);
    $scope.selected = [];
    $scope.moduleName='';
    $scope.template='';
    $scope.newRemark='';
    $scope.developer='';
    $scope.planTime="";
    $scope.fixRemark="";
    $scope.textarea="";
    $scope.getReason="";
    $scope.page = {
        page_rows: 20,
        page_index: 1
    };
    $scope.rkPage = {
        page_rows: 5,
        page_index: 1
    };
    /*
     *获取任务基本信息
     */
    $scope.getGroupList=function(){
         var sendDate={};
        sendDate.task_id=$scope.xid;
        sendDate.auth_type=$scope.auth_type;
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getTaskInfo", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getTaskInfo&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,false).then(function(datas){
            if(datas.status==1){
                setStorage("taskInfoGroup",JSON.stringify(datas.data));
                $scope.taskInfo=datas.data;
                 //任务列表
                $scope.getModularList();
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        }) 
    }
    $scope.getGroupList();
    //任务列表
    $scope.getModularList=function(index){
    	var sendDate={};
            sendDate.plan_id = $scope.planId;
            sendDate.page_rows=$scope.page.page_rows;
            sendDate.auth_type=$scope.auth_type;
            if(getStorage("planTaskPages")){
                sendDate.page_index=getStorage("planTaskPages"); 
                
            }else{
                sendDate.page_index=1; 
            }
            if($scope.myTask!=undefined){
              var apiName= 'getMyModuleList';
            }else{
              var apiName= 'getModuleList';
            }
            var timestamp = Date.parse(new Date())/1000;
            var sign = getSign(apiName, timestamp);
            var urlss="appId=92b9c8d2b03d43b1&apiName="+apiName+"&sign="+sign+"&time="+timestamp+"&format=json";
            util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
                if(datas.status==1){
                    if(!index){
                      $scope.modularList=datas.data.data;
                      $scope.total = datas.data.page_total * $scope.page.page_rows;
                    }else{
                       $scope.total = datas.data.page_total * $scope.page.page_rows;
                    }
                    if(getStorage("planTaskPages")){
                       $scope.page.page_index=getStorage("planTaskPages");
                       localStorage.removeItem("planTaskPages"); 
                    }  
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
        sendDate.plan_id=$scope.planId;
        sendDate.page_rows=$scope.page.page_rows;
        sendDate.page_index=r;
        sendDate.auth_type=$scope.auth_type;
        if($scope.myTask!=undefined){
          var apiName= 'getMyModuleList';
        }else{
          var apiName= 'getModuleList';
        }
        var timestamp = Date.parse(new Date())/1000;
            var sign = getSign(apiName, timestamp);
            var urlss="appId=92b9c8d2b03d43b1&apiName="+apiName+"&sign="+sign+"&time="+timestamp+"&format=json";
            util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
                if(datas.status==1){
                    $scope.modularList=datas.data.data;
                }else{
                    $.alerts({
                        msg:datas.message
                    })
                }
            }) 
    }
    //全选
    $scope.checkAlls=function(r){
    	$scope.boxnot=true;
        $scope.selected=[];
        angular.forEach(r, function(data){
          $scope.selected.push(data.mid);
        });
    }
    //反选
    $scope.notCheck=function(){
        $scope.boxnot=false;
       
        $scope.selected=[];
    }
    //删除模块
    $scope.removeModular=function(){
        if($scope.selected.length<1){
            $.alerts({
                msg:"未选需要删除的任务模块"
            })
            return false; 
        }
        $.confirms({
            msg:"是否确定删除该任务模块？",
                callback:function(){
                  var sendDate={};
                  sendDate.xid=$scope.selected;
                  sendDate.handle_type=3;
                  sendDate.auth_type=$scope.auth_type;
                  var timestamp = Date.parse(new Date())/1000;
                    var sign = getSign("removeItem", timestamp);
                    var urlss="appId=92b9c8d2b03d43b1&apiName=removeItem&sign="+sign+"&time="+timestamp+"&format=json";
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

//更新事件
    var updateSelected = function(action,id){
        if(action == 'add' && $scope.selected.indexOf(id) == -1){
            $scope.selected.push(id);
        }
        if(action == 'remove' && $scope.selected.indexOf(id)!=-1){
            var idx = $scope.selected.indexOf(id);
            $scope.selected.splice(idx,1);
        }
    }
//用于监控点击事件，checkbox选择了就更新
    $scope.updateSelection = function($event,id){
        var checkbox = $event.target;
        var action = (checkbox.checked?'add':'remove');
        updateSelected(action,id);
    }
//判断存储的变量中是否已包含该checkbox,$scope.selected.indexOf(id)>=0是个布尔值
$scope.isSelected = function(id){ return $scope.selected.indexOf(id)>=0; };


    $scope.newTask=function(){
        $scope.hides=true;
    }
    $scope.reClose=function(){
        $scope.hides=false;
        $scope.shows=false;
        $scope.solo=false;
        $scope.code=false;
        $scope.finishTime=false;
        if($scope.fixRemarkShow && $scope.historyRemark){
            $scope.fixRemarkShow=false;
        }else{
            $scope.historyRemark=false;
            $scope.fixRemarkShow=false;
            $scope.HistoryRemarkList='';
        }
        $scope.rkPage = {
            page_rows: 5,
            page_index: 1
        };
        angular.element("input[type=radio]").attr("checked",false);
        angular.element("input[type=text]").val("");
        angular.element("textarea").val("");
        $scope.fixRemark="";
        $scope.textarea="";
        $scope.editRemark="";
        $scope.fixReason="";
        
        $scope.replaceCo=false;
        $scope.fixr=false;
        $scope.addUser=false;
        setTimeout(function(){
            $scope.$apply(function(){
                $scope.code=false;
            })
       },10)
    }


    //获取新建模块参与人
    $scope.getAllMembers=function(){
        var sendDate={};
        sendDate.task_type=1;
        sendDate.group=getStorage("taskInfoGroup").group;
        $scope.taskInfo=getStorage("taskInfoGroup");
        console.log($scope.taskInfo.can_change)
        var timestamp = Date.parse(new Date())/1000;
                var sign = getSign("getGroupMemberList", timestamp);
                var urlss="appId=92b9c8d2b03d43b1&apiName=getGroupMemberList&sign="+sign+"&time="+timestamp+"&format=json";
                util.httpRequest(urlss,"post",sendDate,false).then(function(datas){
                    if(datas.status==1){
                        $scope.codeList=datas.data;
                        $scope.groupMebers=[];
                        angular.forEach(datas.data,function(code){
                            if($scope.groupIds==code.group_id){
                                $scope.groupMebers.push(code);
                                $scope.userList=code.member;
                            }
                        })
                    }else{
                        $.alerts({
                            msg:datas.message
                        })
                    }
                })  
    }
    $scope.getAllMembers();


    //获取负责的小组
    $scope.getGroupBeList=function(){
       
        var sendDate={};
        sendDate.page_rows=100;
        sendDate.page_index=$scope.page.page_index;
        sendDate.account=getStorage("userInfor").user_account;
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getGroupName", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getGroupName&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,false).then(function(datas){
            if(datas.status==1){
                $scope.groupBeList=datas.data;
                if($scope.auth_type!=2 && $scope.auth_type!=1){
                    $scope.responsibleGroup=false;
                    angular.forEach($scope.groupBeList,function(data){
                        if(data.gid==$scope.groupIds){
                            $scope.responsibleGroup=true;
                        }
                    })
                }
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        })

    }
    $scope.getGroupBeList()


    //新建计划模块
    $scope.submit=function(){

        if(!$scope.moduleName){
            $.alerts({
              msg:"任务模块名称不能为空"
            })
            return false;
        }
        if(!$scope.developer){
            $.alerts({
              msg:"请选择参入人员"
            })
            return false;
        }

        $.confirms({
            msg:"是否确定新建模块？",
              callback:function(){
                var sendDate={};
                sendDate.pid=$scope.planId;
                sendDate.module_name=$scope.moduleName;
                sendDate.remark=$scope.newRemark;
                sendDate.auth_type=$scope.auth_type;
                sendDate.developer=[];
                var jsonStr='';
                angular.forEach($scope.codeList,function(data){
                    if(data.group_id==$scope.groupIds){
                        angular.forEach(data.member,function(code){
                            if($scope.developer==code.uid){
                                jsonStr='{"uid":'+code.uid+',"user_name":"'+code.name+'","gid":'+data.group_id+',"group_name":"'+data.group_name+'"}';
                                var jsonr=eval('(' + jsonStr + ')');
                                sendDate.developer.push(jsonr);
                            }
                        }) 
                    }  
                })  
                var timestamp = Date.parse(new Date())/1000;
                var sign = getSign("createModule", timestamp);
                var urlss="appId=92b9c8d2b03d43b1&apiName=createModule&sign="+sign+"&time="+timestamp+"&format=json";
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


    /**
     * 导出计划模块模板
     */
    $scope.exportTemplate=function(){
        var sendDate={};
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getModuleTemplate", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getModuleTemplate&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
            if(datas.status==1){
                downloadfile(datas.data.moduleTemplateFile);
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        })   
    }

    /**
     * 导入计划模块模板
     * 
     */
     $scope.importModuleFile=function(a){
        var str=$("#pic").val();
        if(str != "" && /\.(xls|xlsx|csv)$/.test(str)){
            var timestamp = Date.parse(new Date())/1000;
            var sign = getSign("importModuleFile", timestamp);
            var urlss="appId=92b9c8d2b03d43b1&apiName=importModuleFile&sign="+sign+"&time="+timestamp+"&format=json";
            var formData = new FormData();
            var file = document.querySelector('input[type=file]').files[0];
            formData.append('file', file);
            formData.append('plan_id',$scope.planId); 
            $http({
                method:'POST',
                url:window.P_Web+urlss,
                data: formData,
                headers: {'Content-Type':undefined},
                transformRequest: angular.identity 
                })   
                .then( function ( datas ){
                    if(datas.data.status==1){
                        $.alerts({
                            msg:datas.data.message,
                            callback: function () {
                            $window.location.reload();
                            }
                        })
                    }else{
                        $.alerts({
                            msg:datas.data.message
                        })
                    }
 
                }); 
        }else{
           $.alerts({
                msg:"文件格式错误,请选择(xls,xlsx,csv)格式"
            }) 
        }
     }

     /*
      *导出详情列表
      */
     $scope.exportDetails=function(){
        var sendDate={};
        sendDate.plan_id=$scope.planId;
        sendDate.auth_type=$scope.auth_type;
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("exportTaskModuleList", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=exportTaskModuleList&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
            if(datas.status==1){
                console.log(datas.data)
                downloadfile(datas.data);
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        })   
     }

    //修改时间
    $scope.fixTimes=function(mid,r){
        $scope.shows=true;
        $scope.solo=true;
        $scope.fixTime=mid;
        $scope.fixType=r;
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
            sendDate.handle_type=3;
            sendDate.op_type=$scope.fixType;
            sendDate.time_new=angular.element("#J-x3").val();
            sendDate.remark=$scope.fixRemark;
            sendDate.auth_type=$scope.auth_type;
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

    //设置计划开始时间
    $scope.setTime=function(r,o){
        if(r){
           $scope.shows=true;
            $scope.fixType="";
            $scope.fixr=o;
            $scope.r=r;
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
        }else{
             info="是否确定计划结束时间？";
        }
        $.confirms({
         msg:info,
            callback:function(){
            var sendDate={};
            sendDate.xid=$scope.r;
            sendDate.handle_type=3;
            sendDate.time_type=$scope.fixr;
            sendDate.time_new=angular.element("#J-x3").val();
            sendDate.auth_type=$scope.auth_type;
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

    //开始实际时间
    $scope.beginTime = function(r){
        $.confirms({
         msg:"是否确定开始时间？",
            callback:function(){
                var sendDate={};
                sendDate.xid=r;
                sendDate.handle_type=3;
                sendDate.auth_type=$scope.auth_type;
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
    $scope.end=function(id,timer,test,is_ui_dev){
           $scope.endTimes=id;
           $scope.startTime=timer;
           $scope.test=test;
           $scope.uiDev=is_ui_dev;
           // $scope.finishTime=true;
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
         msg:"是否确定实际完结时间？",
            callback:function(){
                sendDate.xid=$scope.endTimes;
                sendDate.handle_type=3;
                sendDate.time_end="";
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
                                    console.log($scope.page.page_index)
                                    setStorage("planTaskPages",$scope.page.page_index);
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
    $scope.subFixRemark=function(id,r,index){
        if(id){
            $scope.fixRemarkId=id;
            $scope.editRemark=r;
            if(r){
                $scope.historyRemark=true;
                $scope.getHistoryRemark(id);
            }else{
                $scope.fixRemarkShow=true;
            }
            if(index){
                $scope.releaseRemarkTask=0; 
            }else{
                $scope.releaseRemarkTask=1;  
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
                sendDate.handle_type=3;
                sendDate.auth_type=$scope.auth_type;
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
                                    $scope.changeList($scope.page.page_index);
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
    $scope.getHistoryRemark=function(id){
        var sendDate={};
        $scope.remarks_id=id;
        sendDate.xid=id;
        sendDate.handle_type=3;
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
        sendDate.handle_type=3;
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

    //替换人员
    $scope.replaceStaff=function(id,name,rid){
        if(name){
            $scope.replaceCo=true;
            $scope.fixName=name;
            $scope.oid=id;
            $scope.rid=rid;
            $scope.replaceDev=[];
            angular.forEach($scope.userList,function(data){
                if(data.uid!=$scope.rid){
                    $scope.replaceDev.push(data);
                }
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
         msg:"是否确定替换人员？",
            callback:function(){
                var sendDate={};
               sendDate.xid=$scope.oid;
               sendDate.handle_type=3;
               sendDate.auth_type=$scope.auth_type;
               sendDate.dev_nid=[];
               sendDate.developer=[];
               var jsonStr='',
                   jsonStrOld='';
               angular.forEach($scope.groupMebers,function(data){
                    angular.forEach(data.member,function(code){ 
                        if($scope.getReason==code.uid){
                            jsonStrOld='{"uid":'+$scope.rid+',"user_name":"'+$scope.fixName+'","gid":'+data.group_id+',"group_name":"'+data.group_name+'"}';
                            jsonStr='{"uid":'+code.uid+',"user_name":"'+code.name+'","gid":'+data.group_id+',"group_name":"'+data.group_name+'"}';
                            var jsonr=eval('(' + jsonStr + ')');
                            var jsonOld=eval('(' + jsonStrOld + ')');
                            sendDate.dev_nid.push(jsonr);
                            sendDate.developer.push(jsonOld);
                        }
                    }) 
                })
               var timestamp = Date.parse(new Date())/1000;
                var sign = getSign("modifyWorker", timestamp);
                var urlss="appId=92b9c8d2b03d43b1&apiName=modifyWorker&sign="+sign+"&time="+timestamp+"&format=json";
                util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
                    if(datas.status==1){
                        $.alerts({
                            msg:datas.message,
                            callback: function () {
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


     //操作类刷新
    $scope.operationRefresh=function(status){
        
        if(status==1){
           $scope.getAllMembers();
        }else if(status==2){
            $scope.getModularList(status)
            $scope.getAllMembers();
        }
        angular.element("textarea").val('');
        $scope.reClose();
        $scope.changeList($scope.page.page_index);  
    }   

 }])
