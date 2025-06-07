import React, { useState } from 'react';
import { Card, CardContent, Typography, CardActions, Button, Box, Modal } from '@mui/material'; // Importing components from Material-UI
import { makeStyles } from '@mui/styles'; // Importing makeStyles for styling
import Slider from 'react-slick'; // Importing Slider component from react-slick
import 'slick-carousel/slick/slick.css'; // Importing CSS for react-slick
import 'slick-carousel/slick/slick-theme.css'; // Importing theme CSS for react-slick
import { useTranslation } from 'react-i18next'; // Importing translation hook

// Custom styles using makeStyles hook
const useStyles = makeStyles({
  card: {
    minWidth: 275,
    marginRight: 20,
    border: '2px solid #222831',
    // color: 'white', // Color style commented out
  },
  sliderContainer: {
    maxWidth: 1000, // Adjust the width as needed
    margin: 'auto', // Center the slider horizontally
  },
  modalContent: {
    position: 'absolute',
    width: '50%',
    backgroundColor: 'white',
    padding: '20px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#000', // Set text color to black
  },
  modalTitle: {
    color: '#000', // Set text color to black
  },
  modalLocation: {
    color: '#000', // Set text color to black
    marginBottom: '10px', // Add some margin for spacing
  },
  modalDescription: {
    color: '#000', // Set text color to black
  },
});

// Component to display limited description
const DescriptionCard = ({ description }) => {
  // Limit description to 5 words
  const limitedDescription = description.split(' ').slice(0, 5).join(' ');

  return (
    <Typography variant="body2" component="p">
      {limitedDescription} {description.split(' ').length > 5 && '...'}
    </Typography>
  );
};

// Component to display limited title
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

// Main component for displaying news gallery
const NewsGallery = ({ news }) => {
  const classes = useStyles();
  const [selectedNews, setSelectedNews] = useState(null); // State to store selected news details
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal open/close
  const [t, i18n] = useTranslation("global"); // Translation hook

  // Function to handle "Learn More" button click
  const handleLearnMore = (newsItem) => {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Settings for the Slider component
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
    <Box className={classes.sliderContainer}>
      <h1>{t("home.newsHeading")}</h1> {/* Translated heading */}
      {/* Slider component */}
      <Slider {...settings}>
        {news.map((newsItem, index) => (
          <div key={index}>
            {/* Card component */}
            <Card className={classes.card}>
              <CardContent>
                {/* Component to display limited title */}
                <TitleCard title={newsItem.title} />
                <Typography color="textSecondary">
                  {newsItem.location}
                </Typography>
                {/* Component to display limited description */}
                <DescriptionCard description={newsItem.description} />
              </CardContent>
              {/* Button to learn more */}
              <CardActions>
                <Button size="small" onClick={() => handleLearnMore(newsItem)}>{t("home.learn")}</Button> {/* Translated button label */}
              </CardActions>
            </Card>
          </div>
        ))}
      </Slider>
      {/* Modal to display news details */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className={classes.modalContent}>
          {/* News title */}
          <Typography variant="h3" id="modal-title" className={classes.modalTitle}>
            {selectedNews && selectedNews.title}
          </Typography>
          {/* News location */}
          <Typography variant="body1" id="modal-location" className={classes.modalLocation}>
            {selectedNews && selectedNews.location}
          </Typography>
          {/* News description */}
          <Typography variant="body1" id="modal-description" className={classes.modalDescription}>
            {selectedNews && selectedNews.description}
          </Typography>
          {/* Button to close modal */}
          <Button onClick={handleCloseModal}>Close</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default NewsGallery;