# My Wardrobe App

1. [Context](#context)
2. [Get started](#setup)
    - [Dependencies](#dependencies)
    - [Database prep](#database-prep)
    - [Development](#development)
3. [Architecture](#architecture)
    - [Database schema](#database-schema)
    - [API routes plan](#API-routes-plan)
    - [Components](#components)
4. [Support](#support)

## Context

In this repository you will find a feature extension for My Wardrobe App, a project developed by @mariamb97 which allows the user to store and filter their closet contents.

## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- Navigate into the app folder `cd client` and run `npm install`. This will install client dependencies (React).

This project uses several additional libraries, which should also get installed when you run `npm install`. Here you can find more information about them:

- Sequelize <https://sequelize.org/master/>
- bcrypt <https://github.com/kelektiv/node.bcrypt.js>
- jwt / JSONwebtoken <https://github.com/auth0/node-jsonwebtoken>

- React router <https://reactrouter.com/>
- Axios <https://axios-http.com/>
- Noty <https://ned.im/noty/#/>
- Bootstrap <https://getbootstrap.com/>

### Database Prep

- Access the MySQL interface in a terminal by running `mysql -u root -p`
- Create a new database called boartracker: `create database boartracker`
- Add a `.env` file to the project folder of the repository containing the MySQL authentication information for MySQL user. For example:

```text

DB_HOST=localhost
DB_USER=root
DB_NAME=my_wardrobe
DB_PASS=YOUR_PASSWORD

```

(replace `YOUR_PASSWORD` with your actual password)

Type `mysql -u root -p` to access the MySQL CLI using your password.

In the MySQL CLI, type `create database my_wardrobe;` to create a database in MySQL.

- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create 4 tables called `categories`, `items`, `colors`, and `seasons` in your database.
- `categories` contains 14 rows
- `colors` contains 12 rows
- `seasons` contains 4 rows
  Check all them in the database to see the structure.
  Thay means that the only table that you have to fill is the `items` table (I added in the proyect folder an image folder that contains the URL's of the images I already used)

### Development

- Run `npm start` in project directory to start the Express server on port 5000
- In another terminal, do `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000.

Happy coding!

## Architecture

### Database schema

To be uploaded

### API routes plan

| URl                | HTTP METHOD | DESCRIPTION                 | REQUEST OBJECT                                                       | RESPONSE OBJECT                                                                                                       |
|--------------------|-------------|-----------------------------|----------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| /items/all         | GET         | Get all items               | n/a                                                                  | [ { id: integer, image: string, CategoryId: integer, createdAt: date, UpdatedAt: date, seasons: [], colors:[] }, ...] |
| /items/            | GET         | Get items by query params   | n/a                                                                  | [ { id: integer, image: string, CategoryId: integer, createdAt: date, UpdatedAt: date, seasons: [], colors:[] }, ...] |
| /items             | POST        | Create new item             | { image: string, CategoryId: integer, seasonsIds: [], colorsIds:[] } | [ { id: integer, image: string, CategoryId: integer, createdAt: date, UpdatedAt: date, seasons: [], colors:[] }, ...] |
| /api/sightings/:id | DELETE      | Delete sighting information | n/a                                                                  | [ { id: integer, image: string, CategoryId: integer, createdAt: date, UpdatedAt: date, seasons: [], colors:[] }, ...] |

| URl                    | HTTP METHOD | DESCRIPTION                | REQUEST OBJECT | RESPONSE OBJECT                                                                               |
|------------------------|-------------|----------------------------|----------------|-----------------------------------------------------------------------------------------------|
| /categories/           | GET         | Get all categories         | n/a            | [ { id: integer, name: string, createdAt: date, UpdatedAt: date }, ...]                       |
| /categories/:id/items/ | GET         | Gets items by category ID  | n/a            | [ { id: integer, image: string, CategoryId: integer, createdAt: date, UpdatedAt: date }, ...] |

| URl                | HTTP METHOD | DESCRIPTION             | REQUEST OBJECT | RESPONSE OBJECT                                                                                               |
|--------------------|-------------|-------------------------|----------------|---------------------------------------------------------------------------------------------------------------|
| /colors/           | GET         | Get all colors          | n/a            | [ { id: integer, name: string, createdAt: date, UpdatedAt: date }, ...]                                       |
| /colors/:id/items/ | GET         | Gets items by color ID  | n/a            | [ { id: integer, image: string, CategoryId: integer, createdAt: date, UpdatedAt: date, itemColors: {} }, ...] |

| URl                 | HTTP METHOD | DESCRIPTION              | REQUEST OBJECT | RESPONSE OBJECT                                                                                                |
|---------------------|-------------|--------------------------|----------------|----------------------------------------------------------------------------------------------------------------|
| /seasons/           | GET         | Get all seasons          | n/a            | [ { id: integer, name: string, createdAt: date, UpdatedAt: date }, ...]                                        |
| /seasons/:id/items/ | GET         | Gets items by season ID  | n/a            | [ { id: integer, image: string, CategoryId: integer, createdAt: date, UpdatedAt: date, itemSeasons: {} }, ...] |

| URl             | HTTP METHOD | DESCRIPTION                   | REQUEST OBJECT         | RESPONSE OBJECT |
|-----------------|-------------|-------------------------------|------------------------|-----------------|
| /users/login    | POST        | Provides authentication token | { username, password } | token           |
| /users/register | POST        | Adds new user to database     | { username, password } |                 |

## Components

- AddItemForm.js
- Closet.js
  - FilterList.js
    - CheckboxList.js
      - Item.js
- AuthProvider.js
  - Register.js
  - Login.js
- NavBar.js
  - PrivateRoute.js

## Support

Feel free to ask me any doubt :)
