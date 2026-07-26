# Step 5: Setup Prisma with NeonDB - Complete Guide

## 📋 Overview

**Prisma** = Database ORM (Object-Relational Mapping)

**Why use Prisma?**
- Type-safe database queries
- Auto-generated TypeScript client
- Easy migrations and schema management
- No SQL needed (uses TypeScript instead)

---

## ✅ Step 5A: Initialize Prisma

### Command

```bash
cd backend
bunx prisma init
```

### What it creates

```
backend/
├── prisma/
│   └── schema.prisma    # Database schema file
├── .env                 # Prisma environment file
└── (existing files)
```

### Expected Output

```
✔ Created a new folder prisma
✔ Created prisma/schema.prisma
✔ Created .env
```

---

## ✅ Step 5B: Configure Database Connection

### Step 1: Get NeonDB Connection String

1. Visit: https://console.neon.tech
2. Sign in to your account
3. Select project: `hexashop`
4. Click: **Connection String**
5. Copy the full string

**Example format:**
```
postgresql://neon_user:password@us-east-1.neon.tech/hexashop?schema=public
```

### Step 2: Update `.env` File

**Open:** `backend/.env`

**Replace the content:**

```env
# Database Connection String from NeonDB
DATABASE_URL="postgresql://neon_user:password@us-east-1.neon.tech/hexashop?schema=public"
```

⚠️ **Important:**
- Replace `neon_user`, `password`, `region`, `database` with your actual values
- URL must contain `.neon.tech` (not `localhost`)
- Include `?schema=public` at the end

### Step 3: Verify Connection

```bash
bunx prisma db execute --stdin < /dev/null
```

**Expected output:**
```
✔ Connected to database
```

---

## ✅ Step 5C: Define Database Schema

### Step 1: Open Schema File

**File:** `backend/prisma/schema.prisma`

### Step 2: Add Prisma Configuration

```prisma
// Prisma configuration
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### Step 3: Add Database Models

**Complete schema with all models:**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ===== USER MODEL =====
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String
  firstName     String
  lastName      String
  phone         String?
  avatar        String?
  
  addresses     Address[]
  orders        Order[]
  favorites     Favorite[]
  cart          Cart?
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

// ===== PRODUCT MODEL =====
model Product {
  id            String    @id @default(cuid())
  name          String
  price         Float
  category      String
  description   String?
  image         String
  starRate      Float     @default(0)
  inStock       Boolean   @default(true)
  
  orderItems    OrderItem[]
  favorites     Favorite[]
  cartItems     CartItem[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

// ===== ORDER MODEL =====
model Order {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  orderNumber   String    @unique
  status        String    @default("pending")
  totalAmount   Float
  shippingCost  Float
  
  items         OrderItem[]
  shippingAddr  Address?
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

// ===== ORDER ITEM MODEL =====
model OrderItem {
  id            String    @id @default(cuid())
  orderId       String
  order         Order     @relation(fields: [orderId], references: [id], onDelete: Cascade)
  
  productId     String
  product       Product   @relation(fields: [productId], references: [id])
  
  quantity      Int
  price         Float
}

// ===== CART MODEL =====
model Cart {
  id            String    @id @default(cuid())
  userId        String    @unique
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  items         CartItem[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

// ===== CART ITEM MODEL =====
model CartItem {
  id            String    @id @default(cuid())
  cartId        String
  cart          Cart      @relation(fields: [cartId], references: [id], onDelete: Cascade)
  
  productId     String
  product       Product   @relation(fields: [productId], references: [id])
  
  quantity      Int
}

// ===== FAVORITE MODEL =====
model Favorite {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  productId     String
  product       Product   @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  @@unique([userId, productId])
  createdAt     DateTime  @default(now())
}

// ===== ADDRESS MODEL =====
model Address {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  orderId       String?   @unique
  order         Order?    @relation(fields: [orderId], references: [id], onDelete: SetNull)
  
  label         String
  street        String
  city          String
  state         String
  zipCode       String
  country       String
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### Step 4: Format Schema

```bash
bunx prisma format
```

**Expected output:**
```
✔ Formatted successfully
```

---

## ✅ Step 5D: Generate Prisma Client

### Command

```bash
bunx prisma generate
```

### What it does

- Reads your `schema.prisma`
- Generates TypeScript types
- Creates Prisma client for database queries

### Expected Output

```
✔ Generated Prisma Client to ./node_modules/@prisma/client
```

---

## ✅ Step 5E: Create Database Migrations

### Command

```bash
bunx prisma migrate dev --name init
```

### What it does

1. Creates migration file in `prisma/migrations/`
2. Analyzes schema changes
3. Applies migration to NeonDB
4. Creates all tables automatically

### Expected Output

```
✔ Created migration `20240126_init`
✔ Applied migration `20240126_init` to database
✔ Generated Prisma Client
```

### If You See "Drift Detected"

**Run reset command:**

```bash
bunx prisma migrate reset
```

**When asked:**
```
⚠️  This will delete all data in your development database.

Do you want to continue? [y/N]
```

**Type:** `y` and press Enter

**Expected output:**
```
✔ Prisma Migrate has reset the database
✔ Created migration `20240126_init`
✔ Applied migration
✔ Generated Prisma Client
```

---

## ✅ Step 5F: Verify Database Setup

### Option A: Using Prisma Studio (Recommended)

```bash
bunx prisma studio
```

**Opens:** http://localhost:5555

**What you should see:**
- ✅ All 8 tables listed
- ✅ User, Product, Order, OrderItem, Cart, CartItem, Favorite, Address
- ✅ No validation errors
- ✅ Can view/edit data visually

### Option B: Test with Code

**Create:** `backend/test-prisma.ts`

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Testing Prisma connection...");
  
  // Test: Create a product
  const product = await prisma.product.create({
    data: {
      name: "Test Shirt",
      price: 29.99,
      category: "men",
      image: "https://hexashop-images.s3.amazonaws.com/test.jpg",
      starRate: 4.5,
    },
  });
  
  console.log("✅ Product created:", product);
  
  // Test: Read products
  const products = await prisma.product.findMany();
  console.log("✅ All products:", products);
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

**Run:**

```bash
bun test-prisma.ts
```

**Expected output:**
```
Testing Prisma connection...
✅ Product created: { id: '...', name: 'Test Shirt', ... }
✅ All products: [ { id: '...', name: 'Test Shirt', ... } ]
```

**After testing, delete the file:**

```bash
rm test-prisma.ts
```

---

## 📋 Complete Checklist

- [ ] Run `bunx prisma init`
- [ ] Get NeonDB connection string from https://console.neon.tech
- [ ] Update `backend/.env` with DATABASE_URL
- [ ] Verify connection with `bunx prisma db execute`
- [ ] Create complete `schema.prisma` with all models
- [ ] Run `bunx prisma format`
- [ ] Run `bunx prisma generate`
- [ ] Run `bunx prisma migrate dev --name init`
- [ ] If needed, run `bunx prisma migrate reset`
- [ ] Verify in Prisma Studio: `bunx prisma studio`
- [ ] See all 8 tables with no errors ✅

---

## 🔒 Security Setup

### Update `.gitignore`

**Make sure `backend/.gitignore` includes:**

```
# Environment variables
.env
.env.local
.env.*.local

# Prisma
/prisma/dev.db
/prisma/migrations/

# Node
node_modules/
dist/

# OS
.DS_Store
*.log
```

**Verify:**

```bash
cat backend/.gitignore
```

**Should show** `.env` is listed

---

## 📁 File Structure After Step 5

```
backend/
├── prisma/
│   ├── schema.prisma              ✅ Database schema
│   └── migrations/
│       └── 20240126_init/
│           └── migration.sql      ✅ Migration file
├── .env                            ✅ NeonDB connection (in .gitignore)
├── .env.local                      ✅ AWS credentials (in .gitignore)
├── .gitignore                      ✅ Excludes .env files
├── package.json                    ✅ Dependencies
├── tsconfig.json                   ✅ TypeScript config
└── (other files)
```

---

## 🧪 Common Issues & Fixes

### Issue: "Can't reach database server at localhost"

**Problem:** DATABASE_URL pointing to local database

**Fix:** Update `.env` with NeonDB connection string (contains `.neon.tech`)

### Issue: "Relation field missing opposite relation"

**Problem:** One-to-one relationship not defined on both sides

**Fix:** Ensure both models have the relation field defined

### Issue: "Unknown or unexpected option"

**Problem:** Typo in Prisma command

**Fix:** Use exact commands from this guide

### Issue: "No migration found"

**Problem:** Migration files not created

**Fix:** Run `bunx prisma migrate dev --name init`

---

## ✅ You're Done with Step 5!

**Next:** Step 6: Create Express Server Entry Point

---

## 📞 Quick Reference - All Commands

```bash
# Initialize
bunx prisma init

# Generate client
bunx prisma generate

# Format schema
bunx prisma format

# Create migration
bunx prisma migrate dev --name init

# Reset database (if needed)
bunx prisma migrate reset

# View/edit database
bunx prisma studio

# Check migration status
bunx prisma migrate status

# Test connection
bunx prisma db execute --stdin < /dev/null

# Push schema directly (alternative to migrate)
bunx prisma db push
```

---

**Ready for Step 6?** 🚀
