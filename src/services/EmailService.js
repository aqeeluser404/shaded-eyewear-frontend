import axiosInstance from "./axiosInstance"
import Logger from "./Logger"

class EmailService {
  static async verifyEmail(token) {
    const ENDPOINT = '/verify-email'
    try {
      const response = await axiosInstance.get(ENDPOINT, {
        params: { token }
      })
      return response.data
    } catch (error) {
      Logger.error(error)
      throw error
    }
  }
  static async resendVerificationEmail(email) {
    const ENDPOINT = '/resend-verification-email'
    try {
      const response = await axiosInstance.post(ENDPOINT, { email })
      return response.data
    } catch (error) {
      Logger.error('Error resending verification email: ', error.message);
      throw error
    }
  }
  static async ForgotPassword(email) {
    const ENDPOINT = '/forgot-password'
    try {
      const response = await axiosInstance.post(ENDPOINT, { email })
      return response.data
    } catch (error) {
      Logger.error('Error resetting password: ', error.message)
      throw error
    }
  }
  static async ResetPassword(token, password) {
    const ENDPOINT = '/reset-password'
    try {
      const response = await axiosInstance.post(ENDPOINT, { token, password } )
      return response.data
    } catch (error) {
      Logger.error('Error resetting password: ', error.message)
      throw error
    }
  }
  static async GetInContact(userContact, message) {
    const ENDPOINT = '/contact'
    try {
      const response = await axiosInstance.post(ENDPOINT, { userContact, message } )
      return response.data
    } catch (error) {
      Logger.error('Error sending message: ', error.message)
      throw error
    }
  }
}
export default EmailService
