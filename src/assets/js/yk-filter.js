export default {
  /**
   * 
   * @param {去富文本格式} text 
   */ 
  richTest (text) {
    if (!text) return "";
    text = text.replace(/(\n)/g, "");    
    text = text.replace(/(\t)/g, "");    
    text = text.replace(/(\r)/g, "");    
    text = text.replace(/<\/?[^>]*>/g, "");    
    text = text.replace(/\s*/g, "");  
    return text;
  },
  /**
   * 
   * @param {时间戳转 yyyy-MM-dd HH:mm:ss} val 
   */
  dateTime (time) {
    if(time){
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
			return 	timeData.year + '-' + timeData.month + '-' + timeData.day;	             
    }else{
      return '暂无时间';
    }
  }
}