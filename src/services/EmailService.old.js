import axios from 'axios'
import Logger from './Logger'

const API_BASE_URL = process.env.API_BASE_URL

class EmailService {
  static async verifyEmail(token) {
    const ENDPOINT = '/verify-email'
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINT}`, {
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
      const response = await axios.post( `${API_BASE_URL}${ENDPOINT}`, { email } )
      return response.data
    } catch (error) {
      Logger.error('Error resending verification email: ', error.message);
      throw error
    }
  }
  static async ForgotPassword(email) {
    const ENDPOINT = '/forgot-password'
    try {
      const response = await axios.post(`${API_BASE_URL}${ENDPOINT}`, { email } )
      return response.data
    } catch (error) {
      Logger.error('Error resetting password: ', error.message)
      throw error
    }
  }
  static async ResetPassword(token, password) {
    const ENDPOINT = '/reset-password'
    try {
      const response = await axios.post(`${API_BASE_URL}${ENDPOINT}`, { token, password })
      return response.data
    } catch (error) {
      Logger.error('Error resetting password: ', error.message)
      throw error
    }
  }
}

export default EmailService
