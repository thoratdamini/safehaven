import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Importing Redux hooks
import { Card, CardContent, Typography, CardActions, Button, Box, Select, MenuItem, Modal } from '@mui/material'; // Importing Material-UI components
import { makeStyles } from '@mui/styles'; // Importing makeStyles for custom styles
import Slider from 'react-slick'; // Importing react-slick for carousel
import 'slick-carousel/slick/slick.css'; // Importing slick carousel styles
import 'slick-carousel/slick/slick-theme.css'; // Importing slick carousel theme
import { useTranslation } from "react-i18next"; // Importing useTranslation hook for translation
import ReactMapGL, { Marker } from 'react-map-gl'; // Importing ReactMapGL for displaying maps
import RoomIcon from '@mui/icons-material/Room'; // Importing Material-UI RoomIcon

// Define custom styles using makeStyles
const useStyles = makeStyles({
  // Styles for individual cards
  card: {
    minWidth: 275,
    marginRight: 20,
    border: '2px solid #222831',
  },
  // Styles for the slider container
  sliderContainer: {
    maxWidth: 1000,
    width: '100%',
    margin: 'auto', // Center the slider horizontally
    marginTop: 100,
    position: 'relative', // Add position relative for absolute positioning
  },
  // Styles for the filter dropdown
  filter: {
    backgroundColor: '#fff',
    color: '#000',
  },
  // Styles for the filter button
  filterButton: {
    backgroundColor: '#76ABAE !important',
    color: '#fff !important',
    marginLeft: '10px !important',
    position: 'absolute',
    top: 0,
    right: 0,
    paddingTop: '15px !important',
    paddingBottom: '15px !important',
    border: '1px solid #222831 !important'
  },
  // Styles for the header container
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // Styles for the horizontal camp container
  horizontalCampContainer: {
    display: 'flex',
    overflowX: 'auto',
    marginTop: 20,
  },
  // Styles for the modal content
  modalContent: {
    position: 'absolute',
    width: '50%',
    backgroundColor: 'white',
    padding: '20px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#000',
  },
  // Styles for the modal title
  modalTitle: {
    color: '#000',
  },
  // Styles for the modal location
  modalLocation: {
    color: '#000',
    marginBottom: '10px',
  },
  // Styles for the map container
  mapContainer: {
    height: 300,
    marginTop: 20,
  },
  // Global styles for black arrows
  '@global': {
    '.slick-prev:before, .slick-next:before': {
      color: 'black !important'
    }
  }
});

// Functional component for displaying a limited version of the title
const TitleCard = ({ title }) => {
  const classes = useStyles();
  // Limit description to 4 words
  const limitedTitle = title.split(' ').slice(0, 4).join(' ');
 
  return (
    <Typography variant="h5" component="h2">
      {limitedTitle} {title.split(' ').length > 4 && '...'}
    </Typography>
  );
};

// Functional component for displaying a limited version of the description
const DescriptionCard = ({ description }) => {
  const classes = useStyles();
  // Limit description to 5 words
  const limitedDescription = description.split(' ').slice(0, 5).join(' ');
 
  return (
    <Typography variant="body2" component="p">
      {limitedDescription} {description.split(' ').length > 5 && '...'}
    </Typography>
  );
};

// Functional component for displaying a list of camps horizontally
const HorizontalCampList = ({ camps, handleLearnMore }) => {
  const classes = useStyles();
  const [t, i18n] = useTranslation("global");
 
  return (
    <div className={classes.horizontalCampContainer}>
      {camps.map((camp, index) => (
        <Card key={index} className={classes.card}>
          <CardContent>
            <TitleCard title={camp.title} />
            <Typography color="textSecondary">
              {camp.location}
            </Typography>
            <DescriptionCard description={camp.description} />
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => handleLearnMore(camp)}>{t("home.learn")}</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

// Functional component for displaying a modal with camp details
const CampModal = ({ camp, isOpen, handleClose }) => {
  const classes = useStyles();
 
  if (!camp) {
    return null;
  }
 
  const locationCoordinates = {
    "Boston": { latitude: 42.3362393, longitude: -71.0902494 },
    "New York": { latitude: 40.7500652, longitude: -74.0046997 },
    "California": { latitude: 37.7860676, longitude: -122.4400896 }
    // Add more locations as needed
  };
 
  const { latitude, longitude } = locationCoordinates[camp.location];
 
  const viewport = {
    latitude: latitude,
    longitude: longitude,
    zoom: 12,
  };
 
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box className={classes.modalContent}>
        <Typography variant="h3" id="modal-title">
          {camp.title}
        </Typography>
        <Typography variant="body1" id="modal-location">
          {camp.location}
        </Typography>
        <Typography variant="body1" id="modal-description">
          {camp.description}
        </Typography>
        <div className={classes.mapContainer}>
          <ReactMapGL
            {...viewport}
            width="100%"
            height="100%"
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken="pk.eyJ1Ijoicm9hcmNldXMiLCJhIjoiY2x2OTN2NG5iMGh1cDJqbnR0djVuYno0bCJ9.jE8naR-6TzBB9Ff1Dble4g"
            onViewportChange={(viewport) => setViewport(viewport)}
          >
            {/* Marker for the camp location */}
            <Marker latitude={latitude} longitude={longitude} offsetLeft={-20} offsetTop={-10}>
              <RoomIcon style={{ fontSize: 30, color: 'red' }} />
            </Marker>
          </ReactMapGL>
        </div>
        <div style={{ textAlign: 'center', marginTop: '10px' }}> {/* Adjust styles as needed */}
          <Button
            href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="primary"
            style={{ marginRight: 'auto', backgroundColor: '#76ABAE', float: 'left' }}
          >
            Get Directions
          </Button>
          <Button onClick={handleClose} variant="contained" color="primary" style={{ marginLeft: 'auto', backgroundColor: '#76ABAE', float: 'right' }}>
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

// Functional component for displaying a gallery of camp cards
const CampCardGallery = React.forwardRef(({ camps }, ref) => {
  const classes = useStyles();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [filterActive, setFilterActive] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState(null); // State to store selected camp details
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal open/close
  const [t,i18n] = useTranslation("global");
  
  // Function to handle location change
  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
    setFilterActive(true);
  };

  // Function to clear the filter
  const clearFilter = () => {
    setSelectedLocation('');
    setFilterActive(false);
  };

  // Function to handle "Learn More" button click
  const handleLearnMore = (camp) => {
    setSelectedCamp(camp);
    setIsModalOpen(true);
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Filter the camps based on selected location
  const filteredCamps = filterActive ? camps.filter(camp => camp.location === selectedLocation) : camps;

  // Settings for the slick slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll at a time
    autoplay: true,
    autoplaySpeed: 3000, // Interval between slides
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div ref={ref}>
      <Box className={classes.sliderContainer}>
      <Box className={classes.headerContainer}>
        <h1>{t("home.ourcamps")}</h1>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <Select value={selectedLocation} className={classes.filter} onChange={handleLocationChange} displayEmpty>
            <MenuItem value="">{t("home.filter")}</MenuItem>
            {Array.from(new Set(camps.map(camp => camp.location))).map((location, index) => (
              <MenuItem key={index} value={location}>{location}</MenuItem>
            ))}
          </Select>
          {filterActive && (
            <Button className={classes.filterButton} onClick={clearFilter}>{t("home.clearfilter")}</Button>
          )}
        </Box>
      </Box>
      {filterActive ? (
        <HorizontalCampList camps={filteredCamps} handleLearnMore={handleLearnMore} />
      ) : (
        <Slider {...settings}>
          {camps.map((camp, index) => (
            <div key={index}>
              <Card className={classes.card}>
                <CardContent>
                <TitleCard title={camp.title} color='textSecondary' />
                  <Typography color="textSecondary">
                    {camp.location}
                  </Typography>
                  <DescriptionCard description={camp.description} />
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleLearnMore(camp)}>{t("home.learn")}</Button>
                </CardActions>
              </Card>
            </div>
          ))}
        </Slider>
      )}
      {/* Modal to display camp details */}
      <CampModal camp={selectedCamp} isOpen={isModalOpen} handleClose={handleCloseModal} />
    </Box>
    </div>
    
  );
});

export default CampCardGallery; // Exporting CampCardGallery component