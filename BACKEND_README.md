# Campus Link Backend

Complete Node.js + Express backend with JWT authentication, OTP verification, and Supabase integration.

## Features

- **JWT Authentication**: Secure token-based authentication
- **OTP Admin Verification**: Admin login with OTP via Twilio (or simulated)
- **Multi-step User Approval**: New users are pending until approved by admin
- **Complete API**: Notes, Jobs, Discussions, Announcements, Posts
- **Supabase Integration**: PostgreSQL database with RLS
- **CORS Enabled**: Frontend-backend communication configured

## API Endpoints

### Authentication (`/api/auth`)
- `POST /signup` - Register new student (pending approval)
- `POST /login` - Student login
- `POST /admin/send-otp` - Send OTP to admin email
- `POST /admin/verify-otp` - Verify OTP and login admin

### Users (`/api/users`)
- `GET /pending` - Get pending users (Admin only)
- `PUT /:id/approve` - Approve user (Admin only)
- `PUT /:id/reject` - Reject user (Admin only)
- `GET /profile` - Get current user profile

### Notes (`/api/notes`)
- `GET /` - Get all notes
- `POST /` - Create new note
- `POST /:id/download` - Track note download

### Jobs (`/api/jobs`)
- `GET /` - Get all jobs (with filters)
- `POST /` - Create job posting (Admin only)

### Discussions (`/api/discussions`)
- `GET /` - Get all discussions
- `POST /` - Create new discussion
- `GET /:id` - Get discussion with replies
- `POST /:discussionId/replies` - Add reply to discussion

### Announcements (`/api/announcements`)
- `GET /` - Get all announcements
- `POST /` - Create announcement (Admin only)

### Posts (`/api/posts`)
- `GET /` - Get all feed posts
- `POST /` - Create new post
- `POST /:id/like` - Like a post

## Setup Instructions

1. **Environment Variables**: Make sure your `.env` file has:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   JWT_SECRET=your_secret_key
   PORT=3000
   ```

2. **Database**: The database schema is already created in Supabase

3. **Create First Admin** (Run this in Supabase SQL Editor):
   ```sql
   INSERT INTO users (email, password, full_name, role, status)
   VALUES (
     'admin@university.edu',
     '$2a$10$YourHashedPasswordHere',
     'Admin User',
     'admin',
     'approved'
   );
   ```
   Use bcrypt to hash password: https://bcrypt-generator.com/

4. **Run the Application**:
   ```bash
   npm run dev
   ```
   This starts both frontend (port 8080) and backend (port 3000)

5. **Or run separately**:
   ```bash
   npm run server  # Backend only
   npm run client  # Frontend only
   ```

## Testing the Backend

### Test Student Signup:
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@university.edu",
    "password": "password123",
    "fullName": "John Doe",
    "department": "Computer Science",
    "year": "Junior"
  }'
```

### Test Student Login (after approval):
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@university.edu",
    "password": "password123"
  }'
```

### Test Admin OTP Send:
```bash
curl -X POST http://localhost:3000/api/auth/admin/send-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@university.edu"
  }'
```

### Test Admin OTP Verify:
```bash
curl -X POST http://localhost:3000/api/auth/admin/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@university.edu",
    "otp": "123456"
  }'
```

## User Approval Flow

1. Student signs up → Status: `pending`
2. Admin logs in → Gets list of pending users
3. Admin approves user → Status: `approved`
4. Student can now login and access the platform

## Twilio Configuration (Optional)

To enable SMS OTP, add to `.env`:
```
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_number
```

Without Twilio, OTP is logged to console (development mode).

## Security Notes

- All passwords are hashed with bcrypt
- JWT tokens expire in 7 days
- OTP expires in 10 minutes
- Row Level Security (RLS) enabled on all tables
- CORS configured for frontend access
- Admins can only create jobs and announcements
- Students need approval before accessing the platform
