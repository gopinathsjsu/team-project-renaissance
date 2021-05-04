import axios from 'axios';

const API_URL = "http://localhost:8081/api/";


class ExternalPayService {
  payBill(username, billAmount, id) {

    //console.log(billAmount);
    
    return axios.post(API_URL + "payBill", {
      username, 
      billAmount,
      id
    });
  }
  refund(username, refundAmount) {
    
    console.log('In refundAmount');
    
    return axios.post(API_URL + "refund", {
      username, 
      refundAmount
    });
  }
  
  getAllPayee(username, paystatus) {
  
    return axios.post(API_URL + 'externalpayees',{username,paystatus}).then(response => {
      return response.data;
  });
  }
}

export default new ExternalPayService();