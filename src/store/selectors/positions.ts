import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store/modules';
import { getDevices, getSelectedId } from './shared';

const getPositions = (state: RootState) => state.positions.positions;

export const selectedPosition = createSelector([getPositions, getSelectedId], (poss,id) => {
  if (id !== null && id in poss) {
    return poss[id];
  }
  return null;
});

export const markerPositions = createSelector(
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
