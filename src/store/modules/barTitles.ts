/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TitleState = {
  title: string;
};

const { reducer, actions } = createSlice({
  name: 'barTitles',
  initialState: {
    title: 'Title'
  } as TitleState,
  reducers: {
    setBarTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
  },
});

export { actions as barTitlesActions };
export { reducer as barTitlesReducers };
