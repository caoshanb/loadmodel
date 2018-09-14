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


webModel.service('setmouter',function(){
    //过滤参与人
    this.getDeveloperList=function(dev){
      var devs='';
      var resultArr;
      resultArr=dev.filter(function(item,index,self){
            return self.indexOf(item)==index;
      })
      angular.forEach(resultArr,function(data,index){
       devs+=data+'、';
      })
    return devs=devs.substr(0,devs.length-1);
  }
  //下拉数据
  this.getTimeType=function(){
    var timeType=[
            {'name':'计划开始时间','tid':1},
            {'name':'计划完成时间','tid':2},
            {'name':'实际开始时间','tid':3},
            {'name':'实际结束时间','tid':4},
            {'name':'发布时间','tid':5}];     
    return timeType;
  }
  this.getTimeTypeData=function(){
    var timeTypeData=[
            {'name':'开始时间','tid':1},
            {'name':'完成时间','tid':2},
            {'name':'测试时间','tid':3},
            {'name':'发布时间','tid':4}];     
    return timeTypeData;
  }
  this.getGroupSel=function(){
    var groupSel=[
            {name:'小组筛选',gid:''},
            {name:'组员筛选',id:''}];     
    return groupSel;
  }
})

