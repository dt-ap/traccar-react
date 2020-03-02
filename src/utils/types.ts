import { Device, Position, ReportTrip } from './interfaces';

export type SidebarItem = {
  key: string;
  text: string;
  path: string;
  icon: JSX.Element;
};

type ListEntities<K extends string | number | symbol, T> = {
  items: Record<K, T>;
}

export type DeviceEntities = ListEntities<number, Device>;

export type PositionEntities = ListEntities<number, Position>;

export type ReportTripEntities = ListEntities<number, ReportTrip>;