//发布任务
webModel.directive('modalMs', function() { 
 return { 
 restrict: 'AE', 
 template:'<div class="modal" ng-show="rele"  >'+
        '<div class="modal_body">'+
            '<div class="modal_content">'+
                '<div class="modal_contents">'+
                    '<div class="modal_title">'+
                        '<div class="leftTit">发布任务</div>'+
                        '<div class="close"   ng-click="reClose($event)"><i class="icon iconfont icon-shachu-xue"></i></div>'+
                   '</div>'+
                    '<div class="modal_main">'+
                        '<form id="releases" class="timeSocl">'+
                            '<div class="mout" >'+
                                '<div class="timeSel">'+
                                    '<label>发布时间：</label>'+
                                    '<input type="text"  id="J-x8" readonly="readonly" autocomplete="off" name="release_time" ng-model="planTime" placeholder="请选择"/>'+
                                    '<i class="icon iconfont icon-riqi1 iconfontss"></i>'+
                                '</div>'+
                                '<label>备注：</label>'+
                                '<textarea name="remark" id="" cols="50" rows="10" placeholder="请输入"></textarea>'+
                            '</div>'+
                            '<div class="but">'+
                                '<button ng-click="releaseTask()">确定</button>'+
                            '</div>'+
                        '</form>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>', 
 replace: true 
 }; 
}); 

//任务完成时间
webModel.directive('taskCompletionTime', function() { 
 return { 
 restrict: 'AE', 
 scope:false,
 templateUrl:"view/actualComplete.html", 
 replace: true,
 link:function(scope, element){
            element.bind("mouseenter", function(){
                if(scope.code!=undefined){
                    angular.element(".timeSocl input[name=is_test]").eq(1).click();
                    angular.element(".timeSocl input[name=is_test]").eq(0).click();
                    scope.code=undefined;
                    angular.element(".timeSocl input[type=radio]").attr("checked",false);
                }
            })
        }
}; 
});

//添加备注
webModel.directive('taskAddRemark',function(){
    return {
        restrict:"AE",
        templateUrl:'view/addRemark.html',
        replace: true
    }
    
})
//历史备注
webModel.directive('historyRemarks',function(){
    return {
        restrict:"AE",
        templateUrl:'view/historyRemark.html',
        replace: true,
        link:function(scope,element){
            scope.addRk=function(){
                scope.fixRemarkShow=true;
                scope.editRemark='';
            }
        }
    }
    
})