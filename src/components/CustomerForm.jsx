import { Box, TextField, Button, IconButton } from '@mui/material';
import UploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';

export default function CustomerForm({ form, onChange, onSubmit, onRemoveAvatar }) {
  const theme = useTheme();

  return (
    <Box component="form" onSubmit={onSubmit}>
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
        {!form.avatar ? (
          <>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              id="avatar-upload"
              hidden
              onChange={onChange}
            />
            <label
              htmlFor="avatar-upload"
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
              src={typeof form.avatar === 'string' ? form.avatar : URL.createObjectURL(form.avatar)}
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
        name="firstName"
        label="First Name"
        value={form.firstName}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="lastName"
        label="Last Name"
        value={form.lastName}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="email"
        label="Email"
        value={form.email}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
}
