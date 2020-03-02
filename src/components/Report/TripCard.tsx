import React, { FC, ReactNode, useState, useEffect } from 'react';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  SelectProps,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import { selDevices } from 'store/selectors/devices';
import { TripDialogFormData } from 'utils/interfaces';
import CardTitle from 'components/shared/CardTitle';
import { reportActions } from 'store/modules';
import { selReportTrips } from 'store/selectors/reports';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  formControl: {
    marginBottom: theme.spacing(2),
  },
  formStyle: {
    width: '100%',
  },
  title: {
    marginRight: theme.spacing(2),
  },
  header: {
    display: 'flex',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  tripCard: {
    maxHeight: '400px',
  },
}));

const TripTable: FC = () => {
  const trips = useSelector(selReportTrips);

  return (
    <div style={{ maxWidth: 0 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Device Name</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>Odometer Start</TableCell>
            <TableCell>Start Address</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Odometer End</TableCell>
            <TableCell>End Address</TableCell>
            <TableCell>Distance</TableCell>
            <TableCell>Average Speed</TableCell>
            <TableCell>Maximum Speed</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Spent Fuel</TableCell>
            <TableCell>Driver</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trips.map(t => (
            <TableRow key={`${t.deviceId}-${t.startTime}`}>
              <TableCell>{t.deviceName}</TableCell>
              <TableCell>{t.startTime}</TableCell>
              <TableCell>{t.startOdometer}</TableCell>
              <TableCell>{t.startAddress}</TableCell>
              <TableCell>{t.endTime}</TableCell>
              <TableCell>{t.endOdometer}</TableCell>
              <TableCell>{t.endAddress}</TableCell>
              <TableCell>{t.distance}</TableCell>
              <TableCell>{t.averageSpeed}</TableCell>
              <TableCell>{t.maxSpeed}</TableCell>
              <TableCell>{t.duration}</TableCell>
              <TableCell>{t.spentFuel}</TableCell>
              <TableCell>{t.driverName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const ConfigureDialog: FC<{
  open: boolean;
  initData?: TripDialogFormData;
  onClose: () => void;
  onSubmit: (data: TripDialogFormData) => void;
}> = ({ open, initData, onClose, onSubmit }) => {
  const { formControl, formStyle, chips, chip } = useStyles();

  const { handleSubmit, control, reset } = useForm<TripDialogFormData>();
  useEffect(() => {
    if (initData) {
      reset(initData);
    }
  }, [initData, reset]);

  const devices = useSelector(selDevices);
  const periods = [
    { value: 'today', text: 'Today' },
    { value: 'yesterday', text: 'Yesterday' },
    { value: 'thisWeek', text: 'This Week' },
    { value: 'prevWeek', text: 'Previous Week' },
    { value: 'thisMonth', text: 'This Month' },
    { value: 'prevMonth', text: 'Previous Month' },
  ];

  const handleClose = () => {
    onClose();
  };

  const handleFormSubmit = handleSubmit(data => {
    onSubmit(data);
  });

  const handleRenderVal = (value: SelectProps['value']): ReactNode => (
    <div className={chips}>
      {(value as number[]).map(v => (
        <Chip
          className={chip}
          key={v}
          label={devices.find(d => d.id === v)?.name}
        />
      ))}
    </div>
  );

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      fullWidth
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Configure</DialogTitle>
      <form className={formStyle} onSubmit={handleFormSubmit}>
        <DialogContent>
          <FormControl fullWidth className={formControl}>
            <InputLabel id="multiple-label">Devices</InputLabel>
            <Controller
              name="deviceId"
              id="deviceId"
              control={control}
              defaultValue={[]}
              as={Select}
              labelId="multiple-label"
              multiple
              input={<Input id="select-multiple-chip" />}
              renderValue={handleRenderVal}
            >
              {devices.map(d => (
                <MenuItem key={d.id} value={d.id}>
                  {d.name}
                </MenuItem>
              ))}
            </Controller>
          </FormControl>
          <FormControl fullWidth className={formControl}>
            <InputLabel id="period-label">Period</InputLabel>
            <Controller
              control={control}
              as={Select}
              name="period"
              labelId="period-label"
              defaultValue="today"
            >
              {periods.map(p => (
                <MenuItem key={p.value} value={p.value}>
                  {p.text}
                </MenuItem>
              ))}
            </Controller>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" type="submit">
            OK
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const TripCard: FC = () => {
  const { paper, header, title, tripCard } = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<TripDialogFormData>();
  const dispatch = useDispatch();

  const handleOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = (data: TripDialogFormData) => {
    setFormData(data);
    setDialogOpen(false);
  };

  const handleShow = () => {
    if (formData) {
      const { period, ...data } = formData;
      const from = new Date();
      const to = new Date();
      let day: number;
      let first: number;

      switch (period) {
        case 'today':
          to.setDate(to.getDate() + 1);
          break;
        case 'yesterday':
          from.setDate(to.getDate() - 1);
          break;
        case 'thisWeek':
          day = from.getDay();
          first = from.getDate() - day + (day === 0 ? -6 : 1);
          from.setDate(first);
          to.setDate(first + 7);
          break;
        case 'prevWeek':
          day = from.getDay();
          first = from.getDate() - day + (day === 0 ? -6 : 1);
          from.setDate(first - 7);
          to.setDate(first);
          break;
        case 'thisMonth':
          from.setDate(1);
          to.setDate(1);
          to.setMonth(from.getMonth() + 1);
          break;
        case 'prevMonth':
          from.setDate(1);
          from.setMonth(from.getMonth() - 1);
          to.setDate(1);
          break;
        default:
          break;
      }

      from.setHours(0, 0, 0, 0);
      to.setHours(0, 0, 0, 0);
      // eslint-disable-next-line no-param-reassign
      data.from = from.toISOString();
      // eslint-disable-next-line no-param-reassign
      data.to = to.toISOString();

      dispatch(reportActions.tripsFetching(data));
    }
  };

  const handleClear = () => {
    dispatch(reportActions.clear());
  };

  return (
    <Paper className={clsx(paper, tripCard)}>
      <div className={header}>
        <span className={title}>
          <CardTitle>Trips</CardTitle>
        </span>
        <Button onClick={handleOpen}>Configure</Button>
        <ConfigureDialog
          open={dialogOpen}
          initData={formData}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
        <Button
          onClick={handleShow}
          disabled={formData === undefined || formData?.deviceId?.length === 0}
        >
          Show
        </Button>
        <Button onClick={handleClear}>Clear</Button>
      </div>
      <TripTable />
    </Paper>
  );
};
export default TripCard;
