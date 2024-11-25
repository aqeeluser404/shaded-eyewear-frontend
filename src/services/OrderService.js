import axiosInstance from "./axiosInstance"
import Logger from "./Logger"

class OrderService {
  static async createOrder(userId, orderData) {
    const ENDPOINT = `/order/create/${userId}`
    try {
      // userId to be included in orderData
      const response = await axiosInstance.post(ENDPOINT, { orderData })
      return response.data
    } catch (error) {
      Logger.error(error)
    }
  }
  static async createPickup(orderId) {
    const ENDPOINT = `/order/create-pickup/${orderId}`
    try {
      // userId to be included in orderData
      const response = await axiosInstance.post(ENDPOINT, {})
      return response.data
    } catch (error) {
      Logger.error(error)
    }
  }
  static async updateOrder(orderId, orderData) {
    const ENDPOINT = `/order/update/${orderId}`
    try {
      const response = await axiosInstance.put(ENDPOINT, { orderData })
      return response.data
    } catch (error) {
      Logger.error(error)
    }
  }
  static async updatePickupOrder(orderId) {
    const ENDPOINT = `/order/update/status/${orderId}`
    try {
      const response = await axiosInstance.put(ENDPOINT, {})
      return response.data
    } catch (error) {
      Logger.error(error)
      throw error
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
  static async refundOrder(orderId, sunglassesToRefund) {
    const ENDPOINT = `/order/refund`
    try {
      const response = await axiosInstance.post(ENDPOINT, { orderId, sunglassesToRefund })
      return response
    } catch(error) {
      Logger.error(error)
    }
  }
}

export default OrderService
