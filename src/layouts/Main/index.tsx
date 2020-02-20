import React, { FC, useEffect, useState, Dispatch } from 'react';
import { makeStyles, CssBaseline, Box, Divider } from '@material-ui/core';
import {
  Dashboard as DashboardIcon,
  DriveEta,
  Person,
  LibraryBooks,
} from '@material-ui/icons';
import { AnyAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

import { AppDispatch } from 'store';
import {
  RootState,
  barTitlesActions,
  socketsActions,
} from 'store/modules';
import { SidebarItem } from 'utils/types';
import { Dashboard, Driver, Vehicle, Report } from 'components';

import Footer from './Footer';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const drawerWidth = 160;
const items: SidebarItem[] = [
  {
    key: 'dashboard',
    text: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    key: 'vehicles',
    text: 'Vehicles',
    path: '/vehicles',
    icon: <DriveEta />,
  },
  {
    key: 'drivers',
    text: 'Drivers',
    path: '/drivers',
    icon: <Person />,
  },
  {
    key: 'reports',
    text: 'Reports',
    path: '/reports',
    icon: <LibraryBooks />,
  },
];

const useStyles = makeStyles(theme => ({
  hide: {
    display: 'none',
  },
  roots: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100%',
  },
  footer: {
    alignContent: 'flex-end',
  },
}));

const MainRoutes: FC = () => (
  <Switch>
    <Redirect exact path="/" to="/dashboard" />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/reports" component={Report} />
    <Route exact path="/vehicles" component={Vehicle} />
    <Route exact path="/drivers" component={Driver} />
  </Switch>
);

const getTitle = (state: RootState) => state.barTitles.title;

const useBarTitle = (dispatch: Dispatch<AnyAction>) => {
  const location = useLocation();
  const title = useSelector(getTitle);

  useEffect(() => {
    const item = items.find(el => el.path === location.pathname);
    if (item) {
      dispatch(barTitlesActions.setBarTitle(item.text));
    }
  }, [location, dispatch]);

  return title;
};

const useFetchData = (dispatch: Dispatch<AnyAction>) => {
  useEffect(() => {
    dispatch(socketsActions.start());
  }, [dispatch]);
};

const MainLayout: FC = () => {
  const { main, roots, footer } = useStyles();
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  useFetchData(dispatch);
  const barTitle = useBarTitle(dispatch);

  return (
    <div className={roots}>
      <CssBaseline />
      <Sidebar maxWidth={drawerWidth} opened={open} items={items} />
      <div className={main}>
        <Topbar
          title={barTitle}
          maxDrawerWidth={drawerWidth}
          drawerOpened={open}
          onDrawerOpen={() => setOpen(true)}
          onDrawerClose={() => setOpen(false)}
        />

        <Box p={3} style={{ flexGrow: 1 }}>
          <MainRoutes />
        </Box>
        <Divider />
        <Box py={2} px={3}>
          <Footer className={footer} />
        </Box>
      </div>
    </div>
  );
};

export default MainLayout;
