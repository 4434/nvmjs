/**
  去富文本格式
**/
let richTest = function (text) {
  if (!text) return "";
  text = text.replace(/(\n)/g, "");    
  text = text.replace(/(\t)/g, "");    
  text = text.replace(/(\r)/g, "");    
  text = text.replace(/<\/?[^>]*>/g, "");    
  text = text.replace(/\s*/g, "");  
  return text;
}

export default { richTest }