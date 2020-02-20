/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  isAuth: boolean | null;
  isLoading: boolean | null;
  error: string | null;
};

const { reducer, actions } = createSlice({
  name: 'auths',
  initialState: {
    isAuth: null,
    isLoading: false,
    error: null,
  } as AuthState,
  reducers: {
    login(state, action: PayloadAction<{ email: string; password: string }>) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state) {
      state.isLoading = false;
      state.error = null;
      state.isAuth = true;
    },
    loginFail(state, action: PayloadAction<string | null>) {
      state.isLoading = false;
      state.isAuth = false;
      state.error = action.payload || 'Login Error';
    },
    logout(state) {
      state.error = null;
      state.isLoading = true;
    },
    logoutSuccess(state) {
      state.isAuth = false;
    },
    checkAuth(state) {
      state.isLoading = true;
      state.error = null;
    }
  },
});

export { actions as authsActions };
export { reducer as authsReducers };
