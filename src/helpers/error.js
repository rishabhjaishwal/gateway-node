class CustomError extends Error {
    constructor(statusCode, message) {
      super();
      this.statusCode = statusCode || 500;
      this.message = message || "Internal server error";
    }
  }
  
  
  module.exports = {
    CustomError
  };