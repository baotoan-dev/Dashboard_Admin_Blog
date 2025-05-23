import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Drawer, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Header from './Header';
import SidebarContent from './SidebarContent';
import Footer from './Footer';

const expandedWidth = 240;
const collapsedWidth = 72;

export default function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const toggleDrawer = () => setMobileOpen(!mobileOpen);
  const toggleCollapse = () => setCollapsed((prev) => !prev);

  const drawerWidth = collapsed ? collapsedWidth : expandedWidth;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />

      {/* Header */}
      <Header isMobile={isMobile} onToggleDrawer={toggleDrawer} />

      {/* Sidebar + Content */}
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={toggleDrawer}
          ModalProps={{ keepMounted: true }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              transition: 'width 0.3s',
            },
          }}
        >
          <SidebarContent
            isMobile={isMobile}
            collapsed={collapsed}
            onToggleCollapse={toggleCollapse}
          />
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            // ml: isMobile ? 0 : `${drawerWidth}px`,
            mt: 8,
            p: 2,
            transition: 'margin-left 0.3s',
          }}
        >
          <Outlet />
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}
