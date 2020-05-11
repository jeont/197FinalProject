import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { register } from './authSlice';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

// Bootstrap Components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Register = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.authenticated);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  // Redirect if the user is already logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <Form
        onSubmit={(e) => onSubmit(e)}
        className="d-flex flex-column flex-grow-1 shadow p-3 rounded bg-white"
        style={{ maxWidth: 400 }}
      >
        <h1>Register</h1>
        <p className="lead"> Create an account here. </p>

        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </Form.Group>

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

        <Form.Group>
          <Form.Label>Re-enter Password</Form.Label>
          <Form.Control
            name="password2"
            type="password"
            value={password2}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
