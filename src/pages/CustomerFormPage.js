import React, { useState } from 'react';
import CustomerForm from '../components/CustomerForm';

export default function CustomerFormPage() {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    addressLine1: '',
    addressLine2: '',
    cardNumber: '',
    cardExpiry: '',
  });

  const onChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <CustomerForm
      isMobile={false}
      drawerWidth={240}
      formData={formData}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}
