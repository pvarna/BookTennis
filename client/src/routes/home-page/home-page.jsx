import { Button } from '@mui/material';
import { userService } from '../../services/user-service';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();
  // TODO: visualise courts
  return (
    <>
      <h1>This is the homepage</h1>
      <Button
        onClick={() => {
          userService.logout();
          navigate('/login');
        }}
      >
        Log out
      </Button>
    </>
  );
};
