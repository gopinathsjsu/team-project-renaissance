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
}
export default new AuthService();
