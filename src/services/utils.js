import { format } from 'quasar'
import { jwtDecode } from 'jwt-decode'
import CryptoJS from 'crypto-js';
import axios from 'axios';

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

  // static getImageUrl(imagePath) {
  //   try {
  //     const isProduction = process.env.NODE_ENV === 'production';
  //     const serverUrl = isProduction
  //       ? 'https://shaded-eyewear-backend.onrender.com/uploads/'
  //       : 'http://localhost:5000/uploads/';
  //     const localDir = isProduction
  //       ? '/app/uploads/' // Example path for production
  //       : 'C:\\Users\\TerrorX\\Downloads\\WLV\\Projects\\Sunglasses\\Shaded Eyewear\\server\\uploads\\';
  //     const relativePath = imagePath.replace(localDir, '');
  //     return serverUrl + relativePath;
  //   } catch (error) {
  //     console.error('Error generating image URL:', error);
  //     return ''; // Return a default value or handle the error appropriately
  //   }
  // }
  // static getImageUrl(imagePath) {
  //   try {
  //     const serverUrl = 'https://shaded-eyewear-backend.onrender.com/uploads/';
  //     const localDir = '/app/uploads/'; // Example path for production
  //     const relativePath = imagePath.replace(localDir, '');
  //     return serverUrl + relativePath;
  //   } catch (error) {
  //     console.error('Error generating image URL:', error);
  //     return ''; // Return a default value or handle the error appropriately
  //   }
  // }

  static getImageUrl(imagePath) {
    try {
        // Check if imagePath is an object and extract imageUrl
        if (imagePath && typeof imagePath === 'object' && typeof imagePath.imageUrl === 'string' && imagePath.imageUrl.startsWith('https://ik.imagekit.io')) {
            return imagePath.imageUrl;
        }
        // Check if imagePath is a valid URL string directly
        if (typeof imagePath === 'string' && imagePath.startsWith('https://ik.imagekit.io')) {
            return imagePath;
        }
        // Handle invalid imagePath or non-string values
        console.error('Invalid image path:', imagePath);
        return 'https://ik.imagekit.io/default.jpg'; // Fallback image
    } catch (error) {
        console.error('Error generating image URL:', error);
        return 'https://ik.imagekit.io/default.jpg'; // Default fallback image
    }
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
  // Function to check if the cookie exists on the server-side
  static async checkCookie() {
    try {
        const response = await axios.get(`${process.env.API_BASE_URL}/check-token`, { withCredentials: true });
        return response.data.exists; // Assuming the server returns { exists: true/false }
    } catch (error) {
        console.error('Error checking token existence:', error);
        return false;
    }
  }

  // Function to get the cookie from the backend
  static async getCookie(name) {
    try {
        if (name === 'token') {
            const response = await axios.get(`${process.env.API_BASE_URL}/get-token`, { withCredentials: true });
            return response.data || null;
        } else {
            console.log(`Cookie ${name} not found`);
            return null;
        }
    } catch (error) {
        console.error('Error fetching token from backend:', error);
        return null;
    }
  }

  static async removeCookie(name) {
    try {
      await axios.post(`${process.env.API_BASE_URL}/remove-token`, {}, { withCredentials: true });
    } catch (error) {
      console.error(`Error removing cookie ${name}:`, error);
    }
  }



  // static getCookie(name) {
  //     const cookies = document.cookie.split(';')
  //     for (let i = 0; i < cookies.length; i++) {
  //       const cookie = cookies[i].trim()
  //       if (cookie.startsWith(`${name}=`)) {
  //         return cookie.substring(name.length + 1)
  //       }
  //     }
  //     console.log(`Cookie ${name} not found`);
  //     return null
  // }

  // static removeCookie(name) {
  //   // Set the cookie with the same name and expiration date in the past
  //   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  // }
  static beforeRouteEnter(to, from, next) {
    Helper.getCookie('token').then((token) => {
      if (!token) {
        next({ path: '/' }); // Redirect to home if no token
      } else {
        next(); // Proceed to the requested route
      }
    }).catch((error) => {
      console.error('Error fetching token:', error);
      next({ path: '/' }); // Handle the error case
    });

        // const token = Helper.getCookie('token')
        // if (!token) {
        //   next({ path: '/' })
        // } else {
        //   const decodedToken = jwtDecode(token)
        //   const userType = decodedToken.userType
        //   if (userType === 'admin') {
        //     next()
        //   } else {
        //     next({ path: '/' })
        //   }
        // }
  }
  static beforeRouteEnterUser(to, from, next) {
    Helper.getCookie('token').then((token) => {
      // Check if token exists
      if (!token) {
        next({ path: '/' }); // Redirect to home if no token
      } else {
        next(); // Proceed to the requested route
      }
    }).catch((error) => {
      console.error('Error fetching token:', error);
      next({ path: '/' }); // Redirect in case of error
    });
    // const token = Helper.getCookie('token')
    // if (!token) {
    //   next({ path: '/' })
    // } else {
    //   next();
    // }
  }
  static beforeRouteLeave(to, from, next) {
    Helper.getCookie('token').then((token) => {
      // Check if token exists
      if (!token) {
        next(false); // Prevent navigation if no token
      } else {
        next(); // Allow navigation
      }
    }).catch((error) => {
      console.error('Error fetching token:', error);
      next(false); // Prevent navigation in case of error
    });
    // const token = Helper.getCookie('token')
    // if (!token) {
    //   next(false);
    // } else {
    //   next();
    // }
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
