webModel.controller('myMissionPlan', ["$scope", "httpAjax","$timeout","$window","util",function ($scope, httpAjax,$timeout,$window,util) {

	var hrefs = GetRequest();
    $scope.xid = parseInt(hrefs['xid']);
    $scope.projcetUrl=getStorage("projcet");
    $scope.auth_type = parseInt(hrefs['auth_type']);
    $scope.is_plan = parseInt(hrefs['is_plan']);
    $scope.myTask = hrefs['myTask'];
    $scope.read = parseInt(hrefs['read']);
    $scope.inits="";
    $scope.remark="";
    $scope.planName="";
    $scope.template="";
    var a=sessionStorage.getItem("urlr");
    $scope.urlr=JSON.parse(a);
    angular.element("body").attr("id",$scope.urlr.header);
	//分页参数
    $scope.page = {
        page_rows: 5,
        page_index: 1
    };
  	
    // 未读
    $scope.setRead=function(){
      var sendDate={};
      if($scope.read==0){
        sendDate.task_id=$scope.xid;
        sendDate.is_read=true;
        var timestamp = Date.parse(new Date())/1000;
          var sign = getSign("setTaskRead", timestamp);
          var urlss="appId=92b9c8d2b03d43b1&apiName=setTaskRead&sign="+sign+"&time="+timestamp+"&format=json";
          util.httpRequest(urlss,"post",sendDate,false).then(function(datas){
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

  	$scope.planList=function(){
  		var sendDate={};
        sendDate.task_id=$scope.xid;
        sendDate.page_rows=$scope.page.page_rows;
        sendDate.page_index=$scope.page.page_index;
        sendDate.auth_type=$scope.auth_type;
        if($scope.myTask!=undefined){
          var apiName= 'getMyPlanList';
        }else{
          var apiName= 'getPlanList';
        }
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign(apiName, timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName="+apiName+"&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,false).then(function(datas){
            if(datas.status==1){
                $scope.planListr=datas.data.data;
                $scope.total = datas.data.page_total * $scope.page.page_rows;
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        }) 
  	}
    $scope.planList();

    //分页
  $scope.changeList=function(r){

    var sendDate={};
    sendDate.task_id=$scope.xid;
    sendDate.page_rows=$scope.page.page_rows;
    sendDate.page_index=r;
    sendDate.auth_type=$scope.auth_type;
    if($scope.myTask!=undefined){
        var apiName= 'getMyPlanList';
      }else{
        var apiName= 'getPlanList';
      }
    var timestamp = Date.parse(new Date())/1000;
        var sign = getSign(apiName, timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName="+apiName+"&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
            if(datas.status==1){
                $scope.planListr=datas.data.data;
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
      }) 
  }

    //删除计划
    $scope.removePlan=function(r){
      $.confirms({
            msg:"是否确定删除该计划？",
                callback:function(){
                  var sendDate={};
                  sendDate.xid=r;
                  sendDate.handle_type=2;
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
    //get小组成员
    $scope.getGroup=function(){
        var sendDate={};
        sendDate.page_rows=100;
        sendDate.page_index=$scope.page.page_index;
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getGroupName", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getGroupName&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,false).then(function(datas){
            if(datas.status==1){
                $scope.groupList=datas.data;
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        }) 
    }
     $scope.getGroup();
    //get模板
    $scope.getTemplate=function(){
        var sendDate={};
        var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getPlanTemplate", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getPlanTemplate&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,false).then(function(datas){
            if(datas.status==1){
                $scope.templateList=[];
                angular.forEach(datas.data,function(code){
                    if(code.pid){
                      $scope.templateList.push(code)
                    }
                })
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        }) 
    }
     $scope.getTemplate();
      
    $scope.end=function(){
     $scope.hides=true;
     
  }

  //关闭
  $scope.reClose=function(){
   $scope.hides=false;
   $scope.planName='';
   $scope.inits='';
   $scope.template='';
   $scope.remark='';
  }
     // 提交新建计划
    $scope.submits=function(){
        if(!$scope.inits||!$scope.remark||!$scope.planName ){
            $.alerts({
              msg:"有未填选项或未编辑内容"
            })
            return false;
        }
        var sendDate={};
        sendDate.pid=$scope.xid;
        sendDate.title=$scope.planName;
        sendDate.template_id=$scope.template;
        sendDate.remark=$scope.remark;
        sendDate.group=$scope.inits;
        sendDate.auth_type=$scope.auth_type;
        if($scope.is_plan){
            sendDate.is_plan=$scope.is_plan;
        }
        $.confirms({
            msg:"是否确定创建该计划？",
              callback:function(){
               var timestamp = Date.parse(new Date())/1000;
                var sign = getSign("createPlan", timestamp);
                var urlss="appId=92b9c8d2b03d43b1&apiName=createPlan&sign="+sign+"&time="+timestamp+"&format=json";
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
  
}]);