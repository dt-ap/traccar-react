import { of } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';
import {
  filter,
  switchMap,
  catchError,
  switchMapTo,
  concatMap,
} from 'rxjs/operators';

import { authsActions, usersActions, serversActions } from 'store/modules';
import { User, Server } from 'utils/interfaces';
import { AppEpic } from './types';

export const loginEpic: AppEpic = (action$, _, { ajax }) =>
  action$.pipe(
    filter(authsActions.login.match),
    switchMap(action =>
      ajax({
        url: `${process.env.REACT_APP_ROOT_URL}api/session`,
        method: 'POST',
        body: action.payload,
      }).pipe(
        concatMap(data =>
          of(
            authsActions.loginSuccess(),
            usersActions.setUser(data.response as User),
          ),
        ),
        catchError((err: AjaxError) =>
          err.status === 401
            ? of(authsActions.loginFail('Invalid email or password'))
            : of(authsActions.loginFail(err.response)),
        ),
      ),
    ),
  );

export const checkAuthEpic: AppEpic = (action$, _, { ajax }) =>
  action$.pipe(
    filter(authsActions.checkAuth.match),
    switchMapTo(
      ajax({
        url: `${process.env.REACT_APP_ROOT_URL}api/server`,
        method: 'GET',
      }),
    ),
    concatMap(data =>
      of(
        authsActions.loginSuccess(),
        serversActions.set(data.response as Server),
      ),
    ),
    catchError(_ => of(authsActions.loginFail(null))),
  );
