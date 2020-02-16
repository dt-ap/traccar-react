import { colors } from '@material-ui/core';
import { Palette } from '@material-ui/core/styles/createPalette';

export interface AppPalette extends Palette {
  icon: string;
}

export default {
  icon: colors.blueGrey[600],
} as AppPalette;
