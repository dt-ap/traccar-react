import { of } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';
import {
  filter,
  switchMapTo,
  concatMap,
  catchError,
  switchMap,
} from 'rxjs/operators';
import { schema, normalize } from 'normalizr';
import { stringify } from 'query-string';

import { API_URL } from 'utils/constants';
import { ReportTrip } from 'utils/interfaces';
import { ReportTripEntities } from 'utils/types';
import { devicesActions, reportActions } from 'store/modules';
import { AppEpic } from './types';
import { fetchDevices$ } from './shared';

export const devicesEpic: AppEpic = (action$, state$, dep) =>
  action$.pipe(
    filter(devicesActions.startFetch.match),
    switchMapTo(fetchDevices$(action$, state$, dep)),
  );

const reportTripListSchema = [
  new schema.Entity<ReportTrip>('items', {}, { idAttribute: (value: ReportTrip, parent, key) => `${value.deviceId}-${value.startTime}` }),
];

export const reportTripsEpic: AppEpic = (action$, _, { ajax }) =>
  action$.pipe(
    filter(reportActions.tripsFetching.match),
    switchMap(action =>
      ajax({
        url: `${API_URL}reports/trips?${stringify(action.payload)}`,
        method: 'GET',
      }).pipe(
        concatMap(data =>
          of(
            reportActions.tripsFetchSucceeded(
              normalize<ReportTrip, ReportTripEntities, number[]>(
                data.response as ReportTrip[],
                reportTripListSchema,
              ),
            ),
          ),
        ),
        catchError((err: AjaxError) => of(reportActions.failed(err.response))),
      ),
    ),
  );
