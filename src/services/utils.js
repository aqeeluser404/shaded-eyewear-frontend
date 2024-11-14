import { format } from 'quasar'
import { jwtDecode } from 'jwt-decode'

class Helper {

  // Functions
  // static formatDate(dateString) {
  //   return new Date(dateString).toLocaleDateString('en-GB')
  // }
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
    const serverUrl = 'http://localhost:5000/uploads/'
    const localDir = 'C:\\Users\\TerrorX\\Downloads\\WLV\\Projects\\Sunglasses\\Shaded Eyewear\\server\\uploads\\'
    const relativePath = imagePath.replace(localDir, '')
    return serverUrl + relativePath
  }
        // getImageUrl(imagePath) {
      //   // replace this with hosted url
      //   const serverUrl = 'http://localhost:5000/uploads/';
      //   return serverUrl + imagePath;
      // }

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
  static getCookie(name) {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1)
      }
    }
    return null
  }
  static beforeRouteEnter(to, from, next) {
    // const token = localStorage.getItem('auth-token');
    const token = Helper.getCookie('token')
    console.log('Token on route enter:', token)
    if (!token) {
      next({ path: '/' }) // Redirect to home if authenticated
    } else {
      const decodedToken = jwtDecode(token)
      const userType = decodedToken.userType
      console.log(userType)
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
    console.log('Token on route enter:', token)
    if (!token) {
      next({ path: '/' })
    } else {
      next();
    }
  }
  static beforeRouteLeave(to, from, next) {
    // const token = localStorage.getItem('auth-token')
    const token = Helper.getCookie('token')
    console.log('Token on route enter:', token)
    if (!token) {
      next(false);
    } else {
      next();
    }
  }
}
export default Helper
