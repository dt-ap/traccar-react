import { RootState } from 'store/modules';

export const getDevices = (state: RootState) => state.devices.items;

export const getSelectedDeviceId = (state: RootState) => state.devices.selectedId;
