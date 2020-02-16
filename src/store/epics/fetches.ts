import { of } from 'rxjs';
import { filter, switchMapTo, concatMap, delay } from 'rxjs/operators';
import { schema, normalize } from 'normalizr';

import { devicesActions } from 'store/modules';
import { AppEpic } from './types';
import { fetchDevices$ } from './shared';

export const devicesEpic: AppEpic = (action$, state$, dep) =>
  action$.pipe(
    filter(devicesActions.startFetch.match),
    switchMapTo(fetchDevices$(action$, state$, dep)),
  );
