webModel.controller('login', ["$scope","$http","$window","util" ,function ($scope,$http,$window,util) {
	$scope.userName="";
	$scope.password="";
	$scope.classNames=false;
	$scope.classPwd=false;
	$scope.inof=false;
	$scope.errorInfo="";
	$scope.submits=function(){
		if(!$scope.userName){
			$scope.errorInfo="用户名不能为空";
			$scope.inof=true;
			return ;
		}
		if(!$scope.password){
			$scope.errorInfo="密码不能为空";
			$scope.inof=true;
			return ;
		}
		var sendData={
			user_account:$scope.userName,
			password:$scope.password
		};
		var timestamp = Date.parse(new Date())/1000;
		var sign = getSign("userLogin", timestamp);
		var urlss="appId=92b9c8d2b03d43b1&apiName=userLogin&sign="+sign+"&time="+timestamp+"&format=json";
		util.httpRequest(urlss,"post",sendData,true).then(function(data){
			if(data.success==1){
				$window.location.href="./index.php?loadmodel=index";
			}else{
				setTimeout(function(){
					$scope.$apply(function(){
						$scope.errorInfo=data.message;
						$scope.inof=true;
					})
				},100)
			}
		})
	}

$scope.myKeyup = function(e){ 
 	//IE 编码包含在window.event.keyCode中，Firefox或Safari 包含在event.which中
	var keycode = window.event?e.keyCode:e.which; 
    if(keycode==13){
    $scope.submits();
    }
};

	$scope.focusName=function(){
		
		$scope.classNames = false;
		if(!$scope.userName){
			$scope.errorInfo="用户名不能为空";
			$scope.inof=true;
		}else{
			$scope.inof=false;
		}
		
	}

	$scope.focusPwd=function(){
		$scope.classPwd = false;
		if(!$scope.password){
			$scope.errorInfo="密码不能为空";
			$scope.inof=true;
		}else{
			$scope.inof=false;
		}
	}

}])

