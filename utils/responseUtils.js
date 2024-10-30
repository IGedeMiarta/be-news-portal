
export const successResponse = (res, message, data = null) => {
  return res.status(200).json({
    status: "success",
    message,
    data,
  });
};

export const errorResponse = (res, message, errors = null) => {
  return res.status(400).json({
    status: "error",
    message,
    errors,
  });
};

export const unauthorizedResponse = (res, message = "Unauthorized") => {
  return res.status(401).json({
    status: "error",
    message,
  });
};

export const forbiddenResponse = (res, message = "Forbidden") => {
  return res.status(403).json({
    status: "error",
    message,
  });
};

export const notFoundResponse = (res, message = "Not Found") => {
  return res.status(404).json({
    status: "error",
    message,
  });
}

export const methodNotAllowedResponse = (res, message = "Method Not Allowed") => {
  return res.status(405).json({
    status: "error",
    message,
  });
}

export const serverErrorResponse = (res, message = "Internal Server Error") => {
  return res.status(500).json({
    status: "error",
    message,
  });
}


