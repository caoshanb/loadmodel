webModel.controller('taskAmend', ["$scope", "httpAjax","$timeout","$window","util", function ($scope, httpAjax,$timeout,$window,util) {

    var hrefs = GetRequest();
    $scope.xid = parseInt(hrefs['xid']);
    $scope.projcetUrl=getStorage("projcet");
    $scope.auth_type = parseInt(hrefs['auth_type']);
    $scope.is_plan=parseInt(hrefs['is_plan']);
    $scope.myTask = hrefs['myTask'];
    var a=sessionStorage.getItem("urlr");
    $scope.urlr=JSON.parse(a);
    angular.element("body").attr("id",$scope.urlr.header);
     $scope.page = {
        page_rows: 5,
        page_index: 1
    };
    
     // 获取修改历史列表
    $scope.getFixOringList=function(){
        var sendDate={};
        sendDate.task_id=$scope.xid;
        sendDate.page_rows=$scope.page.page_rows;
        sendDate.page_index=1;
        sendDate.auth_type=$scope.auth_type;
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
                $scope.total = datas.data.page_total * $scope.page.page_rows;
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        }) 
    }
    $scope.getFixOringList();

    $scope.changeList=function(r){
        var sendDate={};
         sendDate.task_id=$scope.xid;
          sendDate.page_rows=$scope.page.page_rows;
        sendDate.page_index=r;
        sendDate.auth_type=$scope.auth_type;
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
}])