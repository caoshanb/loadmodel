<!DOCTYPE html>
<html lang="en" ng-app="myWeb" >
<head>
	<meta charset="UTF-8">
	<title>任务管理</title>
	<?php include $tpl_path."common/head.php"; ?>
	<script src="./js/reviseHistory.js<?php echo $js_v; ?>" type="text/javascript" charset="utf-8"></script>
	<style>
		.planContent{padding: 10px 0; }
		.myMissionPlan .but{padding: 30px;}
	</style>
</head>
<body id="" >
	<div class="tops">
		<!-- <?php include $tpl_path."common/header.php"; ?> -->
	<div  ng-include="'index.php?loadmodel=header'"></div>
	</div>
	<div ng-controller="reviseHistory" ng-cloak class="reviseHistory module">
		<div class="">
			<div class="promptNav">
				<a href="./index.php?loadmodel={{urlr.url}}">{{urlr.text}}</a>
				<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
				<a  href="./index.php?loadmodel={{urlr.url}}&dat={{projcetUrl.zid}}"  >{{projcetUrl.nameCode}}</a>
				<span ng-show="myTask==undefined">
				<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
				<a href="./index.php?loadmodel=myMissionPlan&xid={{xid}}&auth_type={{auth_type}}">计划</a>
				<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
				<a href="./index.php?loadmodel=planDetails&xid={{xid}}&auth_type={{auth_type}}&planId={{planId}}">详情</a>
				<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
				<span>修改历史</span>
				</span>
				<span ng-show="myTask!=undefined">
					<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
					<a href="./index.php?loadmodel=myMissionPlan&xid={{xid}}&auth_type={{auth_type}}&myTask=0">计划</a>
					<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
					<a href="./index.php?loadmodel=planDetails&xid={{xid}}&auth_type={{auth_type}}&planId={{planId}}&myTask=0">详情</a>
					<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
					<span>修改历史</span>
				</span>
			</div>
			<div class="backgrounds"></div>
			<div class="planContent">
				<p class="title">计划修改历史</p>
				<div>
					<table>
						<thead>
							<tr>
								<th>编号</th>
								<th>计划名称</th>
								<th>修改人</th>
								<th>修改时间</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
							<tr ng-repeat="reviseHistory in reviseHistoryList" ng-show="reviseHistoryList!='' || reviseHistoryList!= undefined">
								<td>{{reviseHistory.num}}</td>
								<td title="{{reviseHistory.plan_name}}">{{reviseHistory.plan_name | cut:true:15:'...'}}</td>
								<td>{{reviseHistory.modify_man}}</td>
								<td>{{reviseHistory.time_modify}}</td>
								<td>
									<a ng-show="myTask==undefined" href="./index.php?loadmodel=reviseHistoryDetails&xid={{xid}}&planId={{planId}}&reviseHistoryId={{reviseHistory.id}}&auth_type={{auth_type}}" >详情</a>
									<a ng-show="myTask!=undefined" href="./index.php?loadmodel=reviseHistoryDetails&xid={{xid}}&planId={{planId}}&reviseHistoryId={{reviseHistory.id}}&auth_type={{auth_type}}&myTask=0" >详情</a>
								</td>
							</tr>
							<tr ng-show="reviseHistoryList=='' || reviseHistoryList== undefined">
								<td colspan="5">暂无任务</td>
							</tr>
						</tbody>
					</table>
				</div>
				<pagination total-items="total || 1" ng-change="changeList(page.page_index)" ng-model="page.page_index" max-size="5"
	                            items-per-page="page.page_rows" class="pagination-sm pull-right"
	                            boundary-links="true"></pagination>
			</div>
		</div>
	</div>
</body>
<script>	
  
</script>
</html>