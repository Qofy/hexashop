# Step 7: Product Routes - Complete Guide

## 📋 Overview

**Product Routes** = API endpoints for getting products

**What this step does:**
1. Create product controller (business logic)
2. Create product routes (API endpoints)
3. Create product service (database queries)
4. Register routes in main server
5. Test all endpoints

---

## ✅ Step 7A: Create Product Service

### File: `backend/src/services/productService.ts`

**Purpose:** Handle database queries for products

```typescript
import { prisma } from '../index';
import { AppError } from '../middleware/errorHandler';

export class ProductService {
  // Get all products with optional filtering
  static async getAllProducts(category?: string, limit?: number, skip: number = 0) {
    try {
      const where = category ? { category } : {};
      
      const products = await prisma.product.findMany({
        where,
        take: limit || 20,
        skip,
        orderBy: { createdAt: 'desc' },
      });

      const total = await prisma.product.count({ where });

      return {
        data: products,
        total,
        page: Math.floor(skip / (limit || 20)) + 1,
        limit: limit || 20,
      };
    } catch (error) {
      throw new AppError('Failed to fetch products', 500);
    }
  }

  // Get single product by ID
  static async getProductById(id: string) {
    try {
      const product = await prisma.product.findUnique({
        where: { id },
      });

      if (!product) {
        throw new AppError('Product not found', 404);
      }

      return product;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to fetch product', 500);
    }
  }

  // Get products by category
  static async getProductsByCategory(category: string, limit?: number, skip: number = 0) {
    try {
      const products = await prisma.product.findMany({
        where: { category: category.toLowerCase() },
        take: limit || 20,
        skip,
        orderBy: { createdAt: 'desc' },
      });

      if (products.length === 0) {
        throw new AppError(`No products found in category: ${category}`, 404);
      }

      return products;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to fetch category products', 500);
    }
  }

  // Create product (admin only - later)
  static async createProduct(data: {
    name: string;
    price: number;
    category: string;
    description?: string;
    image: string;
    starRate?: number;
  }) {
    try {
      const product = await prisma.product.create({
        data: {
          ...data,
          category: data.category.toLowerCase(),
        },
      });

      return product;
    } catch (error) {
      throw new AppError('Failed to create product', 500);
    }
  }

  // Update product (admin only - later)
  static async updateProduct(id: string, data: Partial<any>) {
    try {
      const product = await prisma.product.update({
        where: { id },
        data,
      });

      return product;
    } catch (error) {
      throw new AppError('Failed to update product', 500);
    }
  }

  // Delete product (admin only - later)
  static async deleteProduct(id: string) {
    try {
      await prisma.product.delete({
        where: { id },
      });

      return { message: 'Product deleted successfully' };
    } catch (error) {
      throw new AppError('Failed to delete product', 500);
    }
  }
}
```

---

## ✅ Step 7B: Create Product Controller

### File: `backend/src/controllers/productController.ts`

**Purpose:** Handle HTTP requests and responses

```typescript
import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/productService';

export class ProductController {
  // GET /api/products - Get all products
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { category, limit, page = 1 } = req.query;
      const skip = (Number(page) - 1) * (Number(limit) || 20);

      const result = await ProductService.getAllProducts(
        category as string | undefined,
        limit ? Number(limit) : undefined,
        skip
      );

      res.status(200).json({
        status: 'success',
        data: result.data,
        pagination: {
          total: result.total,
          page: result.page,
          limit: result.limit,
          pages: Math.ceil(result.total / result.limit),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/products/:id - Get single product
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const product = await ProductService.getProductById(id);

      res.status(200).json({
        status: 'success',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/products/category/:category - Get by category
  static async getByCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { category } = req.params;
      const { limit, page = 1 } = req.query;
      const skip = (Number(page) - 1) * (Number(limit) || 20);

      const products = await ProductService.getProductsByCategory(
        category,
        limit ? Number(limit) : undefined,
        skip
      );

      res.status(200).json({
        status: 'success',
        data: products,
        count: products.length,
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/products - Create product (admin only)
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price, category, description, image, starRate } = req.body;

      if (!name || !price || !category || !image) {
        return res.status(400).json({
          status: 'error',
          error: 'Missing required fields: name, price, category, image',
        });
      }

      const product = await ProductService.createProduct({
        name,
        price: Number(price),
        category,
        description,
        image,
        starRate: starRate ? Number(starRate) : 0,
      });

      res.status(201).json({
        status: 'success',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/products/:id - Update product (admin only)
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const product = await ProductService.updateProduct(id, updates);

      res.status(200).json({
        status: 'success',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/products/:id - Delete product (admin only)
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await ProductService.deleteProduct(id);

      res.status(200).json({
        status: 'success',
        message: 'Product deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
```

---

## ✅ Step 7C: Create Product Routes

### File: `backend/src/routes/productRoutes.ts`

**Purpose:** Define API endpoints

```typescript
import { Router } from 'express';
import { ProductController } from '../controllers/productController';

const router = Router();

// Public routes (no auth needed)
router.get('/', ProductController.getAll);                           // GET /api/products
router.get('/:id', ProductController.getById);                       // GET /api/products/:id
router.get('/category/:category', ProductController.getByCategory);  // GET /api/products/category/:name

// Admin routes (auth needed - implement later)
router.post('/', ProductController.create);                          // POST /api/products
router.put('/:id', ProductController.update);                        // PUT /api/products/:id
router.delete('/:id', ProductController.delete);                     // DELETE /api/products/:id

export default router;
```

---

## ✅ Step 7D: Register Routes in Server

### File: `backend/src/index.ts`

**Add these lines after other imports:**

```typescript
import productRoutes from './routes/productRoutes';
```

**Add this line after health check route (around line 43):**

```typescript
// Product routes
app.use('/api/products', productRoutes);
```

**Complete section should look like:**

```typescript
//Health Checks
app.get('/api/health', (req:Request, res:Response)=>{
    res.status(200).json({
        status: 'OK',
        message:'Server is running',
        timestamp: new Date().toISOString(),
    });
});

// Product routes
app.use('/api/products', productRoutes);

// 404 handler (keep this last)
app.use((req:Request, res:Response)=>{
    res.status(404).json({
        error: 'Not Found',
        message:`Route ${req.path} not found`,
        path: req.path,
        method: req.method,
    });
});
```

---

## 🧪 Test Product Endpoints

### Start Server

```bash
bun run dev
```

### Test 1: Get All Products

```bash
curl http://localhost:3001/api/products
```

**Expected Response:**
```json
{
  "status": "success",
  "data": [],
  "pagination": {
    "total": 0,
    "page": 1,
    "limit": 20,
    "pages": 0
  }
}
```

### Test 2: Get by Category

```bash
curl http://localhost:3001/api/products/category/men
```

**Expected Response:**
```json
{
  "status": "error",
  "error": "No products found in category: men"
}
```

(Empty because we haven't added products yet)

### Test 3: Get Single Product (Non-existent)

```bash
curl http://localhost:3001/api/products/999
```

**Expected Response:**
```json
{
  "status": "error",
  "error": "Product not found",
  "statusCode": 404
}
```

### Test 4: Create Product

```bash
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Blue T-Shirt",
    "price": 29.99,
    "category": "men",
    "description": "Comfortable blue t-shirt",
    "image": "https://hexashop-images.s3.amazonaws.com/test.jpg",
    "starRate": 4.5
  }'
```

**Expected Response:**
```json
{
  "status": "success",
  "data": {
    "id": "clx...",
    "name": "Blue T-Shirt",
    "price": 29.99,
    "category": "men",
    "description": "Comfortable blue t-shirt",
    "image": "https://hexashop-images.s3.amazonaws.com/test.jpg",
    "starRate": 4.5,
    "inStock": true,
    "createdAt": "2024-01-26T...",
    "updatedAt": "2024-01-26T..."
  }
}
```

---

## 📋 API Endpoints Summary

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `/api/products` | Get all products | ❌ |
| GET | `/api/products/:id` | Get single product | ❌ |
| GET | `/api/products/category/:category` | Get by category | ❌ |
| POST | `/api/products` | Create product | ✅ (later) |
| PUT | `/api/products/:id` | Update product | ✅ (later) |
| DELETE | `/api/products/:id` | Delete product | ✅ (later) |

---

## 📁 File Structure

```
backend/src/
├── index.ts                    ✅ Updated with route
├── routes/
│   └── productRoutes.ts       ✅ NEW
├── controllers/
│   └── productController.ts   ✅ NEW
├── services/
│   └── productService.ts      ✅ NEW
└── (other folders)
```

---

## ✅ Checklist

- [ ] Create `productService.ts`
- [ ] Create `productController.ts`
- [ ] Create `productRoutes.ts`
- [ ] Import routes in `index.ts`
- [ ] Register routes with `app.use('/api/products', productRoutes)`
- [ ] Start server with `bun run dev`
- [ ] Test all endpoints with curl
- [ ] Verify responses are correct

---

**Step 7 Complete!** Ready for Step 8: Cart Routes 🚀
