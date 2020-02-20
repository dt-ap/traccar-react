import { Device, Position } from './interfaces';

export type SidebarItem = {
  key: string;
  text: string;
  path: string;
  icon: JSX.Element;
};

export type DeviceEntities = {
  devices: Record<number, Device>;
};

export type PositionEntities = {
  positions: Record<number, Position>;
}