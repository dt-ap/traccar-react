import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { RootState } from 'store/modules';
import { Depedencies, depedencies } from './depedencies';
import { loginEpic, checkAuthEpic } from './auths';
import { socketEpic, initEpic } from './sockets';
import { devicesEpic } from './fetches';

const rootEpic = combineEpics(
  loginEpic,
  checkAuthEpic,
  socketEpic,
  initEpic,
  devicesEpic,
);
const epicMiddleware = createEpicMiddleware<any, any, RootState, Depedencies>({
  dependencies: depedencies,
});

export { rootEpic, epicMiddleware };
