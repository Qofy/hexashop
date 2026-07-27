# Step 8: Cart Routes - Complete Guide

## 📋 Overview

**Cart Routes** = API endpoints for shopping cart management

**What this step does:**
1. Create cart service (database queries)
2. Create cart controller (business logic)
3. Create cart routes (API endpoints)
4. Register routes in main server
5. Test all endpoints

---

## ✅ Step 8A: Create Cart Service

### File: `backend/src/services/cartService.ts`

**Purpose:** Handle database queries for carts

```typescript
import { prisma } from '../index';
import { AppError } from '../middleware/errorHandler';

export class CartService {
  // Get user's cart
  static async getCart(userId: string) {
    try {
      let cart = await prisma.cart.findUnique({
        where: { userId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      // Create cart if doesn't exist
      if (!cart) {
        cart = await prisma.cart.create({
          data: { userId },
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        });
      }

      return cart;
    } catch (error) {
      throw new AppError('Failed to fetch cart', 500);
    }
  }

  // Add item to cart
  static async addToCart(userId: string, productId: string, quantity: number) {
    try {
      // Verify product exists
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw new AppError('Product not found', 404);
      }

      // Get or create cart
      let cart = await prisma.cart.findUnique({
        where: { userId },
      });

      if (!cart) {
        cart = await prisma.cart.create({
          data: { userId },
        });
      }

      // Check if item already in cart
      const existingItem = await prisma.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId,
        },
      });

      let cartItem;

      if (existingItem) {
        // Update quantity
        cartItem = await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: {
            quantity: existingItem.quantity + quantity,
          },
          include: { product: true },
        });
      } else {
        // Create new cart item
        cartItem = await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            quantity,
          },
          include: { product: true },
        });
      }

      return cartItem;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to add item to cart', 500);
    }
  }

  // Update cart item quantity
  static async updateCartItem(userId: string, cartItemId: string, quantity: number) {
    try {
      // Verify cart belongs to user
      const cart = await prisma.cart.findUnique({
        where: { userId },
      });

      if (!cart) {
        throw new AppError('Cart not found', 404);
      }

      if (quantity <= 0) {
        throw new AppError('Quantity must be greater than 0', 400);
      }

      const cartItem = await prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity },
        include: { product: true },
      });

      return cartItem;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to update cart item', 500);
    }
  }

  // Remove item from cart
  static async removeFromCart(userId: string, cartItemId: string) {
    try {
      // Verify cart belongs to user
      const cart = await prisma.cart.findUnique({
        where: { userId },
      });

      if (!cart) {
        throw new AppError('Cart not found', 404);
      }

      await prisma.cartItem.delete({
        where: { id: cartItemId },
      });

      return { message: 'Item removed from cart' };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to remove item from cart', 500);
    }
  }

  // Clear entire cart
  static async clearCart(userId: string) {
    try {
      const cart = await prisma.cart.findUnique({
        where: { userId },
      });

      if (!cart) {
        throw new AppError('Cart not found', 404);
      }

      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      return { message: 'Cart cleared' };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to clear cart', 500);
    }
  }

  // Calculate cart total
  static async getCartTotal(userId: string) {
    try {
      const cart = await prisma.cart.findUnique({
        where: { userId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!cart) {
        throw new AppError('Cart not found', 404);
      }

      const total = cart.items.reduce((sum, item) => {
        return sum + item.product.price * item.quantity;
      }, 0);

      return {
        cartId: cart.id,
        items: cart.items,
        total,
        itemCount: cart.items.length,
        quantity: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to calculate cart total', 500);
    }
  }
}
```

---

## ✅ Step 8B: Create Cart Controller

### File: `backend/src/controllers/cartController.ts`

**Purpose:** Handle HTTP requests and responses

```typescript
import { Request, Response, NextFunction } from 'express';
import { CartService } from '../services/cartService';

// Extend Express Request to include userId (will add after auth)
interface AuthRequest extends Request {
  userId?: string;
}

export class CartController {
  // GET /api/cart - Get user's cart
  static async getCart(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      // For now, use a test userId from query
      const userId = req.query.userId as string || 'test-user-123';

      const cart = await CartService.getCart(userId);

      res.status(200).json({
        status: 'success',
        data: cart,
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/cart/items - Add item to cart
  static async addToCart(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.query.userId as string || 'test-user-123';
      const { productId, quantity = 1 } = req.body;

      if (!productId) {
        return res.status(400).json({
          status: 'error',
          error: 'Missing required field: productId',
        });
      }

      if (quantity < 1) {
        return res.status(400).json({
          status: 'error',
          error: 'Quantity must be at least 1',
        });
      }

      const cartItem = await CartService.addToCart(userId, productId, quantity);

      res.status(201).json({
        status: 'success',
        data: cartItem,
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/cart/items/:id - Update cart item
  static async updateCartItem(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.query.userId as string || 'test-user-123';
      const { id } = req.params;
      const { quantity } = req.body;

      if (!quantity) {
        return res.status(400).json({
          status: 'error',
          error: 'Missing required field: quantity',
        });
      }

      const cartItem = await CartService.updateCartItem(userId, id, quantity);

      res.status(200).json({
        status: 'success',
        data: cartItem,
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/cart/items/:id - Remove item from cart
  static async removeFromCart(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.query.userId as string || 'test-user-123';
      const { id } = req.params;

      const result = await CartService.removeFromCart(userId, id);

      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/cart - Clear entire cart
  static async clearCart(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.query.userId as string || 'test-user-123';

      const result = await CartService.clearCart(userId);

      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/cart/total - Get cart total
  static async getCartTotal(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.query.userId as string || 'test-user-123';

      const total = await CartService.getCartTotal(userId);

      res.status(200).json({
        status: 'success',
        data: total,
      });
    } catch (error) {
      next(error);
    }
  }
}
```

---

## ✅ Step 8C: Create Cart Routes

### File: `backend/src/routes/cartRoutes.ts`

**Purpose:** Define API endpoints

```typescript
import { Router } from 'express';
import { CartController } from '../controllers/cartController';

const router = Router();

// Cart endpoints (auth needed - implement later)
router.get('/', CartController.getCart);                    // GET /api/cart
router.post('/items', CartController.addToCart);            // POST /api/cart/items
router.put('/items/:id', CartController.updateCartItem);    // PUT /api/cart/items/:id
router.delete('/items/:id', CartController.removeFromCart); // DELETE /api/cart/items/:id
router.delete('/', CartController.clearCart);               // DELETE /api/cart
router.get('/total', CartController.getCartTotal);          // GET /api/cart/total

export default router;
```

---

## ✅ Step 8D: Register Routes in Server

### File: `backend/src/index.ts`

**Add these lines after product routes import:**

```typescript
import cartRoutes from './routes/cartRoutes';
```

**Add this line after product routes registration (around line 47):**

```typescript
// Cart routes
app.use('/api/cart', cartRoutes);
```

**Complete section should look like:**

```typescript
// Product routes
app.use('/api/products', productRoutes);

// Cart routes
app.use('/api/cart', cartRoutes);

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

## 🧪 Test Cart Endpoints

### Start Server

```bash
bun run dev
```

### Test 1: Get Cart (Empty)

```bash
curl "http://localhost:3001/api/cart?userId=user123"
```

**Expected Response:**
```json
{
  "status": "success",
  "data": {
    "id": "clx...",
    "userId": "user123",
    "items": [],
    "createdAt": "2024-01-26T...",
    "updatedAt": "2024-01-26T..."
  }
}
```

### Test 2: Add Product to Cart (First create a product)

```bash
# Create product
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Blue Shirt",
    "price": 29.99,
    "category": "men",
    "image": "https://example.com/shirt.jpg"
  }'

# Copy the product ID from response, then add to cart
curl -X POST "http://localhost:3001/api/cart/items?userId=user123" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "PASTE_PRODUCT_ID_HERE",
    "quantity": 2
  }'
```

**Expected Response:**
```json
{
  "status": "success",
  "data": {
    "id": "clx...",
    "cartId": "clx...",
    "productId": "clx...",
    "quantity": 2,
    "product": {
      "id": "clx...",
      "name": "Blue Shirt",
      "price": 29.99,
      ...
    }
  }
}
```

### Test 3: Get Cart Total

```bash
curl "http://localhost:3001/api/cart/total?userId=user123"
```

**Expected Response:**
```json
{
  "status": "success",
  "data": {
    "cartId": "clx...",
    "items": [...],
    "total": 59.98,
    "itemCount": 1,
    "quantity": 2
  }
}
```

### Test 4: Update Item Quantity

```bash
# Copy cartItemId from add to cart response
curl -X PUT "http://localhost:3001/api/cart/items/PASTE_ITEM_ID_HERE?userId=user123" \
  -H "Content-Type: application/json" \
  -d '{"quantity": 5}'
```

### Test 5: Remove Item from Cart

```bash
curl -X DELETE "http://localhost:3001/api/cart/items/PASTE_ITEM_ID_HERE?userId=user123"
```

### Test 6: Clear Cart

```bash
curl -X DELETE "http://localhost:3001/api/cart?userId=user123"
```

---

## 📋 API Endpoints Summary

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/cart?userId=123` | Get user's cart |
| POST | `/api/cart/items?userId=123` | Add item to cart |
| PUT | `/api/cart/items/:id?userId=123` | Update item quantity |
| DELETE | `/api/cart/items/:id?userId=123` | Remove item from cart |
| DELETE | `/api/cart?userId=123` | Clear entire cart |
| GET | `/api/cart/total?userId=123` | Get cart total & summary |

---

## 📁 File Structure

```
backend/src/
├── index.ts                    ✅ Updated with routes
├── routes/
│   ├── productRoutes.ts       
│   └── cartRoutes.ts          ✅ NEW
├── controllers/
│   ├── productController.ts
│   └── cartController.ts      ✅ NEW
├── services/
│   ├── productService.ts
│   └── cartService.ts         ✅ NEW
└── (other folders)
```

---

## ⚠️ Important Notes

**Temporary userId handling:**
- Currently using `userId` from query string for testing
- After authentication is implemented, will use `req.userId` from auth middleware
- Update controllers to get userId from auth context instead of query string

**Cart operations:**
- Adding duplicate items increases quantity (not creates duplicate)
- Removing all items from cart keeps the empty cart (doesn't delete cart)
- Cart is created automatically if it doesn't exist

---

## ✅ Checklist

- [ ] Create `cartService.ts`
- [ ] Create `cartController.ts`
- [ ] Create `cartRoutes.ts`
- [ ] Import routes in `index.ts`
- [ ] Register routes with `app.use('/api/cart', cartRoutes)`
- [ ] Start server with `bun run dev`
- [ ] Create a test product
- [ ] Test all cart endpoints with curl
- [ ] Verify responses are correct

---

**Step 8 Complete!** 🚀

**Next Steps:**
- Step 9: Order Routes
- Step 10: Authentication Routes
- Step 11: Frontend Integration
