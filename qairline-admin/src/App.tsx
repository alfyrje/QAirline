import {
  Admin,
  Resource,
  EditGuesser,
  ShowGuesser,
  ListGuesser,
} from "react-admin";
import { Layout } from "./Layout";
import dataProvider from "./dataProvider";
import authProvider from "./authProvider";
import { FlightList, FlightEdit, FlightShow, FlightCreate } from "./flights";
import { PlaneList, PlaneCreate } from "./planes";
import { TicketList } from "./tickets";
import { createTheme } from '@mui/material/styles';
import FlightIcon from '@mui/icons-material/Flight';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import Dashboard from "./Dashboard";

const lightTheme = createTheme({
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

const darkTheme = createTheme({
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
    mode: 'dark',
  },
  typography: {
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Arial', 'sans-serif'].join(','),
  },
});

export const App = () => (
  <Admin dashboard={Dashboard} theme={lightTheme} layout={Layout} dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="flights" list={FlightList} show={FlightShow} edit={FlightEdit} create={FlightCreate} icon={FlightLandIcon} />
    <Resource name="planes" list={PlaneList} edit={EditGuesser} show={ShowGuesser} create={PlaneCreate} icon={FlightIcon} />
    <Resource name="tickets" list={TicketList} show={ShowGuesser} icon={AirplaneTicketIcon} />
  </Admin>
);
