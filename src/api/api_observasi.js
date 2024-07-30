import http from '@/api/http-auth';
import http_multipart from '@/api/http-multipart';

class ObservationService {

    // Categories
    getAllCategories(){
        return http.get('api/categories');
    } 
    getCategoriesByName(id){
        return http.get('api/categories/'+id);
    }
    getCategoriesById(id){
        return http.get('api/admin/categories/byid/'+id);
    }
    postDataCategories(data){
        return http.post('api/categories',data);
    }
    updateDataCategories(data){
        return http.post('api/admin/categories/update',data);
    } 
    deleteDataCategories(id){
        return http.post('api/admin/categories/delete/'+id);
    }
    
    // Location
    getAllLocation(){
        return http.get('api/locations');
    }
    postDataLocation(data){
        return http.post('api/locations',data);
    }
    getLocationByName(id){
        return http.get('api/locations/'+id);
    }
    updateDataLocation(data){
        return http.post('api/admin/locations/update',data);
    }
    deleteDataLocation(id){
        return http.post('api/admin/locations/delete/'+id);
    }

    // Observation
    getMyObservation(){
        return http.get('api/user/myobservations/index');
    }
    getObservationByID(id){
        return http.get('api/admin/observations/index/'+id);
    }
    getAllObservation(){
        return http.get('api/admin/observations/index/');
    }
    PostObservation(data){
        return http_multipart.post('api/admin/observations/tambah/',data);
    }
    onprogressObservation(data,id){
        return http.post('api/admin/observations/sedang_ditangani/'+id,data);
    }
    updateProgressObservation(data,id){
        return http.post('api/admin/observations/pending/'+id,data);
    }
    doneObservation(data,id){
        return http.post('api/admin/observations/close/'+id,data);
    }
    rejectObservation(data,id){
        return http.post('api/admin/observations/batal/'+id,data);
    }
} export default new ObservationService();