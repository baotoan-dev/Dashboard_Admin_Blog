import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
  Avatar,
  Stack,
} from '@mui/material';
import { Visibility, VisibilityOff, Lock, Email, Person } from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Fake login — replace with real API call
    setTimeout(() => {
      setLoading(false);
      if (form.email === 'admin@example.com' && form.password === '123456') {
        onLogin?.(form);
      } else {
        setError('Email hoặc mật khẩu không đúng!');
      }
    }, 1000);
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundImage:
          'linear-gradient(135deg, #1e3c72 0%, #2a5298 25%, #4e4376 50%, #2b5876 75%, #4e4376 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite',
        '@keyframes gradientShift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      }}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Paper
          elevation={12}
          sx={{
            px: { xs: 3, sm: 6 },
            py: { xs: 4, sm: 6 },
            minWidth: { xs: 300, sm: 380 },
            borderRadius: 4,
            backdropFilter: 'blur(10px)',
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(33, 33, 33, 0.65)'
                : 'rgba(255, 255, 255, 0.65)',
          }}
        >
          <Stack spacing={2} alignItems="center" mb={2}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
              <Person fontSize="large" />
            </Avatar>
            <Typography variant="h5" fontWeight={700} color="primary.main">
              Đăng nhập
            </Typography>
          </Stack>

          <form onSubmit={handleSubmit} noValidate>
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              type="email"
              autoComplete="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Mật khẩu"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      size="small"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Typography color="error" fontSize={14} mt={1} textAlign="center">
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 3, py: 1.5, fontWeight: 600, letterSpacing: 0.5 }}
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              Đăng nhập
            </Button>
          </form>
        </Paper>
      </motion.div>
    </Box>
  );
}
