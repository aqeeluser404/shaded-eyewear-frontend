const LOG_ERRORS = process.env.VUE_APP_LOG_ERRORS === 'true' || 'true';

const Logger = {
  error: (...args) => {
    if (LOG_ERRORS) {
      console.error(...args);
    }
  },
  warn: (...args) => {
    if (LOG_ERRORS) {
      console.warn(...args);
    }
  },
  info: (...args) => {
    if (LOG_ERRORS) {
      console.info(...args);
    }
  }
};

export default Logger;
