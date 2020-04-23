import Vue from 'vue';
import axios from 'axios';

axios.create({
 withCredentials: true,             // 设置cookie
 crossDomain: true,
});

axios.defaults.timeout = 20000       // 请求超时的时间限制

axios.interceptors.request.use(request =>{      // 接口发起请求
    Vue.$loading.show();                        // 开启全局 loading
    return request;
}, error =>{
    console.log(error);
});

axios.interceptors.response.use(response => {   // 接口请求成功
    Vue.$loading.hide();                        // 关闭全局 loading
    switch (response.data.code) {
        case 200:
            break;
        
        default:
            Vue.prototype.$message({
                message: response.data.message,
                type: 'error'
            });
            break;
    }
    return response.data;
}, error =>{
    console.log(error);
    if(error && error.response){
        if(error.response.status === 401){      // 登陆失效
            localStorage.clear();
        }
    }
});

export default axios;