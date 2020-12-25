'use strict'

export function parseTime(dateTimeStamp) {
	// 单位换算
	const minute = 1000 * 60;
	const hour = minute * 60;
	const day = hour * 24;
	const halfamonth = day * 15;
	const month = day * 30;
	var year = month * 12;
	dateTimeStamp= (dateTimeStamp?dateTimeStamp = dateTimeStamp.replace(/\-/g, "/"):dateTimeStamp)

	const sTime = new Date(dateTimeStamp).getTime(); //把时间pretime的值转为时间戳
	const now = new Date().getTime(); //获取当前时间的时间戳
	const diffValue = now - sTime;
	if (diffValue < 0) {
		console.log("结束日期不能小于开始日期！")
		return '';
	}
	// 计算发布时间距离当前时间的年、月、天、时、分
	const yearC = diffValue / year;
	const monthC = diffValue / month;
	const dayC = diffValue / day;
	const hourC = diffValue / hour;
	const minC = diffValue / minute;

	if (yearC < 100 && yearC >= 1) {
		return parseInt(yearC) + "年前"
	} else if (monthC < 12 && monthC >= 1) {
		return parseInt(monthC) + "月前"
	} else if (dayC >= 1) {
		return parseInt(dayC) + "天前"
	} else if (hourC >= 1) {
		return parseInt(hourC) + "小时前"
	} else if (minC >= 1) {
		return parseInt(minC) + "分钟前"
	} else {
		return "刚刚"
	}
}


