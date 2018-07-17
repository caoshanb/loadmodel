<!DOCTYPE html>
<html lang="en" ng-app="myWeb" >
<head>
	<meta charset="UTF-8">
	<title>任务管理</title>
	<?php include $tpl_path."common/head.php"; ?>
	<script src="./js/project.js<?php echo $js_v; ?>" type="text/javascript" charset="utf-8"></script>
</head>
<body id="4" >
	<div class="tops">
		<!-- <?php include $tpl_path."common/header.php"; ?> -->
	<div  ng-include="'index.php?loadmodel=header'"></div>
	</div>
	<div ng-controller="project" ng-cloak class="project module">
		<div class="">
			<div class="promptNav">
				<a href="javascript:;">项目</a>
			</div>
			<div class="backgrounds"></div>
			<div class="planContent">
				<div class="newBut">
					<button ng-click="newProjects($event,1)" >新建项目</button>
				</div>
				<div>
					<table>
						<thead>
						<tr>
							<th>编号</th>
							<th>创建时间</th>
							<th>创建人</th>
							<th>项目名称</th>
							<th>上线时间</th>
							<th>备注</th>
							<th width="30%">系统</th>
							<th>操作</th>
							</tr>
						</thead>
						<tbody>
							<tr ng-repeat="project in projectList" ng-show="projectList!=undefined || projectList!=''">
								<td>{{project.num}}</td>
								<td>{{project.pjtime_create}}</td>
								<td>{{project.project_founder}}</td>
								<td>{{project.project_name}}</td>
								<td>{{project.pjtime_release}}</td>
								<td>{{project.remark}}</td>
								<td>
									<div class="sysWfith">
										<span  title="{{sys.sys_name}}" ng-repeat="sys in project.sys_list">{{sys.system_name}}<span ng-hide="$last">、</span></span>
									</div>
								</td>
								<td>
									<a href="javascript:;" ng-click="modifyProjects(project)" >修改</a>
									<a href="javascript:;" ng-click="removeProject(project.project_id)" >删除</a>
								</td>
							</tr>
							<tr >
								<td colspan="8" ng-show="projectList==undefined || projectList==''">暂无项目</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="foumu"  ng-show="hides" ></div>
		<div class="modal" ng-show="hides" >
			<div class="modal_body">
				<div class="modal_content">
					<div class="modal_contents">
						<div class="modal_title">
							<div class="leftTit"   >
								<span ng-show="titles==1">新建项目</span>
								<span ng-show="titles==2">修改项目</span>
							</div>
							<div class="close"   ng-click="reClose($event)"><i class="icon iconfont icon-shachu-xue"></i></div>
						</div>
						<div class="modal_main">
							<form id="timeSocl" class="timeSocl" name="newProject" >
								<div class="mout">
									<div>
										<label>项目名称：</label>
										<input type="text" name="is_test" autocomplete="off" ng-blur="a=true" required ng-model="newSystems.project_name" placeholder="请输入项目名称" >
										<span class="errorInfo" ng-show="newProject.is_test.$error.required && a">项目名称不能为空</span>
									</div>
									<div ng-if="titles==1">
										<label>系统：</label>
										<div class="systemText eve">
										  <input type="text" placeholder="请输入" autocomplete="off" name="is_p" ng-blur="verification($event)"  >
										  <span  class="errorInfo" ng-show="b" >系统不能为空</span>
										</div>
										<p style="margin-left: 102px;" ><a href="javascript:;" ng-click="addSystem()" >继续添加</a></p>
									</div>
									<div ng-show="titles==2">
										<label>系统：</label>
										<div class="systemText not">
										 <!--  <input type="text" placeholder="请输入"  name="is_p" ng-blur="verification($event)"  >
										  <span  class="errorInfo" ng-show="b" >系统不能为空</span> -->
										</div>
										<p style="margin-left: 102px;" ><a href="javascript:;" ng-click="addSystem($event)" >继续添加</a></p>
									</div>
									<div>
										<label>发布时间：</label>
										<span class="timeSel">
								            <input type="text" autocomplete="off" id="J-x6" value="" required  name="s" ng-blur="s=true" ng-model="newSystems.pjtime_release"  placeholder="请选择"/  ><i class="icon iconfont icon-riqi1 iconfontss"></i>
								            <span  class="errorInfo" ng-show="newProject.s.$error.required && s"  >发布时间不能为空</span>
					         			</span>
									</div>
									<div>
										<label>备注：</label>
										<textarea name="remark" ng-blur="e=true" required cols="50" rows="10" placeholder="请输入" ng-model="newSystems.remark"  ></textarea>
										<p style="margin-left: 102px;" ><span  class="errorInfo" ng-show="newProject.remark.$error.required && e">备注不能为空</span></p>
									</div>
	
									<div class="but" >
										<button ng-click="newProjects()" ng-show="titles==1" >确定</button>
										<button ng-click="modifyProjects()" ng-show="titles==2" >确定</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		 <pagination total-items="total || 1" ng-change="changeList(page.page_index)" ng-model="page.page_index" max-size="5"
	                            items-per-page="page.page_rows" class="pagination-sm pull-right"
	                            boundary-links="true"></pagination>
	</div>
</body>
<script>	
  	laydate({
                elem: '#J-x6',
                choose: function (dates) {
                var appElement = document.querySelector('[ng-controller=project]'),
                $scope = angular.element(appElement).scope();
                    var ends = $("#J-xl4").val(),
                        startTime = new Date(dates);
                         setTimeout(function(){
                         	$scope.$apply(function(){
                         		$scope.newSystems.pjtime_release=dates;
                         	})
                         },50)
                }
            });
</script>
</html>