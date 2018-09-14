webModel.controller('header', ["$scope","$window" ,"util", function ($scope,$window ,util) {
	$scope.notShow=false;
	$scope.hideUserInfo=false;
	$scope.agent=false;
	$scope.userName="";
	$scope.pwdList={
		old_password:"",
		new_password:"",
		re_password:""
	}
	var arr=getStorage("userInfor");
	if(arr){
		setTimeout(function(){
            $scope.$apply(function(){
                $scope.names=arr.user_name;
        	})
     	},10)
		
	}

	//公共头部切换
	var c=angular.element("body").attr("id");
	angular.element(".nav").find("li").eq(c).addClass('nav-active').siblings().removeClass('nav-active');
	$scope.actives=function(n){
		angular.element(".nav").find("li").eq(n).addClass('nav-active').siblings().removeClass('nav-active');  
	}
	

	  //获取权限
    $scope.getJusrList=function(){
        var sendDate={};
        var timestamp = Date.parse(new Date())/1000;
		var sign = getSign("assignAuthority", timestamp);
		var urlss="appId=92b9c8d2b03d43b1&apiName=assignAuthority&sign="+sign+"&time="+timestamp+"&format=json";
		util.httpRequest(urlss,"POST",sendDate,true).then(function(datas){
			if(datas.status==1){
                $scope.getJusr=datas.data;
                setStorage("getJusr",JSON.stringify(datas.data));
            }else{
                $.alerts({
                  msg:datas.message,
                  callback: function () {
					window.location.href="./index.php?loadmodel=index";
				  }
                })
            }
		})
    }
    $scope.getJusrList();

    

	$scope.getUserInfos=function(){
		var sendDate={};
		var timestamp = Date.parse(new Date())/1000;
		var sign = getSign("getUserInfo", timestamp);
		var urlss="appId=92b9c8d2b03d43b1&apiName=getUserInfo&sign="+sign+"&time="+timestamp+"&format=json";
		util.httpRequest(urlss,"POST",sendDate,false).then(function(datas){
			if(datas.status==1){
               $scope.userInfos=datas.data;
               setStorage("userInfor",JSON.stringify(datas.data));
               $scope.names=$scope.userInfos.user_name;
            }else{
                $.alerts({
                  msg:datas.message
                })
            }
		})
	}
	$scope.getUserInfos();

	$scope.userInfo=function(){
		$scope.hideUserInfo=true;
		$scope.notShow=true;
	}
	$scope.notAs=function(){
		if($scope.notShow==true && $scope.hideUserInfo==true && $scope.agent != true){
			$scope.notShow=false;
			$scope.hideUserInfo=false;

		}
	}

	$scope.close=function(){
		$scope.agent=false;
		$scope.notShow=false;
		$scope.hideUserInfo=false;
		$scope.setPassword=false;
		$scope.repeatPwds=false;
		angular.element("input").val("");
	}

	$scope.showAgents=function($event){
		$event.stopPropagation();
		$scope.agent=true;
		$scope.notShow=true;
		$scope.hideUserInfo=false;
		var sendDate={};
		var timestamp = Date.parse(new Date())/1000;
		var sign = getSign("getAllMember", timestamp);
		var urlss="appId=92b9c8d2b03d43b1&apiName=getAllMember&sign="+sign+"&time="+timestamp+"&format=json";
		util.httpRequest(urlss,"POST",sendDate,true).then(function(datas){
			if(datas.status==1){
               $scope.groupMember=datas.data.data;
            }else{
                $.alerts({
                  msg:datas.message
                })
            }
		})
	}



	//修改密码
	$scope.modifyPwd=function(r){
		if(r){
			$scope.setPassword=true;
			setTimeout(function(){
				$scope.$apply(function(){
					$scope.hideUserInfo=false;
				})
			},10)
			$scope.hideUserInfo=false;
			return false;
		}
		if($scope.setPwdList.$valid && $scope.pwdList.new_password == $scope.pwdList.re_password){
			
			var sendDate=$scope.pwdList;
			
			var userName=getStorage('userInfor');
			sendDate.user_account=userName.user_account;
			var timestamp = Date.parse(new Date())/1000;
			var sign = getSign("resetPwd", timestamp);
			var urlss="appId=92b9c8d2b03d43b1&apiName=resetPwd&sign="+sign+"&time="+timestamp+"&format=json";
			
			$.confirms({
	            msg:"是否确认修改密码？",
	                callback:function(){
	                	util.httpRequest(urlss,"POST",sendDate,true).then(function(datas){
							if(datas.status==1){
								$.alerts({
									msg:datas.message,
									callback: function () {
					                    window.location.href="./index.php?loadmodel=login";
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
			$scope.oidPwd=true;
			$scope.newPwd=true;
			$scope.repeatPwds=true;
		}
		
		

	}

	//设置代理人
	$scope.setAgent=function(){
		var sendDate={};
		var sendDate=angular.element("#setAgentList").serializeObject();
		sendDate.tid=$scope.userName;
		if(!sendDate.tid){
			$.alerts({
					msg:"请选择代理人"
				})
			return;
		}
		if(!sendDate.agent_start_time || !sendDate.agent_end_time  ){
			$.alerts({
					msg:"请选择时间"
				})
			return;
		}
		var timestamp = Date.parse(new Date())/1000;
		var sign = getSign("setAgent", timestamp);
		var urlss="appId=92b9c8d2b03d43b1&apiName=setAgent&sign="+sign+"&time="+timestamp+"&format=json";
		$.confirms({
            msg:"是否设置成为代理人？",
                callback:function(){
                	util.httpRequest(urlss,"POST",sendDate,true).then(function(datas){
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
					$scope.close();  
                },
                errors:function(){
                  return false;
                }
        })
		
	}

	$scope.cancelAgent=function(){
		var sendDate={};
		$.confirms({
            msg:"确定取消代理人？",
                callback:function(){
                	var timestamp = Date.parse(new Date())/1000;
					var sign = getSign("setAgent", timestamp);
					var urlss="appId=92b9c8d2b03d43b1&apiName=setAgent&sign="+sign+"&time="+timestamp+"&format=json";
                     
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

	$scope.logout=function(){
		$.confirms({
            msg:"确定退出？",
                callback:function(){
                	var sendDate={};
                	var urls="appId=92b9c8d2b03d43b1&apiName=userLogout&sign=3d8d8e20e163a1a3498b160e2a123de4&time=1234567890&format=json";
                	util.httpRequest(urls,"post",sendDate,true).then(function(datas){

						if(datas.success==1){
							$window.location.href="./index.php?loadmodel=login"
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

	

	//获取任务导航
	$scope.getUrls=function(event){
		if(angular.element("body").attr("id")){
			var o=angular.element("body").attr("id");
		}
		var u=window.location.href;
		if(u.indexOf("&")==-1){
			var r=getUrl();
			if(!r){
				r="index";
			}
			if(!event){
				var events=angular.element(".nav-active").find("a").text();
			}else{
				var events=angular.element(event.target).text();
			}
			var rs={"url":r,"text":events,"header":o};
			setStorage("urlr",JSON.stringify(rs));
		}
	}
    $scope.getUrls();
}])