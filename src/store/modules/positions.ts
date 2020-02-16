/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Position, SocketData } from 'utils/interfaces';

type PositionsState = {
  items: Position[];
};

const { reducer, actions } = createSlice({
  name: 'positions',
  initialState: {
    items: [] as Position[],
  } as PositionsState,
  reducers: {
    fromSocket(state, action: PayloadAction<SocketData>) {
      const { positions } = action.payload;
      if (positions) {
        state.items = positions;
      }
    },
  },
});

export { actions as positionsActions };
export { reducer as positionsReducers };
