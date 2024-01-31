import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

export const Modal = ({
  isOpen,
  title,
  content,
  onAccept,
  onCancel,
  disableAccept = false,
  acceptText = 'yes',
  cancelText = 'no',
}) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={() => onAccept()} disabled={disableAccept} >{acceptText}</Button>
        <Button onClick={() => onCancel()}>{cancelText}</Button>
      </DialogActions>
    </Dialog>
  );
};
