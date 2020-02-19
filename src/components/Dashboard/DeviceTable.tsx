import React, { FC } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import TimeAgo from 'timeago-react';

import { carsSelectors } from 'store/selectors';

const DeviceTable: FC = () => {
  const devices = useSelector(carsSelectors.devices);

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
            // selected={selected?.id === row.id}
            // onClick={() => onRowSelected(row.id)}
          >
            <TableCell>{row.name}</TableCell>
            <TableCell>
              <TimeAgo datetime={row.lastUpdate} live={false} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DeviceTable;
