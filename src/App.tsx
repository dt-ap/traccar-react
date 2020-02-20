import React, { FC, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import { Login } from 'components';
import { MainLayout } from 'layouts';
import { useDispatch, useSelector } from 'react-redux';
import { authsActions, RootState } from 'store/modules';
import { PrivateRoute } from 'components/PrivateRoute';

const getAuth = (state: RootState) => state.auths;

// const App: FC = () => {
//   const { isLoading, isAuth } = useSelector(getAuth);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(authsActions.checkAuth());
//   }, [dispatch]);

//   if (isLoading) {
//     return <h1>...LOADING</h1>;
//   }
//   return (
//     <Switch>
//       <Route exact path={['/dashboard', '/']} component={MainLayout} />
//       <Route exact path="/login" component={Login} />
//       <Route path="*" component={ErrorMain} />
//     </Switch>
//   );
// };

const App: FC = () => {
  // const history = useHistory();
  // const { isAuth } = useSelector(getAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authsActions.checkAuth());
  }, [dispatch]);

  return (
    <Switch>
      <PrivateRoute path="*">
        <MainLayout />
      </PrivateRoute>
    </Switch>
  );
};

export default App;
