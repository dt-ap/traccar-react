/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ReportTrip, TripDialogFormData } from 'utils/interfaces';
import { NormalizedSchema } from 'normalizr';
import { ReportTripEntities } from 'utils/types';

type TripsState = {
  items: Record<number, ReportTrip>;
  deviceIds: number[];
};

type ReportState = {
  isLoading: boolean;
  error: string | null;
  trips: TripsState;
};

const tripInitialState: TripsState = {
  items: {},
  deviceIds: [],
};

const tripsReducers = {
  tripsFetching(state: ReportState, action: PayloadAction<TripDialogFormData>) {
    state.isLoading = true;
    state.error = null;
  },
  tripsFetchSucceeded(
    state: ReportState,
    action: PayloadAction<NormalizedSchema<ReportTripEntities, number[]>>,
  ) {
    state.trips.items = action.payload.entities.items || {};
    state.trips.deviceIds = action.payload.result || [];
    state.isLoading = false;
    state.error = null;
  },
};

const { reducer, actions } = createSlice({
  name: 'reports',
  initialState: {
    isLoading: false,
    error: null,
    trips: tripInitialState,
  } as ReportState,
  reducers: {
    failed(state, action: PayloadAction<string | null>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    clear(state) {
      state.trips = tripInitialState;
    },
    ...tripsReducers,
  },
});

export { actions as reportActions };
export { reducer as reportReducers };
