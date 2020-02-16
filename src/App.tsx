import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Login } from 'components';
import { MainLayout } from 'layouts';

// const getAuth = (state: RootState) => state.auth;

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
const App: FC = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="*" component={MainLayout} />
  </Switch>
);

export default App;
