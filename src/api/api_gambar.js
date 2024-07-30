import http from '@/api/http-auth';
import http_multipart from '@/api/http-multipart';

class PictureService {

    // Images
    getAllPicture(){
        return http.get('api/slide/index');
    }
    publishPicture(id, order){
        return http.post('api/slide/publish/'+id,order);
    }
    unpublishPicture(id){
        return http.post('api/slide/unpublish/'+id);
    }
    uploadPicture(data){
        return http_multipart.post('api/slide/post/',data);
    }
    deletePicture(data){
        return http.post('api/slide/hapus/'+data);
    }

    // Cards
    getTotal(data){
        return http.get('api/admin/inputtotals/index/'+data);
    }
    postTotal(data){
        return http.post('api/inputtotals',data);
    }
    getAccident(){
        return http.get('api/lastaccidents');
    }
    postAccident(data){
        return http.post('api/lastaccidents',data);
    }
    
} export default new PictureService();