import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './authSlice';
import { Redirect, Link } from 'react-router-dom';

// Bootstrap Components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.authenticated);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  // Redirect if the user is already logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <Form
        onSubmit={(e) => onSubmit(e)}
        className="d-flex flex-column flex-grow-1 p-3"
        style={{ maxWidth: 400 }}
      >
        <h1>Login</h1>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button
          className="mt-2"
          variant="outline-primary"
          as={Link}
          to="/register"
        >
          Need an account? Register here.
        </Button>
      </Form>
    </div>
  );
};

export default Login;
