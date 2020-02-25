import React, { FC } from 'react';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import clsx from 'clsx';

import AppMap from './AppMap';
import CardTitle from './CardTitle';
import DeviceTable from './DeviceTable';
import StateTable from './StateTable';

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

const Dashboard: FC = () => {
  const { paper, mapHeight } = useStyles();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7} lg={8}>
          <Paper className={mapHeight}>
            <AppMap />
          </Paper>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Paper className={clsx(paper, mapHeight)}>
            <CardTitle>Devices</CardTitle>
            <DeviceTable />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={paper}>
            <CardTitle>State</CardTitle>
            <StateTable />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default Dashboard;
