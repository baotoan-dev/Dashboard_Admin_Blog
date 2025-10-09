import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CustomerForm from '../components/customer/CustomerForm';
import { ROLE_OPTIONS } from '../data/roles';
import { useDispatch } from 'react-redux';
import { addUser } from '../data/userSlice';

export default function CreateCustomerPage() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    avatarUrl: '',
    fullName: '',
    password: '',
    email: '',
    role: ROLE_OPTIONS[0].value, // Mặc định chọn role đầu tiên
  });

  const handleSubmit = async (data) => {
    try {
      await dispatch(addUser(data)).unwrap();
      alert('Customer created!');
      setForm({
        avatarUrl: '',
        fullName: '',
        password: '',
        email: '',
        role: ROLE_OPTIONS[0].value,
      });
    } catch (error) {
      alert('Tạo user thất bại!');
    }
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
      <CustomerForm form={form} onSubmit={handleSubmit} />
    </Box>
  );
}
