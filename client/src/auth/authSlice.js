import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

const initialState = {
  authenticated: false,
  loading: true,
  user: {},
  token: localStorage.getItem('token'),
};

export const register = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/users`,
        data
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    console.log('register called');
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth`,
        data
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getUser = createAsyncThunk('auth/getUser', async (data, api) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth`
    );

    return res.data;
  } catch (err) {
    return api.rejectWithValue(err.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.authenticated = false;
      state.loading = false;
      localStorage.removeItem('token');
      state.user = {};
    },
  },
  extraReducers: {
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.authenticated = true;
      localStorage.setItem('token', payload.token);
    },
    [register.rejectedWithValue]: (state, action) => {
      state.loading = false;
      state.authenticated = false;
    },
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.authenticated = true;
      localStorage.setItem('token', payload.token);
    },
    [login.rejectedWithValue]: (state, action) => {
      state.loading = false;
      state.authenticated = false;
    },
    [getUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.authenticated = true;
    },
    [getUser.rejectedWithValue]: (state, action) => {
      state.loading = false;
      state.authenticated = false;
    },
    [getUser.rejected]: (state, action) => {
      state.loading = false;
      state.authenticated = false;
    },
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
