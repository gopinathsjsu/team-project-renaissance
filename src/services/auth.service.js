import axios from "axios";

// const API_URL = "http://localhost:8081/api/";  // for our add account
const API_URL = "http://localhost:8081/api/auth/";

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

  getLoggedInUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  getUserRole(user) {
    return axios.post(API_URL + "getUserRole", {
      user
    });
  }
}

export default new AuthService();
