import { useTheme } from '@mui/material/styles';

export default function Footer() {
  const theme = useTheme();

  return (
    <footer
      style={{
        padding: '20px',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: 0 }}>© 2023 My App. All rights reserved.</p>
        <p style={{ margin: 0 }}>
          <a
            href="/privacy-policy"
            style={{ textDecoration: 'none', color: theme.palette.primary.main }}
          >
            Privacy Policy
          </a>
        </p>
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <p style={{ margin: 0 }}>
          <a
            href="/terms-of-service"
            style={{ textDecoration: 'none', color: theme.palette.primary.main }}
          >
            Terms of Service
          </a>
        </p>
        <p style={{ margin: 0 }}>
          <a href="/contact" style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
            Contact Us
          </a>
        </p>
      </div>
    </footer>
  );
}
