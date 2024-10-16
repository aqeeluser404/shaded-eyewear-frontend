import axiosInstance from "./axiosInstance"
import Logger from "./Logger"

class SunglassesService {
  static async findAllSunglasses() {
    const ENDPOINT = "/sunglasses/all"
    try {
      const response = await axiosInstance.get(ENDPOINT)
      return response.data
    } catch (error) {
      Logger.error(error)
    }
  }
  static async findSunglassesById(sunglassesId) {
    const ENDPOINT = `/sunglasses/view/${sunglassesId}`
    try {
      const response = await axiosInstance.get(ENDPOINT)
      return response.data
    } catch (error) {
      Logger.error(error)
    }
  }
  static async createSunglasses(sunglasses) {
    const ENDPOINT = "/admin/sunglasses/create"
    try {
      const response = await axiosInstance.post(ENDPOINT, sunglasses)
      return response.data
    } catch (error) {
      Logger.error(error)
      throw error;
    }
  }
  static async updateSunglasses(sunglassesId, sunglasses) {
    const ENDPOINT = `/admin/sunglasses/update/${sunglassesId}`
    try {
      const response = await axiosInstance.put(ENDPOINT, sunglasses)
      return response
    } catch (error) {
      Logger.error(error)
    }
  }
  static async deleteSunglasses(sunglassesId) {
    const ENDPOINT = `/admin/sunglasses/delete/${sunglassesId}`
    try {
      const response = await axiosInstance.delete(ENDPOINT)
      return response
    } catch (error) {
      Logger.error(error)
    }
  }
}

export default SunglassesService
