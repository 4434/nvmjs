class calendar {
	showDate(json){			// 日历数据
        let data  = {};
		data.prev = {};
		data.next = {};
		if(json.month == 1){
			data.prev.time  = (json.year - 1) + '/12/1';
			data.next.time  = json.year + '/' + (json.month + 1) + '/1'; 
		}else if(json.month == 12){
			data.prev.time  = json.year + '/' + (json.month - 1) + '/1';
			data.next.time  = (json.year + 1) + '/1/1';
		}else{
			data.prev.time  = json.year + '/' + (json.month - 1) + '/1'; 
			data.next.time  = json.year + '/' + (json.month + 1) + '/1';
		}
		data.prev.detial = this.timeFormat(data.prev.time);
		data.next.detial = this.timeFormat(data.next.time);
		data.showDate = [];
		for(var i = 0; i< 42; i++){
			if(json.weekStart == 0){
				json.weekStart = 7;
			}
			if(json.weekStart > i ){
				var d = {type: 'prev', display: data.prev.detial.allDay - json.weekStart + i}
				data.showDate.push(d);
				continue;
			}
			if(json.allDay <= (i-json.weekStart)){
				var d = {type: 'next', display: i - json.allDay - json.weekStart}
				data.showDate.push(d);
				continue;
			}
			var d = {type: 'now', display: i - json.weekStart}
			data.showDate.push(d);
			data.now = json;
		}
		return data;		
	}

	timeFormat (date) {
		var date = date ? new Date(date) : new Date();
		var timeJSON = {};
		timeJSON.getTime   = date.getTime();												// 时间戳 
		timeJSON.year      = date.getFullYear();											// 年份
		timeJSON.month     = date.getMonth() + 1;											// 月份
		timeJSON.day       = date.getDate();												// 当天	
		timeJSON.week      = date.getDay();													// 周几
		timeJSON.allDay    = new Date(timeJSON.year, timeJSON.month, 0).getDate();			// 当月天数
		timeJSON.weekStart = new Date(timeJSON.year, timeJSON.month -1, 1).getDay();		// 当月1号是周几 
		timeJSON.time      = timeJSON.year + '/' + timeJSON.month + '/' + timeJSON.day;
		return timeJSON;		
    }
    
	//  上一个月
	prevTime (time) {
		var prevTime;
		var nowTime = this.timeFormat(time);
		if(nowTime.month == 1){
			prevTime = 	this.timeFormat(nowTime.year - 1 + '/12/1');
		}else{
			prevTime = 	this.timeFormat(nowTime.year + '/'+ (nowTime.month - 1) +'/1');
		}
		if(nowTime.day <= prevTime.allDay){
			prevTime = 	this.timeFormat(prevTime.year + '/'+ prevTime.month +'/' + nowTime.day);
		}
		prevTime.time = prevTime.year + '/' + prevTime.month + '/' + prevTime.day;

		return prevTime;
    }
    
	//  下一个月
	nextTime (time) {
		var nextTime;
		var nowTime = this.timeFormat(time);
		if(nowTime.month == 12){
			nextTime = 	this.timeFormat(nowTime.year + 1 + '/1/1');
		}else{
			nextTime = 	this.timeFormat(nowTime.year + '/'+ (nowTime.month + 1) +'/1');
		}
		if(nowTime.day <= nextTime.allDay){
			nextTime = 	this.timeFormat(nextTime.year + '/'+ nextTime.month +'/' + nowTime.day);
		}
		nextTime.time = nextTime.year + '/' + nextTime.month + '/' + nextTime.day;

		return nextTime;		
	}

	// 上一年
	prevYear (time) {
		var prevYear;
		var nowTime = this.timeFormat(time);
		prevYear = this.timeFormat(nowTime.year - 1 + '/' + nowTime.month + '/1');
		if(nowTime.day <= prevYear.allDay){
			prevYear = this.timeFormat(nowTime.year - 1 + '/' + nowTime.month + '/' + nowTime.day);
		}
		prevYear.time = prevYear.year + '/' + prevYear.month + '/' + prevYear.day;

		return prevYear;
	}

	// 下一年
	nextYear (time) {
		var nextYear;
		var nowTime = this.timeFormat(time);
		nextYear = this.timeFormat(nowTime.year + 1 + '/' + nowTime.month + '/1');
		if(nowTime.day <= nextYear.allDay){
			nextYear = this.timeFormat(nowTime.year + 1 + '/' + nowTime.month + '/' + nowTime.day);
		}
		nextYear.time = nextYear.year + '/' + nextYear.month + '/' + nextYear.day;

		return nextYear;
	}

}

export default calendar;