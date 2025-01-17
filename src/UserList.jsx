import React, { useState, useEffect } from 'react';
import './App.css';  // Importing CSS for styling

const UserList = () => {
  const [users, setUsers] = useState([]);  // State to store user data
  const [loading, setLoading] = useState(true);  // State to track loading status
  const [error, setError] = useState(null);  // State to handle errors
  const [filters, setFilters] = useState({
    name: '',
    registrationId: '',
    registrationDate: '',
    email: '',
    phoneNo: '',
    address: '',
    event: ''
  });  // State to store all filter values

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const response = await fetch('http://localhost:5000/get-regdetails');
        const response = await fetch('https://capstonebackend-ymwc.onrender.com/get-regdetails');

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Event handler for filter changes
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  // Filter users based on filter values
  const filteredUsers = users.filter((user) => {
    const matchesName = user.name.toLowerCase().includes(filters.name.toLowerCase());
    const matchesRegistrationId = user.registrationId.toLowerCase().includes(filters.registrationId.toLowerCase());
    const matchesDate = filters.registrationDate ? user.registrationDate.startsWith(filters.registrationDate) : true;
    const matchesEmail = user.mailId?.toLowerCase().includes(filters.email.toLowerCase()) || true;
    const matchesPhone = user.phoneNo.toLowerCase().includes(filters.phoneNo.toLowerCase());
    // const matchesAddress = Object.values(user.address).some(value => value.toLowerCase().includes(filters.address.toLowerCase()));
    const matchesEvent = user.event.toLowerCase().includes(filters.event.toLowerCase());

    return matchesName && matchesRegistrationId && matchesDate && matchesEmail && matchesPhone && matchesEvent;
  });

  // Render loading or error message
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="user-list-container">
      <h2 className="title">Attendees Registration Details</h2>

      {/* Filters */}
      <div className="filters">
        <div className="filter-item">
          <label className="filter-label">Name:</label>
          <input 
            type="text" 
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            placeholder="Filter by Name"
            className="filter-input"
          />
        </div>
        <div className="filter-item">
          <label className="filter-label">Registration ID:</label>
          <input 
            type="text" 
            name="registrationId"
            value={filters.registrationId}
            onChange={handleFilterChange}
            placeholder="Filter by Registration ID"
            className="filter-input"
          />
        </div>
        <div className="filter-item">
          <label className="filter-label">Registration Date:</label>
          <input 
            type="date" 
            name="registrationDate"
            value={filters.registrationDate}
            onChange={handleFilterChange}
            className="filter-input"
          />
        </div>
        <div className="filter-item">
          <label className="filter-label">Email:</label>
          <input 
            type="text" 
            name="email"
            value={filters.email}
            onChange={handleFilterChange}
            placeholder="Filter by Email"
            className="filter-input"
          />
        </div>
        <div className="filter-item">
          <label className="filter-label">Phone Number:</label>
          <input 
            type="text" 
            name="phoneNo"
            value={filters.phoneNo}
            onChange={handleFilterChange}
            placeholder="Filter by Phone Number"
            className="filter-input"
          />
        </div>
       
        <div className="filter-item">
          <label className="filter-label">Event:</label>
          <input 
            type="text" 
            name="event"
            value={filters.event}
            onChange={handleFilterChange}
            placeholder="Filter by Event"
            className="filter-input"
          />
        </div>
      </div>

      {/* Filtered user table */}
      <table className="user-table">
        <thead>
          <tr>
          <th>#</th>
            <th>Name</th>
            <th>Registration ID</th>
            <th>Registration Date</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Event</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="7" className="no-results">No users found matching the criteria.</td>
            </tr>
          ) : (
            filteredUsers.map((user,index) => (
              <tr key={user._id} className="user-row">
                <td>{index + 1}</td>  {/* Displaying row number */}

                <td>{user.name}</td>
                <td>{user.registrationId}</td>
                <td>{user.registrationDate}</td>
                <td>{user.mailId || 'N/A'}</td>
                <td>{user.phoneNo}</td>
                <td>
                  {user.addressLine1}, {user.addressLine2}, {user.city}, {user.state}, {user.pincode}, {user.country}
                </td>
                <td>{user.event}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
