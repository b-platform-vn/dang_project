import { api } from './api';
import { Customer } from '../types/customer';

export const customerService = {
  getAllCustomers: async (params?: any): Promise<{ data: Customer[], total: number, page: number, totalPages: number }> => {
    const response = await api.get('/customers', { params });
    return response.data;
  },

  createCustomer: async (data: Omit<Customer, 'id'>): Promise<Customer> => {
    const response = await api.post<Customer>('/customers', data);
    return response.data;
  },

  updateCustomer: async (id: string, data: Partial<Customer>): Promise<Customer> => {
  const response = await api.patch<Customer>(`/customers/${id}`, data);
  return response.data;
},

 deleteCustomer: async (id: string): Promise<Customer> => {
  const response = await api.delete<Customer>(`/customers/${id}`);
  return response.data;
},

};