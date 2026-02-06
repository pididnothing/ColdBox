import React, { useState, useEffect } from 'react';
import { Product, Bill, CustomerSummary, ProductWithStorage } from '../types';
import { getCustomerProducts, getCustomerBills, getCustomerSummary, getProductDetails } from '../services/api';

interface CustomerDashboardProps {
  customerId: number;
}

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ customerId }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [summary, setSummary] = useState<CustomerSummary | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [productDetails, setProductDetails] = useState<ProductWithStorage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [customerId]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [productsData, billsData, summaryData] = await Promise.all([
        getCustomerProducts(customerId),
        getCustomerBills(customerId),
        getCustomerSummary(customerId)
      ]);
      setProducts(productsData);
      setBills(billsData);
      setSummary(summaryData);
    } catch (err) {
      console.error('Failed to load customer dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = async (productId: number) => {
    try {
      if (selectedProduct === productId) {
        setSelectedProduct(null);
        setProductDetails([]);
      } else {
        const details = await getProductDetails(customerId, productId);
        setSelectedProduct(productId);
        setProductDetails(details);
      }
    } catch (err) {
      console.error('Failed to load product details:', err);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="dashboard">
      {/* Summary */}
      {summary && (
        <div className="dashboard-section">
          <h2>📊 Summary</h2>
          <div className="cards-grid">
            <div className="card">
              <h3>Total Products</h3>
              <div className="value">{summary.total_products}</div>
            </div>
            <div className="card">
              <h3>Total Paid</h3>
              <div className="value">{formatCurrency(summary.total_paid)}</div>
            </div>
            <div className="card">
              <h3>Total Bills</h3>
              <div className="value">{bills.length}</div>
            </div>
          </div>
        </div>
      )}

      {/* Products */}
      <div className="dashboard-section">
        <h2>📦 My Products</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th className="text-right">Quantity</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <React.Fragment key={product.product_id}>
                  <tr>
                    <td>#{product.product_id}</td>
                    <td>{product.product_name}</td>
                    <td className="text-right">{product.quantity}</td>
                    <td className="text-center">
                      <button
                        onClick={() => handleProductClick(product.product_id)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: '#3498db',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        {selectedProduct === product.product_id ? 'Hide Details' : 'View Details'}
                      </button>
                    </td>
                  </tr>
                  {selectedProduct === product.product_id && productDetails.length > 0 && (
                    <tr>
                      <td colSpan={4} style={{ background: '#f8f9fa', padding: '1.5rem' }}>
                        <div style={{ marginLeft: '2rem' }}>
                          <h4 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Storage Details</h4>
                          {productDetails.map((detail, idx) => (
                            <div key={idx} style={{ 
                              background: 'white', 
                              padding: '1rem', 
                              borderRadius: '4px',
                              marginBottom: '0.5rem',
                              border: '1px solid #dee2e6'
                            }}>
                              <p><strong>Storage Unit:</strong> #{detail.unit_id}</p>
                              <p><strong>Quantity Stored:</strong> {detail.quantity_stored}</p>
                              <p><strong>Temperature:</strong> {detail.temperature}°C</p>
                              <p><strong>Humidity:</strong> {detail.humidity}%</p>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <p className="text-center mt-2">No products found</p>
          )}
        </div>
      </div>

      {/* Bills */}
      <div className="dashboard-section">
        <h2>🧾 My Bills</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Bill ID</th>
                <th>Date</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {bills.map(bill => (
                <tr key={bill.bill_id}>
                  <td>#{bill.bill_id}</td>
                  <td>{formatDate(bill.bill_date)}</td>
                  <td className="text-right">{formatCurrency(bill.total_amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {bills.length === 0 && (
            <p className="text-center mt-2">No bills found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
