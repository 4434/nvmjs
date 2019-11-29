import axios from './axios';
export default{
	login (params) {
		return axios.post('/api/login', params);
	},
	register (params) {
		return axios.post('/api/register', params);
	},
}