import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store/modules';
import { getDevices } from './shared';

const getSelected = (state: RootState) => state.devices.selectedId;

const devices = createSelector(getDevices, obj => Object.values(obj));


// const getCars = (state: RootState) => state.cars.cars;
// const getSelected = (state: RootState) => state.cars.selectedId;

// const selected = createSelector([getCars, getSelected], (cars, id) => {
//   if (id && id in cars) {
//     return cars[id];
//   }
//   return null;
// });

// const cars = createSelector(getCars, objs => Object.values(objs));

// export default { selected, cars };
export default { devices };
