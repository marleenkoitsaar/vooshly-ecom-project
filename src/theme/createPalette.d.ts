import * as createPalette from '@mui/material/styles/createPalette';

declare module '@mui/material/styles' {
  interface Palette {
    dark: Palette['primary'];
    white: Palette['primary'];
  }

  interface PaletteOptions {
    dark?: PaletteOptions['primary'];
    white?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    dark: true;
    white: true;
  }
}

declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    dark: true;
    white: true;
  }
}
