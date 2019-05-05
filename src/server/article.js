import axios from '../assets/js/axios';
export default{
	articleList (params) {
		return axios.post('/api/article', params);
	},
	articleDetail (params) {
		return axios.get('/api/articleDetail', { params: params });
	},
	articleDelete (params) {
		return axios.get('/api/articleDelete', { params: params });
	},
	articleWrite (params) {
		return axios.post('/api/articleWrite', params);
	},
	articleUpdate (params) {
		return axios.post('/api/articleUpdate', params);
	}
}