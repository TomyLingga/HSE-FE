import http from '@/api/http-common';

class DashService {

    // Slide
    getAllSlide(){
        return http.get('api/dashboard/slide/index');
    }
    
    // Work Program
    getAllPrograms(){
        return http.get('api/dashboard/schedule_weekly');
    }

    // Cards
    getTotal(data){
        return http.get('api/dashboard/inputtotals/index/'+data);
    }
    getAccident(){
        return http.get('api/dashboard/lastaccidents');
    }

} export default new DashService();