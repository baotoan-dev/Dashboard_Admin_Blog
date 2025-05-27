import { useState, useEffect } from 'react';
import { Button, TextField, Stack } from '@mui/material';
import BaseModal from '../modal/BaseModal';

export default function EditCustomerModal({ open, onClose, onSave, customer }) {
  console.log('customer:', customer);
  const [form, setForm] = useState({
    Fullname: '',
    Password: '',
    Email: '',
  });

  useEffect(() => {
    if (customer) setForm(customer);
  }, [customer]);

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
      <Stack spacing={2}>
        <TextField
          label="Tên đầy đủ"
          name="Fullname"
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
          name="Password"
          fullWidth
          value={form.password}
          onChange={handleChange}
        />
      </Stack>
    </BaseModal>
  );
}
