<!DOCTYPE html>
<html lang="en" ng-app="myWeb" >
<head>
	<meta charset="UTF-8">
	<title>任务管理</title>
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
			         			<select name="" id=""   ng-model="teamFiltrate"  ng-options="o.id as o.name for o in teamList" >
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
						         			<select name="" ng-model="task_statu" >
						         				<option value="">请选择进度</option>
												<option value="10">未开始</option>
												<option value="20">开发中</option>
												<option value="30">待测试</option>
												<option value="40">测试中</option>
												<option value="50">待发布</option>
												<option value="60">已发布</option>
												<option value="70">已完成无需发布</option>
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
								            <input type="text" autocomplete="off" id="J-x3" value="" name="time_start" placeholder="请选择"/><i class="icon iconfont icon-riqi1 iconfontss"></i>
								            <span> 至 </span>
								            <input type="text" autocomplete="off" id="J-xl4" value=""  name="time_end"  placeholder="请选择"/><i class="icon iconfont icon-riqi1 iconfontss"></i>
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
						             <td title="{{teams.task_name}}">{{teams.task_name | cut:true:10:'...'}}</td>
						             <td>{{teams.task_process}}</td>
						             <td>{{teams.consume_days}}</td>
						             <td>{{teams.time_start_schedule}}</td>
						             <td>{{teams.time_end_schedule}}</td>

						             <td>
						             	<span ng-show="teams.time_start=='' && teams.time_start_schedule!='' && teams.time_end_schedule!='' && teams.is_plan!=1 " 
						             	class="notStart"  ng-click="beginTime(teams.mytask_id,teams.handle_type)" >开始</span>
						             	<span ng-show="teams.time_start!=''  && teams.time_start_schedule!='' && teams.time_end_schedule!=''">
						             		{{teams.time_start}}
						             	</span>
						             </td>
						             <td>
						             	<span ng-show="teams.time_end==''&& teams.time_start!=''&& teams.time_start_schedule!='' && teams.time_end_schedule!='' && teams.is_plan!=1 " 
						             	class="notStart" ng-click="end(teams.mytask_id,teams.time_end_schedule,teams.handle_type)" >结束</span>
						             	<span ng-show="teams.time_end!=''&& teams.time_start!=''&& teams.time_start_schedule!='' && teams.time_end_schedule!=''">
						             		{{teams.time_end}}
						             	</span>
						             </td>
						              <td>
						              	<span ng-show="teams.time_release!='' && teams.time_end_schedule!='' ">{{teams.time_release}}</span>
						             	<span ng-show="teams.can_release==0 && teams.time_release=='' && teams.time_end_schedule!='' ">计划{{teams.time_end_schedule}}</span>
						             	<!-- <span ng-show="teams.can_release==1" 
						             	 class="notStart" ng-click="releaseTask(teams.id,teams.handle_type)" >发布</span> -->
						             </td>
						             <td title="{{teams.remark}}">{{teams.remark | cut:true:8:'...'}}</td>
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

	<!-- 组员新建 -->
	<div class="modal"  ng-show="hides"  >
		<div class="modal_body" style="z-index:10000">
			<div class="modal_content">
				<div class="modal_contents">
					<!-- <div class="modal_title task_title">
						<div class="leftTit">新建任务</div>
						<div class="close"   ng-click="reClose($event)"><i class="icon iconfont icon-shachu-xue"></i></div>
					</div>
					<div class="modal_main addtask">
						<form  class="timeSocl" name="Informations" novalidate >
							<div class="mout newTask">
								<div >
									<label>所属项目：</label>
									<span class="radio_right">
										<span >
										<label style="text-align:left;"  ng-repeat="project in systemTypeList"><input type="radio"  name="is_k" ng-click="systemShow(project.project_id)"  
										 >{{project.project_name}}</label>
										</span>
										<span class="errorInfo" ng-show="pro" >所属项目不能为空</span>
									</span>
									
								</div>
								<div >
									<label>任务名称：</label>
									<input type="text" class="maxInput" autocomplete="off" name="task_name" required="required" ng-blur="chan=true"  placeholder="任务名称" ng-model="editForm.task_name" >
									<span class="errorInfo" ng-show="Informations.task_name.$error.required && chan ">任务名称不能为空</span> 
								</div>
								<div >
									<label>审批编号：</label>
									<input type="text" class="maxInput" autocomplete="off" name="approvals" required="required" ng-blur="change=true"  placeholder="审批编号" ng-model="editForm.approve_num" >
									<span class="errorInfo" ng-show="Informations.approvals.$error.required && change ">审批编号不能为空</span> 
								</div>
								<div >
									<label>任务类型：</label>
									<select  required name="taskType" id=""  ng-model="editForm.task_type"  ng-blur="task=true" ng-selected="fixForm.task_type"   ng-options="value.id as value.name for value in taskTypeList" >
										<option value="">请选择</option>
									</select>
									<span class="errorInfo" ng-show="Informations.taskType.$error.required && task">请选择任务类型</span> 
								</div>
								<div >
									<label>优先级：</label>
									<select id="" required ng-model="editForm.priority" ng-selected="editForm.priority" ng-blur="cg=true" name="priorityr" >
										<option value="">请选择</option>
										<option value="1">正常</option>
										<option value="2">紧急</option>
									</select>
									<span class="errorInfo" ng-show="Informations.priorityr.$error.required && cg">请选择任务类型</span> 
								</div>
								<div >
									<label>耗时(天)：</label>
									<input type="number" placeholder="请输入" required  ng-model="editForm.task_days" name="timess" ng-blur="timess=true">
									<span class="errorInfo" ng-show="Informations.timess.$error.required &&timess">耗时天数不能为空</span> 
								</div>
								<div >
									<label>审批时间：</label>
									<span class="timeSel">
								            <input type="text" autocomplete="off" id="J-x6" value="" required  name="s" ng-blur="s=true" ng-model="editForm.time_approve"  placeholder="请选择"/  ><i class="icon iconfont icon-riqi1 iconfontss"></i>
					         		</span>
					         		<span class="errorInfo" ng-show="Informations.s.$error.required && s">审批时间不能为空</span> 
								</div>
								<div>
									<label>需求人：</label>
									<input type="text" autocomplete="off" placeholder="请输入" required ng-model="editForm.applicant" ng-blur="applicantrr=true"  name="applicantr" >
									<span class="errorInfo" ng-show="Informations.applicantr.$error.required && applicantrr">需求人不能为空</span> 
								</div>
								<div >
									<label>备注：</label>
									<textarea name="remark" required cols="70" rows="7" placeholder="请输入" ng-blur="remarko=true"  ng-model="editForm.remark" ></textarea>
									<p class="errorInfo" style="margin-left:90px;" ng-show="Informations.remark.$error.required && remarko">备注不能为空</p>
								</div>
								<div>
									<label>参与人员：</label>
									<span ng-repeat="add in  addStaff"  ng-show="staff==false" >{{add.user_name}}
										<font ng-show="!$last">、</font>
									</span>
									<span class="add"><a href="javascript:;" ng-click="addParticipant(1)" >添加</a></span>
									<p><span style="margin-left:90px;"  class="errorInfo" ng-show="developerd && selecteds==''">未添加需求人</span> </p>
								</div>
								<div>
									<label>系统：</label>
									<span class="radio_right">
										<span class="radio_right">
											<span ng-repeat="system in systemTypeList" >
												<span  ng-repeat="sys in system.sys_list" ng-show="systemr==system.project_id">
													<span >
												<label tyle="text-align:left;" >
													<input type="checkbox"  value="{{sys.sid}}"  
													ng-click="adChecked($event,sys.sid)"  ng-checked="isSelected(sys.sid)"  name="system" />{{sys.system_name}}
												</label>
												</span>
												</span>
											</span>
											<span class="errorInfo" ng-show="systems">系统选项未选</span>
										</span>
								</div>
								<div>
									<label>计划详情：</label>
									<span class="radio_right">
										<label style="text-align:left;" >
											<input type="radio" name="is_r"  ng-click="editForm.is_plan=1;is_plans=false" >需要
										</label>
										<label style="text-align:left;" >
											<input type="radio" name="is_r"   ng-click="editForm.is_plan='0';is_plans=false" >不需要
										</label>
										<span  class="errorInfo"  ng-show="is_plans">未选择计划</span>
									</span>
								</div>
							</div>
							<div class="but">
								<button ng-click="editGroupTask()">确定</button>
							</div>
						</form>
					</div>	 -->
				</div>
			</div>
		</div>
	</div>
	<div class="modal" ng-show="addUser" >
		<div class="modal_body">
			<div class="modal_content">
				<div class="modal_contents">
					<div class="modal_title">
						<div class="leftTit">添加参与人员</div>
						<div class="close"   ng-click="reCloser($event)"><i class="icon iconfont icon-shachu-xue"></i></div>
					</div>
					<div class="modal_main addParticipant">
						<form  class="timeSocl ">
							<div class="mout userList">
								
								<div ng-repeat="user in addUserLIsts"   >
									<h4>{{user.group_name}}</h4>
										<label  ng-repeat="us in user.group_member" style="padding: 0 25px;">
											<input type="checkbox"  ng-model="not" vlaue="{{us.uid}}" class="groupUser"  name="{{us.user_name}}" ng-click="so($event,us.uid,us)" ng-checked="isSelecteds(us.uid)" >{{us.user_name}}
										</label>
								</div>
								
							</div>
							
							<div class="but">
								<button ng-click="addParticipant()" >确定</button>
							</div>
						</form>
					</div>	
				</div>
			</div>
		</div>
	</div>
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
            // laydate({
            //     elem: '#J-x6',
            //     choose: function (dates) {
            //     var appElement = document.querySelector('[ng-controller=teamTask]'),
            //     $scope = angular.element(appElement).scope();
            //         var ends = $("#J-xl4").val(),
            //             startTime = new Date(dates);
            //              setTimeout(function(){
            //              	$scope.$apply(function(){
            //              		$scope.editForm.time_approve=dates;
            //              	})
            //              },50)
            //         if (ends != "" && ends != undefined) {
            //             endTime = new Date(ends);
            //             if (Date.parse(startTime) > Date.parse(endTime)) {
                        	
            //                 $.alerts({
            //                     msg: "结束时间必须大于开始时间"
            //                 });
            //                 $(".timeSel input[type=text]").val("");
            //             }
            //         }
            //     }
            // });
    })
	

</script>
</html>