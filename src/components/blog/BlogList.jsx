import { Box, Typography } from '@mui/material';
import BlogCard from './BlogCard';
import { motion } from 'framer-motion';

export default function BlogList({ blogs }) {
  return (
    <Box>
      <Typography variant="h6" mb={4} fontWeight="bold">
        Blog List
      </Typography>
      {blogs.map((blog, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
        >
          <BlogCard blog={blog} />
        </motion.div>
      ))}
    </Box>
  );
}
