import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Loader =()=> {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress
        sx={{ color: 'text.secondary'}}
        size={25}
      />
    </Box>
  );
}