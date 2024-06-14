# 📝 Messenger AIP

## 📜 Description
### Instant messaging application, supports:
- user registration and authorization in the system (JWT Auth)
- searching and adding users as friends
- exchanging messages with users (via websocket)
- swagger documentation support
- database - `PostgreSQL`

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

### The application will start on port 8080

#### Go to http://localhost:8080/api to access the application documentation (Swagger).


### ❗ Since the database is located on the free service https://render.com, there is a probability of a connection error to the database (due to the expiration of the free tariff). For further possibility of testing the application, please [contact me](https://t.me/Medvedev_ya)