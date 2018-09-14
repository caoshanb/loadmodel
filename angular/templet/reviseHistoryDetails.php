<!DOCTYPE html>
<html lang="en" ng-app="myWeb" >
<head>
	<meta charset="UTF-8">
	<META HTTP-EQUIV="pragma" CONTENT="no-cache">
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate">
	<META HTTP-EQUIV="expires" CONTENT="0">
	<title>中国联保研发任务管理平台</title>
	<?php include $tpl_path."common/head.php"; ?>
	<script src="./js/reviseHistoryDetails.js<?php echo $js_v; ?>" type="text/javascript" charset="utf-8"></script>
</head>
<body id="" >
	<div class="tops">
		<!-- <?php include $tpl_path."common/header.php"; ?> -->
	<div  ng-include="'index.php?loadmodel=header'"></div>
	</div>
	<div ng-controller="reviseHistoryDetails" ng-cloak class="reviseHistoryDetails module">
		<div class="">
			<div class="promptNav">
				<span>{{urlr.text}}</span>
				<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
				<a href="index.php?loadmodel={{urlr.url}}&projcet={{projcetUrl.zid}}"  >{{projcetUrl.nameCode}}</a>
				<span ng-show="myTask==undefined">
					<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
					<a href="./index.php?loadmodel=myMissionPlan&xid={{xid}}&auth_type={{auth_type}}">计划</a>
					<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
					<a href="./index.php?loadmodel=planDetails&xid={{xid}}&auth_type={{auth_type}}&gid={{groupIds}}&planId={{planId}}">详情</a>
					<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
					<a href="./index.php?loadmodel=reviseHistory&xid={{xid}}&auth_type={{auth_type}}&gid={{groupIds}}&planId={{planId}}">修改历史</a>
					<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
					<span>修改历史详情</span>
				</span>
				<span ng-show="myTask!=undefined">
					<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
					<a href="./index.php?loadmodel=myMissionPlan&xid={{xid}}&auth_type={{auth_type}}&myTask=0">计划</a>
					<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
					<a href="./index.php?loadmodel=planDetails&xid={{xid}}&auth_type={{auth_type}}&planId={{planId}}&gid={{groupIds}}&myTask=0">详情</a>
					<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
					<a href="./index.php?loadmodel=reviseHistory&xid={{xid}}&auth_type={{auth_type}}&planId={{planId}}&gid={{groupIds}}&myTask=0">修改历史</a>
					<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
					<span>修改历史详情</span>
				</span>
			</div>
			<div class="backgrounds"></div>
			<div class="planContent">
				<p class="title">修改历史详情</p>
				<div>
					<table>
						<thead>
							<tr>
								<th>编号</th>
								<th width="25%">任务模块</th>
								<th>进度</th>
								<th>计划开始时间</th>
								<th>计划结束时间</th>
								<th>实际开始时间</th>
								<th>实际结束时间</th>
								<th width="20%">修改原因</th>
								<th>参与人</th>
							</tr>
						</thead>
						<tbody>
							<tr ng-repeat="fix in fixReviseList" ng-show="fixReviseList!='' || fixReviseList!= undefined">
								<td>{{fix.num}}</td>
								<td>
									<p class="remarkLength">{{fix.module_name}}</p>
								</td>
								<td>
									<span >{{fix.process}}</span>
								</td>
								<td  ng-class="{true:'modifiesr',false:''}[fix.op_field=='time_start_schedule']">{{fix.time_start_schedule}}</td>
								<td  ng-class="{true:'modifiesr',false:''}[fix.op_field=='time_end_schedule']">{{fix.time_end_schedule}}</td>
								<td  ng-class="{true:'modifiesr',false:''}[fix.op_field=='time_start']">{{fix.time_start}}</td>
								<td  ng-class="{true:'modifiesr',false:''}[fix.op_field=='time_end']">{{fix.time_end}}</td>
								<td  ng-class="{true:'modifiesr',false:''}[fix.op_field=='reason']"><span class="remarkLength">{{fix.reason}}</span></td>
								<td  ng-class="{true:'modifiesr',false:''}[fix.op_field=='developer']">{{fix.developer}}</td>
								
							</tr>
							<tr ng-show="fixReviseList=='' || fixReviseList== undefined">
								<td colspan="9">暂无任务</td>
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