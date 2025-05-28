import { configureStore } from '@reduxjs/toolkit';
import userReducer from './data/userSlice';
import authReducer from './data/authSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
});

export default store;
