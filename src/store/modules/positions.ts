/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Position } from 'utils/interfaces';
import { NormalizedSchema } from 'normalizr';
import { PositionEntities } from 'utils/types';

type PositionsState = {
  items: Record<number, Position>;
  deviceIds: number[];
  isLoading: boolean;
  error: string | null;
};

const { reducer, actions } = createSlice({
  name: 'positions',
  initialState: {
    items: {},
    deviceIds: [],
    isLoading: false,
    error: null,
  } as PositionsState,
  reducers: {
    socketUpdate(
      state,
      action: PayloadAction<NormalizedSchema<PositionEntities, number[]>>,
    ) {
      Object.values(action.payload.entities.items).forEach(el => {
        state.items[el.deviceId] = el;
      });
      state.error = null;
      state.isLoading = false;
    },
  },
});

export { actions as positionsActions };
export { reducer as positionsReducers };
