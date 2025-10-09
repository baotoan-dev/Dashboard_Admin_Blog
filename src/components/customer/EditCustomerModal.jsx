import { useState, useEffect } from 'react';
import { Button, TextField, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import BaseModal from '../modal/BaseModal';
import { ROLE_OPTIONS } from '../../data/roles';

export default function EditCustomerModal({ open, onClose, onSave, customer }) {
  const [form, setForm] = useState({
    fullName: '',
    password: '',
    email: '',
    avatarUrl: '',
    role: '',
  });
  const [avatarPreview, setAvatarPreview] = useState('');

  useEffect(() => {
    if (customer) {
      setForm(customer);
      setAvatarPreview(customer.avatarUrl || '');
    }
  }, [customer]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, avatarUrl: file });
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveAvatar = () => {
    setForm({ ...form, avatarUrl: '' });
    setAvatarPreview('');
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="Chỉnh sửa khách hàng"
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
      <Stack spacing={2} alignItems="center">
        <Avatar src={avatarPreview} sx={{ width: 80, height: 80 }} />
        <Stack direction="row" spacing={1}>
          <IconButton color="primary" component="label">
            <PhotoCamera />
            <input hidden accept="image/*" type="file" onChange={handleAvatarChange} />
          </IconButton>
          {avatarPreview && (
            <IconButton color="error" onClick={handleRemoveAvatar}>
              <DeleteIcon />
            </IconButton>
          )}
        </Stack>
        <TextField
          label="Tên đầy đủ"
          name="fullName"
          fullWidth
          value={form.fullName}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          fullWidth
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          fullWidth
          value={form.password}
          onChange={handleChange}
        />
        <TextField
          select
          label="Role"
          name="role"
          value={form.role || 'User'}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          {ROLE_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
    </BaseModal>
  );
}
