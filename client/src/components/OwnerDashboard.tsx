import React, { useState, useEffect } from 'react';
import { StorageUnit, BillWithCustomer, FinancialSummary } from '../types';
import { getStorageUnits, getOwnerBills, getFinancialSummary } from '../services/api';

interface OwnerDashboardProps {
  ownerId: number;
}

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ ownerId }) => {
  const [storageUnits, setStorageUnits] = useState<StorageUnit[]>([]);
  const [bills, setBills] = useState<BillWithCustomer[]>([]);
  const [summary, setSummary] = useState<FinancialSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [ownerId]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [unitsData, billsData, summaryData] = await Promise.all([
        getStorageUnits(ownerId),
        getOwnerBills(ownerId),
        getFinancialSummary(ownerId)
      ]);
      setStorageUnits(unitsData);
      setBills(billsData);
      setSummary(summaryData);
    } catch (err) {
      console.error('Failed to load owner dashboard:', err);
    } finally {
      setLoading(false);
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
      {/* Financial Summary */}
      {summary && (
        <div className="dashboard-section">
          <h2>📊 Financial Summary</h2>
          <div className="cards-grid">
            <div className="card">
              <h3>Total Revenue</h3>
              <div className="value">{formatCurrency(summary.total_revenue)}</div>
            </div>
            <div className="card">
              <h3>Active Customers</h3>
              <div className="value">{summary.active_customers}</div>
            </div>
            <div className="card">
              <h3>Average Utilization</h3>
              <div className="value">{summary.average_utilization.toFixed(1)}%</div>
            </div>
            <div className="card">
              <h3>Total Units</h3>
              <div className="value">{summary.total_units}</div>
            </div>
          </div>
        </div>
      )}

      {/* Storage Units */}
      <div className="dashboard-section">
        <h2>🏭 Storage Units</h2>
        <div className="cards-grid">
          {storageUnits.map(unit => {
            const utilizationPercent = unit.capacity > 0 
              ? (unit.current_load / unit.capacity) * 100 
              : 0;
            
            return (
              <div key={unit.unit_id} className="card storage-unit">
                <h3>Unit #{unit.unit_id}</h3>
                <div className="unit-stats">
                  <div className="unit-stat">
                    <div className="label">Temperature</div>
                    <div className="value">{unit.temperature}°C</div>
                  </div>
                  <div className="unit-stat">
                    <div className="label">Humidity</div>
                    <div className="value">{unit.humidity}%</div>
                  </div>
                  <div className="unit-stat">
                    <div className="label">Capacity</div>
                    <div className="value">{unit.capacity}</div>
                  </div>
                  <div className="unit-stat">
                    <div className="label">Current Load</div>
                    <div className="value">{unit.current_load}</div>
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="progress-label">
                    <span>Utilization</span>
                    <span>{utilizationPercent.toFixed(1)}%</span>
                  </div>
                  <div className="progress-track">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${Math.min(utilizationPercent, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {storageUnits.length === 0 && (
          <p className="text-center">No storage units found</p>
        )}
      </div>

      {/* Bills */}
      <div className="dashboard-section">
        <h2>🧾 Recent Bills</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Bill ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Date</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {bills.map(bill => (
                <tr key={bill.bill_id}>
                  <td>#{bill.bill_id}</td>
                  <td>{bill.customer_name}</td>
                  <td>{bill.customer_email}</td>
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

export default OwnerDashboard;
