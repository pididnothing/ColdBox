import { Router, Request, Response } from 'express';
import pool from '../config/database';
import { User } from '../types';

const router = Router();

// Get current user by ID (in real app, this would use authentication)
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    const result = await pool.query<User>(
      'SELECT * FROM users WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all users (for testing/demo purposes)
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query<User>(
      'SELECT user_id, user_name, email, role FROM users ORDER BY user_name'
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
