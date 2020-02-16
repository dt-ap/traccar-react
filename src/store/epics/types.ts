import { Epic } from 'redux-observable';

import { RootState } from 'store/modules';
import { Depedencies } from './depedencies';

export type AppEpic = Epic<any, any, RootState, Depedencies>;
