// import axios from 'axios';
// import BaseUrl from '@/api/baseurl';
import http from '@/api/http-common';

// class AuthService extends BaseUrl {
//     signIn(data_post){
//         // const endpoint = super.getHost() + "v1/auth/signin";
//         const endpoint = super.getHost() + "api/login";
// 		return axios.post(endpoint,data_post).then(res => res.data);
//     }
// } export default new AuthService();

class AuthService {

    // Slide
    signIn(data_post){
        return http.post('api/login', data_post);
    }

} export default new AuthService();