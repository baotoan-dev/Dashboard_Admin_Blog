import React, { useMemo, useState, createContext, useContext } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import BlogListPage from './pages/BlogListPage';
import CustomerListPage from './pages/CustomerListPage';
import DashBoardPage from './pages/DashboardPage';
import CreateBlogPage from './pages/CreateBlogPage';
import CreateCustomerPage from './pages/CreateCustomerPage';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function useColorMode() {
  return useContext(ColorModeContext);
}

function App() {
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<DashBoardPage />} />
              <Route path="/blogs" element={<BlogListPage />} />
              <Route path="/customers" element={<CustomerListPage />} />
              <Route path="/blogs/add" element={<CreateBlogPage />} />
              <Route path="/customers/add" element={<CreateCustomerPage />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
