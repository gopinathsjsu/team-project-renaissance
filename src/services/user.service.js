import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://ec2-54-67-68-38.us-west-1.compute.amazonaws.com:8081/api/test/";

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
