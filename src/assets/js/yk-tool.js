export default{
	install (Vue,options) {
		Vue.prototype.ajax = function(request){
			let _URL  = request.url;
			let _TYPE = request.type || 'get';
			let _DATA = request.data || '';
			var _ITEM = {}; 
			if(_TYPE == 'get'){
				_ITEM  = {
					method: _TYPE,
					url: _URL,
					params: _DATA
				};
			}else{
				_ITEM  = {
					method: _TYPE,
					url: _URL,
					data: _DATA
				};				
			}			
		    this.$http(_ITEM)
		    .then(function(res){
		        request.success && request.success(res.data);
		    })
		    .catch(function(err){
		      var res = {
		        data: {
		          Code: 4000,
		          Msg: '网络连接错误'
		        }
		      };
		      request.success && request.success(res.data);
		    });	    		
		};
		
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

		Vue.prototype.open = function(message,type){
	        this.$message({
	          message: message,
	          type: type
	        });			
		};
	}
}