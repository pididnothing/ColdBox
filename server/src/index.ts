import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ownerRoutes from './routes/owner';
import customerRoutes from './routes/customer';
import userRoutes from './routes/user';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/owner', ownerRoutes);
app.use('/api/customer', customerRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
