import React, { FC, useEffect } from 'react';
import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';
import { ChevronLeft, Menu } from '@material-ui/icons';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { authsActions, RootState } from 'store/modules';
import { useHistory } from 'react-router-dom';

const useStyles = (drawerMaxWidth: number) =>
  makeStyles(theme => ({
    appBar: {
      transition: theme.transitions.create(['margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      transition: theme.transitions.create(['margin'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    logoutStyle: {
      textTransform: 'none'
    },
    titleStyle: {
      flexGrow: 1
    }
  }));

type Props = {
  title: string;
  drawerOpened?: boolean;
  maxDrawerWidth?: number;
  onDrawerOpen?: () => void;
  onDrawerClose?: () => void;
};

const getAuth = (state: RootState) => state.auths;

const Topbar: FC<Props> = ({
  title,
  maxDrawerWidth = 240,
  drawerOpened = true,
  onDrawerOpen = () => ({}),
  onDrawerClose = () => ({}),
}) => {
  const { appBar, appBarShift, menuButton, hide, titleStyle, logoutStyle } = useStyles(maxDrawerWidth)();
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuth } = useSelector(getAuth);

  useEffect(() => {
    if (isAuth !== null && isAuth) {
      history.push('/login');
    }
  }, [isAuth, history]);

  function onOpen() {
    onDrawerOpen();
  }

  function onClose() {
    onDrawerClose();
  }

  function handleLogout() {
    dispatch(authsActions.logout());
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <div
          className={clsx(appBar, {
            [appBarShift]: drawerOpened,
          })}
        />
        <IconButton
          color="inherit"
          aria-label="Open Drawer"
          edge="start"
          onClick={onOpen}
          className={clsx(menuButton, drawerOpened && hide)}
        >
          <Menu />
        </IconButton>

        <IconButton
          color="inherit"
          aria-label="Close Drawer"
          edge="start"
          onClick={onClose}
          className={clsx(menuButton, !drawerOpened && hide)}
        >
          <ChevronLeft />
        </IconButton>
        <Typography variant="h6" noWrap className={titleStyle}>
          {title}
        </Typography>
        <Button color="inherit" className={logoutStyle} onClick={handleLogout}>
          <Typography variant="h5" noWrap>
            Logout
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
