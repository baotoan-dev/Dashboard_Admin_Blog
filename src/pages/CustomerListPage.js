import React, { useEffect } from 'react';
import CustomerTable from '../components/customer/CustomerTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../data/userSlice';

export default function CustomerListPage() {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.user.list);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = (customer) => {
    console.log('Edit customer:', customer);
  };
  const handleDelete = (customer) => {
    console.log('Delete customer:', customer);
  };

  console.log('customers:', customers);

  return <CustomerTable customers={customers} onEdit={handleEdit} onDelete={handleDelete} />;
}
