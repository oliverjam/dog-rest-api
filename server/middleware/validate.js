function validate(required) {
  return function (req, res, next) {
    if (!req.body) {
      const error = new Error("Request body is required");
      error.status = 400;
      return next(error);
    }
    const type = req.get("content-type");
    if (!type || !type.includes("json")) {
      const error = new Error("Request body must be JSON format");
      error.status = 415;
      return next(error);
    }
    if (required) {
      const keys = Object.keys(req.body);
      const missing = required.filter(
        (requiredKey) => !keys.includes(requiredKey)
      );
      if (missing.length) {
        const error = new Error(
          `The following fields are required: [${missing.join(", ")}]`
        );
        error.status = 400;
        return next(error);
      }
    }
    next();
  };
}

module.exports = validate;
