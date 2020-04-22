BEGIN;

DROP TABLE IF EXISTS users, dogs CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE dogs (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  breed VARCHAR(255),
  owner INTEGER REFERENCES users(id)
);

INSERT INTO users (email, name, password) VALUES
  ('oli@oli.com', 'oli', 'password123')
;

INSERT INTO dogs (name, breed, owner) VALUES
  ('Luna', 'Cocker Spaniel', 1)
;

COMMIT;
