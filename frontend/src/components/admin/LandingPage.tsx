/** @jsxImportSource @emotion/react */
import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to the Admin Dashboard</h1>
      <p>This admin panel allows you to manage categories and messages for the project. Use the sidebar to navigate to different sections.</p>
      <p>Here you can:</p>
      <ul>
        <li><strong>Manage Categories:</strong> Add, update, or delete categories.</li>
        <li><strong>Manage Messages:</strong> Create, view, and delete messages associated with the categories.</li>
      </ul>
    </div>
  );
};

export default LandingPage;
