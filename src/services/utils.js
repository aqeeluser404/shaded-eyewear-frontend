import { format } from 'quasar'

// date formatter
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-GB')
}

// capitalize first letter
export function capitalizeFirstLetter(text) {
  if (!text) return '';
  const lowerCaseText = text.toLowerCase();
  return format.capitalize(lowerCaseText);
}

// prevent page access
export function beforeRouteEnter(to, from, next) {
  const token = localStorage.getItem('auth-token');
  if (token) {
    next({ path: '/' }) // Redirect to home if authenticated
  } else {
    next() // Proceed to the login page if not authenticated
  }
}

// prevent page leave
export function beforeRouteLeave(to, from, next) {
  const token = localStorage.getItem('auth-token');
  if (!token) {
    next(false);
  } else {
    next();
  }
}

