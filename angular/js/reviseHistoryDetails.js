webModel.controller('reviseHistoryDetails', ["$scope","util",function ($scope,util) {

	var hrefs = GetRequest();
	$scope.urlr=getUrl();
    $scope.xid = parseInt(hrefs['xid']);
    $scope.groupIds = parseInt(hrefs['gid']);
    $scope.projcetUrl=getStorage("projcet");
    $scope.auth_type = parseInt(hrefs['auth_type']);
    $scope.planId = parseInt(hrefs['planId']);
    $scope.myTask = hrefs['myTask'];
    $scope.reviseHistoryId =parseInt(hrefs['reviseHistoryId']);
    $scope.urlr=getStorage("urlr");
    angular.element("body").attr("id",$scope.urlr.header);
    $scope.page = {
        page_rows: 10,
        page_index: 1
    };
	$scope.getReviseHistoryList=function(){
		var sendDate={};
		sendDate.plan_id=$scope.reviseHistoryId;
		sendDate.page_rows=$scope.page.page_rows;
		sendDate.page_index=1;
		sendDate.auth_type=$scope.auth_type;
		var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getModuleModifyHistory", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getModuleModifyHistory&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
            if(datas.status==1){
                $scope.fixReviseList=datas.data.data;
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
		sendDate.plan_id=$scope.reviseHistoryId;
		sendDate.page_rows=$scope.page.page_rows;
		sendDate.page_index=r;
		sendDate.auth_type=$scope.auth_type;
		var timestamp = Date.parse(new Date())/1000;
        var sign = getSign("getModuleModifyHistory", timestamp);
        var urlss="appId=92b9c8d2b03d43b1&apiName=getModuleModifyHistory&sign="+sign+"&time="+timestamp+"&format=json";
        util.httpRequest(urlss,"post",sendDate,true).then(function(datas){
            if(datas.status==1){
                $scope.fixReviseList=datas.data.data;
            }else{
                $.alerts({
                    msg:datas.message
                })
            }
        }) 
	}
}])