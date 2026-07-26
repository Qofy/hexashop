# Step 6: Create Express Server Entry Point - Complete Guide

## 📋 Overview

**Express.js** = Web framework for building REST APIs

**What this step does:**
1. Create main server file
2. Setup middleware (CORS, JSON, error handling)
3. Create route structure
4. Test with simple endpoints
5. Verify server runs

---

## ✅ Step 6A: Create Main Server File

### Step 1: Create Directory Structure

**Ensure these folders exist:**

```bash
cd backend/src

# Create route folders
mkdir -p routes
mkdir -p controllers
mkdir -p middleware
mkdir -p utils
```

### Step 2: Create Main Server File

**File:** `backend/src/index.ts`

```typescript
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Load environment variables
dotenv.config();

// Initialize Express app
const app: Express = express();
const port = process.env.PORT || 3001;

// Initialize Prisma client
export const prisma = new PrismaClient();

// ===== MIDDLEWARE =====

// Enable CORS (allow requests from frontend)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Parse JSON request body
app.use(express.json());

// Parse URL-encoded request body
app.use(express.urlencoded({ extended: true }));

// ===== HEALTH CHECK ROUTE =====

// Simple health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// ===== API ROUTES (To be implemented) =====

// Authentication routes (placeholder)
// app.use('/api/auth', authRoutes);

// User routes (placeholder)
// app.use('/api/users', userRoutes);

// Product routes (placeholder)
// app.use('/api/products', productRoutes);

// Cart routes (placeholder)
// app.use('/api/cart', cartRoutes);

// Favorites routes (placeholder)
// app.use('/api/favorites', favoriteRoutes);

// Orders routes (placeholder)
// app.use('/api/orders', orderRoutes);

// Upload routes (placeholder)
// app.use('/api/upload', uploadRoutes);

// ===== ERROR HANDLING MIDDLEWARE =====

// 404 Not Found handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.path} not found`,
    path: req.path,
    method: req.method,
  });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    error: {
      status,
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
});

// ===== START SERVER =====

const startServer = async () => {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Connected to database');

    // Start listening
    app.listen(port, () => {
      console.log(`✅ Server running at http://localhost:${port}`);
      console.log(`📝 Health check: http://localhost:${port}/api/health`);
      console.log(`🌍 CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n⏹️  Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

// Start the server
startServer();
```

### What Each Section Does

```typescript
// IMPORTS
import express from 'express';           // Web framework
import cors from 'cors';                 // Cross-Origin requests
import dotenv from 'dotenv';             // Environment variables
import { PrismaClient } from '@prisma/client'; // Database

// MIDDLEWARE
cors()                                   // Allow frontend to communicate
express.json()                           // Parse JSON requests
express.urlencoded()                     // Parse form data

// ROUTES
app.get('/api/health')                   // Test endpoint
app.use('/api/auth')                     // Authentication (coming later)

// ERROR HANDLING
404 handler                              // Route not found
Global error handler                     // Catch all errors

// SERVER
prisma.$connect()                        // Connect to database
app.listen()                             // Start listening on port
```

---

## ✅ Step 6B: Create Type Definitions (Optional but Recommended)

### File: `backend/src/types/index.ts`

```typescript
// User types
export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Product types
export interface IProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  image: string;
  starRate: number;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Order types
export interface IOrder {
  id: string;
  userId: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  shippingCost: number;
  createdAt: Date;
  updatedAt: Date;
}

// Cart types
export interface ICart {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  error?: string;
  message?: string;
}

// Pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}
```

---

## ✅ Step 6C: Create Middleware Folder

### File: `backend/src/middleware/errorHandler.ts`

```typescript
import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      error: err.message,
      statusCode: err.statusCode,
    });
  }

  // Unknown error
  console.error('Unexpected error:', err);
  res.status(500).json({
    status: 'error',
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
};
```

### File: `backend/src/middleware/validation.ts`

```typescript
import { Request, Response, NextFunction } from 'express';

// Validate request body has required fields
export const validateRequired = (requiredFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const missing = requiredFields.filter(field => !req.body[field]);

    if (missing.length > 0) {
      return res.status(400).json({
        status: 'error',
        error: 'Missing required fields',
        missing,
      });
    }

    next();
  };
};

// Validate email format
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate request has JSON body
export const validateJson = (req: Request, res: Response, next: NextFunction) => {
  if (!req.is('application/json')) {
    return res.status(400).json({
      status: 'error',
      error: 'Content-Type must be application/json',
    });
  }
  next();
};
```

---

## ✅ Step 6D: Create Routes Folder Structure

### File: `backend/src/routes/index.ts`

```typescript
import { Router } from 'express';

// Import route modules (will create these later)
// import authRoutes from './auth.routes';
// import userRoutes from './user.routes';
// import productRoutes from './product.routes';

const router = Router();

// Register routes
// router.use('/auth', authRoutes);
// router.use('/users', userRoutes);
// router.use('/products', productRoutes);

export default router;
```

---

## ✅ Step 6E: Update Environment Variables

### File: `backend/.env`

**Add/update these values:**

```env
# Database
DATABASE_URL="postgresql://user:password@us-east-1.neon.tech/hexashop?schema=public"

# Server
NODE_ENV=development
PORT=3001

# Frontend (for CORS)
FRONTEND_URL=http://localhost:3000

# AWS S3
AWS_ACCESS_KEY_ID=your-key-here
AWS_SECRET_ACCESS_KEY=your-secret-here
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=hexashop-images
AWS_S3_BUCKET_URL=https://hexashop-images.s3.amazonaws.com

# JWT (Generate with: openssl rand -base64 32)
JWT_SECRET=your-secret-key-here

# Logging
LOG_LEVEL=debug
```

---

## ✅ Step 6F: Update package.json Scripts

### File: `backend/package.json`

**Update the "scripts" section:**

```json
{
  "scripts": {
    "dev": "bun src/index.ts",
    "start": "bun dist/index.js",
    "build": "tsc",
    "prisma:generate": "bunx prisma generate",
    "prisma:migrate": "bunx prisma migrate dev",
    "prisma:studio": "bunx prisma studio"
  }
}
```

---

## ✅ Step 6G: Test the Server

### Command

```bash
cd backend
bun run dev
```

### Expected Output

```
✅ Connected to database
✅ Server running at http://localhost:3001
📝 Health check: http://localhost:3001/api/health
🌍 CORS enabled for: http://localhost:3000
```

### Test the Health Endpoint

**In another terminal:**

```bash
curl http://localhost:3001/api/health
```

**Expected response:**

```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2024-01-26T12:34:56.789Z"
}
```

### Test 404 Endpoint

```bash
curl http://localhost:3001/api/nonexistent
```

**Expected response:**

```json
{
  "error": "Not Found",
  "message": "Route /api/nonexistent not found",
  "path": "/api/nonexistent",
  "method": "GET"
}
```

---

## 📁 File Structure After Step 6

```
backend/
├── src/
│   ├── index.ts                   ✅ Main server file
│   ├── types/
│   │   └── index.ts              ✅ TypeScript interfaces
│   ├── middleware/
│   │   ├── errorHandler.ts       ✅ Error handling
│   │   └── validation.ts         ✅ Request validation
│   ├── routes/
│   │   └── index.ts              ✅ Route registration
│   ├── controllers/              📁 (For later)
│   ├── services/                 📁 (For later)
│   └── utils/                    📁 (For later)
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── .env                           ✅ Environment variables
├── .env.local                     ✅ AWS credentials
├── .gitignore
├── package.json                   ✅ Updated scripts
├── tsconfig.json
└── bun.lockb
```

---

## 🧪 Verify Everything Works

### Test Database Connection

**Server should log:**
```
✅ Connected to database
```

### Test CORS

**Frontend can now make requests to:**
```
http://localhost:3001/api/*
```

### Test Error Handling

**Server should handle errors gracefully** and return JSON responses

### Test Middleware

**All requests should:**
- ✅ Parse JSON
- ✅ Allow CORS
- ✅ Handle 404s
- ✅ Catch errors

---

## 📋 Complete Checklist

- [ ] Create `backend/src/index.ts` with Express server
- [ ] Create `backend/src/types/index.ts` (optional)
- [ ] Create `backend/src/middleware/errorHandler.ts`
- [ ] Create `backend/src/middleware/validation.ts`
- [ ] Create `backend/src/routes/index.ts`
- [ ] Update `backend/.env` with all variables
- [ ] Update `backend/package.json` scripts
- [ ] Run `bun run dev`
- [ ] Test health endpoint
- [ ] Verify database connection
- [ ] Stop server (Ctrl+C)

---

## ⚠️ Troubleshooting

### Issue: "Port 3001 is already in use"

```bash
# Find process using port 3001
lsof -i :3001

# Kill the process
kill -9 <PID>
```

### Issue: "Cannot find module 'express'"

```bash
# Reinstall dependencies
bun install
```

### Issue: "Database connection failed"

```bash
# Check DATABASE_URL in .env
# Verify NeonDB connection string
# Test connection: bunx prisma db execute --stdin < /dev/null
```

### Issue: "CORS blocked from frontend"

**Check:**
- FRONTEND_URL in `.env` matches frontend origin
- CORS middleware is configured
- Credentials: true is set if needed

### Issue: "Cannot find type definitions"

```bash
# Regenerate Prisma client
bunx prisma generate
```

---

## 🚀 Next Steps

**After Step 6 works, proceed to:**

1. **Step 7:** Create Authentication routes (register, login)
2. **Step 8:** Create Product routes (GET, POST)
3. **Step 9:** Create Cart routes
4. **Step 10:** Create Order routes
5. **Step 11:** Integrate with frontend

---

## 📞 Quick Reference - All Commands

```bash
# Start development server
bun run dev

# Build for production
bun run build

# Start production server
bun start

# Generate Prisma client
bun run prisma:generate

# Run migrations
bun run prisma:migrate

# View database (Prisma Studio)
bun run prisma:studio

# Test health endpoint
curl http://localhost:3001/api/health

# Check if port is in use
lsof -i :3001
```

---

## 📝 API Documentation (Future)

### Health Check
```
GET /api/health
Response: { status, message, timestamp }
```

### Authentication (Coming in Step 7)
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

### Products (Coming in Step 8)
```
GET /api/products
GET /api/products/:id
GET /api/products/category/:category
```

### Cart (Coming in Step 9)
```
GET /api/cart
POST /api/cart/items
PUT /api/cart/items/:id
DELETE /api/cart/items/:id
```

### Orders (Coming in Step 10)
```
GET /api/orders
POST /api/orders
GET /api/orders/:id
```

---

**Step 6 Complete!** ✅

**Server is running and ready for routes.** 🚀

---

## 🎯 Confirm When Ready

- ✅ Server starts with `bun run dev`
- ✅ Health check endpoint works
- ✅ Database connected
- ✅ No errors in console

**Ready for Step 7: Authentication Routes?**
