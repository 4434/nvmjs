import axios from './axios';
export default{
	addData (params = {}) {
		return axios.post('/api/addData', params);
    },
    listData (params = {}) {
		return axios.post('/api/listData', params);
	},
	dataDelete (params = {}) {
		return axios.get('api/dataDelete', { params });
	},
	dataUpdate (params = {}) {
		return axios.post('api/dataUpdate', params)
	}
}