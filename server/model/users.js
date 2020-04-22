const db = require("../database/connection");

function createUser(user) {
  const { email, name, password } = user;
  return db
    .query(
      `
      INSERT INTO users(email, name, password)
      VALUES ($1, $2, $3)
      RETURNING id, email, name
    `,
      [email, name, password]
    )
    .then((res) => res.rows);
}

function getUser(email) {
  return db
    .query(`SELECT id, email, name FROM users WHERE email = $1`, [email])
    .then((res) => res.rows[0]);
}

function getUserById(id) {
  return db
    .query(`SELECT id, email, name FROM users WHERE id = $1`, [id])
    .then((res) => res.rows[0]);
}

module.exports = {
  createUser,
  getUser,
  getUserById,
};
