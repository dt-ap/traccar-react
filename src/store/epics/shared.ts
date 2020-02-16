import { of } from 'rxjs';
import { concatMap, catchError } from 'rxjs/operators';
import { normalize, schema } from 'normalizr';

import { socketsActions, devicesActions } from 'store/modules';
import { SocketData, Device } from 'utils/interfaces';
import { AppEpic } from './types';

const deviceListSchema = [new schema.Entity<Device>('devices')];

export const startSocket$: AppEpic = (action$, state$, { socket }) =>
  socket.pipe(
    concatMap((sockData: SocketData) => of(socketsActions.connected())),
    catchError(err => of(socketsActions.failed('Connection error!'))),
  );

export const fetchDevices$: AppEpic = (action$, state$, { ajax }) =>
  ajax({
    url: `${process.env.REACT_APP_ROOT_URL}api/devices`,
    method: 'GET',
  }).pipe(
    concatMap(data =>
      of(
        devicesActions.fetchSucceeded(
          normalize(data.response as Device[], deviceListSchema),
        ),
      ),
    ),
  );
