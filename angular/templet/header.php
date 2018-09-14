<div class="Navigation" ng-controller="header" ng-cloak>
		<div class="logoText">
			任务管理工具
		</div>
		<ul class="nav" >
			<li ng-show="getJusr.mytask!=0"  ng-click="actives(0);getUrls($event,0)"  >
				<a href="./index.php?loadmodel=index" >我的任务</a>
			</li>
			<li  ng-show="getJusr.alltask!=0 && getJusr!=undefined"  ng-click="actives(1);getUrls($event,1)"  >
				<a href="./index.php?loadmodel=generalTask">任务总表</a>
			</li>
			<li  ng-show="getJusr.grouptasks!=0 && getJusr!=undefined"  ng-click="actives(2);getUrls($event,2)" >
				<a href="./index.php?loadmodel=groupTask">小组任务</a>
			</li>
			<!-- <li  ng-show="getJusr.grouptask!=0 && getJusr!=undefined"  ng-click="actives(3);getUrls($event,3)" >
				<a href="./index.php?loadmodel=teamTask">组员任务</a>
			</li> -->
			<li  ng-show="getJusr.project!=0 && getJusr!=undefined"  ng-click="actives(3);getUrls($event,3)" >
				<a href="./index.php?loadmodel=project">项目</a>
			</li>
			<li  ng-show="getJusr.auth_user!=0 && getJusr!=undefined"  ng-click="actives(4);getUrls($event,4)">
				<a href="./index.php?loadmodel=userAdmin">用户管理</a>
			</li>
		</ul>
		<ul class="userNav">
			<li class="fonts"></li>
			<li ng-click="userInfo()"  class="userInfo">
				<i class="icon iconfont icon-icon"></i>
				<span title="{{names}}" style="min-width:50px;display: inline-block;">
					{{names | cut:false:5:'...'}}
				</span>
				<ul ng-show="hideUserInfo">
					<span class="u-tri"></span>
					<li>账号：{{userInfos.user_account | cut:false:12:'...' }}</li>
					<li>用户：{{userInfos.user_name | cut:false:4:'...'}}</li>
					<li class="modifyPwd"><a href="javascript:;" ng-click="modifyPwd($event)" >修改密码</a></li>
					<li class="liBor">&nbsp;</li>
					<li >
						<span ng-show="userInfos.agent!=null"> 代理人：{{userInfos.agent | cut:false:4:'...'}}<a href="javascript:;" class="cancel" ng-click="cancelAgent($event)" >取消</a></span>
						<span ng-show="userInfos.agent==null"> 代理人：无<a href="javascript:;" class="cancel" ng-click="showAgents($event)" >设置</a></span>
					</li>
				</ul>
				
			</li>
			<li><i class="icon iconfont icon-tuichu2" ng-click="logout()"></i></li>
		</ul>
		<p style="clear:both"></p>
		<div ng-class="{true:'hides',false:''}[notShow]"  ng-click="notAs()"   ></div>
		<div class="agents" ng-show="agent" >
			<div class="titles">
				<div class="AlTitle">设置代理人</div>
				<div class="closer" ng-click="close()" ><i class="icon iconfont icon-shachu-xue"></i></div>
				<div style="clear:both"></div>
			</div>
			<div>
				<form  name="setAgentList" id="setAgentList">
					<p>
						<label>代理人</label>
						<select name="" id="" ng-options="value.tid as value.name for value in groupMember"
						 name="user_account" ng-model="userName"   >
							<option value="">请选择代理人</option>	
						</select>
					</p>
					<p class="timeSelect">
						<label>设置时间</label>
		                    <input type="text" autocomplete="off" id="J-xl" readonly="readonly" value="" name="agent_start_time" placeholder="请选择"/><i class="icon iconfont icon-riqi1 iconfontss"></i>
		                    <span> 至 </span>
		                    <input type="text" autocomplete="off" id="J-xl2" readonly="readonly" value=""  name="agent_end_time"  placeholder="请选择"/><i class="icon iconfont icon-riqi1 iconfontss"></i>
					</p>
					<p class="confirms" ><button ng-click="setAgent()" >确定</button></p>
				</form>
			</div>
		</div>
		<div class="agents modifyPassword" style="height:350px;width:400px" ng-show="setPassword" >
			<div class="titles">
				<div class="AlTitle">修改密码</div>
				<div class="closer" ng-click="close()" ><i class="icon iconfont icon-shachu-xue"></i></div>
				<div style="clear:both"></div>
			</div>
			<div>
				<form  name="setPwdList" id="setPasswordList" novalidate  >
					<p style="margin-top: 20px;">
						<label>旧密码：</label> 
						<input type="password" required   name="Old" placeholder="请输入" ng-blur="oidPwd=true"  ng-model="pwdList.old_password" >
						<br/><span  class="errorInfo paddings" ng-show="setPwdList.Old.$error.required && oidPwd">旧密码不能为空</span>
					</p>
					
					<p class="timeSelect">
						<label>新密码：</label>   
						<input type="password" name="new"  required placeholder="请输入" ng-blur="newPwd=true" ng-minlength="6"  ng-model="pwdList.new_password" >
		 				<br/><span  class="errorInfo paddings" ng-show="setPwdList.new.$error.required && newPwd">新密码不能为空</span>
							<span class="errorInfo paddings" ng-show="setPwdList.new.$error.minlength && newPwd">新密码最少为6位数</span>
					</p>
					
					<p class="timeSelect">
						<label>确认密码：</label> 
						<input type="password" name="repeatPwd" required placeholder="请输入" ng-minlength="6" ng-blur="repeatPwds=true" ng-model="pwdList.re_password" >
						<br/><span class="errorInfo paddings" ng-show="setPwdList.repeatPwd.$error.required && repeatPwds">确认密码不能为空</span>
							<span  class="errorInfo paddings" ng-show="!setPwdList.repeatPwd.$error.required && setPwdList.repeatPwd.$dirty  && repeatPwds && pwdList.new_password != pwdList.re_password">两次密码不一致</span>
					</p>
					
					<p class="confirms" ><button  ng-click="modifyPwd()" >确定</button></p>
				</form>
			</div>
		</div>
</div>
<script>
	$(document).ready(function(){
		         laydate({
                elem: '#J-xl',
                choose: function (dates) {
                    var ends = $("#J-xl2").val(),
                        startTime = new Date(dates);
                    if (ends != "" && ends != undefined) {
                        endTime = new Date(ends);
                        if (Date.parse(startTime) > Date.parse(endTime)) {
                        	
                            $.alerts({
                                msg: "结束时间必须大于开始时间"
                            });
                            $(".timeSelect input[type=text]").val("");
                        }
                    }
                }
            });
            laydate({
                elem: '#J-xl2',
                choose: function (dates) {
                    var starts = $("#J-xl").val(),
                        endTime = new Date(dates);
                    if (starts != "" && starts != undefined) {
                        startTime = new Date(starts);
                        if (Date.parse(startTime) > Date.parse(endTime)) {
                        	
                            $.alerts({
                                msg: "结束时间必须大于开始时间"
                            });
                            $(".timeSelect input[type=text]").val("");
                        }
                    }
                }
            });
	})
</script>