import axios from 'axios';

const API_URL = "http://localhost:8081/api/";


class ExternalPayService {
  payBill(username, billAcctNumber, billAmount) {
    return axios.post(API_URL + "payBill", {
      username, 
      billAcctNumber,
      billAmount
    });
  }
  
  getAllPayee() {
    //return axios.get(API_URL + 'externalpayees');
    return axios.get(API_URL + 'externalpayees/',{});
  }
}

export default new ExternalPayService();