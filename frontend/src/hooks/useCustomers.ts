import { useState, useEffect, useCallback } from 'react';
import { Customer } from '../types/customer';
import { customerService } from '../services/customer.service';

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dateSort, setDateSort] = useState<string>('');
  const [tier, setTier] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const fetchCustomers = useCallback(async () => {
  try {
    setLoading(true);
    setError(null);
    const result = await customerService.getAllCustomers({
      page,
      search: search || undefined,
      dateSort: dateSort || undefined,
      tier: tier || undefined,
      status: status || undefined,
    });
    setCustomers(result.data);
    setTotalPages(result.totalPages);
  } catch (err: any) {
    setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
  } finally {
    setLoading(false);
  }
}, [page, search, dateSort, tier, status]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const clearFilters = () => {
  setSearch('');
  setDateSort('');
  setTier('');
  setStatus('');
  setPage(1);
};
 
  return {
    page, setPage,
    search, setSearch,
    totalPages,
    customers,
    loading,
    error,
    refetch: fetchCustomers,
    dateSort, setDateSort,
    tier, setTier,
    status, setStatus,
    clearFilters
  };
}