import axios from "axios";

const API_URL = "http://localhost:8081/api/";

class TransferService{
    transfer(payeeid, beneficiaryid, amount) {
        return axios.post(API_URL + "transfer", {
              payeeid,
              beneficiaryid,
              amount
          }).then(response => {
              return response.data;
          });
    }
}

export default new TransferService();