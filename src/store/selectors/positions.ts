import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store/modules';
import { getDevices, getSelectedDeviceId } from './shared';

const getPositions = (state: RootState) => state.positions.items;

export const selSelectedPosition = createSelector([getPositions, getSelectedDeviceId], (poss,id) => {
  if (id !== null && id in poss) {
    return poss[id];
  }
  return null;
});

export const selMarkerPositions = createSelector(
  [getDevices, getPositions],
  (devices, pos) =>
    Object.values(devices).map(el => ({
      id: el.id,
      name: el.name,
      lat: pos[el.id]?.latitude,
      long: pos[el.id]?.longitude,
      course: pos[el.id]?.course,
    })),
);
