<!DOCTYPE html>
<html lang="en" ng-app="myWeb" >
<head>
	<meta charset="UTF-8">
	<META HTTP-EQUIV="pragma" CONTENT="no-cache">
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate">
	<META HTTP-EQUIV="expires" CONTENT="0">
	<title>中国联保研发任务管理平台</title>
	<?php include $tpl_path."common/head.php"; ?>
	<script src="./js/userAdmin.js<?php echo $js_v; ?>" type="text/javascript" charset="utf-8"></script>
</head>
<body id="4" >
	<div class="tops">
		<!-- <?php include $tpl_path."common/header.php"; ?> -->
	<div  ng-include="'index.php?loadmodel=header'"></div>
	</div>
	<div ng-controller="userAdmin" ng-cloak class="userAdmin module">
		<div class="">
			<div class="promptNav">
				<a href="javascript:;">用户管理</a>
			</div>
			<div class="backgrounds"></div>
			<div class="planContent">
				<div class="newBut">
					<button ng-click="setUser()" >新建用户</button>
				</div>
				<div>
					<table>
						<thead>
						<tr>
							<th>编号</th>
							<th>用户名</th>
							<th>姓名</th>
							<th>职位</th>
							<th width="25%">所属小组</th>
							<th>建账号时间</th>
							<th>最后登录时间</th>
							<th width="18%">操作</th>
						</tr>
						</thead>
						<tbody>
							<tr ng-repeat="user in userList" ng-show="userList!=undefined || userList!=''">
								<td>{{user.num}}</td>
								<td>{{user.user_account}}</td>
								<td>{{user.user_name}}</td>
								<td>{{user.position}}</td>
								<td>
									<span ng-repeat="us in  user.group_name track by $index" >
										{{us}}<span ng-show="!$last">、</span>
									</span>
								</td>
								<td>{{user.create_time}}</td>
								<td>
									<span ng-show="user.last_login_time!='' || user.last_login_time!=undefined" >{{user.last_login_time}}</span>
									<span ng-show="user.last_login_time=='' || user.last_login_time==undefined " >暂无</span>
								</td>
								
								<td>

									<a href="javascript:;" ng-show="user.status==1||user.status==null" ng-click="disableUser(user.user_account,1)" >禁用</a>
									<a href="javascript:;" ng-show="user.status==0" ng-click="disableUser(user.user_account,0)" >启用</a>
									<a href="javascript:;" ng-click="setJurisdiction(user.uid)" >权限</a>
									<a href="javascript:;" ng-click="resetPassWord(user.user_account)" >重置密码</a>
									<a href="javascript:;" ng-click="setUser(user)"  >修改</a>
								</td>
							</tr>
							<tr >
								<td colspan="8" ng-show="userList==undefined || userList==''">暂无项目</td>
							</tr>
						</tbody>
					</table>
				</div>
				 <pagination total-items="total || 1" ng-change="changeList(page.page_index)" ng-model="page.page_index" max-size="5"
	                            items-per-page="page.page_rows" class="pagination-sm pull-right"
	                            boundary-links="true"></pagination>
			</div>
		</div>
		<div class="foumu"  ng-show="newUsers || jurisdiction || resetPwd || replacement" ></div>
		<div class="modal" ng-show="newUsers" >
			<div class="modal_body">
				<div class="modal_content">
					<div class="modal_contents modal_contentWidth">
						<div class="modal_title">
							<div class="leftTit"   >
								<span ng-if="!modifyUser" >新建用户</span>
								<span ng-if="modifyUser">修改用户信息</span>
							</div>
							<div class="close"   ng-click="reClose($event)"><i class="icon iconfont icon-shachu-xue"></i></div>
						</div>
						<div class="modal_main">
							<form id="timeSocl" class="timeSocl" name="newUserLists" >
								<div class="mout modal_our">
									<div >
										<label>用户名：</label>
										<span ng-if="modifyUser"  class="editUserInfo" >{{editUser.user_account}}</span>
										<input ng-if="!modifyUser" type="text" name="is_user" autocomplete="off"  autocomplete="off" ng-blur="isUser=true" required ng-model="newUserList.user_account" placeholder="请输入用户名" >
										<span  ng-if="!modifyUser" class="error"><span class="errorInfo" ng-show="newUserLists.is_user.$error.required && isUser">用户名不能为空</span></span>
									</div>
									
									<!-- <div>
										<label>登录密码：</label>
										<input type="text" name="is_pwd" autocomplete="off" onfocus="this.type='password'" autocomplete="off" ng-blur="isPwd=true" required ng-model="newUserList.password" placeholder="请输入密码" >
										<span class="error"><span class="errorInfo" ng-show="newUserLists.is_pwd.$error.required && isPwd">登录密码不能为空</span></span>
									</div> -->
									<div>
										<label>姓名：</label>
										<input ng-if="modifyUser" type="text" name="is_name" autocomplete="off" ng-blur="isName=true" required ng-model="editUser.user_name" placeholder="请输入姓名" >
										<input ng-if="!modifyUser"  type="text" name="is_name" autocomplete="off" ng-blur="isName=true" required ng-model="newUserList.user_name" placeholder="请输入姓名" >
										<span class="error" ><span class="errorInfo" ng-show="newUserLists.is_name.$error.required && isName">姓名不能为空</span></span>
									</div>
									<div>
										<label>职位：</label>
										<input ng-if="modifyUser" type="text" name="is_obj" autocomplete="off" ng-blur="isObj=true" required ng-model="editUser.position" placeholder="请输入职位" >
										<input ng-if="!modifyUser" type="text" name="is_obj" autocomplete="off" ng-blur="isObj=true" required ng-model="newUserList.position" placeholder="请输入职位" >
										<span class="error"><span class="errorInfo" ng-show="newUserLists.is_obj.$error.required && isObj">职位名称不能为空</span></span>
									</div>
									<div>
										<label>所属小组：</label>
										<div class="attributeGroup">
											<span ng-repeat="group in getGroupList" ng-if="modifyUser">
												<label><input type="checkbox"  name="groupBox" 
												 ng-checked="isCheckedo(group.gid)" ng-click="so($event,group.gid)"/>{{group.name}}
												</label>

											</span>
											<span ng-repeat="group in getGroupList" ng-if="!modifyUser">
												<label><input type="checkbox"  name="groupBox" 
												   ng-click="so($event,group.gid)" />{{group.name}}
												</label>

											</span>
										</div>
									</div>
									<div class="but" >
										<button  ng-if="!modifyUser"  ng-click="setNewUser()"  >确定</button>
										<button ng-if="modifyUser" ng-click="modifyUserInfo()"  >确定</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 权限 -->
		<div class="modal" ng-show="jurisdiction" >
			<div class="modal_body">
				<div class="modal_content">
					<div class="modal_contents">
						<div class="modal_title">
							<div class="leftTit"   >
								<span>设置权限</span>
							</div>
							<div class="close"   ng-click="reClose($event)"><i class="icon iconfont icon-shachu-xue"></i></div>
						</div>
						<div class="modal_main">
							<form  class="timeSocl" id="jurisdictions" >
								<div class="mout jurisdictions">
										<div class="optionTitle"><label for="">权限项：</label></div>
										<div class="options">
											<ul>
												<li class="nth-child">
													<label  ><input type="checkbox" disabled ng-click="adChecked($event,ns.as)" value="0" name="mytask"  >我的任务</label>
													<p><label ><input type="checkbox" disabled ng-click="adChecked($event,ns.ao)" value="1" name="mytask"   >查看</label>
													   <label ><input type="checkbox" disabled ng-click="adChecked($event,ns.al)" value="2" name="mytask"  >编辑</label>
													</p>
													
												</li>
												<li>
													<label  ><input type="checkbox" ng-click="adChecked($event,ns.as)" value="0" name="alltask"  >任务总表</label>
													<p><label ><input type="checkbox" ng-click="adChecked($event,ns.ao)" value="1" name="alltask"   >查看</label>
													   <label ><input type="checkbox"  ng-click="adChecked($event,ns.al)" value="2" name="alltask"  >编辑</label>
													</p>
												</li>
												<li>
													<label  ><input type="checkbox" ng-click="adChecked($event,ns.as)" value="0" name="grouptasks"  >小组任务</label>
													<p><label ><input type="checkbox" ng-click="adChecked($event,ns.ao)" value="1" name="grouptasks"   >查看</label>
													   <label ><input type="checkbox"  ng-click="adChecked($event,ns.al)" value="2" name="grouptasks"  >编辑</label>
													</p>
												</li>
												<li>
													<label  ><input type="checkbox" ng-click="adChecked($event,ns.as)" value="0" name="grouptask"  >组员任务</label>
													<p><label ><input type="checkbox" ng-click="adChecked($event,ns.ao)" value="1" name="grouptask"   >查看</label>
													   <label ><input type="checkbox"  ng-click="adChecked($event,ns.al)" value="2" name="grouptask"  >编辑</label>
												</li>
												<li>
													<label  ><input type="checkbox" ng-click="adChecked($event,ns.as)" value="0" name="project"  >项目</label>
													<p><label ><input type="checkbox" ng-click="adChecked($event,ns.ao)" value="1" name="project"   >查看</label>
													   <label ><input type="checkbox"  ng-click="adChecked($event,ns.al)" value="2" name="project"  >编辑</label>
													</p>
												</li>
												<li>
													<label  ><input type="checkbox" ng-click="adChecked($event,ns.as)" value="0" name="auth_user"  >用户管理</label>
													<p><label ><input type="checkbox" ng-click="adChecked($event,ns.ao)" value="1" name="auth_user"   >查看</label>
													   <label ><input type="checkbox"  ng-click="adChecked($event,ns.al)" value="2" name="auth_user"  >编辑</label>
													</p>
												</li>
											</ul>
											
										</div>
									<div class="but" >
										<button ng-click="getJurisdictions()"  >确定</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 重置密码 -->
		<div class="modal" ng-show="resetPwd" >
			<div class="modal_body">
				<div class="modal_content">
					<div class="modal_contents newPwdr">
						<div class="modal_title">
							<div class="leftTit"  >
								<span>重置密码</span>
							</div>
							<div class="close"   ng-click="reClose($event)"><i class="icon iconfont icon-shachu-xue"></i></div>
						</div>
						<div class="modal_main">
							<form  class="timeSocl"  name='resetPwdList' >
								<div class="mout ">
										<div>
											<label >密码：</label>
											<input type="password" name="is_pwd" required placeholder="请输入密码"  ng-blur="isPwdR=true" ng-model="resetPassWords.new_password"  >
											<span class="error"><span class="errorInfo" ng-show="resetPwdList.is_pwd.$error.required && isPwdR">密码不能为空</span></span>
										</div>
										<div>
											<label >确认密码：</label>
											<input type="password" name="is_confirmPwd" placeholder="请输入确认密码" ng-blur="isConfirmPwd=true" required ng-model="resetPassWords.re_password"   >
											<span class="error">
												<span class="errorInfo" ng-show="resetPwdList.is_confirmPwd.$error.required && isConfirmPwd">确认密码不能为空</span>
												<span class="errorInfo" ng-show="!resetPwdList.is_confirmPwd.$error.required &&resetPassWords.new_password!=resetPassWords.re_password && isConfirmPwd">两次输入密码不一致</span>
											</span>
											
										</div>
									<div class="but" >
										<button ng-click="resetPassWord()"  >确定</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 替换分组 -->
		<div class="modal" ng-show="replacement" >
			<div class="modal_body">
				<div class="modal_content">
					<div class="modal_contents newPwdr">
						<div class="modal_title">
							<div class="leftTit"  >
								<span>修改分组</span>
							</div>
							<div class="close"   ng-click="reClose($event)"><i class="icon iconfont icon-shachu-xue"></i></div>
						</div>
						<div class="modal_main">
							<form  class="timeSocl"  name="groupNameList" >
								<div class="mout ">
										<div>
											<label >原所属分组：</label>
											<span class="groupName">{{groupName}}</span>
										</div>
										<div>
											<label >替换分组：</label>
											<select  name="groupNames"  ng-blur="groupNames=true" ng-model="replaceGroup"  required ng-options="v.gid as v.name for v in getGroupList"  >
												<option value="">请选择分组</option>
											</select>
											<span class="error"><span class="errorInfo" ng-show="groupNameList.groupNames.$error.required && groupNames">替换分组不能为空</span></span>
										</div>
									<div class="but" >
										<button ng-click="replacementGrouping()"  >确定</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>

</html>