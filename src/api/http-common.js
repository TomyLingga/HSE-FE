import axios from 'axios';
export default axios.create({
    // baseURL: 'http://localhost:6000/',
    // baseURL: 'http://localhost:3022/',
    baseURL: 'http://192.168.1.225:3022/',
    headers: {
        'Content-type' : 'application/json',
        // 'Authorization' :  `Bearer ${localStorage.usertoken}`
    },
});
