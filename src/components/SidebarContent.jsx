import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link, useLocation } from 'react-router-dom';

export default function SidebarContent({ isMobile, collapsed, onToggleCollapse }) {
  const location = useLocation();

  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Blogs', icon: <ArticleIcon />, path: '/blogs' },
    { text: 'Customers', icon: <PersonAddIcon />, path: '/customers' },
  ];

  return (
    <Box sx={{ p: 2, mt: 8 }}>
      <Box display="flex" justifyContent={collapsed ? 'center' : 'flex-end'} mb={2}>
        <IconButton onClick={onToggleCollapse}>
          {collapsed ? <MenuOpenIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>

      <Divider sx={{ mb: 1 }} />

      <List>
        {navItems.map((item) => (
          <Tooltip title={collapsed ? item.text : ''} placement="right" key={item.path}>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 1,
                mb: 1,
                justifyContent: collapsed ? 'center' : 'flex-start',
                px: collapsed ? 1 : 2,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '& .MuiListItemIcon-root': { color: 'white' },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 2 }}>{item.icon}</ListItemIcon>
              {!collapsed && <ListItemText primary={item.text} />}
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
    </Box>
  );
}
