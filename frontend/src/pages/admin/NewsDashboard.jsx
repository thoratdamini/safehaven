import React, { useState, useEffect } from 'react';
import { Button, Container, Card, CardContent, Typography, Dialog, DialogContent, DialogTitle, MenuItem, Select, TextField } from '@mui/material';
import { API } from '../../../service/api';
import { message } from 'antd';

const NewsDashboard = ({ onNewsCreated }) => {
  const [showForm, setShowForm] = useState(false);
  const [newsDetails, setNewsDetails] = useState({
    title: '',
    location: '',
    description: ''
  });
  const [newsList, setNewsList] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await API.getNews();
        if (response.isSuccess) {
          setNewsList(response.data);
        } else {
          console.error('Error fetching news:', response.error);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    };

    fetchNews();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewsDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.createNews(newsDetails); // Create a new news item
      console.log('Create response:', response); // Log the response
      if (response.isSuccess) {
        // Refresh the list of news items after creating
        const updatedNewsList = await API.getNews();
        if (updatedNewsList.isSuccess) {
          setNewsList(updatedNewsList.data);
          // Call the parent callback to notify about the new news item
          if (onNewsCreated) {
            onNewsCreated();
          }
        }
        // Reset form fields
        setNewsDetails({
          title: '',
          location: '',
          description: ''
        });
        message.success("News Created Successfully",0.8);
        // Hide the form after submission
        setShowForm(false);
      } else {
        console.error('Error creating news:', response.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleDeleteNews = async (newsId) => {
    try {
      const response = await API.deleteNewsDetails(newsId);
      if (response.isSuccess) {
        // Remove the deleted news item from the list
        const updatedNewsList = newsList.filter(news => news._id !== newsId);
        setNewsList(updatedNewsList);
        setSelectedNews(null); // Close the dialog after deletion
        setOpenDialog(false);
      } else {
        console.error('Error deleting news:', response.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleOpenDialog = (news) => {
    setSelectedNews(news);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedNews(null);
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        News Dashboard
      </Typography>
      <div style={{ marginBottom: '1rem' }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#76ABAE",
            color: "white",
            "&:hover": { backgroundColor: "grey" },
          }}
          onClick={() => setShowForm(prevState => !prevState)} // Toggle form visibility
        >
          {showForm ? "Hide Form" : "Add News"}
        </Button>
        {showForm && (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={newsDetails.title}
              onChange={handleInputChange}
              margin="normal"
            />
            <Select
              fullWidth
              label="Location"
              name="location"
              value={newsDetails.location}
              onChange={handleInputChange}
              displayEmpty
              margin="normal"
            >
              <MenuItem value="">Select Location</MenuItem>
              <MenuItem value="Boston">Boston</MenuItem>
              <MenuItem value="New York">New York</MenuItem>
              <MenuItem value="California">California</MenuItem>
            </Select>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={newsDetails.description}
              onChange={handleInputChange}
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#31363F",
                color: "white",
                "&:hover": { backgroundColor: "grey" },
              }}
              style={{ marginTop: '1rem' }}
            >
              Add
            </Button>
          </form>
        )}
      </div>
      <Typography variant="h5" gutterBottom>
        All News
      </Typography>
      {newsList.map(news => (
        <Card key={news._id} style={{ marginBottom: '1rem', cursor: 'pointer', 
        backgroundColor: "#222831", height: '250px',width: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center'
         }} onClick={() => handleOpenDialog(news)}>
          <CardContent>
            <Typography variant="h6" component="h2"  color="white">
              {news.title}
            </Typography>
            <Typography variant="body2" color="white">
              Location: {news.location}
            </Typography>
            <Typography variant="body2" color="white">
            Description: {news.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedNews && selectedNews.title}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1">Location: {selectedNews && selectedNews.location}</Typography>
          <Typography variant="body1">Description: {selectedNews && selectedNews.description}</Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#31363F",
              color: "white",
              "&:hover": { backgroundColor: "grey" },
            }}
            onClick={() => handleDeleteNews(selectedNews._id)}
            style={{ marginTop: '1rem' }}
          >
            Delete
          </Button>
        </DialogContent>
      </Dialog>
      {openDialog && <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}></div>}
    </Container>
  );
};

export default NewsDashboard;
