# Backend API Architecture

## Event Management System - Node.js + Express + MongoDB

**Version:** 1.0  
**Last Updated:** March 7, 2026

---

## 🏗️ Architecture Overview

```
┌─────────────────┐
│  React Native   │
│   Mobile App    │
└────────┬────────┘
         │ HTTPS/REST
         ▼
┌─────────────────┐
│   Nginx/CDN     │
│  (Reverse Proxy)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────┐
│   Express API   │◄────►│   MongoDB    │
│   (Node.js)     │      │   Database   │
└────────┬────────┘      └──────────────┘
         │
         ▼
┌─────────────────┐
│  External APIs  │
│ (S3, SendGrid)  │
└─────────────────┘
```

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts          # MongoDB connection
│   │   ├── environment.ts       # Environment variables
│   │   └── constants.ts         # App constants
│   │
│   ├── models/
│   │   ├── User.model.ts
│   │   ├── Event.model.ts
│   │   ├── Enquiry.model.ts
│   │   └── Inventory.model.ts
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── event.controller.ts
│   │   ├── enquiry.controller.ts
│   │   ├── inventory.controller.ts
│   │   ├── profile.controller.ts
│   │   └── muhurt.controller.ts
│   │
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── event.routes.ts
│   │   ├── enquiry.routes.ts
│   │   ├── inventory.routes.ts
│   │   ├── profile.routes.ts
│   │   └── muhurt.routes.ts
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts   # JWT verification
│   │   ├── error.middleware.ts  # Error handler
│   │   ├── validate.middleware.ts
│   │   └── upload.middleware.ts # File uploads
│   │
│   ├── services/
│   │   ├── email.service.ts
│   │   ├── sms.service.ts
│   │   ├── storage.service.ts   # S3/Cloudinary
│   │   └── notification.service.ts
│   │
│   ├── utils/
│   │   ├── ApiResponse.ts
│   │   ├── ApiError.ts
│   │   ├── logger.ts
│   │   └── helpers.ts
│   │
│   ├── validators/
│   │   ├── auth.validator.ts
│   │   ├── event.validator.ts
│   │   └── enquiry.validator.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── app.ts                   # Express app setup
│   └── server.ts                # Server entry point
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔐 Authentication Flow

### Registration & Login

```
Client                    Server                  Database
  │                         │                         │
  ├─POST /api/auth/register─►│                         │
  │                         ├─Validate Input          │
  │                         ├─Hash Password           │
  │                         ├─Create User────────────►│
  │                         ◄──User Saved─────────────┤
  │                         ├─Generate JWT            │
  │◄──JWT + User Data───────┤                         │
  │                         │                         │
  ├─POST /api/auth/login────►│                         │
  │                         ├─Find User──────────────►│
  │                         ◄──User Data──────────────┤
  │                         ├─Verify Password         │
  │                         ├─Generate JWT            │
  │◄──JWT + User Data───────┤                         │
```

### JWT Token Structure

```javascript
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "userId": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "role": "admin",
    "iat": 1678147200,
    "exp": 1678233600
  }
}
```

---

## 📡 API Endpoints

### Base URL

```
Development: http://localhost:3000/api/v1
Production: https://api.yourdomain.com/api/v1
```

---

## 1️⃣ Authentication APIs

### POST /api/v1/auth/register

**Description:** Register new user  
**Auth Required:** No

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "phone": "+1234567890",
  "role": "user"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### POST /api/v1/auth/login

**Description:** User login  
**Auth Required:** No

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### POST /api/v1/auth/refresh-token

**Description:** Refresh access token  
**Auth Required:** Yes (Refresh Token)

**Request Body:**

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### POST /api/v1/auth/forgot-password

**Description:** Request password reset  
**Auth Required:** No

**Request Body:**

```json
{
  "email": "john@example.com"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

---

## 2️⃣ Events APIs

### GET /api/v1/events

**Description:** Get all events with filters  
**Auth Required:** Yes

**Query Parameters:**

- `status` (string): "Upcoming" | "Ongoing" | "Completed"
- `venue` (string): Filter by venue
- `startDate` (ISO date): Filter from date
- `endDate` (ISO date): Filter to date
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `search` (string): Search by title or customer name

**Example Request:**

```
GET /api/v1/events?status=Upcoming&page=1&limit=10
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "events": [
      {
        "id": "507f1f77bcf86cd799439011",
        "title": "Wedding Ceremony",
        "customerName": "Raj Kumar",
        "phone": "+919876543210",
        "venue": "Grand Palace",
        "rooms": ["Hall A", "Hall B"],
        "start": "2026-03-15T10:00:00.000Z",
        "end": "2026-03-15T18:00:00.000Z",
        "status": "Upcoming",
        "inventoryCount": 15,
        "createdAt": "2026-03-01T10:00:00.000Z",
        "updatedAt": "2026-03-07T10:00:00.000Z"
      }
    ],
    "pagination": {
      "total": 45,
      "page": 1,
      "limit": 10,
      "pages": 5
    }
  }
}
```

---

### GET /api/v1/events/:id

**Description:** Get single event details  
**Auth Required:** Yes

**Response (200):**

```json
{
  "success": true,
  "data": {
    "event": {
      "id": "507f1f77bcf86cd799439011",
      "title": "Wedding Ceremony",
      "customerName": "Raj Kumar",
      "phone": "+919876543210",
      "venue": "Grand Palace",
      "rooms": ["Hall A", "Hall B"],
      "start": "2026-03-15T10:00:00.000Z",
      "end": "2026-03-15T18:00:00.000Z",
      "status": "Upcoming",
      "inventory": [
        {
          "id": "inv-001",
          "name": "Chairs",
          "unit": "pcs",
          "plannedQty": 200,
          "issuedQty": 200,
          "returnedQty": 198,
          "rate": 10
        }
      ],
      "createdAt": "2026-03-01T10:00:00.000Z",
      "updatedAt": "2026-03-07T10:00:00.000Z"
    }
  }
}
```

---

### POST /api/v1/events

**Description:** Create new event  
**Auth Required:** Yes

**Request Body:**

```json
{
  "title": "Wedding Ceremony",
  "customerName": "Raj Kumar",
  "phone": "+919876543210",
  "venue": "Grand Palace",
  "rooms": ["Hall A", "Hall B"],
  "start": "2026-03-15T10:00:00.000Z",
  "end": "2026-03-15T18:00:00.000Z",
  "status": "Upcoming",
  "inventory": [
    {
      "name": "Chairs",
      "unit": "pcs",
      "plannedQty": 200,
      "rate": 10
    }
  ]
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "event": {
      "id": "507f1f77bcf86cd799439011",
      "title": "Wedding Ceremony",
      ...
    }
  }
}
```

---

### PUT /api/v1/events/:id

**Description:** Update event  
**Auth Required:** Yes

**Request Body:** (Same as POST, all fields optional)

**Response (200):**

```json
{
  "success": true,
  "message": "Event updated successfully",
  "data": {
    "event": { ... }
  }
}
```

---

### DELETE /api/v1/events/:id

**Description:** Delete event  
**Auth Required:** Yes

**Response (200):**

```json
{
  "success": true,
  "message": "Event deleted successfully"
}
```

---

## 3️⃣ Enquiry APIs

### GET /api/v1/enquiries

**Description:** Get all enquiries  
**Auth Required:** Yes

**Query Parameters:**

- `status` (string): "Open" | "Follow-up due" | "Converted" | "Closed"
- `source` (string): Filter by source
- `page` (number): Page number
- `limit` (number): Items per page

**Response (200):**

```json
{
  "success": true,
  "data": {
    "enquiries": [
      {
        "id": "507f1f77bcf86cd799439011",
        "name": "Priya Sharma",
        "phone": "+919876543210",
        "eventDate": "2026-04-10T00:00:00.000Z",
        "guests": 300,
        "status": "Open",
        "source": "Website",
        "notes": "Interested in outdoor venue",
        "createdAt": "2026-03-05T10:00:00.000Z",
        "followUpDate": "2026-03-08T10:00:00.000Z"
      }
    ],
    "pagination": { ... }
  }
}
```

---

### POST /api/v1/enquiries

**Description:** Create new enquiry  
**Auth Required:** Yes

**Request Body:**

```json
{
  "name": "Priya Sharma",
  "phone": "+919876543210",
  "eventDate": "2026-04-10T00:00:00.000Z",
  "guests": 300,
  "source": "Website",
  "notes": "Interested in outdoor venue"
}
```

---

### PUT /api/v1/enquiries/:id/status

**Description:** Update enquiry status  
**Auth Required:** Yes

**Request Body:**

```json
{
  "status": "Follow-up due",
  "followUpDate": "2026-03-10T10:00:00.000Z",
  "notes": "Customer asked for quote"
}
```

---

### POST /api/v1/enquiries/:id/convert

**Description:** Convert enquiry to event  
**Auth Required:** Yes

**Request Body:**

```json
{
  "eventData": {
    "title": "Priya's Wedding",
    "venue": "Garden Palace",
    "rooms": ["Garden Area"],
    "start": "2026-04-10T10:00:00.000Z",
    "end": "2026-04-10T20:00:00.000Z"
  }
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Enquiry converted to event",
  "data": {
    "event": { ... }
  }
}
```

---

## 4️⃣ Inventory APIs

### GET /api/v1/inventory

**Description:** Get all inventory items  
**Auth Required:** Yes

**Response (200):**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "507f1f77bcf86cd799439011",
        "name": "Chairs",
        "category": "Furniture",
        "unit": "pcs",
        "totalStock": 500,
        "availableStock": 300,
        "rate": 10,
        "description": "Standard banquet chairs"
      }
    ]
  }
}
```

---

### POST /api/v1/events/:eventId/check-in

**Description:** Check-in inventory for event  
**Auth Required:** Yes

**Request Body:**

```json
{
  "inventory": [
    {
      "itemId": "507f1f77bcf86cd799439011",
      "issuedQty": 200
    }
  ],
  "checkInBy": "John Doe",
  "notes": "All items in good condition"
}
```

---

### POST /api/v1/events/:eventId/check-out

**Description:** Check-out inventory after event  
**Auth Required:** Yes

**Request Body:**

```json
{
  "inventory": [
    {
      "itemId": "507f1f77bcf86cd799439011",
      "returnedQty": 198,
      "damagedQty": 2
    }
  ],
  "checkOutBy": "John Doe",
  "notes": "2 chairs damaged"
}
```

---

### GET /api/v1/events/:eventId/missing-inventory

**Description:** Get missing/damaged inventory  
**Auth Required:** Yes

**Response (200):**

```json
{
  "success": true,
  "data": {
    "missing": [
      {
        "itemId": "507f1f77bcf86cd799439011",
        "name": "Chairs",
        "issuedQty": 200,
        "returnedQty": 198,
        "missingQty": 2,
        "rate": 10,
        "totalLoss": 20
      }
    ],
    "totalLoss": 20
  }
}
```

---

## 5️⃣ Profile APIs

### GET /api/v1/profile/me

**Description:** Get current user profile  
**Auth Required:** Yes

**Response (200):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "role": "admin",
      "avatar": "https://cdn.example.com/avatar.jpg",
      "createdAt": "2026-01-01T00:00:00.000Z"
    }
  }
}
```

---

### PUT /api/v1/profile/me

**Description:** Update profile  
**Auth Required:** Yes

**Request Body:**

```json
{
  "name": "John Updated",
  "phone": "+1234567890"
}
```

---

### POST /api/v1/profile/avatar

**Description:** Upload profile avatar  
**Auth Required:** Yes  
**Content-Type:** multipart/form-data

**Request Body:**

```
avatar: [file]
```

---

## 6️⃣ Muhurt (Auspicious Timing) APIs

### GET /api/v1/muhurt

**Description:** Get auspicious dates  
**Auth Required:** Yes

**Query Parameters:**

- `month` (number): Month (1-12)
- `year` (number): Year
- `eventType` (string): "wedding", "engagement", etc.

**Response (200):**

```json
{
  "success": true,
  "data": {
    "dates": [
      {
        "date": "2026-03-15",
        "day": "Sunday",
        "nakshatra": "Rohini",
        "isAuspicious": true,
        "timing": {
          "start": "10:00",
          "end": "12:00"
        },
        "description": "Highly auspicious for weddings"
      }
    ]
  }
}
```

---

## 🔒 Security Implementation

### Rate Limiting

```javascript
// 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP",
});
```

### CORS Configuration

```javascript
const corsOptions = {
  origin: ["https://yourdomain.com", "exp://localhost:8081"],
  credentials: true,
  optionsSuccessStatus: 200,
};
```

### Input Validation

```javascript
// Using express-validator
(body("email").isEmail().normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/));
```

---

## 📊 Error Responses

### Standard Error Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  },
  "statusCode": 400
}
```

### Error Codes

- `VALIDATION_ERROR` (400) - Invalid input
- `UNAUTHORIZED` (401) - Not authenticated
- `FORBIDDEN` (403) - No permission
- `NOT_FOUND` (404) - Resource not found
- `CONFLICT` (409) - Resource already exists
- `INTERNAL_ERROR` (500) - Server error

---

## 🧪 API Testing

### Using Postman

```javascript
// Environment Variables
BASE_URL: //localhost:3000/api/v1
http: TOKEN: {
  {
    auth_token;
  }
}

// Pre-request Script (for auth)
pm.environment.set("auth_token", pm.response.json().data.token);

// Test Script
pm.test("Status code is 200", () => {
  pm.response.to.have.status(200);
});
```

### Using cURL

```bash
# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"SecurePass123!"}'

# Get Events (with auth)
curl -X GET http://localhost:3000/api/v1/events \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📈 Performance Optimization

### Caching Strategy

```javascript
// Redis caching for frequent queries
const getEvents = async (filters) => {
  const cacheKey = `events:${JSON.stringify(filters)}`;
  const cached = await redis.get(cacheKey);

  if (cached) return JSON.parse(cached);

  const events = await Event.find(filters);
  await redis.setex(cacheKey, 300, JSON.stringify(events)); // 5 min cache

  return events;
};
```

### Database Indexing

```javascript
// Create indexes for frequent queries
eventSchema.index({ status: 1, start: -1 });
eventSchema.index({ venue: 1, start: 1 });
enquirySchema.index({ status: 1, createdAt: -1 });
```

---

## 🔔 Webhooks (Optional)

### Event Created Webhook

```
POST https://client-webhook-url.com/events/created

Body:
{
  "event": "event.created",
  "timestamp": "2026-03-07T10:00:00.000Z",
  "data": {
    "eventId": "507f1f77bcf86cd799439011",
    "title": "Wedding Ceremony"
  }
}
```

---

**Document Version:** 1.0  
**API Version:** v1  
**Last Updated:** March 7, 2026
