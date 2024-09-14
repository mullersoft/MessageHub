/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Sidebar: React.FC = () => {
  return (
    <div style={{ padding: '20px', width: '200px', background: '#f5f5f5' }}>
      <Link to="/admin">
        <Button variant="contained" style={{ marginBottom: '10px', width: '100%' }}>Dashboard</Button>
      </Link>
      <Link to="/admin/categories">
        <Button variant="contained" style={{ marginBottom: '10px', width: '100%' }}>Manage Categories</Button>
      </Link>
      <Link to="/admin/messages">
        <Button variant="contained" style={{ width: '100%' }}>Manage Messages</Button>
      </Link>
    </div>
  );
};

export default Sidebar;
