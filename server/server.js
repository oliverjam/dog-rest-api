const express = require("express");
const cors = require("cors");
const dogs = require("./handlers/dogs");
const users = require("./handlers/users");
const logger = require("./middleware/logger");
const verifyUser = require("./middleware/auth");
const handleError = require("./middleware/error");
const validate = require("./middleware/validate");

const server = express();

server.use(cors());
server.use(express.json());
server.use(logger);

server.get("/v1/dogs", dogs.getAll);
server.get("/v1/dogs/:id", dogs.get);
server.post("/v1/dogs/", verifyUser, validate(["name", "breed"]), dogs.post);
server.put("/v1/dogs/:id", verifyUser, validate(), dogs.put);
server.delete("/v1/dogs/:id", verifyUser, dogs.del);

server.get("/v1/users/me", verifyUser, users.getByToken);
server.get("/v1/users/:id", users.get);
server.post("/v1/users", validate(["email", "password", "name"]), users.post);
server.put("/v1/users/:id", verifyUser, validate(), users.put);
server.delete("/v1/users/:id", verifyUser, users.del);
server.post("/v1/users/login", validate(["email", "password"]), users.login);

server.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});
server.use(handleError);

module.exports = server;
