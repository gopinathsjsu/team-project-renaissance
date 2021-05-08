import axios from 'axios';
const API_URL = "http://localhost:8081/api/";


class BillPayService {
  
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new BillPayService();