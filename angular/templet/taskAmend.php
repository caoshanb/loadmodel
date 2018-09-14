<!DOCTYPE html>
<html lang="en" ng-app="myWeb" >
<head>
	<meta charset="UTF-8">
	<META HTTP-EQUIV="pragma" CONTENT="no-cache">
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate">
	<META HTTP-EQUIV="expires" CONTENT="0">
	<title>中国联保研发任务管理平台</title>
	<?php include $tpl_path."common/head.php"; ?>
	<script src="./js/taskAmend.js<?php echo $js_v; ?>" type="text/javascript" charset="utf-8"></script>
</head>
<body id="" >  
<div></div> 
	<div class="tops">
		<!-- <?php include $tpl_path."common/header.php"; ?> -->
	<div  ng-include="'index.php?loadmodel=header'"></div>
	</div>
	<div ng-controller="taskAmend" ng-cloak class="taskAmend module">
		<div class="">
			<div class="promptNav">
				<span>{{urlr.text}}</span>
				<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
				<a href="index.php?loadmodel={{urlr.url}}&projcet={{projcetUrl.zid}}"  >{{projcetUrl.nameCode}}</a>
				<span ng-show="myTask!=undefined">
				<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
				<a href="./index.php?loadmodel=taskDetails&xid={{xid}}&auth_type={{auth_type}}&myTask=0">详情</a>
				</span>
				<span ng-show="myTask==undefined">
				<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
				<a href="./index.php?loadmodel=taskDetails&xid={{xid}}&auth_type={{auth_type}}">详情</a>
				</span>
				
				<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i><span>日志</span>
			</div>
			<div class="backgrounds"></div>
			<div class="amendHistory">
				<div class="but"> 
					修改历史
					
				</div>
				<table>
					<thead>
						<tr>
							<th width="10%">编号</th>
							<th width="22%">修改时间</th>
							<th width="22%">修改前</th>
							<th width="22%">修改后</th>
							<th width="14%">修改原因</th>
							<th width="10%">修改人</th>
							</tr>
						</thead>
						<tbody>
							<tr ng-repeat="fix in fixOringList" ng-show="fixOringList!=undefined || fixOringList!=''">
								<td>{{fix.num}}</td>
								<td>{{fix.time_change}}</td>
								<td>{{fix.value_before}}</td>
								<td>{{fix.value_after}}</td>
								<td>{{fix.reason}}</td>
								<td>{{fix.username}}</td>
							</tr>
							<tr >
								<td colspan="6" ng-show="fixOringList==undefined || fixOringList==''">暂无修改记录</td>
							</tr>
						</tbody>
				</table>
				<pagination total-items="total || 1" ng-change="changeList(page.page_index)" ng-model="page.page_index" max-size="5"
	                            items-per-page="page.page_rows" class="pagination-sm pull-right"
	                            boundary-links="true"></pagination>
			</div>
		</div>
		
	</div>
</body>
</html>