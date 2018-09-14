<!DOCTYPE html>
<html lang="en" ng-app="myWeb" >
<head>
	<meta charset="UTF-8">
	<META HTTP-EQUIV="pragma" CONTENT="no-cache">
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate">
	<META HTTP-EQUIV="expires" CONTENT="0">
	<title>中国联保研发任务管理平台</title>
	<?php include $tpl_path."common/head.php"; ?>
	<script src="./js/planDetails.js<?php echo $js_v; ?>" type="text/javascript" charset="utf-8"></script>
</head>
<body id="" >
	<div class="tops">
		<!-- <?php include $tpl_path."common/header.php"; ?> -->
	<div  ng-include="'index.php?loadmodel=header'"></div>
	</div>
	<div ng-controller="planDetails" ng-cloak class="planDetails module">
		<div class="">
			<div class="promptNav">
				<span>{{urlr.text}}</span>
				<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
				<a href="index.php?loadmodel={{urlr.url}}&projcet={{projcetUrl.zid}}"  >{{projcetUrl.nameCode}}</a>
				<span ng-show="myTask==undefined">
				<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
				<a href="./index.php?loadmodel=myMissionPlan&xid={{xid}}&auth_type={{auth_type}}">计划</a>
				</span>
				<span ng-show="myTask!=undefined">
				<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
				<a href="./index.php?loadmodel=myMissionPlan&xid={{xid}}&auth_type={{auth_type}}&myTask=0">计划</a>
				</span>
				<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
				<span>详情</span>
			</div>
			<style type="text/css">
				
			</style>
			<div class="backgrounds"></div>
			<div class="planContent">
				<div class="but">
					<button   ng-class="{true:'butDisabled',false:''}[((myTask!=undefined || (myTask==undefined  && (responsibleGroup==false || responsibleGroup)) 
					 || auth_type==1) && (taskInfo.can_change==2||taskInfo.can_change==3)) || ((myTask==undefined  && responsibleGroup==false )  && taskInfo.can_change==1) || myTask!=undefined]" 
					 ng-disabled="(( (!myTask && responsibleGroup==false) || auth_type==1) &&  (taskInfo.can_change==2||taskInfo.can_change==3))||myTask!=undefined ||  responsibleGroup==false"
					  class="left"  ng-click="newTask()">新建</button>
					<button  ng-hide="(taskInfo.can_change==2||taskInfo.can_change==3) || auth_type==2"  class="left"   ng-click="exportTemplate()"  >导出模板</button>
					<button ng-hide="(taskInfo.can_change==2||taskInfo.can_change==3) || responsibleGroup==false || auth_type==2" class="left importModule"  >
						<form method="post" id="file" action=""  >
						    <input type="file" name="file" id="pic"  onchange="angular.element(this).scope().importModuleFile(this)"  />
						    <input id="excelFile" type="hidden"  name="plan_id" value="{{planId}}" />
						</form>导入模板
					</button>

					<button  ng-hide="auth_type==2"  class="left"   ng-click="exportDetails()"  >导出详情</button>
					<button  ng-show="myTask!=undefined" class="right" >
						<a href="./index.php?loadmodel=reviseHistory&xid={{xid}}&planId={{planId}}&auth_type={{auth_type}}&gid={{groupIds}}&myTask=0">修改历史</a>
					</button>
					<button  ng-show="myTask==undefined" class="right" >
						<a href="./index.php?loadmodel=reviseHistory&xid={{xid}}&planId={{planId}}&auth_type={{auth_type}}&gid={{groupIds}}">修改历史</a>
					</button>
				</div>
				<div>
					<table>
						<thead>
							<tr>
								<th>编号</th>
								<th width="22%">任务模块</th>
								<th>进度</th>
								<th>计划开始时间</th>
								<th>计划结束时间</th>
								<th>实际开始时间</th> 
								<th>实际完成时间</th>
								<th ng-show="groupIds!=5" width="9%">测试/发布</th>
								<th width="12%">备注</th>
								<th>参与人</th>
								
							</tr>
						</thead>
						<tbody>
							<tr ng-repeat="modular in modularList" ng-show="modularList!='' || modularList!= undefined">
								<td><span ng-class="{true:'selectTime',false:''}[myTask!=undefined && modular.is_mine==1
									 && modular.mtime_schedule_start!='' && taskInfo.can_change==1 && auth_type==2]">{{modular.num}}</span>
									<input type="checkbox"  vlaue="{{modular.mid}}"  ng-show="taskInfo.can_change==1" 
									ng-class="{true:'boxDisabled',false:''}[(myTask!=undefined && modular.is_mine!=1)  ]" 
								 	ng-disabled="myTask!=undefined && modular.is_mine!=1"  
									ng-checked="isSelected(modular.mid)" ng-model="boxnot" 
									ng-click="updateSelection($event,modular.mid)" ></td>
								<td  ><p class="remarkLength" ng-class="{true:'selectTime',false:''}[myTask!=undefined && modular.is_mine==1 
									&& modular.mtime_schedule_start!='' && taskInfo.can_change==1 && auth_type==2]">{{modular.module_name}}</p></td>
								<td>
									<span ng-class="{true:'selectTime',false:''}[myTask!=undefined && modular.is_mine==1 && modular.mtime_schedule_start!='' && taskInfo.can_change==1 && auth_type==2]">
									{{modular.module_process}}</span>
								</td>
								<td>
									<span ng-show="((myTask!=undefined && modular.is_mine==1 && modular.mtime_schedule_start=='') || responsibleGroup || auth_type==1) && taskInfo.can_change==1" >
										<span ng-show="modular.mtime_schedule_start==''" >
											<a href="javascript:;" ng-click="setTime(modular.mid,1)" >请设置</a>
										</span>
										<a href="javascript:;" ng-show="modular.mtime_schedule_start!='' " 
										ng-click="fixTimes(modular.mid,10)">{{modular.mtime_schedule_start}}</a>
									</span>
									<span  ng-class="{true:'selectTime',false:''}[myTask!=undefined && modular.is_mine==1 && modular.mtime_schedule_start!='' && taskInfo.can_change==1 && auth_type==2]"  
									ng-show=" (myTask!=undefined && modular.is_mine==1 && modular.mtime_schedule_start!='' && taskInfo.can_change==1 && auth_type==2)||
									(((myTask!=undefined && modular.is_mine==0) || (myTask==undefined &&
									(!responsibleGroup || responsibleGroup) && auth_type!=1 ) || auth_type==1)&& taskInfo.can_change!=1) 
									||(((responsibleGroup==false && auth_type!=1 ) || (!responsibleGroup && myTask!=undefined && modular.is_mine==0 ))&& taskInfo.can_change==1) ||(taskInfo.can_change==2 || taskInfo.can_change==3 )">
										{{modular.mtime_schedule_start}}
									</span>
								</td>
								<td>
									<span ng-show="((myTask!=undefined && modular.is_mine==1 && modular.mtime_schedule_end=='') || responsibleGroup || auth_type==1) && taskInfo.can_change==1" >
										<span ng-show="modular.mtime_schedule_end==''" ><a href="javascript:;" ng-click="setTime(modular.mid,2)" >请设置</a></span>
										<a href="javascript:;" ng-click="fixTimes(modular.mid,11)" ng-show="modular.mtime_schedule_end!=''" >{{modular.mtime_schedule_end}}</a>
									</span>
									<span ng-class="{true:'selectTime',false:''}[myTask!=undefined && modular.is_mine==1 && modular.mtime_schedule_end!='' && taskInfo.can_change==1 && auth_type==2]"  
									ng-show=" (myTask!=undefined && modular.is_mine==1 && modular.mtime_schedule_end!='' && taskInfo.can_change==1  && auth_type==2)||
									(((myTask!=undefined && modular.is_mine==0) || (myTask==undefined &&
									(!responsibleGroup || responsibleGroup) && auth_type!=1 ) || auth_type==1)&& taskInfo.can_change!=1) 
									||(((responsibleGroup==false && auth_type!=1 ) || (!responsibleGroup && myTask!=undefined && modular.is_mine==0 ))&& taskInfo.can_change==1) ||(taskInfo.can_change==2 || taskInfo.can_change==3 )">
										{{modular.mtime_schedule_end}}
									</span>
								</td>
								<td>
									<span ng-show="(responsibleGroup || (myTask!=undefined && modular.is_mine==1 && modular.mtime_start=='') || auth_type==1) && taskInfo.can_change==1">
										<span ng-show="modular.mtime_start=='' &&modular.mtime_schedule_start!=''&& modular.mtime_schedule_end!=''"
										 class="notStart"  ng-click="beginTime(modular.mid)" >开始</span>
							            <span ng-show="modular.mtime_start!='' &&modular.mtime_schedule_start!=''&& modular.mtime_schedule_end!=''" >
							            	<a href="javascript:;" ng-click="fixTimes(modular.mid,8)">{{modular.mtime_start}}</a>
							            </span>
									</span>
									<span ng-class="{true:'selectTime',false:''}[myTask!=undefined && modular.is_mine==1 && modular.mtime_start!='' && taskInfo.can_change==1 && auth_type==2]"  
									ng-show=" (myTask!=undefined && modular.is_mine==1 && modular.mtime_start!='' && taskInfo.can_change==1  && auth_type==2)||
									(((myTask!=undefined && modular.is_mine==0) || (myTask==undefined &&
									(!responsibleGroup || responsibleGroup) && auth_type!=1 ) || auth_type==1)&& taskInfo.can_change!=1) 
									||(((responsibleGroup==false && auth_type!=1 ) || (!responsibleGroup && myTask!=undefined && modular.is_mine==0 ))&& taskInfo.can_change==1) ||(taskInfo.can_change==2 || taskInfo.can_change==3 )">
										{{modular.mtime_start}}
									</span>
								</td>
								<td>
									<span>
										<span ng-show="((myTask!=undefined && modular.is_mine==1 && modular.mtime_end=='' ) || responsibleGroup || auth_type==1) && taskInfo.can_change==1">
											<span ng-show="modular.mtime_schedule_start!=''&& modular.mtime_schedule_end!='' && modular.mtime_end==''&& modular.mtime_start!=''" 
											class="notStart" ng-click="end(modular.mid,modular.mtime_schedule_end,modular.is_test_dev,modular.is_ui_dev)" >结束</span>
								            <span ng-show="modular.mtime_schedule_start!=''&& modular.mtime_schedule_end!='' && modular.mtime_end!=''&& modular.mtime_start!=''">
								            	<a href="javascript:;" ng-click="fixTimes(modular.mid,9)">{{modular.mtime_end}}</a>
								            </span>
							            </span>
						            </span>
						            <span ng-class="{true:'selectTime',false:''}[myTask!=undefined && modular.is_mine==1 && modular.mtime_end!='' && taskInfo.can_change==1 && auth_type==2]"  
									ng-show=" (myTask!=undefined && modular.is_mine==1 && modular.mtime_end!='' && taskInfo.can_change==1  && auth_type==2)||
									(((myTask!=undefined && modular.is_mine==0) || (myTask==undefined &&
									(!responsibleGroup || responsibleGroup) && auth_type!=1 ) || auth_type==1)&& taskInfo.can_change!=1) 
									||(((responsibleGroup==false && auth_type!=1 ) || (!responsibleGroup && myTask!=undefined && modular.is_mine==0 ))&& taskInfo.can_change==1) ||(taskInfo.can_change==2 || taskInfo.can_change==3 )">
						            	{{modular.mtime_end}}
						            </span>
								</td>
								<td  ng-show="groupIds!=5" >
									<span ng-class="{true:'selectTime',false:''}[myTask!=undefined && modular.is_mine==1
									 && modular.mtime_schedule_start!='' && taskInfo.can_change==1 && auth_type==2]">{{modular.next_status}}</span>
								</td>	
								<td  >
									<span  class="remarkLength"  ng-class="{true:'selectTime',false:''}[myTask!=undefined && modular.is_mine==1
									 && modular.mtime_schedule_start!='' && taskInfo.can_change==1 && auth_type==2]"
									ng-show="taskInfo.can_change==1 && !modular.remark ">
										<a href="javascript:;" ng-click="subFixRemark(modular.mid,modular.remark)" >
											添加
										</a>
									</span>
									<span  class="remarkLength"  ng-class="{true:'selectTime',false:''}[myTask!=undefined && modular.is_mine==1
									 && modular.mtime_schedule_start!='' && taskInfo.can_change==1 && auth_type==2]"
									ng-show="taskInfo.can_change==1 && modular.remark">
										<a href="javascript:;" ng-click="subFixRemark(modular.mid,modular.remark)" >
										{{modular.remark}}</a>
									</span>
									<span class="remarkLength" ng-class="{true:'selectTime',false:''}[myTask!=undefined && modular.is_mine==1
									 && modular.mtime_schedule_start!='' && taskInfo.can_change==1 && auth_type==2]"
									  ng-show="taskInfo.can_change==2 || taskInfo.can_change==3">
										<span ng-click="subFixRemark(modular.mid,modular.remark,3)"  >{{modular.remark}}</span> 
									</span>

									<!-- 个人操作个人计划 -->
									<!-- <span  class="remarkLength"  ng-class="{true:'selectTime',false:''}[myTask!=undefined && modular.is_mine==1
									 && modular.mtime_schedule_start!='' && taskInfo.can_change==1 && auth_type==2]"
									ng-show="(( responsibleGroup || auth_type==1 || (myTask!=undefined && modular.is_mine==1)) && taskInfo.can_change==1 && !modular.remark ) ">
										<a href="javascript:;" ng-click="subFixRemark(modular.mid,modular.remark)" >
											添加
										</a>
									</span>
									<span  class="remarkLength"  ng-class="{true:'selectTime',false:''}[myTask!=undefined && modular.is_mine==1
									 && modular.mtime_schedule_start!='' && taskInfo.can_change==1 && auth_type==2]"
									ng-show="( responsibleGroup || auth_type==1 || (myTask!=undefined && modular.is_mine==1)) && taskInfo.can_change==1&& modular.remark">
										<a href="javascript:;" ng-click="subFixRemark(modular.mid,modular.remark)" >
										{{modular.remark}}</a>
									</span>
									<span class="remarkLength" ng-class="{true:'selectTime',false:''}[myTask!=undefined && modular.is_mine==1
									 && modular.mtime_schedule_start!='' && taskInfo.can_change==1 && auth_type==2]" ng-show=" 
									 (((myTask!=undefined && modular.is_mine==0) || (myTask==undefined &&
									(!responsibleGroup || responsibleGroup) && auth_type!=1 ) || auth_type==1)&& taskInfo.can_change!=1) 
									||(((responsibleGroup==false && auth_type!=1 ) || (!responsibleGroup && myTask!=undefined && modular.is_mine==0 ))&& taskInfo.can_change==1) ||(taskInfo.can_change==2 || taskInfo.can_change==3 )">
										{{modular.remark}}
									</span> -->
								</td>
								<td>
									<span ng-show="( responsibleGroup || auth_type==1) && taskInfo.can_change==1">
										<a href="javascript:;"   
										 ng-click="replaceStaff(modular.mid,modular.developer.name,modular.developer.id)" >
										{{modular.developer.name}}
										</a>
									</span>
									<span ng-class="{true:'selectTime',false:''}[myTask!=undefined && modular.is_mine==1  && taskInfo.can_change==1 && auth_type==2]" 
									ng-show=" (myTask!=undefined && modular.is_mine==1 && taskInfo.can_change==1)|| (((myTask!=undefined && modular.is_mine==0) || (myTask==undefined &&
									(!responsibleGroup || responsibleGroup) && auth_type!=1 ) || auth_type==1)&& taskInfo.can_change!=1) 
									||(((responsibleGroup==false && auth_type!=1 ) || (!responsibleGroup && myTask!=undefined && modular.is_mine==0 ))&& taskInfo.can_change==1) ||(taskInfo.can_change==2 || taskInfo.can_change==3 )">
										<span  >
											{{modular.developer.name}}
										</span>
									</span>
								</td>
							</tr>
							<tr ng-show="modularList=='' || modularList== undefined">
								<td ng-show="groupIds!=5" colspan="10">暂无计划</td>
								<td ng-show="groupIds==5" colspan="9">暂无计划</td>
							</tr>
						</tbody>
					</table>
					<div class="checkAll"  ng-hide="auth_type==2 || (taskInfo.can_change==2||taskInfo.can_change==3)" >
						<button  ng-class="{true:'butDisabled',false:''}[myTask!=undefined]"  ng-disabled="myTask"  ng-click="checkAlls(modularList)">全选</button>
						<button  ng-class="{true:'butDisabled',false:''}[myTask!=undefined]"  ng-disabled="myTask"  ng-click="notCheck()">反选</button>
						<button  ng-class="{true:'butDisabled',false:''}[responsibleGroup==false || taskInfo.can_change!=1 || myTask!=undefined]"  ng-disabled="responsibleGroup==false ||taskInfo.can_change!=1 || myTask!=undefined " ng-click="removeModular()" >删除</button>
					</div>
				</div>

				<pagination total-items="total || 1" ng-change="changeList(page.page_index)" ng-model="page.page_index" max-size="5"
	                            items-per-page="page.page_rows" class="pagination-sm pull-right"
	                            boundary-links="true"></pagination>
			</div>
		</div>
	<div class="foumu"  ng-show="hides || solo||finishTime ||fixRemarkShow || replaceCo ||shows || historyRemark" ng-init="hides=false"></div>
	<div class="modal"ng-show="hides==true"  >
		<div class="modal_body">
			<div class="modal_content">
				<div class="modal_contents">
					<div class="modal_title">
						<div class="leftTit"  >新建模块</div>
						<div class="close"   ng-click="reClose($event)"><i class="icon iconfont icon-shachu-xue"></i></div>
					</div>
					<div class="modal_main newMain">
						<form  class="timeSocl">
							<div class="mout">
								<div>
									<label>任务模块：</label>
									<input type="text" name="is_test" autocomplete="off"  class="maxInput"  ng-model="moduleName" placeholder="请输入任务模块名称" >
								</div>
								<div>
									<label>参与人员：</label>
									<select name="" id="" ng-show="userList.length>0" ng-options="value.uid  as value.name for value in  userList"  ng-model="developer" >
										<option value="" >请选择</option>
									</select>
									<span ng-if="groupList.length<1">暂无可选参与人员	</span>
								</div>
								<div>
									<label>备注：</label>
									<textarea name="remark" id="" cols="50" rows="10" placeholder="请输入" ng-model="newRemark"  ></textarea>
								</div>
								<div class="but" style="margin-top:20px;">
									<button ng-click="submit()">确定</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="modal"  ng-show="shows==true"  >
		<div class="modal_body">
			<div class="modal_content">
				<div class="modal_contents">
					<div class="modal_title">
						<div class="leftTit"  >
							<span ng-show="fixType==10">修改计划开始时间</span>
							<span ng-show="fixType==11">修改计划结束时间</span>
							<span ng-show="fixType==8">修改实际开始时间</span>
							<span ng-show="fixType==9">修改实际结束时间</span>
							<span ng-show="fixr==1">设置计划开始时间</span>
							<span ng-show="fixr==2">设置计划结束时间</span>
						</div>
						<div class="close"   ng-click="reClose($event)"><i class="icon iconfont icon-shachu-xue"></i></div>
					</div>
					<div class="modal_main">
						<form  class="timeSocl">
							<div class="mout">
								<div class="timeSel">
									<label>计划时间：</label>
									<input type="text"  id="J-x3" autocomplete="off" readonly="readonly" name="time_start" ng-model="planTime" placeholder="请选择"/><i class="icon iconfont icon-riqi1 iconfontss"></i>
								</div>
								<div ng-show="fixType!=''">
									<label>修改原因：</label>
									<textarea name="remark" id="" cols="50" rows="10"  placeholder="请输入" ng-model="fixRemark"  ></textarea>
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
								<select name="" id="" ng-show="replaceDev.length>0"  ng-options="value.uid  as value.name for value in  replaceDev" ng-model="getReason" >
									<option value="">请选择</option>
								</select>
								<span  ng-show="replaceDev.length<1" class="userName" >暂无替换人员</span>
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
  })

</script>
</html>