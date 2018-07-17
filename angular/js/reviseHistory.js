webModel.controller('reviseHistory', ["$scope", "httpAjax","util",function ($scope, httpAjax,util) {

	var hrefs = GetRequest();
    $scope.xid = parseInt(hrefs['xid']);
    $scope.projcetUrl=getStorage("projcet");
    $scope.planId = parseInt(hrefs['planId']);
    $scope.auth_type = parseInt(hrefs['auth_type']);
    $scope.myTask = hrefs['myTask'];
    var a=sessionStorage.getItem("urlr");
    $scope.urlr=JSON.parse(a);
    angular.element("body").attr("id",$scope.urlr.header);
      $scope.page = {
        page_rows: 5,
        page_index: 1
    };  
	$scope.getReviseHistoryList=function(){
		var sendDate={};
		sendDate.task_id=$scope.xid;
		sendDate.page_rows=$scope.page.page_rows;
		sendDate.page_index=1;
		sendDate.auth_type=$scope.auth_type;
		var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getPlanModifyHistory", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getPlanModifyHistory&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
            if(datas.status==1){
                $scope.reviseHistoryList=datas.data.data;
                $scope.total = datas.data.page_total * $scope.page.page_rows;
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        }) 
	}
	$scope.getReviseHistoryList();

	//分页
	$scope.changeList=function(r){

		var sendDate={};
		sendDate.task_id=$scope.xid;
		sendDate.page_rows=$scope.page.page_rows;
		sendDate.page_index=r;
		sendDate.auth_type=$scope.auth_type;
		var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getPlanModifyHistory", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getPlanModifyHistory&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
            if(datas.status==1){
                $scope.reviseHistoryList=datas.data.data;
                $scope.total = datas.data.page_total * $scope.page.page_rows;
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        })
	}
}])