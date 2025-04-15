import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import postsReducer from './features/postsSlice';
import authReducer from './features/authSlice';
import uiReducer from './features/uiSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    auth: authReducer,
    ui: uiReducer,
  },
});

