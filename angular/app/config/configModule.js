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