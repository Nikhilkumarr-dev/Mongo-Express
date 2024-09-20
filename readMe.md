Todo App with User Authentication
This is a Node.js application that implements a simple Todo management system with user signup, login, and JWT-based authentication. Users can sign up, log in, and manage their todos.

Features
User Signup and Login with hashed passwords using bcrypt
JSON Web Token (JWT) based user authentication
CRUD operations on Todo tasks
Validation of user input using Zod
MongoDB integration for data persistence using Mongoose
Prerequisites
Node.js installed
MongoDB Atlas or local MongoDB instance
A MongoDB URI for database connection

API Endpoints
1. User Signup
Endpoint: /signup

Method: POST

2. User Signin
Endpoint: /signin

Method: POST

3. Create Todo
Endpoint: /todo

Method: POST

4. Get Todos
Endpoint: /todos

Method: POST

5. Update Todos
Endpoint: /todoList

Method: POST

Code Structure:

app.js
Express Application: Handles HTTP requests and defines routes for user authentication and Todo operations.
MongoDB Connection: Uses Mongoose to connect to a MongoDB Atlas cluster.
bcrypt: Used for hashing user passwords before storing them in the database.
jsonwebtoken: Used to sign and verify JWT tokens for authentication.
Zod: Used for schema validation, ensuring correct input data for user signup.

db.js
Defines UserModel and TodoModel using Mongoose schemas.
Models are exported for use in app.js.

Schema Definitions:
User Schema: Defines email, password, and name fields.
Todo Schema: Defines title, done, and userId (reference to the user) fields.


Error Handling
JWT errors and input validation errors are handled with appropriate HTTP status codes and error messages.
All asynchronous operations are wrapped in try-catch blocks to handle potential runtime errors.


Technologies Used
Node.js: Server-side JavaScript runtime.
Express: Web framework for Node.js.
Mongoose: ODM for MongoDB to define schemas and interact with the database.
bcrypt: Password hashing library for secure password storage.
jsonwebtoken (JWT): Token-based authentication.
Zod: Validation library for user input.
MongoDB Atlas: Cloud-based MongoDB database.


Future Improvements
Add frontend for user interaction.
Implement pagination and filtering on the todo list.
Add email verification on signup.