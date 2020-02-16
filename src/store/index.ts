import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { rootReducer, RootState } from './modules';
import { rootEpic, epicMiddleware } from './epics';

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware<RootState, { thunk: false }>(),
    epicMiddleware,
  ],
});

epicMiddleware.run(rootEpic);

export type AppDispatch = typeof store.dispatch;
export default store;
