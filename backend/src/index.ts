import express, {Express, Request, Response, NextFunction} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {PrismaClient} from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import path from 'path';
import { AppError } from './middleware/errorHandlers';
// import { error } from 'console';

dotenv.config()

const app: Express = express();
const port = process.env.PORT || 3001;

// Initialize Prisma with PostgreSQL adapter
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

export const prisma = new PrismaClient({ adapter });

//Enabling Cors(allow frontend)
app.use(
    cors({
        origin:process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true,
        methods:['GET', 'POST','PUT','DELETE', 'PATCH'],
        allowedHeaders:['Content-Types', 'Authorization'],
    })
);
//parse Json request body
app.use(express.json());

//Parse URL-encoded request body
app.use(express.urlencoded({extended:true}));

//Health Checks
app.get('/api/health', (req:Request, res:Response)=>{
    res.status(200).json({
        status: 'OK',
        message:'Server is running',
        timestamp: new Date().toISOString(),
    });
});


app.use((req:Request, res:Response)=>{
    res.status(404).json({
        error: 'Not Found',
        message:`Route ${req.path} not found`,
        path: req.path,
        method: req.method,
    });
});

// Global error handler
app.use((err: Error|AppError, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);

  const status = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    error: {
      status,
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
});

//  START SERVER 

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