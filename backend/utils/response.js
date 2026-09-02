export function success(res, data, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    data,
  });
}

export function error(res, message, statusCode = 500) {
  return res.status(statusCode).json({
    success: false,
    error: message,
  });
}
