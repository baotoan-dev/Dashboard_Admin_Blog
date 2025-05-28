import {
  Box,
  Typography,
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import ArticleIcon from '@mui/icons-material/Article';
import PeopleIcon from '@mui/icons-material/People';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../../data/userSlice.js'; // Adjust the import path as necessary

export default function Dashboard({ blogs, customers }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isLoading = !blogs || !customers;
  const users = useSelector((state) => state.user.list);

  useEffect(() => {
    if (!users || users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [users, dispatch]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
      >
        <CircularProgress size={48} thickness={4} />
        <Typography mt={2}>Đang tải dữ liệu...</Typography>
      </Box>
    );
  }

  const blogCountsByAuthor = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1;
    return acc;
  }, {});
  const blogData = Object.entries(blogCountsByAuthor).map(([author, count]) => ({
    author,
    count,
  }));

  const genderCounts = customers.reduce((acc, cust) => {
    acc[cust.gender] = (acc[cust.gender] || 0) + 1;
    return acc;
  }, {});
  const pieData = Object.entries(genderCounts).map(([gender, value]) => ({
    name: gender,
    value,
  }));

  const COLORS = ['#42A5F5', '#66BB6A', '#FFA726', '#EF5350', '#AB47BC'];

  return (
    <Box>
      <Typography variant="h6" mb={2} fontWeight="bold" textAlign={isSmall ? 'center' : 'left'}>
        Dashboard Thống Kê
      </Typography>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        style={{ width: '100%' }}
      >
        <Grid container spacing={4}>
          {/* Biểu đồ Blog */}
          <Grid item xs={12} md={6}>
            <Paper elevation={4} sx={{ p: isSmall ? 2 : 3, minHeight: isSmall ? 360 : 420 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <ArticleIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight={600}>
                  Số blog theo tác giả
                </Typography>
              </Box>

              <ResponsiveContainer width="100%" height={isSmall ? 250 : 320}>
                <BarChart data={blogData} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="author" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#1976d2" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Biểu đồ Customers */}
          <Grid item xs={12} md={6}>
            <Paper elevation={4} sx={{ p: isSmall ? 2 : 3, minHeight: isSmall ? 360 : 420 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <PeopleIcon color="secondary" sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight={600}>
                  Phân phối giới tính nguời dùng
                </Typography>
              </Box>

              <ResponsiveContainer width="100%" height={isSmall ? 250 : 320}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={isSmall ? 90 : 120}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
}
