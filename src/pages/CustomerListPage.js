import React from 'react';
import CustomerTable from '../components/CustomerTable';
import { customers } from '../data/customers';

export default function CustomerListPage() {
  return <CustomerTable customers={customers} />;
}
