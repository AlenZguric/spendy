// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reduxSlice/auth/authSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
 },
});

export default store;
