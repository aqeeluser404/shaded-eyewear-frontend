// Assuming you have a logging service like this
class Logger {
  static error(error) {
    // Send error to your logging service here
    // console.error(error);
    throw error
  }
}

export default Logger
