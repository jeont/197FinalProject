import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Landing = () => {
  const isAuthenticated = useSelector((state) => state.auth.authenticated);

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="p-3">
        <h1>Welcome to inTouch</h1>
        <p>
          inTouch is an application that you can use to stay in touch with your
          friends.
        </p>
        <div>
          <Button className="mr-2" as={Link} to="/login">
            Login
          </Button>
          <Button as={Link} to="/register">
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
