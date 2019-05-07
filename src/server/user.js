import axios from '../assets/js/axios';
export default{
	login (params) {
		return axios.post('/api/login', params);
	},
	register (params) {
		return axios.post('/api/register', params);
	},
}