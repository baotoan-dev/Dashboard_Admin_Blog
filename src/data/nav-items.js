import ArticleIcon from '@mui/icons-material/Article';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import HotelIcon from '@mui/icons-material/Hotel';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import PeopleIcon from '@mui/icons-material/People';
import PaymentIcon from '@mui/icons-material/Payment';
import RateReviewIcon from '@mui/icons-material/RateReview';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  {
    text: 'Hotels',
    icon: <HotelIcon />,
    children: [
      { text: 'All Hotels', icon: <AddBusinessIcon />, path: '/hotels' },
      { text: 'Add Hotel', icon: <AddBoxIcon />, path: '/hotels/add' },
    ],
  },
  {
    text: 'Rooms',
    icon: <MeetingRoomIcon />,
    children: [
      { text: 'All Rooms', icon: <MeetingRoomIcon />, path: '/rooms' },
      { text: 'Add Room', icon: <AddBoxIcon />, path: '/rooms/add' },
    ],
  },
  {
    text: 'Bookings',
    icon: <BookOnlineIcon />,
    children: [
      { text: 'All Bookings', icon: <BookOnlineIcon />, path: '/bookings' },
      { text: 'Add Booking', icon: <AddCircleOutlineIcon />, path: '/bookings/add' },
    ],
  },
  {
    text: 'Customers',
    icon: <PeopleIcon />,
    children: [
      { text: 'All Customers', icon: <PeopleIcon />, path: '/customers' },
      { text: 'Add Customer', icon: <PersonAddIcon />, path: '/customers/add' },
    ],
  },
  {
    text: 'Payments',
    icon: <PaymentIcon />,
    path: '/payments',
  },
  {
    text: 'Reviews',
    icon: <RateReviewIcon />,
    path: '/reviews',
  },
  {
    text: 'Blog',
    icon: <ArticleIcon />,
    children: [
      { text: 'All Blogs', icon: <ArticleIcon />, path: '/blogs' },
      { text: 'Add Blog', icon: <AddBoxIcon />, path: '/blogs/add' },
    ],
  },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

export default navItems;
