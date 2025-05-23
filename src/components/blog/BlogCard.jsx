import { Box, Typography } from '@mui/material';

function BlogCard({ blog }) {
  return (
    <Box
      sx={{
        mt: 2,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        border: '1px solid #e0e0e0',
        padding: 2,
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        backgroundColor: '#fafafa',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Box
        component="img"
        src={blog.image}
        alt={blog.title}
        sx={{
          width: 100,
          height: 100,
          objectFit: 'cover',
          borderRadius: 2,
          flexShrink: 0,
        }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: '#333',
            mb: 0.5,
            lineHeight: 1.4,
          }}
        >
          {blog.title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#555', mb: 1 }}>
          {blog.content}
        </Typography>
        <Typography variant="caption" sx={{ color: '#888' }}>
          By {blog.author}
        </Typography>
      </Box>
    </Box>
  );
}

export default BlogCard;
