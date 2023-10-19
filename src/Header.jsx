/* Header.js */
import './Header.css'; // Use a different CSS file
import React from 'react';
import { Input, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="new-header">
      <div className="deakin">
        <div className="left">
          <p>DEV@DEAKIN</p>
        </div>
        <div className="right">
          <div className="s">
            <Input icon="search" placeholder="Search" />
          </div>
          <div className="button">
            <Button className="post">Post</Button>
            <Link to="/login">
              <Button className="login">Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
