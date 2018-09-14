<!DOCTYPE html>
<html lang="en" ng-app="myWeb" >
<head>
	<meta charset="UTF-8">
	<META HTTP-EQUIV="pragma" CONTENT="no-cache">
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate">
	<META HTTP-EQUIV="expires" CONTENT="0">
	<title>中国联保研发任务管理平台</title>
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
				<span>{{urlr.text}}</span>
				<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
				<a href="index.php?loadmodel={{urlr.url}}&projcet={{projcetUrl.zid}}"  >{{projcetUrl.nameCode}}</a>
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
						</li>
						<li>
							<p><label>审批编号：</label>{{taskInfo.approve_no}}</p>
							<p><label>任务名称：</label><span class="exceedingLength">{{taskInfo.task_name}}</span></p>
							<p><label>类型：</label>
								<span>{{taskInfo.task_type}}</span>
							</p>
						</li>
						<li>
							<p><label>优先级：</label>
								<span>{{taskInfo.priority}}</span>
							</p>
							<p><label>审批时间：</label>{{taskInfo.time_approve}}</p>
							<p><label>需求人：</label>{{taskInfo.applicant}}</p>
						</li>
						<li>
							<p><label>耗时(天)：</label>{{taskInfo.consume_days}}</p>
							<p><label>进度：</label>
								<span >{{taskInfo.task_process}}</span>
							</p>

							<p><label>备注：</label><span class="exceedingLength">{{taskInfo.remark }}</span></p>
						</li>
						<li style="border: none;">
							<p><label>参与小组：</label>
								<span class="ctStyle"   >
									<span ng-repeat="groups in taskInfo.group" style=" word-break:break-all; overflow:auto" >{{groups.name}}
										<font ng-show="!$last">、</font> <span ng-show="$odd"><br/></span>
									</span>
								</span>	
							</p>
						</li>
					</ul>
				</div>
				<div class="edit">
					<button   ng-class="{true:'butDisabled',false:''}[myTask!=undefined || taskInfo.can_change==2 ]" 
					 ng-disabled="myTask!=undefined || taskInfo.can_change==2 "  ng-click="fixAlertShow(taskInfo.id)">编辑</button>
				</div>
			</div>
			<div class="backgrounds"></div>
			<div class="planContent">
				<div class="but">
					进度情况
					<button class="right" ng-class="{true:'butDisabled',false:''}[ myTask!=undefined || (myTask==undefined && is_plan==1 )  || (taskInfo.can_change==2 || taskInfo.can_change==3) ]"
					  ng-disabled="myTask!=undefined || (myTask==undefined && is_plan==1 )  || (taskInfo.can_change==2 || taskInfo.can_change==3) " ng-click="editDevelope()" >添加参与人</button>
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
								<th width="13%">备注</th>
								<th>参与人</th>
								<th ng-if="(auth_type!=2 && is_plan==0)">操作</th>
							</tr>
						</thead>
						<tbody>
							<!-- 无计划 -->
							<tr ng-if="is_plan==0" ng-repeat="process in processList" ng-show="processList!='' || processList!= undefined">
								<td title="{{process.step}}" ><span ng-class="{true:'selectTime',false:''}[myTask!=undefined && process.is_mine==1 
									&& process.time_start_schedule!='' && taskInfo.can_change==1]">{{process.step }}</span></td>
								<td>
									<span ng-class="{true:'selectTime',false:''}[myTask!=undefined 
									&& process.is_mine==1 && process.time_start_schedule!='' && taskInfo.can_change==1]">{{process.process}}</span>
								</td>
								<td>
									<p ng-show="process.can_release==undefined">
									
										<span  ng-show="(auth_type==1  || (myTask!=undefined && process.is_mine==1 && process.time_start_schedule=='') || (auth_type!=1  && auth_type!=2 && process.is_mygroup==1))&& taskInfo.can_change==1" >
											<span ng-show="process.time_start_schedule==''" ><a href="javascript:;" ng-click="setTime(process.id,1,process.handle_type)" >请设置</a></span>
											<a href="javascript:;" ng-show="process.time_start_schedule!=''" ng-click="fixTimes(process.id,10,process.handle_type)">{{process.time_start_schedule}}</a>
										</span>
										<span ng-class="{true:'selectTime',false:''}[myTask!=undefined && process.is_mine==1 && process.time_start_schedule!='' && taskInfo.can_change==1]"  
										ng-show="((auth_type==1 ||(myTask!=undefined && process.is_mine==1) || (auth_type!=1 && auth_type!=2 && process.is_mygroup==1)) && (taskInfo.can_change==2 || taskInfo.can_change==3) )
										||(myTask!=undefined && process.is_mine==0) || (auth_type!=1 && auth_type!=2 && process.is_mygroup==0  ) 
										||(myTask!=undefined && process.is_mine==1 && process.time_start_schedule!='' && taskInfo.can_change==1)">
											{{process.time_start_schedule}}
										</span>
									</p>
									<p ng-show="process.can_release!=undefined">-</p>
								</td>
								<td>
									<p ng-show="process.can_release==undefined">
											<span ng-show="(auth_type==1  || (myTask!=undefined && process.is_mine==1 && process.time_end_schedule=='') || (auth_type!=1  && auth_type!=2 && process.is_mygroup==1))&& taskInfo.can_change==1" >
												<span ng-show="process.time_end_schedule==''" ><a href="javascript:;" ng-click="setTime(process.id,2,process.handle_type)" >请设置</a></span>
											<a href="javascript:;" ng-show="process.time_end_schedule!=''" ng-click="fixTimes(process.id,11,process.handle_type)" >{{process.time_end_schedule}}</a>
										</span>
										<span ng-class="{true:'selectTime',false:''}[myTask!=undefined && process.is_mine==1 && process.time_end_schedule!='' && taskInfo.can_change==1]"  
										ng-show="((auth_type==1 ||(myTask!=undefined && process.is_mine==1) || (auth_type!=1 && auth_type!=2 && process.is_mygroup==1)) && (taskInfo.can_change==2 || taskInfo.can_change==3) )
										||(myTask!=undefined && process.is_mine==0) || (auth_type!=1 && auth_type!=2 && process.is_mygroup==0  ) 
										||(myTask!=undefined && process.is_mine==1 && process.time_end_schedule!='' && taskInfo.can_change==1)" >
											{{process.time_end_schedule}}
										</span>
									</p>
									<p ng-show="process.can_release!=undefined ">
										<span ng-show=" (taskInfo.can_change==2|| taskInfo.can_change==3)">{{process.time_end_schedule}}</span>
										<span ng-show=" taskInfo.can_change==1 && process.time_end_schedule==''" ><a href="javascript:;" ng-click="setTime(process.id,21,20)" >请设置</a></span>
										<a href="javascript:;" ng-show="taskInfo.can_change==1 && (process.time_end_schedule!='' && process.is_released!=1)" ng-click="fixTimes(process.id,22,20)" >{{process.time_end_schedule}}</a>
									</p>
									
								</td>
								<td>
									<p ng-show="process.can_release==undefined">
										<span ng-show="(auth_type==1  || (myTask!=undefined && process.is_mine==1 && process.time_start=='') || (auth_type!=1  && auth_type!=2 && process.is_mygroup==1))&& taskInfo.can_change==1" >
											<span ng-show="process.time_end_schedule!='' && process.time_start_schedule!='' && process.time_start==''" 
											class="notStart"  ng-click="beginTime(process.id,process.handle_type)" >开始</span>
								            <span ng-show="process.time_end_schedule!='' && process.time_start_schedule!='' &&process.time_start!=''" >
								            	<a href="javascript:;" ng-click="fixTimes(process.id,8,process.handle_type)" >{{process.time_start}}</a></span>
										</span>
										<span  ng-class="{true:'selectTime',false:''}[myTask!=undefined && process.is_mine==1 && process.time_start!='' && taskInfo.can_change==1]"  
										ng-show="((auth_type==1 ||(myTask!=undefined && process.is_mine==1) || (auth_type!=1 && auth_type!=2 && process.is_mygroup==1)) && (taskInfo.can_change==2 || taskInfo.can_change==3) )
										||(myTask!=undefined && process.is_mine==0) || (auth_type!=1 && auth_type!=2 && process.is_mygroup==0  ) 
										||(myTask!=undefined && process.is_mine==1 && process.time_start!='' && taskInfo.can_change==1)" >
											{{process.time_start}}
										</span>
									</p>
									<p ng-show="process.can_release!=undefined">-</p>
								</td>
								<td>
									<p ng-show="process.can_release==undefined">
										<span ng-show="(auth_type==1  || (myTask!=undefined && process.is_mine==1 && process.time_end=='') || (auth_type!=1  && auth_type!=2 && process.is_mygroup==1))&& taskInfo.can_change==1">
											<span ng-show=" process.time_end_schedule!='' && process.time_start_schedule!='' &&process.time_end==''&& process.time_start!=''"
											 class="notStart" ng-click="end(process.id,process.time_end_schedule,process.handle_type,process.is_test_dev,process.is_ui_dev)" >结束</span>
								            <span ng-show="process.time_end_schedule!='' && process.time_start_schedule!='' &&   process.time_end!='' &&process.time_start!=''">
								            	<a href="javascript:;" ng-click="fixTimes(process.id,9,process.handle_type)" >{{process.time_end}}</a></span>
										</span>
										<span  ng-class="{true:'selectTime',false:''}[myTask!=undefined && process.is_mine==1 && process.time_end!='' && taskInfo.can_change==1]"  
										ng-show="((auth_type==1 ||(myTask!=undefined && process.is_mine==1) || (auth_type!=1 && auth_type!=2 && process.is_mygroup==1)) && (taskInfo.can_change==2 || taskInfo.can_change==3) )
										||(myTask!=undefined && process.is_mine==0) || (auth_type!=1 && auth_type!=2 && process.is_mygroup==0  ) 
										||(myTask!=undefined && process.is_mine==1 && process.time_end!='' && taskInfo.can_change==1)"  >
											{{process.time_end}}
										</span>
									</p>
									<p ng-show="process.can_release!=undefined">
											<span ng-show=" process.time_end=='' && taskInfo.can_change==2 && taskInfo.task_process.length==7"  >{{taskInfo.task_process}}</span>
											<span ng-show=" process.can_release==0 && process.time_end=='' && (taskInfo.can_change==1 || taskInfo.can_change==3)  " class="notStart" style="background:#888787"  >发布</span>
											<span ng-show=" process.can_release==1 && process.time_end=='' && taskInfo.can_change==1 " class="notStart" ng-click="releaseTask(1)" >发布</span>
								            <span ng-show=" process.time_end!='' ">{{process.time_end}}</span>
									</p>
								</td>
								<td>
									<span class="remarkLength" ng-show="taskInfo.can_change==1">
										<a href="javascript:;" ng-show="process.remark" ng-click="subFixRemark(process.id,process.remark,process.handle_type)" >{{process.remark }}</a>
										<a href="javascript:;" ng-show="!process.remark" ng-click="subFixRemark(process.id,process.remark,process.handle_type)" >添加</a>
									</span>
									<span class="remarkLength" 
									ng-show="taskInfo.can_change==2||taskInfo.can_change==3">
										<span ng-click="subFixRemark(process.id,process.remark,process.handle_type,3)">{{process.remark}}</span>
									</span>
									<!-- 个人任务添加个人 -->
									<!-- <span class="remarkLength" ng-show="(auth_type==1   || (auth_type!=1  && auth_type!=2 && process.is_mygroup==1) || (myTask!=undefined && process.is_mine==1) )&& taskInfo.can_change==1">
										<a href="javascript:;" ng-show="process.remark" ng-click="subFixRemark(process.id,process.remark,process.handle_type)" >{{process.remark }}</a>
										<a href="javascript:;" ng-show="!process.remark" ng-click="subFixRemark(process.id,process.remark,process.handle_type)" >添加</a>
									</span> -->
									<!-- <span class="remarkLength" 
									ng-show="((auth_type==1 ||(myTask!=undefined && process.is_mine==1) || (auth_type!=1 && auth_type!=2 && process.is_mygroup==1)) && (taskInfo.can_change==2 || taskInfo.can_change==3) )
										||(myTask!=undefined && process.is_mine==0) || (auth_type!=1 && auth_type!=2 && process.is_mygroup==0) ">
										{{process.remark }}
									</span> -->
								</td>
								<td>
									<span ng-show="(auth_type==1  || (auth_type!=1  && auth_type!=2 && process.is_mygroup==1))&& taskInfo.can_change==1">
										<a href="javascript:;"  style="margin:0" ng-repeat="devs in process.developer "  ng-click="replaceStaff(process.id,devs.user_name,devs.id,process.handle_type,devs)" >
											{{devs.user_name}}
										</a>
									</span>
									<span  ng-class="{true:'selectTime',false:''}[myTask!=undefined && process.is_mine==1 && taskInfo.can_change==1]"
									ng-show="((auth_type==1 ||(myTask!=undefined && process.is_mine==1) || (auth_type!=1 && auth_type!=2 && process.is_mygroup==1)) && (taskInfo.can_change==2 || taskInfo.can_change==3))
										||(myTask!=undefined && process.is_mine==0) || (auth_type!=1 && auth_type!=2 && process.is_mygroup==0) || (myTask!=undefined && process.is_mine==1 && taskInfo.can_change==1 )">
										<span   ng-repeat="dev in process.developer "   >
											{{dev.user_name}}
										</span>
									</span>
								</td>
								<td ng-if="auth_type!=2 ">
									<a href="javascript:;"  ng-click="removeDev(process)"
									 ng-show="(((process.can_release==undefined && auth_type==1) || (process.can_release==undefined && auth_type!=1 && process.is_mygroup==1))&& taskInfo.can_change==1) ">删除</a>
									<span style="color:#999;padding-right:8px;" ng-show=" (process.can_release==undefined && auth_type!=1 && process.is_mygroup==0 && taskInfo.can_change==1) || ((taskInfo.can_change==2 || taskInfo.can_change==3) && process.can_release==undefined) " >删除</span>
								</td>
							</tr>

							<!-- 有计划 -->
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
								<td>
									<!-- <span class="remarkLength">{{process.remark}}</span> -->
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
								<td  colspan="10">暂无进度</td>
								
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
							<th width="10%">编号</th>
							<th width="15%">修改时间</th>
							<th width="25%">修改前</th>
							<th width="25%">修改后</th>
							<th width="15%">修改原因</th>
							<th width="10%">修改人</th>
							</tr>
						</thead>
						<tbody>
							<tr ng-repeat="fix in fixOringList" ng-show="fixOringList!=undefined || fixOringList!=''">
								<td  ng-show="$index<2" >{{fix.num}}</td>
								<td  ng-show="$index<2" >{{fix.time_change}}</td>
								<td  ng-show="$index<2" >{{fix.value_before}}</td>
								<td  ng-show="$index<2" >{{fix.value_after}}</td>
								<td  ng-show="$index<2" >
									<span class="remarkLength">{{fix.reason}}</span>
								</td>
								<td  ng-show="$index<2" >{{fix.username}}</td>
							</tr>
							<tr >
								<td colspan="6" ng-show="fixOringList==undefined || fixOringList==''">暂无修改记录</td>
							</tr>
						</tbody>
				</table>
				<div class="more">
						<a  ng-show="myTask!=undefined" href="./index.php?loadmodel=taskAmend&xid={{xid}}&auth_type={{auth_type}}&is_plan={{is_plan}}&myTask=0">
							<button  ng-show="fixOringList!=undefined && fixOringList!='' && fixOringList.length>2 "  >查看更多</button></a>
						<a  ng-show="myTask==undefined" href="./index.php?loadmodel=taskAmend&xid={{xid}}&auth_type={{auth_type}}">
							<button  ng-show="fixOringList!=undefined && fixOringList!='' && fixOringList.length>2"  >查看更多</button></a>
				</div>
			</div>
		</div>
	<div class="foumu"  ng-show="hides || solo||finishTime ||fixRemarkShow || replaceCo || fixInfo ||edit==1 ||shows || rele || historyRemark" ng-init="hides=false"></div>
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
									<input type="text"  id="J-x3" readonly="readonly" autocomplete="off" name="time_start" ng-model="planTime" placeholder="请选择"/><i class="icon iconfont icon-riqi1 iconfontss"></i>
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
	<!-- 实际完成时间 -->
	<task-completion-time></task-completion-time>
	 <!-- 添加备注 -->
	<task-add-remark></task-add-remark>
	<!-- 历史备注 -->
	<history-remarks></history-remarks>
	<div class="modal"  ng-show="replaceCo" >
		<div class="modal_body">
			<div class="modal_content">
				<div class="modal_contents">
					<div class="modal_title">
						<div class="leftTit">更换参与人员</div>
						<div class="close"   ng-click="reClose($event)"><i class="icon iconfont icon-shachu-xue"></i></div>
					</div>
					<div class="modal_main">
						<form  class="timeSocl ">
							<div class="mout">
								<label>原参与人员：</label>
								<span class="userName">{{fixName}}</span>
							</div>
							<div class="mout">
								<label>替换人员：</label>
								<select name="" ng-show="userList.length>0"  ng-options="value.uid  as value.name for value in  userList" ng-model="getReason" >
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
	<div class="modal modalPosition"  ng-show="fixInfo"  >
		<div class="modal_body" style="z-index:10000">
			<div class="modal_content">
				<div class="modal_contents">
					<div class="modal_title task_title">
						<div class="leftTit">修改任务基本信息</div>
						<div class="close"   ng-click="reClose($event)"><i class="icon iconfont icon-shachu-xue"></i></div>
					</div>
					<div class="modal_main addtask">
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
									<select  name="priorityr"  ng-selected="fixForm.priority" ng-model="fixForm.priority"    >
										<option  value="1">正常</option>
										<option  value="2">紧急</option>
									</select>
								</div>
								<div >
									<label>进度：</label>
									<select   name="can_process"  ng-model="fixForm.can_process" ng-options="a.id as a.name for a in taskInfo.can_process" >
										<option value="">请选择</option>
									</select>
								</div>
								<div >
									<label>耗时(天)：</label>
									<input type="text" placeholder="请输入" autocomplete="off"   ng-model="fixForm.consume_days" name="timess">
								</div>
								<div >
									<label>审批时间：</label>
									<span class="timeSel">
								            <input type="text" autocomplete="off" readonly="readonly" id="J-x6" value="{{fixForm.time_approve}}"   name="s" ng-model="fixForm.time_approve"  placeholder="请选择"/  ><i class="icon iconfont icon-riqi1 iconfontss"></i>
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
									<label>参与组：</label>
									<div class="addParticipants">

										<span ng-repeat="groups in sele"  >
											<span ng-show="groups.name!=''">{{groups.name}}<font ng-show="!$last">、</font></span>
											
										</span>
										<!-- <span ng-repeat="add in  addStaff"  ng-show="staff==false" >{{add}}
											<font ng-show="!$last">、</font>
										</span> -->
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
						<div class="leftTit" ng-if="edit!=1" >添加参与组</div>
						<div class="leftTit" ng-if="edit==1" >添加参与人</div>
						<div class="close"  ng-if="edit!=1" ng-click="reCloser($event)"><i class="icon iconfont icon-shachu-xue"></i></div>
						<div class="close" ng-if="edit==1"  ng-click="reCloser($event,1)"><i class="icon iconfont icon-shachu-xue"></i></div>
					</div>
					<div class="modal_main addParticipant">
						<form  class="timeSocl ">
							<div class="mout userList">
								<div ng-if="edit!=1">
									<label datas="{{groups.gid}}" ng-repeat="groups in getGroupListr" style="display: inline-block;">
										<input type="checkbox"  vlaue="{{groups.gid}}" class="groupUser" 
											name="{{groups.name}}" ng-click="so($event,groups.gid,groups)" 
											ng-checked="isSelecteds(groups.gid)" >{{groups.name}}
									</label>
								</div>
								<div ng-repeat="dev in groupMemberList" ng-if="edit==1">
									<h4>{{dev.group_name}}</h4>
										<label  ng-repeat="member in dev.member">
											<input type="checkbox"   vlaue="{{member.uid}}" class="groupUsers" 
											 name="{{member.name}}" ng-checked="isCheckedo(member.uid,dev.group_id)" ng-disabled="isCheckedo(member.uid,dev.group_id)" 
											 ng-click="so($event,member.uid,member,dev.group_id,dev.group_name)" >{{member.name}}
										</label> 

								</div>
								<p style="text-align:center;padding-left:30px;" ng-show="edit==1 && groupMemberList.length<1">暂无可添加参与人</p>
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
                 	var startTime = new Date(dates);
                }
            });
  	   laydate({
                elem: '#J-x8',
                choose: function (dates) {
                	var startTime = new Date(dates);
                }
            });
  	   laydate({
                elem: '#J-x6',
                choose: function (dates) {
                var appElement = document.querySelector('[ng-controller=taskDetails]'),
                $scope = angular.element(appElement).scope();
                    var startTime = new Date(dates);
                    setTimeout(function(){
                        $scope.$apply(function(){
                         	$scope.fixForm.time_approve=dates;
                        })
                    },50)
                }
            });

  })
</script>
</html>