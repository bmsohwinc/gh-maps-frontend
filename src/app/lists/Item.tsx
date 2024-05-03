import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    scrollbarWidth: 'thin',
    '@global': {
        '*': {
          'scrollbar-width': 'thin',
        },
        '*::-webkit-scrollbar': {
          width: '4px',
          height: '4px',
        }
      }
}));
