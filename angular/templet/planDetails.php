<!DOCTYPE html>
<html lang="en" ng-app="myWeb" >
<head>
	<meta charset="UTF-8">
	<title>任务管理</title>
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
				<a href="./index.php?loadmodel={{urlr.url}}">{{urlr.text}}</a>
				<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
				<a   href="./index.php?loadmodel={{urlr.url}}&dat={{projcetUrl.zid}}"  >{{projcetUrl.nameCode}}</a>
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
			<div class="backgrounds"></div>
			<div class="planContent">
				<div class="but">
					<button   ng-class="{true:'butDisabled',false:''}[myTask!=undefined]"  ng-disabled="myTask" class="left"  ng-click="newTask()">新建</button>
					<button  ng-show="myTask!=undefined" class="right" ><a href="./index.php?loadmodel=reviseHistory&xid={{xid}}&planId={{planId}}&auth_type={{auth_type}}&myTask=0">修改历史</a></button>
					<button  ng-show="myTask==undefined" class="right" ><a href="./index.php?loadmodel=reviseHistory&xid={{xid}}&planId={{planId}}&auth_type={{auth_type}}">修改历史</a></button>
				</div>
				<div>
					<table>
						<thead>
							<tr>
								<th>编号</th>
								<th>任务模块</th>
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
							<tr ng-repeat="modular in modularList" ng-show="modularList!='' || modularList!= undefined">
								<td><input type="checkbox"  vlaue="{{modular.mid}}"  
									ng-class="{true:'boxDisabled',false:''}[(myTask!=undefined && modular.is_mine!=1) ]" 
								 	ng-disabled="myTask!=undefined && modular.is_mine!=1"  
									ng-checked="isSelected(modular.mid)" ng-model="boxnot" 
									ng-click="updateSelection($event,modular.mid)" >{{modular.num}}</td>
								<td title="{{modular.module_name}}" >{{modular.module_name | cut:true:10:'...' }}</td>
								<td>
									{{modular.module_process}}
								</td>
								<td>
									<span ng-show="(myTask==undefined) || (myTask!=undefined && modular.is_mine==1)" >
										<span ng-show="modular.mtime_schedule_start==''" >
											<a href="javascript:;" ng-click="setTime(modular.mid,1)" >请设置</a>
										</span>
										<a href="javascript:;" ng-show="modular.mtime_schedule_start!=''" 
										ng-click="fixTimes(modular.mid,10)">{{modular.mtime_schedule_start}}</a>
									</span>
									<span ng-show="myTask!=undefined && modular.is_mine==0">
										{{modular.mtime_schedule_start}}
									</span>
								</td>
								<td>
									<span ng-show="(myTask==undefined) || (myTask!=undefined && modular.is_mine==1)" >
										<span ng-show="modular.mtime_schedule_end==''" ><a href="javascript:;" ng-click="setTime(modular.mid,2)" >请设置</a></span>
										<a href="javascript:;" ng-click="fixTimes(modular.mid,11)" ng-show="modular.mtime_schedule_end!=''" >{{modular.mtime_schedule_end}}</a>
									</span>
									<span ng-show="myTask!=undefined && modular.is_mine==0">
										{{modular.mtime_schedule_end}}
									</span>
								</td>
								<td>
									<span ng-show="(myTask==undefined) || (myTask!=undefined && modular.is_mine==1)">
										<span ng-show="modular.mtime_start=='' &&modular.mtime_schedule_start!=''&& modular.mtime_schedule_end!=''"
										 class="notStart"  ng-click="beginTime(modular.mid)" >开始</span>
							            <span ng-show="modular.mtime_start!='' &&modular.mtime_schedule_start!=''&& modular.mtime_schedule_end!=''" >
							            	<a href="javascript:;" ng-click="fixTimes(modular.mid,8)">{{modular.mtime_start}}</a>
							            </span>
									</span>
									<span ng-show="myTask!=undefined && modular.is_mine==0">
										{{modular.mtime_start}}
									</span>
								</td>
								<td>
									<span>
										<span ng-show="(myTask==undefined) || (myTask!=undefined && modular.is_mine==1)">
											<span ng-show="modular.mtime_schedule_start!=''&& modular.mtime_schedule_end!='' && modular.mtime_end==''&& modular.mtime_start!=''" 
											class="notStart" ng-click="end(modular.mid,modular.mtime_schedule_end)" >结束</span>
								            <span ng-show="modular.mtime_schedule_start!=''&& modular.mtime_schedule_end!='' && modular.mtime_end!=''&& modular.mtime_start!=''">
								            	<a href="javascript:;" ng-click="fixTimes(modular.mid,9)">{{modular.mtime_end}}</a>
								            </span>
							            </span>
						            </span>
						            <span ng-show="myTask!=undefined && modular.is_mine==0">
						            	{{modular.mtime_end}}
						            </span>
								</td>
								<td title="{{modular.remark}}" >
									<span  ng-show="(myTask==undefined) || (myTask!=undefined && modular.is_mine==1)">
										<a href="javascript:;" ng-click="subFixRemark(modular.mid,modular.remark)" >
										{{modular.remark | cut:true:8:'...'}}</a>
									</span>
									<span  ng-show="myTask!=undefined && modular.is_mine==0">
										{{modular.remark | cut:true:8:'...'}}
									</span>
								</td>
								<td>
									<span ng-show="(myTask==undefined) || (myTask!=undefined && modular.is_mine==1)">
										<a href="javascript:;"   
										 ng-click="replaceStaff(modular.mid,modular.developer.name,modular.developer.id)" >
										{{modular.developer.name}}
										</a>
									</span>
									<span ng-show="myTask!=undefined && modular.is_mine==0">
										<span  >
											{{modular.developer.name}}
										</span>
									</span>
								</td>
							</tr>
							<tr ng-show="modularList=='' || modularList== undefined">
								<td colspan="9">暂无任务</td>
							</tr>
						</tbody>
					</table>
					<div class="checkAll"  >
						<button  ng-class="{true:'butDisabled',false:''}[myTask!=undefined]"  ng-disabled="myTask"  ng-click="checkAlls(modularList)">全选</button>
						<button  ng-class="{true:'butDisabled',false:''}[myTask!=undefined]"  ng-disabled="myTask"  ng-click="notCheck()">反选</button>
						<button  ng-click="removeModular()" >删除</button>
					</div>
				</div>

				<pagination total-items="total || 1" ng-change="changeList(page.page_index)" ng-model="page.page_index" max-size="5"
	                            items-per-page="page.page_rows" class="pagination-sm pull-right"
	                            boundary-links="true"></pagination>
			</div>
		</div>
	<div class="foumu"  ng-show="hides || solo||setActualTime ||fixRemarkShow || replaceCo ||shows" ng-init="hides=false"></div>
	<div class="modal"ng-show="hides==true"  >
		<div class="modal_body">
			<div class="modal_content">
				<div class="modal_contents">
					<div class="modal_title">
						<div class="leftTit"  >新建模块</div>
						<div class="close"   ng-click="reClose($event)"><i class="icon iconfont icon-shachu-xue"></i></div>
					</div>
					<div class="modal_main">
						<form  class="timeSocl">
							<div class="mout">
								<div>
									<label>任务模块：</label>
									<input type="text" name="is_test" autocomplete="off"  class="maxInput"  ng-model="moduleName" placeholder="请输入任务模块名称" >
								</div>
								<div >
									<label>进度：</label>
									<select name=""  ng-model="process" >
										<option value="" >请选择进度</option>
										<option value="1">未开始</option>
										<option value="2">开发中</option>
										<option value="3">已完成</option>
									
									</select>
								</div>
								<div>
									<label>参与人员：</label>
									<select name="" id="" ng-options="value.uid  as value.user_name for value in  userList"  ng-model="developer" >
										<option value="" >请选择</option>
									</select>
								</div>
								<div>
									<label>备注：</label>
									<textarea name="remark" id="" cols="50" rows="10" placeholder="请输入" ng-model="newRemark"  ></textarea>
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
									<input type="text"  id="J-x3" autocomplete="off" name="time_start" ng-model="planTime" placeholder="请选择"/><i class="icon iconfont icon-riqi1 iconfontss"></i>
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
							<span >实际完成时间</span>
						</div>
						<div class="close"   ng-click="reClose($event)"><i class="icon iconfont icon-shachu-xue"></i></div>
					</div>
					<div class="modal_main">
						<form  class="timeSocl">
							<div class="mout"  ng-if="setTextaera">
								<label>备注：</label>
								<textarea name="remark" id="" cols="50" rows="10" placeholder="请输入" ng-model="$parent.textarea" ></textarea>
							</div>
								<div >
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
								<select name="" id="" ng-show="replaceUser.length>0"  ng-options="value.uid  as value.user_name for value in  replaceUser" ng-model="getReason" >
									<option value="">请选择</option>
								</select>
								<span  ng-show="replaceUser.length<1" class="userName" >暂无替换人员</span>
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
  })
</script>
</html>