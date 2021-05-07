import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8081/api/test/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserPage() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getAdminPage() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

}

export default new UserService();