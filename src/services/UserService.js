import axiosInstance from "./axiosInstance"
import Logger from "./Logger"

class UserService {
  static async register(user) {
    const ENDPOINT = "/auth/register"
    try {
      const response = await axiosInstance.post(ENDPOINT, user)
      return response.data
    } catch (error) {
      Logger.error(error)
    }
  }
  static async login(usernameOrEmail, password) {
    const ENDPOINT = "/auth/login";
    try {
      const response = await axiosInstance.post(ENDPOINT, { username: usernameOrEmail, email: usernameOrEmail, password })
      return response.data
    } catch (error) {
      Logger.error(error)
    }
  }
  static async logout(userId) {
    const ENDPOINT = `/user/logout/${userId}`
    try {
      const response = await axiosInstance.post(ENDPOINT)
      return response.data
    } catch (error) {
      Logger.error(error);
    }
  }
  static async createUser(user) {
    const ENDPOINT = "/admin/user/create"
    try {
      const response = await axiosInstance.post(ENDPOINT, user)
      return response.data
    } catch (error) {
      Logger.error(error)
    }
  }
  static async findAllUsers() {
    const ENDPOINT = "/admin/user/all"
    try {
      const response = await axiosInstance.get(ENDPOINT)
      return response.data
    } catch (error) {
      Logger.error(error)
    }
  }
  static async findUsersFrequentlyLoggedIn() {
    const ENDPOINT = "/admin/user/logged-in"
    try {
      const response = await axiosInstance.get(ENDPOINT)
      return response.data
    } catch (error) {
      Logger.error(error)
    }
  }
  static async FindUserByToken() {
    const ENDPOINT = "/user/view"
    try {
      const response = await axiosInstance.get(ENDPOINT)
      return response.data
    } catch (error) {
      Logger.error(error)
    }
  }
  static async findUserById(userId) {
    const ENDPOINT = `/user/view/${userId}`
    try {
      const response = await axiosInstance.get(ENDPOINT)
      return response.data
    } catch (error) {
      Logger.error(error)
    }
  }
  static async updateUserDetails(userId, user) {
    const ENDPOINT = `/user/update/${userId}`
    try {
      const response = await axiosInstance.put(ENDPOINT, user);
      return response
    } catch (error) {
      Logger.error(error)
    }
  }
  static async deleteUser(userId) {
    const ENDPOINT = `/user/delete/${userId}`
    try {
      const response = await axiosInstance.delete(ENDPOINT)
      return response
    } catch (error) {
      Logger.error(error)
    }
  }
}

export default UserService
