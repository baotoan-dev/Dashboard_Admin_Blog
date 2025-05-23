import ArticleIcon from '@mui/icons-material/Article';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import HotelIcon from '@mui/icons-material/Hotel';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import PeopleIcon from '@mui/icons-material/People';
import PaymentIcon from '@mui/icons-material/Payment';
import RateReviewIcon from '@mui/icons-material/RateReview';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PostAddIcon from '@mui/icons-material/PostAdd';

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  {
    text: 'Hotels',
    icon: <HotelIcon />,
    children: [
      { text: 'All Hotels', icon: <ListAltIcon />, path: '/hotels' },
      { text: 'Add Hotel', icon: <AddBusinessIcon />, path: '/hotels/add' },
    ],
  },
  {
    text: 'Rooms',
    icon: <MeetingRoomIcon />,
    children: [
      { text: 'All Rooms', icon: <ListAltIcon />, path: '/rooms' },
      { text: 'Add Room', icon: <PlaylistAddIcon />, path: '/rooms/add' },
    ],
  },
  {
    text: 'Bookings',
    icon: <BookOnlineIcon />,
    children: [
      { text: 'All Bookings', icon: <ListAltIcon />, path: '/bookings' },
      { text: 'Add Booking', icon: <AddCircleOutlineIcon />, path: '/bookings/add' },
    ],
  },
  {
    text: 'Customers',
    icon: <PeopleIcon />,
    children: [
      { text: 'All Customers', icon: <ListAltIcon />, path: '/customers' },
      { text: 'Add Customer', icon: <GroupAddIcon />, path: '/customers/add' },
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
      { text: 'All Blogs', icon: <LibraryBooksIcon />, path: '/blogs' },
      { text: 'Add Blog', icon: <PostAddIcon />, path: '/blogs/add' },
    ],
  },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

export default navItems;
