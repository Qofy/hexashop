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