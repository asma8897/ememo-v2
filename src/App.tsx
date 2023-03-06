import { createTheme, ThemeProvider } from '@mui/system';
import React from 'react';
import AppRoutes from './screens/routes/appRoutes';

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#F16E5F",
    },
  },
  typography: {
    fontFamily: "Fira Sans",
  },
})

function App() {
  return (
    <div>
      <ThemeProvider theme={customTheme}>
      </ThemeProvider>
      <AppRoutes />
    </div>
  );
}

export default App;

// export default function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>

//       <HomePage />
//     </div>
//   );
// }

