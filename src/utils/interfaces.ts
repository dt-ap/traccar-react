export interface User {
  id: number;
  name: string;
  login: string;
  email: string;
  phone: string;
  readonly: boolean;
  administrator: boolean;
  map: string;
  latitude: number;
  longitude: number;
  zoom: number;
  twelveHourFormat: boolean;
  coordinateFormat: string;
  disabled: boolean;
  deviceLimit: number;
  userLimit: number;
  deviceReadonly: boolean;
  limitCommands: boolean;
  poiLayer: string;
  attributes: {
    notificationTokens: string;
  } | null;
  expirationTime: string | null;
  token: string | null;
  password: string | null;
}

export interface Device {
  id: number;
  name: string;
  uniqueID: string;
  lastUpdate: string;
  groupId: number;
  disabled: boolean;
  positionId: number;
  geofenceIds: any;
  attributes: any;
  phone: string | null;
  model: string | null;
  contact: string | null;
  category: string | null;
  status: 'online' | 'offline' | 'unknown' | null;
}

export interface Position {
  id: number;
  protocol: string;
  deviceId: number;
  serverTime: string;
  deviceTime: string;
  fixTime: string;
  valid: boolean;
  accuracy: number;
  latitude: number;
  longitude: number;
  altitude: number;
  speed: number;
  course: number;
  address: string;
  attributes: GpsPosAtrribute | AndPosAttribute;
}

export interface GpsPosAtrribute {
  sat: number;
  odometer: number;
  tripOdometer: number;
  fuelConsumption: number;
  currentFuelConsumption: number;
  status: number;
  distance: number;
  totalDistance: number;
  motion: boolean;
  ignition: boolean;
  hours: number;
  fuel: number;
  deviceId: number;
  protocol: string;
  serverTime: string;
  deviceTime: string;
  fixTime: string;
  outdated: boolean;
  valid: boolean;
  latitude: number;
  longitude: number;
  altitude: number;
  speed: number;
  course: number;
  accuracy: number;
  address: string | null;
  type: string | null;
  network: string | null;
}

/** Android Position Attribute */
export interface AndPosAttribute {
  batteryLevel: number;
  distance: number;
  totalDistance: number;
  motion: number;
}

export interface Server {
  id: number;
  registration: boolean;
  readonly: boolean;
  deviceReadonly: boolean;
  limitCommands: boolean;
  map: string;
  bingKey: string;
  mapUrl: string;
  latitude: number;
  longitude: number;
  zoom: number;
  twelveHourFormat: boolean;
  forceSettings: boolean;
  coordinateFormat: string;
  poiLayer: string;
  attributes: any;
}

export interface SocketData {
  positions?: Position[];
  devices?: Device[];
}