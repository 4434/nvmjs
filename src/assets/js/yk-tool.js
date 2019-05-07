export default{
	install (Vue,options) {
		/**
		 *  时间格式转化
		 *  */		
		Vue.prototype.timeInit = function(time){
			if(!time) return;
			let timeData = {};
			var t = new Date(time);
			timeData.getTime = t.getTime();
			timeData.year    = t.getFullYear();
			timeData.month   = t.getMonth() + 1 < 10 ? '0' + (t.getMonth() + 1) : t.getMonth() + 1;
			timeData.day     = t.getDate() < 10 ? '0' + t.getDate() : t.getDate();
			timeData.week    = t.getDay() < 10 ? '0' + t.getDay() : t.getDay();
			timeData.hour    = t.getHours() < 10 ? '0' + t.getHours() : t.getHours();
			timeData.minute  = t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes();
			timeData.second  = t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds();
			return 	timeData;		
		};
		/**
		 *  封装提示
		 */
		Vue.prototype.open = function(message,type){
	        this.$message({
	          message: message,
	          type: type
	        });			
		};
	}
}