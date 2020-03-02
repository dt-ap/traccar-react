import { createSelector } from '@reduxjs/toolkit';

import { getDevices, getSelectedDeviceId } from './shared';

export const selDevices = createSelector(getDevices, obj => Object.values(obj));

export const selSelectedDevice = createSelector(
  [getDevices, getSelectedDeviceId],
  (devs, id) => {
    if (id !== null && id in devs) {
      return devs[id];
    }
    return null;
  },
);
