import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../../styles/SideBar.css'; // Import the CSS file

const Sidebar = ({ selectedSection, handleSectionClick }) => {
  return (
    <div className="sidebar">
      <div className="section" onClick={() => handleSectionClick('AdminDashboard')} style={{ backgroundColor: selectedSection === 'AdminDashboard' ? '#76ABAE' : 'transparent' }}>
        Admin Dashboard
      </div>
      <div className="section" onClick={() => handleSectionClick('Camps')} style={{ backgroundColor: selectedSection === 'Camps' ? '#76ABAE' : 'transparent' }}>
        Camps
      </div>
      <div className="section" onClick={() => handleSectionClick('News')} style={{ backgroundColor: selectedSection === 'News' ? '#76ABAE' : 'transparent' }}>
        News
      </div>
      <div className="section" onClick={() => handleSectionClick('Queries')} style={{ backgroundColor: selectedSection === 'Queries' ? '#76ABAE' : 'transparent' }}>
        Queries
      </div>
      <div className="section" onClick={() => handleSectionClick('CommunityPost')} style={{ backgroundColor: selectedSection === 'CommunityPost' ? '#76ABAE' : 'transparent' }}>
          Community Post
      </div>
    </div>
  );
};

export default Sidebar;
