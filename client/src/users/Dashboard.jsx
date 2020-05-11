import React, { useEffect, Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import {
  getAllUsers,
  addFriend,
  getFriends,
  removeFriend,
  updateLastSeen,
} from '../users/usersSlice';
import { getUser } from '../auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Moment from 'react-moment';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { user, authLoading } = useSelector((state) => state.auth);
  const {
    usersById,
    userIds,
    friendIds,
    friendshipsById,
    loading,
  } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getAllUsers());
    dispatch(getFriends());
  }, []);

  let friends;
  let friendships;
  let nonFriends = [];

  if (friendIds && usersById) {
    friends = friendIds
      .map((id) => usersById[id])
      .filter((id) => id != user._id);
    console.log(friendships);
    nonFriends = userIds
      .filter((id) => !friendIds.includes(id))
      .filter((id) => {
        console.log(id + user._id);
        return id != user._id;
      })
      .map((id) => usersById[id]);
  }

  return (
    <Container style={{ paddingTop: 'calc(56px + 2rem)' }}>
      <h1 className="mb-1">Dashboard</h1>
      {loading || authLoading || !friendIds || !usersById ? (
        <Spinner animation="border" />
      ) : (
        <div>
          <p className="m-0 mb-3 p-0">Welcome, {user.name}</p>
          {friends && friends.length > 0 && <h3>Friends</h3>}
          {friends &&
            friends.map((user) => (
              <div
                className="bg-light rounded p-2 my-3 d-flex flex-row align-items-start"
                key={user._id}
              >
                <div>
                  <p className="m-0 p-0">{user.name}</p>
                  <p className="text-muted m-0 p-0">{user.email}</p>
                  <Moment
                    date={friendshipsById[user._id].lastSeen}
                    format="hh:mm MM/DD/YYYY"
                  />
                </div>
                <div className="ml-auto d-flex flex-column">
                  <Button
                    onClick={() => dispatch(updateLastSeen(user._id))}
                    className="btn-sm btn-primary"
                  >
                    Update Last Seen
                  </Button>

                  <Button
                    onClick={() => dispatch(removeFriend(user._id))}
                    className="mt-2 btn-sm"
                    variant="outline-danger"
                  >
                    Remove Friend
                  </Button>
                </div>
              </div>
            ))}

          {nonFriends && nonFriends.length > 0 && <h3>Other Users</h3>}
          {nonFriends.map((user) => (
            <div
              className="bg-light rounded p-2 my-3 d-flex flex-row align-items-end"
              key={user._id}
            >
              <div>
                <p className="m-0 p-0">{user.name}</p>
                <p className="text-muted m-0 p-0">{user.email}</p>
              </div>
              <Button
                onClick={() => dispatch(addFriend(user._id))}
                className="ml-auto btn-sm"
                style={{ width: 133 }}
              >
                Add Friend
              </Button>
            </div>
          ))}

          {userIds.length === 1 && <p>Looks like you're the first user!</p>}
        </div>
      )}
    </Container>
  );
};

export default Dashboard;
