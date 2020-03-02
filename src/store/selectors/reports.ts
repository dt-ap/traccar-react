import { RootState } from 'store/modules';
import { createSelector } from '@reduxjs/toolkit';

const getReportTrips = (state: RootState) => state.report.trips.items;

export const selReportTrips = createSelector(getReportTrips, trips =>
  Object.values(trips),
);
