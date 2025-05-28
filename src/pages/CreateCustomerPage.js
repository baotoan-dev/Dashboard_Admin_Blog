import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CustomerForm from '../components/customer/CustomerForm';
import { ROLE_OPTIONS } from '../data/roles';
import { useDispatch } from 'react-redux';
import { addUser } from '../data/userSlice';

export default function CreateCustomerPage() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    AvatarUrl: '',
    FullName: '',
    Password: '',
    Email: '',
    Role: ROLE_OPTIONS[0].value, // Mặc định chọn role đầu tiên
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

  const handleSubmit = async (data) => {
    try {
      await dispatch(addUser(data)).unwrap();
      alert('Customer created!');
      setForm({
        AvatarUrl: '',
        FullName: '',
        Password: '',
        Email: '',
        Role: ROLE_OPTIONS[0].value,
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
      <CustomerForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onRemoveAvatar={handleRemoveAvatar}
      />
    </Box>
  );
}
