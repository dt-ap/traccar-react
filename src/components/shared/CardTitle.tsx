import React, { FC } from 'react';
import { Typography } from '@material-ui/core/';

const CardTitle: FC = ({ children }) => {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {children}
    </Typography>
  );
};

export default CardTitle;
