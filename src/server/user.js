import axios from '../assets/js/axios';
export default{
	login (params) {
		return axios.post('/apilogin/', params);
	},
	register (params) {
		return axios.post('/apiregister/', params);
	},
}