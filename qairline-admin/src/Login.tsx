import { Login as RaLogin } from 'react-admin';
import { styled } from '@mui/material/styles';

const StyledLogin = styled(RaLogin)({
  '& .MuiTextField-root': {
    marginBottom: '1rem',
    width: '100%',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#357a38',
    },
    '&:hover fieldset': {
      borderColor: '#357a38',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#357a38',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#357a38',
  },
});

export const Login = () => <StyledLogin />;