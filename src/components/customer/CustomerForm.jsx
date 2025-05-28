import { Box, TextField, Button, IconButton, MenuItem } from '@mui/material';
import UploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React from 'react';
import { motion } from 'framer-motion';
import { uploadAvatar } from '../../api/upload';
import { ROLE_OPTIONS } from '../../data/roles';

// Schema validation với yup
const schema = yup.object().shape({
  FullName: yup.string().required('Full Name is required'),
  Email: yup.string().email('Invalid email').required('Email is required'),
  Password: yup.string().required('Password is required'),
  Role: yup.string().required('Role is required'),
});

export default function CustomerForm({ form, onSubmit, onRemoveAvatar }) {
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    defaultValues: form,
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    reset(form);
  }, [form, reset]);

  // Xử lý upload ảnh
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await uploadAvatar(file);
      setValue('AvatarUrl', url, { shouldValidate: true, shouldDirty: true });
    } catch (err) {
      alert('Upload failed!');
    }
  };

  const handleFormSubmit = (data) => {
    if (typeof onSubmit === 'function') {
      onSubmit(data);
    }
  };

  const avatarUrl = watch('AvatarUrl') || form.AvatarUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ width: '100%' }}
    >
      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <Box
          sx={{
            width: 100,
            height: 100,
            mb: 2,
            border: '1px dashed #ccc',
            borderRadius: 2,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: theme.palette.background.paper,
            overflow: 'hidden',
          }}
        >
          {!avatarUrl ? (
            <>
              <input
                type="file"
                name="AvatarUrl"
                accept="image/*"
                id="AvatarUrl-upload"
                hidden
                onChange={handleAvatarChange}
              />
              <label
                htmlFor="AvatarUrl-upload"
                style={{
                  cursor: 'pointer',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <UploadIcon fontSize="large" color="action" />
              </label>
            </>
          ) : (
            <>
              <img
                src={avatarUrl}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 8,
                  display: 'block',
                }}
                onError={(e) => (e.target.style.display = 'none')}
              />
              <IconButton
                size="small"
                onClick={onRemoveAvatar}
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  background: 'rgba(255,255,255,0.7)',
                  '&:hover': { background: 'rgba(255,255,255,1)' },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </Box>
        <TextField
          {...register('FullName')}
          label="Full Name"
          error={!!errors.FullName}
          helperText={errors.FullName?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          {...register('Email')}
          label="Email"
          error={!!errors.Email}
          helperText={errors.Email?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          {...register('Password')}
          label="Password"
          type="password"
          error={!!errors.Password}
          helperText={errors.Password?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          {...register('Role')}
          select
          label="Role"
          defaultValue={form.Role || 'User'}
          error={!!errors.Role}
          helperText={errors.Role?.message}
          fullWidth
          margin="normal"
        >
          {ROLE_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </motion.div>
  );
}
