const db = require("../database/connection");

function getAllDogs() {
  return db
    .query(`SELECT id, name, breed, owner FROM dogs`)
    .then((res) => res.rows);
}

function getDog(id) {
  return db
    .query(`SELECT id, name, breed, owner FROM dogs WHERE id = $1`, [id])
    .then((res) => {
      const dog = res.rows[0];
      if (!dog) {
        const error = new Error(`Dog with ID '${id}' not found`);
        error.status = 404;
        throw error;
      }
      return dog;
    });
}

function createDog(dog) {
  const { name, breed, owner } = dog;
  return db
    .query(
      `
      INSERT INTO dogs(name, breed, owner)
      VALUES ($1, $2, $3)
      RETURNING id, name, breed, owner
    `,
      [name, breed, owner]
    )
    .then((res) => res.rows);
}

function updateDog(id, newDog) {
  const { name, breed } = newDog;
  return db
    .query(
      `UPDATE dogs SET name = COALESCE($2, name), breed = COALESCE($3, breed) WHERE id = $1 RETURNING id, name, breed, owner`,
      [id, name, breed]
    )
    .then((res) => res.rows[0]);
}

function deleteDog(id) {
  return db.query(`DELETE FROM dogs WHERE id = $1`, [id]);
}

module.exports = {
  getAllDogs,
  getDog,
  createDog,
  updateDog,
  deleteDog,
};
