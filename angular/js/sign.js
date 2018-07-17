 
 /* 签名生成	
 * kAppKey,kAppSecret为常量，
 * params，传入的参数，string || object
 * 需要借助md5.js
 * 规则：将所有参数字段按首字母排序， 拼接成key1 = value1 & key2 = value2的格式，再在末尾拼接上key = appSecret， 再做MD5加密生成sign
 */
// appId, appSecret
// function getSign(params, appId, appSecret) {
//     if (typeof params == "string") {
//         return paramsStrSort(params);
//     } else if (typeof params == "object") {
//         var arr = [];
//         for (var i in params) {
//             arr.push((i + "=" + params[i]));
//         }
//         return paramsStrSort(arr.join(("&")));
//     }
// }

// function paramsStrSort(paramsStr) {
//     // var url = paramsStr + "&appKey=" + appId;
//     // var urlStr = paramsStr.split("&").sort().join("&");
//     // var newUrl ='key='+appSecret+urlStr + '&key=' + appSecret;
    
//     return md5(paramsStr);
// }


function getSign(apiName, timestamp) {
    var paramsStr = appSecret+"apiName"+apiName+"appId" +appId+"formatjson"+"time"+timestamp+appSecret;
    return md5(paramsStr);
}
