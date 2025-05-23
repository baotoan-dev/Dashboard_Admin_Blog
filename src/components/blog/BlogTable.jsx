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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';
import ConfirmDeleteModal from '../modal/ConfirmDeleteModal';
import EditBlogModal from './EditBlogModal';

export default function BlogTable({ blogs, onEdit, onDelete }) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const rowsPerPage = 5;

  // Lọc blog theo search (theo tiêu đề hoặc tác giả)
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.author.toLowerCase().includes(search.toLowerCase()),
  );

  // Lấy dữ liệu trang hiện tại
  const pagedBlogs = filteredBlogs.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  const handleDeleteClick = (blog) => {
    setSelectedBlog(blog);
    setDeleteOpen(true);
  };

  return (
    <Box>
      <Typography variant="h6" mb={2} fontWeight="bold">
        Blog Table
      </Typography>

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
              '& th:nth-of-type(3), & td:nth-of-type(3)': {
                display: 'none', // Ẩn cột Nội dung trên mobile
              },
            },
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Tiêu đề</TableCell>
                <TableCell>Nội dung</TableCell>
                <TableCell>Tác giả</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pagedBlogs.map((blog, index) => (
                <TableRow key={index}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>{blog.content}</TableCell>
                  <TableCell>{blog.author}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setSelectedBlog(blog);
                          setEditOpen(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => {
                          handleDeleteClick(blog);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {pagedBlogs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
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
          {page + 1} / {Math.max(1, Math.ceil(filteredBlogs.length / rowsPerPage))}
        </Typography>
        <IconButton
          color="primary"
          disabled={(page + 1) * rowsPerPage >= filteredBlogs.length}
          onClick={() => setPage(page + 1)}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>

      <ConfirmDeleteModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => {
          onDelete(selectedBlog);
          setDeleteOpen(false);
        }}
        title="Xóa blog"
        message={`Bạn có chắc chắn muốn xóa blog "${selectedBlog?.title}" không?`}
      />

      <EditBlogModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={(updatedBlog) => {
          onEdit(selectedBlog.id, updatedBlog);
          setEditOpen(false);
        }}
        customer={selectedBlog}
        title="Chỉnh sửa blog"
      />
    </Box>
  );
}
