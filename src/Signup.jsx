import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import './Signup.css';
import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createuserdocfromAuth } from './Auth/Firebase';
import { db } from './Auth/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Signup() {
  const [contact, setcontact] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isChecked, setIsChecked] = useState(false);

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }

  const { displayName, email, password, confirmPassword } = contact;

  async function handleClick() {
    if (!isChecked) {
      alert('Please agree to the Terms and Conditions');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createuserdocfromAuth(user, { displayName });
      await addDoc(collection(db, 'users'), {
        name: { displayName },
      });
      return;
    } catch (error) {
      console.log('Error in account creation', error.message);
    }
  }

  function handlepass(event) {
    const value = event.target.value;
    const name = event.target.name;

    setcontact((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  }

  return (
    <div className="signup-box">
      <div className="title">
        <h3>Create a DEV@DEAKIN Account</h3>
      </div>
      <Form>
        <Form.Group>
          <div className="n">
            <div className="N_label">
              <label>Enter your name</label>
            </div>
            <div className="name_input">
              <input
                name="displayName"
                type="text"
                placeholder="Name"
                onChange={handlepass}
              />
            </div>
          </div>
        </Form.Group>
        <Form.Group>
          <div className="n">
            <div className="N_label">
              <label>Enter an Email</label>
            </div>
            <div className="E_input">
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handlepass}
              />
            </div>
          </div>
        </Form.Group>
        <Form.Group>
          <div className="n">
            <div className="N_label">
              <label>Enter a Password</label>
            </div>
            <div className="p_input">
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handlepass}
              />
            </div>
          </div>
        </Form.Group>
        <Form.Group>
          <div className="n">
            <div className="N_label">
              <label>Confirm Password</label>
            </div>
            <div className="c_p_input">
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={handlepass}
              />
            </div>
          </div>
        </Form.Group>

        <div className="checkbox">
          <Form.Checkbox
            label="I agree to the Terms and Conditions"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="create-button">
          <Link to="/login">
            <Button onClick={handleClick}>Create</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default Signup;
