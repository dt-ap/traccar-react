import { createSelector } from '@reduxjs/toolkit';

import { getDevices, getSelectedId } from './shared';

export const devices = createSelector(getDevices, obj => Object.values(obj));

export const selectedDevice = createSelector(
  [getDevices, getSelectedId],
  (devs, id) => {
    if (id !== null && id in devs) {
      return devs[id];
    }
    return null;
  },
);
