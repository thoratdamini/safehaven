import React from 'react';
import { AdminDashboard } from './adminDashboard';
import Community from './Community.jsx'
import CampDashboard from './CampDashboard.jsx';
import NewsDashboard from './NewsDashboard.jsx';
import QueryDashboard from './QueryDashboard.jsx';
import '../../styles/MainContent.css'

const MainContent = ({ selectedSection }) => {
  return (
    <div className="main-content">
      {selectedSection === 'AdminDashboard' && <AdminDashboard/>}
      {selectedSection === 'Camps' && <CampDashboard/>}
      {selectedSection === 'News' && <NewsDashboard/>}
      {selectedSection === 'Queries' && <QueryDashboard/>}
      {selectedSection === 'CommunityPost' && <Community />  }
      {/* // <Home style={{marginTop:"-30px"}}/> */}
     
    </div>
  );
};

export default MainContent;