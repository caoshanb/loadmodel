<!DOCTYPE html>
<html lang="en" ng-app="myWeb" >
<head>
	<meta charset="UTF-8">
	<META HTTP-EQUIV="pragma" CONTENT="no-cache">
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate">
	<META HTTP-EQUIV="expires" CONTENT="0">
	<title>中国联保研发任务管理平台</title>
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
				<span>{{urlr.text}}</span>
				<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>	
				<a href="index.php?loadmodel={{urlr.url}}&projcet={{projcetUrl.zid}}"  >{{projcetUrl.nameCode}}</a>
				<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
				<span>计划</span>
			</div>
			<div class="backgrounds"></div>
			<div class="planContent">
				<div class="but">
					<button  ng-class="{true:'butDisabled',false:''}[myTask!=undefined ||taskInfo.can_change==2 || taskInfo.can_change==3 ]"  
					 ng-disabled="myTask!=undefined || taskInfo.can_change==2 || taskInfo.can_change==3" ng-click="end()">新建计划</button>
				</div>
				<div>
					<table>
						<thead>
							<tr>
								<th>编号</th>
								<th width="23%">计划名称</th>
								<th>小组</th>
								<th width="13%">备注</th>
								<th>计划人</th>
								<th>计划时间</th>
								<th>开始时间</th>
								<th>完成时间</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
							<tr ng-repeat="plan in planListr" ng-show="planListr!='' || planListr!= undefined" >
								<td ng-class="{true:'selectTime',false:''}[plan.is_mine==1 && myTask!=undefined]" >{{plan.num}}</td>
								<td ng-class="{true:'selectTime',false:''}[plan.is_mine==1 && myTask!=undefined]"   >
									<p class="remarkLength" >{{plan.plan_name }}</p></td>
								<td ng-class="{true:'selectTime',false:''}[plan.is_mine==1 && myTask!=undefined]"  >{{plan.group}}</td>
								<td ng-class="{true:'selectTime',false:''}[plan.is_mine==1 && myTask!=undefined]"  title="{{plan.remark}}"> <span class="remarkLength">{{plan.remark}}</span></td>
								<td ng-class="{true:'selectTime',false:''}[plan.is_mine==1 && myTask!=undefined]"  >{{plan.plan_initiator}}</td>
								<td ng-class="{true:'selectTime',false:''}[plan.is_mine==1 && myTask!=undefined]"  >{{plan.ptime_create}}</td>
								<td ng-class="{true:'selectTime',false:''}[plan.is_mine==1 && myTask!=undefined]"  >{{plan.ptime_start}}</td>
								<td ng-class="{true:'selectTime',false:''}[plan.is_mine==1 && myTask!=undefined]"  >{{plan.ptime_end}}</td>
								<td >
									<a ng-show="myTask!=undefined"
									 href="./index.php?loadmodel=planDetails&xid={{xid}}&auth_type={{auth_type}}&planId={{plan.pid}}&gid={{plan.gid}}&myTask=0" >详情</a>
									<a ng-show="myTask==undefined"
									 href="./index.php?loadmodel=planDetails&xid={{xid}}&auth_type={{auth_type}}&planId={{plan.pid}}&gid={{plan.gid}}" >详情</a>
									 <span ng-show="myTask==undefined">
									<a ng-show="((myTask==undefined && auth_type==2) ||(auth_type!=2 && auth_type!=1 && plan.is_mygroup==1 ) || auth_type==1 ) && taskInfo.can_change==1" 
									 href="javascript:;" ng-click="removePlan(plan.pid)">删除</a>
									<span ng-show="(((myTask!=undefined && auth_type==2) || (auth_type!=2 && auth_type!=1  && (plan.is_mygroup!=1 || plan.is_mygroup==1 )) 
									|| auth_type==1 ) &&  taskInfo.can_change!=1) || (auth_type!=2 && auth_type!=1  && plan.is_mygroup!=1  && taskInfo.can_change==1)"
									 href="javascript:;" style="color:#999;padding-right: 8px;" >删除</span>
									 </span>
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
									<select name="" id="" ng-show="groupList.length>0" ng ng-options="value.group_id  as value.group_name for value in  groupList" 
									 ng-model="inits" ng-change="getTemplate()" >
										<option value="">请选择</option>
									</select>
									<span ng-if="groupList.length<1">暂无可选小组</span>
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
									<button ng-click="submits()"  >确定</button>
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