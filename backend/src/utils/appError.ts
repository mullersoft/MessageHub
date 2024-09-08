class AppError extends Error {
  public statusCode: number;
  status: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message); // Call the parent constructor with the error message
    this.statusCode = statusCode; // Store the status code
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"; // Determine if the error is operational or not
    this.isOperational = true; // Flag to identify if the error is operational
    Error.captureStackTrace(this, this.constructor); // Capture the stack trace
  }
}

export default AppError;
