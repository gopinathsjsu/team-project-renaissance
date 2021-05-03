import axios from "axios";

const API_URL = "http://localhost:8081/api/";

class TransferService{
    transfer(payee_id, beneficiary_id, transaction_amount) {
        return axios.post(API_URL + "transfer", {
              payee_id,
              beneficiary_id,
              transaction_amount
          }).then(response => {
              return response.data;
          });
    }
}

export default new TransferService();