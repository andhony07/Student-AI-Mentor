class ApiResponse {
  static success(res, message, data = {}, statusCode = 200) {
    return res.status(statusCode).json({
      status: 'success',
      message,
      data
    });
  }

  static error(res, message, statusCode = 500, errors = null) {
    const responsePayload = {
      status: 'error',
      message
    };
    if (errors) {
      responsePayload.errors = errors;
    }
    return res.status(statusCode).json(responsePayload);
  }
}

export default ApiResponse;
