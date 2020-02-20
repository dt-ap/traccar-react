import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store/modules';
import { getDevices } from './shared';

const getPositions = (state: RootState) => state.positions.positions;

export const positions = createSelector(
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
