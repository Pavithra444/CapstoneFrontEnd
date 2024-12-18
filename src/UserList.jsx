import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);  // State to store user data
  const [loading, setLoading] = useState(true);  // State to track loading status
  const [error, setError] = useState(null);  // State to handle errors

  const [searchTerm, setSearchTerm] = useState('');  // State to store the search term for event
  const [selectedDate, setSelectedDate] = useState('');  // State to store selected date for filtering

  // Fetch user data from the server when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/get-regdetails'); // Fetch users from API
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data); // Store users in state
      } catch (err) {
        setError(err.message);  // Set error message if fetching fails
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };

    fetchUsers(); // Call fetch function
  }, []);  // Empty dependency array means it runs only once, when the component mounts

  // Event handler for search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Event handler for date change
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Filter users based on searchTerm (event) and selectedDate (registrationDate)
  const filteredUsers = users.filter((user) => {
    const matchesEvent = user.event.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = selectedDate ? user.registrationDate.startsWith(selectedDate) : true;
    return matchesEvent && matchesDate;
  });

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error message if fetching fails
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User Registration Details</h2>

      {/* Search Filters */}
      <div>
        <label>
          Event:
          <input 
            type="text" 
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by Event"
            style={{ width: '150px', marginRight: '10px' }}  // Reduced width for Event filter
          />
        </label>
        <label>
          Registration Date:
          <input 
            type="date" 
            value={selectedDate}
            onChange={handleDateChange}
            style={{ width: '150px' }}  // Reduced width for Date filter
          />
        </label>
      </div>

      {/* Filtered user table */}
      <table>
        <thead>
          <tr>
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
          {filteredUsers.map((user) => (
            <tr key={user._id}>
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

