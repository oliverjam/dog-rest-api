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

#### `GET /users/me/`

- [x] Authenticated

Fetch the logged in user by the access token sent in the `authorization` header.

#### `GET /users/:id/`

- [ ] Authenticated

Fetch a user by their ID.

#### `POST /users/`

- [ ] Authenticated

Create a new user.

##### Example request

```json
{ "email": "o@o.com", "name": "oli", "password": "123" }
```

##### Example response

```json
{ "id": 1, "email": "o@o.com", "name": "oli", "access_token": "ey5a..." }
```

#### `POST /users/login/`

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

#### `GET /dogs//`

- [ ] Authenticated

Fetch every dog in the database.

##### Example response

```json
[{ "id": 1, "name": "Luna", "breed": "Cocker Spaniel", "owner": 1 }]
```

#### `GET /dogs/:id/`

- [ ] Authenticated

Fetch a dog by its ID.

##### Example response

```json
{ "id": 1, "name": "Luna", "breed": "Cocker Spaniel", "owner": 1 }
```

#### `POST /dogs/`

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

#### `PUT /dogs/`

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

#### `DELETE /dogs/`

- [x] Authenticated

Delete a dog. The authenticated user must be the owner of the dog.

### Authentication

All non-GET `/dogs` endpoints require a bearer token sent in the `authorization` header. For example `Bearer ey6sjbnafdn.asbdabkjn`. The token should be the JWT returned from the `POST /users` and `POST /users/login` endpoints.

Updating or deleting a dog also requires that the authenticated user be the owner of that dog (i.e. the dog's `owner` ID matches the user's `id`).

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

## Postman

[Postman](https://www.postman.com/) is a useful tool for developing against an API. You can import my collection which contains pre-built requests for each endpoint. Save the JSON below and then go to File > Import... in Postman to import the JSON file.

<details>
<summary>Click to reveal the JSON</summary>

```json
{
  "info": {
    "_postman_id": "b0655c9a-096b-4575-b15c-aecedcef8f1d",
    "name": "Dogs REST API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Create user",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "name": "Content-Type",
            "value": "application/json",
            "type": "text"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n\t\"email\": \"oli@o.com\",\n\t\"password\": \"123\",\n\t\"name\": \"oli\"\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "https://dogs-rest.herokuapp.com/v1/users",
          "protocol": "https",
          "host": ["dogs-rest", "herokuapp", "com"],
          "path": ["v1", "users"]
        }
      },
      "response": []
    },
    {
      "name": "Log in",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "name": "Content-Type",
            "type": "text",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n\t\"email\": \"oli@oli.com\",\n\t\"breed\": \"password123\"\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "https://dogs-rest.herokuapp.com/v1/users/login",
          "protocol": "https",
          "host": ["dogs-rest", "herokuapp", "com"],
          "path": ["v1", "users", "login"]
        }
      },
      "response": []
    },
    {
      "name": "Create dog",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "name": "Content-Type",
            "type": "text",
            "value": "application/json"
          },
          {
            "key": "Authorization",
            "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxNTg2NzAxOTczNzE3LCJpYXQiOjE1ODY3MDMxMTYsImV4cCI6MTU4NjcwNjcxNn0.aM32hs0aFB9FzeBQI7IW0m0GLEVoMBKo_Qhkh8ulOOs",
            "type": "text",
            "disabled": true
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n\t\"name\": \"Pongo\",\n\t\"breed\": \"Dalmation\"\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "https://dogs-rest.herokuapp.com/v1/dogs",
          "protocol": "https",
          "host": ["dogs-rest", "herokuapp", "com"],
          "path": ["v1", "dogs"]
        }
      },
      "response": []
    },
    {
      "name": "Get all dogs",
      "protocolProfileBehavior": {
        "disableBodyPruning": true
      },
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Content-Type",
            "name": "Content-Type",
            "type": "text",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "https://dogs-rest.herokuapp.com/v1/dogs",
          "protocol": "https",
          "host": ["dogs-rest", "herokuapp", "com"],
          "path": ["v1", "dogs"]
        }
      },
      "response": []
    },
    {
      "name": "Get dog",
      "protocolProfileBehavior": {
        "disableBodyPruning": true
      },
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Content-Type",
            "name": "Content-Type",
            "type": "text",
            "value": "application/json"
          },
          {
            "key": "Authorization",
            "type": "text",
            "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxNTg2NzAxOTczNzE3LCJpYXQiOjE1ODY3MDMxMTYsImV4cCI6MTU4NjcwNjcxNn0.aM32hs0aFB9FzeBQI7IW0m0GLEVoMBKo_Qhkh8ulOOs",
            "disabled": true
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "https://dogs-rest.herokuapp.com/v1/dogs/1",
          "protocol": "https",
          "host": ["dogs-rest", "herokuapp", "com"],
          "path": ["v1", "dogs", "1"]
        }
      },
      "response": []
    },
    {
      "name": "Delete dog",
      "request": {
        "method": "DELETE",
        "header": [
          {
            "key": "Content-Type",
            "name": "Content-Type",
            "type": "text",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "https://dogs-rest.herokuapp.com/v1/dogs/3",
          "protocol": "https",
          "host": ["dogs-rest", "herokuapp", "com"],
          "path": ["v1", "dogs", "3"]
        }
      },
      "response": []
    },
    {
      "name": "Update dog",
      "request": {
        "method": "PUT",
        "header": [
          {
            "key": "Content-Type",
            "name": "Content-Type",
            "type": "text",
            "value": "application/json"
          },
          {
            "key": "Authorization",
            "type": "text",
            "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxNTg2NzAxOTczNzE3LCJpYXQiOjE1ODY3MDMxMTYsImV4cCI6MTU4NjcwNjcxNn0.aM32hs0aFB9FzeBQI7IW0m0GLEVoMBKo_Qhkh8ulOOs"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n\t\"name\": \"Pongo4\",\n\t\"breed\": \"Dalmation\"\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "https://dogs-rest.herokuapp.com/v1/dogs/3",
          "protocol": "https",
          "host": ["dogs-rest", "herokuapp", "com"],
          "path": ["v1", "dogs", "3"]
        }
      },
      "response": []
    }
  ],
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJpYXQiOjE1ODc1NTI1MjQsImV4cCI6MTU4NzU1NjEyNH0.cu-53kfrS5WDhMkccyiAxnf0q691sl4KLvnTf0zCo6E",
        "type": "string"
      }
    ]
  },
  "event": [
    {
      "listen": "prerequest",
      "script": {
        "id": "41836924-9670-43ee-b1c0-2b51e8231746",
        "type": "text/javascript",
        "exec": [""]
      }
    },
    {
      "listen": "test",
      "script": {
        "id": "a8e31be7-dfc2-45c6-8f30-c2150f557be9",
        "type": "text/javascript",
        "exec": [""]
      }
    }
  ],
  "protocolProfileBehavior": {}
}
```

</details>
