import axios from "axios";
import Logger from "./Logger";

const API_BASE_URL = "http://localhost:5000";

class UserService {

  // ================================================================= // PUBLIC SERVICES
  static async register(user) {
    const ENDPOINT = "/auth/register"
    try {
      const response = await axios.post(`${API_BASE_URL}${ENDPOINT}`, user);
      return response.data
    } catch (error) {
      Logger.error(error)
    }
  }
  static async login(usernameOrEmail, password) {
    const ENDPOINT = "/auth/login";
    try {
      const response = await axios.post(`${API_BASE_URL}${ENDPOINT}`, {
        username: usernameOrEmail,
        email: usernameOrEmail,
        password,
      })

      if (response.data) {
        // The server responded with a token. Save it.
        localStorage.setItem('auth-token', response.data);
        console.log(response.data)
        return response.data;
      } else {
        throw new Error("No token received");
      }
    } catch (error) {
      Logger.error(error)
    }
  }
  static async logout(userId) {
    const ENDPOINT = "/user/logout";
    const token = localStorage.getItem("auth-token");
    try {
      const response = await axios.post(`${API_BASE_URL}${ENDPOINT}/${userId}`, {}, {
        headers: {
          "auth-token": token
        }
      });

      if (response.data) {
        localStorage.removeItem("auth-token");
        return response.data;
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      Logger.error(error);
    }
  }

  // ================================================================= // ADMIN SERVICES
  static async createUser(user) {
    const ENDPOINT = "/admin/user/create"
    const token = localStorage.getItem("auth-token")
    try {
      const response = await axios.post(`${API_BASE_URL}${ENDPOINT}`, user, {
        headers: {
          "auth-token": token,
        }
      })
      return response.data
    } catch (error) {
      Logger.error(error)
    }
  }
  static async findAllUsers() {
    const ENDPOINT = "/admin/user/all"
    const token = localStorage.getItem("auth-token")
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINT}`, {
        headers: {
          "auth-token": token
        }
      });
      return response.data
    } catch (error) {
      Logger.error(error)
    }
  }
  static async findUsersLoggedIn() {
    const ENDPOINT = "/admin/user/logged-in"
    const token = localStorage.getItem("auth-token")
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINT}`, {
        headers: {
          "auth-token": token
        },
      });
      return response.data
    } catch (error) {
      Logger.error(error)
    }
  }
  static async findUsersFrequentlyLoggedIn() {
    const ENDPOINT = "/admin/user/frequent-users"
    const token = localStorage.getItem("auth-token")
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINT}`, {
        headers: {
          "auth-token": token
        },
      });
      return response.data
    } catch (error) {
      Logger.error(error)
    }
  }
  // ================================================================= // USER SERVICES
  static async FindUserByToken() {
    const ENDPOINT = "/user/view"
    const token = localStorage.getItem("auth-token")
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINT}`, {
        headers: {
          "auth-token": token
        }
      })
      return response.data
    } catch (error) {
      Logger.error(error)
    }
  }
  static async findUserById(userId) {
    const ENDPOINT = "/user/view"
    const token = localStorage.getItem("auth-token")
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINT}/${userId}`, {
        headers: {
          "auth-token": token
        },
      });
      return response.data
    } catch (error) {
      Logger.error(error)
    }
  }
  static async updateUserDetails(userId, user) {
    const ENDPOINT = "/user/update"
    const token = localStorage.getItem("auth-token")
    try {
      const response = await axios.put(`${API_BASE_URL}${ENDPOINT}/${userId}`, user, {
        headers: {
          "auth-token": token
        },
      });
      return response;
    } catch (error) {
      Logger.error(error)
    }
  }
  static async deleteUser(userId) {
    const ENDPOINT = "/user/delete"
    const token = localStorage.getItem("auth-token")
    try {
      const response = await axios.delete(`${API_BASE_URL}${ENDPOINT}/${userId}`, {
        headers: {
          "auth-token": token
        }
      });
      return response;
    } catch (error) {
      Logger.error(error)
    }
  }
}

export default UserService
