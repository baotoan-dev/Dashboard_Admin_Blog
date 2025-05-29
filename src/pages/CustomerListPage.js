import React, { useEffect } from 'react';
import CustomerTable from '../components/customer/CustomerTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../data/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CustomerListPage() {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.user.list);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = (customer) => {
    console.log('Edit customer:', customer);
  };

  const handleDelete = async (customer) => {
    try {
      await dispatch(deleteUser(customer.id)).unwrap();
      toast.success('Xóa khách hàng thành công!');
    } catch (err) {
      toast.error('Xóa khách hàng thất bại!');
    }
  };

  return (
    <>
      <CustomerTable customers={customers} onEdit={handleEdit} onDelete={handleDelete} />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
