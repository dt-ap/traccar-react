/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, useEffect } from 'react';
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Login } from 'components';
import { MainLayout } from 'layouts';
import { authsActions, RootState } from 'store/modules';

const getAuth = (state: RootState) => state.auths;

export const AppRoutes: FC<RouteProps> = (props) => {
  const { isAuth } = useSelector(getAuth);

  const renderOnAuth = () => {
    if (isAuth !== null) {
      return isAuth ? <MainLayout /> : <Redirect to="/login" />;
    }
    return <h1>Loading....</h1>;
  };

  return (
    <>
      <Route {...props} render={() => renderOnAuth()} />
      {isAuth !== null ? <Route path="/login" component={Login} /> : null}
    </>
  );
};

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authsActions.checkAuth());
  }, [dispatch]);

  return (
    <Switch>
      <AppRoutes path="*" />
    </Switch>
  );
};

export default App;
