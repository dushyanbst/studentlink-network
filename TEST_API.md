# API Testing Guide

The backend is now running! Here's how to test each endpoint.

## Quick Start

1. **Start the full application**:
   ```bash
   npm run dev
   ```
   This runs both frontend (port 8080) and backend (port 3000)

2. **Or run separately**:
   ```bash
   npm run server  # Backend only (port 3000)
   npm run client  # Frontend only (port 8080)
   ```

## Admin Login Credentials

- Email: `admin@university.edu`
- Password: `admin123` (hashed in database)

## Test Endpoints

### 1. Health Check
```bash
curl http://localhost:3000/api/health
```

### 2. Student Signup
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@university.edu",
    "password": "password123",
    "fullName": "John Doe",
    "department": "Computer Science",
    "year": "Junior",
    "phone": "+1234567890"
  }'
```

### 3. Admin Login (with OTP)

Step 1 - Request OTP:
```bash
curl -X POST http://localhost:3000/api/auth/admin/send-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@university.edu"
  }'
```

Step 2 - Verify OTP (use the OTP from console output):
```bash
curl -X POST http://localhost:3000/api/auth/admin/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@university.edu",
    "otp": "YOUR_OTP_HERE"
  }'
```

Save the token from response!

### 4. Student Login (after approval)
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@university.edu",
    "password": "password123"
  }'
```

### 5. Get Pending Users (Admin only)
```bash
curl http://localhost:3000/api/users/pending \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### 6. Approve User (Admin only)
```bash
curl -X PUT http://localhost:3000/api/users/USER_ID/approve \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### 7. Get All Notes
```bash
curl http://localhost:3000/api/notes \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 8. Create Note
```bash
curl -X POST http://localhost:3000/api/notes \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Data Structures Notes",
    "subject": "Computer Science",
    "content": "Complete notes on linked lists and trees",
    "semester": "Fall 2024"
  }'
```

### 9. Get All Jobs
```bash
curl http://localhost:3000/api/jobs \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 10. Create Job (Admin only)
```bash
curl -X POST http://localhost:3000/api/jobs \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Software Engineer Intern",
    "company": "Tech Corp",
    "location": "Remote",
    "type": "internship",
    "department": "Computer Science",
    "description": "Great opportunity for students"
  }'
```

### 11. Get All Discussions
```bash
curl http://localhost:3000/api/discussions \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 12. Create Discussion
```bash
curl -X POST http://localhost:3000/api/discussions \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Study Group for Finals?",
    "content": "Anyone interested in forming a study group for the upcoming finals?",
    "category": "Study Groups"
  }'
```

### 13. Get All Announcements
```bash
curl http://localhost:3000/api/announcements \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 14. Create Announcement (Admin only)
```bash
curl -X POST http://localhost:3000/api/announcements \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Campus Closure Alert",
    "content": "Campus will be closed on Monday for maintenance",
    "category": "Facility",
    "priority": "high"
  }'
```

### 15. Get All Posts (Feed)
```bash
curl http://localhost:3000/api/posts \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 16. Create Post
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Just finished my final project! Feeling accomplished 🎉"
  }'
```

## User Approval Workflow Test

1. Create a student account (signup)
2. Try to login → Should fail with "pending approval"
3. Login as admin
4. Get pending users list
5. Approve the student
6. Student can now login successfully

## Notes

- All passwords are hashed with bcrypt
- JWT tokens expire in 7 days
- OTP expires in 10 minutes
- Without Twilio configured, OTP is logged to console
- All endpoints (except auth) require valid JWT token
- Admin endpoints require admin role
- CORS is enabled for frontend communication
