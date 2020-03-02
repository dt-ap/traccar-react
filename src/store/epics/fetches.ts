import { of } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';
import { filter, switchMapTo, concatMap, catchError } from 'rxjs/operators';
import { schema, normalize } from 'normalizr';

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

const reportTripListSchema = [new schema.Entity<ReportTrip>('items')];

export const reportTripsEpic: AppEpic = (action$, _, { ajax }) =>
  action$.pipe(
    filter(reportActions.tripsFetching.match),
    switchMapTo(
      ajax({
        url: `${API_URL}reports/trips`,
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
        catchError((err: AjaxError) => of(reportActions.failed(err.response)))
      ),
    ),
  );
