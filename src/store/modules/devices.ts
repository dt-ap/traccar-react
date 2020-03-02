/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NormalizedSchema } from 'normalizr';

import { Device } from 'utils/interfaces';
import { DeviceEntities } from 'utils/types';

type DevicesState = {
  selectedId: number | null;
  items: Record<number, Device>;
  ids: number[];
  isLoading: boolean;
  error: string | null;
};

const { reducer, actions } = createSlice({
  name: 'devices',
  initialState: {
    selectedId: null,
    items: {},
    ids: [],
    isLoading: false,
    error: null,
  } as DevicesState,
  reducers: {
    startFetch(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchSucceeded(
      state,
      action: PayloadAction<NormalizedSchema<DeviceEntities, number[]>>,
    ) {
      state.items = action.payload.entities.items;
      state.ids = action.payload.result;
      state.error = null;
      state.isLoading = false;
    },
    socketUpdate(
      state,
      action: PayloadAction<NormalizedSchema<DeviceEntities, number[]>>,
    ) {
      Object.values(action.payload.entities.items).forEach(el => {
        state.items[el.id] = el;
      });
      state.error = null;
      state.isLoading = false;
    },
    select(state, action: PayloadAction<number>) {
      state.selectedId = action.payload;
    },
    unselect(state) {
      state.selectedId = null;
    },
    failed(state, action: PayloadAction<string | null>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export { actions as devicesActions };
export { reducer as devicesReducers };
