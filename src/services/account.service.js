import axios from "axios";

const API_URL = "http://localhost:8081/api/";

class AuthService {
  createAccount(account_type, account_balance, userId) {
    return axios.post(API_URL + "addAccount", {
      account_type,
      account_balance,
      userId
    })
  }

  //TODO
  getAll() {
    return axios.get(API_URL + `getAccounts/`, {})
  }

  update(id, account_type,) {
    return axios.put(API_URL + `updateAccount/${id}`, {
      account_type
    })
  }

  delete(id) {
    return axios.delete(API_URL + `removeAccount/${id}`, {
      account_type
    })
  }
}

export default new AuthService();