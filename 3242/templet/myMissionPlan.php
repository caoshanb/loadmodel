<!DOCTYPE html>
<html lang="en" ng-app="myWeb" >
<head>
	<meta charset="UTF-8">
	<title>任务管理</title>
	<?php include $tpl_path."common/head.php"; ?>
	<script src="./js/myMissionPlan.js<?php echo $js_v; ?>" type="text/javascript" charset="utf-8"></script>
</head>
<body id="" >
	<div class="tops">
		<!-- <?php include $tpl_path."common/header.php"; ?> -->
	<div  ng-include="'index.php?loadmodel=header'"></div>
	</div>
	<div ng-controller="myMissionPlan" ng-cloak class="myMissionPlan module">
		<div class="">
			<div class="promptNav">
				<a href="./index.php?loadmodel={{urlr.url}}">{{urlr.text}}</a>
				<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
				<a   href="./index.php?loadmodel={{urlr.url}}&dat={{projcetUrl.zid}}"  >{{projcetUrl.nameCode}}</a>
				<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
				<span>计划</span>
			</div>
			<div class="backgrounds"></div>
			<div class="planContent">
				<div class="but">
					<button  ng-class="{true:'butDisabled',false:''}[myTask!=undefined]"  ng-disabled="myTask" ng-click="end()">新建计划</button>
				</div>
				<div>
					<table>
						<thead>
							<tr>
								<th>编号</th>
								<th>计划名称</th>
								<th>小组</th>
								<th>备注</th>
								<th>计划人</th>
								<th>计划时间</th>
								<th>开始时间</th>
								<th>完成时间</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
							<tr ng-repeat="plan in planListr" ng-show="planListr!='' || planListr!= undefined">
								<td>{{plan.num}}</td>
								<td title="{{plan.plan_name}}" >{{plan.plan_name | cut:true:10:'...'}}</td>
								<td>{{plan.group}}</td>
								<td title="{{plan.remark}}">{{plan.remark | cut:true:15:'...' }}</td>
								<td>{{plan.plan_initiator}}</td>
								<td>{{plan.ptime_create}}</td>
								<td>{{plan.ptime_start}}</td>
								<td>{{plan.ptime_finish}}</td>
								<td>
									<a ng-show="myTask!=undefined" href="./index.php?loadmodel=planDetails&xid={{xid}}&auth_type={{auth_type}}&planId={{plan.pid}}&myTask=0" >详情</a>
									<a ng-show="myTask==undefined" href="./index.php?loadmodel=planDetails&xid={{xid}}&auth_type={{auth_type}}&planId={{plan.pid}}&gid={{plan.gid}}" >详情</a>
									<a ng-show="myTask==undefined"  href="javascript:;" ng-click="removePlan(plan.pid)">删除</a>
								</td>
							</tr>
							<tr ng-show="planListr=='' || planListr== undefined">
								<td colspan="9">暂无计划</td>
							</tr>
						</tbody>
					</table>
				</div>
				<pagination total-items="total || 1" ng-change="changeList(page.page_index)" ng-model="page.page_index" max-size="5"
	                            items-per-page="page.page_rows" class="pagination-sm pull-right"
	                            boundary-links="true"></pagination>
			</div>
		</div>
	<div class="foumu"  ng-show="hides==true" ng-init="hides=false"></div>
	<div class="modal"ng-show="hides==true"  >
		<div class="modal_body">
			<div class="modal_content">
				<div class="modal_contents">
					<div class="modal_title">
						<div class="leftTit"  >新建计划</div>
						<div class="close"   ng-click="reClose($event)"><i class="icon iconfont icon-shachu-xue"></i></div>
					</div>
					<div class="modal_main">
						<form id="timeSocl" class="timeSocl">
							<div class="mout">
								<div>
									<label>计划名称：</label>
									<input type="text" name="is_test" autocomplete="off"  class="maxInput"  ng-model="planName" placeholder="请输入计划名称" >
								</div>
								<div >
									<label>小组：</label>
									<select name="" id="" ng-options="value.gid  as value.name for value in  groupList" ng-model="inits" >
										<option value="">请选择</option>
									</select>
								</div>
								<div>
									<label>选择模板：</label>
									<select name="" id="" ng-options="a.pid  as a.plan_name for a  in  templateList"  ng-model="template" >
										<option value="" >请选择</option>
									</select>
								</div>
								<div>
									<label>备注：</label>
									<textarea name="remark" id="" cols="50" rows="10" placeholder="请输入" ng-model="remark"  ></textarea>
								</div>
								<div class="but">
									<button ng-click="submits()">确定</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
</body>
<script>	
  
</script>
</html>