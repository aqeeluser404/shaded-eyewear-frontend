import { format } from 'quasar'
import { jwtDecode } from 'jwt-decode'

class Helper {
  static formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-GB')
  }
  static capitalizeFirstLetter(text) {
    if (!text) return '';
    const lowerCaseText = text.toLowerCase();
    return format.capitalize(lowerCaseText);
  }
  static beforeRouteEnter(to, from, next) {
    const token = localStorage.getItem('auth-token');
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
    const token = localStorage.getItem('auth-token')
    if (!token) {
      next({ path: '/' })
    } else {
      next();
    }
  }
  static beforeRouteLeave(to, from, next) {
    const token = localStorage.getItem('auth-token')
    if (!token) {
      next(false);
    } else {
      next();
    }
  }
}
export default Helper
