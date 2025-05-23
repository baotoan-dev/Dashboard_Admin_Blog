import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Divider,
  Collapse,
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function SidebarContent({ isMobile, collapsed, onToggleCollapse }) {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  const handleToggleMenu = (key) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    {
      text: 'Blogs',
      icon: <ArticleIcon />,
      children: [
        { text: 'All Blogs', path: '/blogs' },
        { text: 'Add Blog', path: '/blogs/add' },
      ],
    },
    {
      text: 'Customers',
      icon: <PersonAddIcon />,
      children: [
        { text: 'All Customers', path: '/customers' },
        { text: 'Add Customer', path: '/customers/add' },
      ],
    },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const renderNavItem = (item, idx, parentKey = '') => {
    const key = parentKey + item.text;
    if (item.children) {
      return (
        <Box key={key}>
          <ListItemButton
            onClick={() => handleToggleMenu(key)}
            sx={{
              borderRadius: 1,
              mb: 1,
              justifyContent: collapsed ? 'center' : 'flex-start',
              px: collapsed ? 1 : 2,
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 2 }}>{item.icon}</ListItemIcon>
            {!collapsed && <ListItemText primary={item.text} />}
            {!collapsed && (openMenus[key] ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
          <Collapse in={openMenus[key]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child, cidx) => renderNavItem(child, cidx, key))}
            </List>
          </Collapse>
        </Box>
      );
    }
    return (
      <Tooltip title={collapsed ? item.text : ''} placement="right" key={key}>
        <ListItemButton
          component={Link}
          to={item.path}
          selected={location.pathname === item.path}
          sx={{
            borderRadius: 1,
            mb: parentKey ? 0.5 : 1, // menu con mb nhỏ hơn hoặc bằng 0
            justifyContent: collapsed ? 'center' : 'flex-start',
            pl: parentKey ? 4 : undefined, // thụt vào nếu là menu con
            '&.Mui-selected': {
              backgroundColor: 'primary.main',
              color: 'white',
              '& .MuiListItemIcon-root': { color: 'white' },
            },
          }}
        >
          {item.icon && !parentKey && (
            <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 2 }}>{item.icon}</ListItemIcon>
          )}
          {!collapsed && <ListItemText primary={item.text} />}
        </ListItemButton>
      </Tooltip>
    );
  };

  return (
    <Box sx={{ p: 2, mt: 8 }}>
      <Box display="flex" justifyContent={collapsed ? 'center' : 'flex-end'} mb={2}>
        <IconButton onClick={onToggleCollapse}>
          {collapsed ? <MenuOpenIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>

      <Divider sx={{ mb: 1 }} />

      <List>{navItems.map((item, idx) => renderNavItem(item, idx))}</List>
    </Box>
  );
}
