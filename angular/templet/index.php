<!DOCTYPE html>
<html lang="en" ng-app="myWeb" >
<head>
	<meta charset="UTF-8">
	<title>任务管理</title>
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
				<a  href="./index.php?loadmodel=index" >我的任务1232</a>
				<i class="icon iconfont icon-iconfontjiantou3" style="font-size:14px"></i>
				<span >{{projcetUrl.nameCode}}</span>
			</div>
			<div style="display:none">123</div>
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
						         			<select name=""   ng-model="task_statu" >
						         				<option value="" >请选择进度</option>
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
					         			<input type="radio" name="state" value="3" ng-click="ckNull()" ng-checked="alls">
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
					         				<input type="text" value="" autocomplete="off" placeholder="搜索..."  ng-model="taskSearch">
					         				&nbsp;&nbsp;&nbsp;<button ng-click="search()" >查找</button>
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
						             <td title="{{myAk.task_name}}">{{myAk.task_name | cut:true:10:'...'}}</td>
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
						             	class="notStart" ng-click="end(myAk.mytask_id,myAk.time_end_schedule,myAk.handle_type)" >结束</span>
						             	<span ng-show="myAk.time_end!='' && myAk.time_start!=''&& myAk.time_start_schedule!='' && myAk.time_end_schedule!=''  ">
						             		{{myAk.time_end}}
						             	</span>
						             </td>
						             <td>
						             	<span ng-show="myAk.can_release==0 && myAk.time_release=='' && myAk.time_end_schedule!='' ">计划{{myAk.time_end_schedule}}</span>
						             	<span ng-show="myAk.time_release!='' && myAk.time_end_schedule!='' ">{{myAk.time_release}}</span>
						             	<!-- <span ng-show="myAk.can_release==1 && myAk.time_release=='' && myAk.time_start!='' && myAk.time_end!=''" 
						             	 class="notStart" ng-click="releaseTask(myAk.id,myAk.is_plan)" >发布</span> -->
						             </td>
						             <td title="{{myAk.remark}}">{{myAk.remark | cut:true:8:'...'}}</td>
						             <td>
						             	<span class="span" ng-show="myAk.is_plan==undefined|| myAk.is_plan==0"> 计划</span>
							            <a ng-show="myAk.is_plan!=undefined && myAk.is_plan==1" href="./index.php?loadmodel=myMissionPlan&xid={{myAk.id}}&auth_type=2&myTask=0">计划</a>
						             	<a  href="./index.php?loadmodel=taskDetails&xid={{myAk.id}}&auth_type=2&myTask=0">详情</a>
						             	<!-- <a href="javascript:;" ng-click="removeMyAk(myAk.id,myAk.is_plan)" >删除</a> -->
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