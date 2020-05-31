import axios from 'axios'
const baseURL = 'https://unaroadmap-api.herokuapp.com/'


const api = axios.create({    
    baseURL: baseURL 
}) 


export default api;
