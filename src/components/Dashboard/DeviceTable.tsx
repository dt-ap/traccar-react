import React, { FC } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import TimeAgo from 'timeago-react';

import { devices as devicesSelector, selectedDevice } from 'store/selectors/devices';
import { devicesActions } from 'store/modules';

const DeviceTable: FC = () => {
  const devices = useSelector(devicesSelector);
  const dispatch = useDispatch();
  const selected = useSelector(selectedDevice);

  function handleRowSelected(id: number) {
    dispatch(devicesActions.select(id));
  }

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Last Update</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {devices.map(row => (
          <TableRow
            key={row.id}
            hover
            selected={selected?.id === row.id}
            onClick={() => handleRowSelected(row.id)}
          >
            <TableCell>{row.name}</TableCell>
            <TableCell>
              <TimeAgo datetime={row.lastUpdate} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DeviceTable;
