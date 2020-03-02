import { combineReducers } from '@reduxjs/toolkit';

import { authsReducers as auths } from './auths';
import { usersReducers as users } from './users';
import { socketsReducers as sockets } from './sockets';
import { devicesReducers as devices } from './devices';
import { positionsReducers as positions } from './positions';
import { reportReducers as report } from './reports';
import { serversReducers as servers } from './servers';
import { barTitlesReducers as barTitles } from './barTitles';

export const rootReducer = combineReducers({
  auths,
  users,
  sockets,
  devices,
  positions,
  report,
  servers,
  barTitles,
});

export type RootState = ReturnType<typeof rootReducer>;

export { authsActions } from './auths';
export { devicesActions } from './devices';
export { positionsActions } from './positions';
export { usersActions } from './users';
export { socketsActions } from './sockets';
export { reportActions } from './reports';
export { serversActions } from './servers';
export { barTitlesActions } from './barTitles';
