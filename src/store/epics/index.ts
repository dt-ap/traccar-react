import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { RootState } from 'store/modules';
import { Depedencies, depedencies } from './depedencies';
import { loginEpic, checkAuthEpic, logoutEpic } from './auths';
import { appInitEpic } from './sockets';
import { devicesEpic, reportTripsEpic } from './fetches';

const rootEpic = combineEpics(
  loginEpic,
  logoutEpic,
  checkAuthEpic,
  appInitEpic,
  devicesEpic,
  reportTripsEpic,
);

const epicMiddleware = createEpicMiddleware<any, any, RootState, Depedencies>({
  dependencies: depedencies,
});

export { rootEpic, epicMiddleware };
