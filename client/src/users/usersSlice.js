import {
  createSlice,
  createAsyncThunk,
  createNextState,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { loginAction } from '../auth/authSlice';
import setAuthToken from '../utils/setAuthToken';

export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async (data, api) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get(`/api/users`);

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

    try {
      const res = await axios.post(`/api/friendships/${idToAdd}`);

      return res.data;
    } catch (err) {
      return api.rejectWithValue(err.message);
    }
  }
);

export const removeFriend = createAsyncThunk(
  'users/removeFriend',
  async (idToRemove, api) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.delete(`/api/friendships/${idToRemove}`);

      return res.data;
    } catch (err) {
      return api.rejectWithValue(err.message);
    }
  }
);

export const updateLastSeen = createAsyncThunk(
  'users/updateLastSeen',
  async (idToUpdate, api) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.put(`/api/friendships/${idToUpdate}`);

      return res.data;
    } catch (err) {
      return api.rejectWithValue(err.message);
    }
  }
);

export const getFriends = createAsyncThunk(
  'users/getFriends',
  async (data, api) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get(`/api/friendships/`);

      return res.data;
    } catch (err) {
      return api.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  loading: true,
  usersById: {},
  userIds: [],
  friendIds: [],
  friendshipsById: {},
};

const usersSlice = createSlice({
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
    [addFriend.fulfilled]: (state, { payload: { addedId, friendship } }) => {
      state.loading = false;
      state.friendshipsById = {
        ...state.friendshipsById,
        [addedId]: friendship,
      };
      state.friendIds.unshift(addedId);
    },
    [addFriend.rejectedWithValue]: (state, action) => {
      state.loading = false;
    },
    [getFriends.pending]: (state, action) => {
      state.loading = true;
    },
    [getFriends.fulfilled]: (
      state,
      { payload: { friendIds, friendshipsById } }
    ) => {
      state.loading = false;
      state.friendIds = friendIds;
      state.friendshipsById = friendshipsById;
    },
    [getFriends.rejectedWithValue]: (state, action) => {
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
    [updateLastSeen.pending]: (state, action) => {
      state.loading = true;
    },
    [updateLastSeen.fulfilled]: (
      state,
      { payload: { idToUpdate, friendship } }
    ) => {
      state.loading = false;
      state.friendshipsById = {
        ...state.friendshipsById,
        [idToUpdate]: { friendship },
      };
    },
    [updateLastSeen.rejectedWithValue]: (state, action) => {
      state.loading = false;
    },
  },
});

export default usersSlice.reducer;
