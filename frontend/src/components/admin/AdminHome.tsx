/** @jsxImportSource @emotion/react */
import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Sidebar from './sidebar';

const AdminHome: React.FC = () => {
  const location = useLocation();

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        {location.pathname === '/admin' && <h1>Welcome to the Admin Dashboard</h1>}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminHome;
