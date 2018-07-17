var webModel = angular.module("myWeb", ['ui.bootstrap'])
    .config(function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true; 
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });
// 签名常量
const appId = '92b9c8d2b03d43b1';
const appSecret = 'k5j12p89suhqwgrn';
/*
 * 自定义方法
 */
// var Data = "data=" + JSON.stringify(defaults.data) + "&apiName=" + defaults.apiName;
//定义封装基于angular的两种ajax方法
webModel.service('httpAjax', ['$http', function ($http) {
    //第一次加载（没有动画）
    this.firstPost = function (sendData, urls,callback) {
        $http({
            url: urls,
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            withCredentials: true,
            data: sendData,
            transformRequest: function (sendData) {
                return $.param(sendData);
            }
        }).success(function (data) {
            callback(data);
        })
    }
    //普通加载（有动画）动画在postUrl.js里
    this.normalPost = function (sendData, urls,callback) {
        showLoading();
        $http({
            url: urls,
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            withCredentials: true,
            data: sendData,
            transformRequest: function (sendData) {
                return $.param(sendData);
            }
        }).success(function (data) {
            callback(data);
            endLoading();
        })
    }
}])

//     transformRequest: function (sendData) {
//         return $.param(sendData);
//     }
 // transformRequest: function (obj) {
                        //  var str = [];
                        //     for (var s in obj) {
                        //     str.push (encodeURIComponent (s) + "=" + encodeURIComponent (obj[s]));
                        //     }
                        //  return str.join ("&");
                        // },        
//封装 factory式 $HTTP
webModel.factory ('util', function ($http, $q) {
        return {
            /* HTTP请求  */ //loading==动画
            httpRequest: function (url, method, data,loading) {
                if(loading){
                    showLoading();
                    // console.log("loading...")
                }
                
                var deferred = $q.defer ();
                var promise = deferred.promise;
                if(method === 'GET'){
                    $http ({
                     method: method,
                        url:window.P_Web+url,
                        params:data,
                        withCredentials:true,
                        headers: {"content-type": "application/json;charset=UTF-8"},
                        timeout: 1000 * 10 * 6
                    }).success (function (response) {
                        checkError(response)
                        endLoading(); 
                        deferred.resolve (response);
                    }).error (function (response) {
                      //return error
                        checkError(response)
                        endLoading();
                        deferred.reject (response);
                        //$cordovaToast.showLongBottom ('网络访问超时');
                    });
                }else {

                    $http ({
                     method: method,
                        url:window.P_Web+url,
                        data:data,
                        withCredentials:true,
                        headers: {"content-type": "application/json;charset=UTF-8"},
                        timeout: 1000 * 10 * 6
                    }).success (function (response) {
                     //return success
                        checkError(response)
                        endLoading();
                        deferred.resolve (response);
                    }).error (function (response) {
                      //return error
                        checkError(response)
                        endLoading();
                        deferred.reject (response);
                        //$cordovaToast.showLongBottom ('网络访问超时');
                    });
                }
            return promise;
            }
        };
    });

/*
 * 大于max的用“...”代替，字段裁剪函数
 */
webModel.filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';
        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
});


webModel.service('setmouter',function(){
    this.getDeveloperList=function(dev){
      var devs='';
      angular.forEach(dev,function(data,index){
       devs+=data+'、';
      })
    return devs=devs.substr(0,devs.length-1);
  }
})


//发布任务
webModel.directive('modalMs', function() { 
 return { 
 restrict: 'AE', 
 template: '<div class="modal" ng-show="rele"  >'+
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
 template: '<div class="modal"ng-show="finishTime"  >'+
        '<div class="modal_body">'+
            '<div class="modal_content">'+
                '<div class="modal_contents">'+
                    '<div class="modal_title">'+
                        '<div class="leftTit">实际完成时间</div>'+
                        '<div class="close"   ng-click="reClose($event)"><i class="icon iconfont icon-shachu-xue"></i></div>'+
                    '</div>'+
                    '<div class="modal_main">'+
                        '<form id="timeSocl" class="timeSocl">'+
                            '<div class="mout" ng-if="setTextaera">'+
                                '<label>备注：</label>'+
                                '<textarea name="remark" id="" cols="50" rows="10" placeholder="请输入"></textarea>'+
                            '</div>'+
                            '<div>'+
                                '<span>是否需要测试：</span>'+
                                '<label>'+
                                '<input type="radio" name="is_test" value="1" ng-click="code=false" ng-init="code=false" ><span>是</span>'+
                               '</label>'+
                                '<label>'+
                                '<input type="radio" name="is_test" value="0" ng-click="code=true" ><span>否</span>'+
                                '</label>'+
                            '</div>'+
                            '<div ng-if="code" >'+
                                '<span>是否需要发布：</span>'+
                                '<label>'+
                                '<input type="radio" name="is_release" value="1" ><span>是</span>'+
                                '</label>'+
                                '<label>'+
                                '<input type="radio" name="is_release" value="0" ><span>否</span>'+
                                '</label>'+
                            '</div>'+
                            '<div class="but">'+
                                '<button ng-click="submits()">确定</button>'+
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
