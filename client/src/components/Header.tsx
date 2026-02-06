import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1>❄️ ColdBox</h1>
          <div className="user-info">
            <span>{user.user_name}</span>
            <span className="user-role">{user.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
