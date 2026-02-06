import { Router, Request, Response } from 'express';
import pool from '../config/database';
import { StorageUnit, BillWithCustomer, FinancialSummary } from '../types';

const router = Router();

// Get all storage units for an owner
router.get('/:ownerId/storage-units', async (req: Request, res: Response) => {
  try {
    const { ownerId } = req.params;
    
    const result = await pool.query<StorageUnit>(
      `SELECT unit_id, owner_id, capacity, temperature, humidity, current_load
       FROM storage_units 
       WHERE owner_id = $1
       ORDER BY unit_id`,
      [ownerId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching storage units:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all bills with customer information for an owner
router.get('/:ownerId/bills', async (req: Request, res: Response) => {
  try {
    const { ownerId } = req.params;
    
    const result = await pool.query<BillWithCustomer>(
      `SELECT b.bill_id, b.customer_id, b.owner_id, b.bill_date, b.total_amount,
              u.user_name as customer_name, u.email as customer_email
       FROM bills b
       JOIN users u ON b.customer_id = u.user_id
       WHERE b.owner_id = $1
       ORDER BY b.bill_date DESC`,
      [ownerId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching bills:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get financial summary for an owner
router.get('/:ownerId/financial-summary', async (req: Request, res: Response) => {
  try {
    const { ownerId } = req.params;
    
    // Get total revenue
    const revenueResult = await pool.query(
      `SELECT COALESCE(SUM(total_amount), 0) as total_revenue
       FROM bills
       WHERE owner_id = $1`,
      [ownerId]
    );

    // Get active customers count
    const customersResult = await pool.query(
      `SELECT COUNT(DISTINCT customer_id) as active_customers
       FROM bills
       WHERE owner_id = $1`,
      [ownerId]
    );

    // Get average utilization
    const utilizationResult = await pool.query(
      `SELECT 
         COUNT(*) as total_units,
         COALESCE(AVG(CASE WHEN capacity > 0 THEN (current_load / capacity) * 100 ELSE 0 END), 0) as average_utilization
       FROM storage_units
       WHERE owner_id = $1`,
      [ownerId]
    );

    const summary: FinancialSummary = {
      total_revenue: parseFloat(revenueResult.rows[0].total_revenue),
      active_customers: parseInt(customersResult.rows[0].active_customers),
      average_utilization: parseFloat(utilizationResult.rows[0].average_utilization),
      total_units: parseInt(utilizationResult.rows[0].total_units)
    };

    res.json(summary);
  } catch (error) {
    console.error('Error fetching financial summary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
