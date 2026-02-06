import { Router, Request, Response } from 'express';
import pool from '../config/database';
import { Product, Bill, ProductWithStorage } from '../types';

const router = Router();

// Get all products for a customer
router.get('/:customerId/products', async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params;
    
    const result = await pool.query<Product>(
      `SELECT product_id, customer_id, product_name, quantity
       FROM products 
       WHERE customer_id = $1
       ORDER BY product_name`,
      [customerId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get product details with storage information
router.get('/:customerId/products/:productId/details', async (req: Request, res: Response) => {
  try {
    const { customerId, productId } = req.params;
    
    const result = await pool.query<ProductWithStorage>(
      `SELECT 
         p.product_id, p.customer_id, p.product_name, p.quantity,
         bi.unit_id, bi.quantity_stored,
         su.temperature, su.humidity
       FROM products p
       LEFT JOIN bill_items bi ON p.product_id = bi.product_id
       LEFT JOIN storage_units su ON bi.unit_id = su.unit_id
       WHERE p.customer_id = $1 AND p.product_id = $2`,
      [customerId, productId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all bills for a customer
router.get('/:customerId/bills', async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params;
    
    const result = await pool.query<Bill>(
      `SELECT bill_id, customer_id, owner_id, bill_date, total_amount
       FROM bills 
       WHERE customer_id = $1
       ORDER BY bill_date DESC`,
      [customerId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching bills:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get customer summary
router.get('/:customerId/summary', async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params;
    
    // Get total products count
    const productsResult = await pool.query(
      `SELECT COUNT(*) as total_products
       FROM products
       WHERE customer_id = $1`,
      [customerId]
    );

    // Get total bills paid
    const billsResult = await pool.query(
      `SELECT COALESCE(SUM(total_amount), 0) as total_paid
       FROM bills
       WHERE customer_id = $1`,
      [customerId]
    );

    const summary = {
      total_products: parseInt(productsResult.rows[0].total_products),
      total_paid: parseFloat(billsResult.rows[0].total_paid)
    };

    res.json(summary);
  } catch (error) {
    console.error('Error fetching customer summary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
