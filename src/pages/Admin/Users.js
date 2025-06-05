import React from 'react';
import Adminmenu from '../../components/Adminmenu.js';

const Users = () => {
  return (
    <div className="container-fluid m-3 p-4 dashboard">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <Adminmenu />
        </div>

        {/* Users Section */}
        <div className="col-md-9">
          <div className="card shadow-sm p-4">
            <h3 className="text-primary mb-4">Users</h3>
            {/* You can add a table or any other content for the users here */}
            <div className="mb-3">
              <p>List of users will be displayed here...</p>
              {/* Example Placeholder */}
              <p className="text-muted">No users available yet. This section will show all registered users.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
