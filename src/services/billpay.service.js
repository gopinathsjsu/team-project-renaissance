import axios from 'axios';
const API_URL = "http://ec2-54-67-68-38.us-west-1.compute.amazonaws.com:8081/api/";


class BillPayService {
  
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new BillPayService();
