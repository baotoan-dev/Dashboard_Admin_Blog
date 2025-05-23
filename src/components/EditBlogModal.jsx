import { useState, useEffect } from 'react';
import { Button, TextField, Stack } from '@mui/material';
import BaseModal from './BaseModal';

export default function EditBlogModal({ open, onClose, onSave, blog }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    if (blog) setForm(blog);
  }, [blog]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="Chỉnh sửa bài viết"
      actions={
        <>
          <Button onClick={onClose} variant="outlined">
            Huỷ
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            Lưu
          </Button>
        </>
      }
    >
      <Stack spacing={2}>
        <TextField
          label="Tiêu đề"
          name="title"
          fullWidth
          value={form.title}
          onChange={handleChange}
        />
        <TextField
          label="Nội dung"
          name="content"
          fullWidth
          value={form.content}
          onChange={handleChange}
        />
      </Stack>
    </BaseModal>
  );
}
