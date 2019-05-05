import axios from 'axios';
const service = axios.create({
 withCredentials: true,
 crossDomain: true
});

export default service;