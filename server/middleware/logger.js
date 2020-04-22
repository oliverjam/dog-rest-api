function logger(req, res, next) {
  const time = new Date().toLocaleTimeString("en-GB");
  console.log(`${time} ${req.method} ${req.url}`);
  next();
}

module.exports = logger;
