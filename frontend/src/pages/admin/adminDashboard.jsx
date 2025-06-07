import { useEffect, useState } from 'react';
import UserContainer from './UserContainer'; // Import UserContainer component
import Navbar from './Navbar';
import { API } from "../../../service/api"

export function AdminDashboard() {
  const [users, setUsers] = useState([]); // State for users
  const [editedUser, setEditedUser] = useState(null); // State for edited user
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users

  const updateUser = (userId, updatedUser) => { // Update user function
    setUsers(prevUsers => {
      const updatedUsers = prevUsers.map(user => {
        if (user._id === userId) {
          return updatedUser;
        }
        return user;
      });
      return updatedUsers;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.getUsersDetails();
        console.log('Response:', response);
        if (!response.isSuccess) {
          throw new Error('Failed to fetch users');
        }
        setUsers(response.data.data); // Update state with user data
        setFilteredUsers(response.data.data); // Update filtered users as well
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    

    fetchData();
  }, []);

  const handleFilter = async (city, name) => {
    try {
      const response = await API.getUsersDetails();
      console.log('Response:', response);
      if (!response.isSuccess) {
        throw new Error('Failed to fetch users');
      }
      let filteredData = response.data.data;
  
      // Apply filtering based on city
      if (city !== 'All') {
        filteredData = filteredData.filter(user => user.city === city);
      }
  
      // Apply filtering based on name
      if (name !== '') {
        filteredData = filteredData.filter(user => user.name === name);
      }
  
      setFilteredUsers(filteredData); // Update filtered users state
    } catch (error) {
      console.error('Error filtering users:', error);
    }
  };

  return (
    <>
    <div className='navbar' style={{position: "absolute", display:'flex',left:'17%',width:'83%'}}>
      <Navbar  handleFilter={handleFilter} /> {/* Pass handleFilter function to Navbar */}
      </div>

      <div style={{ justifyContent: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {/* Replace NotesContainer with UserContainer */}
          <UserContainer users={filteredUsers} setUsers={setUsers} setEditedUser={setEditedUser} />
          {
            // editedUser && (
            //   // <EditContainer editedUser={editedUser} setEditedUser={setEditedUser} updateUser={updateUser} />
            // )
          }
        </div>
      </div>
    </>
  );
}
