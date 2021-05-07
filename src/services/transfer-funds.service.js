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
              return response.data;
          });
    }

    fetchAll(account_number) {
        //account_number.then((res) => console.log("account num: " + res.json))
        return axios.get(API_URL + 'fetchTransactions/', {
            params: {payee_id: account_number}
        })
    }
}

export default new TransferService();