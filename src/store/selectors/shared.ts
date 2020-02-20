import { RootState } from "store/modules";

export const getDevices = (state: RootState) => state.devices.devices;
