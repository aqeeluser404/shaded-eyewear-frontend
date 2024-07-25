import axios from "axios"
import Logger from "./Logger"

const API_BASE_URL = "http://localhost:5000"

class SunglassesService {
  // ================================================================= // PUBLIC SERVICES
  static async findAllSunglasses() {
    const ENDPOINT = "/sunglasses/all"
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINT}`)
      return response.data
    } catch (error) {
      Logger.error(error)
    }
  }
  static async findSunglassesById(sunglassesId) {
    const ENDPOINT = "/sunglasses/view"
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINT}/${sunglassesId}`)
      return response.data
    } catch (error) {
      Logger.error(error)
    }
  }
  // ================================================================= // ADMIN SERVICES
  static async createSunglasses(sunglasses) {
    const ENDPOINT = "/admin/sunglasses/create";
    const token = localStorage.getItem("auth-token")
    try {
      const response = await axios.post(`${API_BASE_URL}${ENDPOINT}`, sunglasses, {
        headers: {
          "auth-token": token,
          "Content-Type": "multipart/form-data"
        },
      });
      return response.data
    } catch (error) {
      Logger.error(error)
      throw error; // Re-throw the error to handle it in the calling function
    }
  }
  static async updateSunglasses(sunglassesId, sunglasses) {
    const ENDPOINT = "/admin/sunglasses/update"
    const token = localStorage.getItem("auth-token")
    try {
      const response = await axios.put(`${API_BASE_URL}${ENDPOINT}/${sunglassesId}`, sunglasses, {
        headers: {
          "auth-token": token
        },
      })
      return response;
    } catch (error) {
      Logger.error(error)
    }
  }
  static async deleteSunglasses(sunglassesId) {
    const ENDPOINT = "/admin/sunglasses/delete"
    const token = localStorage.getItem("auth-token")
    try {
      const response = await axios.delete(`${API_BASE_URL}${ENDPOINT}/${sunglassesId}`, {
        headers: {
          "auth-token": token
        },
      })
      return response
    } catch (error) {
      Logger.error(error)
    }
  }
}

export default SunglassesService;
