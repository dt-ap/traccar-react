import { createMuiTheme, Theme } from '@material-ui/core';
import palette, { AppPalette } from './palette';

export interface AppTheme extends Theme {
  palette: AppPalette;
}

const theme = createMuiTheme({ palette }) as AppTheme;

export default theme;
