import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { loginUser, logoutUser } from './authSlice';
import './styles/register.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [flashMessage, setFlashMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters long'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', values);
      
      if (response.data.user) {
        dispatch(loginUser(response.data.user));
        setFlashMessage(`Welcome ${response.data.user.username}! Registration successful!`);
        setTimeout(() => {
          setFlashMessage('');
          navigate('/dashboard');
        }, 3000);
      }
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      setFlashMessage(error.response ? error.response.data.error : 'Registration failed');
      setTimeout(() => setFlashMessage(''), 3000);
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setFlashMessage('You have been logged out successfully');
    setTimeout(() => setFlashMessage(''), 3000);
  };

  if (isLoggedIn) {
    return (
      <div className="register-container">
        <div className="register-card">
          <h2 className="register-title">Welcome Back!</h2>
          <p className="register-subtitle">You are logged in as {user.username}</p>
          {flashMessage && (
            <div className="flash-message">{flashMessage}</div>
          )}
          <button 
            onClick={handleLogout}
            className="register-button"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create Account</h2>
        <p className="register-subtitle">Sign up to get started</p>
        
        {flashMessage && (
          <div className="flash-message">{flashMessage}</div>
        )}

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange, handleBlur, values }) => (
            <Form className="register-form">
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  placeholder="Choose a username"
                  className={`form-input ${errors.username && touched.username ? 'input-error' : ''}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
                {errors.username && touched.username && (
                  <div className="error-message">{errors.username}</div>
                )}
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  className={`form-input ${errors.password && touched.password ? 'input-error' : ''}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </div>

              <button 
                type="submit" 
                className={`register-button ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </Form>
          )}
        </Formik>

        <p className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;