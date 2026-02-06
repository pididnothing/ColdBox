export interface User {
  user_id: number;
  user_name: string;
  phone: string;
  email: string;
  role: 'OWNER' | 'CUSTOMER';
  created_at: string;
}

export interface StorageUnit {
  unit_id: number;
  owner_id: number;
  capacity: number;
  temperature: number;
  humidity: number;
  current_load: number;
}

export interface Product {
  product_id: number;
  customer_id: number;
  product_name: string;
  quantity: number;
}

export interface Bill {
  bill_id: number;
  customer_id: number;
  owner_id: number;
  bill_date: string;
  total_amount: number;
}

export interface BillWithCustomer extends Bill {
  customer_name: string;
  customer_email: string;
}

export interface ProductWithStorage extends Product {
  unit_id: number;
  quantity_stored: number;
  temperature: number;
  humidity: number;
}

export interface FinancialSummary {
  total_revenue: number;
  active_customers: number;
  average_utilization: number;
  total_units: number;
}

export interface CustomerSummary {
  total_products: number;
  total_paid: number;
}
