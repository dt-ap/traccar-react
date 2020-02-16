import { concat } from 'rxjs';
import {
  filter,
  switchMapTo,
} from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { socketsActions } from 'store/modules';
import { AppEpic } from './types';
import { startSocket$, fetchDevices$ } from './shared';

export const socketEpic: AppEpic = (action$, state$, dep) =>
  action$.pipe(
    filter(socketsActions.start.match),
    switchMapTo(startSocket$(action$, state$, dep)),
  );

export const initEpic: AppEpic = (action$, state$, dep) =>
  action$.pipe(
    ofType('INIT_MAIN'),
    switchMapTo(
      concat(
        fetchDevices$(action$, state$, dep),
        startSocket$(action$, state$, dep),
      ),
    ),
  );
