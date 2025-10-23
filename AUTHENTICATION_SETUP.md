# Authentication System Setup

This document provides instructions for setting up and running the authentication system for the HungYenSound music streaming application.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Backend Setup

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - The `.env` file is already created with default values
   - For production, update the `JWT_SECRET` with a strong, random string
   - Update `MONGODB_URI` to point to your MongoDB instance

4. Start the backend server:
   ```bash
   npm run dev
   ```
   
   The server will start on `http://localhost:5000`

## Frontend Setup

1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   
   The frontend will start on `http://localhost:5173`

## Authentication Features

### Backend Features
- User registration with email validation
- User login with JWT token generation
- Password hashing using bcryptjs
- JWT token verification middleware
- User profile management
- Password change functionality
- Protected routes with authentication

### Frontend Features
- Login modal with form validation
- Sign up page with password confirmation
- Protected routes (Profile, My Playlists)
- User context for state management
- Change password modal
- Automatic token management
- Loading states and error handling

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change user password
- `POST /api/auth/logout` - Logout user

### Health Check
- `GET /api/health` - Server health check

## Usage

1. Start both backend and frontend servers
2. Open the application in your browser
3. Click "Sign In" to open the login modal
4. Or navigate to `/signup` to create a new account
5. Once logged in, you can access protected routes like Profile and My Playlists

## Security Features

- Passwords are hashed using bcryptjs
- JWT tokens expire after 7 days
- CORS enabled for frontend communication
- Input validation on both client and server
- Protected routes require authentication

## Troubleshooting

- Ensure MongoDB is running if using local installation
- Check that both servers are running on the correct ports
- Verify environment variables are set correctly
- Check browser console for any CORS or network errors

## Development Notes

- The authentication system uses JWT tokens stored in localStorage
- User state is managed through React Context
- All API calls include proper error handling
- Forms include client-side validation
- Loading states provide good user experience