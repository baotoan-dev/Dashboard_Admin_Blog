import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import BlogForm from '../components/blog/BlogForm';

export default function CreateBlogPage() {
  const [form, setForm] = useState({
    title: '',
    summary: '',
    content: '',
    image: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Blog created!\n' + JSON.stringify(form, null, 2));
  };

  return (
    <Box
      sx={{
        width: '100%',
        mx: 'auto',
      }}
    >
      <Typography variant="h6" mb={2} fontWeight="bold">
        Create New Blog
      </Typography>
      <BlogForm form={form} onChange={handleChange} onSubmit={handleSubmit} />
    </Box>
  );
}
