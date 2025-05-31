import { useState, useEffect } from 'react';
import { Button, TextField, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import BaseModal from '../modal/BaseModal';
import { ROLE_OPTIONS } from '../../data/roles';

export default function EditCustomerModal({ open, onClose, onSave, customer }) {
  const [form, setForm] = useState({
    Fullname: '',
    Password: '',
    Email: '',
    AvatarUrl: '',
    Role: '',
  });
  const [avatarPreview, setAvatarPreview] = useState('');

  useEffect(() => {
    if (customer) {
      setForm(customer);
      setAvatarPreview(customer.AvatarUrl || '');
    }
  }, [customer]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, AvatarUrl: file });
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveAvatar = () => {
    setForm({ ...form, AvatarUrl: '' });
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
          name="Fullname"
          fullWidth
          value={form.Fullname}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="Email"
          fullWidth
          value={form.Email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="Password"
          fullWidth
          value={form.Password}
          onChange={handleChange}
        />
        <TextField
          select
          label="Role"
          name="Role"
          value={form.Role || 'User'}
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
