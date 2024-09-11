import axios from "axios"
import Logger from "./Logger"

const API_BASE_URL = "http://localhost:5000"

class OrderService {
  // ================================================================= // USER SERVICES

  // In a real-world application,
  // You would want to have more robust error handling
  // And possibly retry logic for network requests.

  // Basically the cart
  static async createOrder(userId, orderData, orderTypeData) {
    const ENDPOINT = "/order/create"
    const token = localStorage.getItem("auth-token")
    try {
      // userId to be included in orderData
      const response = await axios.post(`${API_BASE_URL}${ENDPOINT}/${userId}`, {orderData, orderTypeData}, {
        headers: {
          "auth-token": token
        }
      })
      return response.data
    } catch (error) {
      Logger.error(error)
    }
  }
  // Add items to cart
  static async updateOrder(orderId, orderData, orderTypeData) {
    const ENDPOINT = "/order/update"
    const token = localStorage.getItem("auth-token")
    try {
      const response = await axios.put(`${API_BASE_URL}${ENDPOINT}/${orderId}`, {orderData, orderTypeData}, {
        headers: {
          "auth-token": token
        }
      })
      return response.data
    } catch (error) {
      Logger.error(error)
    }
  }
  // Remove items from cart
  static async cancelOrder(orderId) {
    const ENDPOINT = "/order/cancel-order"
    const token = localStorage.getItem("auth-token")
    try {
      const response = await axios.put(`${API_BASE_URL}${ENDPOINT}/${orderId}`, {}, {
        headers: {
          "auth-token": token
        }
      })
      return response
    } catch (error) {
      Logger.error(error);
    }
  }
  static async findOrderById(orderId) {
    const ENDPOINT = "/order/view"
    const token = localStorage.getItem("auth-token")
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINT}/${orderId}`, {
        headers: {
          "auth-token": token
        }
      })
      return response.data
    } catch (error) {
      Logger.error(error);
    }
  }
  static async findAllMyOrders(userId) {
    const ENDPOINT = "/order/my-orders"
    const token = localStorage.getItem("auth-token")
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINT}/${userId}`, {
        headers: {
          "auth-token": token
        }
      })
      return response.data
    } catch (error) {
      Logger.error(error);
    }
  }
  // ================================================================= // ADMIN SERVICES
  static async findAllOrders() {
    const ENDPOINT = "/admin/order/all"
    const token = localStorage.getItem("auth-token")
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINT}`, {
        headers: {
          "auth-token": token
        }
      })
      return response.data
    } catch(error) {
      Logger.error(error)
    }
  }
  static async deleteOrder(orderId) {
    const ENDPOINT = "/admin/order/delete"
    const token = localStorage.getItem("auth-token")
    try {
      const response = await axios.delete(`${API_BASE_URL}${ENDPOINT}/${orderId}`, {
        headers: {
          "auth-token": token
        }
      })
      return response;
    } catch(error) {
      Logger.error(error)
    }
  }
}

export default OrderService;
