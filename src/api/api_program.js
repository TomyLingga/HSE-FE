// import axios from 'axios';
// import BaseUrl from '@/api/baseurl';
import http from '@/api/http-auth';

class ProgramService {

    // Program
    getAllProgram(){
        return http.get('api/programs');
    } 
    postDataProgram(data){
        return http.post('api/programs',data);
    }
    updateDataProgram(id, data){
        return http.put('api/programs/'+id,data);
    } 
    deleteDataProgram(id){
        return http.delete('api/programs/'+id);
    }
    
    // Schedulle
    getAllSchedule(){
        return http.get('api/schedule');
    }
    getScheduleByID(id){
        return http.get('api/schedule/'+id);
    }
    postDataSchedule(data){
        return http.post('api/schedule',data);
    }
    updateDataSchedule(id, data){
        return http.put('api/schedule/'+id,data);
    } 
} export default new ProgramService();