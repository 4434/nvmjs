import axios from './axios';
export default{
	articleList (params = {}) {
		return axios.post('/api/article', params);
	},
	articleUs (params = {}) {
		return axios.post('/api/articleUs', params);
	},
	articleDetail (params = {}) {
		return axios.get('/api/articleDetail', { params: params });
	},
	articleDelete (params = {}) {
		return axios.get('/api/articleDelete', { params: params });
	},
	articleWrite (params = {}) {
		return axios.post('/api/articleWrite', params);
	},
	articleUpdate (params = {}) {
		return axios.post('/api/articleUpdate', params);
	}
}