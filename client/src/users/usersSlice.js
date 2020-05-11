import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginAction } from '../auth/authSlice';
import setAuthToken from '../utils/setAuthToken';

const initialState = {
  loading: true,
  usersById: null,
  userIds: null,
  friendIds: null,
};

export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async (data, api) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/users`
      );

      return res.data;
    } catch (err) {
      return api.rejectWithValue(err.message);
    }
  }
);

export const addFriend = createAsyncThunk(
  'users/addFriend',
  async (idToAdd, api) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const userId = api.getState().auth.user._id;

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/friendships/${idToAdd}`
      );

      return res.data;
    } catch (err) {}
  }
);

export const removeFriend = createAsyncThunk(
  'users/removeFriend',
  async (idToRemove, api) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/friendships/${idToRemove}`
      );

      return res.data;
    } catch (err) {
      return api.rejectWithValue(err.message);
    }
  }
);

export const getFriendIds = createAsyncThunk(
  'users/getFriendIds',
  async (data, api) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/friendships/`
      );

      return res.data;
    } catch (err) {
      return api.rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllUsers.fulfilled]: (state, { payload: { usersById, userIds } }) => {
      state.loading = false;
      state.usersById = usersById;
      state.userIds = userIds;
    },
    [getAllUsers.rejectedWithValue]: (state, action) => {
      state.loading = false;
    },
    [addFriend.pending]: (state, action) => {
      state.loading = true;
    },
    [addFriend.fulfilled]: (state, { payload: { addedId } }) => {
      state.loading = false;
      state.friends = state.friendIds.unshift(addedId);
    },
    [addFriend.rejectedWithValue]: (state, action) => {
      state.loading = false;
    },
    [getFriendIds.pending]: (state, action) => {
      state.loading = true;
    },
    [getFriendIds.fulfilled]: (state, action) => {
      state.loading = false;
      state.friendIds = action.payload;
    },
    [getFriendIds.rejectedWithValue]: (state, action) => {
      state.loading = false;
    },
    [removeFriend.pending]: (state, action) => {
      state.loading = true;
    },
    [removeFriend.fulfilled]: (state, { payload: { removedId } }) => {
      state.loading = false;
      state.friendIds = state.friendIds.filter((id) => id != removedId);
    },
    [removeFriend.rejectedWithValue]: (state, action) => {
      state.loading = false;
    },
  },
});

export default authSlice.reducer;
