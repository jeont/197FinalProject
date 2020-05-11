import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import auth from './auth/authSlice';
import users from './users/usersSlice';

const rootReducer = combineReducers({ auth, users });

const store = configureStore({
  reducer: rootReducer,
});

export default store;
