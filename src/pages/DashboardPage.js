import React from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import { customers } from '../data/customers';
import { blogs } from '../data/blogs';

export default function DashBoardPage() {
  return <Dashboard customers={customers} blogs={blogs} />;
}
