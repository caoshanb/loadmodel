webModel.controller('project', ["$scope", "httpAjax","$timeout","$window",'$compile','util', function ($scope, httpAjax,$timeout,$window,$compile,util) {

    $scope.hides=false;
    $scope.newSystems={
        project_name:'',
        system_name:[],
        pjtime_release:'',
        remark:''
    }
    $scope.page={
        page_index:1,
        page_rows:5
    }
    //获取项目列表
    $scope.getProjectList=function(){
        var sendDate={};
        sendDate.page_index=$scope.page.page_index;
        sendDate.page_row=$scope.page.page_rows;
       var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getProjectList", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getProjectList&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,false).then(function(datas){
            if(datas.status==1){
                $scope.projectList=datas.data.page_data;
                $scope.total=datas.data.total_page * $scope.page.page_rows;
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        })  
    }
    $scope.getProjectList();

    //分页
    $scope.changeList=function(index){
        var sendDate={};
        sendDate.page_index=index;
        sendDate.page_row=$scope.page.page_rows;
       var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getProjectList", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getProjectList&sign="+sign+"&time="+timestamp+"&format=json";
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
    //添加系统
    $scope.addSystem=function(r){
        $scope.num=0;
        if(r){
             var demoHtml="<p><input type='text' name='is_f' class='sa' placeholder='请输入' ng-blur='verification($event,1)' ><a href='javascript:;' ng-click='removeSys($event)' class='removes' >删除</a></p>"; 
        }else{
            var demoHtml="<p><input type='text' name='is_f' class='sa' placeholder='请输入' ng-blur='verification($event)' ><a href='javascript:;' ng-click='removeSys($event)' class='removes' >删除</a></p>"; 
        }
       
        var template = angular.element(demoHtml);
        var mobileDialogElement = $compile(template)($scope);
          angular.element($(".systemText")).append(mobileDialogElement);                                  
    }

    // 删除新建修改项目的系统
    $scope.removeSys=function($event){
        angular.element($event.target).parent().remove();
    }
    //创建项目
    $scope.newProjects=function($event,r){
         
         if($event){
            $scope.hides=true;
            $scope.titles=r;
            return false;
         }
         $scope.verification();
        if($scope.newProject.$valid && !$scope.b){
            $scope.newSystems.system_name=[];
            angular.element(".systemText.eve").find("input").each(function(){
                    if($.trim($(this).val())){
                        $scope.newSystems.system_name.push($(this).val());
                    }
                })

            console.log($scope.newSystems.system_name)
            var sendDate=$scope.newSystems;

            console.log(sendDate)
            $.confirms({
                msg:"是否确认创建项目？",
                    callback:function(){
                        var timestamp = Date.parse(new Date())/1000;
                        var sign = getSign("createProject", timestamp);
                        var urlss="appId=92b9c8d2b03d43b1&apiName=createProject&sign="+sign+"&time="+timestamp+"&format=json";
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
                        $scope.reClose();  
                    },
                    errors:function(){
                      return false;
                    }
            })

         }else{
            $scope.a=true;
            $scope.s=true;
            $scope.e=true;
         }

    }

//系统失去焦点
$scope.verification=function($event,r){
     var target=false;
     if(!r){ //新增
         angular.element(".systemText.eve").find("input").each(function(){
            if(!$.trim($(this).val())){
                target=true;
                console.log(1)
                return false;
            }
        })
     }else{//修改
        angular.element(".systemText.not").find("input").each(function(){
            console.log($(this).val())
            if(!$.trim($(this).val())){
                target=true;
                return false;
            }
        })
     }
   
    if(target){
        $scope.b=true;
    }else{
        $scope.b=false;
    }
}
  $scope.reClose=function($event){
    $scope.hides=false;  
    $scope.newSystems={
        project_name:'',
        system_name:[],
        pjtime_release:'',
        remark:''
    }
    angular.element(".systemText").find("p").remove();
    angular.element(".systemText").find("input").val('');
    $scope.a=false;
    $scope.s=false;
    $scope.e=false;
    $scope.b=false;
  }
  //删除项目
  $scope.removeProject=function(r){
        $.confirms({
            msg:"是否确定删除该项目？",
                callback:function(){
                    var sendDate={};
                    sendDate.project_id=r;
                    var timestamp = Date.parse(new Date())/1000;
                    var sign = getSign("deleteProject", timestamp);
                    var urlss="appId=92b9c8d2b03d43b1&apiName=deleteProject&sign="+sign+"&time="+timestamp+"&format=json";
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

    //修改项目
    $scope.modifyProjects=function(project){
        if(project){
            $scope.modifyProId=project.project_id;
            $scope.titles=2;
            $scope.hides=true;
            $scope.newSystems={
                project_name:project.project_name,
                system_name:project.sys_list,
                pjtime_release:project.pjtime_release,
                remark:project.remark
            }
            var html=[];
        angular.forEach(project.sys_list, function(data,index){ //修改项目时创建系统dom 

        html+="<p><input type='text' name='is_f' class='sa'placeholder='请输入' data-sid="+data.sid+" value="+data.system_name+" ng-blur='verification($event,1)' >";
         if(index!=0){
            html+="<a href='javascript:;' ng-click='removeSys($event)' class='removes' >删除</a>";
         }else{
            html+="<span  class='errorInfo' ng-show='b' >系统不能为空</span>";
         }
          html+="</p>"; 

        });
       
       //实例化dom
        var template = angular.element(html);
        var mobileDialogElement = $compile(template)($scope);
        angular.element($(".systemText.not")).append(mobileDialogElement);          
            return false; 
        }
        //系统验证
        $scope.verification(1,2);
        if($scope.newProject.$valid && !$scope.b){ 
            var lists='';
            var nums=0;
            var strings="";
            angular.element($(".systemText.not")).find("input").each(function(index){ 
                var  $this=$(this); 
                        if($this.attr('data-sid')){
                            lists+='{"sid":'+$this.attr('data-sid')+',"system_name":"'+$this.val()+'",status:""},'; 
                            
                        }else{
                            lists+='{"sid":"","system_name":"'+$this.val()+'"},';
                        }  
                })  
            
            lists=lists.substring(0,lists.length-1);
            var  list = '[' + lists + ']';  
            list = eval("(" + list + ")");
            var sysListr=[];
           
            angular.forEach($scope.newSystems.system_name,function(datas,index){
                
               angular.forEach(list,function(code,index){
                    if(datas.sid==code.sid){
                        nums=1;
                        strings=code.system_name;
                    }
                }) 
               if(nums==1){
                datas.system_name=strings;
                    sysListr.push(datas);

               }else{
                datas.status=0;
                sysListr.push(datas);
               }
               nums=0;
            })
             angular.forEach(list,function(codes,index){
                    if(!codes.sid){
                        sysListr.push(codes);
                    }
                }) 
            $scope.newSystems.system_name=sysListr;
            var sendDate=$scope.newSystems;
            sendDate.project_id=$scope.modifyProId;
            $.confirms({
                msg:"是否确认修改该项目？",
                    callback:function(){
                        var timestamp = Date.parse(new Date())/1000;
                        var sign = getSign("modifyProject", timestamp);
                        var urlss="appId=92b9c8d2b03d43b1&apiName=modifyProject&sign="+sign+"&time="+timestamp+"&format=json";
                        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
                            if(datas.status==1){
                                $.alerts({
                                    msg:datas.message,
                                    callback: function () {
                                        $window.location.reload();
                                    }
                                })
                                $scope.reClose();  
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
            $scope.a=true;
            $scope.s=true;
            $scope.e=true;
        }
        
        
    }
}])