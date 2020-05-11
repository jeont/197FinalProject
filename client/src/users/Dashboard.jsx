import React, { useEffect, Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import {
  getAllUsers,
  addFriend,
  getFriendIds,
  removeFriend,
} from '../users/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { users, loading } = useSelector((state) => state.users);
  const { authLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    dispatch(getFriendIds());
  }, []);

  const { usersById, userIds, friendIds } = useSelector((state) => state.users);

  let friends;
  let nonFriends;

  if (!loading && !authLoading) {
    if (friendIds && usersById) {
      friends = friendIds.map((id) => usersById[id]);
      nonFriends = userIds
        .filter((id) => !friendIds.includes(id))
        .map((id) => usersById[id]);
    } else {
      nonFriends = userIds.map((id) => usersById[id]);
    }
  }

  return (
    <Container style={{ paddingTop: 'calc(56px + 2rem)' }}>
      <h1 className="mb-3">Dashboard</h1>
      {loading || authLoading ? (
        <Spinner animation="border" />
      ) : (
        <div>
          {friends && friends.length > 0 && <h3>Friends</h3>}
          {friends &&
            friends.map((user) => (
              <div
                className="bg-light rounded p-2 m-3 d-flex flex-row"
                key={user._id}
              >
                <div>
                  <p className="m-0 p-0">{user.name}</p>
                  <p className="text-muted m-0 p-0">{user.email}</p>
                </div>
                <Button
                  onClick={() => dispatch(removeFriend(user._id))}
                  className="ml-auto btn-sm btn-danger"
                >
                  Remove Friend
                </Button>
              </div>
            ))}

          {nonFriends && nonFriends.length > 0 && <h3>Other Users</h3>}
          {nonFriends.map((user) => (
            <div
              className="bg-light rounded p-2 m-3 d-flex flex-row"
              key={user._id}
            >
              <div>
                <p className="m-0 p-0">{user.name}</p>
                <p className="text-muted m-0 p-0">{user.email}</p>
              </div>
              <Button
                onClick={() => dispatch(addFriend(user._id))}
                className="ml-auto btn-sm"
              >
                Add Friend
              </Button>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Dashboard;
