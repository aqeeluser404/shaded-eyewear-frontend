import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

class UserService {
  // ================================================================= // AUTHENTICATION
  static async register(USER) {
    const ENDPOINT = "/auth/register";
    try {
      const response = await axios.post(`${API_BASE_URL}${ENDPOINT}`, USER);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async login(usernameOrEmail, password) {
    const ENDPOINT = "/auth/login";
    try {
      const response = await axios.post(`${API_BASE_URL}${ENDPOINT}`, {
        username: usernameOrEmail,
        email: usernameOrEmail,
        password,
      });
      console.log(response.data);

      if (response.data) {
        localStorage.setItem("auth-token", response.data);
        return response.data;
      } else {
        throw new Error("No token received");
      }
    } catch (error) {
      throw error;
    }
  }
  static async logout(id) {
    const ENDPOINT = "/user/logout";
    try {
      const response = await axios.post(`${API_BASE_URL}${ENDPOINT}/${id}`);
      if (response.data) {
        localStorage.removeItem("auth-token");
        return response.data;
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      throw error;
    }
  }
  // ================================================================= // ADMIN SERVICES
  static async createUser(USER) {
    const ENDPOINT = "/admin/user/create";
    const token = localStorage.getItem("auth-token");
    try {
      const response = await axios.post(`${API_BASE_URL}${ENDPOINT}`, USER, {
        headers: {
          // Authorization: `Bearer ${token}`,
          "auth-token": token,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async getAllUsers() {
    const ENDPOINT = "/admin/user/all";
    const token = localStorage.getItem("auth-token");
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINT}`, {
        headers: {
          // Authorization: `Bearer ${token}`,
          "auth-token": token,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  static async findUsersLoggedIn() {
    const ENDPOINT = "/admin/user/logged-in";
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINT}`, {
        headers: {
          "auth-token": token,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async findUsersFrequentlyLoggedIn() {
    const ENDPOINT = "/admin/user/frequent-users";
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINT}`, {
        headers: {
          "auth-token": token,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  // ================================================================= // USER SERVICES
  static async getUserFromToken() {
    const ENDPOINT = "/user/view";
    const token = localStorage.getItem("auth-token");
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINT}`, {
        headers: {
          "auth-token": token,
          // Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  static async getUserFromId(id) {
    const ENDPOINT = "/user/view";
    const token = localStorage.getItem("auth-token");
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINT}/${id}`, {
        headers: {
          "auth-token": token,
          // Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data)
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  static async deleteUser(id) {
    const ENDPOINT = "/user/delete";
    const token = localStorage.getItem("auth-token");
    try {
      const response = await axios.delete(`${API_BASE_URL}${ENDPOINT}/${id}`, {
        headers: {
          // Authorization: `Bearer ${token}`,
          "auth-token": token,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  static async updateUserDetails(id, USER) {
    const ENDPOINT = "/user/update";
    const token = localStorage.getItem("auth-token");
    try {
      const response = await axios.put(
        `${API_BASE_URL}${ENDPOINT}/${id}`,
        USER,
        {
          headers: {
            // Authorization: `Bearer ${token}`,
            "auth-token": token,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserService;
