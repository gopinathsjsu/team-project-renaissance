import axios from "axios";

const API_URL = "http://localhost:8081/api/";

class AccountService {
  create(account_type, account_balance, username) {
    return axios.post(API_URL + "addAccount", {
      account_type,
      account_balance,
      username
    }).then(response => {
      return response.data;
    });
  }

  //TODO
  getAll() {
    return axios.get(API_URL + `getAccounts/`, {})
  }

  update(id, account_type,) {
    return axios.put(API_URL + `updateAccount/${id}`, {
      
    })
  }

  delete(id) {
    return axios.delete(API_URL + `removeAccount/${id}`, {
      
    })
  }
}

export default new AccountService();