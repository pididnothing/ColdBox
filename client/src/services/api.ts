import axios from 'axios';
import {
  User,
  StorageUnit,
  BillWithCustomer,
  FinancialSummary,
  Product,
  Bill,
  ProductWithStorage,
  CustomerSummary
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// User APIs
export const getUser = async (userId: number): Promise<User> => {
  const response = await api.get<User>(`/user/${userId}`);
  return response.data;
};

export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>('/user');
  return response.data;
};

// Owner APIs
export const getStorageUnits = async (ownerId: number): Promise<StorageUnit[]> => {
  const response = await api.get<StorageUnit[]>(`/owner/${ownerId}/storage-units`);
  return response.data;
};

export const getOwnerBills = async (ownerId: number): Promise<BillWithCustomer[]> => {
  const response = await api.get<BillWithCustomer[]>(`/owner/${ownerId}/bills`);
  return response.data;
};

export const getFinancialSummary = async (ownerId: number): Promise<FinancialSummary> => {
  const response = await api.get<FinancialSummary>(`/owner/${ownerId}/financial-summary`);
  return response.data;
};

// Customer APIs
export const getCustomerProducts = async (customerId: number): Promise<Product[]> => {
  const response = await api.get<Product[]>(`/customer/${customerId}/products`);
  return response.data;
};

export const getProductDetails = async (customerId: number, productId: number): Promise<ProductWithStorage[]> => {
  const response = await api.get<ProductWithStorage[]>(`/customer/${customerId}/products/${productId}/details`);
  return response.data;
};

export const getCustomerBills = async (customerId: number): Promise<Bill[]> => {
  const response = await api.get<Bill[]>(`/customer/${customerId}/bills`);
  return response.data;
};

export const getCustomerSummary = async (customerId: number): Promise<CustomerSummary> => {
  const response = await api.get<CustomerSummary>(`/customer/${customerId}/summary`);
  return response.data;
};

export default api;
