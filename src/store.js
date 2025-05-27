import { configureStore } from '@reduxjs/toolkit';
import userReducer from './data/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
