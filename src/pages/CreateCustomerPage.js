import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CustomerForm from '../components/customer/CustomerForm';

export default function CreateCustomerPage() {
  const [form, setForm] = useState({
    avatar: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleChange = (e) => {
    if (e.target.name === 'avatar') {
      setForm({ ...form, avatar: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleRemoveAvatar = () => {
    setForm({ ...form, avatar: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Customer created!\n' + JSON.stringify(form, null, 2));
  };

  return (
    <Box
      sx={{
        width: '100%',
        mx: 'auto',
      }}
    >
      <Typography variant="h6" mb={2} fontWeight="bold">
        Create New Customer
      </Typography>
      <CustomerForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onRemoveAvatar={handleRemoveAvatar}
      />
    </Box>
  );
}
