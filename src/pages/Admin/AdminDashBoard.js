import React from 'react';
import Adminmenu from '../../components/Adminmenu';
import { useAuth } from '../../context/auth';

const AdminDashBoard = () => {
  const [auth] = useAuth();

  const mainContentStyle = {
    padding: '40px',
    width: '100%',
    maxWidth: '700px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  };

  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  };

  const sidebarWrapperStyle = {
    width: '220px',
  };

  const contentWrapperStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  };

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <div style={sidebarWrapperStyle}>
        <Adminmenu />
      </div>

      {/* Main Content */}
      <div style={contentWrapperStyle}>
        <div style={mainContentStyle}>
          <h3 className="mb-4 text-center">Admin Profile</h3>
          <hr />
          <p><strong>Admin Name:</strong> {auth?.user?.username}</p>
          <p><strong>Admin Email:</strong> {auth?.user?.email}</p>
          <p><strong>Admin Contact:</strong> {auth?.user?.contact}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
