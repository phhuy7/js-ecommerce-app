# JS E-commerce App Backend

A Node.js Express backend for an e-commerce application with authentication, authorization, and role/permission management.

## Features

- User authentication (JWT)
- Role-based and permission-based authorization
- RESTful API with Swagger docs
- MongoDB (Mongoose)
- Secure password hashing (bcryptjs)

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

```bash
git clone https://github.com/yourusername/js-ecommerce-app.git
cd js-ecommerce-app/be
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Edit `.env`:

```
MONGO_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=1h
```

### Running the App

From the `/be` directory, run:

```bash
npm run serve
```

Or, for development with auto-reload (after installing nodemon):

```bash
npm run serve
```

### API Documentation

Swagger docs available at:  
`http://localhost:3000/api-docs`

## Dependencies

- mongoose
- cors
- jsonwebtoken
- bcryptjs
- uuid
- express-validator
- dotenv

## License

MIT