import React, { FC } from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';

import CardTitle from 'components/shared/CardTitle';
import TripTable from './TripTable';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  mapHeight: {
    height: 360,
  },
}));

const Report: FC = () => {
  const { paper } = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper className={paper}>
          <CardTitle>Trips</CardTitle>
          <TripTable />
        </Paper>
      </Grid>
    </Grid>
  );
};
export default Report;
