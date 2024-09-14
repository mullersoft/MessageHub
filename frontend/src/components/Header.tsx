/** @jsxImportSource @emotion/react */
import React from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";

const Header: React.FC = () => {
  return (
    <header css={headerStyle}>
      <Link to="/" css={logoStyle}>
        <h1>MessageHub</h1>
      </Link>
      <div css={headerActionsStyle}>
        {/* <Link to="/post-message" css={postMessageButtonStyle}>
          Add Message
        </Link> */}
        <div css={userInfoStyle}>
          <img
            src="https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png"
            alt="User Avatar"
            css={avatarStyle}
          />
          <div css={dropdownMenuStyle}>
            {/* <Link to="/profile" css={dropdownItemStyle}>
              Profile
            </Link> */}
            <Link to="/post-message" css={dropdownItemStyle}>
              Post Message
            </Link>
            <Link to="/admin" css={dropdownItemStyle}>
              Admin
            </Link>
            <button
              css={dropdownItemStyle}
              onClick={() => {
                /* Handle Logout */
              }}
            >
              Logout
            </button>
            {/* <button css={dropdownItemStyle}>Soon</button> */}
          </div>
        </div>
      </div>
    </header>
  );
};

// Styles using Emotion
const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
`;

const logoStyle = css`
  text-decoration: none;
  color: #007bff;
  font-size: 1.5rem;
  font-weight: bold;
  transition: color 0.3s ease, transform 0.3s ease; /* Smooth transition for effects */

  &:hover {
    color: #0056b3; /* Change color on hover */
    transform: scale(1.05); /* Slightly scale up for a subtle effect */
  }
`;

const headerActionsStyle = css`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const userInfoStyle = css`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;

  &:hover > div {
    display: flex; /* Show dropdown when hovering over userInfoStyle */
  }
`;

const avatarStyle = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #007bff;

  &:hover {
    border-color: #0056b3;
  }
`;

const dropdownMenuStyle = css`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 150px;
  display: none; /* Initially hidden */
  flex-direction: column;
`;

const dropdownItemStyle = css`
  padding: 0.75rem;
  text-align: left;
  color: #007bff;
  text-decoration: none;
  font-size: 0.875rem;

  &:hover {
    background-color: #f1f1f1;
  }

  &:last-of-type {
    border-top: 1px solid #dee2e6;
  }
`;

export default Header;
