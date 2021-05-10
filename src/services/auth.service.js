import axios from "axios";

const API_URL = "http://ec2-54-67-68-38.us-west-1.compute.amazonaws.com:8081/api/auth/";

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

  register(username, address, contact, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      address,
      contact,
      //newUsername,
      email,
      password
    });
  }

  update(username, address, contact, email, password) {
    return axios.post(API_URL + "update", {
      username,
      address,
      contact,
      email,
      password
    });
  }

  getLoggedInUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
  
}

export default new AuthService();
