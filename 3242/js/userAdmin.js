webModel.controller('userAdmin', ["$scope", "httpAjax","$timeout","$window",'$compile','util', function ($scope, httpAjax,$timeout,$window,$compile,util) {

    $scope.newUsers=false;
    $scope.initialPassword="123456";
    $scope.newUserList={
        user_account:'',
        password:$scope.initialPassword,
        user_name:'',
        position:'',
        user_group:'',
        leader:''
    }
    $scope.page = {
        page_rows: 5,
        page_index: 1
    };
    $scope.ns={
        as:0,
        ao:1,
        al:2
    }
    //重置密码
    $scope.resetPassWords={
        new_password:'',
        re_password:''
    }
    $scope.replaceGroup="";
    //用户列表
    $scope.getUserList=function(){
        var sendDate={};
        sendDate.page_index=$scope.page.page_index;
        sendDate.page_row=$scope.page.page_rows;
       var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getGroupMember", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getGroupMember&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
            if(datas.status==1){
                $scope.userList=datas.data.page_data;
                $scope.total = datas.data.page_total*$scope.page.page_rows;
            }else{
                $.alerts({
                    msg:data.message
                })
            }
        })  
      
    }
    $scope.getUserList();

    //分页
    $scope.changeList=function(index){
        var sendDate={};
        sendDate.page_index=index;
        sendDate.page_row=$scope.page.page_rows;
       var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getGroupMember", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getGroupMember&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
            if(datas.status==1){
                $scope.userList=datas.data.page_data;
            }else{
                $.alerts({
                    msg:data.message
                })
            }
        })  
    }

    $scope.setUser=function(user){
        $scope.newUsers=true;
        $scope.modifyUser=undefined;
        if(!user){
            return false;
        }
        $scope.modifyUser=true;
        $scope.editUser=user;
        $scope.newCode=[];
        if(user.group_id!=undefined ){
            angular.forEach(user.group_id,function(data){
                 $scope.newCode.push(parseInt(data));
                 $scope.selecteds.push(parseInt(data));
            })
            $scope.editUser.leader='';
            
             $scope.getGroupLists($scope.newCode);
              $scope.leaderChange($scope.newCode);
        }

       if($scope.editUser.leader==null){
            $scope.editUser.leader='';
       }
    }

    $scope.modifyUserInfo=function(){
         if($scope.newUserLists.$valid){
            $.confirms({
                msg:"是否确认修改该用户信息？",
                    callback:function(){
                         var sendDate={};

                         sendDate.aid=$scope.editUser.uid;
                         sendDate.user_name=$scope.editUser.user_name;
                         sendDate.position=$scope.editUser.position;
                         sendDate.leader=$scope.editUser.leader;
                         sendDate.gid=$scope.selecteds;
                        var timestamp = Date.parse(new Date())/1000;
                        var sign = getSign("modifyUserInfo", timestamp);
                        var urlss="appId=92b9c8d2b03d43b1&apiName=modifyUserInfo&sign="+sign+"&time="+timestamp+"&format=json";
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
        }else{
            $scope.isUser=true;
            $scope.isPwd=true;
            $scope.isName=true;
            $scope.isObj=true;
            $scope.isGroup=true;
            $scope.isPerson=true;
        }
    }
    // 关闭
    $scope.reClose=function(){
        $scope.newUsers=false;
        $scope.jurisdiction=false;
        $scope.isUser=false;
        $scope.isPwd=false;
        $scope.isName=false;
        $scope.isObj=false;
        $scope.isGroup=false;
        $scope.isPerson=false;
        $scope.newUserList={
            user_account:'',
            password:$scope.initialPassword,
            user_name:'',
            position:'',
            user_group:'',
            leader:''
        }
        $scope.resetPwd=false;
        $scope.isPwdR=false;
        $scope.isConfirmPwd=false;
        $scope.resetPassWords={
            newPwd:'',
            confirmPwd:''
        }
        $scope.replacement=false;
        $scope.groupNames=false;
        $scope.selecteds=[];
        $scope.modifyUser=undefined;
    }

    //获取用户分组
    $scope.leaderChange=function(gid){
        $scope.leaderList=[];
        var sendDate={};
        sendDate.gid=gid;
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getLeaderInfo", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getLeaderInfo&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,false).then(function(datas){
            if(datas.status==1){
                 $scope.leaderList=datas.data.data;
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        })  
    }

    /*
     *所属小组复选框
     */
    $scope.selecteds=[];
    $scope.so=function($event,id){
        var checkbox = $event.target;
        var action = (checkbox.checked?'add':'remove');
        $scope.updateSelected(action,id,checkbox.name);
    }
   $scope.updateSelected = function(action,id,name){
         if(action == 'add' && $scope.selecteds.indexOf(id) == -1){
            $scope.selecteds.push(id);
         }else{
            // 删除时进行返回元素和指定元素不相等的元素
            $scope.selecteds=$scope.selecteds.filter(function(ele){
                 return ele != id;
            })
         }
         if(action == 'remove' && $scope.selecteds.indexOf(id)!=-1){
             var idx = $scope.selecteds.indexOf(id);
             $scope.selecteds.splice(idx,1);
            
         }
         
         var select=$scope.selecteds;
         if(select.length>0 ){
            $scope.leaderChange($scope.selecteds);
            $scope.isGroup=true;
        }else{
            $scope.isGroup=false;
            $scope.editUser.leader='';
            $scope.leaderList='';
        }
         
          
     }


    //新建用户
    $scope.setNewUser=function(){
        $scope.newUserList.user_group=$scope.selecteds;
        if($scope.newUserLists.$valid){

            $.confirms({
                msg:"是否确认创建该用户？",
                    callback:function(){
                         var sendDate=$scope.newUserList;
                        var timestamp = Date.parse(new Date())/1000;
                        var sign = getSign("createUser", timestamp);
                        var urlss="appId=92b9c8d2b03d43b1&apiName=createUser&sign="+sign+"&time="+timestamp+"&format=json";
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
        }else{
            $scope.isUser=true;
            $scope.isPwd=true;
            $scope.isName=true;
            $scope.isObj=true; 
            $scope.isGroup=true;
            $scope.isPerson=true;
        }
    }
    //获取所属小组
    $scope.getGroupLists=function(newArray){
        var sendDate={};
        console.log(newArray)
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getGroupName", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getGroupName&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,false).then(function(datas){
            if(datas.status==1){
                 $scope.getGroupList=datas.data;
                    $scope.isCheckedo = function(id){ 
                    if(newArray){
                        return newArray.indexOf(id)!=-1; 

                    }else{
                        return false;
                        }
                    };
            }else{
                $.alerts({
                    msg:data.message
                })
            }
        })  
    }
    $scope.getGroupLists();

    //启用-禁用
    $scope.disableUser=function(user_account,r){
        if(r==1){
            var msgr="是否确认禁用该用户?";
        }else{
           var msgr="是否确认启用该用户?";
        }
        $.confirms({
            msg:msgr,
            callback:function(){
               var sendDate={};
                sendDate.user_account=user_account;
                var timestamp = Date.parse(new Date())/1000;
                var sign = getSign("disableUser", timestamp);
                var urlss="appId=92b9c8d2b03d43b1&apiName=disableUser&sign="+sign+"&time="+timestamp+"&format=json";
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
    //获取权限
    $scope.getJusrList=function(id){
        var sendDate={};
        sendDate.aid=id;
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("assignAuthority", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=assignAuthority&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,false).then(function(datas){
                if(datas.status==1){
                     $scope.getJusr=datas.data;
                    // 回显权限
                    angular.forEach($scope.getJusr,function(value, key){
                        if(value==1){
                            angular.element('input[name="'+key+'"]').eq(0).attr("checked","checked");
                            angular.element('input[name="'+key+'"]').eq(1).attr("checked","checked");
                        }else if(value==2){
                            angular.element('input[name="'+key+'"]').attr("checked","checked");
                        }else{
                            angular.element('input[name="'+key+'"]').attr("checked",false);
                        } 
                    })
                }else{
                    $.alerts({
                        msg:datas.message
                    })
                }
            })  
        
    }
    
    $scope.adChecked=function($event,o){
        var checkbox = $event.target;
        var ele=angular.element(checkbox).attr("name");
        var value=angular.element(checkbox).val();
        var action = (checkbox.checked?'add':'remove');
       if(action == 'add'){
            if(value==1 || value==0){
                angular.element('input[name="'+ele+'"]').eq(0).attr("checked","checked");
                angular.element('input[name="'+ele+'"]').eq(1).attr("checked","checked");
            }else if(value==2){
                angular.element('input[name="'+ele+'"]').attr("checked","checked");
            }
         }
         if(action == 'remove'){
            if(value==1 || value==0){
                angular.element('input[name="'+ele+'"]').attr("checked",false);
            }else if(value==2){
                angular.element('input[name="'+ele+'"]').eq(value).attr("checked",false);
            }
         }
    }


    $scope.setJurisdiction=function(id){
        $scope.jurisdiction=true;
        $scope.aid=id;
        $scope.getJusrList(id);
    }

    //修改用户权限
    $scope.getJurisdictions=function(){
        var jurisdictions=$("#jurisdictions").serializeObject();
        var sendDate={};
        sendDate.mytask="2";

        if(jurisdictions.alltask==undefined){
            sendDate.alltask="0";
        }else{
            for(key in jurisdictions.alltask){
                sendDate.alltask=key;
            }
        }
         if(jurisdictions.grouptasks==undefined){
            sendDate.grouptasks="0";
        }else{
            for(key in jurisdictions.grouptasks){
                sendDate.grouptasks=key;
            }
        }
         if(jurisdictions.grouptask==undefined){
            sendDate.grouptask="0";
        }else{
            for(key in jurisdictions.grouptask){
                sendDate.grouptask=key;
            }
        }
         if(jurisdictions.project==undefined){
            sendDate.project="0";
        }else{
            for(key in jurisdictions.project){
                sendDate.project=key;
            }
        }
         if(jurisdictions.auth_user==undefined){
            sendDate.auth_user="0";
        }else{
            for(key in jurisdictions.auth_user){
                sendDate.auth_user=key;
            }
        }
        sendDate.aid=$scope.aid;
        sendDate=JSON.stringify(sendDate);
       var send=eval('(' + sendDate + ')');
       $.confirms({
            msg:"是否确认修改该用户权限?",
            callback:function(){
                var timestamp = Date.parse(new Date())/1000;
                var sign = getSign("assignAuthority", timestamp);
                var urlss="appId=92b9c8d2b03d43b1&apiName=assignAuthority&sign="+sign+"&time="+timestamp+"&format=json";
                util.httpRequest(urlss,"POST",send,true).then(function(datas){
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

    $scope.resetPassWord=function(name){
            $.confirms({
            msg:"是否确认重置该用户密码?",
            callback:function(){
                var sendDate={};
                $scope.userNames=name;
                sendDate.new_password="123456";
                sendDate.user_account=name;
                var timestamp = Date.parse(new Date())/1000;
                var sign = getSign("resetPwd", timestamp);
                var urlss="appId=92b9c8d2b03d43b1&apiName=resetPwd&sign="+sign+"&time="+timestamp+"&format=json";
                util.httpRequest(urlss,"POST",sendDate,true).then(function(datas){
                        if(datas.status==1){
                           $.alerts({
                                msg:datas.message,
                                callback: function () {
                                    var storage=getStorage("userInfor");
                                    if(storage.user_account==$scope.userNames){
                                         window.location.href="./index.php?loadmodel=login";
                                    }else{
                                        $window.location.reload(); 
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

    
}])