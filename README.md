# Dogs REST API

This is a test API for Founders and Coders students to build apps with.

## Run locally

1. Clone this repo
1. `npm install` all dependencies
1. Setup environment variables (see below)
1. `npm run dev` to start the dev server

## Docs

Current version is `v1`, so make sure that is in all URLs. The base URL is `https://dogs-rest.herokuapp.com/v1/`.

### Users

| Path           | Method | Body                                                      | Example response                                                            |
| -------------- | ------ | --------------------------------------------------------- | --------------------------------------------------------------------------- |
| `/users/:id`   | `GET`  | n/a                                                       | `{ "id": 1, "email": "o@o.com", "name": "oli" }`                            |
| `/users/`      | `POST` | `{ "email: "o@o.com", "name": "oli", "password": "123" }` | `{ "id": 1, "email": "o@o.com", "name": "oli", "access_token": "ey5a..." }` |
| `/users/login` | `POST` | `{ "email": "o@o.com", "password": "123" }`               | `{ "id": 1, "access_token": "ey5a..." }`                                    |

### Dogs

| Path        | Method   | Body                                        | Example response                                                       |
| ----------- | -------- | ------------------------------------------- | ---------------------------------------------------------------------- |
| `/dogs/`    | `GET`    | n/a                                         | `[{ "id": 1, "name": "Luna", "breed": "Cocker Spaniel", "owner": 1 }]` |
| `/dogs/:id` | `GET`    | n/a                                         | `{ "id": 1, "name": "Luna", "breed": "Cocker Spaniel", "owner": 1 }`   |
| `/dogs/`    | `POST`   | `{ "name": "Pongo", "breed": "Dalmation" }` | `{ "id": 2, "name": "Pongo", "breed": "Dalmation", "owner": 1 }`       |
| `/dogs/:id` | `PUT`    | `{ "name": "Pongo2" }`                      | `{ "id": 2, "name": "Pongo2", "breed": "Dalmation", "owner": 1 }`      |
| `/dogs/:id` | `DELETE` | n/a                                         | n/a                                                                    |

#### Authentication

All non-GET `/dogs` endpoints require a bearer token sent in the `authorization` header. For example `Bearer ey6sjbnafdn.asbdabkjn`. The token should be the JWT returned from the `POST /users` and `POST /users/login` endpoints.

Updating or deleting a dog also requires that the authenticated user be the owner of that dog (i.e. the dog's `owner` ID matches the user's `id`).
