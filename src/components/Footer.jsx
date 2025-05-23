export default function Footer() {
  return (
    <footer style={{ padding: '20px', backgroundColor: '#f8f9fa' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: 0 }}>© 2023 My App. All rights reserved.</p>
        <p style={{ margin: 0 }}>
          <a href="/privacy-policy" style={{ textDecoration: 'none', color: '#007bff' }}>
            Privacy Policy
          </a>
        </p>
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <p style={{ margin: 0 }}>
          <a href="/terms-of-service" style={{ textDecoration: 'none', color: '#007bff' }}>
            Terms of Service
          </a>
        </p>
        <p style={{ margin: 0 }}>
          <a href="/contact" style={{ textDecoration: 'none', color: '#007bff' }}>
            Contact Us
          </a>
        </p>
      </div>
    </footer>
  );
}
