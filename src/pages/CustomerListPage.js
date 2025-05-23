import React from 'react';
import CustomerTable from '../components/customer/CustomerTable';
import { customers } from '../data/customers';

export default function CustomerListPage() {
  const handleEdit = (customer) => {
    console.log('Edit customer:', customer);
  };
  const handleDelete = (customer) => {
    console.log('Delete customer:', customer);
  };
  return (
    <CustomerTable customers={customers} onEdit={() => handleEdit} onDelete={() => handleDelete} />
  );
}
