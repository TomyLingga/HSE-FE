//import axios from 'axios';

// ----- server -----
const api = 'http://192.168.1.225:3022/';
// const api = 'http://localhost:6000/';

// ----- dev -----
// const api = 'http://localhost:3021/';
// const api = 'http://localhost:3022/';

class BaseURL { 
	getHost(){
		return api;
	}
}

export default BaseURL;