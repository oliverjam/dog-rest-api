const db = require("../database/connection");

function getAllDogs() {
  return db
    .query(`SELECT id, name, breed, image, owner FROM dogs`)
    .then((res) => res.rows);
}

function getDog(id) {
  return db
    .query(`SELECT id, name, breed, image, owner FROM dogs WHERE id = $1`, [id])
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
  const { name, breed, image, owner } = dog;
  return db
    .query(
      `
      INSERT INTO dogs(name, breed, image, owner)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, breed, image, owner
    `,
      [name, breed, image, owner]
    )
    .then((res) => res.rows);
}

function updateDog(id, newDog) {
  const { name, breed, image } = newDog;
  return db
    .query(
      `UPDATE dogs SET name = COALESCE($2, name), breed = COALESCE($3, breed), image = COALESCE($4, image) WHERE id = $1 RETURNING id, name, breed, image, owner`,
      [id, name, breed, image]
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
