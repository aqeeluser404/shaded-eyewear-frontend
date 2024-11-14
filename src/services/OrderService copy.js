import axiosInstance from "./axiosInstance"
import Logger from "./Logger"

class OrderService {
  static async createOrder(userId, orderData, orderTypeData) {
    const ENDPOINT = `/order/create/${userId}`
    try {
      // userId to be included in orderData
      const response = await axiosInstance.post(ENDPOINT, { orderData, orderTypeData })
      return response.data
    } catch (error) {
      Logger.error(error)
    }
  }
  static async updateOrder(orderId, orderData, orderTypeData) {
    const ENDPOINT = `/order/update/${orderId}`
    try {
      const response = await axiosInstance.put(ENDPOINT, { orderData, orderTypeData })
      return response.data
    } catch (error) {
      Logger.error(error)
    }
  }
  // Remove items from cart
  static async cancelOrder(orderId) {
    const ENDPOINT = `/order/cancel-order/${orderId}`
    try {
      const response = await axiosInstance.put(ENDPOINT, {})
      return response;
    } catch (error) {
      Logger.error(error)
      throw error; // Re-throw the error to handle it in the calling function
    }
  }
  static async findOrderById(orderId) {
    const ENDPOINT = `/order/view/${orderId}`
    try {
      const response = await axiosInstance.get(ENDPOINT)
      return response.data
    } catch (error) {
      Logger.error(error)
    }
  }
  static async findAllMyOrders(userId) {
    const ENDPOINT = `/order/my-orders/${userId}`
    try {
      const response = await axiosInstance.get(ENDPOINT)
      return response.data
    } catch (error) {
      Logger.error(error)
    }
  }
  static async findAllOrders() {
    const ENDPOINT = "/admin/order/all"
    try {
      const response = await axiosInstance.get(ENDPOINT)
      return response.data
    } catch(error) {
      Logger.error(error)
    }
  }
  static async deleteOrder(orderId) {
    const ENDPOINT = `/order/delete/${orderId}`
    try {
      const response = await axiosInstance.delete(ENDPOINT)
      return response
    } catch(error) {
      Logger.error(error)
    }
  }
}

export default OrderService
