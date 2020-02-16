/* eslint-disable no-param-reassign */
import { Server } from 'utils/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'servers',
  initialState: {} as Partial<Server>,
  reducers: {
    set(state, action: PayloadAction<Server>) {
      return action.payload;
    },
    delete(state) {
      return {};
    },
  },
});

export { actions as serversActions };
export { reducer as serversReducers };
