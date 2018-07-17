webModel.controller('planDetails', ["$scope", "httpAjax","$timeout","$window","util",function ($scope, httpAjax,$timeout,$window,util) {

	var hrefs = GetRequest();
    $scope.xid =parseInt(hrefs['xid']);
    $scope.groupIds=parseInt(hrefs['gid']);
    $scope.projcetUrl=getStorage("projcet");
    $scope.planId = parseInt(hrefs['planId']);
    $scope.auth_type = parseInt(hrefs['auth_type']);
    $scope.myTask = hrefs['myTask'];
    var a=sessionStorage.getItem("urlr");
    $scope.urlr=JSON.parse(a);
    angular.element("body").attr("id",$scope.urlr.header);
    $scope.selected = [];
    $scope.moduleName='';
    $scope.process=''; 
    $scope.template='';
    $scope.newRemark='';
    $scope.developer='';
    $scope.planTime="";
    $scope.fixRemark="";
    $scope.textarea="";
    $scope.getReason="";
      $scope.page = {
        page_rows: 5,
        page_index: 1
    };

    //任务列表
    $scope.getModularList=function(){
    	var sendDate={};
            sendDate.plan_id = $scope.planId;
            sendDate.page_rows=$scope.page.page_rows;
            sendDate.page_index=1;
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
                    $scope.total = datas.data.page_total * $scope.page.page_rows;
                }else{
                    $.alerts({
                        msg:datas.message
                    })
                }
            }) 
    }
    $scope.getModularList();


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
        $scope.setActualTime=false;
        $scope.code=false;
        angular.element("input[type=radio]").attr("checked",false);
        angular.element("input[type=text]").val("");
        $scope.fixRemark="";
        $scope.textarea="";
        $scope.editRemark="";
        $scope.fixReason="";
        $scope.fixRemarkShow=false;
        $scope.replaceCo=false;
        $scope.fixr=false;
        $scope.addUser=false;

    }
    //参与人
    $scope.getAllMembers=function(){
        var sendDate={};
        var timestamp = Date.parse(new Date())/1000;
                var sign = getSign("getGroupMemberList", timestamp);
                var urlss="appId=92b9c8d2b03d43b1&apiName=getGroupMemberList&sign="+sign+"&time="+timestamp+"&format=json";
                util.httpRequest(urlss,"post",sendDate,false).then(function(datas){
                    if(datas.status==1){
                        $scope.codeList=datas.data;
                        angular.forEach(datas.data,function(code){
                            if($scope.groupIds==code.id){
                                $scope.userList=code.group_member;
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
    //新建
    $scope.submits=function(){

        if(!$scope.moduleName  || !$scope.process || !$scope.newRemark ||!$scope.developer){
            $.alerts({
              msg:"有未填选项或未编辑内容"
            })
            return false;
        }

        $.confirms({
            msg:"是否确定新建模块？",
              callback:function(){
                var sendDate={};
                sendDate.pid=$scope.planId;
                sendDate.module_name=$scope.moduleName;
                sendDate.module_process=$scope.process;
                sendDate.remark=$scope.newRemark;
                sendDate.developer=[];
                angular.forEach($scope.codeList,function(data){
                   angular.forEach(data.group_member,function(code){
                        if(data.id==$scope.groupIds && code.uid==$scope.developer){
                           sendDate.developer.push(code);
                           $scope.dev=data;

                        }   
                    }) 
                })
                sendDate.developer[0].group_name=$scope.dev.group_name;
                sendDate.developer[0].gid=$scope.dev.id;
                sendDate.auth_type=$scope.auth_type;
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
    $scope.end=function(id,r){
        if(id){
           $scope.endTimes=id;
           $scope.startTime=r;
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
         msg:"是否确定实际完结时间？",
            callback:function(){
                var sendDate={};
                sendDate.xid=$scope.endTimes;
                sendDate.handle_type=3;
                sendDate.time_end="";
                sendDate.auth_type=$scope.auth_type;
                sendDate.is_test= is_test;
                sendDate.is_release= is_release;
                if($scope.setTextaera){
                    sendDate.remark=$scope.textarea;
                }
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
    $scope.subFixRemark=function(id,r){
        if(id){
            $scope.fixRemarkId=id;
            $scope.editRemark=r;
            $scope.fixRemarkShow=true;
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

    //替换人员
    $scope.replaceStaff=function(id,name,rid){
        if(name){
            $scope.replaceCo=true;
            $scope.fixName=name;
            $scope.xid=id;
            $scope.rid=rid;
            $scope.replaceUser=[];
            angular.forEach($scope.userList,function(data){
                if(data.uid!=$scope.rid){
                    $scope.replaceUser.push(data);
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
               sendDate.xid=$scope.xid;
               sendDate.handle_type=3;
               sendDate.dev_nid=[];
               sendDate.developer=[];
               angular.forEach($scope.codeList,function(data){
                   angular.forEach(data.group_member,function(code){
                        if(data.id==$scope.groupIds && code.uid==$scope.getReason){
                           sendDate.dev_nid.push(code);
                           $scope.develope=data;
                        }   
                    }) 
                })
                sendDate.dev_nid[0].group_name=$scope.develope.group_name;
                sendDate.dev_nid[0].gid=$scope.develope.id;
               var former={
                    user_name:$scope.fixName,
                    uid: $scope.rid, 
                    group_name: $scope.develope.group_name,
                    gid: $scope.develope.id
               }
               sendDate.developer.push(former);

               sendDate.auth_type=$scope.auth_type;
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


 }])
