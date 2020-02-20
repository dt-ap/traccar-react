/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from 'store/modules';
import Login from './Login';

const getAuth = (state: RootState) => state.auths;

export const PrivateRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { isAuth } = useSelector(getAuth);
  // const isAuth = false;

  const renderOnAuth = () => {
    if (isAuth !== null) {
      return isAuth ? children : <Redirect to="/login" />;
    }
    return <h1>Loading....</h1>;
  };

  return (
    <>
      <Route {...rest} render={props => renderOnAuth()} />
      {isAuth !== null ? <Route path="/login" component={Login} /> : null}
    </>
  );
};
