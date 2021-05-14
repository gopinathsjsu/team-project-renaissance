import axios from "axios";

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

  register(username, address, contact, firstname, lastname, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      address,
      contact,
      firstname,
      lastname,
      email,
      password
    });
  }

  update(username) {
    return axios.put(API_URL + `update/`,  {
      data: {
        username: username
      }
    })
  }

  getLoggedInUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
  
}

export default new AuthService();
