# ChatMeow API

Backend API for [ChatMeow](https://github.com/masterweb801/ChatMeow), a React-based social and messaging application.

## Stack

- Node.js
- Express 4
- MongoDB with Mongoose
- JWT-based authentication
- bcrypt password hashing
- dotenv for environment configuration
- CORS and response compression

## API areas

The server currently mounts these route groups:

| Base path | Purpose |
|---|---|
| /api/signup | Account registration |
| /api/login | User authentication |
| /api/getUser | Retrieve a user |
| /api/allUser | Retrieve users |
| /api/post | Create a post |
| /api/usrPost | Retrieve a user's posts |
| /api/likePost | Like a post |
| /api/allPosts | Retrieve posts |
| /api/delPost | Delete a post |
| /api/newChat | Create a chat |
| /api/allChat | Retrieve chats |

Check the route files for the exact request body, query parameters, and response format before integrating a client.

## Requirements

- Node.js
- npm
- A MongoDB database

## Configuration

Create a local .env file in the project root with this variable:

    DB_URI=your_mongodb_connection_string

Keep real credentials out of Git. Never commit your production MongoDB URI, JWT secrets, or other private values.

## Install and run

    npm install
    node index.js

The current server listens on port 5000.

## Related project

- [ChatMeow frontend](https://github.com/masterweb801/ChatMeow)

---

Built by [Mobashshirul Karim](https://github.com/masterweb801).
