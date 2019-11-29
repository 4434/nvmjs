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
  dateTime (val) {
    if(val){
      let d = new Date(val);    //根据时间戳生成的时间对象
      let date = (d.getFullYear()) + "-" + 
                 (d.getMonth() + 1) + "-" +
                 (d.getDate()) + " " + 
                 (d.getHours()) + ":" + 
                 (d.getMinutes()) + ":" + 
                 (d.getSeconds());
      return date;             
    }else{
      return '暂无时间';
    }
  }
}