import React, { useState } from 'react';
import { Button, Form, Message, Icon } from 'semantic-ui-react';
import './Login.css';
import { Link } from 'react-router-dom';
import { signinAuthUserWithEmailAndPassword } from './Auth/Firebase';

function Login() {
  const [contact, setcontact] = useState({
    email: '',
    password: '',
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { email, password } = contact;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setcontact((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function handleLogin() {
    setLoading(true);
    setError('');

    try {
      const response = await signinAuthUserWithEmailAndPassword(email, password);
      setLoggedIn(true);
      setUserEmail(response.user.email);
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    }

    setLoading(false);
  }

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  return (
    <div className="login-container">
      <div className="login-box"> {/* Box Container */}
        <Form>
          <Link to="/signup">
            <div className="signup-link">
              <Button circular color="black" icon="signup" />
            </div>
          </Link>
          <Form.Group>
            <div className="email">
              <div className="email_label">
                <label>Email</label>
              </div>
              <div className="email_input">
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group>
            <div className="password">
              <div className="password_label">
                <label>Password</label>
              </div>
              <div className="password_input">
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </Form.Group>
          <div className="terms">
            <Form.Checkbox label="I have read and agreed to the Terms and Conditions." />
          </div>
          <div className="login-button">
            <Button
              onClick={handleLogin}
              type="submit"
              disabled={loading || !isFormValid}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
          {error && (
            <Message negative>
              <Icon name="exclamation" />
              {error}
            </Message>
          )}
          {loggedIn && (
            <Message positive>
              <Icon name="check" />
              Logged in as: {userEmail}
            </Message>
          )}
        </Form>
      </div>
    </div>
  );
}

export default Login;
