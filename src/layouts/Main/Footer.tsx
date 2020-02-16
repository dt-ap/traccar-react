import React, { FC, HTMLAttributes } from 'react';
import { Typography } from '@material-ui/core';

const Footer: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => {
  const year = new Date().getFullYear();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div {...rest} className={className}>
      <Typography>Traccar, {year}</Typography>
    </div>
  );
};

export default Footer;
