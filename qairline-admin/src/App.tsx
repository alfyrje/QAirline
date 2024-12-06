import {
  Admin,
  Resource,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { Layout } from "./Layout";
import dataProvider from "./dataProvider";
import authProvider from "./authProvider";
import { FlightList, FlightEdit, FlightShow, FlightCreate } from "./flights";
import { PlaneList, PlaneCreate } from "./planes";
import { deepmerge } from '@mui/utils';
import { createTheme } from '@mui/material/styles';
import FlightIcon from '@mui/icons-material/Flight';
import FlightLandIcon from '@mui/icons-material/FlightLand';

const customThemeSettings = createTheme({
  palette: {
    primary: {
      main: '#357a38',
    },
    secondary: {
      main: '#357a38',
    },
    error: {
      main: '#d81b60',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Arial', 'sans-serif'].join(','),
  },
});

const lightTheme = customThemeSettings
const darkTheme = deepmerge(customThemeSettings, { palette: { mode: 'dark' } });

export const App = () => (
  <Admin theme={lightTheme} darkTheme={darkTheme} layout={Layout} dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="flights" list={FlightList} show={FlightShow} edit={FlightEdit} create={FlightCreate} icon={FlightLandIcon} />
    <Resource name="planes" list={PlaneList} edit={EditGuesser} show={ShowGuesser} create={PlaneCreate} icon={FlightIcon} />
  </Admin>
);
