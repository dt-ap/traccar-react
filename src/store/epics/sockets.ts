import { concat, of } from 'rxjs';
import { filter, switchMapTo, concatMap, catchError } from 'rxjs/operators';
import { normalize, schema } from 'normalizr';

import {
  socketsActions,
  devicesActions,
  positionsActions,
} from 'store/modules';
import { SocketData, Device, Position } from 'utils/interfaces';
import { DeviceEntities, PositionEntities } from 'utils/types';
import { AppEpic } from './types';
import { fetchDevices$, deviceListSchema } from './shared';

const positionListSchema = [
  new schema.Entity<Position>('items', {}, { idAttribute: 'deviceId' }),
];

const normDevice = (devices: Device[]) =>
  normalize<Device, DeviceEntities, number[]>(devices, deviceListSchema);

const normPosition = (positions: Position[]) =>
  normalize<Position, PositionEntities, number[]>(
    positions,
    positionListSchema,
  );

export const appInitEpic: AppEpic = (action$, state$, dep) =>
  action$.pipe(
    filter(socketsActions.start.match),
    switchMapTo(
      concat(
        fetchDevices$(action$, state$, dep),
        dep.socket.pipe(
          concatMap((sockData: SocketData) => {
            const { positions, devices } = sockData;
            const actionsList: Array<{ payload: any; type: string }> = state$
              .value.sockets.isConnected
              ? []
              : [socketsActions.connected()];
            if (positions) {
              actionsList.push(
                positionsActions.socketUpdate(normPosition(positions)),
              );
            }
            if (devices) {
              actionsList.push(
                devicesActions.socketUpdate(normDevice(devices)),
              );
            }
            return of(...actionsList);
          }),
          catchError(err => of(socketsActions.failed('Connection error!'))),
        ),
      ),
    ),
  );
