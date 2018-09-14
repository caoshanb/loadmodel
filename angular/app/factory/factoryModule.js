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