<!DOCTYPE html>
<html lang="en" ng-app="myWeb">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit">
	<title>任务管理</title>
	<?php include $tpl_path."common/head.php"; ?>
	<link rel="stylesheet" type="text/css" href="css/login.css<?php echo $css_v; ?>" />
	<script src="js/login.js<?php echo $js_v; ?>" type="text/javascript" charset="utf-8"></script>
	
</head>
<body ng-controller="login" id="bodys">
	<div class="main login" >
		<div class="left">
			<div class="title">
				<p class="Eg">CUG  Task  Mangement Tools</p>
				<p class="nz">中国联保研发任务管理工具</p>
			</div>
			
		</div>
		<div class="right">
			<div class="rightContent">
				<div class="cont">
					<form action="" id="userInfo" name="angularForm" novalidate  autocomplete="off" >
						<div class="rightTitle">
							<span>欢迎登录</span>
						</div>
						<div class="error" >
							<p ng-if="inof" class='ps'>
								<i class="icon iconfont icon-cuowu2 "></i>
								<span >{{errorInfo}}</span>
		                         
							</p>
							<p ng-else >
						
							</p>
						</div>
						<div class="names">
							<i class="icon iconfont icon-yonghu2 "  ng-class="{true:'i-active',false:''}[classNames]"></i>
							<input type="text" autocomplete="off" name="userName" id="userName" 
							ng-model="userName" ng-focus="classNames = true" 
							ng-blur="focusName()"  ng-keyup="myKeyup($event)"  >
						</div>
						<div class="pwd">
							<i class="icon iconfont icon-mima"  ng-class="{true:'i-active',false:''}[classPwd]" ></i>
							<input type="password" autocomplete="off" name="password"  id="password"
							 ng-model="password" ng-focus="classPwd = true" 
							 ng-blur="focusPwd()"  ng-keyup="myKeyup($event)"  >
						</div>
						<div class="butr">

							<input type="button" id="butLling" value="登录"   ng-click="submits()" >
							<div class="box"></div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</body>
</html>