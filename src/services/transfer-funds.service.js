import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://localhost:8081/api/";

class TransferService{
    transfer(payee_id, beneficiary_id, transaction_amount) {
        return axios.post(API_URL + "transfer", {
              payee_id,
              beneficiary_id,
              transaction_amount
          }, 
          { headers: authHeader()} ).then(response => {
              console.log(response.data);
              return response;
          });
    }

    fetchAll(payee_id) {
        return axios.get(API_URL + 'fetchTransactions/', {
            params: {payee_id: payee_id}
        })
    }
}

export default new TransferService();