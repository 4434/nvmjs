import axios from './axios';
export default{
	getToken (params = {}) {
		return axios.get('/api/getQiniuToken', { params });
	},
}