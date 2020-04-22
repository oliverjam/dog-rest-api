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
