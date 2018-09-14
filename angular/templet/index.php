<!DOCTYPE html>
<html lang="en" ng-app="myWeb" >
<head>
	<meta charset="UTF-8">
	<META HTTP-EQUIV="pragma" CONTENT="no-cache">
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate">
	<META HTTP-EQUIV="expires" CONTENT="0">
	<title>中国联保研发任务管理平台</title>
	<?php include $tpl_path."common/head.php"; ?>
	<script src="./js/index.js<?php echo $js_v; ?>" type="text/javascript" charset="utf-8"></script>
</head>
<body id="0" >
	<div class="tops">
		<!-- <?php include $tpl_path."common/header.php"; ?>  -->
	<div  ng-include="'index.php?loadmodel=header'"></div>
	</div>
	<div ng-controller="indexs" ng-cloak class="indexs module">
		<div class="index">
			<div class="promptNav">
				<div class="NavSele">
					<dl>
					    <dd>
					        <div class="sysmentList" ng-click="moduleSelect($event)" data-ment="1" >
					        	<span class="navMenu">
					        		<span>{{systemtType.project_name | cut:false:8:' '}}
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
					</dl>
				</div>
				<div class="navRight">
				</div>
			</div>
			<div class="content">
				 <div class="wrap">
			       <ul class="blsit-list"> 
			         <li>
			         	<form  id="taskList" class="screenList" >
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
					         			<input type="text" value="" placeholder="需求人、审批编号、任务名称..." 
					         			 ng-model="taskSearch" style="width:235px">
					         				&nbsp;&nbsp;&nbsp;<button ng-click="search()" >搜索</button>	
					         		</dd>
				         		</dl>
				         	</div>
				         	<div class="bommit">
				         		<table width="100%" class="table">  
						        <thead>  
						            <tr>  
						                <th>编号</th>  
						                <th>优先级</th>
						                <th>接收时间</th>
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
						                <th>操作</th>
						            </tr>  
						        </thead>  
						        <tr ng-hide="MyAkList=='' || blsit" ng-repeat="myAk in MyAkList" >
						        	 <td>{{myAk.num}}</td>  
						             <td>{{myAk.priority}}</td>
						             <td>{{myAk.time_receive}}</td>
						             <td>{{myAk.applicant}}</td>
						             <td>{{myAk.approve_no}}</td>
						             <td>{{myAk.task_type}}</td>
						             <td style="width:180px"><span class="remarkLength">{{myAk.task_name}}</span></td>
						             <td>{{myAk.task_process}}</td>
						             <td>{{myAk.consume_days}}</td>
						             <td>{{myAk.time_start_schedule}}</td>
						             <td>{{myAk.time_end_schedule}}</td>
						             <td>
						             	<span ng-show="myAk.time_start=='' && myAk.time_start_schedule!='' && myAk.time_end_schedule!='' && myAk.is_plan!=1" 
						             	class="notStart"  ng-click="beginTime(myAk.mytask_id,myAk.handle_type)" >开始</span>
						             	<span ng-show="myAk.time_start!=''  && myAk.time_start_schedule!='' && myAk.time_end_schedule!='' ">
						             		{{myAk.time_start}}
						             	</span>
						             </td>
						             <td>
						             	<span ng-show="myAk.time_end==''&& myAk.time_start!=''&& myAk.time_start_schedule!='' && myAk.time_end_schedule!='' && myAk.is_plan!=1" 
						             	class="notStart" ng-click="end(myAk.mytask_id,myAk.time_end_schedule,myAk.handle_type,myAk.is_test_dev,myAk.is_ui_dev)" >结束</span>
						             	<span ng-show="myAk.time_end!='' && myAk.time_start!=''&& myAk.time_start_schedule!='' && myAk.time_end_schedule!=''  ">
						             		{{myAk.time_end}}
						             	</span>
						             </td>
						             <td>
						             	<span ng-show="myAk.can_release==0 && myAk.time_release=='' && myAk.time_end_schedule!='' && myAk.task_process.length<7">计划{{myAk.time_end_schedule}}</span>
						             	<span ng-show="myAk.time_release!='' && myAk.time_end_schedule!='' ">{{myAk.time_release}}</span>
						             	<span ng-show="myAk.time_release=='' && myAk.is_released==0 && myAk.task_process.length==7"></span>
						             </td>
						             <td title="{{myAk.remark}}">{{myAk.remark | cut:false:8:'...'}}</td>
						             <td>
						             	<span class="span" ng-show="myAk.is_plan==undefined|| myAk.is_plan==0"> 计划</span>
							            <a ng-show="myAk.is_plan!=undefined && myAk.is_plan==1" 
							             target="./index.php?loadmodel=myMissionPlan&xid={{myAk.id}}&auth_type=2&myTask=0" 
							             href="./index.php?loadmodel=myMissionPlan&xid={{myAk.id}}&auth_type=2&myTask=0">计划</a>
						             	<a  target="./index.php?loadmodel=taskDetails&xid={{myAk.id}}&auth_type=2&myTask=0" 
						             	href="./index.php?loadmodel=taskDetails&xid={{myAk.id}}&auth_type=2&myTask=0">详情</a>
						             </td> 
						        </tr>  
						         <tr ng-show="MyAkList==''||MyAkList==undefined">
						        	<td colspan="16">暂无任务</td>
						        </tr>
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
	<div class="foumu"  ng-show="finishTime || rele" ng-init="hides=false"></div>

	<!-- 实际完成时间 -->
	<task-completion-time  ></task-completion-time>
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
    })
	 function changSel(t){
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