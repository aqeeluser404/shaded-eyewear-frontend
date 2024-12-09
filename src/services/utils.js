import { format } from 'quasar'
import { jwtDecode } from 'jwt-decode'
import CryptoJS from 'crypto-js';
import axiosInstance from './axiosInstance'

class Helper {
  static formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(/ /g, ' ');
  }
  static capitalizeFirstLetter(text) {
    if (!text) return '';
    const lowerCaseText = text.toLowerCase();
    return format.capitalize(lowerCaseText);
  }
  static getImageUrl(imagePath) {
    const isProduction = process.env.NODE_ENV === 'production';
    const serverUrl = isProduction
      ? 'https://shaded-eyewear-backend.onrender.com/uploads/'
      : 'http://localhost:5000/uploads/';
    const localDir = 'C:\\Users\\TerrorX\\Downloads\\WLV\\Projects\\Sunglasses\\Shaded Eyewear\\server\\uploads\\';
    const relativePath = imagePath.replace(localDir, '');
    return serverUrl + relativePath;
  }
  // Validation Functions
  static validateText(text) {
    const textPattern = /^[A-Z][a-z]{4,}$/
    return textPattern.test(text)
  }
  static validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email)
  }
  static validatePhone(phone) {
    const phonePattern = /^\d{10}$/
    return phonePattern.test(phone)
  }
  static validateUsername(username) {
    const usernamePattern = /^[a-zA-Z0-9]{3,15}$/;
    return usernamePattern.test(username);
  }
  static validatePassword(password) {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordPattern.test(password);
  }

  // AUTHENTICATION FUNCTIONS
  static async getCookie(name) {
    // const cookies = document.cookie.split(';')
    // for (let i = 0; i < cookies.length; i++) {
    //   const cookie = cookies[i].trim()
    //   if (cookie.startsWith(`${name}=`)) {
    //     return cookie.substring(name.length + 1)
    //   }
    // }
    // console.log(`Cookie ${name} not found`);
    // return null
    try {
      const response = await axiosInstance.get('/get-token', { withCredentials: true });

      if (response.data.token) {
        return response.data.token;
      }

      console.log(`Cookie ${name} not found in backend`);
      return null;
    } catch (error) {
      console.error('Error fetching token from backend:', error);
      return null;
    }
  }
  static async removeCookie(name) {
    // Set the cookie with the same name and expiration date in the past
    // document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;

    try {
      await axiosInstance.post('/remove-token', {}, { withCredentials: true });
      console.log(`${name} removed from backend cookies.`);
    } catch (error) {
      console.error(`Error removing cookie ${name}:`, error);
    }
  }
  static beforeRouteEnter(to, from, next) {
    // const token = localStorage.getItem('auth-token');
    const token = Helper.getCookie('token')
    // console.log('Token on route enter:', token)
    if (!token) {
      next({ path: '/' }) // Redirect to home if authenticated
    } else {
      const decodedToken = jwtDecode(token)
      const userType = decodedToken.userType
      // console.log(userType)
      if (userType === 'admin') {
        next() // proceed if admin
      } else {
        next({ path: '/' }) // Go home if not admin
      }
    }
  }
  static beforeRouteEnterUser(to, from, next) {
    // const token = localStorage.getItem('auth-token')
    const token = Helper.getCookie('token')
    // console.log('Token on route enter:', token)
    if (!token) {
      next({ path: '/' })
    } else {
      next();
    }
  }
  static beforeRouteLeave(to, from, next) {
    // const token = localStorage.getItem('auth-token')
    const token = Helper.getCookie('token')
    // console.log('Token on route enter:', token)
    if (!token) {
      next(false);
    } else {
      next();
    }
  }
  // New Method for encrypting ID and navigating
  static viewSunglassesDetails(id, router) {
    if (!id) {
      Logger.error("Invalid sunglasses ID");
      return;
    }
    try {
      const encryptedId = CryptoJS.AES.encrypt(id.toString(), 'secret-key').toString();
      router.push(`/sunglasses/view/${encodeURIComponent(encryptedId)}`);
    } catch (error) {
      Logger.error(error);
    }
  }
}
export default Helper
