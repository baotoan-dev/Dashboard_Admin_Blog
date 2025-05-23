import { Button, Typography } from '@mui/material';
import BaseModal from './BaseModal';

export default function ConfirmDeleteModal({ open, onClose, onConfirm, message }) {
  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="Xác nhận xoá"
      actions={
        <>
          <Button onClick={onClose} variant="outlined">
            Huỷ
          </Button>
          <Button onClick={onConfirm} variant="contained" color="error">
            Xoá
          </Button>
        </>
      }
    >
      <Typography>{message || 'Bạn có chắc chắn muốn xoá mục này?'}</Typography>
    </BaseModal>
  );
}
