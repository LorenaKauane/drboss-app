import axios from 'axios';aaab = null;


const api = axios.create({
  baseURL: 'http://192.168.0.15:3000/doctor-boss/api/',
  headers: {'tenantId': ''}
});


export default api;
