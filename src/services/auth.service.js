import axios from "axios";

const API_URL = "https://online-banking-application.herokuapp.com/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, address, contact, newUsername, email, password) {
    return axios.post(API_URL + "signup", {
      username, 
      address,
      contact,
      newUsername,
      email,
      password
    });
  }
  
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();