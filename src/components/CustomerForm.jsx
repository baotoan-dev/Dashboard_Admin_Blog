import { Box, TextField, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function CustomerForm({ isMobile, drawerWidth, formData, onChange, onSubmit }) {
  return (
    <Box component="form" onSubmit={onSubmit}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
        Customer Form
      </Typography>
      <TextField
        name="customerName"
        label="Customer Name"
        value={formData.customerName}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="customerPhone"
        label="Phone Number"
        value={formData.customerPhone}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="addressLine1"
        label="Address Line 1"
        value={formData.addressLine1}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="addressLine2"
        label="Address Line 2"
        value={formData.addressLine2}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="cardNumber"
        label="Card Number"
        value={formData.cardNumber}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="cardExpiry"
        label="Card Expiry"
        value={formData.cardExpiry}
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
