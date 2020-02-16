/* eslint-disable no-param-reassign */
import { User } from 'utils/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const { reducer, actions } = createSlice({
  name: 'users',
  initialState: {} as Partial<User>,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      return action.payload;
    },
    deleteUser(state) {
      return {};
    },
  },
});

export { actions as usersActions };
export { reducer as usersReducers };
