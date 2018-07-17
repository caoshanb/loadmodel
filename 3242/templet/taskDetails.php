<!DOCTYPE html>
<html lang="en" ng-app="myWeb" >
<head>
	<meta charset="UTF-8">
	<title>任务管理</title>
	<?php include $tpl_path."common/head.php"; ?>
	<script src="./js/taskDetails.js<?php echo $js_v; ?>" type="text/javascript" charset="utf-8"></script>
</head>
<body id="" >      
	<div class="tops">
		<!-- <?php include $tpl_path."common/header.php"; ?> -->
	<div  ng-include="'index.php?loadmodel=header'"></div>
	</div>
	<div ng-controller="taskDetails" ng-cloak class="taskDetails module">
		<div class="">
			<div class="promptNav">
				<a href="./index.php?loadmodel={{urlr.url}}">{{urlr.text}}</a>
				<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
				<a  href="./index.php?loadmodel={{urlr.url}}&dat={{projcetUrl.zid}}"  >{{projcetUrl.nameCode}}</a>
				<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
				<span>详情</span>
			</div>
			<div class="backgrounds"></div>
			<div class="taskModel">
				<div class="but"> 
					基本信息
				</div>
				<div class="taskInfo" >
					<ul>
						<li >
							<p><label>所属项目：</label>
								{{taskInfo.project_type.name}}
							</p>
							<p class="ctL"><label class="ctLabel">系统：</label>
								<span class="ctStyle" style="display:inline-block;">
								<button ng-repeat="task in taskInfo.sys_type"  ng-show="task.name!=''" >{{task.name}} </button>
								</span>
								
							</p>
							<p><label>详情计划：</label>
								<span>{{taskInfo.is_plan}}</span>
							</p>
							<div class="borderStyle"></div>
						</li>
						<li>
							<p><label>审批编号：</label>{{taskInfo.approve_no}}</p>
							<p><label>任务名称：</label>{{taskInfo.task_name}}</p>
							<p><label>类型：</label>
								<span>{{taskInfo.task_type}}</span>
							</p>
							<div class="borderStyle"></div>
						</li>
						<li>
							<p><label>优先级：</label>
								<span>{{taskInfo.priority}}</span>
							</p>
							<p><label>审批时间：</label>{{taskInfo.time_approve}}</p>
							<p><label>需求人：</label>{{taskInfo.applicant}}</p>
							<div class="borderStyle"></div>
						</li>
						<li>
							<p><label>耗时(天)：</label>{{taskInfo.consume_days}}</p>
							<p><label>进度：</label>
								<span >{{taskInfo.task_process}}</span>
							</p>

							<p><label>备注：</label>{{taskInfo.remark }}</p>
						</li>
					</ul>
				</div>
				<div class="edit">
					<button   ng-class="{true:'butDisabled',false:''}[myTask!=undefined ]" 
					 ng-disabled="myTask!=undefined"  ng-click="fixAlertShow(taskInfo.id)">编辑</button>
				</div>
			</div>
			<div class="backgrounds"></div>
			<div class="planContent">
				<div class="but">
					进度情况
					<button class="right" ng-class="{true:'butDisabled',false:''}[ myTask!=undefined || (myTask==undefined && is_plan==1 ) ]"
					  ng-disabled="myTask!=undefined || (myTask==undefined && is_plan==1 ) " ng-click="editDevelope()" >添加参与人</button>
				</div>
				<div>
					<table>
						<thead>
							<tr>
								<th>阶段</th>
								<th>进度</th>
								<th>计划开始时间</th>
								<th>计划结束时间</th>
								<th>实际开始时间</th>
								<th>实际完成时间</th>
								<th>备注</th>
								<th>参与人</th>
							
							</tr>
						</thead>
						<tbody>
							<tr ng-if="is_plan==0" ng-repeat="process in processList" ng-show="processList!='' || processList!= undefined">
								<td title="{{process.step}}" >{{process.step }}</td>
								<td>
									<span>{{process.process}}</span>
								</td>
								<td>
									<p ng-show="process.can_release==undefined">
									
										<span  ng-show="(myTask==undefined ) || (myTask!=undefined && process.is_mine==1)" >
											<span ng-show="process.time_start_schedule==''" ><a href="javascript:;" ng-click="setTime(process.id,1,process.handle_type)" >请设置</a></span>
											<a href="javascript:;" ng-show="process.time_start_schedule!=''" ng-click="fixTimes(process.id,10,process.handle_type)">{{process.time_start_schedule}}</a>
										</span>
										<span ng-show="myTask!=undefined && process.is_mine==0">
											{{process.time_start_schedule}}
										</span>
									</p>
									<p ng-show="process.can_release!=undefined">-</p>
								</td>
								<td>
									<p ng-show="process.can_release==undefined">
											<span ng-show="(myTask==undefined) || (myTask!=undefined && process.is_mine==1)" >
												<span ng-show="process.time_end_schedule==''" ><a href="javascript:;" ng-click="setTime(process.id,2,process.handle_type)" >请设置</a></span>
											<a href="javascript:;" ng-show="process.time_end_schedule!=''" ng-click="fixTimes(process.id,11,process.handle_type)" >{{process.time_end_schedule}}</a>
										</span>
										<span ng-show="myTask!=undefined && process.is_mine==0">
											{{process.time_end_schedule}}
										</span>
									</p>
									<p ng-show="process.can_release!=undefined ">
										<span ng-show=" process.is_released==1">{{process.time_end_schedule}}</span>
										<span ng-show="process.time_end_schedule==''" ><a href="javascript:;" ng-click="setTime(process.id,21,20)" >请设置</a></span>
										<a href="javascript:;" ng-show="process.time_end_schedule!='' && process.is_released!=1" ng-click="fixTimes(process.id,22,20)" >{{process.time_end_schedule}}</a>
									</p>
									
								</td>
								<td>
									<p ng-show="process.can_release==undefined">
										<span ng-show="(myTask==undefined) || (myTask!=undefined && process.is_mine==1)" >
											<span ng-show="process.time_end_schedule!='' && process.time_start_schedule!='' && process.time_start==''" 
											class="notStart"  ng-click="beginTime(process.id,process.handle_type)" >开始</span>
								            <span ng-show="process.time_end_schedule!='' && process.time_start_schedule!='' &&process.time_start!=''" ><a href="javascript:;" ng-click="fixTimes(process.id,8,process.handle_type)">{{process.time_start}}</a></span>
										</span>
										<span  ng-show="myTask!=undefined && process.is_mine==0">
											{{process.time_start}}
										</span>
									</p>
									<p ng-show="process.can_release!=undefined">-</p>
								</td>
								<td>
									<p ng-show="process.can_release==undefined">
										<span ng-show="(myTask==undefined) || (myTask!=undefined && process.is_mine==1)" >
											<span ng-show=" process.time_end_schedule!='' && process.time_start_schedule!='' &&process.time_end==''&& process.time_start!=''" class="notStart" ng-click="end(process.id,process.time_end_schedule,process.handle_type)" >结束</span>
								            <span ng-show="process.time_end_schedule!='' && process.time_start_schedule!='' &&   process.time_end!='' &&process.time_start!=''"><a href="javascript:;" ng-click="fixTimes(process.id,9,process.handle_type)">{{process.time_end}}</a></span>
										</span>
										<span  ng-show="myTask!=undefined && process.is_mine==0">
											{{process.time_end}}
										</span>
									</p>
									<p ng-show="process.can_release!=undefined">
										
											<span ng-show=" process.can_release==0 && process.time_end=='' " class="notStart" style="background:#888787"  >发布</span>
											<span ng-show=" process.can_release==1 && process.time_end=='' " class="notStart" ng-click="releaseTask(1)" >发布</span>
								            <span ng-show=" process.time_end!='' ">{{process.time_end}}</span>
									</p>
								</td>
								<td title="{{process.remark}}" >
									<span ng-show="(myTask==undefined) || (myTask!=undefined && process.is_mine==1)">
										<a href="javascript:;" ng-click="subFixRemark(process.id,process.remark,process.handle_type)" >{{process.remark | cut:true:8:'...'}}</a>
									</span>
									<span  ng-show="myTask!=undefined && process.is_mine==0">
										{{process.remark | cut:true:8:'...'}}
									</span>
								</td>
								<td>
									<span ng-show="(myTask==undefined) || (myTask!=undefined && process.is_mine==1)">
										<a href="javascript:;"  ng-repeat="devs in process.developer "  ng-click="replaceStaff(process.id,devs.user_name,devs.id,process.handle_type,devs)" >
											{{devs.user_name}}
										</a>
									</span>
									<span ng-show="myTask!=undefined && process.is_mine==0">
										<span  ng-repeat="dev in process.developer "   >
											{{dev.user_name}}
										</span>
									</span>
								</td>
							</tr>
							<tr ng-if="is_plan==1" ng-repeat="process in processList" ng-show="processList!='' || processList!= undefined">
								<td title="{{process.step}}" >{{process.step }}</td>
								<td>
									<span>{{process.process}}</span>
								</td>
								<td>
									<p ng-show="process.can_release==undefined">{{process.time_start_schedule}}</p>
									<p ng-show="process.can_release!=undefined">-</p>
								</td>
								<td>
									<span ng-show="process.can_release!=undefined">
										<span ng-show="process.is_released==1">{{process.time_end_schedule}}</span>
										<span ng-show="process.is_released==1&& process.time_end_schedule==''">-</span>
										<span ng-show="process.time_end_schedule=='' && process.is_released!=1 " ><a href="javascript:;" ng-click="setTime(process.id,21,20)" >请设置</a></span>
										<a href="javascript:;" ng-show="process.time_end_schedule!=''&& process.is_released!=1" ng-click="fixTimes(process.id,22,20)" >{{process.time_end_schedule}}</a>
									</span>
									<span ng-show="process.can_release==undefined">
										{{process.time_end_schedule}}
									</span>
								</td>
								<td>
									
									<p ng-show="process.can_release==undefined">
										<span ng-show="process.time_end_schedule!='' && process.time_start_schedule!='' &&process.time_start!=''" >
										{{process.time_start}}
										</span>
									</p>
									<p ng-show="process.can_release!=undefined">-</p>
								</td>
								<td>
									<span ng-show="process.can_release==0 && process.time_end=='' " class="notStart" style="background:#888787"  >发布</span>
									<span ng-show="process.can_release==1 && process.time_end=='' " class="notStart" ng-click="releaseTask(1)" >发布</span>
									<span ng-show="process.time_end!=''">{{process.time_end}}</span>
								</td>
								<td title="{{process.remark}}" >
									{{process.remark | cut:true:8:'...'}}
								</td>
								<td>
									<span>
										<span  ng-repeat="dev in process.developer "   >
											{{dev.user_name}}
										</span>
									</span>
								
								</td>
								<!-- <td>
									<a ng-show="myTask!=undefined" href="./index.php?loadmodel=planDetails&xid={{xid}}&auth_type={{auth_type}}&planId={{process.id}}&myTask=0">设置</a>
									<a ng-show="myTask==undefined" href="./index.php?loadmodel=planDetails&xid={{xid}}&auth_type={{auth_type}}&planId={{process.id}}">设置</a>
								</td> -->
							</tr>
							<tr ng-show="processList=='' || processList== undefined">
								<td  colspan="9">暂无进度</td>
								
							</tr>
						</tbody>
					</table>
				</div>

				<pagination total-items="total || 1" ng-change="changeList(page.page_index)" ng-model="page.page_index" max-size="5"
	                            items-per-page="page.page_rows" class="pagination-sm pull-right"
	                            boundary-links="true"></pagination>
			</div>
			<div class="backgrounds"></div>
			<div class="amendHistory">
				<div class="but">
					修改历史
					
				</div>
				<table>
					<thead>
						<tr>
							<th>编号</th>
							<th>修改时间</th>
							<th>修改前</th>
							<th>修改后</th>
							<th>修改原因</th>
							<th>修改人</th>
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
				<div class="more">
						<a  ng-show="myTask!=undefined" href="./index.php?loadmodel=taskAmend&xid={{xid}}&auth_type={{auth_type}}&is_plan={{is_plan}}&myTask=0">
							<button  ng-show="fixOringList!=undefined && fixOringList!='' && fixOringList.length==2 "  >查看更多</button></a>
						<a  ng-show="myTask==undefined" href="./index.php?loadmodel=taskAmend&xid={{xid}}&auth_type={{auth_type}}">
							<button  ng-show="fixOringList!=undefined && fixOringList!='' && fixOringList.length==2 "  >查看更多</button></a>
				</div>
			</div>
		</div>
	<div class="foumu"  ng-show="hides || solo||setActualTime ||fixRemarkShow || replaceCo || fixInfo ||edit==1 ||shows || rele" ng-init="hides=false"></div>
	<div class="modal"  ng-show="shows==true"  >
		<div class="modal_body">
			<div class="modal_content">
				<div class="modal_contents">
					<div class="modal_title">
						<div class="leftTit"  >
							<span ng-show="fixType==22">修改计划发布时间</span>
							<span ng-show="fixType==10">修改计划开始时间</span>
							<span ng-show="fixType==11">修改计划结束时间</span>
							<span ng-show="fixType==8">修改实际开始时间</span>
							<span ng-show="fixType==9">修改实际结束时间</span>
							<span ng-show="fixr==1">设置计划开始时间</span>
							<span ng-show="fixr==2">设置计划结束时间</span>
							<span ng-show="fixr==21">设置计划发布时间</span>
						</div>
						<div class="close"   ng-click="reClose($event)"><i class="icon iconfont icon-shachu-xue"></i></div>
					</div>
					<div class="modal_main">
						<form  class="timeSocl">
							<div class="mout">
								<div class="timeSel">
									<label>计划时间：</label>
									<input type="text"  id="J-x3"  autocomplete="off" name="time_start" ng-model="planTime" placeholder="请选择"/><i class="icon iconfont icon-riqi1 iconfontss"></i>
								</div>
								<div ng-show="fixType!=''">
									<label>修改原因：</label>
									<textarea name="remark" id="" cols="50" rows="10" placeholder="请输入" ng-model="fixRemark"  ></textarea>
								</div>
								<div class="but">
									<button ng-click="submitFix()" ng-show="fixType!=''">确定</button>
									<button ng-click="setTime()" ng-show="fixType==''" >确定</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="modal" ng-show="setActualTime==true" >
		<div class="modal_body">
			<div class="modal_content">
				<div class="modal_contents">
					<div class="modal_title">
						<div class="leftTit">
							<span ng-show="actualTime==2" >实际完成时间</span>
						</div>
						<div class="close"   ng-click="reClose($event)"><i class="icon iconfont icon-shachu-xue"></i></div>
					</div>
					<div class="modal_main">
						<form  class="timeSocl">
							<div class="mout"  ng-if="setTextaera"  >
								<label>备注：</label>
								<textarea name="remark" id="" cols="50" rows="10" placeholder="请输入" ng-model="$parent.textarea" ></textarea>
							</div>
								<div>
									<span>是否需要测试：</span>
									<label>
									<input type="radio" name="is_test" value="1" ng-checked="notcheck" ng-click="code=false" ng-init="code=false" ><span>是</span>
									</label>
									<label>
									<input type="radio" name="is_test" value="0" ng-checked="notcheck" ng-click="code=true" ><span>否</span>
									</label>
								</div>
								<div ng-if="code" >
									<span>是否需要发布：</span>
									<label>
									<input type="radio" name="is_release" ng-checked="notcheck" value="1" ><span>是</span>
									</label>
									<label>
									<input type="radio" name="is_release"  ng-checked="notcheck" value="0" ><span>否</span>
									</label>
								</div>
							<div class="but">
								<button ng-click="end()">确定</button>

							</div>
						</form>
					</div>	
				</div>
			</div>
		</div>
	</div>
	<div class="modal" style="display:block" ng-show="fixRemarkShow" >
		<div class="modal_body">
			<div class="modal_content">
				<div class="modal_contents">
					<div class="modal_title">
						<div class="leftTit">修改备注</div>
						<div class="close"   ng-click="reClose($event)"><i class="icon iconfont icon-shachu-xue"></i></div>
					</div>
					<div class="modal_main">
						<form  class="timeSocl">
							<div class="mout" >
								<label>备注：</label>
								<textarea name="remark" id="" cols="50" rows="10" placeholder="请输入" ng-model="editRemark" ></textarea>
							</div>
							<div class="but">
								<button ng-click="subFixRemark()">确定</button>
							</div>
						</form>
					</div>	
				</div>
			</div>
		</div>
	</div>
	<div class="modal"  ng-show="replaceCo" >
		<div class="modal_body">
			<div class="modal_content">
				<div class="modal_contents">
					<div class="modal_title">
						<div class="leftTit">更换参与人员</div>
						<div class="close"   ng-click="reClose($event)">X</div>
					</div>
					<div class="modal_main">
						<form  class="timeSocl ">
							<div class="mout">
								<label>原参与人员：</label>
								<span class="userName">{{fixName}}</span>
							</div>
							<div class="mout">
								<label>替换人员：</label>
								<select name="" ng-show="userList.length>0"  ng-options="value.uid  as value.user_name for value in  userList" ng-model="getReason" >
									<option value="">请选择</option>
								</select>
								<span ng-show="userList.length<1"  class="userName">暂无替换人员</span>
							</div>
							<div class="mout" >
								<label>备注：</label>
								<textarea name="remark" id="" cols="50" rows="10" placeholder="请输入" ng-model="fixReason" ></textarea>
							</div>
							<div class="but">
								<button ng-click="replaceStaff()">确定</button>
							</div>
						</form>
					</div>	
				</div>
			</div>
		</div>
	</div>
	<div class="modal"  ng-show="fixInfo"  >
		<div class="modal_body" style="z-index:10000">
			<div class="modal_content">
				<div class="modal_contents">
					<div class="modal_title task_title">
						<div class="leftTit">修改任务基本信息</div>
						<div class="close"   ng-click="reClose($event)"><i class="icon iconfont icon-shachu-xue"></i></div>
					</div>
					<div class="modal_main addtask">
						<!-- <form  class="timeSocl" name="Information" novalidate >
							<div class="mout newTask">
								<div >
									<label>所属项目：</label>
									<span class="radio_right">
										<span ng-repeat="project in projectList">
										<label ><input type="radio" name="is_k" dats="project.project_id" ng-click="systemShow(project.project_id)"
										 ng-checked="project.project_id==fixForm.project_type" >{{project.project_name}}</label>
										</span>
									</span>
								</div>
								<div >
									<label>任务名称：</label>
									<input type="text" class="maxInput" autocomplete="off"  name="task_names" required="required"   placeholder="任务名称" ng-model="fixForm.task_name" >
									<span class="errorInfo" ng-show="Information.task_names.$error.required">任务名称不能为空</span>  
								</div>
								<div >
									<label>审批编号：</label>
									<input type="text" class="maxInput" autocomplete="off" name="approval" required="required"   placeholder="审批编号" ng-model="fixForm.approve_no" >
									<span class="errorInfo" ng-show="Information.approval.$error.required">审批编号不能为空</span>  
								</div>
								<div >
									<label>任务类型：</label>
									<select  required name="taskType"  ng-model="fixForm.task_type" ng-options="a.id as a.name for a in taskTypeList"  >
										<option value="">请选择</option>
									</select>
									<span class="errorInfo" ng-show="Information.taskType.$error.required">请选择任务类型</span> 
								</div>
								<div >
									<label>优先级：</label>	
									<select  required ng-model="fixForm.priority"  name="priorityr" >
										<option value="" >请选择</option>
										<option ng-selected="fixForm.priority=='正常'" value="1">正常</option>
										<option ng-selected="fixForm.priority=='紧急'" value="2">紧急</option>
									</select>
									<span class="errorInfo" ng-show="Information.priorityr.$error.required">请选择任务类型</span> 
								</div>
								<div >
									<label>耗时(天)：</label>
									<input type="text" placeholder="请输入" autocomplete="off" required  ng-model="fixForm.consume_days" name="timess">
									<span class="errorInfo" ng-show="Information.timess.$error.required">耗时天数不能为空</span> 
								</div>
								<div >
									<label>审批时间：</label>
									<span class="timeSel">
								            <input type="text" autocomplete="off" id="J-x6" value="{{fixForm.time_approve}}" required  name="s" ng-model="fixForm.time_approve"  placeholder="请选择"/  ><i class="icon iconfont icon-riqi1 iconfontss"></i>
					         		</span>
					         		<span class="errorInfo" ng-show="Information.s.$error.required">审批时间不能为空</span> 
								</div>
								<div>
									<label>需求人：</label>
									<input type="text" placeholder="请输入" required ng-model="fixForm.applicant" autocomplete="off" name="applicantr" >
									<span class="errorInfo" ng-show="Information.applicantr.$error.required">需求人不能为空</span> 
								</div>
								<div >
									<label>备注：</label>
									<textarea name="remark" required cols="70" rows="7" placeholder="请输入" ng-model="fixForm.remark" ></textarea>
									<span class="errorInfo" ng-show="Information.remark.$error.required">备注不能为空</span>
								</div>
								<div>
									<label>参与人员：</label>
									<div class="addParticipants">
										<span ng-repeat="dev in fixForm.developer" ng-show="staff" >
											<span ng-show="dev.name!=''">{{dev.name}}<font ng-show="!$last">、</font></span>
											
										</span>
										<span ng-repeat="add in  addStaff"  ng-show="staff==false" >{{add.user_name}}
											<font ng-show="!$last">、</font>
										</span>
										<span class="add"><a href="javascript:;" ng-click="addParticipant(1)" >添加</a></span>
									</div>
								</div>
								<div>
									<label>系统：</label>
									<span class="radio_right">
										<span ng-repeat="system in projectList" >
											<span  ng-repeat="sys in system.sys_list" ng-show="systemr==system.project_id">
												<span >
											<label >
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
										<label >
											<input type="radio" name="is_r" ng-checked="fixForm.is_plan=='需要'" ng-click="fixForm.is_plan=true" >需要
										</label>
										<label >
											<input type="radio" name="is_r" ng-checked="fixForm.is_plan=='不需要'" ng-click="fixForm.is_plan=false" >不需要
										</label>
									</span>
								</div>
							</div>
							<div class="but">
								<button ng-click="fixBasicInfo()">确定</button>
							</div>
						</form> -->
						<form  class="timeSocl" name="Information" novalidate >
							<div class="mout newTask">
								<div >
									<label>所属项目：</label>
									<span class="radio_right">
										<span ng-repeat="project in projectList">
										<label >
											<input type="radio" name="is_k" dats="project.project_id" ng-click="systemShow(project.project_id)"
										 ng-checked="project.project_id==fixForm.project_type" >{{project.project_name}}</label>
										</span>
									</span>
								</div>
								<div >
									<label>任务名称：</label>
									<input type="text" class="maxInput" autocomplete="off"  name="task_names"    placeholder="任务名称" ng-model="fixForm.task_name" >
								</div>
								<div >
									<label>审批编号：</label>
									<input type="text" class="maxInput" autocomplete="off" name="approval"   placeholder="审批编号" ng-model="fixForm.approve_no" >
								</div>
								<div >
									<label>任务类型：</label>
									<select   name="taskType"  ng-model="fixForm.task_type" ng-options="a.id as a.name for a in taskTypeList"  >
										<option value="">请选择</option>
									</select>
								</div>
								<div >
									<label>优先级：</label>	
									<select   ng-model="fixForm.priority"  name="priorityr" >
										<option value="" >请选择</option>
										<option ng-selected="fixForm.priority=='正常'" value="1">正常</option>
										<option ng-selected="fixForm.priority=='紧急'" value="2">紧急</option>
									</select>
								</div>
								<div >
									<label>耗时(天)：</label>
									<input type="text" placeholder="请输入" autocomplete="off"   ng-model="fixForm.consume_days" name="timess">
								</div>
								<div >
									<label>审批时间：</label>
									<span class="timeSel">
								            <input type="text" autocomplete="off" id="J-x6" value="{{fixForm.time_approve}}"   name="s" ng-model="fixForm.time_approve"  placeholder="请选择"/  ><i class="icon iconfont icon-riqi1 iconfontss"></i>
					         		</span>
								</div>
								<div>
									<label>需求人：</label>
									<input type="text" placeholder="请输入"  ng-model="fixForm.applicant" autocomplete="off" name="applicantr" >
								</div>
								<div >
									<label>备注：</label>
									<textarea name="remark"  cols="70" rows="7" placeholder="请输入" ng-model="fixForm.remark" ></textarea>
								</div>
								<div>
									<label>参与人员：</label>
									<div class="addParticipants">
										<span ng-repeat="dev in fixForm.developer" ng-show="staff" >
											<span ng-show="dev.name!=''">{{dev.user_name}}<font ng-show="!$last">、</font></span>
											
										</span>
										<span ng-repeat="add in  addStaff"  ng-show="staff==false" >{{add}}
											<font ng-show="!$last">、</font>
										</span>
										<span class="add"><a href="javascript:;" ng-click="addParticipant(1)" >添加</a></span>
									</div>
								</div>
								<div>
									<label>系统：</label>
									<span class="radio_right">
										<span ng-repeat="system in projectList" >
											<span  ng-repeat="sys in system.sys_list" ng-show="systemr==system.project_id">
												<span >
											<label >
												<input type="checkbox"  value="{{sys.sid}}"  
												ng-click="adChecked($event,sys.sid)"  ng-checked="isSelected(sys.sid)"  name="system" />{{sys.system_name}}
											</label>
											</span>
											</span>
										</span>
									</span>
								</div>
								<div>
									<label>计划详情：</label>
									<span class="radio_right">
										<label >
											<input type="radio" name="is_r" ng-checked="fixForm.is_plan=='需要'" ng-click="fixForm.is_plan=true" >需要
										</label>
										<label >
											<input type="radio" name="is_r" ng-checked="fixForm.is_plan=='不需要'" ng-click="fixForm.is_plan=false" >不需要
										</label>
									</span>
								</div>
							</div>
							<div class="but">
								<button ng-click="fixBasicInfo()">确定</button>
							</div>
						</form>
					</div>	
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
						<div class="close"  ng-show="edit!=1" ng-click="reCloser($event)"><i class="icon iconfont icon-shachu-xue"></i></div>
						<div class="close" ng-show="edit==1"  ng-click="reCloser($event,1)"><i class="icon iconfont icon-shachu-xue"></i></div>
					</div>
					<div class="modal_main addParticipant">
						<form  class="timeSocl ">
							<div class="mout userList">
								<!-- 新增 -->
								<div ng-repeat="user in addUserLIsts" ng-show="edit==1">
									<h4>{{user.group_name}}</h4>
										<label  ng-repeat="us in user.group_member">
											<input type="checkbox"   vlaue="{{us.uid}}" class="groupUsers" 
											 name="{{us.user_name}}" ng-checked="isCheckedo(us.uid,user.id)" ng-disabled="isCheckedo(us.uid,user.id,user.group_name)" ng-click="so($event,us.uid,us,user.id,user.group_name)" >{{us.user_name}}
										</label> 
								</div>
								<!-- 修改 -->
								<div ng-repeat="user in addUserLIsts"  ng-show="edit!=1" >
									<h4>{{user.group_name}}</h4>
										<label  ng-repeat="us in user.group_member">
											<input type="checkbox"  ng-model="not" vlaue="{{us.uid}}" class="groupUser"  name="{{us.user_name}}" 
											ng-click="so($event,us.uid,us,user.id,user.group_name)" ng-checked="isSelecteds(us.uid,user.id)" >{{us.user_name}}
										</label>
								</div>
								
							</div>
							
							<div class="but">
								<button ng-click="addParticipant()" ng-show="edit!=1">确定</button>
								<button ng-click="editParticipant()" ng-show="edit==1">确定</button>
							</div>
						</form>
					</div>	
				</div>
			</div>
		</div>
	</div>
	<!-- 发布任务 -->
	<modal-ms></modal-ms>
	</div>
</body>
<script>	
  $(document).ready(function(){
  	  laydate({
                elem: '#J-x3',
                choose: function (dates) {
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
                elem: '#J-x6',
                choose: function (dates) {
                var appElement = document.querySelector('[ng-controller=taskDetails]'),
                $scope = angular.element(appElement).scope();
                    var ends = $("#J-xl4").val(),
                        startTime = new Date(dates);
                         setTimeout(function(){
                         	$scope.$apply(function(){
                         		$scope.fixForm.time_approve=dates;
                         	})
                         },50)
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
  })
</script>
</html>