/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SocketState = {
  isStarting: boolean | null;
  isConnected: boolean;
  error: string | null;
};

const { reducer, actions } = createSlice({
  name: 'sockets',
  initialState: {
    isStarting: null,
    isConnected: false,
    error: null,
  } as SocketState,
  reducers: {
    start(state) {
      state.isStarting = true;
      state.isConnected = false;
      state.error = null;
    },
    failed(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.isConnected = false;
    },
    connected(state) {
      state.isConnected = true;
      state.isStarting = false;
      state.error = null;
    }
  },
});

export { actions as socketsActions };
export { reducer as socketsReducers };
