import { of, zip, iif } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';
import {
  filter,
  switchMap,
  catchError,
  switchMapTo,
  concatMap,
} from 'rxjs/operators';

import { authsActions, usersActions, serversActions } from 'store/modules';
import { API_URL } from 'utils/constants';
import { User, Server } from 'utils/interfaces';
import { AppEpic } from './types';

export const loginEpic: AppEpic = (action$, _, { ajax }) =>
  action$.pipe(
    filter(authsActions.login.match),
    switchMap(action =>
      ajax({
        url: `${API_URL}session`,
        method: 'POST',
        body: action.payload,
      }).pipe(
        concatMap(data =>
          of(
            authsActions.loginSucceeded(),
            usersActions.setUser(data.response as User),
          ),
        ),
        catchError((err: AjaxError) =>
          err.status === 401
            ? of(authsActions.loginFailed('Invalid email or password'))
            : of(authsActions.loginFailed(err.response)),
        ),
      ),
    ),
  );

export const checkAuthEpic: AppEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    filter(authsActions.checkAuth.match),
    switchMapTo(
      ajax({
        url: `${API_URL}server`,
        method: 'GET',
      }).pipe(
        concatMap(data =>
          zip(
            of(true),
            of(
              authsActions.loginSucceeded(),
              serversActions.set(data.response as Server),
            ),
          ),
        ),
        catchError(_ => zip(of(false), of(authsActions.loginFailed(null)))),
        concatMap(([success, serverData]) =>
          iif(
            () => success,
            ajax({
              url: `${API_URL}session`,
              method: 'GET',
            }).pipe(
              concatMap(sessData =>
                of(usersActions.setUser(sessData.response as User), serverData),
              ),
              catchError((err: AjaxError) =>
                err.status === 401
                  ? of(authsActions.loginFailed('Invalid email or password'))
                  : of(authsActions.loginFailed(err.response)),
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
        url: `${API_URL}session`,
        method: 'DELETE',
      }).pipe(concatMap(data => of(authsActions.logoutSuccess()))),
    ),
  );
