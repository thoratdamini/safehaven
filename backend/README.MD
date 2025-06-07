# Backend Application

This backend application serves as the server-side component for managing users, posts, comments, camps, news, queries, and newsletter subscriptions. It provides various API endpoints for performing CRUD (Create, Read, Update, Delete) operations and other functionalities.

## Technologies Used

- **Node.js**: JavaScript runtime environment for building server-side applications.
- **Express.js**: Web application framework for Node.js, used for handling HTTP requests and routing.
- **MongoDB**: NoSQL database used for storing application data.
- **Mongoose**: MongoDB object modeling tool for Node.js, used for interacting with MongoDB databases.
- **JSON Web Tokens (JWT)**: Authentication mechanism for securing routes and managing user sessions.
- **Nodemailer**: Module for sending emails from Node.js applications.
- **Multer**: Middleware for handling multipart/form-data, used for file uploads.
- **dotenv**: Module for loading environment variables from a .env file into process.env.

## Directory Structure

- **/controller**: Contains controller files for each entity (user, post, comment, camp, news, query, newsletter).
- **/database**: Contains the database configuration file.
- **/model**: Contains Mongoose schema definitions for each entity.
- **/routes**: Contains route files defining API endpoints.
- **/utils**: Contains utility files used across the application.
- **app.js**: Main entry point of the application.
- **server.js**: Secondary entry point for starting the server.

## Controller

The controller directory contains files responsible for handling HTTP requests, processing data, and sending responses. Each controller file corresponds to a specific entity in the application and implements functions for CRUD operations and other functionalities related to that entity.

## Routes

The routes directory contains files defining API endpoints for different functionalities of the application. Each route file maps specific URL paths to corresponding controller functions. The routes are organized based on the entities they operate on.

## Database Connection

The database configuration is handled in the `database/db.js` file, where the connection to the MongoDB database is established using the Mongoose library. The database credentials are retrieved from environment variables stored in a `.env` file.

## Services

The backend provides the following services:

- **User Management**: Sign up, login, retrieve user details, delete user.
- **Post Management**: Create, retrieve, update, delete posts, search posts.
- **Comment Management**: Add, retrieve, delete comments.
- **Camp Management**: Add, retrieve, update, delete camps.
- **News Management**: Add, retrieve, update, delete news.
- **Query Management**: Send email queries, retrieve queries, delete query.
- **Newsletter Subscription**: Add, retrieve newsletter subscriptions.
