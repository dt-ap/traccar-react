/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Position } from 'utils/interfaces';
import { NormalizedSchema } from 'normalizr';
import { PositionEntities } from 'utils/types';

type PositionsState = {
  positions: Record<number, Position>;
  deviceIds: number[];
  isLoading: boolean;
  error: string | null;
};

const { reducer, actions } = createSlice({
  name: 'positions',
  initialState: {
    positions: {},
    deviceIds: [],
    isLoading: false,
    error: null,
  } as PositionsState,
  reducers: {
    socketUpdate(
      state,
      action: PayloadAction<NormalizedSchema<PositionEntities, number[]>>,
    ) {
      Object.values(action.payload.entities.positions).forEach(el => {
        state.positions[el.deviceId] = el;
      });
      state.error = null;
      state.isLoading = false;
    },
  },
});

export { actions as positionsActions };
export { reducer as positionsReducers };
