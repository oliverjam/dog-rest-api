# Dogs REST API

This is a test API for Founders and Coders students to build apps with.

## Run locally

1. Clone this repo
1. `npm install` all dependencies
1. Setup environment variables (see below)
1. `npm run dev` to start the dev server

## Docs

The base URL is `https://dogs-rest.herokuapp.com/v1/`.

All endpoints marked with "Authenticated" require a bearer token sent in the `authorization` header. The token should be the JWT returned from either creating a new user or logging in.

Here's an example of an authenticated request using `fetch` in JavaScript:

```js
const token = "ey5a..."
fetch("https://dogs-rest.herokuapp.com/v1/users/me", {
  headers: {
    "content-type": "application/json",
    authorization: `Bearer ${token}`
}).then(user => console.log(user))
```

### Users

#### Get the logged in user `GET /users/me/`

- [x] Authenticated

Fetch the logged in user by the access token sent in the `authorization` header.

#### Create new user `POST /users/`

- [ ] Authenticated

Creates a new user and returns it.

##### Example request

```json
{ "email": "o@o.com", "name": "oli", "password": "123" }
```

##### Example response

```json
{ "id": 1, "email": "o@o.com", "name": "oli", "access_token": "ey5a..." }
```

#### Log in `POST /users/login/`

- [ ] Authenticated

Exchange an email and password for an access_token, which should be sent to authenticate future requests. Tokens expire after 7 days.

##### Example request

```json
{ "email": "o@o.com", "password": "123" }
```

##### Example response

```json
{ "id": 1, "email": "o@o.com", "name": "oli", "access_token": "ey5a..." }
```

### Dogs

#### Get all dogs `GET /dogs/`

- [ ] Authenticated

Fetch every dog in the database.

##### Example response

```json
[{ "id": 1, "name": "Luna", "breed": "Cocker Spaniel", "owner": 1 }]
```

#### Get a dog `GET /dogs/:id/`

- [ ] Authenticated

Fetch a dog by its ID.

##### Example response

```json
{ "id": 1, "name": "Luna", "breed": "Cocker Spaniel", "owner": 1 }
```

#### Create a dog `POST /dogs/`

- [x] Authenticated

Add a new dog. Owner field will be set to the ID of the authenticated user.

##### Example request

```json
{ "name": "Pongo", "breed": "Dalmation" }
```

##### Example response

```json
{ "id": 2, "name": "Pongo", "breed": "Dalmation", "owner": 1 }
```

#### Update a dog `PUT /dogs/`

- [x] Authenticated

Update a dog. The authenticated user must be the owner of the dog.

##### Example request

```json
{ "name": "Pongo2" }
```

##### Example response

```json
{ "id": 2, "name": "Pongo2", "breed": "Dalmation", "owner": 1 }
```

#### Delete a dog `DELETE /dogs/`

- [x] Authenticated

Delete a dog. The authenticated user must be the owner of the dog.

### Schema

#### Users

| Column   | Type         | Constraints |
| -------- | ------------ | ----------- |
| id       | SERIAL       | PRIMARY KEY |
| email    | VARCHAR(255) | NOT NULL    |
| name     | VARCHAR(255) |
| password | VARCHAR(255) |

#### Dogs

| Column | Type         | Constraints          |
| ------ | ------------ | -------------------- |
| id     | SERIAL       | PRIMARY KEY          |
| name   | VARCHAR(255) |
| breed  | VARCHAR(255) |
| owner  | INTEGER      | REFERENCES users(id) |
