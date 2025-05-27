import { useMemo, useState, createContext, useContext } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // Thêm dòng này
import Layout from './components/Layout';
import BlogListPage from './pages/BlogListPage';
import CustomerListPage from './pages/CustomerListPage';
import DashBoardPage from './pages/DashboardPage';
import CreateBlogPage from './pages/CreateBlogPage';
import CreateCustomerPage from './pages/CreateCustomerPage';
import store from './store'; // Import store từ file store.js

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function useColorMode() {
  return useContext(ColorModeContext);
}

function App() {
  // Lấy mode từ localStorage, mặc định là 'light'
  const [mode, setMode] = useState(() => localStorage.getItem('themeMode') || 'light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const nextMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('themeMode', nextMode); // Lưu vào localStorage
          return nextMode;
        });
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
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
