import { of, zip, iif } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';
import {
  filter,
  switchMap,
  catchError,
  switchMapTo,
  concatMap,
  delay,
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

export const checkAuthEpic: AppEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    filter(authsActions.checkAuth.match),
    switchMapTo(
      ajax({
        url: `${process.env.REACT_APP_ROOT_URL}api/server`,
        method: 'GET',
      }).pipe(
        concatMap(data =>
          zip(
            of(true),
            of(
              authsActions.loginSuccess(),
              serversActions.set(data.response as Server),
            ),
          ),
        ),
        catchError(_ => zip(of(false), of(authsActions.loginFail(null)))),
        concatMap(([success, serverData]) =>
          iif(
            () => success,
            ajax({
              url: `${process.env.REACT_APP_ROOT_URL}api/session`,
              method: 'GET',
            }).pipe(
              concatMap(sessData =>
                of(usersActions.setUser(sessData.response as User), serverData),
              ),
              catchError((err: AjaxError) =>
                err.status === 401
                  ? of(authsActions.loginFail('Invalid email or password'))
                  : of(authsActions.loginFail(err.response)),
              ),
            ),
            of(serverData),
          ),
        ),
      ),
    ),
  );

export const logoutEpic: AppEpic = (action$, _, { ajax }) =>
  action$.pipe(
    filter(authsActions.logout.match),
    switchMapTo(
      ajax({
        url: `${process.env.REACT_APP_ROOT_URL}api/session`,
        method: 'DELETE',
      }).pipe(
        concatMap(data => of(authsActions.logoutSuccess()))
      ),
    ),
  );
