<!DOCTYPE html>
<html lang="en" ng-app="myWeb" >
<head>
	<meta charset="UTF-8">
	<META HTTP-EQUIV="pragma" CONTENT="no-cache">
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate">
	<META HTTP-EQUIV="expires" CONTENT="0">
	<title>中国联保研发任务管理平台</title>
	<?php include $tpl_path."common/head.php"; ?>
	<script src="./js/teamTask.js<?php echo $js_v; ?>" type="text/javascript" charset="utf-8"></script>
</head>
<body id="3" > 
	<div class="tops">
		<!-- <?php include $tpl_path."common/header.php"; ?> -->
	<div  ng-include="'index.php?loadmodel=header'"></div>
	</div>
	<div ng-controller="teamTask" ng-cloak class="teamTask module">
		<div class="">
			<div class="promptNav">
				<a  href="Javascript:;" >组员任务</a>
				<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
				<span >{{projcetUrl.nameCode}}</span>
			</div> 
			<div class="backgrounds"></div>
			<div class="content">
				 <div class="wrap">
			       <ul class="blist clearfix" >
			         <li ng-repeat="sys in systemTypeList" dat-stute="{{sys.project_id}}" ng-click="projectType($event)" >{{sys.project_name}}</li>
			       </ul>
			       <ul class="blsit-list"> 
			         <li>
			         	<form  id="taskList" >
				         	<div>
				         		<dl>
				         			<dd>
				         				<label>组员筛选：</label>
			         			<select name="" id=""   ng-model="teamFiltrate"  ng-options="o.id as o.name for o in teamList" ng-change="queryTask()"  >
			         				<option value="">请选择组员</option>
			         			</select>
				         			</dd>
					         		<dd>
						         		时间类型：<label >
						         		<input type="radio" name="taskTime" value="1"  >
						         		<span>计划开始时间</span>
						         		</label>
					         		</dd>
					         		<dd><label >
					         			<input type="radio" name="taskTime" value="2" >
					         			<span>计划完成时间</span>
										</label>
					         		</dd>
					         		<dd>
					         			<label >
					         			<input type="radio" name="taskTime" value="3" >
					         			<span>实际开始时间</span>
					         			</label>
					         		</dd>
					         		<dd>
					         			<label >
					         			<input type="radio" name="taskTime" value="4" >
					         			<span>实际结束时间</span>
					         			</label>
					         		</dd>
					         		<dd>
					         			<label >
					         			<input type="radio" name="taskTime" value="5" >
					         			<span>发布时间</span>
					         			</label>
					         		</dd>
					         		<dd>
					         			<div class="sogin">
						         			<label > &nbsp;&nbsp;&nbsp;进度：</label>
						         			<select name="" ng-model="task_statu"   ng-options="o.id as o.name for o in schedule">
						         				<option value="" >请选择进度</option>
						         			</select>
					         			</div>
					         		</dd>
				         		</dl>
				         	</div>
				         	<div>
				         		<dl>
					         		<dd>
						         		时间筛选：<label >
						         		<input type="radio" name="state" value="1" ng-click="thisWeek()">
						         		<span>本周</span>
						         		</label>
					         		</dd>
					         		<dd>
					         			<label >
					         			<input type="radio" name="state" value="2" ng-click="thisMonth()" >
					         			<span>本月</span>
					         			</label>
					         		</dd>
					         		<dd>
					         			<label >
					         			<input type="radio" name="state" value="" ng-click="ckNull()" ng-checked="alls">
					         			<span>清空</span>
					         			</label>
					         		</dd>
					         		<dd>
					         			<p class="timeSel">
								            <input type="text" autocomplete="off" id="J-x3" readonly="readonly" value="" name="time_start" placeholder="请选择"/><i class="icon iconfont icon-riqi1 iconfontss"></i>
								            <span> 至 </span>
								            <input type="text" autocomplete="off" id="J-xl4" readonly="readonly" value=""  name="time_end"  placeholder="请选择"/><i class="icon iconfont icon-riqi1 iconfontss"></i>
					         			</p>
					         		</dd>
					         		<dd>
					         			<div class="sogin">
					         				<label >搜索：</label>
					         				<input type="text" value="" placeholder="搜索..." autocomplete="off" ng-model="taskSearch">
					         				&nbsp;&nbsp;&nbsp;<button ng-click="search()" >查找</button>
					         				<button ng-click="getGroupTaskData()"  >导出</button>
					         				<!-- <button ng-click="getGroupTaskData()" ng-class="{true:'butDisabled',false:''}[teamsTaskList=='']" >导出</button> -->
					         				<!-- <button ng-click="editTask($event)">新建任务</button> -->
					         			</div>
					         		</dd>
				         		</dl>
				         		</div>
				         	<div class="bommit">
				         		<table width="100%" class="table">  
						        <thead>  
						            <tr>  
						                <th>编号</th>  
						                <th>优先级</th>
						                <th>审批时间</th>
						                <th>需求人</th>
						                <th>审批编号</th>
						                <th>类型</th>
						                <th>任务名称</th>
						                <th>进度</th>
						                <th>耗时(天)</th>
						                <th>计划开始时间</th>
						                <th>计划完成时间</th>
						                <th>实际开始时间</th>
						                <th>实际完成时间</th>
						                <th>发布时间</th>
						                <th>备注</th>
						                <th>参与人</th>
						                <th>操作</th>
						            </tr>  
						        </thead>  
						        <tr ng-hide="teamsTaskList=='' || blsit " ng-repeat="teams in teamsTaskList" >
						        	 <td>{{teams.num}}</td>  
						             <td>{{teams.priority}}
						             </td>
						             <td>{{teams.time_receive}}</td>
						             <td>{{teams.applicant}}</td>
						             <td>
						             	 {{teams.approve_no}}
						             </td>
						             <td>{{teams.task_type}}</td>
						             <td title="{{teams.task_name}}">{{teams.task_name | cut:false:10:'...'}}</td>
						             <td>{{teams.task_process}}</td>
						             <td>{{teams.consume_days}}</td>
						             <td>{{teams.time_start_schedule}}</td>
						             <td>{{teams.time_end_schedule}}</td>

						             <td>
						             	<!-- <span 
						             	class="notStart"  ng-click="beginTime(teams.mytask_id,teams.handle_type)" >开始</span> -->
						             	<span ng-show="teams.time_start=='' && teams.time_start_schedule!='' && teams.time_end_schedule!='' && teams.is_plan!=1 " 
						             	class="notStart"  ng-click="beginTime(teams.mytask_id,teams.handle_type)" >开始</span>
						             	<span ng-show="teams.time_start!=''  && teams.time_start_schedule!='' && teams.time_end_schedule!=''">
						             		{{teams.time_start}}
						             	</span>
						             </td>
						             <td>
						             	<span ng-show="teams.time_end==''&& teams.time_start!=''&& teams.time_start_schedule!='' && teams.time_end_schedule!='' && teams.is_plan!=1 " 
						             	class="notStart" ng-click="end(teams.mytask_id,teams.time_end_schedule,teams.handle_type,teams.is_test_dev)" >结束</span>
						             	<span ng-show="teams.time_end!=''&& teams.time_start!=''&& teams.time_start_schedule!='' && teams.time_end_schedule!=''">
						             		{{teams.time_end}}
						             	</span>
						             </td>
						              <td>
						              	<span ng-show="teams.time_release!='' && teams.time_end_schedule!='' ">{{teams.time_release}}</span>
						             	<span ng-show="teams.can_release==0 && teams.time_release=='' && teams.time_end_schedule!='' && teams.is_released.length<7 ">计划{{teams.time_end_schedule}}</span>
						             	<span ng-show="teams.time_release=='' && teams.is_released==0 && teams.task_process.length==7"></span>
						             	<!-- <span ng-show="teams.can_release==1" 
						             	 class="notStart" ng-click="releaseTask(teams.id,teams.handle_type)" >发布</span> -->
						             </td>
						             <td title="{{teams.remark}}">{{teams.remark | cut:false:8:'...'}}</td>
						             <td>
						             	<p ng-repeat="(k,v) in teams.developer track by $index" ng-mouseenter="getDeveloper($event,teams.developer)">
						             		<span ng-show="k<2" >{{v.name}}<font ng-show="k<1&& !$last">、</font><font ng-show="k==1">...</font></span>
						             	</p>
						             </td>
						             <td>
										<span>
										<span  class="span"  ng-show="teams.is_plan!=undefined && teams.is_plan==0 " >计划</span>
						             	<a  ng-show="teams.is_plan!=undefined && teams.is_plan==1" href="./index.php?loadmodel=myMissionPlan&xid={{teams.id}}&auth_type=4">计划</a>
										</span>
						             	<a  href="./index.php?loadmodel=taskDetails&xid={{teams.id}}&auth_type=4">详情</a>
						             	<!-- <a href="javascript:;" ng-click="removeMyAk(teams.id,teams.is_plan)" >删除</a> -->
						             </td> 
						        </tr>  
						         <tr ng-show="teamsTaskList==''||teamsTaskList==undefined">
						        	<td colspan="17">暂无任务</td>
						        </tr>
						    </table>
						    <pagination total-items="total || 1" ng-change="changeList(page.page_index)" ng-model="page.page_index" max-size="5"
	                            items-per-page="page.page_rows" class="pagination-sm pull-right"
	                            boundary-links="true"></pagination>
				         	</div>
			         	</form>
			         </li>
			         <!-- <li>B</li>-->
			       </ul>
			    </div>
			</div>
		</div>
	<div class="foumu"  ng-show="hides || finishTime" ng-init="hides=false"></div>
	<!-- 实际完成时间 -->
	<task-completion-time></task-completion-time>
	<!-- 发布任务 -->
	<modal-ms></modal-ms>
	</div>
</body>
<script>	
   $(function(){
       $(".blist").on("click","li",function(){
         // 设index为当前点击
         var index = $(this).index();
         // 点击添加样式利用siblings清除其他兄弟节点样式
         $(this).addClass("activer").siblings().removeClass("activer");
         // 同理显示与隐藏
         $(this).parents(".wrap").find(".blsit-list>li").eq(index).show().siblings().hide();
       })
       laydate({
                elem: '#J-x3',
                choose: function (dates) {
                	$("input[name=state]").attr("checked",false);
                    var ends = $("#J-xl4").val(),
                        startTime = new Date(dates);
                    if (ends != "" && ends != undefined) {
                        endTime = new Date(ends);
                        if (Date.parse(startTime) > Date.parse(endTime)) {
                        	
                            $.alerts({
                                msg: "结束时间必须大于开始时间"
                            });
                            $(".timeSel input[type=text]").val("");
                        }
                    }
                }
            });
            laydate({
                elem: '#J-xl4',
                choose: function (dates) {
                	$("input[name=state]").attr("checked",false);
                    var starts = $("#J-x3").val(),
                        endTime = new Date(dates);
                    if (starts != "" && starts != undefined) {
                        startTime = new Date(starts);
                        if (Date.parse(startTime) > Date.parse(endTime)) {
                        	
                            $.alerts({
                                msg: "结束时间必须大于开始时间"
                            });
                            $(".timeSel input[type=text]").val("");
                        }
                    }
                }
            });
    })
	

</script>
</html>