# Backend Server

A Node.js/Express backend server with MongoDB integration.

## Environment Setup

The backend uses environment variables for configuration. Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

### Environment Variables

- `PORT`: Server port (default: 4000)
- `NODE_ENV`: Environment mode (development/production)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `JWT_EXPIRES_IN`: JWT token expiration time
- `CLIENT_URL`: Frontend URL for CORS

## Installation

```bash
npm install
```

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## API Endpoints

- `GET /` - Server status and info
- `GET /health` - Health check endpoint

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **cors**: Cross-origin resource sharing
- **morgan**: HTTP request logger
- **dotenv**: Environment variable loader
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT token handling
- **multer**: File upload handling

## Development Dependencies

- **nodemon**: Auto-restart server during development
