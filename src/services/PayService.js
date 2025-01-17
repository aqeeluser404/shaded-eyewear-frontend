// import axios from "axios"
import axiosInstance from "./axiosInstance"
import Logger from "./Logger"

// const API_BASE_URL = process.env.API_BASE_URL
// // const API_BASE_URL = 'https://jwt-login-system.onrender.com'

class PayService {
  // static async initiatePayment(orderId) {
  //   const ENDPOINT = '/gateway/pay'
  //   const token = localStorage.getItem("auth-token")
  //   try {
  //     const response = await axios.post(`${API_BASE_URL}${ENDPOINT}`, { orderId }, {
  //       headers: {
  //         "auth-token": token,
  //       }
  //     });
  //     return response.data
  //   } catch (error) {
  //     Logger.error(error)
  //     throw error
  //   }
  // }
  static async initiatePayment(orderId) {
    const ENDPOINT = '/gateway/pay'
    try {
      const response = await axiosInstance.post(ENDPOINT, { orderId }); // Send orderId as an object
      return response.data
    } catch (error) {
      Logger.error(error)
      throw error
    }
  }
  static async paymentSuccess(orderId) {
    const ENDPOINT = `/payment-success?orderId=${orderId}`;
    try {
      const response = await axiosInstance.post(ENDPOINT);
      return response.data;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}

export default PayService
