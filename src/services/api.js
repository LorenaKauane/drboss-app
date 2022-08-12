import axios from 'axios';


const api = axios.create({
  baseURL: 'http:/localhost/doctor-boss/api/',
  headers: {'tenantId': ''}
});


export default api;
