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
  }  
}