import React, { FC, forwardRef } from 'react';
import {
  Drawer,
  makeStyles,
  List,
  ListItem,
  Button,
  colors,
} from '@material-ui/core';
import clsx from 'clsx';
import { NavLink, NavLinkProps } from 'react-router-dom';

import { AppTheme } from 'theme';
import { SidebarItem } from 'utils/types';

const useStyles = (maxWidth: number) =>
  makeStyles<AppTheme>(theme => ({
    icon: {
      color: theme.palette.icon,
      width: 24,
      height: 24,
    },
    iconOpen: {
      alignItems: 'center',
      marginRight: theme.spacing(1),
    },
    drawer: {
      flexShrink: 0,
      whiteSpace: 'nowrap',
      overflowX: 'hidden',
    },
    drawerOpen: {
      width: maxWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(6) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(8) + 1,
      },
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    paperStyle: {
      whiteSpace: 'nowrap',
      overflowX: 'hidden',
    },
    button: {
      padding: '10px 8px',
      color: colors.blueGrey[800],
      width: '100%',
    },
    buttonOpen: {
      justifyContent: 'flex-start',
      textTransform: 'none',
      letterSpacing: 0,
    },
    active: {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
      '& $icon': {
        color: theme.palette.primary.main,
      },
    },
  }));

type Props = {
  opened?: boolean;
  maxWidth?: number;
  initSelected?: string;
  items?: SidebarItem[];
  onItemClicked?: (key: string) => void;
};

const CustomNavLink = forwardRef<any, NavLinkProps>((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <NavLink ref={ref} {...props} />
));

const SideItem: FC<{
  opened: boolean;
  iconClass: string;
  item: SidebarItem;
}> = ({ opened, iconClass, item }) => {
  const iconSpan: JSX.Element = <span className={iconClass}>{item.icon}</span>;
  if (opened) {
    return (
      <>
        {iconSpan}
        {item.text}
      </>
    );
  }
  return iconSpan;
};

const Sidebar: FC<Props> = ({
  maxWidth = 240,
  opened = true,
  items = [],
  onItemClicked = (key: string) => ({}),
}) => {
  const {
    active,
    button,
    buttonOpen,
    icon,
    iconOpen,
    drawer,
    paperStyle,
    drawerOpen,
    drawerClose,
    drawerHeader,
  } = useStyles(maxWidth)();

  function onClicked(key: string) {
    onItemClicked(key);
  }

  return (
    <Drawer
      variant="permanent"
      open={opened}
      className={clsx(drawer, {
        [drawerOpen]: opened,
        [drawerClose]: !opened,
      })}
      classes={{
        paper: clsx(paperStyle, {
          [drawerOpen]: opened,
          [drawerClose]: !opened,
        }),
      }}
    >
      <div className={drawerHeader} />
      <List>
        {items.map((item: SidebarItem) => (
          <ListItem
            disableGutters
            key={item.key}
            onClick={() => onClicked(item.key)}
          >
            <Button
              activeClassName={active}
              className={clsx(button, {
                [buttonOpen]: opened,
              })}
              component={CustomNavLink}
              to={item.path}
            >
              <SideItem
                opened={opened}
                item={item}
                iconClass={clsx(icon, { [iconOpen]: opened })}
              />
            </Button>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
