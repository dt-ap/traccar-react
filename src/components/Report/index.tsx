import React, { FC } from 'react';
import { Grid } from '@material-ui/core';

import TripCard from './TripCard';


const Report: FC = () => {

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TripCard />
      </Grid>
    </Grid>
  );
};
export default Report;
