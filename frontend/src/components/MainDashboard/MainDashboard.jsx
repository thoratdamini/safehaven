import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom'; // Importing useLocation hook for accessing the current URL
import CampCardGallery from '../MainDashboard/CampCardGallery'; // Importing CampCardGallery component
import NewsGallery from '../MainDashboard/NewsGallery'; // Importing NewsGallery component
import Footer from '../MainDashboard/Footer'; // Importing Footer component
import Header from '../MainDashboard/Header'; // Importing Header component
import Banner from '../MainDashboard/Banner'; // Importing Banner component
import SignupBanner from '../MainDashboard/SignupBanner'; // Importing SignupBanner component
import '../../dist/main.css'; // Importing main CSS file
import { API } from '../../../service/api'; // Importing API service
import { style } from '@mui/system';

// MainDashboard component
const MainDashboard = () => {
  const [camps, setCamps] = useState([]); // State for storing camp data
  const [news, setNews] = useState([]); // State for storing news data
  const location = useLocation(); // Accessing the current location using useLocation hook
  const campCardGalleryRef = useRef(null); // Ref for CampCardGallery component

  // Function to fetch camp data from API
  const fetchCamps = async () => {
    try {
      const response = await API.getCamp(); // Fetch camp data
      if (response.isSuccess) {
        setCamps(response.data); // Set camp data in state
      } else {
        console.error('Error fetching camps:', response.error); // Log error if fetching fails
      }
    } catch (error) {
      console.error('Network error:', error); // Log network error
    }
  };

  // Effect hook to fetch camp data on component mount
  useEffect(() => {
    fetchCamps();
  }, []);

  // Function to fetch news data from API
  const fetchNews = async () => {
    try {
      const response = await API.getNews(); // Fetch news data
      if (response.isSuccess) {
        setNews(response.data); // Set news data in state
      } else {
        console.error('Error fetching news:', response.error); // Log error if fetching fails
      }
    } catch (error) {
      console.error('Network error:', error); // Log network error
    }
  };

  // Effect hook to fetch news data on component mount
  useEffect(() => {
    fetchNews();
  }, []);

  // Effect hook to handle page reload
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.has('reload')) {
      window.location.href = '/home'; // Redirect to the same route if 'reload' query parameter exists
    }
  }, [location.search]);

  const handleExploreCampsClick = () => {
    if (campCardGalleryRef.current) {
      campCardGalleryRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Header />
      <div className="root">
        <div className="home">
          <Banner onExploreCampsClick={handleExploreCampsClick} />
          <CampCardGallery ref={campCardGalleryRef} camps={camps} />
          <NewsGallery news={news} />
          <SignupBanner />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainDashboard;