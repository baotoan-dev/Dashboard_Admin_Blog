import { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';
import ConfirmDeleteModal from '../modal/ConfirmDeleteModal';
import EditCustomerModal from './EditCustomerModal';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function CustomerTable({ customers, onEdit, onDelete }) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const rowsPerPage = 5;
  const navigate = useNavigate();

  // Lọc customer theo search (theo tên hoặc email)
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.fullName.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()),
  );

  // Lấy dữ liệu trang hiện tại
  const pagedCustomers = filteredCustomers.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  const handleDeleteClick = (customer) => {
    setSelectedCustomer(customer);
    setDeleteOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Danh sách khách hàng | Dashboard Admin Blog</title>
        <meta
          name="description"
          content="Quản lý, tìm kiếm, chỉnh sửa và xóa khách hàng trên hệ thống Dashboard Admin Blog."
        />
        <meta name="keywords" content="khách hàng, customer, dashboard, admin, quản lý" />
      </Helmet>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Customer Table
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              // redirect to /customers/add
              navigate('/customers/add');
            }}
          >
            Tạo mới
          </Button>
        </Box>

        <TextField
          size="small"
          placeholder="Tìm kiếm tên hoặc email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0); // reset về trang đầu khi search
          }}
          sx={{ mb: 2, width: '100%' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ width: '100%' }}
        >
          <TableContainer
            component={Paper}
            sx={{
              mt: 2,
              overflowX: 'auto',
              '@media (max-width:600px)': {
                '& th, & td': {
                  padding: '6px 8px',
                  fontSize: '12px',
                },
                '& th:nth-of-type(3), & td:nth-of-type(3), & th:nth-of-type(5), & td:nth-of-type(5)':
                  {
                    display: 'none',
                  },
              },
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Avatar</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pagedCustomers.map((customer, index) => (
                  <TableRow key={index}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      <Box
                        component="img"
                        src={
                          customer.avatarUrl ||
                          'https://res.cloudinary.com/ddwjnjssj/image/upload/v1748309105/rxujxggvyaf9fahaqduf.png'
                        }
                        alt={customer.fullName}
                        sx={{
                          width: 50,
                          height: 50,
                          objectFit: 'cover',
                          borderRadius: '50%',
                          flexShrink: 0,
                        }}
                      />
                    </TableCell>
                    <TableCell>{customer.fullName}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          color: customer.isActive ? 'green' : 'red',
                          fontWeight: 'bold',
                        }}
                      >
                        {customer.isActive ? 'Active' : 'Inactive'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          color="primary"
                          onClick={() => {
                            setSelectedCustomer(customer);
                            setEditOpen(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => {
                            handleDeleteClick(customer);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {pagedCustomers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Không có dữ liệu
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </motion.div>

        {/* Pagination controls with icons */}
        <Box
          sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2, gap: 1 }}
        >
          <IconButton color="primary" disabled={page === 0} onClick={() => setPage(page - 1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="body2">
            {page + 1} / {Math.max(1, Math.ceil(filteredCustomers.length / rowsPerPage))}
          </Typography>
          <IconButton
            color="primary"
            disabled={(page + 1) * rowsPerPage >= filteredCustomers.length}
            onClick={() => setPage(page + 1)}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>

        <ConfirmDeleteModal
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          onConfirm={() => {
            onDelete(selectedCustomer);
            setDeleteOpen(false);
          }}
          title="Xóa customer"
          message={`Bạn có chắc chắn muốn xóa customer "${selectedCustomer?.fullName}" không?`}
        />

        <EditCustomerModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          onSave={(updatedCustomer) => {
            onEdit(selectedCustomer.id, updatedCustomer);
            setEditOpen(false);
          }}
          customer={selectedCustomer}
          title="Chỉnh sửa khách hàng"
        />
      </Box>
    </>
  );
}
