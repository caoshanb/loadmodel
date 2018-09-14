<!DOCTYPE html>
<html lang="en" ng-app="myWeb" >
<head>
	<meta charset="UTF-8">
	<META HTTP-EQUIV="pragma" CONTENT="no-cache">
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate">
	<META HTTP-EQUIV="expires" CONTENT="0">
	<title>中国联保研发任务管理平台</title>
	<?php include $tpl_path."common/head.php"; ?>
	<script src="./js/groupTask.js<?php echo $js_v; ?>" type="text/javascript" charset="utf-8"></script>
</head>
<body id="2" >
	<div class="tops">
		<!-- <?php include $tpl_path."common/header.php"; ?> -->
	<div  ng-include="'index.php?loadmodel=header'"></div>
	</div>
	<div ng-controller="groupTasks" ng-cloak class="groupTask module">
		<div class="">
			<div class="promptNav">
				<div class="NavSele">
					<dl>
					    <dd>
					        <div class="sysmentList" ng-click="moduleSelect($event)" data-ment="1" >
					        	<span class="navMenu">
					        		<span>{{sysment.project_name | cut:false:8:' '}}
					        			<i class="bottom-arrow"></i>
					        		</span>
					        	</span>
					        	<ul>
					        		<li ng-repeat="sys in systemTypeList"  ng-click="projectType(sys,$event)" >
					        			{{sys.project_name}}
					        		</li>
					        	</ul>
					        </div>
					    </dd>
					    <dd>
					    	<div class="sysmentList queryGroupList"  ng-click="moduleSelect($event)" data-ment="2">
					    		<span class="navMenu">
					        		<span ng-show="GroupList!=undefined" style="display: inline-block;" >
					        		{{groupFiltrate.name | cut:false:8:' '}}
					        		<i  class="bottom-arrow" style="display: inherit;"></i>
						        	</span>
						        	<span  ng-show="GroupList==''||GroupList==undefined" ng-repeat="gro in groupInit track by $index" >
						        		<span ng-if="$index<1">
						        			{{gro.name}}
						        			<i class="bottom-arrow"></i>
						        		</span>
						        	</span>
					        	</span>
					        	<ul>
					        		<li ng-repeat="group in GroupList"  ng-click="queryTask(group,$event)" >
					        			{{group.name}}
					        		</li>
					        	</ul>
					        </div>
					    </dd>
					    <dd>
					    	<div class="sysmentList queryGroupList" ng-click="moduleSelect($event)" data-ment="3">
					        	<span class="navMenu">
					        		<span  ng-show="teamList!=undefined"  >
						        		{{memberSel.name | cut:false:8:' '}}
						        		<i class="bottom-arrow"></i>
						        	</span>
						        	<span  ng-show="teamList==''||teamList==undefined" ng-repeat="me in memberInit" >
						        		<span ng-if="$index<1">{{me.name}}
						        			<i class="bottom-arrow"></i>
						        		</span>
						        	</span>
					        	</span>
					        	<ul class="memberList" >
					        		<li ng-repeat="team in teamList"  ng-click="teamTask(team,$event)" >
					        			{{team.name}}
					        		</li>
					        	</ul>
					        	
					        </div>

					    </dd>
					</dl>
					
				</div>
				<div class="navRight">
					<button  ng-show="groupSel==3" ng-click="editTask($event)">新建任务</button>
				</div>
				
			</div>
			<div class="backgrounds"></div>
			<div class="content"> 
				 <div class="wrap">
			       <ul class="blsit-list"> 
			         <li>
			         	<form  id="taskList"  class="screenList">
			         		<div class="taskScreen">
				         		<dl>
				         			<dd>
				         				<select name="sle" ng-options="va.tid as va.name for va in timeTypeList" name="" ng-model="timeType" onchange="changSel(this)"  >
				         					<option value="" color="yelllow" style="color:#777"  >时间类型</option>	
				         				</select>
				         			</dd>
					         		<dd>
						         		<select name="sle"  ng-model="task_statu"  ng-options="o.id as o.name for o in schedule" 
						         		onchange="changSel(this)"  >
						         			<option value="" color="yelllow" style="color:#777" >进度</option>
						         		</select>
					         		</dd>
					         		<dd>
					         			<p class="timeSel" >
								            <input type="text"  autocomplete="off"  id="J-x3"  readonly="readonly" value="" name="time_start" placeholder="开始时间"/><i class="icon iconfont icon-riqi1 iconfontss"></i>
								            <span> 至&nbsp;</span>
								            <input type="text"  autocomplete="off"  id="J-xl4" readonly="readonly" value=""  name="time_end"  placeholder="结束时间"/><i class="icon iconfont icon-riqi1 iconfontss"></i>
					         			</p>
					         		</dd>
					         		<dd>
					         			<span class="stateBut">
					         				<a  name="state" ng-click="thisMonth()" >本月</a>
						         			<a  name="state" ng-click="thisWeek()" >本周</a>
						         			<a  name="state" ng-click="ckNull()" style="color: #c00;" >清空</a>
						         			<input  id="timeValue" type="hidden" value="" >
					         			</span>
					         		</dd>
				         		</dl>
				         		<dl>
					         		<dd>
					         			<input type="text" value="" placeholder="需求人、审批编号、任务名称..."  ng-model="taskSearch" style="width:235px">
					         				&nbsp;&nbsp;&nbsp;<button ng-click="search()" >搜索</button>
					         			<button ng-click="getGroupTaskData()" ng-show="groupSel==3" >导出</button>
					         			
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
						        <!-- 组员任务 -->
						      	<tbody ng-show="groupSel==4">
						      		<tr ng-hide="teamsTaskList==''" ng-repeat="teams in teamsTaskList" >
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
						             	<a  ng-show="teams.is_plan!=undefined && teams.is_plan==1"
						             	 href="./index.php?loadmodel=myMissionPlan&xid={{teams.id}}&auth_type=4"
						             	 target="./index.php?loadmodel=myMissionPlan&xid={{teams.id}}&auth_type=4">计划</a>
										</span>
						             	<a  href="./index.php?loadmodel=taskDetails&xid={{teams.id}}&auth_type=4"
						             	target="./index.php?loadmodel=taskDetails&xid={{teams.id}}&auth_type=4" >详情</a>
						             	<!-- <a href="javascript:;" ng-click="removeMyAk(teams.id,teams.is_plan)" >删除</a> -->
						             </td> 
						        </tr>
						        <tr ng-show="teamsTaskList==''||teamsTaskList==undefined">
						        	<td colspan="17">暂无任务</td>
						        </tr>
						      	</tbody>
						      	<!-- 小组任务 -->
						      	<tbody ng-show="groupSel==3">
						      		<tr ng-hide="groupTaskList==''" ng-repeat="group in groupTaskList" >
						        	 <td>{{group.num}}</td>  
						             <td>{{group.priority}}</td>
						             <td>{{group.time_receive}}</td>
						             <td>{{group.applicant}}</td>
						             <td>
						             	
						             	 {{group.approve_no}}
						             </td>
						             <td>{{group.task_type}}</td>
						             <td style="width:180px"><span class="remarkLength">{{group.task_name}}</span></td>
						             <td>{{group.task_process}}</td>
						             <td>{{group.consume_days}}</td>
						             <td>{{group.time_start_schedule}}</td>
						             <td>{{group.time_end_schedule}}</td>
						             <td>
						             	<!-- <span ng-show="group.time_start=='' && group.time_start_schedule!='' && group.time_end_schedule!='' " 
						             	class="notStart"  ng-click="beginTime(group.tid)" >开始</span> -->
						             	<span ng-show=" group.time_start_schedule!='' && group.time_end_schedule!=''">
						             		{{group.time_start}}
						             	</span>
						             </td>
						             <td>
						             	<!-- <span ng-show="group.time_end==''&& group.time_start!=''&& group.time_start_schedule!='' && group.time_end_schedule!='' " 
						             	 class="notStart" ng-click="end(group.tid,group.time_end_schedule)" >结束</span> -->
						             	<span ng-show="group.time_start!=''&& group.time_start_schedule!='' && group.time_end_schedule!='' ">
						             		{{group.time_end}}
						             	</span>
						             </td>

						             <td>
						             	<span ng-show="group.time_release!=''">{{group.time_release}}</span>
						             	<span ng-show="group.time_release=='' && group.is_released==0 && group.task_process.length==7"></span>
						             	<span ng-show="group.can_release==0 && group.time_release=='' && group.time_end_schedule!=''&& group.task_process.length<7 ">计划{{group.time_end_schedule}}</span>
						             	<span ng-show="group.can_release==1 && group.time_release==''" 
						             	 class="notStart" ng-click="releaseTask(group.tid)" >发布</span>
						             	<!--  <span 
						             	 class="notStart" ng-click="releaseTask(group.tid)" >发布</span> -->
						             </td>
						             <td title="{{group.remark}}" >{{group.remark | cut:false:8:'...'}}</td>
						             <td>
						             	<p  ng-repeat="(k,v) in group.developer track by $index" ng-mouseenter="getDeveloper($event,group.developer)">
						             		<span ng-show="k<2" >{{v}}<font ng-show="k<1&& !$last">、</font><font ng-show="k==1 && !$last">...</font></span>
						             	</p>
						             </td>
						             <td>
						             	<span class="span" ng-show="group.is_plan==undefined  || group.is_plan==0" >计划</span>
						             	<a ng-show="group.is_plan!=undefined && group.is_plan==1"
						             	 href="./index.php?loadmodel=myMissionPlan&xid={{group.tid}}&auth_type=3"
						             	 target="./index.php?loadmodel=myMissionPlan&xid={{group.tid}}&auth_type=3">计划</a>
						             	<a href="./index.php?loadmodel=taskDetails&xid={{group.tid}}&auth_type=3"
						             	 target="./index.php?loadmodel=taskDetails&xid={{group.tid}}&auth_type=3" >详情</a>
						             	<a href="javascript:;" ng-show="getJus.grouptask==2 && group.can_delete==1" 
						             	ng-click="removeMyAk(group.tid)" >删除</a>
						             	<span class="span" ng-show="group.can_delete==0 || (getJus.grouptask==1 && group.can_delete==1)" >删除</span>
						             </td> 
						        </tr>
						         <tr ng-show="groupTaskList==''|| groupTaskList==undefined || total==0">
						        	<td colspan="17">暂无任务</td>
						        </tr>
						      	</tbody>
						        
						    </table>
						    <pagination total-items="total || 1" ng-change="changeList(page.page_index)" ng-model="page.page_index" max-size="5"
	                            items-per-page="page.page_rows" class="pagination-sm pull-right"
	                            boundary-links="true"></pagination>
				         	</div>
			         	</form>
			         </li>
			       </ul>
			    </div>
			</div>
		</div>
	<div class="foumu"  ng-show="hides||finishTime || rele ||hideCode " ng-init="hideCode=false"></div>
	<div class="modal modalPosition"  ng-show="hideCode"  >
		<div class="modal_body" style="z-index:10000">
			<div class="modal_content">
				<div class="modal_contents">
					<div class="modal_title task_title">
						<div class="leftTit">新建任务</div>
						<div class="close"   ng-click="reClose($event)"><i class="icon iconfont icon-shachu-xue"></i></div>
					</div>
					<div class="modal_main addtask">
						<form  class="timeSocl" name="Informations"  >
							<div class="mout newTask">
								<div >
									<label>所属项目：</label>
									<span class="radio_right">
										<span >
										<label  style="text-align:left;" ng-repeat="project in systemTypeList">
											<input type="radio"  name="is_k" ng-click="systemShow(project.project_id)"  
										 >{{project.project_name}}</label>
										</span>
										<!-- <span class="errorInfo" ng-show="pro" >所属项目不能为空</span> -->
									</span>
								</div>
								<div >
									<label>任务名称：</label>
									<input type="text" class="maxInput" autocomplete="off" name="task_name"   placeholder="任务名称" ng-model="editForm.task_name" >
									<!-- <span class="errorInfo" ng-show="Informations.task_name.$error.required && chan ">任务名称不能为空</span>  -->
								</div>
								<div >
									<label>审批编号：</label>
									<input type="text" class="maxInput" autocomplete="off" name="approvals"   placeholder="审批编号" ng-model="editForm.approve_num" >
									<!-- <span class="errorInfo" ng-show="Informations.approvals.$error.required && change ">审批编号不能为空</span>  -->
								</div>
								<div >
									<label>任务类型：</label>
									<select   name="taskType" id=""  ng-model="editForm.task_type"  ng-selected="fixForm.task_type"   ng-options="vuela.id as vuela.name for vuela in ScheduleList" >
										<option value="">请选择</option>
									</select>
									<!-- <span class="errorInfo" ng-show="Informations.taskType.$error.required && task">请选择任务类型</span>  -->
								</div>
								<div >
									<label>优先级：</label>
									<select id=""  ng-model="editForm.priority" ng-selected="editForm.priority"  name="priorityr" >
										<option value="1">正常</option>
										<option value="2">紧急</option>
									</select>
									<!-- <span class="errorInfo" ng-show="Informations.priorityr.$error.required && cg">请选择任务类型</span>  -->
								</div>
								<div >
									<label>进度：</label>
									<select id=""  ng-model="editForm.process" ng-options="tp.id as tp.name  for tp in newTaskProcessList"  name="process" >
										
									</select>
									<!-- <span class="errorInfo" ng-show="Informations.priorityr.$error.required && cg">请选择任务类型</span>  -->
								</div>
								<div >
									<label>耗时(天)：</label>
									<input type="number" placeholder="请输入"   ng-model="editForm.task_days" name="timess" >
									<!-- <span class="errorInfo" ng-show="Informations.timess.$error.required &&timess">耗时天数不能为空</span>  -->
								</div>
								<div >
									<label>审批时间：</label>
									<span class="timeSel">
								            <input type="text" autocomplete="off" id="J-x6" value="" readonly="readonly"  name="ss"  ng-model="editForm.time_approve"  placeholder="请选择"/  >
								            <i class="icon iconfont icon-riqi1 iconfontss"></i>
					         		</span>
					         		<!-- <span class="errorInfo" ng-show="Informations.ss.$error.required && s">审批时间不能为空</span>  -->
								</div>
								<div>
									<label>需求人：</label>
									<input type="text" placeholder="请输入" autocomplete="off"  ng-model="editForm.applicant"   name="applicantr" >
									<!-- <span class="errorInfo" ng-show="Informations.applicantr.$error.required && applicantrr">需求人不能为空</span>  -->
								</div>
								<div >
									<label>备注：</label>
									<textarea name="remark"  cols="70" rows="7" placeholder="请输入"   ng-model="editForm.remark" ></textarea>
									<!-- <p class="errorInfo" style="margin-left:90px;" ng-show="Informations.remark.$error.required && remarko">备注不能为空</p> -->
								</div>
								<div>
									<label>参与人员：</label>
									<div class="addParticipants">
										<span ng-repeat="add in  sele"  ng-show="staff==false" >{{add.gname}}
											<font ng-show="!$last">、</font>
										</span>
										<span class="add"><a href="javascript:;" ng-click="addParticipant(1)" >添加</a></span>
										<!-- <p><span style="margin-left:90px;"  class="errorInfo" ng-show="developerd && selecteds==''">未添加需求人</span> </p> -->
									</div>
								</div>
								<div>
									<label>系统：</label>
									<span class="radio_right">

										<span ng-repeat="system in systemTypeList" >
											<span  ng-repeat="sys in system.sys_list" ng-show="systemr==system.project_id">
												<span >
											<label >
												<input type="checkbox"  value="{{sys.sid}}"  
												ng-click="adChecked($event,sys.sid)"  ng-checked="isSelected(sys.sid)"  name="system" />{{sys.system_name}}
											</label>
											</span>
											</span>
										</span>
										<!-- <span class="errorInfo" ng-show="systems">系统选项未选</span> -->
									</span>
								</div>
								<div>
									<label>计划详情：</label>
									<span class="radio_right">
										<label style="text-align:left;">
											<input type="radio" name="is_r"   ng-click="editForm.is_plan=1;is_plans=false" >需要
										</label>
										<label style="text-align:left;" >
											<input type="radio" name="is_r" ng-checked=" checkedType==undefined"  ng-click="editForm.is_plan='0';is_plans=false" >不需要
										</label>
										<!-- <span  class="errorInfo"  ng-show="is_plans">未选择计划</span> -->
									</span>
								</div>
							</div>
							<div class="but">
								<button ng-click="editGroupTask()">确定</button>
							</div>
						</form>
					</div>	
				</div>
			</div>
		</div>
	</div>
	<div class="modal" ng-show="addGroup" >
		<div class="modal_body">
			<div class="modal_content">
				<div class="modal_contents">
					<div class="modal_title">
						<div class="leftTit">添加参与组</div>
						<div class="close"   ng-click="reCloser($event)"><i class="icon iconfont icon-shachu-xue"></i></div>
					</div>
					<div class="modal_main addParticipant">
						<form  class="timeSocl ">
							<div class="mout userList">
								<div >
									<label datas="{{groups.gid}}" ng-repeat="groups in getGroupLists" style="display: inline-block;">
										<input type="checkbox" ng-model="not" vlaue="{{groups.gid}}" class="groupUser" 
											name="{{groups.name}}" ng-click="so($event,groups.gid,groups)" ng-checked="isSelecteds(groups.gid)" >{{groups.name}}
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
       laydate({
                elem: '#J-x3',
                choose: function (dates) {
                	$("#timeValue").val(3);
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
                	$("#timeValue").val(3);
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

            laydate({
	        elem: '#J-x6',
	        choose: function (dates) {
	        var appElement = document.querySelector('[ng-controller=groupTasks]'),
	            $scope = angular.element(appElement).scope();
	        	var startTime = new Date(dates);
	            setTimeout(function(){
	                $scope.$apply(function(){
	                    $scope.editForm.time_approve=dates;
	                })
	            },50)

	        }
	    	});
	    	laydate({
                elem: '#J-x8',
                choose: function (dates) {
                 var   startTime = new Date(dates);
                }
            });
    })
	 function changSel(t){
	 	console.log($(t).find("option:selected").text())
	 	$(t).find('option[color!="yelllow"]').css('color','#000');
	    if($(t).find("option:selected").text().indexOf("进度")>=0 ||$(t).find("option:selected").text().indexOf("类型")>=0) //如果选中option中包含"("和")"给select加红色
	       {
	    $(t).css('color','#444');
	      }
	    else{
	    $(t).css('color','#000');    //否则为默认的黑色
	     }
	    }
    $(function () {
    	$('select[name="sle"]').css('color','#555');
    })
</script>
</html>