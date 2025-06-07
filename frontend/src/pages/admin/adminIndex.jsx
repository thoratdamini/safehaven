import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from './SideBar.jsx';
import MainContent from './MainContent.jsx';
import AdminHeader from './AdminHeader.jsx';

function AdminIndex() {
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // Initialize navigate
  const [selectedSection, setSelectedSection] = useState(location.state ? location.state.selectedSection : 'AdminDashboard');

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  return (
    <div>
      {/* Header */}
      <AdminHeader/>

      {/* Sidebar and MainContent */}
      <div style={{ display: 'flex' ,marginTop:'100px'}}>
        <Sidebar selectedSection={selectedSection} handleSectionClick={handleSectionClick} />
        <MainContent selectedSection={selectedSection} />
      </div>
    </div>
  );
}

export default AdminIndex;
