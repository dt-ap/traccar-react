import React, { FC } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
} from '@material-ui/core';
import { useSelector } from 'react-redux';

import { selectedPosition } from 'store/selectors/positions';
import { GpsPosAtrribute, AndPosAttribute } from 'utils/interfaces';

const tableHeader: Record<string, string> = {
  fixTime: 'Time',
  latitude: 'Latitude',
  longitude: 'Longitude',
  valid: 'Valid',
  accuracy: 'Accuracy',
  altitude: 'Altitude',
  speed: 'Speed',
  course: 'Course',
  address: 'Address',
  protocol: 'Protocol',
};

const tableGpsHeader: Record<string, string> = {
  sat: 'Satellite',
  odometer: 'Odometer',
  tripOdoMeter: 'Trip Odometer',
  fuelConsumption: 'Fuel Consumption',
  currentFuelConsumption: 'Current Fuel Consumption',
  status: 'Status',
  distance: 'Distance',
  totalDistance: 'Total Distance',
  motion: 'Motion',
  ignition: 'Ignition',
  hours: 'Hours',
};

const tableAndrHeader: Record<string, string> = {
  batteryLevel: 'Battery Level',
  distance: 'Distance',
  totalDistance: 'Total Distance',
  motion: 'Motion',
};

function isGpsAttr(
  attrs: GpsPosAtrribute | AndPosAttribute,
): attrs is GpsPosAtrribute {
  return (attrs as GpsPosAtrribute).sat !== undefined;
}

const useStateTable = () => {
  const pos = useSelector(selectedPosition);

  if (pos !== null) {
    let attrTables: [string, string][];
    const attrs = pos.attributes;
    if (attrs === null || attrs === undefined) {
      attrTables = [];
    } else if (isGpsAttr(attrs)) {
      attrTables = Object.entries(attrs).flatMap(([key, value]) =>
        key in tableGpsHeader ? [[tableGpsHeader[key], value]] : [],
      );
    } else {
      attrTables = Object.entries(attrs).flatMap(([key, value]) =>
        key in tableAndrHeader ? [[tableAndrHeader[key], value]] : [],
      );
    }

    const posTables = Object.entries(pos).flatMap(([key, value]) =>
      key in tableHeader ? [[tableHeader[key], value]] : [],
    );
    return posTables.concat(attrTables);
  }
  return [];
};

const StateTable: FC = () => {
  const states = useStateTable();

  return states.length ? (
    // TODO: Learn how this div, trigger parent overflow.
    <div style={{ maxWidth: 0 }}>
      <Table>
        <TableHead>
          <TableRow style={{ maxWidth: '100%', overflowX: 'scroll' }}>
            {states.map(s => (
              <TableCell key={s[0]}>{s[0]}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow style={{ maxWidth: '100%', overflowX: 'scroll' }}>
            {states.map(s => (
              <TableCell key={s[0]}>{String(s[1])}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ) : (
    <h1>Empty...</h1>
  );
};

export default StateTable;
