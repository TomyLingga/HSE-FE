import AuthApi from '@/api/api_auth';
// import ProgramApi from '@/api/api_program';

class Api {
    AuthService() {return AuthApi;}
    // ProgramService() {return ProgramApi;}
}
export default new Api();