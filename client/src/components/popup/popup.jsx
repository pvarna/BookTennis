import { Dialog, DialogContent, DialogTitle } from '@mui/material';

export const Popup = ({ title, content, open }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
};
