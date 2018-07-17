
	// 获取今天
	var nowDate= new Date(); //当天日期
	//今天是本周的第几天
	var nowDayOfWeek= nowDate.getDay();
	//当前日
	var nowDay = nowDate.getDate();
	//当前月
	var nowMonth = nowDate.getMonth();
	//当前年
	var nowYear = nowDate.getFullYear();

	nowYear += (nowYear < 2000) ? 1900 : 0; //
	var lastMonthDate = new Date(); //上月日期
	lastMonthDate.setDate(1);
	lastMonthDate.setMonth(lastMonthDate.getMonth()-1);
	var lastYear = lastMonthDate.getYear();
	var lastMonth = lastMonthDate.getMonth();
	function formatDate(date) {
		 var myyear = date.getFullYear();
		 var mymonth = date.getMonth()+1;
		 var myweekday = date.getDate();
		 if(mymonth < 10){
		 mymonth = "0" + mymonth;
		 }
		 if(myweekday < 10){
		 myweekday = "0" + myweekday;
		 }
		 return (myyear+"-"+mymonth + "-" + myweekday);
	}
	//获得某月的天数
	function getMonthDays(myMonth){
		 var monthStartDate = new Date(nowYear, myMonth, 1);
		 var monthEndDate = new Date(nowYear, myMonth + 1, 1);
		 var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24);
		 return days;
	}