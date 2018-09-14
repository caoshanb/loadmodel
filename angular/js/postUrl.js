window.P_Off = 1;

// 登录
window.LOGIN_URL = "./index.php?loadmodel=login";
function checkError(response) {
    switch (response.status) {
        //登录超时
        case 11:
            $.alerts({
                msg:response.message
            })
            setTimeout(function(){
                window.location.href="./index.php?loadmodel=login"
            },600)
            break;
        //用户未登录
        case 12:
             setTimeout(function(){
                window.location.href="./index.php?loadmodel=login"
            },600)
            break;
        //未知模块
        case 13:
            $.alerts({
                msg:response.message
            })
            
            setTimeout(function(){
                var urlr=getStorage("urlr");
                if(urlr){
                    window.location.href="./index.php?loadmodel="+urlr.url
                }else{
                   window.location.href="./index.php?loadmodel=index"  
                }  
            },1000) 
            break;
    }
   
}

function getStorage(o){
    var info=localStorage.getItem(o);
    var data=eval( '('+info+')' );

    return data;
}

function setStorage(u,info){
   localStorage.setItem(u,info);
}


//下载
function downloadfile(filepath) {
    var iframe = document.createElement("iframe");
    iframe.src =filepath;
    iframe.style.display = "none";
    document.body.appendChild(iframe);
}
//显示动画
var showLoading = function () {
    var str = '<div id="lodingBox"><img src="image/loadingr.gif" width="100px"/></div>';
         $("body").append(str);
}
//停止动画
var endLoading = function () {
    setTimeout(function () {
        $("#lodingBox").remove();
    }, 400) //最少0.2秒
    //  $("#lodingBox").remove();
}

/*
 * 禁用回车键统一调用此方法
 */
function checkkey(keys){
    if(keys && keys.keyCode == 13){
        keys.returnValue = false;
    }
}

/*
 * 获取url里的？后面的参数
 */
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function getUrl() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest =null;
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strso = str.split("loadmodel");
       var substrs=strso[1].split("=")[1];
       substrs=substrs.split("&");
       theRequest=substrs[0];
    }
    return theRequest;
}
/*
 * 读取cookies
 */
function getcookie(objname) { //获取指定名称的cookie的值
    var arrstr = document.cookie.split("; ");
    for (var i = 0; i < arrstr.length; i++) {
        var temp = arrstr[i].split("=");
        if (temp[0] == objname) return unescape(temp[1]);
    }
}


//基于jq获取form表单数据
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

/*
 * 纯Ajax方法封装
 */
function ajaxPost(sends, callback) {
    $.ajax({
        type: "post",
        url: P_Web,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: 'json',
        data: sends,
        success: function (data) {
            callback(data);
        }
    })
}

//下载文件统一的调用方法
function downLoads(url, data, method) {
    if (url && data) {
        data = typeof data == 'string' ? data : $.param(data);
        var inputs = '';
        $.each(data.split('&'), function () {
            var pair = this.split('=');
            inputs += '<input type="hidden" name="' + pair[0] + '" value=\'' + decodeURI(pair[1]) + '\' />';
        });
        $('<form action="' + url + '" method="' + (method || 'post') + '">' + inputs + '</form>')
            .appendTo('body').submit().remove();
    }
}
/*
 * IE8下时间格式化
 */
function parseISO8601(dateStringInRange) {
    var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/,
        date = new Date(NaN), month,
        parts = isoExp.exec(dateStringInRange);

    if(parts) {
        month = +parts[2];
        date.setFullYear(parts[1], month - 1, parts[3]);
        if(month != date.getMonth() + 1) {
            date.setTime(NaN);
        }
    }
    return date;
}


/*
 * 自建弹框插件
 */
var lock_api_list = new Array();
;
(function ($) {
    $.extend({
        "confirms": function (options) {
            var defaults = {
                msg: "提示消息",
                callback: function () {
                },
                errors: function () {
                }
            }
            if (options) {
                options = $.extend(defaults, options);
            }
            if (options.msg) {
                stratConfirm();
            } else {
                return false;
            }

            function stratConfirm() {
                var showBody = '<div id="showAllDark"><div class="insideShowBox"><div class="showBoxHerder"><p>提示</p><span class="showBoxClose"><i class="icon iconfont icon-shachu-xue"></i></span></div><div align="center">' +
                    options.msg + '</div><div class="showBoxFooter" align="center"><button id="isOK" class="btnNormal" type="button">确定</button> <button class="showBoxClose btnNormal" type="button">取消</button></div></div></div>';
                $("body").append(showBody);
                $("#isOK").on("click", function () {
                    if (options.callback) {
                        options.callback();
                    }
                    $("#showAllDark").remove();
                });
                $(".showBoxClose").on("click", function () {
                    if (options.errors) {
                        options.errors();
                    }
                    $("#showAllDark").remove();
                })
            }
        },
        "alerts": function (options) {

            $("#showAllDark").remove();
            var defaults = {
                msg: "提示消息",
                code: "",
                callback: function () {
                }
            }
            /*console.log(defaults);*/
            if (options) {
                options = $.extend(defaults, options);
            }
            /*console.log(options);*/
            if (options.msg && !options.code && !options.callback) {
                normalAlert();
                closeBox();
            }
            if (options.code && !options.callback) {
                startAlert();
                closeBox();
            }
            if (options.msg && options.callback && !options.code) {
                normalAlert();
                checkTrue();
                closeBox();
            }
            if (options.code && options.callback) {
                startAlert();
                checkTrue();
                closeBox();
            } else {
                return false;
            }

            function startAlert() {
                var showBody = '<div id="showAllDark"><div class="insideShowBox"><div class="showBoxHerder"><p>提示</p></div><div align="center">' + options.msg + '</div><div class="showBoxFooter" align="center"><button id="isOK" class="btnNormal-long" type="button">确定</button> <span>' + options.code + '</span></div></div></div>';
                $("body").append(showBody);
            }

            function normalAlert() {
                var showBody = '<div id="showAllDark"><div class="insideShowBox"><div class="showBoxHerder"><p>提示</p></div><div align="center">' + options.msg + '</div><div class="showBoxFooter" align="center"><button id="isOK" class="btnNormal-long" type="button">确定</button></div></div></div>';
                $("body").append(showBody);
            }

            function closeBox() {
                $("#isOK").on("click", function () {
                    $("#showAllDark").remove();
                });
            }

            function checkTrue() {
                $("#isOK").on("click", function () {
                    options.callback();
                    $("#showAllDark").remove();
                });
            }
        },
        "apiAjax": function (options) {
            var defaults = {
                apiName: "",
                isDownload: false,//下载文件 使用form提交
                data: {},
                AnotherUrl: "",
                dataType: "json",
                cache: true,
                processData: true,
                hasLoading: false,
                imgPost: false,//图片提交  默认不是
                async:true,
                contentType: "application/x-www-form-urlencoded",
                success: function () {
                },
                error: function () {
                }
            };

            if (options) {
                defaults = $.extend(defaults, options);
            }

            var Data = "data=" + JSON.stringify(defaults.data) + "&apiName=" + defaults.apiName;
            if ($.inArray(defaults.apiName, lock_api_list) != -1) {
                $.alerts({msg: "系统正在处理中.."});
                return;
            }
            if (defaults.hasLoading) {
                showLoading();
            }

            lock_api_list.push(defaults.apiName);
            //console.log(lock_api_list);
            jQuery.support.cors = true;
            if(defaults.isDownload) //下载
            {
                var lock_api_index = $.inArray(defaults.apiName, lock_api_list);
                delete lock_api_list[lock_api_index];
                var inputs = '';
                console.log(P_Web);
                inputs+='<input type="hidden" name="data" value=\''+ JSON.stringify(defaults.data) +'\' />';
                inputs+='<input type="hidden" name="apiName" value="'+ defaults.apiName +'" />';
                $('<form action="'+ P_Web +'" method="post">'+inputs+'</form>')
                    .appendTo('body')
                    .submit().remove();
                if (defaults.hasLoading) {
                    endLoading();
                }
                return;
            }
            $.ajax({
                type: "post",
                cache: defaults.cache,
                processData: defaults.processData,
                contentType: defaults.contentType,
                url: P_Web + defaults.AnotherUrl,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                dataType: defaults.dataType,
                data: defaults.imgPost !== false ? defaults.imgPost : Data,
                async:defaults.async==true ? defaults.async : false, 
                success: function (retrunData) {
                    if (defaults.hasLoading) {
                        endLoading();
                    }
                    var lock_api_index = $.inArray(defaults.apiName, lock_api_list);
                    delete lock_api_list[lock_api_index];
                    // console.log(lock_api_list);
                    // console.log("api:"+defaults.apiName+",unlock");
                    if (retrunData.state != 1 && checkError(retrunData.message, retrunData.state, retrunData.errorCode) == false) {
                        return;
                    }
                    defaults.success && defaults.success(retrunData);

                },
                error: function () {
                    if (defaults.hasLoading) {
                        endLoading();
                    }
                    var lock_api_index = $.inArray(defaults.apiName, lock_api_list);
                    delete lock_api_list[lock_api_index];
                    defaults.error && defaults.error();
                }
            });


        }
    })
})(jQuery)

//                    .-' _..`.
//                   /  .'_.'.'
//                  | .' (.)`.
//                  ;'   ,_   `.
//  .--.__________.'    ;  `.;-'
// |  ./               /
// |  |               / 
// `..'`-._  _____, ..'
//      / | |     | |\ \
//     / /| |     | | \ \
//    / / | |     | |  \ \
//   /_/  |_|     |_|   \_\
//  |__\  |__\    |__\  |__\