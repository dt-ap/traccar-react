import { of } from 'rxjs';
import { concatMap, catchError } from 'rxjs/operators';
import { normalize, schema } from 'normalizr';

import { devicesActions } from 'store/modules';
import { API_URL } from 'utils/constants';
import { Device } from 'utils/interfaces';
import { DeviceEntities } from 'utils/types';
import { AppEpic } from './types';


export const deviceListSchema = [new schema.Entity<Device>('items')];

export const fetchDevices$: AppEpic = (action$, state$, { ajax }) =>
  ajax({
    url: `${API_URL}devices`,
    method: 'GET',
  }).pipe(
    concatMap(data =>
      of(
        devicesActions.fetchSucceeded(
          normalize<Device, DeviceEntities, number[]>(data.response as Device[], deviceListSchema),
        ),
      ),
    ),
  );
